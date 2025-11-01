require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Filter = require('bad-words');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://yari-zone.web.app",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// In-memory storage (replace with Redis for production)
let waitingQueue = [];
let activePairs = new Map(); // socketId -> { partner: socketId, room: roomId }
let reports = [];
let bannedUsers = new Set();

// Profanity filter
const filter = new Filter();

// Age verification (simple in-memory, replace with proper DB)
let verifiedUsers = new Set();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'YaariZone Video Chat Backend', status: 'running' });
});

// Get reports (admin endpoint)
app.get('/api/reports', (req, res) => {
  res.json(reports);
});

// Ban user (admin endpoint)
app.post('/api/ban/:socketId', (req, res) => {
  const { socketId } = req.params;
  bannedUsers.add(socketId);
  res.json({ message: 'User banned' });
});

// Socket.io logic
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Check if user is banned
  if (bannedUsers.has(socket.id)) {
    socket.emit('banned');
    socket.disconnect();
    return;
  }

  // Age verification
  socket.on('verify-age', (birthdate) => {
    const age = calculateAge(birthdate);
    if (age >= 18) {
      verifiedUsers.add(socket.id);
      socket.emit('age-verified');
    } else {
      socket.emit('age-denied');
    }
  });

  // Join waiting queue
  socket.on('join-queue', (data) => {
    if (!verifiedUsers.has(socket.id)) {
      socket.emit('error', 'Age verification required');
      return;
    }

    const { interests = [] } = data;
    waitingQueue.push({ socketId: socket.id, interests });

    // Try to find a match
    findMatch(socket);
  });

  // WebRTC signalling
  socket.on('signal', (data) => {
    const { to, signal } = data;
    io.to(to).emit('signal', { from: socket.id, signal });
  });

  // Chat message
  socket.on('chat-message', (message) => {
    if (activePairs.has(socket.id)) {
      const pair = activePairs.get(socket.id);
      const partnerId = pair.partner;

      // Check for profanity
      if (filter.isProfane(message)) {
        socket.emit('message-filtered', 'Message contains inappropriate content');
        return;
      }

      io.to(partnerId).emit('chat-message', { from: socket.id, message });
    }
  });

  // Typing indicator
  socket.on('typing', (isTyping) => {
    if (activePairs.has(socket.id)) {
      const pair = activePairs.get(socket.id);
      const partnerId = pair.partner;
      io.to(partnerId).emit('typing', { from: socket.id, isTyping });
    }
  });

  // Next/Disconnect
  socket.on('next', () => {
    disconnectPair(socket.id);
    socket.emit('disconnected');
  });

  // Report user
  socket.on('report', (reason) => {
    if (activePairs.has(socket.id)) {
      const pair = activePairs.get(socket.id);
      const partnerId = pair.partner;

      reports.push({
        id: uuidv4(),
        reporter: socket.id,
        reported: partnerId,
        reason,
        timestamp: new Date().toISOString(),
        room: pair.room
      });

      console.log(`User ${socket.id} reported ${partnerId} for: ${reason}`);
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    disconnectPair(socket.id);
    waitingQueue = waitingQueue.filter(user => user.socketId !== socket.id);
    verifiedUsers.delete(socket.id);
  });
});

// Helper functions
function findMatch(socket) {
  if (waitingQueue.length < 2) return;

  const currentUser = waitingQueue.find(user => user.socketId === socket.id);
  if (!currentUser) return;

  // Simple random matching (can be improved with interest matching)
  const potentialMatches = waitingQueue.filter(user => user.socketId !== socket.id);

  if (potentialMatches.length > 0) {
    const match = potentialMatches[Math.floor(Math.random() * potentialMatches.length)];
    const roomId = uuidv4();

    // Remove both from queue
    waitingQueue = waitingQueue.filter(user => user.socketId !== socket.id && user.socketId !== match.socketId);

    // Create pair
    activePairs.set(socket.id, { partner: match.socketId, room: roomId });
    activePairs.set(match.socketId, { partner: socket.id, room: roomId });

    // Join room
    socket.join(roomId);
    io.sockets.sockets.get(match.socketId).join(roomId);

    // Notify both users
    socket.emit('matched', { room: roomId, partner: match.socketId });
    io.to(match.socketId).emit('matched', { room: roomId, partner: socket.id });
  }
}

function disconnectPair(socketId) {
  if (activePairs.has(socketId)) {
    const pair = activePairs.get(socketId);
    const partnerId = pair.partner;

    // Notify partner
    io.to(partnerId).emit('partner-disconnected');

    // Clean up
    activePairs.delete(socketId);
    activePairs.delete(partnerId);

    // Leave room
    const socket = io.sockets.sockets.get(socketId);
    const partnerSocket = io.sockets.sockets.get(partnerId);
    if (socket) socket.leave(pair.room);
    if (partnerSocket) partnerSocket.leave(pair.room);
  }
}

function calculateAge(birthdate) {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`YaariZone Backend running on port ${PORT}`);
});

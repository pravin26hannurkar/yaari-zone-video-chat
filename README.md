# YaariZone Video Chat

A modern, anonymous random video and text chat platform with a neon luxury theme. Built with React, Node.js, Socket.io, and WebRTC for real-time communication.

![YaariZone Preview](https://via.placeholder.com/800x400/7F00FF/FFFFFF?text=YaariZone+Video+Chat)

## ✨ Features

- **Anonymous Random Matching**: Connect with strangers worldwide instantly
- **Video & Text Chat**: Real-time video calls with integrated text messaging
- **Age Verification**: 18+ requirement for video features with secure verification
- **Safety First**: Comprehensive moderation, reporting, and abuse prevention
- **Neon Luxury Theme**: Beautiful, modern UI with animated backgrounds
- **Mobile Responsive**: Works seamlessly on all devices
- **Peer-to-Peer Video**: Direct WebRTC connections for privacy and performance
- **Real-time Features**: Typing indicators, connection status, and more

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Modern web browser with WebRTC support (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/yaari-zone-video-chat.git
   cd yaari-zone-video-chat
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd ../backend
   npm start
   # Server runs on http://localhost:3000
   ```

5. **Start the frontend development server**
   ```bash
   cd ../frontend
   npm run dev
   # Frontend runs on http://localhost:5173
   ```

6. **Open your browser** and visit `http://localhost:5173`

## 🏗️ Architecture

### Backend (Node.js + Express + Socket.io)
- **Real-time Communication**: Socket.io for instant messaging and signaling
- **Matchmaking**: Queue-based random pairing system
- **Security**: Age verification, rate limiting, profanity filtering
- **Moderation**: Reporting system with admin dashboard capabilities

### Frontend (React + Vite + TailwindCSS)
- **Modern UI**: Responsive design with neon luxury theme
- **WebRTC Integration**: Peer-to-peer video streaming
- **State Management**: React hooks for real-time updates
- **Animations**: Framer Motion for smooth transitions

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
ADMIN_API_KEY=your-admin-api-key
LOG_LEVEL=info
```

### WebRTC Configuration

For production deployment, configure TURN servers for NAT traversal:

```env
TURN_SERVER_URL=turn:your-turn-server.com:3478
TURN_USERNAME=your-turn-username
TURN_PASSWORD=your-turn-password
```

## 📱 Usage

1. **Home Page**: Enter optional nickname and verify age (18+ required for video)
2. **Queue**: Join the matchmaking queue
3. **Chat**: Once matched, use video controls and text chat
4. **Safety**: Report inappropriate behavior or find next match
5. **Support**: Access FAQ, contact form, and community guidelines

## 🛡️ Safety & Moderation

- **Age Gating**: Strict 18+ verification for video features
- **Content Filtering**: Real-time profanity detection
- **Reporting System**: Easy-to-use reporting with admin review
- **Rate Limiting**: Prevents spam and abuse
- **Moderation Tools**: Admin dashboard for managing reports and bans

## 🚀 Deployment

### Backend Deployment
```bash
# Using Railway, Render, or Heroku
npm run build
# Follow platform-specific deployment guides
```

### Frontend Deployment
```bash
# Using Vercel, Netlify, or similar
npm run build
# Deploy the dist/ folder
```

### Production Considerations
- Set up TURN servers for WebRTC
- Configure HTTPS
- Set up monitoring and logging
- Implement Redis for scaling (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for safe, anonymous online connections
- Special thanks to the open-source community

## 📞 Support

- **Email**: support@yaarizone.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/yaari-zone-video-chat/issues)
- **Documentation**: See our [FAQ](https://yaarizone.com/faq) and [Community Guidelines](https://yaarizone.com/guidelines)

---

**Made with ❤️ for safe and meaningful connections worldwide**

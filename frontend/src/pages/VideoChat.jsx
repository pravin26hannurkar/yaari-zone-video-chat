import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import io from 'socket.io-client';
import VideoPlayer from '../components/VideoPlayer';
import ChatBox from '../components/ChatBox';
import Controls from '../components/Controls';
import FloatingAvatars from '../components/FloatingAvatars';
import AdBanner from '../components/AdBanner';

const VideoChat = () => {
  const location = useLocation();
  const { nickname, birthdate } = location.state || {};

  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [partnerId, setPartnerId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [partnerTyping, setPartnerTyping] = useState(false);

  const peerConnectionRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // WebRTC configuration
  const rtcConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      // Add TURN servers for production
    ]
  };

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    // Age verification
    if (birthdate) {
      const age = calculateAge(birthdate);
      if (age >= 18) {
        newSocket.emit('verify-age', birthdate.toISOString().split('T')[0]);
      }
    }

    // Socket event listeners
    newSocket.on('age-verified', () => {
      console.log('Age verified');
    });

    newSocket.on('age-denied', () => {
      alert('You must be 18 or older to use video chat features.');
      window.location.href = '/';
    });

    newSocket.on('matched', (data) => {
      setIsMatched(true);
      setPartnerId(data.partner);
      setRoomId(data.room);
      initializePeerConnection(newSocket, data.partner);
    });

    newSocket.on('signal', (data) => {
      handleSignal(data);
    });

    newSocket.on('chat-message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('typing', (data) => {
      setPartnerTyping(data.isTyping);
    });

    newSocket.on('partner-disconnected', () => {
      handleDisconnect();
    });

    newSocket.on('message-filtered', (message) => {
      alert(message);
    });

    newSocket.on('banned', () => {
      alert('You have been banned from the service.');
      window.location.href = '/';
    });

    // Initialize local media
    initializeLocalMedia();

    return () => {
      newSocket.disconnect();
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, []);

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  const initializeLocalMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Unable to access camera and microphone. Please check permissions.');
    }
  };

  const initializePeerConnection = (socket, partnerId) => {
    const pc = new RTCPeerConnection(rtcConfiguration);
    peerConnectionRef.current = pc;

    // Add local stream tracks to peer connection
    if (localStream) {
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
    }

    // Handle remote stream
    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('signal', {
          to: partnerId,
          signal: { type: 'candidate', candidate: event.candidate }
        });
      }
    };

    // Create offer
    pc.createOffer()
      .then(offer => pc.setLocalDescription(offer))
      .then(() => {
        socket.emit('signal', {
          to: partnerId,
          signal: { type: 'offer', sdp: pc.localDescription }
        });
      })
      .catch(error => console.error('Error creating offer:', error));
  };

  const handleSignal = async (data) => {
    const { signal } = data;

    if (!peerConnectionRef.current) return;

    if (signal.type === 'offer') {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(signal));
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socket.emit('signal', {
        to: partnerId,
        signal: { type: 'answer', sdp: answer }
      });
    } else if (signal.type === 'answer') {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(signal));
    } else if (signal.type === 'candidate') {
      await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(signal.candidate));
    }
  };

  const handleDisconnect = () => {
    setIsMatched(false);
    setPartnerId(null);
    setRoomId(null);
    setRemoteStream(null);
    setMessages([]);
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
  };

  const handleNext = () => {
    socket.emit('next');
    handleDisconnect();
    socket.emit('join-queue', { interests: [] });
  };

  const handleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const handleCameraToggle = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = isCameraOff;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

  const handleReport = () => {
    const reason = prompt('Please provide a reason for reporting:');
    if (reason && socket) {
      socket.emit('report', reason);
      alert('Report submitted. Thank you for helping keep YaariZone safe.');
    }
  };

  const handleSendMessage = (message) => {
    if (socket && message.trim()) {
      socket.emit('chat-message', message);
      setMessages(prev => [...prev, { from: 'me', message }]);
    }
  };

  const handleTyping = (typing) => {
    setIsTyping(typing);
    if (socket) {
      socket.emit('typing', typing);
    }
  };

  const handleJoinQueue = () => {
    if (socket) {
      socket.emit('join-queue', { interests: [] });
      setIsConnected(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col">
      {/* Header Ad Banner */}
      <div className="w-full bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <AdBanner slot="2468135790" className="w-full h-16" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          {!isConnected ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <h1 className="text-4xl font-bold mb-8 neon-text">Ready to Connect?</h1>
              <p className="text-white/70 mb-8 text-lg">
                Join the queue and get matched with someone instantly
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleJoinQueue}
                className="neon-button text-xl px-8 py-4"
              >
                Join Queue
              </motion.button>
            </motion.div>
          ) : !isMatched ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <FloatingAvatars />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="spinner mb-8"
              />
              <h2 className="text-2xl font-semibold mb-4">Finding your match...</h2>
              <p className="text-white/70 mb-8">Please wait while we connect you with someone</p>

              {/* Self Camera Preview */}
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-medium mb-4">Your Camera Preview</h3>
                <VideoPlayer
                  stream={localStream}
                  isMuted={isMuted}
                  isCameraOff={isCameraOff}
                  label="You"
                />
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleMute}
                    className={`px-4 py-2 rounded-lg ${isMuted ? 'bg-red-500' : 'bg-green-500'} text-white`}
                  >
                    {isMuted ? 'Unmute' : 'Mute'}
                  </button>
                  <button
                    onClick={handleCameraToggle}
                    className={`px-4 py-2 rounded-lg ${isCameraOff ? 'bg-red-500' : 'bg-green-500'} text-white`}
                  >
                    {isCameraOff ? 'Turn On Camera' : 'Turn Off Camera'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video Section */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <VideoPlayer
                    stream={localStream}
                    isMuted={isMuted}
                    isCameraOff={isCameraOff}
                    label="You"
                  />
                  <VideoPlayer
                    stream={remoteStream}
                    label="Partner"
                    isRemote={true}
                  />
                </div>

                <Controls
                  onNext={handleNext}
                  onMute={handleMute}
                  onCameraToggle={handleCameraToggle}
                  onReport={handleReport}
                  isMuted={isMuted}
                  isCameraOff={isCameraOff}
                />
              </div>

              {/* Chat Section */}
              <div className="lg:col-span-1">
                <ChatBox
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  onTyping={handleTyping}
                  partnerTyping={partnerTyping}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Ad Banner */}
      <div className="w-full bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <AdBanner slot="1357924680" className="w-full h-16" />
        </div>
      </div>
    </div>
  );
};

export default VideoChat;

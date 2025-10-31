import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MicOff, VideoOff } from 'lucide-react';

const VideoPlayer = ({ stream, isMuted = false, isCameraOff = false, label, isRemote = false }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="video-container relative bg-yaari-gray rounded-xl overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isRemote ? false : isMuted}
        className="w-full h-64 md:h-80 object-cover"
      />

      {/* Video overlay when camera is off */}
      {isCameraOff && !isRemote && (
        <div className="absolute inset-0 bg-yaari-gray flex items-center justify-center">
          <div className="text-center">
            <VideoOff className="w-16 h-16 text-white/50 mx-auto mb-2" />
            <p className="text-white/70">Camera Off</p>
          </div>
        </div>
      )}

      {/* Remote video placeholder when no stream */}
      {isRemote && !stream && (
        <div className="absolute inset-0 bg-yaari-gray flex items-center justify-center">
          <div className="text-center">
            <div className="spinner mx-auto mb-4" />
            <p className="text-white/70">Connecting...</p>
          </div>
        </div>
      )}

      {/* Status indicators */}
      <div className="absolute top-4 left-4 flex gap-2">
        {isMuted && (
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <MicOff size={12} />
            Muted
          </div>
        )}
        {isCameraOff && (
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <VideoOff size={12} />
            Camera Off
          </div>
        )}
      </div>

      {/* Label */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg">
        <span className="text-white text-sm font-medium">{label}</span>
      </div>

      {/* Connection quality indicator (placeholder) */}
      <div className="absolute top-4 right-4">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoPlayer;

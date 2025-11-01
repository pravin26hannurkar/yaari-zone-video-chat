import React from 'react';
import { motion } from 'framer-motion';
import { SkipForward, Mic, MicOff, Video, VideoOff, Flag, PhoneOff } from 'lucide-react';

const Controls = ({ onNext, onMute, onCameraToggle, onReport, isMuted, isCameraOff }) => {
  const controls = [
    {
      icon: isMuted ? MicOff : Mic,
      label: isMuted ? 'Unmute' : 'Mute',
      onClick: onMute,
      variant: isMuted ? 'danger' : 'default',
      color: isMuted ? 'text-red-400' : 'text-white'
    },
    {
      icon: isCameraOff ? VideoOff : Video,
      label: isCameraOff ? 'Turn Camera On' : 'Turn Camera Off',
      onClick: onCameraToggle,
      variant: isCameraOff ? 'danger' : 'default',
      color: isCameraOff ? 'text-red-400' : 'text-white'
    },
    {
      icon: Flag,
      label: 'Report',
      onClick: onReport,
      variant: 'warning',
      color: 'text-yellow-400'
    },
    {
      icon: SkipForward,
      label: 'Next',
      onClick: onNext,
      variant: 'primary',
      color: 'text-white'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex flex-wrap justify-center gap-4">
        {controls.map((control, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={control.onClick}
            className={`
              flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200
              ${control.variant === 'danger'
                ? 'bg-red-500/20 hover:bg-red-500/30 border border-red-500/30'
                : control.variant === 'warning'
                ? 'bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30'
                : 'bg-white/10 hover:bg-white/20 border border-white/20'
              }
            `}
          >
            <control.icon size={24} className={control.color} />
            <span className="text-xs text-white/80 font-medium">{control.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Emergency disconnect */}
      <div className="mt-6 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (window.confirm('Are you sure you want to end this chat?')) {
              onNext();
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
        >
          <PhoneOff size={18} />
          End Chat
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Controls;

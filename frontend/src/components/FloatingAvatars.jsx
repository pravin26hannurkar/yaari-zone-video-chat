import React from 'react';
import { motion } from 'framer-motion';

const FloatingAvatars = () => {
  const avatars = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="relative w-full h-64 mb-8 overflow-hidden">
      {avatars.map((avatar, index) => (
        <motion.div
          key={index}
          className="absolute w-12 h-12 bg-gradient-to-br from-yaari-purple to-yaari-pink rounded-full border-2 border-white/20"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: 0
          }}
          animate={{
            x: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%'
            ],
            y: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%'
            ],
            scale: [0, 1, 1, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
          style={{
            left: Math.random() * 80 + '%',
            top: Math.random() * 80 + '%'
          }}
        >
          <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center">
            <div className="w-6 h-6 bg-white/30 rounded-full"></div>
          </div>
        </motion.div>
      ))}

      {/* Central glow effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-32 h-32 bg-neon-gradient rounded-full opacity-20 blur-xl"></div>
      </motion.div>
    </div>
  );
};

export default FloatingAvatars;

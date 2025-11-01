import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-9xl font-bold neon-text mb-8"
        >
          404
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-white/70 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neon-button flex items-center gap-2"
            >
              <Home size={20} />
              Go Home
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Go Back
          </motion.button>
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="mt-12 opacity-20"
        >
          <div className="w-32 h-32 mx-auto border-4 border-yaari-purple rounded-full border-t-transparent animate-spin"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;

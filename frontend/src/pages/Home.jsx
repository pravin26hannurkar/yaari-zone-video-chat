import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Users, Shield, Zap, Heart, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const navigate = useNavigate();
  const [birthdate, setBirthdate] = useState(null);
  const [nickname, setNickname] = useState('');
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showAgeGate, setShowAgeGate] = useState(false);

  const handleStartChat = () => {
    if (!isAgeVerified) {
      setShowAgeGate(true);
      return;
    }
    navigate('/chat', { state: { nickname, birthdate } });
  };

  const handleAgeVerification = () => {
    if (birthdate) {
      const age = calculateAge(birthdate);
      if (age >= 18) {
        setIsAgeVerified(true);
        setShowAgeGate(false);
      } else {
        alert('You must be 18 or older to use video chat features.');
      }
    }
  };

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-6 neon-text">
          YaariZone
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 font-light">
          Connect randomly, chat anonymously, experience luxury
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <input
            type="text"
            placeholder="Enter nickname (optional)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="neon-input w-full sm:w-64"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartChat}
            className="neon-button flex items-center gap-2"
          >
            <Play size={20} />
            Start Chatting
          </motion.button>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-6xl"
      >
        <div className="glass-card p-6 text-center">
          <Users className="w-12 h-12 text-yaari-purple mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Random Matching</h3>
          <p className="text-white/70">Connect with strangers worldwide instantly</p>
        </div>

        <div className="glass-card p-6 text-center">
          <Shield className="w-12 h-12 text-yaari-pink mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
          <p className="text-white/70">Age verification and moderation systems</p>
        </div>

        <div className="glass-card p-6 text-center">
          <Zap className="w-12 h-12 text-yaari-blue mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
          <p className="text-white/70">Real-time video and text communication</p>
        </div>
      </motion.div>

      {/* Age Gate Modal */}
      {showAgeGate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-8 max-w-md w-full text-center"
          >
            <Shield className="w-16 h-16 text-yaari-purple mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Age Verification</h2>
            <p className="text-white/70 mb-6">
              Please enter your birthdate to verify you are 18 or older for video chat features.
            </p>
            <div className="mb-6">
              <DatePicker
                selected={birthdate}
                onChange={(date) => setBirthdate(date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select your birthdate"
                className="neon-input w-full text-center"
                maxDate={new Date()}
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowAgeGate(false)}
                className="flex-1 py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAgeVerification}
                disabled={!birthdate}
                className="flex-1 neon-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center text-white/60 text-sm"
      >
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <a href="/privacy" className="hover:text-yaari-purple transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-yaari-purple transition-colors">Terms of Service</a>
          <a href="/guidelines" className="hover:text-yaari-purple transition-colors">Community Guidelines</a>
          <a href="/faq" className="hover:text-yaari-purple transition-colors">FAQ</a>
          <a href="/contact" className="hover:text-yaari-purple transition-colors">Contact</a>
        </div>
        <p>&copy; 2024 YaariZone. Made with <Heart className="inline w-4 h-4 text-red-500" /> for safe connections.</p>
      </motion.div>
    </div>
  );
};

export default Home;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import VideoChat from './pages/VideoChat';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CommunityGuidelines from './pages/CommunityGuidelines';
import ContactUs from './pages/ContactUs';
import ReportIssue from './pages/ReportIssue';
import FAQ from './pages/FAQ';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-yaari-dark text-white font-inter relative overflow-hidden">
        <AnimatedBackground />
        <Sidebar />

        <main className="relative z-10">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Home />
              </motion.div>
            } />
            <Route path="/chat" element={
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <VideoChat />
              </motion.div>
            } />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/guidelines" element={<CommunityGuidelines />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

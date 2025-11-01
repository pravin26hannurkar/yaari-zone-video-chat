import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, MessageCircle, Shield, FileText, Mail, AlertTriangle, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/privacy', icon: Shield, label: 'Privacy' },
    { path: '/terms', icon: FileText, label: 'Terms' },
    { path: '/guidelines', icon: Shield, label: 'Guidelines' },
    { path: '/contact', icon: Mail, label: 'Contact' },
    { path: '/report', icon: AlertTriangle, label: 'Report' },
    { path: '/faq', icon: HelpCircle, label: 'FAQ' }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden glass-card p-3"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full w-64 glass-card z-40 lg:translate-x-0 lg:static lg:h-auto"
      >
        <div className="p-6">
          <Link to="/" className="block mb-8">
            <h1 className="text-2xl font-bold neon-text">YaariZone</h1>
          </Link>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-neon-gradient text-white shadow-neon'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Branding */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-white/50 text-center">
              Experience luxury connections
            </p>
          </div>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;

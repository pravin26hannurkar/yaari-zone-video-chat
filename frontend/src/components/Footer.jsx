import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms of Service' },
    { to: '/guidelines', label: 'Community Guidelines' },
    { to: '/contact', label: 'Contact Us' },
    { to: '/faq', label: 'FAQ' }
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-yaari-dark/50 backdrop-blur-md border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold neon-text mb-4">YaariZone</h3>
            <p className="text-white/70 mb-4 max-w-md">
              Experience luxury connections with our anonymous video chat platform.
              Safe, secure, and designed for meaningful interactions.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white/50 hover:text-yaari-purple transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-yaari-purple transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/report"
                  className="text-white/70 hover:text-yaari-purple transition-colors"
                >
                  Report Issue
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@yaarizone.com"
                  className="text-white/70 hover:text-yaari-purple transition-colors"
                >
                  support@yaarizone.com
                </a>
              </li>
              <li>
                <p className="text-white/50 text-sm">
                  24/7 Support Available
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {currentYear} YaariZone. All rights reserved.
          </p>
          <p className="text-white/50 text-sm flex items-center gap-1">
            Made with <Heart className="text-red-500" size={14} /> for safe connections
          </p>
        </div>

        {/* Legal Notice */}
        <div className="mt-6 text-center">
          <p className="text-white/40 text-xs">
            YaariZone is committed to providing a safe and respectful environment.
            Users must be 18+ to access video features. By using our service, you agree to our
            <Link to="/terms" className="text-yaari-purple hover:underline"> Terms of Service</Link> and
            <Link to="/privacy" className="text-yaari-purple hover:underline"> Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold neon-text mb-8">Privacy Policy</h1>

          <div className="glass-card p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-white/80 mb-4">
                YaariZone is committed to protecting your privacy. We collect minimal information necessary to provide our services:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>Age verification data (birthdate) for safety compliance</li>
                <li>Optional nickname for chat identification</li>
                <li>Chat messages (ephemeral, not stored on our servers)</li>
                <li>Technical data for connection quality (not personally identifiable)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-white/80 mb-4">
                We use collected information solely for:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>Age verification and safety compliance</li>
                <li>Matching users for chat connections</li>
                <li>Maintaining service quality and security</li>
                <li>Investigating reports of violations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Data Storage and Security</h2>
              <p className="text-white/80 mb-4">
                Your privacy is our priority:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>Chat messages are not stored on our servers</li>
                <li>Video streams are peer-to-peer and not recorded</li>
                <li>Age verification data is encrypted and securely stored</li>
                <li>All data is protected with industry-standard security measures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
              <p className="text-white/80">
                We may use third-party services for WebRTC connectivity (TURN servers) and deployment platforms.
                These services have their own privacy policies and we ensure they comply with our privacy standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
              <p className="text-white/80 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>Access your personal data</li>
                <li>Request data deletion</li>
                <li>Opt-out of data collection (where applicable)</li>
                <li>Report privacy concerns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
              <p className="text-white/80">
                If you have any questions about this Privacy Policy, please contact us at
                <a href="mailto:privacy@yaarizone.com" className="text-yaari-purple hover:underline ml-1">
                  privacy@yaarizone.com
                </a>
              </p>
            </section>

            <div className="border-t border-white/10 pt-6 mt-8">
              <p className="text-white/50 text-sm">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold neon-text mb-8">Terms of Service</h1>

          <div className="glass-card p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-white/80">
                By accessing and using YaariZone, you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Age Requirements</h2>
              <p className="text-white/80 mb-4">
                You must be at least 18 years old to use video chat features. Users under 18 may only access text-based features
                and will be automatically restricted from video functionality.
              </p>
              <p className="text-white/70">
                Age verification is required and may be requested at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Acceptable Use</h2>
              <p className="text-white/80 mb-4">You agree to use YaariZone responsibly and in compliance with all applicable laws. Prohibited activities include:</p>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>Harassment, bullying, or threatening behavior</li>
                <li>Sharing inappropriate, offensive, or illegal content</li>
                <li>Impersonation or providing false information</li>
                <li>Spamming or disruptive behavior</li>
                <li>Attempting to exploit or hack the service</li>
                <li>Sharing personal information without consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Content and Privacy</h2>
              <p className="text-white/80">
                Chat messages and video streams are ephemeral and not stored on our servers. However, we reserve the right to
                monitor content for safety and compliance purposes. Users found violating these terms may be permanently banned.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Reporting and Moderation</h2>
              <p className="text-white/80">
                We provide reporting tools for users to flag inappropriate behavior. All reports are reviewed by our moderation team,
                and appropriate action will be taken. False reports may result in account restrictions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Service Availability</h2>
              <p className="text-white/80">
                YaariZone is provided "as is" and we do not guarantee uninterrupted service. We reserve the right to modify,
                suspend, or discontinue the service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-white/80">
                YaariZone is not responsible for user-generated content or interactions between users. Users are solely responsible
                for their own safety and should exercise caution when interacting with strangers online.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
              <p className="text-white/80">
                We reserve the right to terminate or suspend your access to YaariZone immediately, without prior notice or liability,
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
              <p className="text-white/80">
                We reserve the right to modify these terms at any time. Continued use of YaariZone after changes constitutes
                acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
              <p className="text-white/80">
                If you have any questions about these Terms of Service, please contact us at
                <a href="mailto:legal@yaarizone.com" className="text-yaari-purple hover:underline ml-1">
                  legal@yaarizone.com
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

export default TermsOfService;

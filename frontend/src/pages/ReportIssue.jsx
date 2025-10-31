import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, MessageCircle, Video, UserX } from 'lucide-react';

const ReportIssue = () => {
  const [reportData, setReportData] = useState({
    category: '',
    description: '',
    urgency: 'medium',
    contactInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'harassment', label: 'Harassment', icon: UserX, color: 'text-red-400' },
    { value: 'inappropriate', label: 'Inappropriate Content', icon: Video, color: 'text-orange-400' },
    { value: 'spam', label: 'Spam/Abuse', icon: MessageCircle, color: 'text-yellow-400' },
    { value: 'technical', label: 'Technical Issue', icon: AlertTriangle, color: 'text-blue-400' },
    { value: 'other', label: 'Other', icon: Shield, color: 'text-purple-400' }
  ];

  const handleInputChange = (e) => {
    setReportData({
      ...reportData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate report submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    alert('Thank you for your report. Our moderation team will review it within 24 hours.');
    setReportData({ category: '', description: '', urgency: 'medium', contactInfo: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold neon-text mb-8 text-center">Report an Issue</h1>
          <p className="text-xl text-white/70 mb-12 text-center max-w-3xl mx-auto">
            Help us maintain a safe and positive community. Report any violations of our
            community guidelines or technical issues you encounter.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Report Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                <div>
                  <label className="block text-lg font-semibold mb-4">What type of issue are you reporting?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <label
                        key={category.value}
                        className={`glass-card p-4 cursor-pointer transition-all hover:scale-105 ${
                          reportData.category === category.value ? 'ring-2 ring-yaari-purple' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category.value}
                          checked={reportData.category === category.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center gap-3">
                          <category.icon className={category.color} size={24} />
                          <span className="font-medium">{category.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold mb-2">Description</label>
                  <p className="text-white/70 mb-4">
                    Please provide as much detail as possible about the issue, including usernames, timestamps, or specific behavior.
                  </p>
                  <textarea
                    name="description"
                    value={reportData.description}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="neon-input w-full resize-none"
                    placeholder="Describe the issue in detail..."
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold mb-2">Urgency Level</label>
                  <select
                    name="urgency"
                    value={reportData.urgency}
                    onChange={handleInputChange}
                    className="neon-input w-full"
                  >
                    <option value="low">Low - Minor issue, no immediate action needed</option>
                    <option value="medium">Medium - Moderate issue requiring attention</option>
                    <option value="high">High - Serious issue requiring immediate action</option>
                    <option value="emergency">Emergency - Threat to safety or severe violation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold mb-2">Contact Information (Optional)</label>
                  <p className="text-white/70 mb-4">
                    If you'd like us to follow up with you about this report.
                  </p>
                  <input
                    type="email"
                    name="contactInfo"
                    value={reportData.contactInfo}
                    onChange={handleInputChange}
                    className="neon-input w-full"
                    placeholder="your@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !reportData.category || !reportData.description}
                  className="neon-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
                </button>
              </form>
            </motion.div>

            {/* Information Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <Shield className="text-yaari-purple mb-4" size={32} />
                  <h3 className="text-xl font-semibold mb-3">Why Report?</h3>
                  <p className="text-white/80 text-sm">
                    Your reports help us maintain a safe and respectful community for everyone.
                    All reports are confidential and reviewed by our moderation team.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <AlertTriangle className="text-yellow-400 mb-4" size={32} />
                  <h3 className="text-xl font-semibold mb-3">What Happens Next?</h3>
                  <ul className="text-white/80 text-sm space-y-2">
                    <li>• Reports are reviewed within 24 hours</li>
                    <li>• Appropriate action is taken</li>
                    <li>• You'll receive updates if you provided contact info</li>
                    <li>• False reports may result in restrictions</li>
                  </ul>
                </div>

                <div className="glass-card p-6">
                  <MessageCircle className="text-yaari-blue mb-4" size={32} />
                  <h3 className="text-xl font-semibold mb-3">Need Immediate Help?</h3>
                  <p className="text-white/80 text-sm mb-4">
                    For emergencies or immediate safety concerns, contact us directly:
                  </p>
                  <a
                    href="mailto:emergency@yaarizone.com"
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg font-medium transition-colors inline-block text-sm"
                  >
                    emergency@yaarizone.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportIssue;

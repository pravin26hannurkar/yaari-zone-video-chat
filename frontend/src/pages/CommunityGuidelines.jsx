import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Heart, AlertTriangle } from 'lucide-react';

const CommunityGuidelines = () => {
  const guidelines = [
    {
      icon: Shield,
      title: "Respect & Safety",
      items: [
        "Treat all users with respect and kindness",
        "Do not engage in harassment, bullying, or threatening behavior",
        "Respect personal boundaries and obtain consent",
        "Report any safety concerns immediately"
      ]
    },
    {
      icon: Users,
      title: "Appropriate Content",
      items: [
        "Keep conversations appropriate and family-friendly",
        "Do not share explicit, violent, or offensive content",
        "Respect intellectual property rights",
        "Avoid spamming or disruptive behavior"
      ]
    },
    {
      icon: Heart,
      title: "Positive Interactions",
      items: [
        "Be genuine and authentic in your interactions",
        "Practice empathy and understanding",
        "Celebrate diversity and different perspectives",
        "Help create a welcoming environment for everyone"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Reporting Violations",
      items: [
        "Use the report button for inappropriate behavior",
        "Provide specific details when reporting",
        "Do not make false reports",
        "Help us maintain a safe community"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold neon-text mb-8 text-center">Community Guidelines</h1>
          <p className="text-xl text-white/70 mb-12 text-center max-w-3xl mx-auto">
            Our community thrives on respect, positivity, and safety. These guidelines help ensure
            everyone has a great experience on YaariZone.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {guidelines.map((guideline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <guideline.icon className="text-yaari-purple" size={24} />
                  <h3 className="text-xl font-semibold">{guideline.title}</h3>
                </div>
                <ul className="space-y-2">
                  {guideline.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-white/80 flex items-start gap-2">
                      <span className="text-yaari-purple mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-8 text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">Consequences of Violations</h2>
            <p className="text-white/80 mb-6">
              Violations of these guidelines may result in temporary suspension or permanent banning from YaariZone.
              We take community safety seriously and will take appropriate action to maintain a positive environment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-yellow-500/20 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">Warning</h4>
                <p className="text-white/70">First-time minor violations</p>
              </div>
              <div className="bg-orange-500/20 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-400 mb-2">Suspension</h4>
                <p className="text-white/70">Repeated or moderate violations</p>
              </div>
              <div className="bg-red-500/20 p-4 rounded-lg">
                <h4 className="font-semibold text-red-400 mb-2">Permanent Ban</h4>
                <p className="text-white/70">Severe or repeated serious violations</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card p-8 mt-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="text-white/80 mb-4">
              If you encounter any issues or have questions about these guidelines, don't hesitate to reach out:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/report"
                className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Report an Issue
              </a>
              <a
                href="/contact"
                className="bg-yaari-purple/20 hover:bg-yaari-purple/30 text-yaari-purple px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Contact Support
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityGuidelines;

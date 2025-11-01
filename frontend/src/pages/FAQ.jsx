import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Shield, Video, MessageCircle, User } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      category: "Getting Started",
      icon: User,
      color: "text-blue-400",
      questions: [
        {
          question: "How do I start using YaariZone?",
          answer: "Simply visit our homepage, enter an optional nickname, verify your age (18+ for video features), and click 'Start Chatting'. You'll be added to our matchmaking queue and connected with someone instantly."
        },
        {
          question: "Do I need to create an account?",
          answer: "No, YaariZone works without accounts. You can start chatting immediately as a guest. However, we recommend using a nickname to make conversations more personal."
        },
        {
          question: "Is YaariZone free to use?",
          answer: "Yes, YaariZone is completely free to use. We may introduce premium features in the future, but the core chatting experience will always remain free."
        }
      ]
    },
    {
      category: "Safety & Privacy",
      icon: Shield,
      color: "text-green-400",
      questions: [
        {
          question: "How does age verification work?",
          answer: "We require users to be 18+ for video chat features. You'll be asked to enter your birthdate, which is encrypted and used only for age verification. Users under 18 can still use text chat."
        },
        {
          question: "Are my conversations private?",
          answer: "Chat messages are ephemeral and not stored on our servers. Video streams are peer-to-peer and not recorded. We only collect minimal data for safety and service improvement."
        },
        {
          question: "What should I do if someone is inappropriate?",
          answer: "Use the 'Report' button during your chat to flag inappropriate behavior. Our moderation team reviews all reports within 24 hours. You can also end the chat immediately with the 'Next' button."
        },
        {
          question: "How do you protect user safety?",
          answer: "We implement multiple safety measures: age verification, real-time content moderation, profanity filtering, rate limiting, and a comprehensive reporting system. All users must agree to our Community Guidelines."
        }
      ]
    },
    {
      category: "Video & Chat Features",
      icon: Video,
      color: "text-purple-400",
      questions: [
        {
          question: "How does video chat work?",
          answer: "We use WebRTC technology for peer-to-peer video connections. This means your video stream goes directly to your chat partner, not through our servers, ensuring better privacy and lower latency."
        },
        {
          question: "Can I turn off my camera or microphone?",
          answer: "Yes! Use the camera and microphone controls in the chat interface. You can toggle these on/off at any time during your conversation."
        },
        {
          question: "What if the video quality is poor?",
          answer: "Video quality depends on your internet connection and device. Try refreshing the page, checking your connection, or using the 'Next' button to find a better connection."
        },
        {
          question: "Can I save or record conversations?",
          answer: "No, we don't provide recording features to protect user privacy. Conversations are meant to be ephemeral and in-the-moment."
        }
      ]
    },
    {
      category: "Technical Issues",
      icon: MessageCircle,
      color: "text-orange-400",
      questions: [
        {
          question: "The chat isn't loading. What should I do?",
          answer: "Try refreshing the page, clearing your browser cache, or using a different browser. Make sure JavaScript is enabled and you're using a modern browser like Chrome, Firefox, or Safari."
        },
        {
          question: "I can't access my camera/microphone.",
          answer: "Check your browser permissions and ensure no other applications are using your camera. Try refreshing the page and granting camera/microphone permissions when prompted."
        },
        {
          question: "The app is running slowly.",
          answer: "Close other browser tabs, check your internet connection, or try using a different device. Video chat requires a stable internet connection for best performance."
        },
        {
          question: "I'm having trouble with matchmaking.",
          answer: "Matchmaking depends on available users. Try again during peak hours or check your internet connection. If issues persist, contact our support team."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold neon-text mb-8 text-center">Frequently Asked Questions</h1>
          <p className="text-xl text-white/70 mb-12 text-center max-w-3xl mx-auto">
            Find answers to common questions about YaariZone. Can't find what you're looking for?
            <a href="/contact" className="text-yaari-purple hover:underline ml-1">Contact our support team</a>.
          </p>

          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className={category.color} size={24} />
                  <h2 className="text-2xl font-semibold">{category.category}</h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = `${categoryIndex}-${faqIndex}`;
                    const isOpen = openItems.has(globalIndex);

                    return (
                      <div key={faqIndex} className="border-b border-white/10 last:border-b-0">
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full text-left py-4 flex items-center justify-between hover:bg-white/5 rounded-lg px-4 transition-colors"
                        >
                          <span className="font-medium pr-4">{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="text-yaari-purple flex-shrink-0" size={20} />
                          ) : (
                            <ChevronDown className="text-white/50 flex-shrink-0" size={20} />
                          )}
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-4 px-4 text-white/80">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="glass-card p-8 mt-12 text-center"
          >
            <HelpCircle className="text-yaari-purple mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-semibold mb-4">Still Need Help?</h3>
            <p className="text-white/80 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-yaari-purple/20 hover:bg-yaari-purple/30 text-yaari-purple px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/report"
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Report an Issue
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;

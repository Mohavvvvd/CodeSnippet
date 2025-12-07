import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Users, Shield, Zap, Heart, Globe, FileText, Lock, 
  ExternalLink, Instagram, Github, Link, Sparkles, Terminal,
  BookOpen, Key, Eye, Mail, Award, Cpu, Rocket, Brain,
  X, CheckCircle
} from 'lucide-react';

const About = ({ isOpen, onClose, onOpenTerms, onOpenPrivacy }) => {
  const features = [
    {
      icon: <Terminal />,
      title: "Smart Organization",
      description: "Advanced tagging and filtering",
      color: "blue"
    },
    {
      icon: <Lock />,
      title: "Privacy Control",
      description: "Public or private snippets",
      color: "emerald"
    },
    {
      icon: <Cpu />,
      title: "Syntax Intelligence",
      description: "50+ language support",
      color: "purple"
    },
    {
      icon: <Rocket />,
      title: "Lightning Fast",
      description: "Instant search & updates",
      color: "orange"
    },
    {
      icon: <Brain />,
      title: "AI Search",
      description: "Context-aware searching",
      color: "indigo"
    },
    {
      icon: <BookOpen />,
      title: "Knowledge Base",
      description: "Personal coding library",
      color: "amber"
    }
  ];

  const socialLinks = [
    {
      platform: "GitHub",
      icon: <Github size={18} />,
      url: "https://github.com/mohavvvvd",
      color: "gray"
    },
    {
      platform: "Instagram",
      icon: <Instagram size={18} />,
      url: "https://instagram.com/mohavvvvd",
      color: "pink"
    },
    {
      platform: "Portfolio",
      icon: <Link size={18} />,
      url: "https://mohavvvvd.netlify.app",
      color: "blue"
    }
  ];

  const colorMap = {
    blue: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
    emerald: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400",
    purple: "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400",
    orange: "text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400",
    indigo: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400",
    amber: "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400",
    pink: "text-pink-600 bg-pink-50 dark:bg-pink-900/20 dark:text-pink-400",
    gray: "text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                      CodeSnippet Manager
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      About this platform
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-8">
                {/* Introduction */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Welcome to CodeSnippet Manager
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      A modern platform designed for developers to organize, discover, and share code snippets efficiently. 
                      Built with simplicity and productivity in mind.
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-blue-600 dark:text-blue-400">
                      <CheckCircle size={16} />
                      <span className="text-sm font-medium">Trusted by thousands of developers</span>
                    </div>
                  </div>
                </section>

                {/* Features */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Key Features
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group"
                      >
                        <div className={`p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-${feature.color}-300 dark:hover:border-${feature.color}-700 transition-all duration-200 group-hover:shadow-sm`}>
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${colorMap[feature.color].split(' ')[0]} ${colorMap[feature.color].split(' ')[1]}`}>
                              {feature.icon}
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                                {feature.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* Policies */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Legal & Privacy
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <h3 className="font-medium text-gray-900 dark:text-white">Terms of Service</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Understand your rights and responsibilities
                      </p>
                      <button
                        onClick={onOpenTerms}
                        className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        Read terms <ExternalLink size={14} />
                      </button>
                    </div>
                    
                    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="w-5 h-5 text-purple-500" />
                        <h3 className="font-medium text-gray-900 dark:text-white">Privacy Policy</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        How we protect your data and privacy
                      </p>
                      <button
                        onClick={onOpenPrivacy}
                        className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                      >
                        View policy <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </section>

                {/* Developer */}
                <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          MG
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                          <Award size={14} className="text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        Mohamed Ghoul
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm mb-3 flex items-center gap-2">
                        <Code size={14} />
                        Full Stack Developer
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        Building intuitive tools that enhance developer productivity and workflow efficiency.
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {socialLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${colorMap[link.color]} hover:opacity-90`}
                          >
                            {link.icon}
                            {link.platform}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart size={16} className="text-pink-500" />
                      <h4 className="font-medium text-gray-900 dark:text-white">Development Philosophy</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Focus on creating software that's both functional and delightful. Every feature is designed 
                      with developer experience as the priority.
                    </p>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="px-6 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Status: <span className="font-medium text-green-600 dark:text-green-400">Online</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Heart size={14} className="text-red-500" />
                      <span>Made with passion</span>
                    </div>
                    <div className="hidden sm:block">•</div>
                    <div>v2.0 • © {new Date().getFullYear()}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default About;

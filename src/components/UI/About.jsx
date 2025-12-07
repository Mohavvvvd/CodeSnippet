import { motion } from 'framer-motion';
import { 
  Code, Users, Shield, Zap, Heart, Globe, FileText, Lock, 
  ExternalLink, Instagram, Github, Link, Sparkles, Terminal,
  BookOpen, Key, Eye, Mail, Award, Cpu, Rocket, Brain
} from 'lucide-react';

const About = ({ isOpen, onClose, onOpenTerms, onOpenPrivacy }) => {
  const features = [
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "Smart Organization",
      description: "Advanced tagging, search, and filtering to keep your code perfectly organized.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Privacy Control",
      description: "Choose between public or private snippets with granular access control.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Syntax Intelligence",
      description: "Advanced syntax highlighting with auto-detection for 50+ languages.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized performance with instant search and real-time updates.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Smart Search",
      description: "AI-powered search that understands context and intent.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Knowledge Base",
      description: "Build your personal coding knowledge library with ease.",
      color: "from-yellow-500 to-amber-500"
    }
  ];

  const socialLinks = [
    {
      platform: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/mohavvvvd",
      color: "hover:bg-gray-900 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200",
      bg: "bg-gray-100 dark:bg-gray-900"
    },
    {
      platform: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: "https://instagram.com/mohavvvvd",
      color: "hover:bg-pink-600 hover:text-white text-pink-600 dark:text-pink-400",
      bg: "bg-pink-50 dark:bg-pink-900/20"
    },
    {
      platform: "Website",
      icon: <Link className="w-5 h-5" />,
      url: "https://mohavvvvd.netlify.app",
      color: "hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    }
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-[100]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 300,
          duration: 0.5
        }}
        className="relative w-full max-w-4xl h-[90vh] bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Background */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)",
              "radial-gradient(circle at 90% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 40%)",
              "radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-gray-600 dark:text-gray-400 transition-all z-50 shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* Main Content Container */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {/* Header */}
          <div className="relative px-8 pt-12 pb-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30 scale-110" />
                  <div className="relative p-5 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl">
                    <Code className="w-10 h-10 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-bold mb-3"
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  CodeSnippet Manager
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 dark:text-gray-400 text-lg"
              >
                Your intelligent code organization platform
              </motion.p>
            </div>

            {/* Platform Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-200/50 dark:border-gray-700/50"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Globe className="text-blue-500" />
                About the Platform
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  CodeSnippet Manager is more than just a storage app - it's your personal coding companion. 
                  Designed for developers, students, and tech enthusiasts who want to organize, discover, 
                  and share code snippets efficiently.
                </p>
                <p>
                  With intelligent categorization, powerful search capabilities, and seamless collaboration 
                  features, we help you build your personal knowledge base while staying productive and 
                  organized.
                </p>
                <p className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                  <Sparkles className="w-4 h-4" />
                  Join thousands of developers who have transformed their coding workflow
                </p>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="px-8 pb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center"
            >
              Platform Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Terms & Privacy Section */}
          <div className="px-8 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Terms & Conditions</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Read our terms of service to understand your rights and responsibilities when using our platform.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenTerms}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                >
                  View Terms
                  <ExternalLink size={16} />
                </motion.button>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="text-purple-600 dark:text-purple-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Privacy Policy</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Learn how we protect your data and privacy. We're committed to keeping your information secure.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenPrivacy}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all"
                >
                  View Policy
                  <ExternalLink size={16} />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Developer Section */}
          <div className="px-8 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 border border-gray-700/50"
            >
              {/* Animated Background */}
              <motion.div
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  {/* Developer Avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex-shrink-0"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50" />
                      <div className="relative w-32 h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                        MG
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center border-4 border-gray-900">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Developer Info */}
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-2">Mohamed Ghoul</h2>
                    <p className="text-xl text-blue-300 mb-4 flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Full Stack Developer & Creator
                    </p>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Passionate software engineer dedicated to creating tools that enhance developer productivity. 
                      With expertise in modern web technologies, I built CodeSnippet Manager to solve a common 
                      problem I faced in my own workflow. I believe in building intuitive, powerful tools that 
                      make developers' lives easier.
                    </p>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((link, index) => (
                        <motion.a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-2 px-4 py-3 rounded-xl ${link.bg} ${link.color} transition-all backdrop-blur-sm border border-gray-700/50`}
                        >
                          {link.icon}
                          <span className="font-medium">{link.platform}</span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Developer Philosophy */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 pt-8 border-t border-gray-700/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-6 h-6 text-pink-400" />
                    <h3 className="text-xl font-bold text-white">Development Philosophy</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    I believe in creating software that's not just functional, but delightful to use. 
                    Every feature in CodeSnippet Manager is designed with developer experience in mind - 
                    from the intuitive interface to the powerful search capabilities. My goal is to help 
                    developers focus on what they do best: creating amazing software.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="px-8 py-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                Platform Status: <span className="font-semibold text-green-600 dark:text-green-400">Operational</span>
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm">Made with passion for developers</span>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Version 2.0.0 • © {new Date().getFullYear()} CodeSnippet Manager
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Bottom Border */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      </motion.div>
    </motion.div>
  );
};

export default About;
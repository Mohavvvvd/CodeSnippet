import { motion } from 'framer-motion';
import { Code, Users, Shield, Zap, Heart } from 'lucide-react';

const About = ({ onClose }) => {
  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Organize Your Code",
      description: "Keep all your important code snippets in one place, with intuitive categorization and syntax highlighting."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborate Effortlessly",
      description: "Share your snippets with teammates or the community while keeping private snippets secure."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe & Private",
      description: "Your snippets are stored securely, giving you full control over who can access them."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast & Smooth",
      description: "Designed for speed and simplicity, making snippet management seamless and enjoyable."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Code className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">CodeSnippet Manager</h1>
                <p className="text-blue-100">Your personal library of code snippets</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">About This App</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              CodeSnippet Manager is your personal assistant for organizing code. Whether you're a developer, student, or hobbyist, it helps you quickly save, find, and share snippets. Focus on coding, while we keep everything tidy and accessible.
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Why You'll Love It</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="text-blue-600 dark:text-blue-400 mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* How to Use */}
          <section className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Getting Started</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Create new snippets with titles and descriptions.</li>
              <li>Organize them with tags and mark favorites for easy access.</li>
              <li>Search, filter, and quickly retrieve the code you need.</li>
              <li>Share public snippets or keep them private.</li>
            </ol>
          </section>
          {/* About the Developer */}
<section className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">About the Developer</h2>
  <div className="flex items-start space-x-4">
    <div className="w-40 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
      MG
    </div>
    <div>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        Hi, I'm <strong>Mohamed Ghoul</strong>, a passionate software engineer and the creator of CodeSnippet Manager. 
        I designed this app to help developers like you organize, manage, and share code snippets efficiently. 
        My goal is to make coding easier, faster, and more enjoyable for everyone.
      </p>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Feel free to explore, give feedback, or share your favorite snippets with the community!
      </p>
    </div>
  </div>
</section>


          {/* Footer */}
          <section className="text-center border-t border-gray-200 dark:border-gray-600 pt-6">
            <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400 mb-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for developers</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Version 1.0.0</div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;

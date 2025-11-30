import { motion } from 'framer-motion';
import { Terminal, Zap, Shield, GitBranch } from 'lucide-react';

const WelcomeScreen = ({ onLogin, onSignup }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center max-w-2xl mx-auto p-6"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Terminal className="mx-auto text-blue-400 mb-4" size={80} />
        </motion.div>
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Welcome to CodeVault
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Your ultimate code snippet library. Save, organize, and access your code snippets from anywhere.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: <Zap className="text-yellow-400" />, text: "Lightning Fast" },
            { icon: <Shield className="text-green-400" />, text: "Secure & Private" },
            { icon: <GitBranch className="text-purple-400" />, text: "Version Ready" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
            >
              {item.icon}
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogin}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-medium"
          >
            Sign In to Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSignup}
            className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
          >
            Create New Account
          </motion.button>
        </div>
        
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
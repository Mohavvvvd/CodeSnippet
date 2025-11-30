import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, Clock, Lock } from 'lucide-react';

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[100vh] overflow-hidden border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Terms of Service
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-xl text-gray-500 dark:text-gray-400 transition-all duration-200 hover:scale-105"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="prose dark:prose-invert max-w-none">
                {/* Quick Summary */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Quick Summary
                  </h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• We respect your privacy and protect your data</li>
                    <li>• You own your content - we just help you manage it</li>
                    <li>• We use Google Sign-in for secure authentication</li>
                    <li>• You can delete your account anytime</li>
                  </ul>
                </div>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-500" />
                    1. Acceptance of Terms
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                </section>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. User Responsibilities</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                  </p>
                </section>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. Content Ownership</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You retain all ownership rights to the content you create and store using our service. We claim no intellectual property rights over the material you provide.
                  </p>
                </section>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-blue-500" />
                    4. Privacy and Data Protection
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We are committed to protecting your privacy. Your personal information is stored securely and we do not share it with third parties without your consent, except as required by law.
                  </p>
                </section>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. Service Modifications</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
                  </p>
                </section>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. Termination</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You may terminate your account at any time by contacting us. We reserve the right to terminate accounts that violate these terms or are involved in fraudulent or illegal activities.
                  </p>
                </section>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Questions?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    If you have any questions about these Terms of Service, please contact us at mohavvvvd.2021@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Please read these terms carefully before using our service
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  I Understand
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;
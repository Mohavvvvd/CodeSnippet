import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Eye, Database, UserCheck, Mail } from 'lucide-react';

const PrivacyModal = ({ isOpen, onClose }) => {
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
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-600 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Privacy Policy
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
                {/* Privacy Highlights */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Your Privacy Matters
                  </h3>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• We only collect necessary information</li>
                    <li>• Your data is encrypted and secure</li>
                    <li>• We don't sell your personal information</li>
                    <li>• You control your data</li>
                  </ul>
                </div>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <UserCheck className="w-5 h-5 mr-2 text-blue-500" />
                    1. Information We Collect
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    When you use Google Sign-in, we collect only the necessary information to create your account:
                  </p>
                  <ul className="text-gray-700 dark:text-gray-300 list-disc list-inside space-y-2 ml-4">
                    <li>Your name and email address from your Google account</li>
                    <li>Profile picture (if available)</li>
                    <li>Authentication tokens to maintain your secure session</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Database className="w-5 h-5 mr-2 text-purple-500" />
                    2. How We Use Your Information
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We use the collected information for the following purposes:
                  </p>
                  <ul className="text-gray-700 dark:text-gray-300 list-disc list-inside space-y-2 ml-4">
                    <li>To create and maintain your user account</li>
                    <li>To provide and personalize our services</li>
                    <li>To communicate important updates about our service</li>
                    <li>To ensure the security of your account</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. Data Protection</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is encrypted in transit and at rest.
                  </p>
                </section>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. Third-Party Services</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We use Google Authentication services for secure sign-in. Your interaction with Google is governed by Google's Privacy Policy. We do not have access to your Google password.
                  </p>
                </section>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. Your Rights</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You have the right to:
                  </p>
                  <ul className="text-gray-700 dark:text-gray-300 list-disc list-inside space-y-2 ml-4">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal data</li>
                    <li>Export your data in a portable format</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. Data Retention</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We retain your personal information only for as long as necessary to provide you with our services and as described in this Privacy Policy. When you delete your account, we permanently remove your personal data from our systems.
                  </p>
                </section>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">7. Changes to This Policy</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "last updated" date.
                  </p>
                </section>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Us
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    If you have any questions about this Privacy Policy or your personal data, please contact us at mohavvvvd.2021@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  We are committed to protecting your privacy and personal data
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
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

export default PrivacyModal;
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Code2, FileText, Tag, Globe, Lock, Sparkles } from 'lucide-react';
import TagInput from './TagInput';
import { LANGUAGES } from '../../utils/constants';

const SnippetEditor = ({
  isOpen,
  onClose,
  onSave,
  formData,
  onFormChange,
  isEditing
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSave();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Background */}
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 -z-10"
            />

            {/* Header */}
            <div className="relative flex items-center justify-between px-6 sm:px-8 py-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
                >
                  <Code2 className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    {isEditing ? 'Edit Snippet' : 'Create New Snippet'}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    {isEditing ? 'Update your code masterpiece' : 'Add to your collection'}
                    <Sparkles className="w-3 h-3 text-yellow-500" />
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-gray-600 dark:text-gray-400 transition-all"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-180px)] px-6 sm:px-8 py-6">
              <div className="space-y-6" onKeyPress={handleKeyPress}>
                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <FileText size={16} className="text-blue-500" />
                    Title
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => onFormChange('title', e.target.value)}
                    className="w-full px-4 py-3 text-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                    placeholder="e.g., React Custom Hook for API Calls"
                  />
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <FileText size={16} className="text-purple-500" />
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => onFormChange('description', e.target.value)}
                    className="w-full px-4 py-3 text-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder:text-gray-400 resize-none"
                    rows={3}
                    placeholder="Brief description of what this snippet does..."
                  />
                </motion.div>

                {/* Language & Visibility */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {/* Language */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <Code2 size={16} className="text-green-500" />
                      Language
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => onFormChange('language', e.target.value)}
                      className="w-full px-4 py-3 text-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all cursor-pointer"
                    >
                      {LANGUAGES.map(lang => (
                        <option key={lang} value={lang}>
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Visibility Toggle */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {formData.isPublic ? <Globe size={16} className="text-blue-500" /> : <Lock size={16} className="text-gray-500" />}
                      Visibility
                    </label>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onFormChange('isPublic', !formData.isPublic)}
                      className={`w-full px-4 py-3 rounded-xl font-medium text-sm transition-all border-2 ${
                        formData.isPublic
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-400'
                          : 'bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {formData.isPublic ? (
                          <>
                            <Globe size={16} />
                            Public
                          </>
                        ) : (
                          <>
                            <Lock size={16} />
                            Private
                          </>
                        )}
                      </span>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Code Editor */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Code2 size={16} className="text-pink-500" />
                    Code
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      value={formData.code}
                      onChange={(e) => onFormChange('code', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-900 text-gray-100 font-mono text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all placeholder:text-gray-500 shadow-inner"
                      rows={12}
                      placeholder="// Write your code here..."
                      spellCheck={false}
                    />
                    {/* Line numbers indicator */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-gray-800/80 backdrop-blur-sm rounded text-xs text-gray-400 font-mono">
                      {formData.code.split('\n').length} lines
                    </div>
                  </div>
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Tag size={16} className="text-orange-500" />
                    Tags
                    <span className="text-xs text-gray-500 font-normal">(Press Enter to add)</span>
                  </label>
                  <TagInput
                    tags={formData.tags}
                    allTags={[]}
                    onAdd={(tag) => onFormChange('tags', [...formData.tags, tag])}
                    onRemove={(tag) => onFormChange('tags', formData.tags.filter(t => t !== tag))}
                  />
                </motion.div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row gap-3 px-6 sm:px-8 py-5 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-semibold"
              >
                <Save size={20} />
                {isEditing ? 'Update Snippet' : 'Save Snippet'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-6 sm:px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-semibold"
              >
                Cancel
              </motion.button>
            </div>

            {/* Bottom Gradient Border */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SnippetEditor;
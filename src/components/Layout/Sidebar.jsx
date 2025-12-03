import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, Star, Code, Tag, Sparkles, RefreshCw } from 'lucide-react';
import { LANGUAGES } from '../../utils/constants';

const Sidebar = ({
  isOpen,
  onToggle,
  searchQuery,
  onSearchChange,
  selectedLanguage,
  onLanguageChange,
  selectedTags,
  onTagToggle,
  showFavoritesOnly,
  onFavoritesToggle,
  allTags,
  onClearFilters
}) => {
  const hasActiveFilters = searchQuery || selectedLanguage || showFavoritesOnly || selectedTags.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          variants={{
            open: { x: 0, opacity: 1 },
            closed: { x: -300, opacity: 0 }
          }}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed lg:sticky inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-r border-gray-200/50 dark:border-gray-700/50 lg:top-[70px] h-screen lg:h-[calc(100vh-70px)] overflow-y-auto shadow-xl backdrop-blur-xl"
        >
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
          
          <div className="relative p-4 sm:p-6 space-y-6">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Filter className="text-blue-500" size={22} />
                </motion.div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Filters
                </h2>
              </div>
              
              {/* Clear Filters Badge */}
              {hasActiveFilters && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClearFilters}
                  className="p-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-lg"
                  title="Clear all filters"
                >
                  <RefreshCw size={16} />
                </motion.button>
              )}
              
              {/* Mobile Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggle}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
              >
                <X size={20} />
              </motion.button>
            </motion.div>

            {/* Active Filters Count */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700"
              >
                <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  {[searchQuery, selectedLanguage, showFavoritesOnly, ...selectedTags].filter(Boolean).length} active filters
                </span>
              </motion.div>
            )}

            {/* Search with Icon Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <Search size={16} className="text-blue-500" />
                Search Snippets
              </label>
              <div className="relative group">
                <motion.div
                  animate={{ scale: searchQuery ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-3 top-2.5"
                >
                  <Search className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                </motion.div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Type to search..."
                  className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                {searchQuery && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X size={18} />
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Language Filter with Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <Code size={16} className="text-purple-500" />
                Programming Language
              </label>
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="">All Languages</option>
                  {LANGUAGES.map(lang => (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Favorites Toggle with Star Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.label 
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl cursor-pointer border-2 border-transparent hover:border-yellow-300 dark:hover:border-yellow-700 transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="checkbox"
                  checked={showFavoritesOnly}
                  onChange={(e) => onFavoritesToggle(e.target.checked)}
                  className="w-5 h-5 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                />
                <div className="flex items-center gap-2 flex-1">
                  <motion.div
                    animate={{ 
                      rotate: showFavoritesOnly ? [0, 360] : 0,
                      scale: showFavoritesOnly ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Star 
                      size={18} 
                      className={`${showFavoritesOnly ? 'text-yellow-500 fill-yellow-500' : 'text-yellow-600 dark:text-yellow-400'}`} 
                    />
                  </motion.div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-yellow-700 dark:group-hover:text-yellow-300 transition-colors">
                    Show Favorites Only
                  </span>
                </div>
              </motion.label>
            </motion.div>

            {/* Tag Cloud */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <Tag size={16} className="text-green-500" />
                Filter by Tags
                {allTags.length > 0 && (
                  <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                    {allTags.length}
                  </span>
                )}
              </label>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto custom-scrollbar">
                  {allTags.length > 0 ? (
                    allTags.slice(0, 20).map((tag, index) => (
                      <motion.button
                        key={tag}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onTagToggle(tag)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all shadow-sm ${
                          selectedTags.includes(tag)
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        #{tag}
                      </motion.button>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">No tags available</p>
                  )}
                </div>
              </div>
              
              {/* Selected Tags Display */}
              <AnimatePresence>
                {selectedTags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                        Selected Tags ({selectedTags.length})
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => selectedTags.forEach(tag => onTagToggle(tag))}
                        className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                      >
                        Clear all
                      </motion.button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTags.map(tag => (
                        <motion.span
                          key={tag}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-md"
                        >
                          #{tag}
                          <button
                            onClick={() => onTagToggle(tag)}
                            className="hover:text-red-600 dark:hover:text-red-400"
                          >
                            <X size={12} />
                          </button>
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Footer Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Sparkles size={14} />
                <span>Where Studrz stops, we continue.</span>
              </div>
            </motion.div>
          </div>

          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #cbd5e0;
              border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #a0aec0;
            }
            .dark .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #4a5568;
            }
            .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #718096;
            }
          `}</style>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
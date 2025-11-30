import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
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
        <>
          {/* Mobile Sidebar */}
          <motion.aside
            variants={{
              open: { x: 0, opacity: 1 },
              closed: { x: -300, opacity: 0 }
            }}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: "spring", damping: 25 }}
            className="fixed lg:sticky inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:top-[70px] h-screen lg:h-[calc(100vh-70px)] overflow-y-auto lg:overflow-visible"
          >
            <div className="p-4 sm:p-6">
              {/* Mobile Close Button */}
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                <button
                  onClick={onToggle}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search snippets..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Language
                  </label>
                  {hasActiveFilters && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClearFilters}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      Clear
                    </motion.button>
                  )}
                </div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Languages</option>
                  {LANGUAGES.map(lang => (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Favorites Toggle */}
              <div className="mb-4 sm:mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFavoritesOnly}
                    onChange={(e) => onFavoritesToggle(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Favorites Only</span>
                </label>
              </div>

              {/* Tag Cloud with Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Filter by Tags
                </label>
                <div className="flex flex-wrap gap-1 sm:gap-2 max-h-32 overflow-y-auto mb-3">
                  {allTags.slice(0, 15).map(tag => (
                    <motion.button
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onTagToggle(tag)}
                      className={`px-2 py-1 text-xs rounded-full transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
                
                {/* Selected Tags */}
                {selectedTags.length > 0 && (
                  <div className="mt-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Selected tags:</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedTags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
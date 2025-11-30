import { motion } from 'framer-motion';
import SnippetCard from './SnippetCard';
import LoadingSpinner from '../UI/LoadingSpinner';
import { Code, Plus } from 'lucide-react';

const SnippetGrid = ({ 
  snippets, 
  isLoading, 
  onEdit, 
  onDelete, 
  onToggleFavorite,
  onNewSnippet,
  searchQuery,
  selectedTags,
  selectedLanguage,
  showFavoritesOnly
  , user
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (snippets.length === 0) {
    const hasFilters = searchQuery || selectedTags.length > 0 || selectedLanguage || showFavoritesOnly;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 sm:py-12"
      >
        <Code className="mx-auto text-gray-400 mb-3 sm:mb-4 sm:w-16 sm:h-16" size={48} />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {hasFilters ? 'No snippets match your filters' : 'No snippets found'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm sm:text-base">
          {hasFilters
            ? 'Try adjusting your filters or search terms'
            : 'Get started by creating your first snippet'}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNewSnippet}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-lg text-sm sm:text-base"
        >
          <Plus size={18} className="sm:w-5 sm:h-5" />
          Create First Snippet
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
    >
      {snippets.map((snippet, index) => (
        <SnippetCard
          key={snippet._id}
          user = {user}
          snippet={snippet}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </motion.div>
  );
};

export default SnippetGrid;
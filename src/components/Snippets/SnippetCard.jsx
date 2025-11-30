import { motion } from 'framer-motion';
import { Star, Edit3, Trash2, Code } from 'lucide-react';

const SnippetCard = ({ snippet, user, onEdit, onDelete, onToggleFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(snippet._id, snippet.isFavorited);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(snippet);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(snippet._id);
  };
console.log('Header user:', user);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="p-4 sm:p-6">
        {/* Header with language and favorite button */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Code className="text-blue-500" size={18} />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {snippet.language}
            </span>
            {!snippet.isPublic && (
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                Private
              </span>
            )}
          </div>
          <button
            onClick={handleFavoriteClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group"
            title={snippet.isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star
              size={18}
              className={
                snippet.isFavorited
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-400 group-hover:text-yellow-500 transition-colors"
              }
            />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-800 dark:text-white mb-2 text-lg line-clamp-2">
          {snippet.title}
        </h3>

        {/* Description */}
        {snippet.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {snippet.description}
          </p>
        )}

        {/* Code Preview */}
        <div translate="no" className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-4 font-mono text-xs text-gray-700 dark:text-gray-300 overflow-hidden">
          <pre className="whitespace-pre-wrap line-clamp-3">
            {snippet.content}
          </pre>
        </div>

        {/* Tags */}
        {snippet.tags && snippet.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {snippet.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {snippet.tags.length > 3 && (
              <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                +{snippet.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer with date and actions */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
          <span>By: {snippet.by}</span>

          {/* Only show edit/delete if the current user is the owner */}
          {user && snippet.userId === user.uid && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleEditClick}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-blue-600 dark:text-blue-400"
                title="Edit snippet"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={handleDeleteClick}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-red-600 dark:text-red-400"
                title="Delete snippet"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SnippetCard;

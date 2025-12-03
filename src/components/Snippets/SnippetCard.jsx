import { motion } from 'framer-motion';
import { Star, Edit3, Trash2, Code, Calendar, User, Copy, Check, Lock, Eye, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import SnippetDetailModal from './SnippetDetailModal';

const SnippetCard = ({ snippet, user, onEdit, onDelete, onToggleFavorite }) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsDetailModalOpen(true);
  };

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

  const handleCopyCode = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(snippet.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOwner = user && snippet.userId === user.uid;

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleCardClick}
        className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 cursor-pointer"
      >
        {/* Click overlay indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none z-10"
        />

        {/* Gradient accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        
        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          animate={{
            scale: isHovered ? [1, 1.02, 1] : 1,
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />

        <div className="relative p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Language badge with icon */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-xs font-semibold shadow-md"
              >
                <Code size={14} />
                <span className="uppercase tracking-wide">{snippet.language}</span>
              </motion.div>
              
              {/* Privacy badge */}
              {!snippet.isPublic && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 px-2.5 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium"
                >
                  <Lock size={12} />
                  <span>Private</span>
                </motion.div>
              )}

              {/* Click indicator */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: 0 }}
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium"
              >
                <Eye size={12} />
                <span>View details</span>
              </motion.div>
            </div>

            {/* Favorite button */}
            <motion.button
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteClick}
              className="p-2 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-xl transition-colors group/fav z-20 relative"
              title={snippet.isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <motion.div
                animate={{
                  scale: snippet.isFavorited ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Star
                  size={20}
                  className={
                    snippet.isFavorited
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-gray-400 group-hover/fav:text-yellow-500 transition-colors"
                  }
                />
              </motion.div>
            </motion.button>
          </div>

          {/* Title with gradient on hover */}
          <motion.h3 
            className="font-bold text-gray-900 dark:text-white mb-3 text-lg sm:text-xl line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
          >
            {snippet.title}
          </motion.h3>

          {/* Description */}
          {snippet.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
              {snippet.description}
            </p>
          )}

          {/* Code Preview with copy button */}
          <div className="relative group/code mb-4">
            <div 
              translate="no" 
              className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-xl p-4 font-mono text-xs text-gray-100 overflow-hidden border border-gray-700"
            >
              <pre className="whitespace-pre-wrap line-clamp-4 leading-relaxed">
                {snippet.content}
              </pre>
              
              {/* Fade overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 dark:from-gray-950 to-transparent pointer-events-none" />
            </div>

            {/* Copy button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopyCode}
              className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-colors z-20"
              title="Copy code"
            >
              {copied ? (
                <Check size={16} className="text-green-600" />
              ) : (
                <Copy size={16} className="text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>
          </div>

          {/* Tags */}
          {snippet.tags && snippet.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {snippet.tags.slice(0, 4).map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="inline-flex items-center px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-lg"
                >
                  #{tag}
                </motion.span>
              ))}
              {snippet.tags.length > 4 && (
                <motion.span 
                  whileHover={{ scale: 1.1 }}
                  className="inline-flex items-center px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-lg"
                >
                  +{snippet.tags.length - 4}
                </motion.span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            {/* Meta info */}
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User size={14} />
                <span className="font-medium">{snippet.by}</span>
              </div>
            </div>

            {/* Action buttons - only for owner */}
            {isOwner && (
              <div className="flex items-center gap-1 z-20 relative">
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleEditClick}
                  className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors text-blue-600 dark:text-blue-400 group/edit"
                  title="Edit snippet"
                >
                  <Edit3 size={16} className="group-hover/edit:rotate-12 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDeleteClick}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-600 dark:text-red-400 group/delete"
                  title="Delete snippet"
                >
                  <Trash2 size={16} className="group-hover/delete:rotate-12 transition-transform" />
                </motion.button>
              </div>
            )}
          </div>

          {/* Owner badge */}
          {isOwner && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-[28px] right-[67px] px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] font-bold rounded-md shadow-md z-20"
            >
              YOURS
            </motion.div>
          )}
        </div>

        {/* Bottom shine effect on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            x: isHovered ? ['-100%', '100%'] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Detail Modal */}
      <SnippetDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        snippet={snippet}
        user={user}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleFavorite={onToggleFavorite}
      />
    </>
  );
};

export default SnippetCard;
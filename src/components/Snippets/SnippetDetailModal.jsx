import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Star, Edit3, Trash2, Code, Calendar, User, Copy, Check, 
  Lock, Eye, ExternalLink, Download, FileText, Tag, Zap,
  BookOpen, Sparkles, Layers, Maximize2, ArrowUp, ArrowDown,
  Smartphone, Tablet, Monitor, Terminal, Hash, Clock
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SnippetDetailModal = ({ isOpen, onClose, snippet, user, onEdit, onDelete, onToggleFavorite }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('code');
  const [isHovered, setIsHovered] = useState(false);
  const [isFavoriteAnimating, setIsFavoriteAnimating] = useState(false);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const modalContentRef = useRef(null);

  const isOwner = user && snippet.userId === user.uid;
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const snippetShareUrl = `${API_BASE}/snippets/${snippet._id}`;

  const languageConfig = {
    javascript: { emoji: '💛', ext: 'js', color: 'from-yellow-500 to-amber-600' },
    python: { emoji: '🐍', ext: 'py', color: 'from-emerald-500 to-green-600' },
    java: { emoji: '☕', ext: 'java', color: 'from-red-500 to-orange-600' },
    cpp: { emoji: '⚡', ext: 'cpp', color: 'from-blue-500 to-cyan-600' },
    html: { emoji: '🌐', ext: 'html', color: 'from-orange-500 to-red-600' },
    css: { emoji: '🎨', ext: 'css', color: 'from-blue-400 to-indigo-600' },
    sql: { emoji: '🗃️', ext: 'sql', color: 'from-gray-500 to-gray-700' },
    bash: { emoji: '💻', ext: 'sh', color: 'from-gray-600 to-gray-800' },
    go: { emoji: '🚀', ext: 'go', color: 'from-cyan-500 to-blue-600' },
    rust: { emoji: '🦀', ext: 'rs', color: 'from-orange-600 to-red-700' },
    text: { emoji: '📄', ext: 'txt', color: 'from-gray-400 to-gray-600' },
    markdown: { emoji: '📝', ext: 'md', color: 'from-blue-400 to-purple-600' },
    json: { emoji: '🔤', ext: 'json', color: 'from-green-400 to-emerald-600' }
  };

  const currentLangConfig = languageConfig[snippet.language] || { 
    emoji: '📄', 
    ext: snippet.language, 
    color: 'from-blue-500 to-purple-600' 
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      if (modalContentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = modalContentRef.current;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(progress);
        setShowScrollButtons(scrollTop > 100);
      }
    };

    const modalContent = modalContentRef.current;
    if (modalContent) {
      modalContent.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (modalContent) {
        modalContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isOpen]);

  const handleCopyCode = (e) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(snippet.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = (e) => {
    e?.stopPropagation();
    const element = document.createElement('a');
    const file = new Blob([snippet.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${snippet.title.replace(/\s+/g, '-')}.${currentLangConfig.ext}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFavoriteClick = (e) => {
    e?.stopPropagation();
    setIsFavoriteAnimating(true);
    onToggleFavorite(snippet._id, snippet.isFavorited);
    setTimeout(() => setIsFavoriteAnimating(false), 1000);
  };

  const handleShare = async (e) => {
    e?.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: snippet.title,
          text: snippet.description || `Check out this ${snippet.language} code snippet`,
          url: snippetShareUrl,
        });
      } catch (error) {
        navigator.clipboard.writeText(snippetShareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      navigator.clipboard.writeText(snippetShareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEdit = (e) => {
    e?.stopPropagation();
    onEdit(snippet);
    onClose();
  };

  const handleDelete = (e) => {
    e?.stopPropagation();
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      onDelete(snippet._id);
      onClose();
    }
  };

  const scrollToTop = (e) => {
    e?.stopPropagation();
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = (e) => {
    e?.stopPropagation();
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ 
        top: modalContentRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const scrollbarStyles = `
    .modal-scrollbar::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    .modal-scrollbar::-webkit-scrollbar-track {
      background: rgba(200, 200, 200, 0.1);
      border-radius: 4px;
      margin: 4px;
    }
    
    .modal-scrollbar::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
      border-radius: 4px;
    }
    
    .modal-scrollbar::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(to bottom, #60a5fa, #a78bfa);
    }
    
    .code-scrollbar::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }
    
    .code-scrollbar::-webkit-scrollbar-track {
      background: rgba(30, 41, 59, 0.4);
      border-radius: 3px;
    }
    
    .code-scrollbar::-webkit-scrollbar-thumb {
      background: linear-gradient(to right, #3b82f6, #8b5cf6);
      border-radius: 3px;
    }
    
    .modal-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #3b82f6 rgba(200, 200, 200, 0.1);
    }
    
    .code-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #3b82f6 rgba(30, 41, 59, 0.4);
    }

    .scroll-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
      transform-origin: 0%;
      z-index: 9999;
      pointer-events: none;
    }
  `;

  if (!isOpen) return null;

  return (
    <>
      <style>{scrollbarStyles}</style>
      
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-990"
              onClick={onClose}
            />
            
            {/* Scroll Progress Bar */}
            <div 
              className="scroll-progress-bar" 
              style={{ transform: `scaleX(${scrollProgress / 100})` }}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 z-50" onClick={onClose}>
              <motion.div
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-full sm:max-w-6xl h-[95vh] sm:h-[90vh] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 flex flex-col"
              >
                {/* Click overlay indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none z-10"
                />

                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                {/* Header with badges and buttons */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700/50">
                  {/* Left side: Device indicator, language badge, privacy badge, owner badge */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Device indicator */}
                    <div className="flex items-center gap-2 opacity-70">
                      <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg text-xs text-gray-600 dark:text-gray-400">
                        <Monitor size={12} />
                        <span>Desktop</span>
                      </div>
                      <div className="flex sm:hidden items-center gap-1 px-2 py-1 bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg text-xs text-gray-600 dark:text-gray-400">
                        <Smartphone size={12} />
                        <span>Mobile</span>
                      </div>
                    </div>
                    
                    {/* Language badge */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${currentLangConfig.color} text-white rounded-lg text-xs font-semibold shadow-md`}
                    >
                      <Code size={14} />
                      <span className="uppercase tracking-wide">{currentLangConfig.emoji} {snippet.language}</span>
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

                    {/* Owner badge */}
                    {isOwner && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-md shadow-md"
                      >
                        YOURS
                      </motion.div>
                    )}
                  </div>

                  {/* Right side: Favorite button and close button */}
                  <div className="flex items-center gap-2">
                    {/* Favorite button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleFavoriteClick}
                      className="p-2 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-xl transition-colors group/fav relative"
                      title={snippet.isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <motion.div
                        animate={{
                          scale: isFavoriteAnimating ? [1, 1.5, 1] : 1,
                          rotate: isFavoriteAnimating ? [0, 360] : 0,
                        }}
                        transition={{ duration: 0.5 }}
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

                    {/* Close button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                      <X size={20} />
                    </motion.button>
                  </div>
                </div>

                {/* Scroll buttons */}
                <AnimatePresence>
                  {showScrollButtons && (
                    <>
                      <motion.button
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToTop}
                        className="absolute top-24 sm:top-28 right-3 p-2 bg-gradient-to-b from-blue-600 to-purple-600 text-white rounded-full shadow-xl z-50 flex items-center justify-center group"
                      >
                        <ArrowUp size={16} />
                        <span className="absolute -top-8 right-1/2 transform translate-x-1/2 bg-gray-800/90 text-xs text-gray-300 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
                          Scroll to Top
                        </span>
                      </motion.button>
                      
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        whileHover={{ scale: 1.1, y: 2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToBottom}
                        className="absolute bottom-14 right-3 p-2 bg-gradient-to-b from-purple-600 to-pink-600 text-white rounded-full shadow-xl z-50 flex items-center justify-center group"
                      >
                        <ArrowDown size={16} />
                        <span className="absolute -bottom-8 right-1/2 transform translate-x-1/2 bg-gray-800/90 text-xs text-gray-300 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
                          Scroll to Bottom
                        </span>
                      </motion.button>
                    </>
                  )}
                </AnimatePresence>

                {/* Main content */}
                <div 
                  ref={modalContentRef}
                  className="modal-scrollbar flex-1 overflow-y-auto relative z-10"
                >
                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    {/* Title */}
                    <motion.h1 
                      className="font-bold text-gray-900 dark:text-white mb-3 text-2xl sm:text-3xl line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                    >
                      {snippet.title}
                    </motion.h1>

                    {/* Description */}
                    {snippet.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-4">
                        {snippet.description}
                      </p>
                    )}

                    {/* Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
                    >
                      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700/50">
                        <div className="flex items-center gap-2">
                          <Calendar className="text-blue-600 dark:text-blue-400 w-4 h-4" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Created</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(snippet.createdAt)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700/50">
                        <div className="flex items-center gap-2">
                          <Clock className="text-purple-600 dark:text-purple-400 w-4 h-4" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Updated</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(snippet.updatedAt || snippet.createdAt)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700/50">
                        <div className="flex items-center gap-2">
                          <FileText className="text-green-600 dark:text-green-400 w-4 h-4" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Characters</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{snippet.content.length.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700/50">
                        <div className="flex items-center gap-2">
                          <User className="text-yellow-600 dark:text-yellow-400 w-4 h-4" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Author</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{snippet.by}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content area */}
                  <div className="px-5 sm:px-6 pb-6">
                    {/* Tabs */}
                    <div className="mb-6 border-b border-gray-200 dark:border-gray-700/50 overflow-x-auto pb-2 code-scrollbar">
                      <div className="flex items-center gap-1">
                        {[
                          { id: 'code', label: 'Code', icon: Code },
                          { id: 'details', label: 'Details', icon: FileText },
                          { id: 'tags', label: 'Tags', icon: Tag },
                        ].map((tab) => (
                          <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab(tab.id);
                            }}
                            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${
                              activeTab === tab.id
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/40'
                            }`}
                          >
                            <tab.icon size={16} />
                            {tab.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Tab content */}
                    <div className="min-h-[300px]">
                      {activeTab === 'code' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="relative"
                        >
                          {/* Code header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                              </div>
                              <span className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                                {snippet.title}.{currentLangConfig.ext}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleCopyCode}
                                className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm shadow-sm"
                              >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                <span className="hidden xs:inline">{copied ? 'Copied!' : 'Copy Code'}</span>
                                <span className="xs:hidden">{copied ? 'Copied' : 'Copy'}</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDownloadCode}
                                className="flex items-center gap-1.5 px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm shadow-sm"
                              >
                                <Download size={14} />
                                <span className="hidden xs:inline">Download</span>
                                <span className="xs:hidden">DL</span>
                              </motion.button>
                            </div>
                          </div>

                          {/* Code block */}
                          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-xl">
                            <div className="px-4 py-3 bg-gray-800/50 border-b border-gray-700 flex items-center justify-between">
                              <span className="text-gray-400 text-sm font-mono">
                                {snippet.content.split('\n').length} lines
                              </span>
                              <Maximize2 size={16} className="text-gray-500" />
                            </div>
                            
                            <div className="code-scrollbar overflow-auto max-h-[50vh]">
                              <SyntaxHighlighter
                                language={snippet.language.toLowerCase()}
                                style={vscDarkPlus}
                                customStyle={{
                                  margin: 0,
                                  padding: '1rem',
                                  fontSize: '13px',
                                  backgroundColor: 'transparent',
                                }}
                                showLineNumbers
                                lineNumberStyle={{ 
                                  color: '#666', 
                                  minWidth: '2.5em',
                                  paddingRight: '1em',
                                  textAlign: 'right',
                                  userSelect: 'none'
                                }}
                                wrapLines={true}
                              >
                                {snippet.content}
                              </SyntaxHighlighter>
                            </div>
                          </div>

                          {/* Code stats */}
                          <div className="mt-4 grid grid-cols-3 gap-3">
                            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700/50">
                              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                {snippet.content.split('\n').length}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lines</div>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700/50">
                              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                {snippet.content.split(/\s+/).length}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Words</div>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700/50">
                              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                                {snippet.content.length.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Chars</div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'details' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                        >
                          <div className="space-y-4">
                            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700/50">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <Layers size={18} className="text-blue-600 dark:text-blue-400" />
                                Code Analysis
                              </h3>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Lines of Code</p>
                                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                                    {snippet.content.split('\n').length}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Complexity</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                      <div
                                        key={i}
                                        className={`h-2 rounded-full flex-1 transition-all duration-300 ${
                                          i <= 2 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
                                        }`}
                                      />
                                    ))}
                                    <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">Low</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700/50">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <Zap size={18} className="text-yellow-600 dark:text-yellow-400" />
                                Performance
                              </h3>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-700 dark:text-gray-300 text-sm">Memory</span>
                                  <span className="text-green-600 dark:text-green-400 font-semibold text-sm">Low</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-700 dark:text-gray-300 text-sm">Speed</span>
                                  <span className="text-green-600 dark:text-green-400 font-semibold text-sm">Fast</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700/50">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <BookOpen size={18} className="text-purple-600 dark:text-purple-400" />
                                Documentation
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                This {snippet.language} snippet can be used for various purposes including 
                                web development, automation, or data processing.
                              </p>
                            </div>

                            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700/50">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <Sparkles size={18} className="text-pink-600 dark:text-pink-400" />
                                Usage Tips
                              </h3>
                              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                                <li className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                                  <span>Import necessary dependencies</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                                  <span>Test in development first</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'tags' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700/50">
                            {snippet.tags && snippet.tags.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {snippet.tags.map((tag, index) => (
                                  <motion.span
                                    key={index}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-lg border border-blue-400/30 dark:border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 cursor-pointer text-sm"
                                  >
                                    <Hash size={14} className="text-blue-600 dark:text-blue-400" />
                                    <span className="font-medium">{tag}</span>
                                  </motion.span>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <Tag size={32} className="text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                                <p className="text-gray-500 dark:text-gray-400">No tags added yet</p>
                                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Add tags to categorize</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700/50 gap-4">
                      <div className="flex items-center gap-3">
                        {isOwner && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleEdit}
                              className="flex items-center justify-center gap-1.5 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm text-sm"
                            >
                              <Edit3 size={16} />
                              <span>Edit</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleDelete}
                              className="flex items-center justify-center gap-1.5 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-sm text-sm"
                            >
                              <Trash2 size={16} />
                              <span>Delete</span>
                            </motion.button>
                          </>
                        )}
                      </div>

                      {/* Copy URL button
                      <div className="flex items-center gap-2">
                        <div className="flex-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 px-3 py-2 rounded border border-gray-200 dark:border-gray-700/50 truncate">
                          {snippetShareUrl}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleShare}
                          className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                        >
                          <ExternalLink size={16} />
                        </motion.button>
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* Bottom shine effect */}
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
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SnippetDetailModal;
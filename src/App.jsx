import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronLeft, ChevronRight, Star, Plus, RefreshCw, Sparkles } from 'lucide-react';

// Hooks
import { useDarkMode } from './hooks/useDarkMode';
import { useSnippets } from './hooks/useSnippets';
import { useAuth } from './components/Auth/useAuth'; 

// Components
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import SnippetGrid from './components/Snippets/SnippetGrid';
import SnippetEditor from './components/Snippets/SnippetEditor';
import AuthModal from './components/Auth/AuthModal';
import WelcomeScreen from './components/UI/WelcomeScreen';
import { NotificationContainer } from './components/Layout/Notification';
import LoadingSpinner from './components/UI/LoadingSpinner';
import About from './components/UI/About';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/snippets';

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { 
    user,
    username, 
    userProfile,
    loading: authLoading, 
    loginWithEmail, 
    signupWithEmail, 
    loginWithGoogle,  
    logout 
  } = useAuth();
  
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Added missing state
  const [showEditor, setShowEditor] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  
  // Notifications
  const [notifications, setNotifications] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    language: 'javascript',
    tags: [],
    by:username,
    isPublic: false
  });

  // Animation states for new buttons
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fabPulse, setFabPulse] = useState(true);

  const {
    snippets,
    allTags,
    isLoading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    fetchSnippets,
    fetchTags,
    deleteSnippet,
    toggleFavorite,
    setError
  } = useSnippets(user);

  // Auto-open sidebar on desktop, close on mobile
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Add keyboard shortcut for About (Ctrl + / or Cmd + /)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setShowAbout(true);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Stop FAB pulse animation after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setFabPulse(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleShowAbout = () => {
    setShowAbout(true);
  };

  // Add notification
  const addNotification = (message, type = 'success') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 5000);
  };

  // Remove notification
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Handle errors
  useEffect(() => {
    if (error) {
      addNotification(error, 'error');
      setError(null);
    }
  }, [error, setError]);

  // Fetch snippets when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      const filters = {
        ...(searchQuery && { search: searchQuery }),
        ...(selectedLanguage && { language: selectedLanguage }),
        ...(showFavoritesOnly && { favorite: 'true' }),
        ...(selectedTags.length > 0 && { tags: selectedTags.join(',') })
      };
      
      setCurrentPage(1);
      fetchSnippets(filters);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedLanguage, showFavoritesOnly, selectedTags, fetchSnippets, setCurrentPage]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedLanguage('');
    setShowFavoritesOnly(false);
    setCurrentPage(1);
  };

  // Handle snippet operations
  const handleDeleteSnippet = async (id) => {
    if (!window.confirm('Are you sure you want to delete this snippet?')) return;
    
    const result = await deleteSnippet(id);
    if (result.success) {
      addNotification(result.message, 'success');
    } else {
      addNotification(result.error, 'error');
    }
  };

  const handleToggleFavorite = async (id, currentStatus) => {
    const result = await toggleFavorite(id, currentStatus);
    if (result.success) {
      // Success notification is handled by the toggleFavorite function
    } else {
      addNotification(result.error, 'error');
    }
  };

  // Refresh snippets with animation
  const handleRefreshSnippets = async () => {
    setIsRefreshing(true);
    await fetchSnippets();
    setTimeout(() => {
      setIsRefreshing(false);
      addNotification('Snippets refreshed!', 'success');
    }, 1000);
  };

  // Save snippet
  const saveSnippet = async () => {
    console.log('Saving snippet with by:', formData);
    if (!formData.title.trim()) {
      addNotification('Title is required', 'error');
      return;
    }
    if (!formData.code.trim()) {
      addNotification('Code is required', 'error');
      return;
    }

    try {
      const token = await user.getIdToken();
      const url = editingSnippet 
        ? `${API_BASE}/${editingSnippet._id}`
        : API_BASE;
      
      const method = editingSnippet ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
          content: formData.code.trim(),
          language: formData.language,
          tags: formData.tags,
          by: formData.by,
          isPublic: formData.isPublic
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setShowEditor(false);
        setEditingSnippet(null);
        resetForm();
        addNotification(
          editingSnippet ? 'Snippet updated successfully!' : 'Snippet created successfully!',
          'success'
        );
        fetchSnippets();
        fetchTags();
      } else {
        throw new Error(data.message || 'Failed to save snippet');
      }
    } catch (err) {
      console.error('Error saving snippet:', err);
      addNotification(err.message || 'Error saving snippet.', 'error');
    }
  };

  // Edit snippet
  const handleEditSnippet = (snippet) => {
    setEditingSnippet(snippet);
    setFormData({
      title: snippet.title,
      description: snippet.description || '',
      code: snippet.content || snippet.code,
      language: snippet.language,
      tags: snippet.tags,
      by: snippet.by || username,
      isPublic: snippet.isPublic || false
    });
    setShowEditor(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      code: '',
      language: 'javascript',
      tags: [],
       by: username || '',
      isPublic: false
    });
    setEditingSnippet(null);
  };

  // Close editor
  const closeEditor = () => {
    setShowEditor(false);
    resetForm();
  };

  // Handle form changes
  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle logout
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      addNotification('Logged out successfully!', 'success');
    } else {
      addNotification(result.error, 'error');
    }
  };

  // Handle tag toggle
  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Close sidebar on mobile when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Handle authentication
  const handleLogin = async (email, password) => {
    const result = await loginWithEmail(email, password);
    if (result.success) {
      setShowAuth(false);
      addNotification('Logged in successfully!', 'success');
    } else {
      addNotification(result.error, 'error');
    }
    return result;
  };

  const handleSignup = async (email, password, username) => {
    const result = await signupWithEmail(email, password, username);
    if (result.success) {
      setShowAuth(false);
      addNotification('Account created successfully!', 'success');
    } else {
      addNotification(result.error, 'error');
    }
    return result;
  };

  const handleGoogleLogin = async (username = null) => {
    const result = await loginWithGoogle(username);
    if (result.success) {
      if (!result.requiresUsername) {
        setShowAuth(false);
        addNotification('Logged in successfully!', 'success');
      }
    } else {
      addNotification(result.error, 'error');
    }
    return result;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col overflow-hidden"
    >
      {/* Notifications */}
      <NotificationContainer 
        notifications={notifications} 
        onClose={removeNotification} 
      />

      {/* Header - Fixed at top */}
      <div className="flex-shrink-0">
        <Header
          user={user}
          username={username}
          userProfile={userProfile}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen} 
          onLogin={() => {
            setShowAuth(true);
            setIsLogin(true);
          }}
          onLogout={handleLogout}
          onNewSnippet={() => {
            resetForm();
            setShowEditor(true);
          }}
          onShowAbout={handleShowAbout}  
        />
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        isLogin={isLogin}
        onSwitchMode={() => setIsLogin(!isLogin)}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onGoogleLogin={handleGoogleLogin}
      />

      {/* About Modal */}
      <AnimatePresence>
        {showAbout && (
          <About onClose={() => setShowAbout(false)} />
        )}
      </AnimatePresence>

      {!user ? (
        <div className="flex-1">
          <WelcomeScreen
            onLogin={() => {
              setShowAuth(true);
              setIsLogin(true);
            }}
            onSignup={() => {
              setShowAuth(true);
              setIsLogin(false);
            }}
            onGoogleLogin={() => handleGoogleLogin()}
          />
        </div>
      ) : (
        <div className="flex-1 flex relative min-h-0">
          {/* Mobile Sidebar Backdrop */}
          <AnimatePresence>
            {sidebarOpen && window.innerWidth < 1024 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={handleBackdropClick}
              />
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <div className={`flex-shrink-0 ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
            <Sidebar
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              showFavoritesOnly={showFavoritesOnly}
              onFavoritesToggle={setShowFavoritesOnly}
              allTags={allTags}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Main Content - Scrollable area */}
          <main className={`flex-1 min-h-0 overflow-auto transition-all duration-300 ${
            sidebarOpen && window.innerWidth >= 1024 ? 'lg:ml-0' : 'ml-0'
          }`}>
            <div className="p-4 sm:p-6">
              {/* Snippet Grid */}
              <SnippetGrid
                snippets={snippets}
                user = {user}
                isLoading={isLoading}
                onEdit={handleEditSnippet}
                onDelete={handleDeleteSnippet}
                onToggleFavorite={handleToggleFavorite}
                onNewSnippet={() => {
                  resetForm();
                  setShowEditor(true);
                }}
                searchQuery={searchQuery}
                selectedTags={selectedTags}
                selectedLanguage={selectedLanguage}
                showFavoritesOnly={showFavoritesOnly}
              />

              {/* New Refresh Button after snippet cards */}
              {snippets.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center mt-8 mb-6"
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRefreshSnippets}
                    disabled={isRefreshing}
                    className="flex items-center gap-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg"
                  >
                    <motion.div
                      animate={{ rotate: isRefreshing ? 360 : 0 }}
                      transition={{ 
                        rotate: { 
                          duration: 1, 
                          repeat: isRefreshing ? Infinity : 0,
                          ease: "linear"
                        }
                      }}
                    >
                      <RefreshCw size={20} />
                    </motion.div>
                    {isRefreshing ? 'Refreshing...' : 'Refresh Snippets'}
                  </motion.button>
                </motion.div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 sm:gap-4 mt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 transition-colors text-sm sm:text-base"
                  >
                    <ChevronLeft size={16} />
                    <span className="hidden sm:inline">Previous</span>
                  </motion.button>
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 px-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 transition-colors text-sm sm:text-base"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={16} />
                  </motion.button>
                </motion.div>
              )}
            </div>
          </main>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      {user && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: fabPulse ? [0, -10, 0] : 0
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
            y: fabPulse ? {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            } : {}
          }}
          onClick={() => {
            resetForm();
            setShowEditor(true);
            setFabPulse(false); 
          }}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700 z-50"
        >
          <Plus size={24} />
          
          {/* Animated sparkle effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.8, 0, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="absolute inset-0 rounded-full bg-white opacity-20"
          />
          
          {/* Pulse ring */}
          {fabPulse && (
            <motion.div
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ 
                scale: 1.8, 
                opacity: 0 
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="absolute inset-0 rounded-full border-2 border-blue-400"
            />
          )}
        </motion.button>
      )}

      {/* Snippet Editor */}
      <SnippetEditor
        isOpen={showEditor}
        onClose={closeEditor}
        onSubmit={saveSnippet}
        formData={formData}
        onChange={handleFormChange}
        allTags={allTags}
        editingSnippet={editingSnippet}
      />
    </motion.div>
  );
}

export default App;
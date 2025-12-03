import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, User, LogOut, LogIn, Plus, Moon, Sun, Menu, ChevronLeft, ChevronRight, Info, X, Code, Sparkles } from 'lucide-react';
import { useState } from 'react';

const Header = ({ 
  user, 
  darkMode, 
  onToggleDarkMode, 
  onToggleSidebar,
  sidebarOpen,
  onLogin, 
  onLogout, 
  username,
  onNewSnippet,
  onShowAbout
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 z-50"
    >
      {/* Animated gradient line at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% 100%'
        }}
      />

      <div className="w-full px-4 sm:px-5 lg:px-6">
        <div className="flex justify-between items-center h-16 sm:h-16 md:h-[68px]">
          {/* Left side */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Sidebar Toggle with Animation */}
            {user && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggleSidebar}
                className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={sidebarOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {sidebarOpen ? <X size={18} className="sm:w-5 sm:h-5" /> : <Menu size={18} className="sm:w-5 sm:h-5" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            )}

            {/* Logo with Animation */}
            <motion.div 
              className="flex items-center gap-1.5 sm:gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Code className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </motion.div>
              <span 
                translate='no' 
                className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
              >
                <span className="hidden sm:inline">CodeSnippet</span>
                <span className="sm:hidden">CS</span>

              </span>
              
              {/* Beta Badge - Hidden on very small screens */}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="hidden sm:inline-block px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full"
              >
                v2.0
              </motion.span>
            </motion.div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0">
            {/* Dark Mode Toggle with Smooth Animation */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={onToggleDarkMode}
              className="p-2 sm:p-2 lg:p-2.5 rounded-lg sm:rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0, rotate: -180 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {darkMode ? (
                    <Sun size={18} className="sm:w-5 sm:h-5 text-yellow-500" />
                  ) : (
                    <Moon size={18} className="sm:w-5 sm:h-5 text-indigo-600" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* About Button - Desktop only */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={onShowAbout}
              className="hidden md:flex items-center gap-1.5 px-3 lg:px-3 py-2 lg:py-2 rounded-lg lg:rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="About"
            >
              <Info size={18} className="lg:w-[18px] lg:h-[18px]" />
              <span className="text-sm lg:text-sm font-medium">About</span>
            </motion.button>

            {/* Mobile About Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onShowAbout}
              className="md:hidden p-2 sm:p-2 rounded-lg sm:rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="About"
            >
              <Info size={18} className="sm:w-[18px] sm:h-[18px]" />
            </motion.button>

            {/* User Section */}
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-1.5 sm:gap-1.5 lg:gap-2 px-3 sm:px-3 lg:px-4 py-2 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg sm:rounded-xl font-medium transition-all shadow-md"
                >
                  <User size={16} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" />
                  <span className="hidden sm:inline text-sm lg:text-sm max-w-[100px] sm:max-w-[120px] lg:max-w-none truncate">
                    {username}
                  </span>
                  <motion.div
                    animate={{ rotate: showUserMenu ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="hidden sm:block"
                  >
                    <ChevronLeft size={16} className="lg:w-4 lg:h-4 rotate-[-90deg]" />
                  </motion.div>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <>
                      {/* Backdrop */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setShowUserMenu(false)}
                      />
                      
                      {/* Menu */}
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-44 sm:w-48 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                      >
                        <div className="p-2.5 sm:p-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                            {username}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user?.email}
                          </p>
                        </div>
                        
                        <motion.button
                          whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                          onClick={() => {
                            setShowUserMenu(false);
                            onLogout();
                          }}
                          className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
                          <span className="text-xs sm:text-sm font-medium">Logout</span>
                        </motion.button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogin}
                className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg sm:rounded-xl font-medium transition-all shadow-md"
              >
                <LogIn size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" />
                <span className="text-xs sm:text-sm">Login</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scaleX: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.header>
  );
};

export default Header;
import { motion } from 'framer-motion';
import { Terminal, User, LogOut, LogIn, Plus, Moon, Sun, Menu, ChevronLeft, ChevronRight, Info, X, Code } from 'lucide-react';
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
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center">
            {/* Only show sidebar toggle button when user is logged in */}
            {user && (
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 lg:hidden"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
            <div className={`flex items-center space-x-2 ${user ? 'ml-4 lg:ml-0' : ''}`}>
              <Code className="text-blue-500" size={24} />
              <span translate='no' className="text-xl font-bold text-gray-800 dark:text-white">
                CodeSnippet
              </span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            

           
            
            {/* User menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 dark:text-gray-300 text-sm hidden sm:block">
                  {username}
                </span>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors text-sm"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors text-sm"
              >
                <User size={16} />
                <span>Login</span>
              </button>
            )}
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={onShowAbout}
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              title="About"
            >
              <Info size={18} />
              <span className="hidden sm:inline">About</span>
            </button>
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
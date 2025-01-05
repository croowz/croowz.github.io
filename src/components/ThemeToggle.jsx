import { useState, useEffect, useRef } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUsingSystem, setIsUsingSystem] = useState(() => {
    return localStorage.getItem('darkMode') === null;
  });
  const menuRef = useRef();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resetToSystem = () => {
    localStorage.removeItem('darkMode');
    setIsUsingSystem(true);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(systemPrefersDark);
  };

  const setTheme = (isDark) => {
    setDarkMode(isDark);
    setIsUsingSystem(false);
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 
                   hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Theme settings"
      >
        {isUsingSystem ? (
          <ComputerDesktopIcon className="w-6 h-6" />
        ) : darkMode ? (
          <MoonIcon className="w-6 h-6" />
        ) : (
          <SunIcon className="w-6 h-6" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              setTheme(false);
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <SunIcon className="w-5 h-5" />
            Light
          </button>
          <button
            onClick={() => {
              setTheme(true);
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <MoonIcon className="w-5 h-5" />
            Dark
          </button>
          <button
            onClick={() => {
              resetToSystem();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <ComputerDesktopIcon className="w-5 h-5" />
            System
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();


  return (
    <motion.button
      onClick={toggleTheme}
      animate={{
        backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(251, 191, 36, 0.1)',
        borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(251, 191, 36, 0.3)'
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="relative p-2 rounded-full border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
          scale: 1
        }}
        transition={{ duration: 0.3 }}
        className="w-5 h-5"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-blue-400" />
        )}
      </motion.div>
    </motion.button>
  );
}
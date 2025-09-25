"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

const navLinks = [
  { label: "Home", target: "home" },
  { label: "About me", target: "about" },
  { label: "Projects", target: "projects" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();


  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full ${
      theme === 'dark' ? 'bg-black/30' : 'bg-white/30'
    } backdrop-blur-md z-50 py-4 px-6 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-black'
        } transition-colors duration-300`}>FS</div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              theme === 'dark' ? 'text-white' : 'text-black'
            } focus:outline-none transition-colors duration-300`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className={`flex space-x-8 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          } font-semibold transition-colors duration-300`}>
            {navLinks.map((link) => (
              <li key={link.target}>
                <button
                  onClick={() => scrollToSection(link.target)}
                  className="hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden mt-4 space-y-6 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            } text-center transition-colors duration-300`}
          >
          {navLinks.map((link) => (
            <div key={link.target}>
              <button
                onClick={() => scrollToSection(link.target)}
                className={`${
                  theme === 'dark' ? 'text-white' : 'text-black'
                } font-medium hover:text-blue-400 transition-colors`}
              >
                {link.label}
              </button>
            </div>
          ))}
          <div className="pt-4">
            <ThemeToggle />
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

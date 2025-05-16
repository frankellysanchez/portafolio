"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", target: "home" },
  { label: "About me", target: "about" },
  { label: "Projects", target: "projects" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); 
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-md z-50 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white">Frankelly S.</div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
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
        <ul className="hidden md:flex space-x-12 text-white font-semibold">
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
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden mt-4 space-y-6 text-white text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navLinks.map((link) => (
            <div key={link.target}>
              <button
                onClick={() => scrollToSection(link.target)}
                className="text-white font-medium hover:text-blue-400 transition-colors"
              >
                {link.label}
              </button>
            </div>
          ))}
        </motion.div>
      )}
    </nav>
  );
}

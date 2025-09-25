"use client";

import { Github, Linkedin } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer className={`w-full ${
      theme === 'dark'
        ? 'bg-black border-gray-800 text-gray-400'
        : 'bg-white border-gray-200 text-gray-600'
    } border-t py-10 mt-16 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <p className="text-sm text-center sm:text-left">
          © {new Date().getFullYear()} Frankelly Sánchez. All rights reserved.
        </p>

        <div className="flex gap-6">
          <a
            href="https://github.com/frankellysanchez"
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              theme === 'dark'
                ? 'hover:text-white'
                : 'hover:text-black'
            } transition-colors duration-200`}
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>

          <a
            href="https://www.linkedin.com/in/frankelly-sánchez-9192771bb/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              theme === 'dark'
                ? 'hover:text-white'
                : 'hover:text-black'
            } transition-colors duration-200`}
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}

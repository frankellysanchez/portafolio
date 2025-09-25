'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AboutSection from '@/components/AboutSection';
import Projects from '@/components/ProjectsSection';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import TechMeshBackground from '@/components/TechMesBackgrpund';
import { useTheme } from '@/contexts/ThemeContext';

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen flex flex-col justify-between scroll-smooth transition-colors duration-500`}>
      <Navbar />

      <section
        className={`relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-4 px-6 md:px-12 ${theme === 'dark' ? 'bg-black' : 'bg-white'} overflow-hidden transition-colors duration-500`}
        id="home"
      >
        {/* Fondo animado (solo en desktop) */}
        <div className="hidden sm:block absolute inset-0 z-0">
          <TechMeshBackground />
        </div>

        {/* Blur animado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.1 }}
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          <div className={`absolute w-72 h-72 ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-400'} blur-2xl rounded-full top-[-50px] left-[-50px]`}></div>
        </motion.div>

        {/* Info principal */}
        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-blue-400 text-lg tracking-wider uppercase mb-2"
          >
            Hello, I&apos;m
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`text-5xl md:text-6xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}
          >
            Frankelly <span className="text-blue-400">Sánchez</span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`text-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6`}
          >
            Frontend Developer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} leading-relaxed mb-8`}
          >
            I build modern and responsive web interfaces with React, TypeScript and animations that elevate the user experience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <a
              href="/frankelly_cv.pdf"
              download
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all transform hover:scale-105"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        {/* Imagen circular con aura */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 flex sm:block justify-center"
        >
          <div className="relative w-40 h-40 sm:w-64 sm:h-64 mb-6 sm:mb-0">
            {/* Aura externa */}
            <div className={`absolute inset-0 scale-110 rounded-full ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-400'} opacity-40 blur-xl z-0`}></div>

            {/* Imagen */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-blue-500 shadow-lg flex items-end z-10">
              <Image
                src="/profile.jpg"
                alt="Frankelly Sánchez"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 300px"
                priority
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Secciones */}
      <AboutSection />
      <Projects />
      <Footer />

      {/* Botón "Scroll to Top" */}
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg z-50 transition-all hover:scale-110"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}

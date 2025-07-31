'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AboutSection from '@/components/AboutSection';
import Projects from '@/components/ProjectsSection';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import TechMeshBackground from '@/components/TechMesBackgrpund';
import { fadeIn } from '@/components/Animations';

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-between scroll-smooth">
      <Navbar />

      <motion.section
        className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-4 px-6 md:px-12 bg-black overflow-hidden"
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        id="home"
      >
        {/* Fondo animado (solo en desktop) */}
        <div className="hidden sm:block absolute inset-0 z-0">
          <TechMeshBackground />
        </div>

        {/* Blur animado */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute w-72 h-72 bg-blue-500 blur-2xl rounded-full opacity-80 top-[-50px] left-[-50px] animate-pulse"></div>
        </motion.div>

        {/* Info principal */}
        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <p className="text-blue-400 text-lg tracking-wider uppercase mb-2">
            Hello, I’m
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Frankelly <span className="text-blue-400">Sánchez</span>
          </h1>
          <h2 className="text-2xl text-gray-300 mb-6">Frontend Developer</h2>
          <p className="text-lg text-gray-400 leading-relaxed mb-8">
            I build modern and responsive web interfaces with React, TypeScript and animations that elevate the user experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
  href="/frankelly_cv.pdf"
  download
  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all transform hover:scale-105"
>
  Download CV
</a>

          </div>
        </div>

        {/* Imagen circular con aura */}
        <div className="relative z-10 flex sm:block justify-center">
          <div className="relative w-40 h-40 sm:w-64 sm:h-64 mb-6 sm:mb-0">
            {/* Aura externa */}
            <div className="absolute inset-0 scale-110 rounded-full bg-blue-500 opacity-40 blur-xl animate-pulse z-0"></div>

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
        </div>
      </motion.section>

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

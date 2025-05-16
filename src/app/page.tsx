'use client';
import AboutSection from "@/components/AboutSection";
import AnimatedNameMesh from "@/components/AnimatedNameMesh";
import { fadeIn,} from "@/components/Animations";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Projects from "@/components/ProjectsSection";
import TechMeshBackground from "@/components/TechMesBackgrpund";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-between scroll-smooth">
      <Navbar />

      <motion.section
  className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-10 px-6 md:px-12 bg-black overflow-hidden"
  variants={fadeIn}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  id="home"
>
  
  <TechMeshBackground />
  <motion.div
    className="absolute top-0 left-0 w-full h-full z-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.2 }}
    transition={{ duration: 2 }}
  >
    <div className="absolute w-72 h-72 bg-blue-500 blur-3xl rounded-full opacity-30 top-[-50px] left-[-50px] animate-pulse"></div>
    <div className="absolute w-72 h-72 bg-purple-600 blur-3xl rounded-full opacity-30 bottom-[-50px] right-[-50px] animate-pulse delay-1000"></div>
  </motion.div>

  {/* 👤 Contenido del hero */}
  <div className="relative z-10 max-w-2xl text-center md:text-left">
  <div className="relative w-full h-32 mb-6 overflow-hidden">
  <div className="absolute inset-0">
    <AnimatedNameMesh />
  </div>
</div>

    <p className="text-blue-400 text-lg tracking-wider uppercase mb-2">Hello, I’m</p>
    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
      Frankelly <span className="text-blue-400">Sánchez</span>
    </h1>
    <h2 className="text-2xl text-gray-300 mb-6">
      Frontend Developer | UI Specialist
    </h2>
    <p className="text-lg text-gray-400 leading-relaxed mb-8">
      I build modern and responsive web interfaces with React, TypeScript and animations that elevate the user experience.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
      <a
        href="/cv.pdf"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full"
      >
        Download CV
      </a>
    
    </div>
  </div>

  <div className="relative z-10 max-w-sm md:max-w-md min-h-[80vh] flex items-center justify-center hidden sm:block">
    <img
      src="/profile.png"
      alt="Frankelly Sánchez"
      className=" h-full object-contain border-2 rounded-3xl border-gray-700"
    />
  </div>
</motion.section>
<AboutSection />
<Projects/>
<Footer />
    </div>
  );
}

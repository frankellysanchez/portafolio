"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, hoverEffect } from "./Animations";
import Image from "next/image";
import ProjectModal from "./ServicesModal";
const data = [
  {
    title: "Fontis-AI",
    description: "FontisAI is a creative platform that leverages AI to generate unique artwork ready for printing. This project includes advanced UI features and responsive design.",
    icon: "/fontisai_logo.png",
    features: [
      "Infinite carousel in the Hero section using Tailwind keyframes.",
      "Responsive dropdown navigation menu for mobile.",
      "Blog section built with Next.js and styled for performance.",
      "Skeleton loader refined for smooth transitions while loading content."
    ],
    gallery: [
      {
        img: "/hero.png",
        caption: "Hero section with carousel and optimized button scroll behavior."
      },
      {
        img: "/mobile.jpg",
        caption: "Mobile responsiveness with JavaScript-powered dropdown menu."
      },
      {
        img: "/blog.png",
        caption: "Blog system enhanced with styled cards and navigation."
      },
      {
        img: "/skeleton.jpg",
        caption: "Improved skeleton loader for smoother image transitions."
      }
    ]
  }
  ,
];

export default function Projects() {
  const [selectedService, setSelectedService] = useState<null | typeof data[0]>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (service: typeof data[0]) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section
      id="projects"
      className="px-10 py-24 text-center max-w-7xl min-h-[50vh] mx-auto bg-gradient-to-t from-gray-900 to-black rounded-4xl"
    >
      <h2 className="text-4xl font-extrabold mb-12 text-blue-400">Projects and Constributions</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {data.map((data) => (
          <motion.button
            key={data.title}
            onClick={() => openModal(data)}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg text-white text-center cursor-pointer focus:outline-none"
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={fadeIn.show.transition}
            whileHover={hoverEffect.whileHover}
            whileTap={hoverEffect.whileTap}
          >
          
            <h3 className="text-2xl font-bold text-blue-400 mb-4">{data.title}</h3>
            <p className="text-gray-300 text-base leading-relaxed">{data.description}</p>
            <div className="flex justify-around">
           
     <Image
      priority
      src="/nextjs-svgrepo-com.svg"
      height={54}
      width={54}
      alt="Follow us on Twitter"
    />
     <Image
      priority
      src="/tailwindcss-icon.svg"
      height={50}
      width={50}
      alt="Follow us on Twitter"
    />
            </div>
          </motion.button>
        ))}
      </div>

      <ProjectModal isOpen={modalOpen} onClose={closeModal} service={selectedService} />
    </section>
  );
}

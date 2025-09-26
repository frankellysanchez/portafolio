"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ProjectModal from "./ServicesModal";
import { BadgeCheck } from "lucide-react";
import type { ProjectData } from "@/types/project";
import { useTheme } from "@/contexts/ThemeContext";

const data: ProjectData[] = [
  {
    title: "Fontis‑AI",
    description:
      "Creative platform that uses AI to generate print‑ready artwork. Advanced UI and responsive design.",
    icon: "/fontisai_logo.png",
    thumb: "/hero.png",
    tags: ["Next.js", "Tailwind", "JavaScript"],
    features: [
      "Infinite carousel in Hero using Tailwind keyframes",
      "Responsive dropdown menu for mobile",
      "Blog with optimized card layout",
      "Skeleton loader with smoother transitions",
    ],
    gallery: [
      { img: "/hero.png", caption: "Hero carousel with smooth CTA" },
      { img: "/mobile.jpg", caption: "Responsive mobile navigation" },
      { img: "/blog.png", caption: "Blog cards and navigation" },
      { img: "/skeleton.jpg", caption: "Skeleton for image transitions" },
    ],
  },
  {
    title: "SolutionsX",
    description:
      "A modern, responsive UI focused on clarity and smooth interactions.",
    icon: "/logox.png",
    thumb: "/hero-2.png",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    features: [
      "Interactive Hero with cursor-following glow (Tailwind keyframes + CSS vars), fully responsive",
      "Responsive for mobile, tablet and desktop",
      "Testimonials with avatar quotes in dark rounded cards and a soft gradient accent",
      "Team profiles with photos, roles, short bios, and skill badges in cohesive cards",
    ],
    gallery: [
      { img: "/hero-2.png", caption: "Hero" },
      { img: "/mobile-x.png", caption: "Responsive mobile navigation" },
      { img: "/page2.png", caption: "cards" },
      { img: "/page3.png", caption: "Testimonials cards" },
    ],
  },
];

export default function Projects() {
  const [selected, setSelected] = useState<ProjectData | null>(null);
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const openModal = (p: ProjectData) => {
    setSelected(p);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setSelected(null);
  };


  return (
    <section id="projects" className={`px-6 md:px-10 py-24 max-w-7xl mx-auto ${theme === 'dark' ? 'text-white' : 'text-black'} transition-colors duration-500`}>
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
            Projects &amp; Contributions
          </span>
        </h2>
      </div>

      {/* Enhanced Grid with Framer Motion */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {data.map((p, index) => {
          return (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative transform-gpu"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className={`relative rounded-3xl ${
                theme === 'dark'
                  ? 'bg-black/70 border-white/10 text-white'
                  : 'bg-white/90 border-black/10 text-black'
              } backdrop-blur-xl border-2 h-full flex flex-col overflow-hidden shadow-xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl`}>

                {/* Enhanced Thumbnail */}
                <div className="relative aspect-[16/9] w-full overflow-hidden " onClick={() => openModal(p)}>
                  <Image
                    src={p.thumb || "/project-fallback.jpg"}
                    alt={`${p.title} thumbnail`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                    
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    theme === 'dark' ? 'from-black/60' : 'from-white/60'
                  } via-transparent to-transparent`} />

                  {/* Project icon overlay */}
                  
                </div>

                {/* Enhanced Body */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="text-lg font-bold mb-1">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                        {p.title}
                      </span>
                    </h3>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    } leading-relaxed`}>{p.description}</p>
                  </div>

                  {/* Enhanced Tags */}
                  <div className="flex flex-wrap gap-1">
                    {p.tags?.slice(0, 3).map((t: string) => (
                      <span
                        key={t}
                        className={`rounded-full ${
                          theme === 'dark'
                            ? 'border-white/20 bg-white/10 text-gray-200'
                            : 'border-black/20 bg-black/10 text-gray-800'
                        } border px-2 py-0.5 text-[10px] font-medium transition-all duration-200 hover:bg-blue-500/20`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Key Features */}
                  <ul className="space-y-1">
                    {(p.features ?? []).slice(0, 1).map((f: string) => (
                      <li key={f} className="flex items-start gap-1.5">
                        <BadgeCheck className="w-3 h-3 text-green-400 mt-0.5 shrink-0" />
                        <span className={`text-[10px] ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        } leading-relaxed`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Enhanced CTA */}
                  <div className="mt-auto pt-2">
                    <button
                      onClick={() => openModal(p)}
                      aria-label={`View details of ${p.title}`}
                      className="w-full inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 shadow-lg"
                    >
                      View Details
                      <span className="transition-transform group-hover:translate-x-1 text-xs">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Modal */}
      <ProjectModal isOpen={open} onClose={closeModal} service={selected} />
    </section>
  );
}
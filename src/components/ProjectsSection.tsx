"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ProjectModal from "./ServicesModal";
import { fadeIn, hoverEffect } from "./Animations";
import { BadgeCheck } from "lucide-react";
import type { ProjectData } from "@/types/project";

const data: ProjectData[] = [
  {
    title: "Fontis‑AI",
    description:
      "Creative platform that uses AI to generate print‑ready artwork. Advanced UI and responsive design.",
    icon: "/fontisai_logo.png",
    thumb: "/hero.png",
    tags: ["Next.js", "Tailwind", "AI", "Blog"],
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
    tags: ["Next.js", "Tailwind"],
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

  const openModal = (p: ProjectData) => {
    setSelected(p);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <section id="projects" className="px-6 md:px-10 py-24 max-w-7xl mx-auto text-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
            Projects &amp; Contributions
          </span>
        </h2>
        <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
          A selection of recent work with a focus on clear UX and performance.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {data.map((p: ProjectData) => (
          <motion.article
            key={p.title}
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={fadeIn.show?.transition}
            className="group relative rounded-2xl p-[1px] bg-gradient-to-tr from-blue-500/35 via-cyan-400/25 to-fuchsia-400/25 transform-gpu"
          >
            <div className="rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 h-full flex flex-col overflow-hidden">
              {/* Thumb */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={p.thumb || "/project-fallback.jpg"}
                  alt={`${p.title} thumbnail`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-blue-300">{p.title}</h3>
                  {p.icon && (
                    <Image
                      src={p.icon}
                      alt={`${p.title} icon`}
                      width={28}
                      height={28}
                      className="opacity-90"
                    />
                  )}
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">{p.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {p.tags?.map((t: string) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-200 transition hover:bg-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Highlights (primeros 2) */}
                <ul className="mt-1 space-y-2 text-sm text-gray-300">
                  {(p.features ?? []).slice(0, 2).map((f: string) => (
                    <li key={f} className="flex items-start gap-2">
                      <BadgeCheck className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-2">
                  <motion.button
                    onClick={() => openModal(p)}
                    aria-label={`View details of ${p.title}`}
                    whileHover={hoverEffect?.whileHover}
                    whileTap={hoverEffect?.whileTap}
                    className="inline-flex items-center justify-center rounded-full border border-blue-500/50 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200 transition hover:bg-blue-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
                  >
                    View details
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Modal */}
      <ProjectModal isOpen={open} onClose={closeModal} service={selected} />
    </section>
  );
}
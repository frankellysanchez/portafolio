"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CheckCircle, X } from "lucide-react";
import type { ProjectData } from "@/types/project";
import { useTheme } from "@/contexts/ThemeContext";

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  service: ProjectData | null;
};

export default function ProjectModal({ isOpen, onClose, service }: ProjectModalProps) {
  const [zoomed, setZoomed] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();


  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Cerrar con Escape
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    },
    [isOpen, onClose]
  );
  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onKeyDown]);

  // Cerrar si clic fuera del contenido
  const onBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && service && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${service?.title} details`}
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-50 ${theme === 'dark' ? 'bg-black/70' : 'bg-white/70'} flex items-center justify-center px-3 sm:px-4`}
            onClick={onBackdropClick}
          >
            {/* Enhanced modal container with glassmorphism */}
            <motion.div
              ref={dialogRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl transform-gpu"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl"></div>

              <div className={`relative rounded-3xl ${
                theme === 'dark'
                  ? 'bg-black/80 border-white/10 text-white'
                  : 'bg-white/90 border-black/10 text-black'
              } backdrop-blur-xl border-2 p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl`}>

                {/* Enhanced close button */}
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className={`absolute top-4 right-4 inline-flex items-center justify-center rounded-full ${
                    theme === 'dark'
                      ? 'bg-white/10 hover:bg-white/20 text-gray-200'
                      : 'bg-black/10 hover:bg-black/20 text-gray-800'
                  } transition-all duration-200 p-2 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70`}
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Enhanced header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                  {service?.icon && (
                    <div className={`relative w-16 h-16 shrink-0 rounded-2xl ${
                      theme === 'dark'
                        ? 'border-white/20 bg-white/5'
                        : 'border-black/20 bg-black/5'
                    } border-2 overflow-hidden shadow-lg`}>
                      <Image
                        src={service.icon}
                        alt={`${service.title} icon`}
                        fill
                        sizes="64px"
                        className="object-contain p-2"
                      />
                    </div>
                  )}

                  <div className="text-left w-full">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                        {service?.title}
                      </span>
                    </h2>
                    <p className={`text-base sm:text-lg ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    } leading-relaxed mb-4`}>
                      {service?.description}
                    </p>

                    {service?.tags?.length ? (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.tags.map((t: string) => (
                          <span
                            key={t}
                            className={`rounded-full ${
                              theme === 'dark'
                                ? 'border-white/20 bg-white/10 text-gray-200'
                                : 'border-black/20 bg-black/10 text-gray-800'
                            } border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-blue-500/20`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}

                  </div>
                </div>

                {/* Overview */}
                {service?.details && (
                  <div className="mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 text-blue-400">Overview</h3>
                    <p className={`text-sm sm:text-base ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    } leading-relaxed`}>{service.details}</p>
                  </div>
                )}

                {/* Key Features */}
                {service?.features?.length ? (
                  <div className="mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-400">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((f: string, i: number) => (
                        <div key={`${f}-${i}`} className={`flex items-start gap-3 p-4 rounded-xl ${
                          theme === 'dark'
                            ? 'bg-white/5 border-white/10'
                            : 'bg-black/5 border-black/10'
                        } border transition-colors hover:bg-blue-500/10`}>
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                          <span className={`text-sm sm:text-base ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          } leading-snug`}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Enhanced Gallery */}
                {service?.gallery?.length ? (
                  <div className="mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-400">Project Gallery</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.gallery.map(
                        (g: { img: string; caption: string }, i: number) => (
                          <button
                            key={`${g.img}-${i}`}
                            onClick={() => setZoomed(g.img)}
                            className={`group relative rounded-2xl overflow-hidden ${
                              theme === 'dark'
                                ? 'border-white/20 bg-white/5'
                                : 'border-black/20 bg-black/5'
                            } border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70`}
                            aria-label={`Zoom image ${i + 1}`}
                          >
                            <div className="relative w-full aspect-video">
                              <Image
                                src={g.img}
                                alt={g.caption}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className={`p-3 ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            } text-sm font-medium`}>{g.caption}</div>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ) : null}

                {/* Enhanced Footer */}
                <div className="pt-6 flex justify-center">
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 shadow-lg"
                  >
                    <X className="w-4 h-4" />
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom overlay with Framer Motion */}
      <AnimatePresence>
        {zoomed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setZoomed(null)}
            aria-label="Close zoomed image"
          >
            <div className="relative rounded-2xl p-2 max-w-5xl w-full">
              <div className="rounded-2xl overflow-hidden bg-black">
                <div className="relative w-full max-h-[80vh] aspect-video">
                  <Image
                    src={zoomed}
                    alt="Zoomed"
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
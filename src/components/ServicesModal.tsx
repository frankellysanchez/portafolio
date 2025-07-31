"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import { CheckCircle, X } from "lucide-react";
import type { ProjectData } from "@/types/project";

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  service: ProjectData | null;
};

export default function ProjectModal({ isOpen, onClose, service }: ProjectModalProps) {
  const [zoomed, setZoomed] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

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
    <AnimatePresence>
      {isOpen && service && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${service.title} details`}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-3 sm:px-4"
          onClick={onBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Wrapper con ring-gradient para alinear estilo */}
          <motion.div
            ref={dialogRef}
            className="ring-gradient rounded-2xl w-full max-w-3xl p-[1px] transform-gpu"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 180 }}
          >
            <div className="card relative rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 p-5 sm:p-6 text-white max-h-[90vh] overflow-y-auto">
              {/* Botón cerrar */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-3 right-3 inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 p-1.5"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
                {service.icon && (
                  <div className="relative w-14 h-14 shrink-0 rounded-lg border border-white/10 bg-white/5 overflow-hidden">
                    <Image
                      src={service.icon}
                      alt={`${service.title} icon`}
                      fill
                      sizes="56px"
                      className="object-contain p-1"
                    />
                  </div>
                )}

                <div className="text-left w-full">
                  <h2 className="text-xl sm:text-2xl font-bold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-300">
                      {service.title}
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-gray-300 mt-1">
                    {service.description}
                  </p>

                  {service.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.tags.map((t: string) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Overview */}
              {service.details && (
                <div className="mb-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-1">Overview</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{service.details}</p>
                </div>
              )}

              {/* Highlights */}
              {service.features?.length ? (
                <div className="mb-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Highlights</h3>
                  <ul className="space-y-1">
                    {service.features.map((f: string, i: number) => (
                      <li key={`${f}-${i}`} className="flex items-start gap-2 text-sm text-gray-300 leading-snug">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Gallery */}
              {service.gallery?.length ? (
                <div className="mb-2">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Project Gallery</h3>
                <div className="grid grid-cols-2 gap-3">
                    {service.gallery.map(
                      (g: { img: string; caption: string }, i: number) => (
                        <button
                          key={`${g.img}-${i}`}
                          onClick={() => setZoomed(g.img)}
                          className="group relative rounded-lg overflow-hidden border border-white/10 bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
                          aria-label={`Zoom image ${i + 1}`}
                        >
                          <div className="relative w-full aspect-video">
                            <Image
                              src={g.img}
                              alt={g.caption}
                              fill
                              sizes="(max-width: 768px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          </div>
                          <div className="px-2 py-1 text-[11px] text-gray-300">{g.caption}</div>
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : null}

              {/* Footer */}
              <div className="pt-4 text-center">
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-md border border-blue-500/50 bg-blue-500/10 px-6 py-2 text-sm font-medium text-blue-200 transition hover:bg-blue-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>

          {/* Zoom overlay */}
          <AnimatePresence>
            {zoomed && (
              <motion.button
                className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center px-4"
                onClick={() => setZoomed(null)}
                aria-label="Close zoomed image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="ring-gradient rounded-2xl p-[1px] max-w-5xl w-full">
                  <div className="card rounded-2xl overflow-hidden">
                    <div className="relative w-full max-h-[80vh] aspect-video">
                      <Image
                        src={zoomed}
                        alt="Zoomed"
                        fill
                        sizes="100vw"
                        className="object-contain bg-black"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
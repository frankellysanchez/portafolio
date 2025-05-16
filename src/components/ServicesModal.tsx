"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface ProjectData {
  title: string;
  description: string;
  icon: string;
  features?: string[];
  details?: string;
  gallery?: { img: string; caption: string }[];
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ProjectData | null;
}

export default function ProjectModal({ isOpen, onClose, service }: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && service && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-3xl bg-gradient-to-b from-gray-900 to-black text-white rounded-2xl shadow-xl p-4 sm:p-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
            style={{ maxHeight: "90vh", overflow: "hidden" }}
          >
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-2xl"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Cabecera */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <img
                src={service.icon}
                alt={service.title}
                className="w-14 h-14 object-contain rounded-lg border border-gray-600 bg-gray-800 p-1"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-400">{service.title}</h2>
                <p className="text-sm sm:text-base text-gray-300">{service.description}</p>
              </div>
            </div>

            {/* Overview */}
            {service.details && (
              <div className="mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Overview</h3>
                <p className="text-sm text-gray-300">{service.details}</p>
              </div>
            )}

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Highlights</h3>
                <ul className="space-y-1">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-300 leading-snug"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Galería */}
            {service.gallery && service.gallery.length > 0 && (
              <div className="mb-2">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Project Gallery</h3>
                <div className="grid grid-cols-2 gap-3">
                  {service.gallery.map((item, i) => (
                    <div
                      key={i}
                      className="bg-gray-800 rounded-lg border border-gray-700 shadow flex flex-col text-center"
                    >
                      <img
                        src={item.img}
                        alt={`Gallery image ${i + 1}`}
                        className="w-full h-44 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botón cerrar */}
            <div className="pt-3 text-center">
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

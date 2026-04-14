"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Camera, ExternalLink } from "lucide-react";
import { InstagramIcon } from "./Icons";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
    alt: "Celulares premium en exhibición",
    category: "iPhones",
  },
  {
    src: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop",
    alt: "Accesorios de celulares",
    category: "Accesorios",
  },
  {
    src: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&h=600&fit=crop",
    alt: "Apple Watch en muñeca",
    category: "Apple Watch",
  },
  {
    src: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&h=600&fit=crop",
    alt: "Samsung Galaxy serie",
    category: "Samsung",
  },
  {
    src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
    alt: "Auriculares premium",
    category: "Audio",
  },
  {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop",
    alt: "Últimos modelos de celulares",
    category: "Novedades",
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="galeria"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-brand-white to-pink-50/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink/10 text-brand-pink text-sm font-semibold mb-4">
            <Camera size={14} />
            Galería
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black">
            Seguinos en <span className="gradient-text">Instagram</span>
          </h2>
          <p className="mt-4 text-brand-black/50 text-lg max-w-2xl mx-auto">
            Descubrí nuestros productos, ofertas y novedades en @sj.celulares
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image placeholder with gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/20 to-brand-pink/5">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Overlay */}
              <motion.div
                initial={false}
                animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end p-6"
              >
                <span className="px-3 py-1 rounded-full bg-brand-pink text-white text-xs font-semibold mb-2">
                  {img.category}
                </span>
                <p className="text-white text-sm font-medium text-center">
                  {img.alt}
                </p>
              </motion.div>

              {/* Corner icon */}
              <motion.div
                initial={false}
                animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm"
              >
                <InstagramIcon size={16} className="text-white" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* InstagramIcon CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.instagram.com/sj.celulares"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-brand-pink text-brand-pink font-semibold hover:bg-brand-pink hover:text-white transition-all duration-300 hover:scale-105"
          >
            <InstagramIcon size={18} />
            Seguir en Instagram
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

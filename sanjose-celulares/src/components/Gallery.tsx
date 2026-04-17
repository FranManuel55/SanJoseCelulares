"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Camera, ExternalLink, Loader2 } from "lucide-react";
import { InstagramIcon } from "./Icons";

// Estructura de datos que nos devolverá la API de Instagram
interface InstagramPost {
  id: string;
  caption: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
}

// Datos de prueba (Mock) mientras configuramos la API real
const mockPosts: InstagramPost[] = [
  {
    id: "1",
    caption: "¡Nuevos ingresos! 🔥 iPhone 14 impecables. Consultá por el tuyo al WhatsApp. #SanJoseCelulares #iPhone #Mendoza",
    media_type: "IMAGE",
    media_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
    permalink: "https://www.instagram.com/sj.celulares",
  },
  {
    id: "2",
    caption: "Accesorios originales para tu celular. 🎧 Cargadores, cables, auriculares y mucho más.",
    media_type: "IMAGE",
    media_url: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop",
    permalink: "https://www.instagram.com/sj.celulares",
  },
  {
    id: "3",
    caption: "Apple Watch Series 8 disponible en stock. ⌚️ Diseño premium y todas las funciones que necesitás.",
    media_type: "IMAGE",
    media_url: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&h=600&fit=crop",
    permalink: "https://www.instagram.com/sj.celulares",
  },
  {
    id: "4",
    caption: "Llegaron los nuevos Samsung Galaxy. 📱 Vení a buscar el tuyo con garantía escrita.",
    media_type: "IMAGE",
    media_url: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&h=600&fit=crop",
    permalink: "https://www.instagram.com/sj.celulares",
  },
  {
    id: "5",
    caption: "Auriculares JBL con el mejor sonido. 🎶 Ideales para entrenar o escuchar tu música favorita.",
    media_type: "IMAGE",
    media_url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
    permalink: "https://www.instagram.com/sj.celulares",
  },
  {
    id: "6",
    caption: "¡Stock permanente de los últimos modelos! Visitá nuestra tienda en Mendoza.",
    media_type: "IMAGE",
    media_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop",
    permalink: "https://www.instagram.com/sj.celulares",
  }
];

function InstagramCard({ post, index, isInView }: { post: InstagramPost; index: number; isInView: boolean }) {
  const imageUrl = post.media_type === "VIDEO" && post.thumbnail_url ? post.thumbnail_url : post.media_url;
  
  // Truncar caption largo
  const truncatedCaption = post.caption.length > 90 ? post.caption.substring(0, 90) + "..." : post.caption;

  return (
    <motion.a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative aspect-square rounded-3xl overflow-hidden bg-brand-black cursor-pointer shadow-lg shadow-brand-pink/5 block"
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={truncatedCaption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Overlay Oscuro Base */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

      {/* Overlay Hover (Efecto Glass) */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center">
        <InstagramIcon className="w-12 h-12 text-white mb-4 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
        <p className="text-white text-sm font-medium line-clamp-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {truncatedCaption}
        </p>
        <span className="mt-4 px-4 py-2 rounded-full bg-brand-pink text-white text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          Ver Post
        </span>
      </div>

      {/* Icono superior derecho */}
      <div className="absolute top-4 right-4 p-2 rounded-full bg-black/30 backdrop-blur-md">
        <InstagramIcon size={16} className="text-white" />
      </div>
    </motion.a>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [posts, setPosts] = useState<InstagramPost[]>(mockPosts);

  // Aquí en el futuro llamaremos a nuestra API Route
  // useEffect(() => { ...fetch('/api/instagram')... }, []);

  return (
    <section
      id="galeria"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-brand-white to-pink-50/20 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-pink/30 to-transparent" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-brand-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink/10 text-brand-pink text-sm font-semibold mb-4">
            <Camera size={14} />
            Galería Exclusiva
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black">
            Seguinos en <span className="gradient-text">Instagram</span>
          </h2>
          <p className="mt-4 text-brand-black/50 text-lg max-w-2xl mx-auto">
            Mirá nuestras últimas publicaciones, ofertas y novedades en{" "}
            <a
              href="https://www.instagram.com/sj.celulares"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-pink font-semibold hover:underline"
            >
              @sj.celulares
            </a>
          </p>
        </motion.div>

        {/* Instagram posts grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {posts.map((post, i) => (
            <InstagramCard
              key={post.id}
              post={post}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="https://www.instagram.com/sj.celulares"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white border border-brand-pink/30 text-brand-pink font-bold text-lg hover:text-white transition-all duration-300 overflow-hidden shadow-xl shadow-brand-pink/5"
          >
            {/* Hover background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative flex items-center gap-3 z-10">
              <InstagramIcon size={22} className="text-brand-pink group-hover:text-white transition-colors duration-300" />
              <span>Seguir cuenta oficial</span>
              <ExternalLink size={16} className="opacity-70 group-hover:opacity-100" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

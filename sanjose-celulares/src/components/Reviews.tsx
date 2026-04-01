"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, MapPin } from "lucide-react";

const reviews = [
  {
    name: "María González",
    rating: 5,
    text: "Excelente atención y los mejores precios de Mendoza. Compré mi iPhone 14 y llegó impecable. Súper recomendados, ya van 3 celulares que compro acá.",
    date: "Hace 2 semanas",
    avatar: "MG",
  },
  {
    name: "Carlos Rodríguez",
    rating: 5,
    text: "Muy buena experiencia. Compré un Samsung Galaxy A35 y el precio era el mejor que encontré. La atención por WhatsApp fue rápida y profesional.",
    date: "Hace 1 mes",
    avatar: "CR",
  },
  {
    name: "Luciana Martínez",
    rating: 5,
    text: "Los accesorios son 100% originales. Compré cargador Anker y cable Apple, todo perfecto. La entrega fue el mismo día. Muy confiables.",
    date: "Hace 3 semanas",
    avatar: "LM",
  },
  {
    name: "Pablo Fernández",
    rating: 5,
    text: "Compré un Apple Watch Ultra y quedé encantado. El precio era muy competitivo y el equipo llegó en caja sellada. Repetiré sin dudas.",
    date: "Hace 1 mes",
    avatar: "PF",
  },
  {
    name: "Sofía Herrera",
    rating: 5,
    text: "La mejor tienda de celulares de Mendoza. Siempre tienen stock, precios justos y la atención es de primera. Los sigo en Instagram y siempre tienen ofertas.",
    date: "Hace 2 meses",
    avatar: "SH",
  },
  {
    name: "Diego Ramírez",
    rating: 5,
    text: "Compré una MacBook Pro M1 y fue una experiencia increíble. Me asesoraron perfecto y el precio era inmejorable. Súper profesionales.",
    date: "Hace 1 mes",
    avatar: "DR",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className="text-yellow-400 fill-yellow-400"
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="resenas"
      ref={ref}
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/20 to-brand-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink/10 text-brand-pink text-sm font-semibold mb-4">
            <Star size={14} className="fill-brand-pink" />
            Reseñas verificadas
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black">
            Lo que dicen <span className="gradient-text">nuestros clientes</span>
          </h2>
          <p className="mt-4 text-brand-black/50 text-lg max-w-2xl mx-auto">
            Miles de clientes confían en nosotros. Lee sus experiencias reales.
          </p>
        </motion.div>

        {/* Google rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="flex items-center gap-3 p-5 rounded-2xl bg-white shadow-lg shadow-brand-pink/5 border border-brand-pink/10">
            <div className="text-center px-6 border-r border-brand-pink/10">
              <p className="text-4xl font-bold text-brand-black">4.9</p>
              <Stars count={5} />
              <p className="text-xs text-brand-black/40 mt-1">de 5 estrellas</p>
            </div>
            <div className="px-6">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-sm font-semibold text-brand-black">Google</span>
              </div>
              <p className="text-xs text-brand-black/40 mt-1">
                Basado en cientos de reseñas
              </p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-brand-pink" />
                <span className="text-xs text-brand-pink font-medium">Mendoza, Argentina</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="group relative p-6 rounded-2xl bg-white border border-brand-pink/5 card-hover"
            >
              <Quote
                size={32}
                className="absolute top-4 right-4 text-brand-pink/10 group-hover:text-brand-pink/20 transition-colors"
              />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full animated-gradient flex items-center justify-center text-white text-sm font-bold">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-brand-black text-sm">
                    {review.name}
                  </p>
                  <p className="text-xs text-brand-black/40">{review.date}</p>
                </div>
              </div>

              <Stars count={review.rating} />

              <p className="mt-3 text-brand-black/60 text-sm leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

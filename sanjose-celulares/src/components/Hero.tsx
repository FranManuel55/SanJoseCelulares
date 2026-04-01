"use client";

import { motion } from "framer-motion";
import { MessageCircle, ChevronDown, Shield, Truck, Star } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-white via-pink-50/30 to-brand-white" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-pink/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-pink/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-pink/5 rounded-full blur-3xl" />

      {/* Floating shapes */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-20 h-20 bg-brand-pink/10 rounded-2xl blur-sm"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-brand-pink/15 rounded-full blur-sm"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-pink/10 border border-brand-pink/20 mb-8"
          >
            <Star size={14} className="text-brand-pink fill-brand-pink" />
            <span className="text-sm font-medium text-brand-pink">
              +10K clientes confían en nosotros
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-black leading-tight"
          >
            Tu próximo celular{" "}
            <span className="gradient-text">te está esperando</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-brand-black/60 max-w-2xl mx-auto leading-relaxed"
          >
            Los mejores equipos iPhone, Samsung, Motorola y más al mejor precio
            de Mendoza. Entrega inmediata y garantía en todos nuestros
            productos.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://wa.me/5492616928222"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-brand-pink text-white font-semibold text-lg shadow-xl shadow-brand-pink/30 hover:shadow-brand-pink/50 hover:scale-105 transition-all duration-300 whatsapp-pulse"
            >
              <MessageCircle size={22} />
              Consultar por WhatsApp
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#precios"
              className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-brand-black/10 text-brand-black font-semibold text-lg hover:border-brand-pink hover:text-brand-pink transition-all duration-300 hover:scale-105"
            >
              Ver precios
              <ChevronDown size={20} />
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {[
              { icon: Shield, text: "Garantía en todos los equipos" },
              { icon: Truck, text: "Envíos a todo Mendoza" },
              { icon: Star, text: "4.9★ en Google" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-brand-black/50">
                <badge.icon size={18} className="text-brand-pink" />
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-brand-black/30"
        >
          <span className="text-xs font-medium tracking-widest uppercase">
            Scroll
          </span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}

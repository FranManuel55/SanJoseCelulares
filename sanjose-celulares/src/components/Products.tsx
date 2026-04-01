"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Smartphone, Laptop, Watch, Headphones, Cable, Tv } from "lucide-react";

const categories = [
  {
    icon: Smartphone,
    title: "Celulares",
    description:
      "iPhone, Samsung, Motorola, Xiaomi y más. Nuevos e impecables con garantía.",
    highlight: "Stock permanente",
  },
  {
    icon: Laptop,
    title: "MacBook / Notebooks",
    description:
      "MacBook Pro y Air con los mejores precios. Ideales para trabajo y estudio.",
    highlight: "Financiación disponible",
  },
  {
    icon: Watch,
    title: "Apple Watch",
    description:
      "Serie SE, Serie 8, Ultra y más. Con accesorios y mallas incluidas.",
    highlight: "Ofertas semanales",
  },
  {
    icon: Headphones,
    title: "Auriculares",
    description:
      "JBL, Philips y más marcas. In-ear, over-ear y true wireless.",
    highlight: "Marcas premium",
  },
  {
    icon: Cable,
    title: "Cargadores y Cables",
    description:
      "Anker, Apple, Spigen. Cargadores rápidos, cables y powerbanks.",
    highlight: "100% originales",
  },
  {
    icon: Tv,
    title: "Streaming / Gaming",
    description:
      "Amazon Fire TV Stick, Roku y más. Lleva el entretenimiento a otro nivel.",
    highlight: "Nuevos sellados",
  },
];

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="productos"
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-pink/10 text-brand-pink text-sm font-semibold mb-4">
            Nuestros productos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black">
            Todo lo que <span className="gradient-text">necesitás</span>
          </h2>
          <p className="mt-4 text-brand-black/50 text-lg max-w-2xl mx-auto">
            Desde el último iPhone hasta accesorios premium, tenemos todo para
            vos con la mejor atención y precios de Mendoza.
          </p>
        </motion.div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative p-8 rounded-3xl bg-white border border-brand-pink/5 card-hover"
            >
              {/* Highlight badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-semibold">
                {cat.highlight}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl animated-gradient flex items-center justify-center mb-5 shadow-lg shadow-brand-pink/20 group-hover:shadow-brand-pink/40 transition-shadow duration-300">
                <cat.icon size={26} className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-brand-black mb-2">
                {cat.title}
              </h3>
              <p className="text-brand-black/50 text-sm leading-relaxed">
                {cat.description}
              </p>

              {/* Hover arrow */}
              <div className="mt-5 flex items-center gap-2 text-brand-pink font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href="#precios">Ver precios</a>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const brands = [
  { name: "Apple", models: "iPhone, MacBook, Apple Watch", slug: "apple" },
  { name: "Samsung", models: "Galaxy S, A Series", slug: "samsung" },
  { name: "Motorola", models: "Moto G, Edge", slug: "motorola" },
  { name: "Xiaomi", models: "Redmi, Note Series", slug: "xiaomi" },
  { name: "Honor", models: "HONOR Series", slug: "honor" },
  { name: "Anker", models: "Cargadores, Powerbanks", slug: "" },
  { name: "JBL", models: "Auriculares, Parlantes", slug: "jbl" },
  { name: "Spigen", models: "Fundas, Protectores", slug: "" },
];

export default function Brands() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-black">
            Marcas que <span className="gradient-text">trabajamos</span>
          </h2>
          <p className="mt-4 text-brand-black/50 text-lg max-w-xl mx-auto">
            Las mejores marcas del mercado con stock disponible y garantía oficial
          </p>
        </motion.div>

        {/* Brands grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative p-6 rounded-2xl bg-white border border-brand-pink/5 card-hover cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl animated-gradient flex items-center justify-center shadow-md shadow-brand-pink/20 group-hover:shadow-brand-pink/40 transition-shadow">
                  {brand.slug ? (
                    <img 
                      src={`https://cdn.simpleicons.org/${brand.slug}/white`} 
                      alt={`${brand.name} logo`} 
                      className="w-6 h-6 object-contain filter brightness-0 invert"
                    />
                  ) : (
                    <span className="text-white font-bold text-xl">
                      {brand.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-brand-black text-lg">
                  {brand.name}
                </h3>
                <p className="text-xs text-brand-black/40 mt-1">
                  {brand.models}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MessageCircle, Sparkles, Tag } from "lucide-react";

interface Product {
  name: string;
  condition: string;
  price: string;
  category: string;
}

const priceData: Product[] = [
  // iPhone
  { name: "iPhone 13 128GB", condition: "IMPECABLE", price: "$571.100", category: "iPhone" },
  { name: "iPhone 14 128GB", condition: "IMPECABLE", price: "$631.400", category: "iPhone" },
  { name: "iPhone 14 256GB", condition: "IMPECABLE", price: "$663.000", category: "iPhone" },
  { name: "iPhone 14 Plus 128GB", condition: "IMPECABLE", price: "$789.300", category: "iPhone" },
  { name: "iPhone 15 Pro Max 256GB", condition: "IMPECABLE", price: "$1.136.500", category: "iPhone" },

  // Samsung
  { name: "Samsung Galaxy A06 128GB", condition: "NUEVO", price: "$196.600", category: "Samsung" },
  { name: "Samsung Galaxy A15 128GB", condition: "IMPECABLE", price: "$189.400", category: "Samsung" },
  { name: "Samsung Galaxy A16 128GB", condition: "IMPECABLE", price: "$205.200", category: "Samsung" },
  { name: "Samsung Galaxy A17 128GB", condition: "NUEVO", price: "$284.100", category: "Samsung" },
  { name: "Samsung Galaxy A17 128GB", condition: "IMPECABLE", price: "$236.800", category: "Samsung" },
  { name: "Samsung Galaxy A24 128GB", condition: "IMPECABLE", price: "$221.000", category: "Samsung" },
  { name: "Samsung Galaxy A26 128GB", condition: "IMPECABLE", price: "$252.600", category: "Samsung" },
  { name: "Samsung Galaxy A26 256GB", condition: "IMPECABLE", price: "$299.900", category: "Samsung" },
  { name: "Samsung Galaxy A34 128GB", condition: "IMPECABLE", price: "$236.800", category: "Samsung" },
  { name: "Samsung Galaxy A35 128GB", condition: "IMPECABLE", price: "$268.300", category: "Samsung" },
  { name: "Samsung Galaxy A52 128GB", condition: "IMPECABLE", price: "$189.400", category: "Samsung" },

  // Motorola
  { name: "Moto G35 128GB", condition: "NUEVO", price: "$315.700", category: "Motorola" },
  { name: "Moto G24 Power 256GB", condition: "IMPECABLE", price: "$189.400", category: "Motorola" },
  { name: "Moto G34 256GB", condition: "IMPECABLE", price: "$205.200", category: "Motorola" },

  // Xiaomi / Honor
  { name: "Xiaomi Note 13 256GB", condition: "IMPECABLE", price: "$221.000", category: "Xiaomi/Honor" },
  { name: "Honor 400 Lite 256GB", condition: "IMPECABLE", price: "$330.100", category: "Xiaomi/Honor" },

  // Apple Watch
  { name: "Apple Watch SE 40mm", condition: "IMPECABLE", price: "$390.000", category: "Apple Watch" },
  { name: "Apple Watch Serie 8 45mm", condition: "IMPECABLE", price: "$434.000", category: "Apple Watch" },
  { name: "Apple Watch Ultra 49mm", condition: "IMPECABLE", price: "$789.300", category: "Apple Watch" },

  // MacBook
  { name: "MacBook Pro M1 256GB 13.3\"", condition: "IMPECABLE", price: "$1.105.000", category: "MacBook" },

  // Accesorios
  { name: "Cabezal Apple 20W", condition: "NUEVO", price: "$54.500", category: "Accesorios" },
  { name: "Cabezal Spigen 20W", condition: "NUEVO", price: "$38.700", category: "Accesorios" },
  { name: "Cable USB-C a USB-C 2M Anker", condition: "NUEVO", price: "$33.000", category: "Accesorios" },
  { name: "Cable USB-C a Lightning Apple", condition: "NUEVO", price: "$54.500", category: "Accesorios" },
  { name: "Powerbank Anker 5000mAh", condition: "NUEVO", price: "$64.700", category: "Accesorios" },
  { name: "JBL Tune Flex", condition: "NUEVO", price: "$97.000", category: "Accesorios" },
  { name: "Philips Series 4000", condition: "NUEVO", price: "$58.000", category: "Accesorios" },
  { name: "Roku Express HD", condition: "NUEVO", price: "$55.000", category: "Accesorios" },
];

const categories = ["Todos", "iPhone", "Samsung", "Motorola", "Xiaomi/Honor", "Apple Watch", "MacBook", "Accesorios"];

export default function PriceList() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered =
    activeCategory === "Todos"
      ? priceData
      : priceData.filter((p) => p.category === activeCategory);

  return (
    <section
      id="precios"
      ref={ref}
      className="relative py-24 bg-brand-black text-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-pink/30 to-transparent" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-brand-pink/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink/20 text-brand-pink text-sm font-semibold mb-4">
            <Tag size={14} />
            Lista de precios actualizada
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Precios que <span className="text-brand-pink">no vas a creer</span>
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-2xl mx-auto">
            Todos nuestros precios en pesos argentinos. Consultanos por
            precios especiales y promociones por WhatsApp.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-brand-pink text-white shadow-lg shadow-brand-pink/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Price cards grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filtered.map((product, i) => (
            <motion.div
              key={`${product.name}-${i}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="group relative p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-pink/30 transition-all duration-300 hover:bg-white/10"
            >
              {/* Condition badge */}
              <div
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${
                  product.condition === "NUEVO"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-brand-pink/20 text-brand-pink"
                }`}
              >
                <Sparkles size={10} />
                {product.condition}
              </div>

              <h3 className="font-semibold text-white/90 text-sm leading-snug mb-2 group-hover:text-brand-pink transition-colors">
                {product.name}
              </h3>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white">
                  {product.price}
                </span>
                <a
                  href={`https://wa.me/5492616928222?text=Hola! Me interesa el ${encodeURIComponent(product.name)} a ${encodeURIComponent(product.price)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-brand-pink/20 text-brand-pink hover:bg-brand-pink hover:text-white transition-all duration-300"
                >
                  <MessageCircle size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-white/40 text-sm mb-4">
            ¿No encontrás lo que buscás? Tenemos más modelos disponibles.
          </p>
          <a
            href="https://wa.me/5492616928222?text=Hola! Quisiera consultar por otros modelos disponibles"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-brand-pink text-white font-semibold hover:bg-brand-pink-dark transition-all duration-300 shadow-lg shadow-brand-pink/30 hover:scale-105"
          >
            <MessageCircle size={18} />
            Consultar otros modelos
          </a>
        </motion.div>
      </div>
    </section>
  );
}

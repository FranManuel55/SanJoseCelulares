"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.a
      href="https://wa.me/5492616928222?text=Hola! Me gustaría hacer una consulta"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: visible ? 1 : 0,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500 flex items-center justify-center shadow-2xl shadow-green-500/40 hover:bg-green-600 hover:scale-110 transition-all duration-300 whatsapp-pulse group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={26} className="text-white" />

      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-brand-black text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        ¡Escribinos!
      </span>
    </motion.a>
  );
}

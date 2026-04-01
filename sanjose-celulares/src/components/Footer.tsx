"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, MessageCircle, ArrowUp } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./Icons";

const footerLinks = [
  {
    title: "Productos",
    links: ["iPhone", "Samsung", "Motorola", "Apple Watch", "Accesorios"],
  },
  {
    title: "Empresa",
    links: ["Sobre nosotros", "Reseñas", "Galería", "Contacto"],
  },
  {
    title: "Soporte",
    links: ["Preguntas frecuentes", "Garantía", "Envíos", "Métodos de pago"],
  },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="relative bg-brand-black text-white">
      {/* Top border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-pink/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#inicio" className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl animated-gradient flex items-center justify-center shadow-lg shadow-brand-pink/30">
                <span className="text-white font-bold text-xl">SJ</span>
              </div>
              <div>
                <p className="font-bold text-lg leading-tight">San José</p>
                <p className="text-brand-pink text-xs font-medium tracking-wider uppercase">
                  Celulares
                </p>
              </div>
            </a>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Tu tienda de confianza en Mendoza para celulares, accesorios y
              tecnología. Los mejores precios y la mejor atención.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/sj.celulares"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-brand-pink/20 hover:text-brand-pink transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://www.facebook.com/Sanjosecelulares"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-brand-pink/20 hover:text-brand-pink transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="https://wa.me/5492616928222"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-green-500/20 hover:text-green-400 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Links columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/40 text-sm hover:text-brand-pink transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/30 text-sm flex items-center gap-1">
            © {new Date().getFullYear()} San José Celulares. Hecho con{" "}
            <Heart size={14} className="text-brand-pink fill-brand-pink" /> en
            Mendoza.
          </p>

          {/* Back to top */}
          <a
            href="#inicio"
            className="flex items-center gap-2 text-white/30 text-sm hover:text-brand-pink transition-colors duration-300"
          >
            Volver arriba
            <ArrowUp size={14} />
          </a>
        </motion.div>
      </div>
    </footer>
  );
}

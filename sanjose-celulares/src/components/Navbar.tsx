"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Precios", href: "#precios" },
  { label: "Reseñas", href: "#resenas" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-lg shadow-brand-pink/5 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl animated-gradient flex items-center justify-center shadow-lg shadow-brand-pink/30 group-hover:shadow-brand-pink/50 transition-shadow duration-300">
                <span className="text-white font-bold text-lg sm:text-xl">SJ</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-brand-black text-lg leading-tight">
                  San José
                </p>
                <p className="text-brand-pink text-xs font-medium tracking-wider uppercase">
                  Celulares
                </p>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-brand-black/70 hover:text-brand-pink transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-pink group-hover:w-3/4 transition-all duration-300 rounded-full" />
                </a>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/5492616928222"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-pink text-white text-sm font-semibold hover:bg-brand-pink-dark transition-all duration-300 shadow-lg shadow-brand-pink/30 hover:shadow-brand-pink/50 hover:scale-105"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-brand-pink/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X size={24} className="text-brand-black" />
                ) : (
                  <Menu size={24} className="text-brand-black" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-brand-white shadow-2xl pt-20 px-6"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-4 py-3 rounded-xl text-brand-black font-medium hover:bg-brand-pink/10 hover:text-brand-pink transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="https://wa.me/5492616928222"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-pink text-white font-semibold shadow-lg shadow-brand-pink/30"
                >
                  <MessageCircle size={18} />
                  Contactar por WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

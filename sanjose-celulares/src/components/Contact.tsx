"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, MapPin, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon, SendIcon } from "./Icons";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contacto"
      ref={ref}
      className="relative py-24 bg-brand-black text-white overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-pink/30 to-transparent" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-brand-pink/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink/20 text-brand-pink text-sm font-semibold mb-6">
              <MessageCircle size={14} />
              Contactanos
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              ¿Listo para tu{" "}
              <span className="text-brand-pink">nuevo celular</span>?
            </h2>
            <p className="mt-6 text-white/50 text-lg leading-relaxed max-w-lg">
              Escribinos por WhatsApp y te respondemos al instante. Te
              asesoramos sin compromiso y te ofrecemos los mejores precios de
              Mendoza.
            </p>

            {/* Contact details */}
            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-pink/20 flex items-center justify-center">
                  <MessageCircle size={22} className="text-brand-pink" />
                </div>
                <div>
                  <p className="text-white/40 text-sm">WhatsApp</p>
                  <p className="text-white font-semibold">+54 9 2616 92-8222</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-pink/20 flex items-center justify-center">
                  <MapPin size={22} className="text-brand-pink" />
                </div>
                <div>
                  <p className="text-white/40 text-sm">Ubicación</p>
                  <p className="text-white font-semibold">
                    Godoy Cruz 1124, San José, Guaymallén
                  </p>
                  <p className="text-white/40 text-sm">
                    Mendoza, Argentina
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-pink/20 flex items-center justify-center">
                  <Clock size={22} className="text-brand-pink" />
                </div>
                <div>
                  <p className="text-white/40 text-sm">Horario de atención</p>
                  <p className="text-white font-semibold text-sm">
                    Lun a Vie: 9:00 a 13:00 - 16:30 a 20:30 <br />
                    Sáb: 9:30 a 13:00 - 17:00 a 20:30
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-10 flex items-center gap-4">
              <a
                href="https://www.instagram.com/sj.celulares"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-pink/20 hover:border-brand-pink/30 transition-all duration-300"
              >
                <InstagramIcon size={20} className="text-white" />
              </a>
              <a
                href="https://www.facebook.com/Sanjosecelulares"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-pink/20 hover:border-brand-pink/30 transition-all duration-300"
              >
                <FacebookIcon size={20} className="text-white" />
              </a>
            </div>
          </motion.div>

          {/* Right - CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 overflow-hidden">
              {/* Background glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-pink/20 rounded-full blur-3xl" />

              <div className="relative text-center">
                {/* Phone icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl animated-gradient flex items-center justify-center shadow-2xl shadow-brand-pink/30">
                  <MessageCircle size={36} className="text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  Escribinos ahora
                </h3>
                <p className="text-white/50 mb-8">
                  Hacé tu consulta sin compromiso. Respondemos en minutos.
                </p>

                {/* Main WhatsApp button */}
                <a
                  href="https://wa.me/5492616928222?text=Hola! Me gustaría hacer una consulta sobre celulares"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 w-full justify-center px-8 py-5 rounded-2xl bg-green-500 text-white font-bold text-lg shadow-xl shadow-green-500/30 hover:bg-green-600 hover:scale-[1.02] transition-all duration-300 whatsapp-pulse"
                >
                  <SendIcon size={22} />
                  Enviar mensaje por WhatsApp
                </a>

                {/* Quick links */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <a
                    href="https://wa.me/5492616928222?text=Hola! Quisiera consultar precios de iPhones"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    Consultar iPhones
                  </a>
                  <a
                    href="https://wa.me/5492616928222?text=Hola! Quisiera consultar precios de Samsung"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    Consultar Samsung
                  </a>
                  <a
                    href="https://wa.me/5492616928222?text=Hola! Quisiera consultar por accesorios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    Ver accesorios
                  </a>
                  <a
                    href="https://wa.me/5492616928222?text=Hola! Quisiera consultar por Apple Watch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    Apple Watch
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Google Maps Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-brand-pink/5">
            {/* Map glow decoration */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-20 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              {/* Header bar */}
              <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border-b border-white/10">
                <div className="w-8 h-8 rounded-lg bg-brand-pink/20 flex items-center justify-center">
                  <MapPin size={16} className="text-brand-pink" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Nuestra ubicación</p>
                  <p className="text-white/40 text-xs">Godoy Cruz 1124, San José, Guaymallén, Mendoza</p>
                </div>
              </div>

              {/* Map iframe */}
              <iframe
                src="https://www.google.com/maps?q=Godoy+Cruz+1124,+Villa+Nueva+de+Guaymallén,+Mendoza,+Argentina&output=embed"
                width="100%"
                height="400"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación San José Celulares - Godoy Cruz 1124, Guaymallén, Mendoza"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

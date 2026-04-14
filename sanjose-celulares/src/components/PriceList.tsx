"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MessageCircle, Sparkles, Tag, Loader2 } from "lucide-react";

interface Product {
  name: string;
  condition: string;
  price: string;
  category: string;
}

export default function PriceList() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [priceData, setPriceData] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["Todos"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          `https://docs.google.com/spreadsheets/d/1bE2Y0FgTQc5w1n9cBeypLSuqxyjvxuKg7fFVyTMSV_k/export?format=csv&t=${new Date().getTime()}`,
          { cache: "no-store" }
        );
        const text = await response.text();
        
        // Simple CSV Parser
        const parseCSV = (str: string) => {
          const arr: string[][] = [];
          let quote = false;
          for (let row = 0, col = 0, c = 0; c < str.length; c++) {
            let cc = str[c], nc = str[c + 1];
            arr[row] = arr[row] || [];
            arr[row][col] = arr[row][col] || '';

            if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }
            if (cc == '"') { quote = !quote; continue; }
            if (cc == ',' && !quote) { ++col; continue; }
            if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }
            if (cc == '\n' && !quote) { ++row; col = 0; continue; }
            if (cc == '\r' && !quote) { ++row; col = 0; continue; }

            arr[row][col] += cc;
          }
          return arr;
        };

        const rows = parseCSV(text);
        const parsedProducts: Product[] = [];
        let currentCategory = "Otros";

        rows.forEach((cols) => {
          if (!cols || !cols[0] || cols[0].trim() === "") return;

          const name = cols[0].trim();
          const condition = cols[1] ? cols[1].trim() : null;

          let priceVal = null;
          if (cols[2] && cols[2].trim() !== "") priceVal = cols[2].trim();
          else if (cols[3] && cols[3].trim() !== "") priceVal = cols[3].trim();

          if (!condition && priceVal === null) {
            if (
              !name.toLowerCase().includes("whatsaap") &&
              !name.toLowerCase().includes("lista de iphone")
            ) {
              let catName = name.toUpperCase();
              if (catName.includes("VARIOS APPLE")) catName = "APPLE WATCH";
              if (catName.includes("CABLES")) catName = "ACCESORIOS";
              currentCategory = catName;
            }
          } else if (name && !name.toLowerCase().includes("whatsaap")) {
            let finalPrice = "Consultar";
            if (priceVal !== null) {
              if (priceVal.includes("$")) {
                finalPrice = priceVal.replace(/\s+/g, "");
              } else {
                let parseNum = Number(priceVal.replace(/[^\d.-]/g, ''));
                if (!isNaN(parseNum)) {
                  const formattedPrice = new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    maximumFractionDigits: 0,
                  }).format(parseNum);
                  finalPrice = formattedPrice.replace(/\s+/g, "").replace(",00", "");
                } else {
                  finalPrice = priceVal;
                }
              }
            }
            
            // Skip invalid or placeholder products hidden in the sheet with 0 price
            if (finalPrice === "$0" || finalPrice === "0" || finalPrice === "$0.00" || finalPrice === "$0,00" || finalPrice === "$-") {
               return; 
            }

            const cleanedCondition = (condition || "NUEVO").replace(/\n/g, " ").trim();

            let itemCat = currentCategory;
            if (name.toLowerCase().includes("apple watch") || name.toLowerCase().includes("malla")) {
               itemCat = "APPLE WATCH";
            }

            parsedProducts.push({
              name: name,
              condition: cleanedCondition,
              price: finalPrice,
              category: itemCat,
            });
          }
        });

        setPriceData(parsedProducts);
        
        const fetchedCategories = Array.from(new Set(parsedProducts.map((p) => p.category)));
        setCategories(["Todos", ...fetchedCategories]);
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-brand-pink w-full">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="text-white/60">Actualizando precios en tiempo real...</p>
          </div>
        ) : (
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
                    product.condition.toUpperCase() === "NUEVO"
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

                <div className="flex items-center justify-between mt-4">
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
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 w-full flex flex-col items-center"
        >
          {/* Discount Disclaimer */}
          <div className="mb-10 p-5 rounded-xl bg-white/5 border border-brand-pink/20 inline-block max-w-2xl text-center shadow-lg shadow-brand-pink/5">
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              <span className="text-brand-pink font-bold text-lg mr-2">*</span>
              Toda la lista cuenta con un <strong className="text-brand-pink font-bold">10% de descuento adicional</strong> pagando en efectivo o transferencia (aplica a productos seleccionados).
            </p>
          </div>

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

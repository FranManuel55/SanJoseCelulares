"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MessageCircle, Sparkles, Tag, Loader2, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface Product {
  name: string;
  condition: string;
  price: string;
  category: string;
  image: string;
}

const ITEMS_PER_PAGE = 12;

// Updated timestamp to force refresh
/**
 * Converts a Google Drive sharing link to a direct thumbnail URL.
 * Input:  https://drive.google.com/file/d/FILE_ID/view?usp=drive_link
 * Output: https://drive.google.com/thumbnail?id=FILE_ID&sz=w800
 */
function driveUrlToThumbnail(url: string): string {
  if (!url) return "";
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
  }
  // Already a direct URL or unknown format — return as-is
  return url;
}

export default function PriceList() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [priceData, setPriceData] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["Todos"]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          `https://docs.google.com/spreadsheets/d/e/2PACX-1vSYwgBsRjSHcZ0vZXSk9e7ppXjTBPkLXsvmdeixTD8g3jWKIcJ1fkHJU3f4uFBnVEL6i0R9aIEVOcgw/pub?output=csv&t=${new Date().getTime()}`,
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

          // Image URL from column I (index 8) — can be adjusted
          const imageUrl = cols[8] ? cols[8].trim() : "";

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
              image: driveUrlToThumbnail(imageUrl),
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

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of section smoothly
      const section = document.getElementById("precios");
      if (section) {
        const yOffset = -80;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  // Generate page numbers for pagination display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                  ? "bg-brand-pink text-white shadow-lg shadow-brand-pink/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Discount Disclaimer — shown prominently before the products */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-10"
          >
            <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-brand-pink/10 via-white/[0.06] to-brand-pink/10 border border-brand-pink/25 max-w-4xl mx-auto text-center shadow-lg shadow-brand-pink/10 overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-pink to-transparent" />
              <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed">
                <span className="text-brand-pink font-bold text-2xl sm:text-3xl mr-2 align-middle">✦</span>
                Toda la lista cuenta con un{" "}
                <strong className="text-brand-pink font-extrabold text-lg sm:text-xl md:text-2xl">10% de descuento adicional</strong>{" "}
                pagando en <strong className="text-white font-bold">efectivo o transferencia</strong>
                <span className="block sm:inline text-white/50 text-sm sm:text-base mt-1 sm:mt-0 sm:ml-1">(aplica a productos seleccionados)</span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Results count & page info */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-6"
          >
            <p className="text-white/40 text-sm">
              Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} de{" "}
              <span className="text-brand-pink font-semibold">{filtered.length}</span> productos
            </p>
            {totalPages > 1 && (
              <p className="text-white/40 text-sm">
                Página {currentPage} de {totalPages}
              </p>
            )}
          </motion.div>
        )}

        {/* Price cards grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-brand-pink w-full">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="text-white/60">Actualizando precios en tiempo real...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`page-${currentPage}-${activeCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {paginatedProducts.map((product, i) => (
                <motion.div
                  key={`${product.name}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="group relative rounded-2xl bg-white/[0.04] border border-white/[0.06] transition-all duration-400 overflow-hidden price-card-hover"
                >
                  {/* Product image area */}
                  <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-white/[0.03] to-white/[0.01] overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center text-white/15 ${product.image ? "hidden" : "flex"
                        }`}
                    >
                      <ImageIcon size={48} strokeWidth={1} />
                      <span className="text-xs mt-2 text-white/10">Sin imagen</span>
                    </div>

                    {/* Category tag overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white/70 text-[10px] font-semibold uppercase tracking-wider">
                        {product.category}
                      </span>
                    </div>

                    {/* Condition badge overlay */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${product.condition.toUpperCase() === "NUEVO"
                            ? "bg-green-500/20 text-green-400 border border-green-500/20"
                            : "bg-brand-pink/20 text-brand-pink border border-brand-pink/20"
                          }`}
                      >
                        <Sparkles size={10} />
                        {product.condition}
                      </span>
                    </div>
                  </div>

                  {/* Product details */}
                  <div className="p-5">
                    <h3 className="font-semibold text-white/90 text-base leading-snug mb-4 group-hover:text-brand-pink transition-colors duration-300 line-clamp-2 min-h-[2.75rem]">
                      {product.name}
                    </h3>

                    <div className="flex items-end justify-between pt-3 border-t border-white/[0.06]">
                      <div>
                        <span className="text-[11px] text-white/30 uppercase tracking-wider font-medium block mb-0.5">
                          Precio
                        </span>
                        <span className="text-2xl font-bold text-white tracking-tight">
                          {product.price}
                        </span>
                      </div>
                      <a
                        href={`https://wa.me/5492616928222?text=Hola! Me interesa el ${encodeURIComponent(product.name)} a ${encodeURIComponent(product.price)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-pink/15 text-brand-pink hover:bg-brand-pink hover:text-white transition-all duration-300 text-sm font-semibold group/btn"
                      >
                        <MessageCircle size={16} className="transition-transform duration-300 group-hover/btn:scale-110" />
                        <span className="hidden sm:inline">Consultar</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 mt-12"
          >
            {/* Previous button */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${currentPage === 1
                  ? "bg-white/5 text-white/20 cursor-not-allowed"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, idx) =>
                typeof page === "string" ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-white/30">
                    ···
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-300 ${currentPage === page
                        ? "bg-brand-pink text-white shadow-lg shadow-brand-pink/30 scale-110"
                        : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            {/* Next button */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${currentPage === totalPages
                  ? "bg-white/5 text-white/20 cursor-not-allowed"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight size={16} />
            </button>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 w-full flex flex-col items-center"
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

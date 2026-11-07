"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, Apple, CircleDot, Boxes } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCategoryCard } from "@/data/products";

interface ProductsCategoryGridProps {
  categories: ProductCategoryCard[];
}

const FILTER_OPTIONS = [
  { label: "All Products", slug: "all" },
  { label: "Textile", slug: "textile" },
  { label: "Fruit & Vegetables", slug: "fruit-and-vegetables" },
  { label: "Coconut", slug: "coconut" },
  { label: "Jaggery", slug: "jaggery" },
];

export function ProductsCategoryGrid({ categories }: ProductsCategoryGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && FILTER_OPTIONS.some((f) => f.slug === hash)) {
        setActiveFilter(hash);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleFilterChange = (slug: string) => {
    setActiveFilter(slug);
    if (typeof window !== "undefined") {
      const newUrl = slug === "all" ? window.location.pathname : `#${slug}`;
      window.history.pushState(null, "", newUrl);
    }
  };

  const filteredCategories =
    activeFilter === "all"
      ? categories
      : categories.filter((c) => c.slug === activeFilter);

  const iconMap: Record<string, React.ReactNode> = {
    textile: <Layers className="w-8 h-8 text-[#B4763A]" />,
    "fruit-and-vegetables": <Apple className="w-8 h-8 text-[#B4763A]" />,
    coconut: <CircleDot className="w-8 h-8 text-[#B4763A]" />,
    jaggery: <Boxes className="w-8 h-8 text-[#B4763A]" />,
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Filter Chips as Pill Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {FILTER_OPTIONS.map((opt) => {
          const isActive = activeFilter === opt.slug;
          return (
            <button
              key={opt.slug}
              type="button"
              onClick={() => handleFilterChange(opt.slug)}
              className={`py-2 px-4 sm:px-5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? "bg-[#1F4A3A] text-white shadow-xs"
                  : "bg-white border border-[#E3DDCF] text-[#1E2A24] hover:border-[#1F4A3A] hover:bg-[#F6F3EC]"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Product Cards Grid with AnimatePresence layout reflow */}
      <motion.div
        layout
        className="grid grid-cols-1 min-[360px]:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6"
      >
        <AnimatePresence>
          {filteredCategories.map((cat) => (
            <motion.div
              key={cat.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="h-full"
            >
              <div
                id={cat.slug}
                className="site-card group h-full rounded-2xl border border-[#E3DDCF] bg-white overflow-hidden flex flex-col justify-between shadow-xs transition-all duration-300 relative [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-[#B4763A]/50 [@media(hover:hover)]:hover:shadow-[0_12px_28px_-12px_rgba(30,42,36,0.18)] active:scale-[0.98] scroll-mt-28"
              >
                {/* Copper Top Reveal Bar */}
                <span
                  aria-hidden="true"
                  className="site-card-top-bar absolute top-0 left-0 right-0 h-[2px] bg-[#B4763A] scale-x-0 origin-left transition-transform duration-300 pointer-events-none rounded-t-2xl z-10"
                />

                <div>
                  {/* 4:3 Image Area on Top */}
                  <div className="relative w-full aspect-[4/3] bg-[#F6F3EC] border-b border-[#E3DDCF] overflow-hidden flex items-center justify-center">
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover site-card-image transition-transform duration-500 ease-out"
                        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="site-card-image transition-transform duration-500 ease-out flex flex-col items-center justify-center p-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-[#E3DDCF] flex items-center justify-center shadow-2xs mb-2">
                          {iconMap[cat.slug] || (
                            <Boxes className="w-7 h-7 text-[#B4763A]" />
                          )}
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#B4763A]">
                          Export Quality
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 space-y-1.5">
                    <h2 className="site-card-title font-serif text-base sm:text-lg font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A] transition-colors">
                      {cat.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#5F6B64] leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Full-width deep-green pill button 'View Product →' */}
                <div className="p-4 sm:p-5 pt-0">
                  <Link
                    href={`/products/${cat.slug}`}
                    className="w-full py-2.5 sm:py-3 px-4 rounded-full bg-[#1F4A3A] hover:bg-[#163829] text-white text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 shadow-2xs group/btn [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl-flip site-card-arrow transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

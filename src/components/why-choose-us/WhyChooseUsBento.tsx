"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  Layers,
  Globe2,
  Clock,
  Phone,
  Shirt,
} from "lucide-react";
import type { ReasonItem } from "@/data/whyChooseUs";
import { productsData } from "@/data/products";

interface WhyChooseUsBentoProps {
  reasons: ReasonItem[];
}

export function WhyChooseUsBento({ reasons }: WhyChooseUsBentoProps) {
  const shouldReduceMotion = useReducedMotion();

  const featuredCard = reasons[0];
  const gridCards = reasons.slice(1);

  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-7 h-7 text-[#B4763A]" />,
    Layers: <Layers className="w-5 h-5 transition-colors" />,
    Globe2: <Globe2 className="w-5 h-5 transition-colors" />,
    Clock: <Clock className="w-5 h-5 transition-colors" />,
    Phone: <Phone className="w-5 h-5 transition-colors" />,
  };

  // Retrieve category data from productsData in exact required order
  const fruitVeg = productsData.categories.find(
    (c) => c.slug === "fruit-and-vegetables"
  );
  const coconut = productsData.categories.find((c) => c.slug === "coconut");
  const jaggery = productsData.categories.find((c) => c.slug === "jaggery");
  const textile = productsData.categories.find((c) => c.slug === "textile");

  const mosaicTiles = [
    {
      name: "Fruit & Vegetables",
      slug: "fruit-and-vegetables",
      image: fruitVeg?.image || "/products/fruit-vegetables/freshvegetables2.jpg",
      alt: "Selection of farm fresh Indian vegetables for export",
      position: "center",
    },
    {
      name: "Coconut",
      slug: "coconut",
      image: coconut?.image || "/products/coconut/coconut2.jpg",
      alt: "Premium graded mature coconuts from Maharashtra",
      position: "center",
    },
    {
      name: "Jaggery",
      slug: "jaggery",
      image: jaggery?.image || "/products/jaggery/jaggery2.jpg",
      alt: "Natural organic chemical-free jaggery cubes",
      position: "center",
    },
    {
      name: "Textile",
      slug: "textile",
      image: textile?.image, // undefined until client supplies photo
      alt: "Textile products for export",
      position: "center",
    },
  ];

  // Motion variants for mosaic 60ms stagger reveal
  const mosaicContainerVariant: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };

  const mosaicTileVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 items-stretch">
      {/* 1. Featured Card: Trust First with Photo Background */}
      {featuredCard && (
        <motion.div
          key={featuredCard.id}
          initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
          }
          className="col-span-1 min-[360px]:col-span-2 sm:col-span-2 lg:col-span-1 lg:row-span-2 rounded-2xl bg-[#163829] border border-[#163829] p-6 sm:p-7 lg:p-8 relative overflow-hidden flex flex-col justify-between shadow-md [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_20px_40px_-15px_rgba(22,56,41,0.4)] active:scale-[0.98] transition-all duration-300 group min-h-[340px] lg:min-h-full"
        >
          {/* Photo Background (export1) under deep-green gradient overlay */}
          {featuredCard.image && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.05, 1],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                className="relative w-full h-full"
              >
                <Image
                  src={featuredCard.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  quality={90}
                  priority={false}
                />
              </motion.div>
              {/* Deep-green gradient overlay (88% to 70%) for AA contrast */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-[#163829]/90 via-[#163829]/84 to-[#1F4A3A]/72 pointer-events-none"
              />
            </div>
          )}

          {/* Top Row: 52px copper-bordered icon tile and '01' numeral */}
          <div className="flex items-center justify-between mb-8 sm:mb-12 relative z-10">
            <div className="w-[52px] h-[52px] rounded-xl bg-white/10 backdrop-blur-xs border border-[#B4763A] flex items-center justify-center text-[#B4763A] shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
              {iconMap[featuredCard.icon] || (
                <ShieldCheck className="w-7 h-7 text-[#B4763A]" />
              )}
            </div>
            <span className="font-mono text-sm sm:text-base font-bold text-[#B4763A] tabular-nums">
              {featuredCard.numeral}
            </span>
          </div>

          {/* Bottom Area: White small-caps serif title and ivory text */}
          <div className="relative z-10 space-y-3">
            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-white">
              {featuredCard.title}
            </h3>
            <p className="text-[#F6F3EC] text-sm sm:text-base leading-relaxed">
              {featuredCard.description}
            </p>
          </div>
        </motion.div>
      )}

      {/* 2. Cards 2 to 5 in Balanced Grid */}
      {gridCards.map((item, idx) => {
        const isProductLines = item.id === "four-product-lines";
        const isExperience = item.id === "import-export-experience";

        return (
          <motion.div
            key={item.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.4,
                    delay: (idx + 1) * 0.07,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }
            }
            className="col-span-1 rounded-2xl bg-white border border-[#E3DDCF] p-4 sm:p-5 lg:p-6 relative overflow-hidden flex flex-col justify-between shadow-xs transition-all duration-300 group cursor-default [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-[#B4763A] [@media(hover:hover)]:hover:shadow-[0_12px_28px_-12px_rgba(30,42,36,0.18)] active:scale-[0.98] h-full"
          >
            {/* 2px copper top edge hidden until hover */}
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[2px] bg-[#B4763A] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 pointer-events-none rounded-t-2xl z-10"
            />

            <div className="flex flex-col flex-1 justify-between">
              <div>
                {/* Top Row: 40px icon tile on left, 2-digit copper number on right */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E3DDCF] flex items-center justify-center text-[#B4763A] shrink-0 transition-all duration-300 group-hover:bg-[#1F4A3A] group-hover:border-transparent group-hover:scale-[1.06] group-hover:text-white shadow-2xs">
                    {iconMap[item.icon] || (
                      <ShieldCheck className="w-5 h-5 transition-colors" />
                    )}
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#B4763A] tabular-nums transition-colors duration-200 group-hover:text-[#1F4A3A]">
                    {item.numeral}
                  </span>
                </div>

                {/* Card 2: Redesigned 2×2 Mosaic of Equal 4:3 Tiles with Bottom Label Chips */}
                {isProductLines && (
                  <motion.div
                    variants={mosaicContainerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-2 gap-2 mb-4"
                  >
                    {mosaicTiles.map((tile) => {
                      const hasImage = Boolean(tile.image);

                      if (hasImage && tile.image) {
                        return (
                          <motion.div
                            key={tile.slug}
                            variants={mosaicTileVariant}
                            className="aspect-[4/3] rounded-xl overflow-hidden relative border border-[#E3DDCF] bg-[#F6F3EC] group/tile cursor-pointer active:scale-[0.98] transition-all duration-300 [@media(hover:hover)]:hover:border-[#B4763A]"
                          >
                            <div className="relative w-full h-full transition-transform duration-300 ease-out group-hover/tile:scale-108">
                              <Image
                                src={tile.image}
                                alt={tile.alt}
                                fill
                                className="object-cover"
                                style={{ objectPosition: tile.position || "center" }}
                                sizes="(min-width: 1024px) 15vw, 40vw"
                                quality={85}
                                priority={false}
                              />
                            </div>

                            {/* Bottom Label Chip: Soft dark-green gradient (40% height) */}
                            <div
                              aria-hidden="true"
                              className="absolute bottom-0 inset-x-0 h-[40%] bg-gradient-to-t from-[#163829]/80 to-transparent pointer-events-none"
                            />
                            <div className="absolute bottom-0 inset-x-0 p-2 text-start transition-transform duration-300 ease-out group-hover/tile:-translate-y-[2px] z-10 pointer-events-none">
                              <span className="text-[10px] sm:text-[11px] max-[640px]:text-[9px] font-bold uppercase tracking-wider text-white select-none block truncate">
                                {tile.name}
                              </span>
                            </div>
                          </motion.div>
                        );
                      }

                      {/* Textile Designed Placeholder Tile (No photo yet) */}
                      return (
                        <motion.div
                          key={tile.slug}
                          variants={mosaicTileVariant}
                          className="aspect-[4/3] rounded-xl overflow-hidden relative border border-[#E3DDCF] bg-gradient-to-br from-[#F6F3EC] via-[#FAF7F2] to-white group/tile cursor-pointer active:scale-[0.98] transition-all duration-300 flex flex-col items-center justify-center p-2 [@media(hover:hover)]:hover:border-[#B4763A]"
                        >
                          {/* Centered 36px copper-outlined circle holding Shirt icon */}
                          <div className="w-9 h-9 rounded-full border border-[#B4763A] bg-white/90 shadow-2xs flex items-center justify-center text-[#B4763A] transition-transform duration-300 ease-out group-hover/tile:scale-110 mb-2">
                            <Shirt className="w-4 h-4 text-[#B4763A]" />
                          </div>

                          {/* Textile label in muted ink at bottom start */}
                          <div className="absolute bottom-0 inset-x-0 p-2 text-start transition-transform duration-300 ease-out group-hover/tile:-translate-y-[2px] z-10 pointer-events-none">
                            <span className="text-[10px] sm:text-[11px] max-[640px]:text-[9px] font-bold uppercase tracking-wider text-[#5F6B64] select-none block truncate">
                              {tile.name}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}

                {/* Card 3: Wide 16:6 Image Strip */}
                {isExperience && item.image && (
                  <div className="relative aspect-[16/6] rounded-xl overflow-hidden border border-[#E3DDCF] bg-[#F6F3EC] mb-4">
                    <Image
                      src={item.image}
                      alt={item.imageAlt || ""}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      quality={85}
                      priority={false}
                    />
                  </div>
                )}

                {/* Title in serif font, deep green */}
                <h3 className="site-card-title font-serif text-base sm:text-lg font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A] transition-colors mb-2">
                  {item.title}
                </h3>

                {/* Description in muted text-sm */}
                <p className="text-xs sm:text-sm text-[#5F6B64] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  Layers,
  Globe2,
  Clock,
  Phone,
} from "lucide-react";
import type { ReasonItem } from "@/data/whyChooseUs";

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

  return (
    <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 items-stretch">
      {/* 1. Featured Card: Trust First */}
      {featuredCard && (
        <motion.div
          key={featuredCard.id}
          initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          }
          className="col-span-1 min-[360px]:col-span-2 sm:col-span-2 lg:col-span-1 lg:row-span-2 rounded-2xl bg-gradient-to-br from-[#163829] to-[#1F4A3A] border border-[#163829] p-6 sm:p-7 lg:p-8 relative overflow-hidden flex flex-col justify-between shadow-md [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_20px_40px_-15px_rgba(22,56,41,0.4)] active:scale-[0.98] transition-all duration-300 group"
        >
          {/* Faint drifting icon outline in the corner (6s loop, transform only) */}
          <motion.div
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -8, 0],
                    rotate: [0, 2, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className="absolute -bottom-6 -right-6 pointer-events-none text-white opacity-[0.08]"
          >
            <ShieldCheck className="w-48 h-48 sm:w-56 sm:h-56 stroke-[1.2]" />
          </motion.div>

          {/* Top Row: 52px copper-bordered icon tile and '01' numeral */}
          <div className="flex items-center justify-between mb-8 sm:mb-12 relative z-10">
            <div className="w-[52px] h-[52px] rounded-xl bg-white/10 border border-[#B4763A] flex items-center justify-center text-[#B4763A] shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
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

      {/* 2. Cards 2 to 5 in 2×2 Grid */}
      {gridCards.map((item, idx) => (
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
                  ease: [0.16, 1, 0.3, 1],
                }
          }
          className="col-span-1 rounded-2xl bg-white border border-[#E3DDCF] p-4 sm:p-5 lg:p-6 relative overflow-hidden flex flex-col justify-between shadow-xs transition-all duration-300 group cursor-default [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-[#B4763A] [@media(hover:hover)]:hover:shadow-[0_12px_28px_-12px_rgba(30,42,36,0.18)] active:scale-[0.98]"
        >
          {/* 2px copper top edge hidden until hover */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-[2px] bg-[#B4763A] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 pointer-events-none rounded-t-2xl z-10"
          />

          <div>
            {/* Top Row: 40px icon tile on left, 2-digit copper number on right */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E3DDCF] flex items-center justify-center text-[#B4763A] shrink-0 transition-all duration-300 group-hover:bg-[#1F4A3A] group-hover:border-transparent group-hover:scale-[1.06] group-hover:text-white shadow-2xs">
                {iconMap[item.icon] || (
                  <ShieldCheck className="w-5 h-5 transition-colors" />
                )}
              </div>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#B4763A] tabular-nums transition-colors duration-200 group-hover:text-[#1F4A3A]">
                {item.numeral}
              </span>
            </div>

            {/* Title in serif font, deep green */}
            <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A] transition-colors mb-2">
              {item.title}
            </h3>

            {/* Description in muted text-sm */}
            <p className="text-xs sm:text-sm text-[#5F6B64] leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}


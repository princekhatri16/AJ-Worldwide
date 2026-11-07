"use client";

import React, { useState } from "react";
import { MessageCircle, Phone, Globe } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/site";

export function FloatingActions() {
  const { isRtl, setIsLanguageModalOpen } = useLanguage();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const encodedWaMsg = encodeURIComponent(siteData.whatsappMessage);
  const waUrl = `https://wa.me/${siteData.whatsappRaw}?text=${encodedWaMsg}`;
  const phoneUrl = `tel:+${siteData.phoneRaw}`;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.aside
      aria-label="Quick Communication Actions"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`fixed bottom-6 sm:bottom-8 z-40 flex flex-col gap-3 transition-all pointer-events-auto ${
        isRtl ? "left-4 sm:left-6 items-start" : "right-4 sm:right-6 items-end"
      }`}
    >
      {/* 1. WhatsApp Action (Top) */}
      <motion.div variants={itemVariants} className="relative flex items-center">
        {hoveredButton === "wa" && (
          <span
            className={`hidden sm:inline-block absolute px-3 py-1.5 bg-[#1E2A24] text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap pointer-events-none transition-all ${
              isRtl ? "left-16" : "right-16"
            }`}
          >
            Chat on WhatsApp
          </span>
        )}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredButton("wa")}
          onMouseLeave={() => setHoveredButton(null)}
          aria-label="Enquire with AJ Worldwide on WhatsApp"
          className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-[1.08] active:scale-95 wa-pulse-ring"
        >
          <MessageCircle className="w-6 h-6 fill-white/20 text-white" />
        </a>
      </motion.div>

      {/* 2. Direct Phone Dial (Middle) */}
      <motion.div variants={itemVariants} className="relative flex items-center">
        {hoveredButton === "phone" && (
          <span
            className={`hidden sm:inline-block absolute px-3 py-1.5 bg-[#1E2A24] text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap pointer-events-none transition-all ${
              isRtl ? "left-16" : "right-16"
            }`}
          >
            Call {siteData.phone}
          </span>
        )}
        <a
          href={phoneUrl}
          onMouseEnter={() => setHoveredButton("phone")}
          onMouseLeave={() => setHoveredButton(null)}
          aria-label={`Call AJ Worldwide at ${siteData.phone}`}
          className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#1F4A3A] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-[1.08] active:scale-95 border border-white/20"
        >
          <Phone className="w-5 h-5 text-white" />
        </a>
      </motion.div>

      {/* 3. Language Selector Toggle (Bottom) */}
      <motion.div variants={itemVariants} className="relative flex items-center">
        {hoveredButton === "lang" && (
          <span
            className={`hidden sm:inline-block absolute px-3 py-1.5 bg-[#1E2A24] text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap pointer-events-none transition-all ${
              isRtl ? "left-16" : "right-16"
            }`}
          >
            Translate Website (100+ Languages)
          </span>
        )}
        <button
          type="button"
          onClick={() => setIsLanguageModalOpen(true)}
          onMouseEnter={() => setHoveredButton("lang")}
          onMouseLeave={() => setHoveredButton(null)}
          aria-label="Change language (opens language selector)"
          className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full bg-white text-[#1F4A3A] border-2 border-[#1F4A3A] flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-[1.08] active:scale-95 cursor-pointer"
        >
          <Globe className="w-5 h-5 text-[#1F4A3A]" />
        </button>
      </motion.div>
    </motion.aside>
  );
}

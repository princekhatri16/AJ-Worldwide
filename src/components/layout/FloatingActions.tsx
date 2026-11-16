"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { MessageCircle, Phone, Globe } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/site";

function subscribeDrawer(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("drawer-toggle", callback);
  return () => window.removeEventListener("drawer-toggle", callback);
}

function getDrawerSnapshot() {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.drawerOpen === "true";
}

function getDrawerServerSnapshot() {
  return false;
}

export function FloatingActions() {
  const { isRtl, isLanguageModalOpen, setIsLanguageModalOpen } = useLanguage();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const isDrawerOpen = useSyncExternalStore(
    subscribeDrawer,
    getDrawerSnapshot,
    getDrawerServerSnapshot
  );
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const encodedWaMsg = encodeURIComponent(siteData.whatsappMessage);
  const waUrl = `https://wa.me/${siteData.whatsappRaw}?text=${encodedWaMsg}`;
  const phoneUrl = `tel:+${siteData.phoneRaw}`;

  useEffect(() => {
    // Hide when on-screen keyboard is open (input / textarea / select focus on mobile)
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        setIsKeyboardOpen(true);
      }
    };

    const handleFocusOut = () => {
      setIsKeyboardOpen(false);
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);

    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  const isHidden = isDrawerOpen || isLanguageModalOpen || isKeyboardOpen;

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, pointerEvents: "none" },
    visible: {
      opacity: 1,
      scale: 1,
      pointerEvents: "auto",
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.aside
          key="floating-actions"
          aria-label="Quick Communication Actions"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
          className={`fixed bottom-[calc(16px+env(safe-area-inset-bottom))] end-3 sm:bottom-8 sm:end-6 z-40 flex flex-col gap-2.5 sm:gap-3 transition-all ${
            isRtl ? "items-start" : "items-end"
          }`}
        >
          {/* 1. WhatsApp Action (Top) */}
          <motion.div variants={itemVariants} className="relative flex items-center">
            {hoveredButton === "wa" && (
              <span
                className={`hidden sm:inline-block absolute px-3 py-1.5 bg-[#1E2A24] text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap pointer-events-none transition-all ${
                  isRtl ? "start-16" : "end-16"
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
              className="w-12 h-12 sm:w-14 sm:h-14 min-w-[48px] min-h-[48px] rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-[1.08] active:scale-95 wa-pulse-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4A3A]"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white/20 text-white" />
            </a>
          </motion.div>

          {/* 2. Direct Phone Dial (Middle) */}
          <motion.div variants={itemVariants} className="relative flex items-center">
            {hoveredButton === "phone" && (
              <span
                className={`hidden sm:inline-block absolute px-3 py-1.5 bg-[#1E2A24] text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap pointer-events-none transition-all ${
                  isRtl ? "start-16" : "end-16"
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
              className="w-12 h-12 sm:w-14 sm:h-14 min-w-[48px] min-h-[48px] rounded-full bg-[#1F4A3A] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-[1.08] active:scale-95 border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A]"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </a>
          </motion.div>

          {/* 3. Language Selector Toggle (Bottom) */}
          <motion.div variants={itemVariants} className="relative flex items-center">
            {hoveredButton === "lang" && (
              <span
                className={`hidden sm:inline-block absolute px-3 py-1.5 bg-[#1E2A24] text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap pointer-events-none transition-all ${
                  isRtl ? "start-16" : "end-16"
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
              className="w-12 h-12 sm:w-14 sm:h-14 min-w-[48px] min-h-[48px] rounded-full bg-white text-[#1F4A3A] border-2 border-[#1F4A3A] flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-[1.08] active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A]"
            >
              <Globe className="w-5 h-5 text-[#1F4A3A]" />
            </button>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { MessageCircle, Phone, Globe, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/site";

function subscribeDrawer(callback: () => void) {
  if (typeof window === "undefined") return () => { };
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
  const [isPhonePopoverOpen, setIsPhonePopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const phoneBtnRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const isDrawerOpen = useSyncExternalStore(
    subscribeDrawer,
    getDrawerSnapshot,
    getDrawerServerSnapshot
  );
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const encodedWaMsg = encodeURIComponent(siteData.whatsappMessage);
  const waUrl = `https://wa.me/${siteData.whatsappRaw}?text=${encodedWaMsg}`;

  // Handle outside click & Esc key for phone popover
  useEffect(() => {
    if (!isPhonePopoverOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        phoneBtnRef.current &&
        !phoneBtnRef.current.contains(target)
      ) {
        setIsPhonePopoverOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPhonePopoverOpen(false);
        phoneBtnRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPhonePopoverOpen]);

  // Auto focus first link when popover opens
  useEffect(() => {
    if (isPhonePopoverOpen) {
      firstLinkRef.current?.focus();
    }
  }, [isPhonePopoverOpen]);

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
  const isPhoneOpen = isPhonePopoverOpen && !isHidden;

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
          className={`fixed bottom-[calc(16px+env(safe-area-inset-bottom))] end-3 sm:bottom-8 sm:end-6 z-40 flex flex-col gap-2.5 sm:gap-3 transition-all ${isRtl ? "items-start" : "items-end"
            }`}
        >
          {/* 1. WhatsApp Action (Top) */}
          <motion.div variants={itemVariants} className="relative flex items-center">
            {hoveredButton === "wa" && (
              <span
                className={`hidden sm:inline-block absolute px-3 py-1.5 bg-[#1E2A24] text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap pointer-events-none transition-all ${isRtl ? "start-16" : "end-16"
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

          {/* 2. Phone Dial Button with Popover (Middle) */}
          <motion.div variants={itemVariants} className="relative flex items-center">
            {hoveredButton === "phone" && !isPhoneOpen && (
              <span
                className={`hidden sm:inline-block absolute px-3 py-1.5 bg-[#1E2A24] text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap pointer-events-none transition-all ${isRtl ? "start-16" : "end-16"
                  }`}
              >
                Call AJ Worldwide
              </span>
            )}
            <button
              ref={phoneBtnRef}
              type="button"
              onClick={() => setIsPhonePopoverOpen((prev) => !prev)}
              onMouseEnter={() => setHoveredButton("phone")}
              onMouseLeave={() => setHoveredButton(null)}
              aria-expanded={isPhoneOpen}
              aria-haspopup="dialog"
              aria-label="Call AJ Worldwide (choose number)"
              className={`w-12 h-12 sm:w-14 sm:h-14 min-w-[48px] min-h-[48px] rounded-full bg-[#1F4A3A] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-[1.08] active:scale-95 border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A] cursor-pointer ${isPhoneOpen ? "ring-2 ring-[#B4763A]" : ""
                }`}
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>

            {/* Desktop Popover Card (>=640px) */}
            <AnimatePresence>
              {isPhoneOpen && (
                <motion.div
                  ref={popoverRef}
                  role="dialog"
                  aria-modal="false"
                  aria-label="Call AJ Worldwide"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className={`hidden sm:block absolute bottom-full mb-3 w-72 rounded-2xl bg-white border border-[#E3DDCF] shadow-xl p-3.5 space-y-2 z-50 ${isRtl ? "start-0" : "end-0"
                    }`}
                >
                  <div className="text-[11px] uppercase font-bold tracking-wider text-[#5F6B64] px-1 pb-1.5 border-b border-[#E3DDCF]">
                    Call AJ Worldwide
                  </div>
                  <div className="space-y-1.5">
                    {siteData.phones.map((p, idx) => (
                      <a
                        key={p.tel}
                        ref={idx === 0 ? firstLinkRef : undefined}
                        href={p.tel}
                        dir="ltr"
                        translate="no"
                        onClick={() => setIsPhonePopoverOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F6F3EC] border border-transparent hover:border-[#E3DDCF] min-h-[48px] transition-colors group notranslate"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#F6F3EC] group-hover:bg-white border border-[#E3DDCF] flex items-center justify-center text-[#B4763A] shrink-0 transition-colors">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block text-[10px] uppercase tracking-wider font-bold text-[#5F6B64]">
                            {p.label}
                          </span>
                          <span
                            className="block font-mono text-xs font-bold text-[#1E2A24] group-hover:text-[#1F4A3A] transition-colors notranslate"
                            dir="ltr"
                            translate="no"
                          >
                            {p.display}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 3. Language Selector Toggle (Bottom) */}
          <motion.div variants={itemVariants} className="relative flex items-center">
            {hoveredButton === "lang" && (
              <span
                className={`hidden sm:inline-block absolute px-3 py-1.5 bg-[#1E2A24] text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap pointer-events-none transition-all ${isRtl ? "start-16" : "end-16"
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

      {/* Mobile Bottom Sheet & Backdrop (<640px) */}
      <AnimatePresence>
        {!isHidden && isPhoneOpen && (
          <div className="sm:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPhonePopoverOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Bottom Sheet */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Call AJ Worldwide"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl border-t border-[#E3DDCF] shadow-2xl p-5 space-y-3.5 pb-[calc(20px+env(safe-area-inset-bottom))]"
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-[#E3DDCF]">
                <div className="font-serif text-sm font-bold text-[#1F4A3A] tracking-wide [font-variant-caps:all-small-caps]">
                  Call AJ Worldwide
                </div>
                <button
                  type="button"
                  onClick={() => setIsPhonePopoverOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#5F6B64] hover:bg-[#F6F3EC] active:scale-95 transition-colors"
                  aria-label="Close call options"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {siteData.phones.map((p, idx) => (
                  <a
                    key={p.tel}
                    ref={idx === 0 ? firstLinkRef : undefined}
                    href={p.tel}
                    dir="ltr"
                    translate="no"
                    onClick={() => setIsPhonePopoverOpen(false)}
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-[#F6F3EC] hover:bg-[#1F4A3A]/10 active:scale-[0.98] border border-[#E3DDCF] min-h-[48px] transition-all notranslate"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white border border-[#E3DDCF] flex items-center justify-center text-[#B4763A] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[11px] uppercase tracking-wider font-bold text-[#5F6B64]">
                        {p.label}
                      </span>
                      <span
                        className="block font-mono text-sm font-bold text-[#1E2A24] notranslate"
                        dir="ltr"
                        translate="no"
                      >
                        {p.display}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}

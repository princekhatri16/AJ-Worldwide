"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  User,
  Phone,
  ArrowDown,
} from "lucide-react";
import { siteData } from "@/data/site";
import type { FaqItem } from "@/data/faq";

interface ContactFaqProps {
  items: FaqItem[];
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.031 2C6.516 2 2.02 6.496 2.02 12.012c0 1.944.557 3.765 1.527 5.317L2 22l4.825-1.517a9.96 9.96 0 005.206 1.529h.004c5.514 0 10.01-4.496 10.01-10.012A10.007 10.007 0 0012.031 2zm0 18.257c-1.677 0-3.32-.455-4.757-1.314l-.341-.204-2.868.902.919-2.793-.223-.355a8.232 8.232 0 01-1.261-4.481c0-4.554 3.705-8.259 8.263-8.259a8.21 8.21 0 015.85 2.426 8.218 8.218 0 012.42 5.845c0 4.555-3.705 8.233-8.263 8.233zm4.53-6.19c-.248-.124-1.468-.724-1.696-.807-.228-.083-.394-.124-.56.124-.166.248-.642.807-.787.973-.145.166-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.232-.738-.658-1.236-1.472-1.381-1.72-.145-.248-.016-.382.108-.505.112-.111.248-.29.372-.435.124-.145.166-.248.248-.414.083-.166.041-.31-.021-.435-.062-.124-.56-1.348-.767-1.846-.202-.486-.407-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.31-.228.248-.87.85-.87 2.073s.891 2.404 1.015 2.57c.124.166 1.752 2.674 4.244 3.75.593.256 1.056.409 1.417.524.596.19 1.138.163 1.567.099.479-.072 1.468-.6 1.675-1.18.207-.58.207-1.077.145-1.18-.062-.103-.228-.166-.476-.29z" />
    </svg>
  );
}

// Hydration-safe breakpoint listener via useSyncExternalStore: SSR outputs false, matches first render
function useIsDesktop(breakpoint = 768) {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia(`(min-width: ${breakpoint}px)`).matches,
    () => false
  );
}

// Right Pane Chat Conversation with timing sequence (slide in, typing indicator, answer bubble)
function ChatConversation({
  item,
  shouldReduceMotion,
}: {
  item: FaqItem;
  shouldReduceMotion: boolean | null;
}) {
  const [prevId, setPrevId] = useState(item.id);
  const [status, setStatus] = useState<"question" | "typing" | "answer">(
    shouldReduceMotion ? "answer" : "question"
  );

  // Synchronize state during render when active question changes
  if (prevId !== item.id) {
    setPrevId(item.id);
    setStatus(shouldReduceMotion ? "answer" : "question");
  }

  useEffect(() => {
    if (shouldReduceMotion) return;

    // After 150ms: show typing indicator
    const timer1 = setTimeout(() => {
      setStatus("typing");
    }, 150);

    // After 150ms + 400ms: reveal answer bubble
    const timer2 = setTimeout(() => {
      setStatus("answer");
    }, 550);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [item.id, shouldReduceMotion]);

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Question Bubble (End-aligned, deep green, squared corner on speaker's side) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="flex items-end gap-2.5 self-end max-w-[92%] sm:max-w-[85%]"
      >
        <div className="bg-[#1F4A3A] text-white p-3.5 sm:p-4 rounded-2xl rounded-se-xs text-sm sm:text-base font-medium leading-relaxed shadow-xs">
          {item.question}
        </div>
        <div className="w-8 h-8 rounded-full bg-[#163829] border border-[#1F4A3A] text-white/90 flex items-center justify-center shrink-0 shadow-2xs">
          <User className="w-4 h-4 text-white" />
        </div>
      </motion.div>

      {/* 2. Typing Indicator or Answer Bubble (Start-aligned, #F6F3EC, squared corner on start) */}
      {status === "typing" && (
        <div className="flex items-end gap-2.5 self-start">
          <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs border border-[#E3DDCF]">
            <Image
              src={siteData.logoMark || "/brand/logo-mark.png"}
              alt="AJ Worldwide"
              width={22}
              height={22}
              className="object-contain"
            />
          </div>
          <div className="bg-[#F6F3EC] border border-[#E3DDCF] rounded-2xl rounded-ss-xs py-3.5 px-4 shadow-xs">
            <div className="flex items-center gap-1.5 h-4">
              <span className="w-2 h-2 rounded-full bg-[#1F4A3A]/60 animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 rounded-full bg-[#1F4A3A]/60 animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-[#1F4A3A]/60 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}

      {status === "answer" && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="flex items-end gap-2.5 self-start max-w-[92%] sm:max-w-[85%]"
        >
          <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs border border-[#E3DDCF]">
            <Image
              src={siteData.logoMark || "/brand/logo-mark.png"}
              alt="AJ Worldwide"
              width={22}
              height={22}
              className="object-contain"
            />
          </div>
          <div className="bg-[#F6F3EC] border border-[#E3DDCF] text-[#1E2A24] p-3.5 sm:p-4 rounded-2xl rounded-ss-xs text-sm sm:text-base leading-relaxed shadow-xs">
            {item.answer}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function ContactFaq({ items }: ContactFaqProps) {
  const isDesktop = useIsDesktop(768);
  const shouldReduceMotion = useReducedMotion();

  // Desktop active tab index (0 to 3)
  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);

  // Mobile open state (single item open, 0 by default)
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(items[0]?.id || null);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeItem = items[activeDesktopIndex] || items[0];

  const encodedWaMsg = encodeURIComponent(siteData.whatsappMessage);
  const waUrl = `https://wa.me/${siteData.whatsappRaw}?text=${encodedWaMsg}`;

  const handleScrollToForm = () => {
    const formEl = document.getElementById("enquiry-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      const fullNameInput = document.getElementById("fullName") as HTMLInputElement | null;
      setTimeout(() => {
        fullNameInput?.focus();
      }, 500);
    }
  };

  // Keyboard navigation for desktop tabs: ArrowUp, ArrowDown, Home, End
  const handleTabKeyDown = (index: number, e: React.KeyboardEvent<HTMLButtonElement>) => {
    const total = items.length;
    let nextIndex = index;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % total;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + total) % total;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = total - 1;
    }

    if (nextIndex !== index) {
      setActiveDesktopIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const toggleMobileItem = (id: string) => {
    setMobileOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {/* DESKTOP / TABLET (≥768px): Two-Pane Question List + Answer Panel */}
      {isDesktop ? (
        <div className="bg-white rounded-3xl border border-[#E3DDCF] shadow-sm overflow-hidden flex flex-col md:flex-row items-stretch">
          {/* Left Pane (~40%, tinted #F6F3EC background, vertical divider) */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Frequently Asked Questions"
            className="w-full md:w-[42%] lg:w-[40%] bg-[#F6F3EC] border-b md:border-b-0 md:border-e border-[#E3DDCF] p-4 sm:p-6 flex flex-col gap-2 shrink-0"
          >
            {items.map((item, idx) => {
              const isActive = idx === activeDesktopIndex;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`faq-tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls={`faq-tabpanel-${item.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveDesktopIndex(idx)}
                  onKeyDown={(e) => handleTabKeyDown(idx, e)}
                  className={`relative w-full p-3.5 sm:p-4 rounded-xl text-start transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A] active:scale-[0.98] ${
                    isActive ? "" : "hover:bg-white/60"
                  }`}
                >
                  {/* Shared highlight gliding between rows */}
                  {isActive && (
                    <motion.div
                      layoutId="active-faq-highlight"
                      className="absolute inset-0 bg-white rounded-xl shadow-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* 3px copper bar on start edge */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute top-0 bottom-0 start-0 w-[3px] bg-[#B4763A] rounded-s-xl z-20 pointer-events-none"
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-3 min-w-0 ps-1">
                    {/* 32px number circle */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 tabular-nums font-mono text-xs font-bold transition-all duration-200 ${
                        isActive
                          ? "bg-[#1F4A3A] text-white shadow-xs"
                          : "bg-white border border-[#E3DDCF] text-[#B4763A] group-hover:border-[#1F4A3A]/40"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    {/* Question text */}
                    <span
                      className={`font-serif text-sm sm:text-base font-bold transition-all duration-200 line-clamp-2 ${
                        isActive
                          ? "text-[#1F4A3A]"
                          : "text-[#5F6B64] group-hover:text-[#1F4A3A] group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  {/* Chevron at end */}
                  <ChevronRight
                    className={`relative z-10 w-4 h-4 rtl-flip shrink-0 transition-transform duration-200 ${
                      isActive
                        ? "text-[#1F4A3A] translate-x-1 rtl:-translate-x-1"
                        : "text-[#5F6B64]/40 group-hover:text-[#5F6B64]"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Pane (~60%, white background, fixed min-h, action row at bottom) */}
          <div
            id={`faq-tabpanel-${activeItem.id}`}
            role="tabpanel"
            aria-labelledby={`faq-tab-${activeItem.id}`}
            aria-live="polite"
            tabIndex={0}
            className="w-full md:w-[58%] lg:w-[60%] bg-white p-5 sm:p-7 lg:p-8 flex flex-col justify-between min-h-[360px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A]"
          >
            {/* Chat Conversation Content */}
            <div className="flex-1 flex flex-col justify-start pt-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                >
                  <ChatConversation
                    item={activeItem}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Row separated by thin divider */}
            <div className="border-t border-[#E3DDCF] pt-5 mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleScrollToForm}
                  className="rounded-full bg-[#1F4A3A] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-5 hover:bg-[#163829] active:scale-[0.98] transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A]"
                >
                  <span>Send an Inquiry</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#1F4A3A] text-[#1F4A3A] hover:bg-[#1F4A3A]/5 active:scale-[0.98] text-xs font-bold uppercase tracking-wider py-2.5 px-5 transition-all inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A]"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <a
                href={`tel:+${siteData.phoneRaw}`}
                dir="ltr"
                className="font-mono text-xs sm:text-sm font-bold text-[#1E2A24] hover:text-[#1F4A3A] transition-colors inline-flex items-center gap-1.5 notranslate"
                translate="no"
              >
                <Phone className="w-3.5 h-3.5 text-[#B4763A]" />
                <span>{siteData.phone}</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* MOBILE (<768px): Single-Column Accordion with Chat Bubbles + Action Row */
        <div className="flex flex-col gap-3">
          {items.map((item, idx) => {
            const isOpen = mobileOpenId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-xl border bg-white p-4 transition-all duration-300 shadow-2xs ${
                  isOpen
                    ? "border-[#B4763A]/60 shadow-xs"
                    : "border-[#E3DDCF] hover:border-[#B4763A]/40"
                }`}
              >
                <button
                  type="button"
                  id={`faq-question-mobile-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-mobile-${item.id}`}
                  onClick={() => toggleMobileItem(item.id)}
                  className="w-full flex items-center justify-between text-start gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A] rounded-lg"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 tabular-nums font-mono text-xs font-bold transition-all duration-200 ${
                        isOpen
                          ? "bg-[#1F4A3A] text-white shadow-xs"
                          : "bg-white border border-[#E3DDCF] text-[#B4763A]"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <span className="font-serif text-sm sm:text-base font-bold text-[#1E2A24] leading-snug">
                      {item.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#1F4A3A]" : "text-[#5F6B64]"
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-mobile-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-question-mobile-${item.id}`}
                      aria-live="polite"
                      initial={
                        shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3.5 border-t border-[#E3DDCF] mt-3 flex items-end gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs border border-[#E3DDCF]">
                          <Image
                            src={siteData.logoMark || "/brand/logo-mark.png"}
                            alt="AJ Worldwide"
                            width={18}
                            height={18}
                            className="object-contain"
                          />
                        </div>
                        <div className="bg-[#F6F3EC] border border-[#E3DDCF] text-[#1E2A24] p-3 rounded-2xl rounded-ss-xs text-xs sm:text-sm leading-relaxed shadow-xs flex-1">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Action Row sits ONCE, below the list */}
          <div className="bg-white rounded-2xl border border-[#E3DDCF] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 mt-2">
            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-2.5">
              <button
                type="button"
                onClick={handleScrollToForm}
                className="w-full sm:w-auto rounded-full bg-[#1F4A3A] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-5 hover:bg-[#163829] active:scale-[0.98] transition-all inline-flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>Send an Inquiry</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-full border border-[#1F4A3A] text-[#1F4A3A] hover:bg-[#1F4A3A]/5 active:scale-[0.98] text-xs font-bold uppercase tracking-wider py-2.5 px-5 transition-all inline-flex items-center justify-center gap-1.5"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>

            <a
              href={`tel:+${siteData.phoneRaw}`}
              dir="ltr"
              className="font-mono text-xs sm:text-sm font-bold text-[#1E2A24] hover:text-[#1F4A3A] transition-colors inline-flex items-center gap-1.5 notranslate self-center pt-1 sm:pt-0"
              translate="no"
            >
              <Phone className="w-3.5 h-3.5 text-[#B4763A]" />
              <span>{siteData.phone}</span>
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
}

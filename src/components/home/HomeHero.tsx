"use client";

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { homeData } from "@/data/home";
import { heroItemVariant, heroRuleVariant } from "@/lib/motion";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

// 3 Designed Deep-Green Placeholder Slides with logo mark faintly in corner (NO text)
const PLACEHOLDER_SLIDES = [
  {
    id: "placeholder-slide-1",
    gradientClass: "bg-gradient-to-br from-[#163829] via-[#1A4232] to-[#1F4A3A]",
    accentGlow: "rgba(180, 118, 58, 0.15)",
  },
  {
    id: "placeholder-slide-2",
    gradientClass: "bg-gradient-to-tr from-[#133023] via-[#163829] to-[#1F4A3A]",
    accentGlow: "rgba(180, 118, 58, 0.12)",
  },
  {
    id: "placeholder-slide-3",
    gradientClass: "bg-gradient-to-r from-[#163829] via-[#1D4737] to-[#163829]",
    accentGlow: "rgba(180, 118, 58, 0.18)",
  },
];

export function HomeHero() {
  const { hero } = homeData;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const shouldReduceMotion = useReducedMotion();

  const hasRealImages = hero.heroImages && hero.heroImages.length > 0;
  const totalSlides = hasRealImages ? hero.heroImages.length : PLACEHOLDER_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay 5s, pause on hover/touch, disabled if prefersReducedMotion
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion, nextSlide]);

  // Touch Swipe & Drag Handling
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 40) {
      if (touchDeltaX.current < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setIsPaused(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="AJ Worldwide Hero Presentation"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative w-full overflow-hidden min-h-[560px] md:min-h-[calc(100svh-80px)] lg:min-h-[calc(100svh-96px)] max-h-[820px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A]"
    >
      {/* 1. Full-Bleed Sliding Image Slider Track */}
      <div
        className="absolute inset-0 w-full h-full flex transition-transform duration-700 ease-in-out pointer-events-none select-none"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {hasRealImages
          ? hero.heroImages.map((img, idx) => {
              const isActive = idx === currentSlide;
              return (
                <div
                  key={idx}
                  className="relative w-full h-full shrink-0 overflow-hidden"
                  aria-hidden={!isActive}
                >
                  <div
                    className={`relative w-full h-full ${
                      isActive && !prefersReducedMotion ? "ken-burns-active" : ""
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      priority={idx === 0}
                      className="object-cover"
                      style={{ objectPosition: img.position || "center" }}
                      sizes="100vw"
                    />
                  </div>
                </div>
              );
            })
          : PLACEHOLDER_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`relative w-full h-full shrink-0 overflow-hidden ${slide.gradientClass}`}
                  aria-hidden={!isActive}
                >
                  {/* Subtle Ken-Burns container for gradient surfaces */}
                  <div
                    className={`relative w-full h-full flex items-center justify-center ${
                      isActive && !prefersReducedMotion ? "ken-burns-active" : ""
                    }`}
                  >
                    {/* Faint copper glow in the background */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 65% 45%, ${slide.accentGlow}, transparent 55%)`,
                      }}
                    />

                    {/* Faint circular decorative outline */}
                    <div
                      className="absolute -right-24 -top-24 w-[500px] h-[500px] rounded-full border border-white/[0.05] pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Logo mark faintly in the corner (no text) */}
                    <div
                      className="absolute bottom-16 right-8 sm:bottom-24 sm:right-16 opacity-15 pointer-events-none"
                      aria-hidden="true"
                    >
                      <Image
                        src="/brand/logo-mark.png"
                        alt=""
                        width={180}
                        height={180}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      {/* 2. Overlays for WCAG AA Text Contrast across bright photos */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#163829]/95 via-[#163829]/80 to-[#163829]/25 pointer-events-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#163829]/75 via-transparent to-[#163829]/40 pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* 3. Hero Content Over Slider (Left-aligned, Vertically Centered) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full py-20 sm:py-24 lg:py-28 z-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-2xl sm:max-w-3xl space-y-4"
        >
          {/* Pill Badge: Import & Export • Est. 2025 */}
          <motion.div variants={heroItemVariant}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-xs text-xs uppercase tracking-[0.2em] font-semibold text-white shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B4763A]" />
              <span>Import &amp; Export &bull; Est. 2025</span>
            </div>
          </motion.div>

          {/* Main Heading: AJ Worldwide (Fluid clamp 2.5rem to 6rem, small-caps serif, white) */}
          <motion.h1
            variants={heroItemVariant}
            className="font-serif font-black text-white tracking-wide [font-variant-caps:all-small-caps] text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] notranslate"
            translate="no"
          >
            {hero.heading}
          </motion.h1>

          {/* Tagline: Trusted Worldwide */}
          <motion.p
            variants={heroItemVariant}
            className="font-serif text-white/95 tracking-wider [font-variant-caps:all-small-caps] text-xl sm:text-2xl lg:text-3xl font-bold"
          >
            {hero.tagline}
          </motion.p>

          {/* Short thick white rule beneath tagline */}
          <motion.div
            variants={heroRuleVariant}
            className="w-16 h-[3px] bg-white rounded-full my-3 origin-left"
          />

          {/* Hero Paragraph (Client text) */}
          <motion.p
            variants={heroItemVariant}
            className="text-white/90 leading-relaxed max-w-2xl text-[clamp(1rem,1.6vw,1.25rem)] font-normal pt-1 pb-4"
          >
            {hero.text}
          </motion.p>

          {/* Buttons: View Our Products (solid, light) & Send an Inquiry (outline, white) */}
          <motion.div
            variants={heroItemVariant}
            className="flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center gap-3 pt-2"
          >
            <Link
              href={hero.buttons.viewProducts.href}
              className="py-3 px-6 sm:py-3.5 sm:px-7 rounded-full bg-white hover:bg-[#F6F3EC] text-[#1F4A3A] text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 shadow-lg group [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-95"
            >
              <span>{hero.buttons.viewProducts.label}</span>
              <ArrowRight className="w-4 h-4 rtl-flip transform group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={hero.buttons.sendInquiry.href}
              className="py-3 px-6 sm:py-3.5 sm:px-7 rounded-full border border-white/80 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs transition-all inline-flex items-center justify-center gap-2 group [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-95"
            >
              <span>{hero.buttons.sendInquiry.label}</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Carousel Navigation: Prev / Next Buttons & Indicator Dots */}
      <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-8 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-xs border border-white/25 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 rtl-flip" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-xs border border-white/25 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 rtl-flip" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        role="tablist"
        aria-label="Slide selectors"
      >
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={idx === currentSlide}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentSlide
                ? "w-8 h-2 bg-[#B4763A]"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Screen Reader Live Announcement */}
      <div className="sr-only" aria-live="polite">
        Slide {currentSlide + 1} of {totalSlides}
      </div>
    </section>
  );
}

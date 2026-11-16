"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { homeData } from "@/data/home";
import { useLanguage } from "@/context/LanguageContext";

export function HomeAboutSlider() {
  const { aboutImages } = homeData;
  const { isRtl } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const hasImages = aboutImages && aboutImages.length > 0;
  const totalSlides = hasImages ? aboutImages.length : 3;

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  const nextSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay 4.5s, pause on hover/touch, respect prefers-reduced-motion
  useEffect(() => {
    if (totalSlides <= 1 || isPaused || shouldReduceMotion) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [totalSlides, isPaused, shouldReduceMotion, nextSlide]);

  // Touch handlers with touch-pan-y
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
    setIsPaused(false);
    if (Math.abs(touchDeltaX.current) > 40) {
      if (isRtl) {
        if (touchDeltaX.current < 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      } else {
        if (touchDeltaX.current < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <div
      className="relative w-full max-w-full overflow-hidden rounded-3xl border border-[#E3DDCF] bg-white shadow-md aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] isolate touch-pan-y select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Track with horizontal slide transform */}
      <div
        className="flex w-full h-full will-change-transform transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(${isRtl ? currentSlide * 100 : -currentSlide * 100}%)`,
        }}
      >
        {hasImages ? (
          aboutImages.map((img, idx) => (
            <div
              key={img.src || idx}
              className="relative flex-[0_0_100%] w-full h-full min-w-0 shrink-0 overflow-hidden"
            >
              {/* Ken-Burns gentle zoom on active slide */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : idx === currentSlide
                    ? { scale: [1, 1.05, 1] }
                    : { scale: 1 }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  quality={90}
                  style={{
                    objectPosition: img.position || "center 40%",
                  }}
                />
              </motion.div>
            </div>
          ))
        ) : (
          <div className="relative flex-[0_0_100%] w-full h-full min-w-0 shrink-0 bg-gradient-to-br from-[#F6F3EC] via-[#EFE9DF] to-[#E5DDD0] flex flex-col items-center justify-center p-8 overflow-hidden">
            {/* Soft decorative circular rings */}
            <div
              className="absolute -right-16 -top-16 w-80 h-80 rounded-full border border-[#B4763A]/20 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full border border-[#1F4A3A]/10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Central Badge Graphic */}
            <div className="relative z-10 w-24 h-24 rounded-2xl bg-white border border-[#E3DDCF] shadow-sm flex items-center justify-center">
              <Image
                src="/brand/logo-mark.png"
                alt="AJ Worldwide"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Small pagination dots inside frame at top end corner */}
      {totalSlides > 1 && (
        <div
          className="absolute top-3 inset-inline-end-3 sm:top-4 sm:inset-inline-end-4 z-20 flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/15"
          role="tablist"
          aria-label="About slide pagination"
        >
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === currentSlide}
              aria-label={`Slide ${idx + 1}`}
              onClick={() => setCurrentSlide(idx)}
              className="w-6 h-6 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "w-4 bg-[#B4763A]"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Deep-Green Caption Card Overlaid at the Bottom */}
      <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 z-20 pointer-events-none">
        <div className="rounded-2xl p-3 sm:p-4 bg-[#1F4A3A]/95 sm:bg-[#1F4A3A] border border-white/20 shadow-xl text-white flex items-center gap-3 backdrop-blur-xs w-full box-border">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#B4763A]" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-serif font-bold text-xs sm:text-sm lg:text-base tracking-wide [font-variant-caps:all-small-caps] block leading-tight text-white">
              Trusted Worldwide
            </span>
            <span className="text-[11px] sm:text-xs text-white/85 block mt-0.5 font-normal leading-snug break-words">
              Established 2025 &bull; Kumbhari, Maharashtra
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

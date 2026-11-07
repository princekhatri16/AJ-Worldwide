"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { homeData } from "@/data/home";

export function HomeAboutSlider() {
  const { aboutImages } = homeData;
  const [currentSlide, setCurrentSlide] = useState(0);

  const hasImages = aboutImages && aboutImages.length > 0;
  const totalSlides = hasImages ? aboutImages.length : 3;

  useEffect(() => {
    if (totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-[#E3DDCF] bg-white shadow-md aspect-[4/3] min-h-[360px] sm:min-h-[420px] flex items-center justify-center">
      {/* Slider Images or Designed Placeholder */}
      <div className="absolute inset-0 w-full h-full">
        {hasImages ? (
          aboutImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ${
                idx === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          ))
        ) : (
          <div className="relative w-full h-full bg-gradient-to-br from-[#F6F3EC] via-[#EFE9DF] to-[#E5DDD0] flex flex-col items-center justify-center p-8 overflow-hidden">
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
            <div className="relative z-10 w-24 h-24 rounded-2xl bg-white border border-[#E3DDCF] shadow-sm flex items-center justify-center mb-3">
              <Image
                src="/brand/logo-mark.png"
                alt="AJ Worldwide"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B4763A] relative z-10">
              Direct Export Trading
            </span>
          </div>
        )}
      </div>

      {/* Small pagination dots at the top right */}
      {totalSlides > 1 && (
        <div
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full"
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
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                idx === currentSlide
                  ? "w-4 bg-[#B4763A]"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}

      {/* Deep-Green Caption Card Overlaid at the Bottom */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20">
        <div className="rounded-2xl p-4 sm:p-5 bg-[#1F4A3A] border border-white/20 shadow-xl text-white flex items-center gap-3.5 backdrop-blur-xs">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#B4763A]" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-serif font-bold text-sm sm:text-base tracking-wide [font-variant-caps:all-small-caps] block leading-tight text-white">
              Trusted Worldwide
            </span>
            <span className="text-xs text-white/80 block mt-0.5 font-normal truncate">
              Established 2025 &bull; Kumbhari, Maharashtra
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

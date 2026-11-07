"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Layers, Apple, CircleDot, Boxes } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  gallery?: GalleryImage[];
  name: string;
  slug: string;
}

export function ProductGallery({ gallery = [], name, slug }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);

  const total = gallery.length;

  const nextImage = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevImage = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const selectImage = useCallback((index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  }, [activeIndex]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
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
        nextImage();
      } else {
        prevImage();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  // Keyboard Navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevImage();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextImage();
    }
  };

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!thumbnailsContainerRef.current) return;
    const container = thumbnailsContainerRef.current;
    const activeButton = container.children[activeIndex] as HTMLElement | undefined;
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIndex]);

  // Icon for fallback placeholder
  const renderFallbackIcon = () => {
    switch (slug) {
      case "textile":
        return <Layers className="w-10 h-10 text-[#B4763A]" />;
      case "fruit-and-vegetables":
        return <Apple className="w-10 h-10 text-[#B4763A]" />;
      case "coconut":
        return <CircleDot className="w-10 h-10 text-[#B4763A]" />;
      case "jaggery":
        return <Boxes className="w-10 h-10 text-[#B4763A]" />;
      default:
        return <Boxes className="w-10 h-10 text-[#B4763A]" />;
    }
  };

  // Case 0: Empty gallery (e.g. Textile) - Designed placeholder
  if (total === 0) {
    return (
      <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#F6F3EC] border border-[#E3DDCF] p-6 flex flex-col items-center justify-center overflow-hidden shadow-xs">
        <div className="w-20 h-20 rounded-2xl bg-white p-4 flex items-center justify-center shadow-md border border-[#E3DDCF] mb-3">
          {renderFallbackIcon()}
        </div>
        <span className="font-serif text-sm font-bold [font-variant-caps:all-small-caps] tracking-wider text-[#1F4A3A]">
          {name}
        </span>
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#B4763A] mt-1">
          Export Category
        </span>
      </div>
    );
  }


  return (
    <div
      role="region"
      aria-label={`${name} image gallery`}
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="space-y-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A] rounded-2xl"
    >
      {/* 4:3 Main Image Display */}
      <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#F6F3EC] border border-[#E3DDCF] overflow-hidden shadow-xs group">
        {gallery.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={item.src}
              className={`absolute inset-0 transition-opacity duration-250 ease-in-out ${
                isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={idx === 0}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          );
        })}

        {/* Previous / Next Arrows (Visible on hover and on keyboard focus when > 1 image) */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1E2A24] shadow-md border border-[#E3DDCF] flex items-center justify-center transition-all opacity-80 hover:opacity-100 focus:opacity-100 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 rtl-flip" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1E2A24] shadow-md border border-[#E3DDCF] flex items-center justify-center transition-all opacity-80 hover:opacity-100 focus:opacity-100 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 rtl-flip" />
            </button>
          </>
        )}

        {/* Slide Counter Indicator */}
        {total > 1 && (
          <div className="absolute bottom-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[11px] font-mono font-medium text-white select-none">
            {activeIndex + 1} / {total}
          </div>
        )}
      </div>

      {/* Thumbnail Strip (Rendered ONLY when gallery has > 1 image) */}
      {total > 1 && (
        <div
          ref={thumbnailsContainerRef}
          role="tablist"
          aria-label={`${name} thumbnails`}
          className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-0.5 scrollbar-thin scrollbar-thumb-[#E3DDCF]"
        >
          {gallery.map((item, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-label={`Thumbnail ${idx + 1}: ${item.alt}`}
                onClick={() => selectImage(idx)}
                className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A] ${
                  isSelected
                    ? "ring-2 ring-[#B4763A] border-transparent scale-102 shadow-xs opacity-100"
                    : "border-[#E3DDCF] opacity-65 hover:opacity-100 hover:border-[#1F4A3A]"
                }`}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

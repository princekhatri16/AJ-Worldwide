"use client";

import React from "react";
import { Layers, Apple, CircleDot, Boxes, Clock } from "lucide-react";
import { homeData } from "@/data/home";

export function HighlightsStrip() {
  const { highlights } = homeData;

  const itemIcons: Record<string, React.ReactNode> = {
    Textile: <Layers className="w-4 h-4 text-[#B4763A]" />,
    "Fruit & Vegetables": <Apple className="w-4 h-4 text-[#B4763A]" />,
    Coconut: <CircleDot className="w-4 h-4 text-[#B4763A]" />,
    Jaggery: <Boxes className="w-4 h-4 text-[#B4763A]" />,
    "Open 7 Days a Week": <Clock className="w-4 h-4 text-[#B4763A]" />,
  };

  return (
    <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 -mt-10 sm:-mt-12 lg:-mt-14">
      <div className="rounded-2xl border border-[#E3DDCF] bg-white shadow-lg p-3 sm:p-5">
        {/* Desktop Single Row: 5 items evenly spaced */}
        <div className="hidden lg:grid lg:grid-cols-5 divide-x divide-[#E3DDCF]">
          {highlights.map((item) => (
            <div
              key={item}
              className="flex items-center justify-center gap-2.5 px-3 py-1"
            >
              <div className="w-7 h-7 rounded-lg bg-[#F6F3EC] border border-[#E3DDCF] flex items-center justify-center shrink-0">
                {itemIcons[item] || (
                  <span className="w-2 h-2 rounded-full bg-[#B4763A]" />
                )}
              </div>
              <span className="font-serif font-bold text-xs sm:text-sm tracking-wide [font-variant-caps:all-small-caps] text-[#1E2A24] whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Tablet / Mobile: 2-Column Grid of Chips */}
        <div className="grid grid-cols-2 gap-2 lg:hidden">
          {highlights.map((item, idx) => {
            const isLast = idx === highlights.length - 1;
            return (
              <div
                key={item}
                className={`flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-[#F6F3EC] border border-[#E3DDCF] ${
                  isLast ? "col-span-2 justify-center" : ""
                }`}
              >
                <div className="w-6 h-6 rounded-md bg-white border border-[#E3DDCF] flex items-center justify-center shrink-0">
                  {itemIcons[item] || (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B4763A]" />
                  )}
                </div>
                <span className="font-serif font-bold text-xs tracking-wide [font-variant-caps:all-small-caps] text-[#1E2A24] truncate">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


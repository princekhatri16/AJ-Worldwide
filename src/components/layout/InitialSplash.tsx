"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function InitialSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      const shown = sessionStorage.getItem("aj_splash_shown");
      if (shown) {
        const hideTimer = setTimeout(() => setVisible(false), 0);
        return () => clearTimeout(hideTimer);
      }
      const timer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("aj_splash_shown", "true");
      }, 750);
      return () => clearTimeout(timer);
    } catch {
      const hideTimer = setTimeout(() => setVisible(false), 0);
      return () => clearTimeout(hideTimer);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F4A3A] transition-opacity duration-500"
    >
      <div className="flex flex-col items-center gap-3.5 animate-pulse">
        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#F6F3EC]/20 bg-[#163829] p-2 flex items-center justify-center shadow-2xl">
          <Image
            src="/logo-mark.png"
            alt="AJ Worldwide"
            width={80}
            height={80}
            priority
            className="object-contain"
          />
        </div>
        <div className="text-center">
          <h2 className="font-serif font-black text-xl text-[#F6F3EC] tracking-widest notranslate" translate="no">
            AJ WORLDWIDE
          </h2>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#B4763A]">
            TRUSTED WORLDWIDE
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { WhyChooseUsImage } from "@/data/whyChooseUs";

interface PhotoBandProps {
  photo: WhyChooseUsImage;
}

export function PhotoBand({ photo }: PhotoBandProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-5xl mx-auto">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={
          shouldReduceMotion
            ? { duration: 0.3 }
            : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
        }
        className="w-full rounded-3xl overflow-hidden border border-[#E3DDCF] bg-[#F6F3EC] shadow-sm relative aspect-[16/7] lg:aspect-[21/9] group"
      >
        {/* Transform-only subtle zoom (scale at most 1.025 on hover, no scale above 1.04) */}
        <motion.div
          whileHover={shouldReduceMotion ? undefined : { scale: 1.025 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 1024px, (min-width: 1024px) 80vw, 100vw"
            quality={90}
            priority={false}
          />
        </motion.div>

        {/* Soft light bottom gradient with NO text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#163829]/20 via-transparent to-transparent pointer-events-none"
        />
      </motion.div>
    </div>
  );
}

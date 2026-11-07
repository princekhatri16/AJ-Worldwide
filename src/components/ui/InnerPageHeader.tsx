"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  bannerBreadcrumbVariant,
  bannerHeadingVariant,
  bannerRuleVariant,
} from "@/lib/motion";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface InnerPageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export function InnerPageHeader({ title, breadcrumbs }: InnerPageHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative bg-gradient-to-r from-[#163829] via-[#1B4334] to-[#1F4A3A] text-white py-10 sm:py-14 lg:py-16 min-h-[180px] sm:min-h-[220px] lg:min-h-[260px] flex items-center overflow-hidden border-b border-[#E3DDCF]/20">
      {/* Faint circular outlines (6% opacity) as in reference */}
      <div
        className="absolute -right-16 -top-20 w-96 h-96 rounded-full border border-white/[0.06] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-32 -bottom-24 w-72 h-72 rounded-full border border-white/[0.06] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/3 -top-32 w-80 h-80 rounded-full border border-white/[0.04] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full z-10">
        {/* Breadcrumb (Home › Page) */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={shouldReduceMotion ? { opacity: 0 } : "hidden"}
          animate={shouldReduceMotion ? { opacity: 1 } : "visible"}
          variants={bannerBreadcrumbVariant}
          className="mb-3"
        >
          <ol className="flex items-center gap-1.5 text-xs text-white/70">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <li key={idx} className="flex items-center gap-1.5">
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      className={isLast ? "font-medium text-white" : ""}
                      aria-current={isLast ? "page" : undefined}
                    >
                      {crumb.label}
                    </span>
                  )}
                  {!isLast && (
                    <ChevronRight className="w-3.5 h-3.5 text-white/50 rtl-flip" />
                  )}
                </li>
              );
            })}
          </ol>
        </motion.nav>

        {/* Page h1 in white small-caps serif */}
        <motion.h1
          initial={shouldReduceMotion ? { opacity: 0 } : "hidden"}
          animate={shouldReduceMotion ? { opacity: 1 } : "visible"}
          variants={bannerHeadingVariant}
          className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider [font-variant-caps:all-small-caps] text-white"
        >
          {title}
        </motion.h1>

        {/* Short thick light rule */}
        <motion.div
          initial={shouldReduceMotion ? { scaleX: 1 } : "hidden"}
          animate={shouldReduceMotion ? { scaleX: 1 } : "visible"}
          variants={bannerRuleVariant}
          className="w-16 h-[3px] bg-[#B4763A] mt-3.5 rounded-full origin-left"
        />
      </div>
    </div>
  );
}

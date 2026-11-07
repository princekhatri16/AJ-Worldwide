"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  surface?: "white" | "warm";
  index?: number;
  href?: string;
  id?: string;
  disableHover?: boolean;
  noTopBar?: boolean;
  onClick?: () => void;
  role?: string;
  ariaLabel?: string;
}

export function Card({
  children,
  className = "",
  surface = "white",
  index = 0,
  href,
  id,
  disableHover = false,
  noTopBar = false,
  onClick,
  role,
  ariaLabel,
}: CardProps) {
  const shouldReduceMotion = useReducedMotion();

  // Surface background rule:
  // Cards on warm sections (#F7F3EC) are white (#FFFFFF).
  // Cards on white sections (#FFFFFF) are warm-tinted (#F7F3EC).
  const surfaceClasses =
    surface === "white"
      ? "bg-white border-[#E3DDCF]"
      : "bg-[#F6F3EC] border-[#E3DDCF]";

  const hoverClasses = disableHover
    ? ""
    : "site-card group cursor-pointer [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-[#B4763A]/50 [@media(hover:hover)]:hover:shadow-[0_12px_28px_-12px_rgba(30,42,36,0.18)] active:scale-[0.98]";

  const baseClasses = `relative rounded-2xl border p-4 sm:p-5 transition-all duration-300 ease-out overflow-hidden flex flex-col justify-between ${surfaceClasses} ${hoverClasses} ${className}`;

  // Framer Motion Entrance animation: fade-up 16px to 0, 0.5s, staggered by index (60-80ms)
  const motionVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 16 },
    visible: shouldReduceMotion
      ? { opacity: 1, transition: { duration: 0.3 } }
      : {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: Math.min(index * 0.07, 0.5),
            ease: "easeOut",
          },
        },
  };

  const topBar = !noTopBar && (
    <span
      aria-hidden="true"
      className="site-card-top-bar absolute top-0 left-0 right-0 h-[2px] bg-[#B4763A] scale-x-0 origin-left transition-transform duration-300 pointer-events-none rounded-t-2xl"
    />
  );

  if (href) {
    return (
      <motion.div
        variants={motionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="h-full"
      >
        <Link
          href={href}
          id={id}
          className={`${baseClasses} h-full`}
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {topBar}
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={motionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="h-full"
    >
      <div
        id={id}
        className={`${baseClasses} h-full`}
        onClick={onClick}
        role={role}
        aria-label={ariaLabel}
      >
        {topBar}
        {children}
      </div>
    </motion.div>
  );
}

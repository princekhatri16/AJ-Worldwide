"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function StatCounter({
  value,
  suffix = "",
  duration = 1.2,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || shouldReduceMotion) {
      return;
    }
    hasAnimated.current = true;
    let startTime: number | null = null;
    let animationFrameId: number;

    const startValue = 0;
    const endValue = value;
    const durationMs = duration * 1000;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      // Ease-out cubic: 1 - (1 - t)^3
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * easedProgress);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration, shouldReduceMotion]);

  return (
    <span
      ref={ref}
      className="tabular-nums font-mono font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1F4A3A] tracking-tight"
    >
      {displayValue}
      {suffix && (
        <span className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-[#B4763A] ms-1">
          {suffix}
        </span>
      )}
    </span>
  );
}


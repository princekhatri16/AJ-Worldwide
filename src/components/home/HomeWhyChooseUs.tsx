"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  Layers,
  Globe2,
  Clock,
  Phone,
  ArrowRight,
} from "lucide-react";
import { whyChooseUsData } from "@/data/whyChooseUs";
import { Card } from "@/components/ui/Card";
import { ruleDrawVariant } from "@/lib/motion";

export function HomeWhyChooseUs() {
  const { reasons, homeCollage } = whyChooseUsData;
  const shouldReduceMotion = useReducedMotion();

  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#B4763A]" />,
    Layers: <Layers className="w-5 h-5 text-[#B4763A]" />,
    Globe2: <Globe2 className="w-5 h-5 text-[#B4763A]" />,
    Clock: <Clock className="w-5 h-5 text-[#B4763A]" />,
    Phone: <Phone className="w-5 h-5 text-[#B4763A]" />,
  };

  const collageContainerVariant: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const collageItemVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.05,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      aria-labelledby="home-why-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#F6F3EC] border-b border-[#E3DDCF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* Left Column (about 42% / 5 cols): Image Collage in rounded-3xl frame */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={collageContainerVariant}
              className="rounded-3xl border border-[#E3DDCF] bg-white p-3 sm:p-4 shadow-md flex flex-col gap-3 overflow-hidden"
            >
              {/* Top Large Image (4:3 desktop, 16:10 tablet/mobile) */}
              <motion.div
                variants={collageItemVariant}
                className="relative aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-[#E3DDCF] bg-[#F6F3EC] group"
              >
                {/* Slow Ken-Burns drift 1.0 to 1.04 over 10s */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.035, 1],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 10,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                  className="relative w-full h-full [@media(hover:hover)]:group-hover:scale-104 transition-transform duration-700"
                >
                  <Image
                    src={homeCollage.main.src}
                    alt={homeCollage.main.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 22vw, 100vw"
                    quality={90}
                    priority={false}
                  />
                </motion.div>

                {/* Soft gradient overlay for caption chip contrast */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
                />

                {/* Caption Chip Overlaid at bottom start */}
                <div className="absolute bottom-3 start-3 sm:bottom-4 sm:start-4 z-10">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-[#163829]/95 backdrop-blur-xs border border-white/20 text-white px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-lg">
                    <ShieldCheck className="w-4 h-4 text-[#B4763A] shrink-0" />
                    <span className="font-serif text-xs sm:text-sm font-bold tracking-wide [font-variant-caps:all-small-caps] text-white">
                      Trusted Worldwide
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Row: Two Smaller Images Side by Side (1:1 each, gap-3) */}
              <div className="grid grid-cols-2 gap-3">
                {/* Left Small Image */}
                <motion.div
                  variants={collageItemVariant}
                  className="relative aspect-square rounded-2xl overflow-hidden border border-[#E3DDCF] bg-[#F6F3EC] group"
                >
                  <div className="relative w-full h-full [@media(hover:hover)]:group-hover:scale-106 transition-transform duration-500">
                    <Image
                      src={homeCollage.bottomLeft.src}
                      alt={homeCollage.bottomLeft.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 11vw, 50vw"
                      quality={85}
                    />
                  </div>
                </motion.div>

                {/* Right Small Image */}
                <motion.div
                  variants={collageItemVariant}
                  className="relative aspect-square rounded-2xl overflow-hidden border border-[#E3DDCF] bg-[#F6F3EC] group"
                >
                  <div className="relative w-full h-full [@media(hover:hover)]:group-hover:scale-106 transition-transform duration-500">
                    <Image
                      src={homeCollage.bottomRight.src}
                      alt={homeCollage.bottomRight.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 11vw, 50vw"
                      quality={85}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Column (about 58% / 7 cols): Heading block & 5 compact cards */}
          <div className="lg:col-span-7 w-full space-y-6">
            {/* Heading Block */}
            <div className="space-y-3">
              <span className="pill-label">Export Strengths</span>
              <h2
                id="home-why-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]"
              >
                Why Work With AJ Worldwide
              </h2>
              <motion.div
                initial={shouldReduceMotion ? { scaleX: 1 } : "hidden"}
                whileInView={shouldReduceMotion ? { scaleX: 1 } : "visible"}
                viewport={{ once: true, amount: 0.2 }}
                variants={ruleDrawVariant}
                className="section-rule"
              />
            </div>

            {/* Five Compact Cards in 2-Column Grid (Card 5 spans both columns) */}
            <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-3 sm:gap-4">
              {reasons.map((item, idx) => {
                const isLast = idx === reasons.length - 1;
                return (
                  <div
                    key={item.id}
                    className={isLast ? "min-[360px]:col-span-2" : "col-span-1"}
                  >
                    <Card
                      surface="white"
                      index={idx}
                      className="h-full flex flex-col justify-between space-y-3 p-4 sm:p-5"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="site-card-icon w-10 h-10 rounded-xl bg-[#F6F3EC] border border-[#E3DDCF] flex items-center justify-center transition-all duration-300">
                            {iconMap[item.icon] || (
                              <ShieldCheck className="w-5 h-5 text-[#B4763A]" />
                            )}
                          </div>
                          <span className="font-mono text-xs text-[#B4763A] font-bold">
                            {item.numeral}
                          </span>
                        </div>

                        <h3 className="site-card-title font-serif text-base font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A] transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#5F6B64] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>

            {/* Link to /why-choose-us */}
            <div className="pt-2">
              <Link
                href="/why-choose-us"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full border border-[#1F4A3A] text-[#1F4A3A] hover:bg-[#1F4A3A] hover:text-white text-xs font-bold uppercase tracking-wider transition-all shadow-2xs group active:scale-95"
              >
                <span>Explore Why Choose Us</span>
                <ArrowRight className="w-3.5 h-3.5 rtl-flip transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

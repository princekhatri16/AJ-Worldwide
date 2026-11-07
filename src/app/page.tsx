"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Layers,
  Apple,
  CircleDot,
  Boxes,
  ShieldCheck,
  Ship,
  Clock,
  FileCheck,
  Truck,
  Package,
} from "lucide-react";
import { aboutData } from "@/data/about";
import { productsData } from "@/data/products";
import { qualityExportProcessData } from "@/data/quality-export-process";
import { HomeHero } from "@/components/home/HomeHero";
import { HighlightsStrip } from "@/components/home/HighlightsStrip";
import { HomeAboutSlider } from "@/components/home/HomeAboutSlider";
import { HomeWhyChooseUs } from "@/components/home/HomeWhyChooseUs";
import { PreFooterCta } from "@/components/home/PreFooterCta";
import { Card } from "@/components/ui/Card";
import { cardStaggerItemVariant, ruleDrawVariant } from "@/lib/motion";

export default function HomePage() {
  const { whoWeAre } = aboutData;
  const { categories } = productsData;
  const { howAnOrderWorks } = qualityExportProcessData;
  const shouldReduceMotion = useReducedMotion();

  const categoryIcons: Record<string, React.ReactNode> = {
    textile: <Layers className="w-8 h-8 text-[#B4763A]" />,
    "fruit-and-vegetables": <Apple className="w-8 h-8 text-[#B4763A]" />,
    coconut: <CircleDot className="w-8 h-8 text-[#B4763A]" />,
    jaggery: <Boxes className="w-8 h-8 text-[#B4763A]" />,
  };

  const stepIcons = [
    <FileCheck key="1" className="w-5 h-5 text-[#B4763A]" />,
    <Clock key="2" className="w-5 h-5 text-[#B4763A]" />,
    <ShieldCheck key="3" className="w-5 h-5 text-[#B4763A]" />,
    <Package key="4" className="w-5 h-5 text-[#B4763A]" />,
    <Ship key="5" className="w-5 h-5 text-[#B4763A]" />,
    <Truck key="6" className="w-5 h-5 text-[#B4763A]" />,
  ];

  return (
    <div className="bg-white text-[#1E2A24] min-h-screen overflow-x-clip">
      {/* 1. Hero: Full-Bleed Sliding Image Carousel with Ken-Burns Zoom */}
      <HomeHero />

      {/* 2. Highlights Strip: Overlapping White Rounded Panel */}
      <HighlightsStrip />

      {/* 3. About Block (Warm Surface #F6F3EC) */}
      <section
        aria-labelledby="home-about-heading"
        className="py-16 sm:py-20 lg:py-24 bg-[#F6F3EC] border-b border-[#E3DDCF] mt-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Rounded-3xl Image Slot with Slider & Caption Card */}
            <div className="lg:col-span-6 order-1">
              <HomeAboutSlider />
            </div>

            {/* Right: Pill label, small-caps serif heading, client text, Know More button */}
            <div className="lg:col-span-6 order-2 space-y-4">
              <span className="pill-label">About AJ Worldwide</span>

              <h2
                id="home-about-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A] notranslate"
                translate="no"
              >
                Trusted Worldwide
              </h2>

              <motion.div
                initial={shouldReduceMotion ? { scaleX: 1 } : "hidden"}
                whileInView={shouldReduceMotion ? { scaleX: 1 } : "visible"}
                viewport={{ once: true, amount: 0.2 }}
                variants={ruleDrawVariant}
                className="section-rule"
              />

              <p className="text-base sm:text-lg text-[#1E2A24] leading-relaxed pt-2">
                {whoWeAre.paragraphs[0]}
              </p>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 py-3.5 px-7 rounded-full bg-[#1F4A3A] hover:bg-[#163829] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm group [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-95"
                >
                  <span>Know More</span>
                  <ArrowRight className="w-4 h-4 rtl-flip transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Products Section (White Surface #FFFFFF) */}
      <section
        aria-labelledby="home-products-heading"
        className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E3DDCF]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14 space-y-3">
            <span className="pill-label">Products</span>
            <h2
              id="home-products-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]"
            >
              Our Products
            </h2>
            <div className="section-rule mx-auto" />
          </div>

          {/* 4 Product Cards Grid: 4 cols ≥1280px, 2 cols from 640px, 2 on mobile down to 360px */}
          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <motion.div
                key={cat.slug}
                variants={cardStaggerItemVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="h-full"
              >
                <div className="site-card group h-full rounded-2xl border border-[#E3DDCF] bg-white overflow-hidden flex flex-col justify-between shadow-xs transition-all duration-300 relative [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-[#B4763A]/50 [@media(hover:hover)]:hover:shadow-[0_12px_28px_-12px_rgba(30,42,36,0.18)] active:scale-[0.98]">
                  {/* Copper Top Reveal Bar */}
                  <span
                    aria-hidden="true"
                    className="site-card-top-bar absolute top-0 left-0 right-0 h-[2px] bg-[#B4763A] scale-x-0 origin-left transition-transform duration-300 pointer-events-none rounded-t-2xl z-10"
                  />

                  <div>
                    {/* 4:3 Image Area on Top */}
                    <div className="relative w-full aspect-[4/3] bg-[#F6F3EC] border-b border-[#E3DDCF] overflow-hidden flex items-center justify-center">
                      {cat.image ? (
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          className="object-cover site-card-image transition-transform duration-500 ease-out"
                          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="site-card-image transition-transform duration-500 ease-out flex flex-col items-center justify-center p-4">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-[#E3DDCF] flex items-center justify-center shadow-2xs mb-2">
                            {categoryIcons[cat.slug] || (
                              <Boxes className="w-7 h-7 text-[#B4763A]" />
                            )}
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#B4763A]">
                            Export Quality
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 space-y-1.5">
                      <h3 className="site-card-title font-serif text-base sm:text-lg font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5F6B64] leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Full-width deep-green pill button 'View Product →' */}
                  <div className="p-4 sm:p-5 pt-0">
                    <Link
                      href={`/products/${cat.slug}`}
                      className="w-full py-2.5 sm:py-3 px-4 rounded-full bg-[#1F4A3A] hover:bg-[#163829] text-white text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 shadow-2xs group/btn [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-95"
                    >
                      <span>View Product</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl-flip site-card-arrow transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final Link: All Products */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full border border-[#1F4A3A] text-[#1F4A3A] hover:bg-[#1F4A3A] hover:text-white text-xs font-bold uppercase tracking-wider transition-all shadow-2xs"
            >
              <span>All Products</span>
              <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us: Two-column Image Collage + Strengths Cards (Warm Surface #F6F3EC) */}
      <HomeWhyChooseUs />

      {/* 6. How an Order Works (White Surface #FFFFFF) */}
      <section
        aria-labelledby="home-order-steps-heading"
        className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E3DDCF]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14 space-y-3">
            <span className="pill-label">Process</span>
            <h2
              id="home-order-steps-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]"
            >
              How an Order Works
            </h2>
            <div className="section-rule mx-auto" />
          </div>

          {/* Desktop Horizontal Stepper (6 steps) */}
          <div className="hidden lg:block relative py-6">
            <div className="grid grid-cols-6 gap-3">
              {howAnOrderWorks.steps.map((step, idx) => (
                <div key={step.step} className="relative flex flex-col items-center text-center">
                  {/* Connecting Line between step nodes */}
                  {idx < howAnOrderWorks.steps.length - 1 && (
                    <div
                      className="absolute top-5 left-1/2 w-full h-0.5 bg-[#E3DDCF] -z-0"
                      aria-hidden="true"
                    />
                  )}

                  {/* Step Node */}
                  <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-[#1F4A3A] text-[#1F4A3A] font-bold text-xs flex items-center justify-center shadow-xs transition-transform hover:scale-110 mb-3">
                    {step.step}
                  </div>

                  <h3 className="font-serif text-xs font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A] leading-snug max-w-[140px]">
                    {step.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile / Tablet Vertical Timeline */}
          <div className="lg:hidden space-y-3 max-w-xl mx-auto">
            {howAnOrderWorks.steps.map((step, idx) => (
              <Card
                key={step.step}
                surface="warm"
                index={idx}
                className="flex flex-row items-start gap-3.5 p-4"
              >
                <div className="w-8 h-8 rounded-full bg-[#1F4A3A] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {step.step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {stepIcons[idx]}
                    <h3 className="font-serif text-sm font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
                      {step.title}
                    </h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/quality-export-process"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full border border-[#1F4A3A] text-[#1F4A3A] hover:bg-[#1F4A3A] hover:text-white text-xs font-bold uppercase tracking-wider transition-all shadow-2xs"
            >
              <span>View Full Export Process</span>
              <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Pre-Footer Contained CTA Panel */}
      <PreFooterCta />
    </div>
  );
}

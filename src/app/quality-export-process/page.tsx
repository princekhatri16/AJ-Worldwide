"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, FileCheck, Truck, Package, Ship } from "lucide-react";
import { qualityExportProcessData } from "@/data/quality-export-process";
import { InnerPageHeader } from "@/components/ui/InnerPageHeader";
import { Card } from "@/components/ui/Card";

export default function QualityExportProcessPage() {
  const { qualityPacking, howAnOrderWorks } = qualityExportProcessData;
  const shouldReduceMotion = useReducedMotion();

  const stepIcons = [
    <FileCheck key="1" className="w-5 h-5 text-[#B4763A]" />,
    <Clock key="2" className="w-5 h-5 text-[#B4763A]" />,
    <ShieldCheck key="3" className="w-5 h-5 text-[#B4763A]" />,
    <Package key="4" className="w-5 h-5 text-[#B4763A]" />,
    <Ship key="5" className="w-5 h-5 text-[#B4763A]" />,
    <Truck key="6" className="w-5 h-5 text-[#B4763A]" />,
  ];

  return (
    <div className="bg-white text-[#1E2A24] min-h-screen">
      {/* 1. Deep-Green Inner-Page Banner */}
      <InnerPageHeader
        title={qualityExportProcessData.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Quality & Export Process" },
        ]}
      />

      {/* 2. Quality & Packing Section on surface-base (#FFFFFF) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E3DDCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14 space-y-3">
            <span className="pill-label">Rigorous Standards</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
              {qualityPacking.heading}
            </h2>
            <div className="section-rule mx-auto" />
          </div>

          {/* 4 Warm Cards on White Section */}
          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {qualityPacking.items.map((item, idx) => (
              <div key={idx} className="h-full">
                <Card
                  surface="warm"
                  index={idx}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="site-card-icon w-10 h-10 rounded-xl bg-white border border-[#E3DDCF] flex items-center justify-center mb-3.5 transition-all duration-300">
                      <CheckCircle2 className="w-5 h-5 text-[#B4763A]" />
                    </div>
                    <p className="site-card-title text-xs sm:text-sm text-[#1E2A24] font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How an Order Works on surface-warm (#F6F3EC) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F6F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
            <span className="pill-label">Workflow Lifecycle</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
              {howAnOrderWorks.heading}
            </h2>
            <div className="section-rule mx-auto" />
          </div>

          {/* Animated Connecting Line on desktop */}
          <div className="relative mb-6 hidden lg:block">
            <motion.div
              initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-0.5 bg-[#B4763A]/40 origin-left"
            />
          </div>

          {/* 6 Step Cards: White cards on warm section */}
          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {howAnOrderWorks.steps.map((step, idx) => (
              <div key={step.step} className="h-full">
                <Card
                  surface="white"
                  index={idx}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="font-mono text-sm font-bold text-[#B4763A]">
                        {step.numeral}
                      </span>
                      <div className="site-card-icon w-10 h-10 rounded-xl bg-[#F6F3EC] border border-[#E3DDCF] flex items-center justify-center transition-all duration-300">
                        {stepIcons[idx]}
                      </div>
                    </div>

                    <h3 className="site-card-title font-serif text-base sm:text-lg font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A] transition-colors leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  <div className="pt-3 mt-4 border-t border-[#E3DDCF] flex items-center justify-between text-xs text-[#5F6B64]">
                    <span>Step {step.step} of 6</span>
                    <span className="font-mono text-[#B4763A] font-bold">STAGE 0{step.step}</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 py-3.5 px-7 rounded-full bg-[#1F4A3A] hover:bg-[#163829] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm group [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-95"
            >
              <span>Initiate Your Inquiry</span>
              <ArrowRight className="w-4 h-4 rtl-flip transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

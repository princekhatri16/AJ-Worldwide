import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Eye, ShieldCheck, MapPin, Calendar, Briefcase } from "lucide-react";
import { aboutData } from "@/data/about";
import { InnerPageHeader } from "@/components/ui/InnerPageHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About Us | AJ Worldwide — Import & Export",
  description:
    "Learn about AJ Worldwide, established in 2025 in Kumbhari, Buldhana, Maharashtra. Trading in textiles, fresh fruit and vegetables, coconut and jaggery.",
};

export default function AboutPage() {
  const { whoWeAre, mission, vision, facts } = aboutData;

  return (
    <div className="bg-white text-[#1E2A24] min-h-screen">
      {/* 1. Deep-Green Inner-Page Banner */}
      <InnerPageHeader
        title={aboutData.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      {/* 2. Who We Are Section on surface-base (#FFFFFF) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E3DDCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Heading & Corporate Facts Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="pill-label">Heritage &amp; Foundations</span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
                  {whoWeAre.heading}
                </h2>
                <div className="section-rule" />
              </div>

              {/* Company Facts Card (Warm-tinted card on white section) */}
              <Card surface="warm" index={0} className="space-y-3.5">
                <h3 className="font-serif text-xs font-bold uppercase tracking-wider [font-variant-caps:all-small-caps] text-[#1F4A3A]">
                  Corporate Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="site-card-icon w-8 h-8 rounded-lg bg-white border border-[#E3DDCF] flex items-center justify-center shrink-0 transition-all duration-300">
                      <Calendar className="w-4 h-4 text-[#B4763A]" />
                    </div>
                    <div>
                      <span className="text-[#5F6B64] block text-[10px] uppercase font-bold tracking-wider">Established</span>
                      <strong className="text-[#1E2A24] font-semibold">{facts.established}</strong>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="site-card-icon w-8 h-8 rounded-lg bg-white border border-[#E3DDCF] flex items-center justify-center shrink-0 transition-all duration-300">
                      <Briefcase className="w-4 h-4 text-[#B4763A]" />
                    </div>
                    <div>
                      <span className="text-[#5F6B64] block text-[10px] uppercase font-bold tracking-wider">Business Type</span>
                      <strong className="text-[#1E2A24] font-semibold">{facts.businessType}</strong>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 sm:col-span-2 lg:col-span-1">
                    <div className="site-card-icon w-8 h-8 rounded-lg bg-white border border-[#E3DDCF] flex items-center justify-center shrink-0 transition-all duration-300">
                      <MapPin className="w-4 h-4 text-[#B4763A]" />
                    </div>
                    <div>
                      <span className="text-[#5F6B64] block text-[10px] uppercase font-bold tracking-wider">Location</span>
                      <strong className="text-[#1E2A24] font-semibold">{facts.location}</strong>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Narrative Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                {whoWeAre.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? "text-base sm:text-lg font-normal text-[#1E2A24] leading-relaxed border-l-2 border-[#B4763A] pl-4"
                        : "text-sm sm:text-base text-[#5F6B64] leading-relaxed"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Grounded Assurance Strip */}
              <div className="p-4 sm:p-5 bg-[#F6F3EC] border border-[#E3DDCF] rounded-2xl flex items-center gap-3.5 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#1F4A3A] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#B4763A]" />
                </div>
                <div>
                  <h4 className="font-serif text-sm sm:text-base font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
                    Origin to World
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5F6B64]">
                    Dedicated sourcing from trusted Indian farms and manufacturers for international buyers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision Dual Cards on surface-warm (#F6F3EC) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F6F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14 space-y-3">
            <span className="pill-label">Purpose &amp; Trajectory</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
              Strategic Outlook
            </h2>
            <div className="section-rule mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Mission Card: White card on warm section */}
            <div className="h-full">
              <Card surface="white" index={0} className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="site-card-icon w-10 h-10 rounded-xl bg-[#F6F3EC] border border-[#E3DDCF] flex items-center justify-center text-[#B4763A] transition-all duration-300">
                      <Compass className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#B4763A]">01</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B4763A] block mb-2">
                    {mission.label}
                  </span>
                  <p className="site-card-title font-serif text-base sm:text-lg font-semibold text-[#1E2A24] transition-colors leading-snug">
                    &ldquo;{mission.text}&rdquo;
                  </p>
                </div>
                <div className="pt-3 mt-4 border-t border-[#E3DDCF] text-[11px] text-[#5F6B64]">
                  Building trust across international borders
                </div>
              </Card>
            </div>

            {/* Vision Card: White card on warm section */}
            <div className="h-full">
              <Card surface="white" index={1} className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="site-card-icon w-10 h-10 rounded-xl bg-[#F6F3EC] border border-[#E3DDCF] flex items-center justify-center text-[#B4763A] transition-all duration-300">
                      <Eye className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#B4763A]">02</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B4763A] block mb-2">
                    {vision.label}
                  </span>
                  <p className="site-card-title font-serif text-base sm:text-lg font-semibold text-[#1E2A24] transition-colors leading-snug">
                    &ldquo;{vision.text}&rdquo;
                  </p>
                </div>
                <div className="pt-3 mt-4 border-t border-[#E3DDCF] text-[11px] text-[#5F6B64]">
                  Dependable delivery in every market served
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 py-3.5 px-7 rounded-full bg-[#1F4A3A] hover:bg-[#163829] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm group [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-95"
            >
              <span>Connect with AJ Worldwide</span>
              <ArrowRight className="w-4 h-4 rtl-flip transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

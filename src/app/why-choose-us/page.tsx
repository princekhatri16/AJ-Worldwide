import React from "react";
import type { Metadata } from "next";
import { whyChooseUsData } from "@/data/whyChooseUs";
import { InnerPageHeader } from "@/components/ui/InnerPageHeader";
import { WhyChooseUsBento } from "@/components/why-choose-us/WhyChooseUsBento";
import { StatCounter } from "@/components/ui/StatCounter";

export const metadata: Metadata = {
  title: "Why Choose Us | AJ Worldwide — Export Strengths",
  description:
    "Five reasons international buyers partner with AJ Worldwide: Trust first, four product lines, registered credentials, always open, and direct contact.",
};

export default function WhyChooseUsPage() {
  const { title, reasons, facts } = whyChooseUsData;

  return (
    <div className="bg-white text-[#1E2A24] min-h-screen">
      {/* 1. Deep-Green Inner-Page Banner */}
      <InnerPageHeader
        title={title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Why Choose Us" },
        ]}
      />

      {/* 2. Bento Grid Section on surface-base (#FFFFFF) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E3DDCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14 space-y-3">
            <span className="pill-label">Why Choose Us</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
              Export Strengths
            </h2>
            <div className="section-rule mx-auto" />
          </div>

          {/* Bento Grid */}
          <WhyChooseUsBento reasons={reasons} />
        </div>
      </section>

      {/* 3. Facts Strip on surface-warm (#F6F3EC) */}
      <section className="py-12 sm:py-16 bg-[#F6F3EC] border-b border-[#E3DDCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="bg-white border border-[#E3DDCF] rounded-2xl p-5 sm:p-6 text-center shadow-xs flex flex-col items-center justify-center"
              >
                <StatCounter value={fact.numericValue} suffix={fact.suffix} />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#5F6B64] mt-2">
                  {fact.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

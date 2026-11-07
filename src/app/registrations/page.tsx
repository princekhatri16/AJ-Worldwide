import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, Award, FileCheck2, ShieldCheck, ArrowRight } from "lucide-react";
import { registrationsData } from "@/data/registrations";
import { InnerPageHeader } from "@/components/ui/InnerPageHeader";

export const metadata: Metadata = {
  title: "Our Registrations & Compliance | AJ Worldwide",
  description:
    "Official commercial and regulatory registrations for AJ Worldwide: GST, Aadhar Udyam, IEC (Import Export Code), and FCI.",
};

const REGISTRATION_ICONS: Record<string, React.ReactNode> = {
  gst: <BadgeCheck className="w-10 h-10 text-[#B4763A]" />,
  "aadhar-udyam": <Award className="w-10 h-10 text-[#B4763A]" />,
  iec: <FileCheck2 className="w-10 h-10 text-[#B4763A]" />,
  fci: <ShieldCheck className="w-10 h-10 text-[#B4763A]" />,
};

export default function RegistrationsPage() {
  const { title, intro, items } = registrationsData;

  return (
    <div className="bg-white text-[#1E2A24] min-h-screen">
      {/* 1. Deep-Green Inner-Page Banner */}
      <InnerPageHeader
        title={title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Registrations" },
        ]}
      />

      {/* 2. Four Registrations Cards on surface-base (#FFFFFF) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E3DDCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
            <span className="pill-label">Compliance</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
              {intro}
            </h2>
            <div className="section-rule mx-auto" />
          </div>

          {/* Grid: 4 columns ≥1280px, 2 columns from 640px, 2 on mobile */}
          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {items.map((reg) => (
              <div
                key={reg.id}
                className="site-card group rounded-2xl border border-[#E3DDCF] bg-white p-4 sm:p-5 shadow-xs transition-all duration-300 relative flex flex-col justify-between [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-[#B4763A] [@media(hover:hover)]:hover:shadow-[0_12px_28px_-12px_rgba(30,42,36,0.18)] active:scale-[0.98]"
              >
                {/* Copper Top Reveal Bar */}
                <span
                  aria-hidden="true"
                  className="site-card-top-bar absolute top-0 left-0 right-0 h-[2px] bg-[#B4763A] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 pointer-events-none rounded-t-2xl z-10"
                />

                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    {/* Logo/Icon Box on Top */}
                    <div className="w-full h-24 sm:h-28 bg-white border border-[#E3DDCF] rounded-xl flex items-center justify-center p-3 overflow-hidden relative mb-4">
                      {reg.image ? (
                        <Image
                          src={reg.image}
                          alt={reg.alt || reg.name}
                          fill
                          className="object-contain p-3 site-card-image transition-transform duration-500 ease-out"
                          sizes="300px"
                        />
                      ) : (
                        <div className="site-card-icon w-12 h-12 rounded-2xl bg-white border border-[#E3DDCF] flex items-center justify-center shadow-2xs transition-all duration-300 group-hover:scale-105 group-hover:border-[#1F4A3A]">
                          {REGISTRATION_ICONS[reg.id] || (
                            <BadgeCheck className="w-7 h-7 text-[#B4763A]" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Authority in tiny tracked uppercase line (allows 2 lines, aligned with min-h) */}
                    {reg.authority && (
                      <span
                        translate="no"
                        className="notranslate text-[11px] font-bold uppercase tracking-wider text-[#5F6B64] block min-h-[2rem] leading-snug line-clamp-2 mb-1.5"
                      >
                        {reg.authority}
                      </span>
                    )}

                    {/* Title in small-caps serif deep green */}
                    <h3 className="site-card-title font-serif text-base sm:text-lg font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A] transition-colors min-h-[1.75rem] flex items-center mb-1">
                      <span translate="no" className="notranslate">
                        {reg.name}
                      </span>
                    </h3>

                    {/* Description: 2-3 lines in text-sm muted with leading-relaxed, line-clamp-3, title tooltip */}
                    {reg.description && (
                      <p
                        title={reg.description}
                        className="text-xs sm:text-sm text-[#5F6B64] leading-relaxed line-clamp-3 mt-2"
                      >
                        {reg.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 py-3.5 px-7 rounded-full bg-[#1F4A3A] hover:bg-[#163829] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm group [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-95"
            >
              <span>Enquire About Our Registrations</span>
              <ArrowRight className="w-4 h-4 rtl-flip transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

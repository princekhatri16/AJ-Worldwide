"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone, Clock } from "lucide-react";
import { siteData } from "@/data/site";

// Inline WhatsApp SVG glyph
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.031 2C6.516 2 2.02 6.496 2.02 12.012c0 1.944.557 3.765 1.527 5.317L2 22l4.825-1.517a9.96 9.96 0 005.206 1.529h.004c5.514 0 10.01-4.496 10.01-10.012A10.007 10.007 0 0012.031 2zm0 18.257c-1.677 0-3.32-.455-4.757-1.314l-.341-.204-2.868.902.919-2.793-.223-.355a8.232 8.232 0 01-1.261-4.481c0-4.554 3.705-8.259 8.263-8.259a8.21 8.21 0 015.85 2.426 8.218 8.218 0 012.42 5.845c0 4.555-3.705 8.233-8.263 8.233zm4.53-6.19c-.248-.124-1.468-.724-1.696-.807-.228-.083-.394-.124-.56.124-.166.248-.642.807-.787.973-.145.166-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.232-.738-.658-1.236-1.472-1.381-1.72-.145-.248-.016-.382.108-.505.112-.111.248-.29.372-.435.124-.145.166-.248.248-.414.083-.166.041-.31-.021-.435-.062-.124-.56-1.348-.767-1.846-.202-.486-.407-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.31-.228.248-.87.85-.87 2.073s.891 2.404 1.015 2.57c.124.166 1.752 2.674 4.244 3.75.593.256 1.056.409 1.417.524.596.19 1.138.163 1.567.099.479-.072 1.468-.6 1.675-1.18.207-.58.207-1.077.145-1.18-.062-.103-.228-.166-.476-.29z" />
    </svg>
  );
}

export function PreFooterCta() {
  const shouldReduceMotion = useReducedMotion();
  const encodedWaMsg = encodeURIComponent(siteData.whatsappMessage);
  const waUrl = `https://wa.me/${siteData.whatsappRaw}?text=${encodedWaMsg}`;

  return (
    <section
      aria-label="Call to Action"
      className="py-16 sm:py-20 lg:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
          }
          viewport={{ once: true, amount: 0.2 }}
          className="relative rounded-2xl p-6 sm:p-8 lg:p-12 border border-[#E3DDCF] border-t-2 border-t-[#B4763A] bg-gradient-to-br from-[#F6F3EC] via-[#F1ECE3] to-[#EAE3D5] shadow-xs"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Left Column: Client Tagline, Heading, Availability */}
            <div className="space-y-2.5 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#E3DDCF] bg-white text-xs font-bold uppercase tracking-[0.18em] text-[#1F4A3A]">
                {siteData.tagline}
              </span>
              <h2
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E2A24] tracking-wide [font-variant-caps:all-small-caps] notranslate"
                translate="no"
              >
                {siteData.name}
              </h2>
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs sm:text-sm text-[#5F6B64] pt-1">
                <Clock className="w-4 h-4 text-[#B4763A] shrink-0" />
                <span>Open {siteData.openDays}</span>
              </div>
            </div>

            {/* Right Column: Two Action Buttons + WhatsApp Link */}
            <div className="flex flex-col items-center md:items-end gap-3.5 shrink-0 w-full md:w-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full bg-[#1F4A3A] hover:bg-[#163829] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs text-center inline-flex items-center justify-center gap-2 group [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <span>Send an Inquiry</span>
                  <ArrowRight className="w-4 h-4 rtl-flip transform group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`tel:+${siteData.phoneRaw}`}
                  className="px-6 py-3 rounded-full border border-[#E3DDCF] bg-white hover:bg-[#F6F3EC] hover:border-[#1F4A3A] text-[#1E2A24] hover:text-[#1F4A3A] font-bold text-xs uppercase tracking-wider transition-all text-center inline-flex items-center justify-center gap-2 notranslate shadow-2xs [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-[0.98]"
                  translate="no"
                >
                  <Phone className="w-4 h-4 text-[#B4763A]" />
                  <span>Call {siteData.phone}</span>
                </a>
              </div>

              {/* WhatsApp direct text link */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F4A3A] hover:text-[#25D366] transition-colors pt-0.5"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


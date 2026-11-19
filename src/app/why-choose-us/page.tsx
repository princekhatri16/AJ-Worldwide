import React from "react";
import type { Metadata } from "next";
import { whyChooseUsData } from "@/data/whyChooseUs";
import { siteData } from "@/data/site";
import { SITE_URL, absoluteUrl } from "@/lib/siteUrl";
import { JsonLd } from "@/components/seo/JsonLd";
import { InnerPageHeader } from "@/components/ui/InnerPageHeader";
import { WhyChooseUsBento } from "@/components/why-choose-us/WhyChooseUsBento";
import { PhotoBand } from "@/components/why-choose-us/PhotoBand";
import { StatCounter } from "@/components/ui/StatCounter";

export const metadata: Metadata = {
  title: {
    absolute: whyChooseUsData.seo.title,
  },
  description: whyChooseUsData.seo.description,
  alternates: {
    canonical: "/why-choose-us",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: absoluteUrl("/why-choose-us"),
    siteName: siteData.name,
    title: whyChooseUsData.seo.title,
    description: whyChooseUsData.seo.description,
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: `${siteData.name} — ${siteData.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: whyChooseUsData.seo.title,
    description: whyChooseUsData.seo.description,
    images: [absoluteUrl("/og-image.png")],
  },
};

export default function WhyChooseUsPage() {
  const { title, reasons, facts, photoBand } = whyChooseUsData;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Why Choose Us",
        item: absoluteUrl("/why-choose-us"),
      },
    ],
  };

  return (
    <div className="bg-white text-[#1E2A24] min-h-screen">
      <JsonLd schema={breadcrumbSchema} />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="pill-label">Why Choose Us</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
              Export Strengths
            </h2>
            <div className="section-rule mx-auto" />
          </div>

          {/* Bento Grid */}
          <WhyChooseUsBento reasons={reasons} />

          {/* Full-width Photo Band */}
          <PhotoBand photo={photoBand} />
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

import type { Metadata } from "next";
import { qualityExportProcessData } from "@/data/quality-export-process";
import { siteData } from "@/data/site";
import { SITE_URL, absoluteUrl } from "@/lib/siteUrl";
import { JsonLd } from "@/components/seo/JsonLd";
import { QualityExportProcessContent } from "@/components/quality/QualityExportProcessContent";

export const metadata: Metadata = {
  title: {
    absolute: qualityExportProcessData.seo.title,
  },
  description: qualityExportProcessData.seo.description,
  alternates: {
    canonical: "/quality-export-process",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: absoluteUrl("/quality-export-process"),
    siteName: siteData.name,
    title: qualityExportProcessData.seo.title,
    description: qualityExportProcessData.seo.description,
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
    title: qualityExportProcessData.seo.title,
    description: qualityExportProcessData.seo.description,
    images: [absoluteUrl("/og-image.png")],
  },
};

export default function QualityExportProcessPage() {
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
        name: "Quality & Export Process",
        item: absoluteUrl("/quality-export-process"),
      },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <QualityExportProcessContent />
    </>
  );
}

import type { Metadata } from "next";
import { homeData } from "@/data/home";
import { siteData } from "@/data/site";
import { SITE_URL, absoluteUrl } from "@/lib/siteUrl";
import { JsonLd } from "@/components/seo/JsonLd";
import { HomeClient } from "@/components/home/HomeClient";

export const metadata: Metadata = {
  title: {
    absolute: homeData.seo.title,
  },
  description: homeData.seo.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: siteData.name,
    title: homeData.seo.title,
    description: homeData.seo.description,
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
    title: homeData.seo.title,
    description: homeData.seo.description,
    images: [absoluteUrl("/og-image.png")],
  },
};

export default function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteData.name,
    url: SITE_URL,
  };

  return (
    <>
      <JsonLd schema={websiteSchema} />
      <HomeClient />
    </>
  );
}

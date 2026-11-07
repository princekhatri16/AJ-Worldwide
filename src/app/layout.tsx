import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { siteData } from "@/data/site";
import { LanguageProvider } from "@/context/LanguageContext";
import { GoogleTranslateScript } from "@/components/layout/GoogleTranslateScript";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { LanguageModal } from "@/components/layout/LanguageModal";
import { InitialSplash } from "@/components/layout/InitialSplash";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ajworldwide.com";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteData.name} | ${siteData.tagline}`,
      template: `%s | ${siteData.name}`,
    },
    description: "From Maharashtra to the world: AJ Worldwide brings textiles, fresh fruit and vegetables, coconut and jaggery to buyers you can trust.",
    keywords: [
      "AJ Worldwide",
      "Trusted Worldwide",
      "Import & Export",
      "Kumbhari",
      "Buldhana",
      "Maharashtra",
      "India exporter",
      "Textiles export",
      "Fresh Fruit and Vegetables export",
      "Coconut export",
      "Jaggery export",
    ],
    authors: [{ name: siteData.name }],
    creator: siteData.name,
    publisher: siteData.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      title: `${siteData.name} | ${siteData.tagline}`,
      description: "From Maharashtra to the world: AJ Worldwide brings textiles, fresh fruit and vegetables, coconut and jaggery to buyers you can trust.",
      siteName: siteData.name,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${siteData.name} - ${siteData.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteData.name} | ${siteData.tagline}`,
      description: "From Maharashtra to the world: AJ Worldwide brings textiles, fresh fruit and vegetables, coconut and jaggery to buyers you can trust.",
      images: ["/og-image.png"],
    },
    icons: {
      icon: [
        { url: "/icon.png", sizes: "512x512", type: "image/png" },
        { url: "/brand/logo-mark.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ajworldwide.com";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteData.name,
    url: siteUrl,
    logo: `${siteUrl}/brand/logo-full.png`,
    description: siteData.tagline,
    telephone: siteData.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteData.address,
      addressCountry: "IN",
    },
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-[#FFFFFF] text-[#1E2A24] antialiased selection:bg-[#B4763A]/25 selection:text-[#1F4A3A] relative min-h-screen flex flex-col">
        {/* Skip to Content for Screen Readers & Keyboard Users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#1F4A3A] text-[#FAF7F2] font-bold px-4 py-2 text-xs uppercase tracking-widest shadow-xl outline-none rounded"
        >
          Skip to main content
        </a>

        <LanguageProvider>
          <InitialSplash />
          <GoogleTranslateScript />
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingActions />
          <LanguageModal />
        </LanguageProvider>
      </body>
    </html>
  );
}

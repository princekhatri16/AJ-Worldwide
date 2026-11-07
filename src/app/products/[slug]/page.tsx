import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Send,
} from "lucide-react";
import {
  productSpecsData,
  productOrder,
  ProductSlug,
} from "@/data/productSpecs";
import { productsData } from "@/data/products";
import { siteData } from "@/data/site";
import { InnerPageHeader } from "@/components/ui/InnerPageHeader";
import { ProductGallery } from "@/components/products/ProductGallery";

// Inline WhatsApp SVG glyph
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.031 2C6.516 2 2.02 6.496 2.02 12.012c0 1.944.557 3.765 1.527 5.317L2 22l4.825-1.517a9.96 9.96 0 005.206 1.529h.004c5.514 0 10.01-4.496 10.01-10.012A10.007 10.007 0 0012.031 2zm0 18.257c-1.677 0-3.32-.455-4.757-1.314l-.341-.204-2.868.902.919-2.793-.223-.355a8.232 8.232 0 01-1.261-4.481c0-4.554 3.705-8.259 8.263-8.259a8.21 8.21 0 015.85 2.426 8.218 8.218 0 012.42 5.845c0 4.555-3.705 8.233-8.263 8.233zm4.53-6.19c-.248-.124-1.468-.724-1.696-.807-.228-.083-.394-.124-.56.124-.166.248-.642.807-.787.973-.145.166-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.232-.738-.658-1.236-1.472-1.381-1.72-.145-.248-.016-.382.108-.505.112-.111.248-.29.372-.435.124-.145.166-.248.248-.414.083-.166.041-.31-.021-.435-.062-.124-.56-1.348-.767-1.846-.202-.486-.407-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.31-.228.248-.87.85-.87 2.073s.891 2.404 1.015 2.57c.124.166 1.752 2.674 4.244 3.75.593.256 1.056.409 1.417.524.596.19 1.138.163 1.567.099.479-.072 1.468-.6 1.675-1.18.207-.58.207-1.077.145-1.18-.062-.103-.228-.166-.476-.29z" />
    </svg>
  );
}

export function generateStaticParams() {
  return productOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productSpecsData[slug as ProductSlug];

  if (!product) {
    return {
      title: "Product Not Found | AJ Worldwide",
    };
  }

  return {
    title: `${product.name} | AJ Worldwide — Export Specifications`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productSpecsData[slug as ProductSlug];

  if (!product) {
    notFound();
  }

  const category = productsData.categories.find((c) => c.slug === slug);
  const gallery = category?.gallery || [];

  // Prev / Next Navigation
  const currentIndex = productOrder.indexOf(slug as ProductSlug);
  const prevSlug =
    productOrder[(currentIndex - 1 + productOrder.length) % productOrder.length];
  const nextSlug = productOrder[(currentIndex + 1) % productOrder.length];
  const prevProduct = productSpecsData[prevSlug];
  const nextProduct = productSpecsData[nextSlug];

  // Specific WhatsApp message including product name
  const waProductMessage = `Hello AJ Worldwide, I would like to enquire about ${product.name}. Please share the details and a quotation. Thank you.`;
  const waUrl = `https://wa.me/${siteData.whatsappRaw}?text=${encodeURIComponent(
    waProductMessage
  )}`;



  return (
    <div className="bg-white text-[#1E2A24] min-h-screen">
      {/* 1. Deep-Green Inner Page Banner */}
      <InnerPageHeader
        title={product.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />

      {/* 2. Overview Section: Image slot, description & action buttons on surface-base (#FFFFFF) */}
      <section className="py-12 sm:py-16 border-b border-[#E3DDCF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Visual Panel: Interactive Product Gallery */}
            <div className="lg:col-span-5 w-full">
              <ProductGallery gallery={gallery} name={product.name} slug={product.slug} />
            </div>

            {/* Content & Action Buttons */}
            <div className="lg:col-span-7 space-y-5">
              <span className="pill-label">Export Commodity</span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
                {product.name}
              </h2>

              <p className="text-base sm:text-lg text-[#5F6B64] leading-relaxed max-w-2xl">
                {product.description}
              </p>

              {/* Action Buttons: Send an Inquiry (pre-selected) + WhatsApp */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href={`/contact?product=${product.slug}`}
                  className="py-3.5 px-7 rounded-full bg-[#1F4A3A] hover:bg-[#163829] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs inline-flex items-center justify-center gap-2 [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-95"
                >
                  <span>Send an Inquiry</span>
                  <Send className="w-3.5 h-3.5 rtl-flip" />
                </Link>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-7 rounded-full border border-[#25D366] bg-white hover:bg-[#25D366] text-[#1F4A3A] hover:text-white font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-95 group"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Product Specifications Card in surface-warm (#F6F3EC) */}
      <section className="py-16 sm:py-20 bg-[#F6F3EC] border-b border-[#E3DDCF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="bg-white border border-[#E3DDCF] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs">
            {/* Header of Specs Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E3DDCF] gap-3">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
                  Product Specifications
                </h3>
                <p className="text-xs sm:text-sm text-[#5F6B64] mt-0.5">
                  Standard export parameters and specifications
                </p>
              </div>
              <span className="self-start sm:self-auto px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F6F3EC] text-[#B4763A] border border-[#E3DDCF]">
                Indicative
              </span>
            </div>

            {/* Definition Table: Two columns (label left, value right) */}
            <dl className="divide-y divide-[#E3DDCF]">
              {product.specRows.map((row) => {
                if (!row.value) return null;
                return (
                  <div
                    key={row.key}
                    className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-baseline"
                  >
                    <dt className="sm:col-span-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#5F6B64]">
                      {row.label}
                    </dt>
                    <dd className="sm:col-span-8 text-sm sm:text-base text-[#1E2A24] leading-relaxed">
                      {row.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </section>

      {/* 4. Bottom Navigation: Back to Products + Prev / Next Category */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F4A3A] hover:text-[#B4763A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl-flip" />
              <span>Back to Products</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href={`/products/${prevSlug}`}
                className="text-xs font-semibold text-[#5F6B64] hover:text-[#1F4A3A] transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl-flip" />
                <span>Prev: {prevProduct.name}</span>
              </Link>
              <span className="text-[#E3DDCF]">|</span>
              <Link
                href={`/products/${nextSlug}`}
                className="text-xs font-semibold text-[#5F6B64] hover:text-[#1F4A3A] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Next: {nextProduct.name}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

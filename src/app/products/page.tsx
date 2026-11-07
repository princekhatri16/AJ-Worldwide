import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { productsData } from "@/data/products";
import { ProductsCategoryGrid } from "@/components/products/ProductsCategoryGrid";
import { InnerPageHeader } from "@/components/ui/InnerPageHeader";

export const metadata: Metadata = {
  title: "Products | AJ Worldwide — Export Portfolio",
  description:
    "Explore AJ Worldwide's four export product lines: Textile, Fruit & Vegetables, Coconut, and Jaggery.",
};

export default function ProductsPage() {
  const { categories } = productsData;

  return (
    <div className="bg-white text-[#1E2A24] min-h-screen">
      {/* 1. Deep-Green Inner Page Banner */}
      <InnerPageHeader
        title={productsData.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
      />

      {/* 2. Four Product Category Cards on surface-base (#FFFFFF) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E3DDCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14 space-y-3">
            <span className="pill-label">Export Portfolio</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
              Export Categories
            </h2>
            <div className="section-rule mx-auto" />
          </div>

          <ProductsCategoryGrid categories={categories} />
        </div>
      </section>

      {/* 3. Sourcing & Inquiry Assurance Box on surface-warm (#F6F3EC) */}
      <section className="py-16 sm:py-20 bg-[#F6F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="bg-white border border-[#E3DDCF] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1F4A3A] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#B4763A]" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
                  Custom Order Sizes &amp; Specifications
                </h3>
                <p className="text-xs sm:text-sm text-[#5F6B64] mt-0.5">
                  Specifications, quantities and packaging are confirmed with the buyer before dispatch.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="py-3 px-6 rounded-full bg-[#1F4A3A] hover:bg-[#163829] text-white font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap inline-flex items-center gap-2 shadow-xs shrink-0 [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-95"
            >
              <span>Request Custom Quotation</span>
              <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, ArrowUp } from "lucide-react";
import { siteData } from "@/data/site";
import { productsData } from "@/data/products";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#163829] text-[#F6F3EC] border-t border-[#B4763A] pt-12 sm:pt-14 pb-28 sm:pb-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 border-b border-[#F6F3EC]/15">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-3.5">
            <Link href="/" className="inline-flex items-center group" aria-label="AJ Worldwide - Home">
              <div className="rounded-xl p-2 bg-white inline-flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                <Image
                  src={siteData.logo || "/brand/logo-full.png"}
                  alt="AJ Worldwide"
                  width={112}
                  height={52}
                  className="h-10 w-auto object-contain"
                  translate="no"
                />
              </div>
            </Link>

            <p className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#B4763A]">
              {siteData.tagline}
            </p>

            <p className="text-xs text-[#F6F3EC]/75 leading-relaxed pt-1">
              From Maharashtra to the world: AJ Worldwide brings textiles, fresh fruit and vegetables, coconut and jaggery to buyers you can trust.
            </p>
          </div>

          {/* Column 2: Quick Links to Pages (Page links only, not registrations details) */}
          <div className="space-y-3.5">
            <h3 className="font-serif text-xs font-bold uppercase tracking-widest [font-variant-caps:all-small-caps] text-[#B4763A]">
              Quick Links
            </h3>
            <ul className="space-y-1">
              {siteData.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-xs text-[#F6F3EC]/80 hover:text-white transition-colors py-1.5 inline-block"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: The 6 Product Categories */}
          <div className="space-y-3.5">
            <h3 className="font-serif text-xs font-bold uppercase tracking-widest [font-variant-caps:all-small-caps] text-[#B4763A]">
              Our Products
            </h3>
            <ul className="space-y-1">
              {productsData.categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className={`link-underline text-xs text-[#F6F3EC]/80 hover:text-white transition-colors py-1.5 inline-block ${cat.slug === "jaggery" ? "notranslate" : ""
                      }`}
                    translate={cat.slug === "jaggery" ? "no" : undefined}
                  >
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact (Phone/WhatsApp, Address, Hours - NO email) */}
          <div className="space-y-3.5">
            <h3 className="font-serif text-xs font-bold uppercase tracking-widest [font-variant-caps:all-small-caps] text-[#B4763A]">
              Contact
            </h3>

            <div className="space-y-2.5 text-xs text-[#F6F3EC]/85">
              {/* Phone / Mobile */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#B4763A] shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-1.5">
                  {siteData.phones.map((phoneItem) => (
                    <div key={phoneItem.tel}>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#F6F3EC]/60 block">
                        {phoneItem.label}
                      </span>
                      <a
                        href={phoneItem.tel}
                        dir="ltr"
                        className="hover:text-[#B4763A] font-mono transition-colors notranslate py-0.5 inline-block text-xs"
                        translate="no"
                      >
                        {phoneItem.display}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#B4763A] shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-[#F6F3EC]/75">
                  {siteData.address}
                </p>
              </div>

              {/* Availability */}
              <div className="flex items-start gap-2.5">
                <Clock className="w-3.5 h-3.5 text-[#B4763A] shrink-0 mt-0.5" />
                <p className="text-xs text-[#B4763A] font-semibold">
                  Open {siteData.openDays}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F6F3EC]/60">
          <p className="notranslate" translate="no">
            &copy; 2025 AJ Worldwide
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="inline-flex items-center gap-1.5 text-xs text-[#F6F3EC]/80 hover:text-[#B4763A] transition-colors cursor-pointer min-h-[44px] py-2 px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A] rounded"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

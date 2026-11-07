"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Shirt,
  Apple,
  Leaf,
  Wheat,
  ArrowRight,
  Phone,
  Boxes,
} from "lucide-react";
import { siteData } from "@/data/site";
import { productsData } from "@/data/products";

export function Header() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const productsButtonRef = useRef<HTMLButtonElement>(null);
  const categoryRowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const viewProductButtonRef = useRef<HTMLAnchorElement | null>(null);
  const allProductsLinkRef = useRef<HTMLAnchorElement | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Intent timers for hover open (120ms) and close (180ms)
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeCategory =
    productsData.categories[activeCategoryIndex] || productsData.categories[0];

  // Helper to render icon for a category
  const renderCategoryIcon = (slug: string, active: boolean, size = "w-5 h-5") => {
    const colorClass = active ? "text-white" : "text-[#B4763A]";
    switch (slug) {
      case "textile":
        return <Shirt className={`${size} ${colorClass}`} />;
      case "fruit-and-vegetables":
        return <Apple className={`${size} ${colorClass}`} />;
      case "coconut":
        return <Leaf className={`${size} ${colorClass}`} />;
      case "jaggery":
        return <Wheat className={`${size} ${colorClass}`} />;
      default:
        return <Boxes className={`${size} ${colorClass}`} />;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    setMobileProductsOpen(false);
  }

  // Lock body scroll and handle focus trap when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mega-menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        productsButtonRef.current &&
        !productsButtonRef.current.contains(event.target as Node)
      ) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (megaMenuOpen) {
          setMegaMenuOpen(false);
          productsButtonRef.current?.focus();
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [megaMenuOpen, mobileMenuOpen]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Hover handlers with intent delays (120ms open, 180ms close)
  const handleMouseEnterProducts = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (!megaMenuOpen && !openTimeoutRef.current) {
      openTimeoutRef.current = setTimeout(() => {
        setMegaMenuOpen(true);
        openTimeoutRef.current = null;
      }, 120);
    }
  };

  const handleMouseLeaveProducts = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (!closeTimeoutRef.current) {
      closeTimeoutRef.current = setTimeout(() => {
        setMegaMenuOpen(false);
        closeTimeoutRef.current = null;
      }, 180);
    }
  };

  const toggleMegaMenu = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMegaMenuOpen((prev) => !prev);
  };

  // Keyboard navigation for Products nav button
  const handleProductsButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      setMegaMenuOpen(true);
      setTimeout(() => {
        categoryRowRefs.current[activeCategoryIndex]?.focus();
      }, 50);
    }
  };

  // Keyboard navigation for left category items
  const handleCategoryKeyDown = (index: number, e: React.KeyboardEvent) => {
    const total = productsData.categories.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % total;
      setActiveCategoryIndex(next);
      categoryRowRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + total) % total;
      setActiveCategoryIndex(prev);
      categoryRowRefs.current[prev]?.focus();
    } else if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      viewProductButtonRef.current?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setMegaMenuOpen(false);
      productsButtonRef.current?.focus();
    }
  };

  // Keyboard navigation for "View Product" button
  const handleViewProductKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      allProductsLinkRef.current?.focus();
    } else if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      categoryRowRefs.current[activeCategoryIndex]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setMegaMenuOpen(false);
      productsButtonRef.current?.focus();
    }
  };

  // Keyboard navigation for "All Products" link
  const handleAllProductsKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      viewProductButtonRef.current?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setMegaMenuOpen(false);
      productsButtonRef.current?.focus();
    }
  };

  const isProductsActive = pathname.startsWith("/products");

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b border-[#E3DDCF] ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-22 gap-6">
          {/* Logo block on far left: full-colour brand logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A] rounded-lg group"
            aria-label="AJ Worldwide - Home"
          >
            <Image
              src={siteData.logo || "/brand/logo-full.png"}
              alt="AJ Worldwide"
              width={121}
              height={56}
              priority
              className="h-10 lg:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              translate="no"
            />
          </Link>

          {/* Inline Navigation (Shown ONLY at ≥1280px / xl in a single line, never wrapping) */}
          <nav
            aria-label="Main Navigation"
            className="hidden xl:flex items-center gap-6 2xl:gap-8 whitespace-nowrap"
          >
            {siteData.navigation.map((item) => {
              // Custom Two-Pane Category Preview Dropdown for "Products"
              if (item.href === "/products") {
                return (
                  <div
                    key={item.href}
                    onMouseEnter={handleMouseEnterProducts}
                    onMouseLeave={handleMouseLeaveProducts}
                    className="relative py-4"
                  >
                    <button
                      ref={productsButtonRef}
                      type="button"
                      onClick={toggleMegaMenu}
                      onKeyDown={handleProductsButtonKeyDown}
                      aria-haspopup="true"
                      aria-expanded={megaMenuOpen}
                      aria-controls="products-mega-menu"
                      className={`relative px-1 py-1 text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A] rounded ${isProductsActive
                          ? "text-[#1F4A3A] font-bold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-[#1F4A3A] after:rounded-full"
                          : "text-[#1E2A24]/90 hover:text-[#1F4A3A]"
                        }`}
                    >
                      <span className="font-serif [font-variant-caps:all-small-caps] tracking-wide text-[15px]">
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? "rotate-180 text-[#1F4A3A]" : "text-[#5F6B64]"
                          }`}
                      />
                    </button>

                    {/* Compact, Two-Pane Category Preview Dropdown (Desktop ≥1280px) */}
                    {megaMenuOpen && (
                      <div
                        id="products-mega-menu"
                        ref={megaMenuRef}
                        role="region"
                        aria-label="Products category preview"
                        onMouseEnter={handleMouseEnterProducts}
                        onMouseLeave={handleMouseLeaveProducts}
                        className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[min(760px,calc(100vw-48px))] z-50 animate-in fade-in zoom-in-95 duration-150"
                      >
                        {/* Rotated notch pointing to Products button */}
                        <div
                          aria-hidden="true"
                          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-t border-l border-[#E3DDCF] rotate-45 z-20 pointer-events-none"
                        />

                        {/* Floating panel container */}
                        <div className="relative bg-white rounded-2xl border border-[#E3DDCF] shadow-[0_24px_60px_-20px_rgba(22,56,41,0.28)] overflow-hidden">
                          {/* Two-Pane Body */}
                          <div className="flex flex-row">
                            {/* Left Pane (~44%, #F6F3EC) */}
                            <div className="w-[44%] shrink-0 bg-[#F6F3EC] border-r border-[#E3DDCF] p-3 flex flex-col gap-1.5">
                              {productsData.categories.map((cat, idx) => {
                                const isActive = idx === activeCategoryIndex;
                                return (
                                  <Link
                                    key={cat.slug}
                                    ref={(el) => {
                                      categoryRowRefs.current[idx] = el;
                                    }}
                                    href={`/products/${cat.slug}`}
                                    role="menuitem"
                                    tabIndex={0}
                                    onMouseEnter={() => setActiveCategoryIndex(idx)}
                                    onFocus={() => setActiveCategoryIndex(idx)}
                                    onClick={() => setMegaMenuOpen(false)}
                                    onKeyDown={(e) => handleCategoryKeyDown(idx, e)}
                                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 text-start group cursor-pointer relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A] ${isActive
                                        ? "bg-white shadow-xs"
                                        : "bg-transparent hover:bg-white/60 text-[#1E2A24]"
                                      }`}
                                  >
                                    {/* 3px copper bar on start edge when active */}
                                    <span
                                      aria-hidden="true"
                                      className={`absolute top-0 bottom-0 start-0 w-[3px] bg-[#B4763A] transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0"
                                        }`}
                                    />

                                    <div className="flex items-center gap-3 min-w-0 ps-1">
                                      <div
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${isActive
                                            ? "bg-[#1F4A3A] text-white shadow-xs"
                                            : "bg-white border border-[#E3DDCF] text-[#B4763A] group-hover:border-[#1F4A3A]/30"
                                          }`}
                                      >
                                        {renderCategoryIcon(cat.slug, isActive)}
                                      </div>
                                      <span
                                        className={`font-serif text-sm tracking-wide [font-variant-caps:all-small-caps] truncate transition-colors ${isActive
                                            ? "text-[#1F4A3A] font-bold"
                                            : "text-[#1E2A24] font-semibold group-hover:text-[#1F4A3A]"
                                          }`}
                                      >
                                        {cat.name}
                                      </span>
                                    </div>

                                    <ChevronRight
                                      className={`w-4 h-4 shrink-0 transition-transform duration-200 rtl-flip ${isActive
                                          ? "text-[#1F4A3A] translate-x-0.5"
                                          : "text-[#5F6B64]/50 group-hover:text-[#5F6B64]"
                                        }`}
                                    />
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Right Pane (~56%, white) */}
                            <div className="w-[56%] bg-white p-5 flex flex-col justify-between min-h-[300px]">
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={activeCategory.slug}
                                  initial={
                                    shouldReduceMotion
                                      ? { opacity: 1, x: 0 }
                                      : { opacity: 0, x: 8 }
                                  }
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={
                                    shouldReduceMotion
                                      ? { opacity: 0, x: 0 }
                                      : { opacity: 0, x: -8 }
                                  }
                                  transition={{ duration: 0.22, ease: "easeOut" }}
                                  className="flex flex-col h-full justify-between gap-3.5"
                                >
                                  <div className="space-y-3">
                                    {/* 16:10 aspect ratio image slot */}
                                    <div className="aspect-16/10 rounded-xl overflow-hidden relative border border-[#E3DDCF] bg-gradient-to-br from-[#1F4A3A]/10 via-[#F6F3EC] to-[#1F4A3A]/5 flex items-center justify-center">
                                      {activeCategory.image ? (
                                        <Image
                                          src={activeCategory.image}
                                          alt={activeCategory.name}
                                          fill
                                          className="object-cover"
                                        />
                                      ) : (
                                        <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
                                          <div className="w-12 h-12 rounded-xl bg-white/90 border border-[#E3DDCF] shadow-xs flex items-center justify-center text-[#1F4A3A]">
                                            {renderCategoryIcon(
                                              activeCategory.slug,
                                              false,
                                              "w-6 h-6"
                                            )}
                                          </div>
                                          <span className="font-serif text-xs font-bold [font-variant-caps:all-small-caps] tracking-wider text-[#1F4A3A]/80">
                                            {activeCategory.name}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Category name in small-caps serif */}
                                    <h4 className="font-serif text-base sm:text-lg font-bold [font-variant-caps:all-small-caps] tracking-wide text-[#1F4A3A]">
                                      {activeCategory.name}
                                    </h4>

                                    {/* Client's one-line description */}
                                    <p className="text-xs text-[#5F6B64] leading-relaxed line-clamp-2">
                                      {activeCategory.description}
                                    </p>
                                  </div>

                                  {/* Pill button: View Product → */}
                                  <div>
                                    <Link
                                      ref={viewProductButtonRef}
                                      href={`/products/${activeCategory.slug}`}
                                      onClick={() => setMegaMenuOpen(false)}
                                      onKeyDown={handleViewProductKeyDown}
                                      className="rounded-full bg-[#1F4A3A] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-5 hover:bg-[#163829] active:scale-[0.99] transition-all inline-flex items-center gap-2 shadow-xs group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A]"
                                    >
                                      <span>View Product</span>
                                      <ArrowRight className="w-3.5 h-3.5 rtl-flip transition-transform duration-200 group-hover/btn:translate-x-1" />
                                    </Link>
                                  </div>
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          </div>

                          {/* Footer Strip across bottom */}
                          <div className="border-t border-[#E3DDCF] bg-[#F6F3EC] px-5 py-3 flex items-center justify-between">
                            <span className="text-[11px] font-bold tracking-widest text-[#5F6B64] uppercase font-mono">
                              PRODUCTS
                            </span>
                            <Link
                              ref={allProductsLinkRef}
                              href="/products"
                              onClick={() => setMegaMenuOpen(false)}
                              onKeyDown={handleAllProductsKeyDown}
                              className="text-xs font-bold uppercase tracking-wider text-[#1F4A3A] hover:text-[#B4763A] inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A] rounded py-0.5 px-1 group/all"
                            >
                              <span>All Products</span>
                              <ArrowRight className="w-3.5 h-3.5 rtl-flip transition-transform duration-200 group-hover/all:translate-x-0.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-1 py-1 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A] rounded ${isActive
                      ? "text-[#1F4A3A] font-bold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-[#1F4A3A] after:rounded-full"
                      : "text-[#1E2A24]/90 hover:text-[#1F4A3A] font-medium"
                    }`}
                >
                  <span className="font-serif [font-variant-caps:all-small-caps] tracking-wide text-[15px]">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button (<1280px) */}
          <div className="xl:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="w-10 h-10 rounded-xl bg-white border border-[#E3DDCF] hover:bg-[#F6F3EC] text-[#1E2A24] flex items-center justify-center transition-colors shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-in Mobile Drawer (<1280px) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation drawer"
          className="xl:hidden fixed inset-0 z-50 flex"
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#1E2A24]/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <div
            ref={drawerRef}
            className="relative ml-auto w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#E3DDCF] z-10 animate-in slide-in-from-right duration-200"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#E3DDCF] bg-[#F6F3EC]">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center"
                aria-label="AJ Worldwide - Home"
              >
                <Image
                  src={siteData.logo || "/brand/logo-full.png"}
                  alt="AJ Worldwide"
                  width={91}
                  height={42}
                  className="h-10 w-auto object-contain"
                  translate="no"
                />
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="w-9 h-9 rounded-lg bg-white border border-[#E3DDCF] flex items-center justify-center text-[#1E2A24] hover:bg-white/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="p-4 sm:p-6 space-y-1 overflow-y-auto flex-1">
              {siteData.navigation.map((item) => {
                if (item.href === "/products") {
                  return (
                    <div
                      key={item.href}
                      className="border-b border-[#E3DDCF]/60 pb-2 mb-2"
                    >
                      <button
                        type="button"
                        onClick={() => setMobileProductsOpen((prev) => !prev)}
                        className="w-full flex items-center justify-between py-2.5 text-sm font-semibold text-[#1E2A24] hover:text-[#1F4A3A]"
                      >
                        <span className="font-serif [font-variant-caps:all-small-caps] tracking-wide text-base">
                          {item.label}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${mobileProductsOpen ? "rotate-180 text-[#1F4A3A]" : "text-[#5F6B64]"
                            }`}
                        />
                      </button>

                      {mobileProductsOpen && (
                        <div className="pl-3 pr-1 py-2 space-y-2 bg-[#F6F3EC] rounded-xl my-1 border border-[#E3DDCF]">
                          <Link
                            href="/products"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between p-2 rounded-lg text-xs font-bold uppercase tracking-wider text-[#1F4A3A]"
                          >
                            <span>All Products</span>
                            <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                          </Link>
                          {productsData.categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/products/${cat.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white text-xs font-semibold text-[#1E2A24]"
                            >
                              <div className="w-7 h-7 rounded bg-white border border-[#E3DDCF] flex items-center justify-center shrink-0">
                                {renderCategoryIcon(cat.slug, false, "w-3.5 h-3.5")}
                              </div>
                              <div>
                                <div className="text-xs font-bold text-[#1F4A3A]">
                                  {cat.name}
                                </div>
                                <div className="text-[11px] text-[#5F6B64] font-normal line-clamp-1">
                                  {cat.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2.5 text-sm font-semibold border-b border-[#E3DDCF]/40 transition-colors ${isActive ? "text-[#1F4A3A] font-bold" : "text-[#1E2A24]/90"
                      }`}
                  >
                    <span className="font-serif [font-variant-caps:all-small-caps] tracking-wide text-base">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Drawer Bottom: Direct Call Button */}
            <div className="p-4 sm:p-5 border-t border-[#E3DDCF] bg-[#F6F3EC]">
              <a
                href={`tel:+${siteData.phoneRaw}`}
                className="w-full py-3 px-4 rounded-full bg-[#1F4A3A] hover:bg-[#163829] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Call {siteData.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

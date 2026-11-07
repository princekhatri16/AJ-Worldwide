"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Search, X, Check, Globe, RotateCcw } from "lucide-react";

const POPULAR_CODES = ["en", "hi", "mr", "ar", "es", "fr", "de", "zh-CN", "ja", "ru", "pt"];

export function LanguageModal() {
  const {
    isLanguageModalOpen,
    setIsLanguageModalOpen,
    currentLanguage,
    changeLanguage,
    resetToEnglish,
    languages,
  } = useLanguage();

  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const closeModal = useCallback(() => {
    setIsLanguageModalOpen(false);
    setSearch("");
  }, [setIsLanguageModalOpen]);

  useEffect(() => {
    if (isLanguageModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLanguageModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLanguageModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLanguageModalOpen, closeModal]);

  const filteredLanguages = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return languages;
    return languages.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [search, languages]);

  const popularLanguages = useMemo(() => {
    return POPULAR_CODES
      .map((code) => languages.find((l) => l.code === code))
      .filter(Boolean);
  }, [languages]);

  if (!isLanguageModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Select website language"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-[#1E2A24]/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-white border border-[#E3DDCF] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] z-10 text-[#1E2A24]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#1F4A3A] text-white flex items-center justify-between border-b border-white/15">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#B4763A]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                Select Language
              </h3>
              <p className="text-xs text-white/75">
                100+ global languages supported
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentLanguage !== "en" && (
              <button
                type="button"
                onClick={resetToEnglish}
                className="px-2.5 py-1 text-xs rounded bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-white/15"
              >
                <RotateCcw className="w-3 h-3 text-[#B4763A]" />
                <span>English</span>
              </button>
            )}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close language selector"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-3.5 bg-[#F6F3EC] border-b border-[#E3DDCF]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#5F6B64] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by language name, native script, or code..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#E3DDCF] rounded-xl text-sm text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:outline-none focus:ring-2 focus:ring-[#B4763A]/25 focus:border-[#B4763A] transition-all"
            />
          </div>
        </div>

        {/* Quick Select Popular Languages */}
        {!search && (
          <div className="px-4 py-3 bg-white border-b border-[#E3DDCF]/60">
            <p className="text-[11px] uppercase font-bold tracking-wider text-[#5F6B64] mb-2">
              Common Languages
            </p>
            <div className="flex flex-wrap gap-1.5">
              {popularLanguages.map((lang) => {
                if (!lang) return null;
                const isSelected = currentLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => changeLanguage(lang.code)}
                    className={`px-2.5 py-1 text-xs rounded-full border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#1F4A3A] text-white border-[#1F4A3A] font-semibold"
                        : "bg-[#F6F3EC] text-[#1E2A24] border-[#E3DDCF] hover:border-[#B4763A]"
                    }`}
                  >
                    <span className="notranslate" translate="no">
                      {lang.nativeName}
                    </span>
                    <span className="text-[10px] opacity-75 ml-1">({lang.name})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Language Grid */}
        <div className="p-4 overflow-y-auto flex-1 divide-y divide-[#E3DDCF]/40">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
            {filteredLanguages.map((lang) => {
              const isSelected = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full p-2.5 rounded-xl text-start flex items-center justify-between border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#1F4A3A] text-white border-[#1F4A3A] shadow-xs"
                      : "bg-white hover:bg-[#F6F3EC] border-transparent hover:border-[#E3DDCF] text-[#1E2A24]"
                  }`}
                >
                  <div className="truncate pr-2">
                    <div
                      className={`font-semibold text-xs sm:text-sm truncate notranslate ${
                        isSelected ? "text-[#B4763A]" : "text-[#1E2A24]"
                      }`}
                      translate="no"
                    >
                      {lang.nativeName}
                    </div>
                    <div
                      className={`text-[11px] truncate ${
                        isSelected ? "text-white/80" : "text-[#5F6B64]"
                      }`}
                    >
                      {lang.name}
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[#B4763A] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {filteredLanguages.length === 0 && (
            <div className="text-center py-10 text-[#5F6B64] text-xs sm:text-sm">
              No language found matching &ldquo;{search}&rdquo;
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F6F3EC] border-t border-[#E3DDCF] flex items-center justify-between text-xs text-[#5F6B64]">
          <span>Brand name &amp; telephone numbers stay original</span>
          <span className="font-mono text-[11px]">
            {filteredLanguages.length} Languages
          </span>
        </div>
      </div>
    </div>
  );
}

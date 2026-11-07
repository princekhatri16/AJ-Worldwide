"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { languagesData, LanguageItem } from "@/data/languages";

interface LanguageContextType {
  currentLanguage: string;
  isRtl: boolean;
  changeLanguage: (code: string) => void;
  resetToEnglish: () => void;
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  languages: LanguageItem[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// DOM Patch to prevent React 19 / Google Translate DOM mutation crash
if (typeof window !== "undefined") {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      if (child.parentNode) {
        return child.parentNode.removeChild(child) as T;
      }
      return child;
    }
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(
    newNode: T,
    referenceNode: Node | null
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (referenceNode.parentNode) {
        return referenceNode.parentNode.insertBefore(newNode, referenceNode) as T;
      }
      return this.appendChild(newNode) as T;
    }
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const [isRtl, setIsRtl] = useState<boolean>(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);

  // Apply RTL and Google Translate Cookie
  const applyLanguageSettings = useCallback((code: string) => {
    const langObj = languagesData.find((l) => l.code === code) || languagesData[0];
    const isRightToLeft = langObj.dir === "rtl";

    setIsRtl(isRightToLeft);
    if (typeof document !== "undefined") {
      document.documentElement.lang = code;
      document.documentElement.dir = isRightToLeft ? "rtl" : "ltr";

      // Set Google Translate cookie
      const cookieValue = code === "en" ? "/en/en" : `/en/${code}`;
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);

      document.cookie = `googtrans=${cookieValue}; path=/; expires=${expires.toUTCString()};`;
      if (window.location.hostname) {
        document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}; expires=${expires.toUTCString()};`;
      }
    }
  }, []);

  const changeLanguage = useCallback(
    (code: string) => {
      setCurrentLanguage(code);
      try {
        localStorage.setItem("aj_selected_lang", code);
      } catch {
        // Ignore
      }
      applyLanguageSettings(code);

      // Trigger translate dropdown if available
      try {
        const selectElem = document.querySelector<HTMLSelectElement>(".goog-te-combo");
        if (selectElem) {
          selectElem.value = code;
          selectElem.dispatchEvent(new Event("change"));
        } else {
          // If translation script was not active, trigger reload
          window.location.reload();
        }
      } catch {
        window.location.reload();
      }

      setIsLanguageModalOpen(false);
    },
    [applyLanguageSettings]
  );

  const resetToEnglish = useCallback(() => {
    changeLanguage("en");
  }, [changeLanguage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem("aj_selected_lang") || "en";
        if (saved !== "en") {
          setCurrentLanguage(saved);
          applyLanguageSettings(saved);
        }
      } catch {
        // Ignore
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [applyLanguageSettings]);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        isRtl,
        changeLanguage,
        resetToEnglish,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        languages: languagesData,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

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

function resetGoogleTranslateOffset() {
  if (typeof document === "undefined") return;
  if (document.body) {
    if (document.body.style.top && document.body.style.top !== "0px") {
      document.body.style.top = "0px";
    }
    if (document.body.style.marginTop && document.body.style.marginTop !== "0px") {
      document.body.style.marginTop = "0px";
    }
    if (document.body.style.position !== "static") {
      document.body.style.position = "static";
    }
  }
  if (document.documentElement) {
    if (document.documentElement.style.top && document.documentElement.style.top !== "0px") {
      document.documentElement.style.top = "0px";
    }
    if (document.documentElement.style.marginTop && document.documentElement.style.marginTop !== "0px") {
      document.documentElement.style.marginTop = "0px";
    }
  }
  // Remove any injected skiptranslate banner frame
  const banners = document.querySelectorAll(
    "iframe.goog-te-banner-frame, .goog-te-banner-frame, .skiptranslate > iframe"
  );
  banners.forEach((b) => {
    b.remove();
  });
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const [isRtl, setIsRtl] = useState<boolean>(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);

  // Observer to permanently eliminate Google Translate top banner & 40px push
  useEffect(() => {
    resetGoogleTranslateOffset();

    const observer = new MutationObserver(() => {
      resetGoogleTranslateOffset();
    });

    if (document.documentElement) {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }

    if (document.body) {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["style", "class"],
        childList: true,
      });
    }

    window.addEventListener("load", resetGoogleTranslateOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", resetGoogleTranslateOffset);
    };
  }, []);

  // Apply RTL and Google Translate Cookie
  const applyLanguageSettings = useCallback((code: string) => {
    const langObj = languagesData.find((l) => l.code === code) || languagesData[0];
    const isRightToLeft = langObj.dir === "rtl";

    setIsRtl(isRightToLeft);
    if (typeof document !== "undefined") {
      document.documentElement.lang = code;
      document.documentElement.dir = isRightToLeft ? "rtl" : "ltr";

      if (code === "en") {
        // Reset cookie cleanly
        document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        if (window.location.hostname) {
          document.cookie = `googtrans=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
        }
      } else {
        const cookieValue = `/en/${code}`;
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);

        document.cookie = `googtrans=${cookieValue}; path=/; expires=${expires.toUTCString()};`;
        if (window.location.hostname) {
          document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}; expires=${expires.toUTCString()};`;
        }
      }

      resetGoogleTranslateOffset();
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

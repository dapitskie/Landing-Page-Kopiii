"use client";

import { createContext, useContext, useState } from "react";
import type { Lang } from "@/data/i18n";

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "id",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "id";
    try {
      const saved = window.localStorage.getItem("dadwish-lang");
      return saved === "en" ? "en" : "id";
    } catch {
      return "id";
    }
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("dadwish-lang", l);
    } catch {}
    document.documentElement.lang = l === "id" ? "id" : "en";
  };

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  return useContext(LangCtx);
}

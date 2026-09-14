"use client";

import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore } from "react";
import type { Lang } from "@/data/i18n";

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "id",
  setLang: () => {},
});

function readSavedLang(): Lang {
  try {
    return window.localStorage.getItem("dadwish-lang") === "en" ? "en" : "id";
  } catch {
    return "id";
  }
}

function subscribeLang(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

const getServerLang = (): Lang => "id";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Hydration-safe: server + render pertama client selalu "id".
  // Preferensi tersimpan dibaca sebagai snapshot setelah hydration (tanpa error).
  const saved = useSyncExternalStore(subscribeLang, readSavedLang, getServerLang);
  const [override, setOverride] = useState<Lang | null>(null);
  const lang = override ?? saved;

  const setLang = useCallback((l: Lang) => {
    setOverride(l);
    try {
      localStorage.setItem("dadwish-lang", l);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "id" ? "id" : "en";
  }, [lang]);

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  return useContext(LangCtx);
}

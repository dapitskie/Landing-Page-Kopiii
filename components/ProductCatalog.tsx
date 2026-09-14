"use client";

import { ArrowUpRight, BookOpen, Coffee, MessageCircle } from "lucide-react";
import type { CatalogContent } from "@/lib/cms";
import { defaultContent } from "@/lib/cms-defaults";
import { useLang } from "./LanguageProvider";
import { waLink } from "@/lib/wa";
import Reveal from "./Reveal";

const DEFAULTS = defaultContent();

export default function ProductCatalog({
  catalog = DEFAULTS.catalog,
  whatsapp = DEFAULTS.settings.whatsapp,
}: {
  catalog?: CatalogContent;
  whatsapp?: string;
}) {
  const { lang } = useLang();
  const t = catalog;
  const href = t.ctaLink.trim() || waLink(
    lang === "en"
      ? "Hello Dadwish! I'd like to see this week's fresh roast catalogue."
      : "Halo Dadwish! Saya mau lihat katalog fresh roast minggu ini.",
    whatsapp
  );

  return (
    <section id="katalog" className="scroll-mt-20 w-full max-w-full overflow-hidden bg-[#F5F3F0]/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border-[3px] border-[#1A1412] bg-[#1A1412] px-6 py-10 text-white shadow-brutal-amber sm:px-10 sm:py-14">
            <div className="paper-dots absolute inset-0 opacity-20" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#9E1B1B]/30 blur-3xl" />

            <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="inline-block -rotate-1 rounded-lg border-2 border-[#1A1412] bg-[#D97706] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
                  {t.eyebrow[lang]}
                </p>
                <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                  <span className="marker-cream px-1">{t.title[lang]}</span>
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/75">{t.sub[lang]}</p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#FBF9F6]/70 bg-white/10 px-3 py-1.5 text-[11px] font-bold">
                    <Coffee className="h-3.5 w-3.5 text-[#e79b2d]" />
                    {lang === "en" ? "Roast date on pack" : "Roast date di kemasan"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#FBF9F6]/70 bg-white/10 px-3 py-1.5 text-[11px] font-bold">
                    <BookOpen className="h-3.5 w-3.5 text-[#e79b2d]" />
                    {lang === "en" ? "Body & acidity profile" : "Profil body & acidity"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#FBF9F6]/70 bg-white/10 px-3 py-1.5 text-[11px] font-bold">
                    <MessageCircle className="h-3.5 w-3.5 text-[#e79b2d]" />
                    {lang === "en" ? "Grind options" : "Opsi gilingan"}
                  </span>
                </div>
              </div>

              <div className="w-full max-w-xs shrink-0">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-[#FBF9F6] bg-[#9E1B1B] px-6 py-4 text-sm font-bold text-white shadow-brutal-cream hover:bg-[#7f1616]"
                >
                  {t.ctaLabel[lang]} <ArrowUpRight className="h-4 w-4" />
                </a>
                <p className="mt-3 text-center text-xs font-semibold leading-relaxed text-white/55">{t.note[lang]}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

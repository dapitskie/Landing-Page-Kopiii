"use client";

import { useState } from "react";
import { Plus, MessageCircle } from "lucide-react";
import { useLang } from "./LanguageProvider";
import type { FaqContent } from "@/lib/cms";
import { defaultContent } from "@/lib/cms-defaults";
import { waLink } from "@/lib/wa";
import Reveal from "./Reveal";

const DEFAULTS = defaultContent();

export default function Faq({
  faq = DEFAULTS.faq,
  whatsapp = DEFAULTS.settings.whatsapp,
}: {
  faq?: FaqContent;
  whatsapp?: string;
}) {
  const { lang } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 w-full max-w-full overflow-hidden py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9E1B1B]">FAQ</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {faq.title[lang]}
          </h2>
          <p className="mt-3 text-[15px] text-[#4a3f3a]">{faq.desc[lang]}</p>
          <a
            href={waLink(lang === "en" ? "Hello Dadwish! I have a question about your beans." : "Halo Dadwish! Saya ada pertanyaan soal beans.", whatsapp)}
            target="_blank"
            rel="noreferrer"
            className="btn-press mt-5 inline-flex items-center gap-2 rounded-full border-2 border-[#1A1412] bg-[#9E1B1B] px-5 py-3 text-sm font-bold text-white shadow-brutal-sm hover:bg-[#7f1616]"
          >
            <MessageCircle className="h-4 w-4" /> {lang === "en" ? "Ask barista" : "Tanya barista"}
          </a>
        </Reveal>
        <div className="space-y-3">
          {faq.items.map((f, i) => {
            const open = openIdx === i;
            return (
              <Reveal key={f.qId + i} delay={Math.min(i, 5) * 60}>
                <div
                  className={`overflow-hidden rounded-xl border-2 border-[#1A1412] bg-white transition ${
                    open ? "shadow-brutal" : "shadow-brutal-sm"
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className={`flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors ${
                      open ? "bg-[#D97706]/15" : ""
                    }`}
                    aria-expanded={open}
                  >
                    <span className="text-[15px] font-bold">{lang === "en" ? f.qEn : f.qId}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-[#1A1412] transition ${
                        open ? "bg-[#9E1B1B] text-white" : "bg-[#FBF9F6] text-[#1A1412]"
                      }`}
                    >
                      <Plus className={`h-4 w-4 transition-transform ${open ? "rotate-45" : ""}`} />
                    </span>
                  </button>
                  {open && (
                    <p className="faq-open px-5 pb-5 text-sm leading-relaxed text-[#4a3f3a]">
                      {lang === "en" ? f.aEn : f.aId}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

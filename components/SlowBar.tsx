"use client";

import { useEffect, useState } from "react";
import { Wifi, Plug, Snowflake, Cigarette, Clock, CupSoda } from "lucide-react";
import { useLang } from "./LanguageProvider";
import type { SlowBarContent } from "@/lib/cms";
import { defaultContent } from "@/lib/cms-defaults";
import { useParallax } from "./motion";
import { getOpenStatus, rupiah } from "@/lib/format";
import Reveal from "./Reveal";

const ICONS = [Wifi, Plug, Snowflake, Cigarette, Clock, CupSoda];

export default function SlowBar({ slowbar = defaultContent().slowbar }: { slowbar?: SlowBarContent }) {
  const { lang } = useLang();
  const [status, setStatus] = useState(() => getOpenStatus());
  const quote = useParallax<HTMLDivElement>(0.06);
  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="slowbar" className="scroll-mt-20 w-full max-w-full overflow-hidden border-y-[3px] border-[#1A1412] bg-[#1A1412] py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e79b2d]">
              Slow Bar · Signature Menu · WFC
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              {slowbar.title[lang]}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <span
              className={`inline-flex items-center gap-2 rounded-full border-2 border-[#FBF9F6] px-4 py-2 text-[13px] font-bold ${
                status.open ? "bg-green-500/20 text-green-300" : "bg-[#9E1B1B] text-white"
              }`}
            >
              <span className={`live-dot h-2 w-2 rounded-full ${status.open ? "bg-green-400" : "bg-white"}`} />
              {lang === "en"
                ? status.open
                  ? `Open now · closes ${status.closesAt} WIB`
                  : "Closed · opens 09.00 WIB (closed Sun)"
                : status.open
                  ? `Buka sekarang · tutup ${status.closesAt} WIB`
                  : "Tutup · buka 09.00 WIB (Minggu tutup)"}
            </span>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border-[3px] border-[#FBF9F6] bg-white/[0.04] shadow-brutal-amber">
              {slowbar.menu.map((m, i) => (
                <div
                  key={m.name + i}
                  className={`flex items-center gap-4 px-5 py-4 ${i !== 0 ? "border-t-2 border-[#FBF9F6]/20" : ""}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-2 font-bold">
                      {m.name}
                      {m.tag && (
                        <span className="rounded-md border border-[#e79b2d] bg-[#D97706]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#e79b2d]">
                          {m.tag}
                        </span>
                      )}
                    </p>
                    <p className="truncate text-[13px] text-white/60">{m.desc}</p>
                  </div>
                  <p className="shrink-0 rounded-lg border-2 border-[#1A1412] bg-[#D97706] px-2.5 py-1 font-serif text-base font-bold text-white sm:text-lg">
                    {rupiah(m.price)}
                  </p>
                </div>
              ))}
              <p className="border-t-2 border-[#FBF9F6]/20 px-5 py-3 text-xs font-semibold text-white/50">{slowbar.menuNote[lang]}</p>
            </div>
          </Reveal>
          <div className="grid content-start gap-3 sm:grid-cols-2">
            {slowbar.amenities.map((a, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Reveal key={a.id + i} delay={i * 70}>
                  <div className="flex items-center gap-3 rounded-xl border-2 border-[#FBF9F6]/60 bg-white/[0.05] p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border-2 border-[#1A1412] bg-[#9E1B1B] text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-bold leading-snug">{a[lang]}</p>
                  </div>
                </Reveal>
              );
            })}
            <Reveal delay={420} variant="scale" className="sm:col-span-2">
              <div ref={quote} className="parallax rounded-2xl border-[3px] border-[#1A1412] bg-[#D97706] p-5 text-white shadow-brutal-cream">
                <p className="font-serif text-lg font-bold leading-snug">{slowbar.quote[lang]}</p>
                <p className="mt-1 text-[13px] font-semibold text-white/80">{slowbar.quoteBy[lang]}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

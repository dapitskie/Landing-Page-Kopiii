"use client";

import { Cherry, Flame, Hourglass, Coffee, MoveRight } from "lucide-react";
import { useLang } from "./LanguageProvider";
import type { ProcessContent } from "@/lib/cms";
import { defaultContent } from "@/lib/cms-defaults";
import Reveal from "./Reveal";

const ICONS = [Cherry, Flame, Hourglass, Coffee];
const ACCENTS = ["bg-[#9E1B1B]", "bg-[#D97706]", "bg-[#1A1412]", "bg-[#9E1B1B]"];

export default function ProcessSection({
  process = defaultContent().process,
}: {
  process?: ProcessContent;
}) {
  const { lang } = useLang();
  const steps = process.steps.length > 0 ? process.steps : defaultContent().process.steps;

  return (
    <section id="proses" className="bg-grid-faint scroll-mt-20 w-full max-w-full overflow-hidden py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="inline-block -rotate-1 rounded-lg border-2 border-[#1A1412] bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#9E1B1B] shadow-brutal-sm">
            {process.eyebrow[lang]}
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="marker-amber px-1">{process.title[lang]}</span>
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#4a3f3a]">{process.sub[lang]}</p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.slice(0, 4).map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={s.title.id + i} delay={i * 90} variant="up" className="h-full">
                <div className="relative flex h-full flex-col rounded-2xl border-[2.5px] border-[#1A1412] bg-white p-5 pt-7 shadow-brutal sm:p-6 sm:pt-8">
                  <span className="absolute -top-3.5 left-5 flex items-center gap-1.5">
                    <span className={`rounded-lg border-2 border-[#1A1412] px-2.5 py-1 font-serif text-sm font-bold text-white ${ACCENTS[i % ACCENTS.length]}`}>
                      0{i + 1}
                    </span>
                    {i < Math.min(steps.length, 4) - 1 && (
                      <MoveRight className="ml-1 hidden h-5 w-5 text-[#D97706] lg:inline" aria-hidden />
                    )}
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-xl border-2 border-[#1A1412] bg-[#FBF9F6] text-[#9E1B1B]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-bold leading-snug">{s.title[lang]}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#4a3f3a]">{s.desc[lang]}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

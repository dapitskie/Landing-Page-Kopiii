"use client";

import Image from "next/image";
import { Handshake, LineChart, MessagesSquare } from "lucide-react";
import { useLang } from "./LanguageProvider";
import type { StoryContent } from "@/lib/cms";
import { defaultContent } from "@/lib/cms-defaults";
import { CountUp } from "./motion";
import Reveal from "./Reveal";

const ICONS = [Handshake, LineChart, MessagesSquare];

/** Nilai stat: angka di-count-up, akhiran ★ diganti logo roastery. */
function StatValue({ value }: { value: string }) {
  const m = value.match(/^([\d.,]+)(.*)$/);
  if (!m) return <>{value}</>;
  const [, numeric, suffix] = m;
  return (
    <>
      <CountUp value={numeric} />
      {suffix.includes("★") ? (
        <Image
          src="/logo.svg"
          alt="Logo Dadwish Coffee Roastery"
          width={22}
          height={22}
          className="ml-1 inline-block h-[0.95em] w-[0.95em] align-[-0.12em]"
        />
      ) : (
        suffix
      )}
    </>
  );
}

export default function Philosophy({ story = defaultContent().story }: { story?: StoryContent }) {
  const { lang } = useLang();
  return (
    <section id="cerita" className="scroll-mt-20 w-full max-w-full overflow-hidden py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="inline-block -rotate-1 rounded-lg border-2 border-[#1A1412] bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#9E1B1B] shadow-brutal-sm">
            {story.eyebrow[lang]}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {story.titlePre[lang]}{" "}
            <span className="marker-amber px-1 italic text-[#9E1B1B]">{story.titleAccent[lang]}</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#4a3f3a]">{story.body[lang]}</p>
          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 text-center">
            {story.stats.map((s) => (
              <div key={s.value + s.label.id} className="rounded-xl border-2 border-[#1A1412] bg-white px-2 py-3 shadow-brutal-sm">
                <p className="font-serif text-xl font-bold text-[#9E1B1B] sm:text-2xl">
                  <StatValue value={s.value} />
                </p>
                <p className="text-[11px] font-bold text-[#4a3f3a]">{s.label[lang]}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] font-semibold text-[#4a3f3a]/70">{story.footnote[lang]}</p>
        </Reveal>
        <div className="space-y-4">
          {story.pillars.map((pl, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={pl.title.id + i} delay={i * 90} variant={i % 2 === 0 ? "right" : "left"}>
                <div className="relative flex gap-4 rounded-2xl border-2 border-[#1A1412] bg-white p-5 shadow-brutal sm:p-6">
                  <span className="absolute -top-3 left-5 rounded-md border-2 border-[#1A1412] bg-[#D97706] px-2 py-0.5 text-[11px] font-bold text-white">
                    0{i + 1}
                  </span>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-[#1A1412] bg-[#9E1B1B] text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-bold">
                      {pl.title[lang]}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#4a3f3a]">{pl.desc[lang]}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

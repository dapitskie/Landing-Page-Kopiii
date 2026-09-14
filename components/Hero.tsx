"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Flame, MessageCircle, MapPin, Star, Wifi } from "lucide-react";
import { useLang } from "./LanguageProvider";
import type { HeroContent } from "@/lib/cms";
import { defaultContent } from "@/lib/cms-defaults";
import { useParallax } from "./motion";
import { waLink } from "@/lib/wa";
import Reveal from "./Reveal";

const FALLBACK_PHOTOS = [
  "/gallery/roastery-workspace.jpg",
  "/gallery/artisan-roasting.jpg",
  "/gallery/beans-cooling.jpg",
  "/gallery/selecting-beans.jpg",
];

function PhotoCarousel({ photos }: { photos: string[] }) {
  const { lang } = useLang();
  const slides = photos.length > 0 ? photos : FALLBACK_PHOTOS;
  const [idx, setIdx] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (dir: number) => setIdx((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (count <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % count), 4500);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-[3px] border-[#1A1412] bg-[#1A1412] shadow-brutal-lg"
      role="region"
      aria-roledescription="carousel"
      aria-label={lang === "en" ? "Roastery gallery" : "Galeri roastery"}
    >
      {slides.map((src, i) => {
        // Hanya render slide aktif + tetangga agar tidak 6 gambar berebut bandwidth LCP
        const dist = Math.min((i - idx + count) % count, (idx - i + count) % count);
        if (dist > 1) return null;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== idx}
          >
            <Image
              src={src}
              alt={lang === "en" ? `Dadwish roastery photo ${i + 1}` : `Foto roastery Dadwish ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "auto"}
              className="object-cover"
            />
          </div>
        );
      })}

      {/* Overlay gradasi + label */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A1412]/80 via-[#1A1412]/5 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
        <span className="inline-flex -rotate-1 items-center gap-1.5 rounded-lg border-2 border-[#1A1412] bg-[#D97706] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-brutal-sm">
          <Flame className="h-3 w-3" />
          {lang === "en" ? "Fresh roast gallery" : "Galeri fresh roast"}
        </span>
        <span className="rounded-lg border-2 border-[#1A1412] bg-[#FBF9F6] px-2.5 py-1 text-[11px] font-bold text-[#1A1412] tabular-nums">
          {idx + 1} / {count}
        </span>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={lang === "en" ? "Previous photo" : "Foto sebelumnya"}
            className="btn-press absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl border-2 border-[#1A1412] bg-[#FBF9F6] text-[#1A1412] shadow-brutal-sm hover:bg-[#D97706] hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={lang === "en" ? "Next photo" : "Foto berikutnya"}
            className="btn-press absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl border-2 border-[#1A1412] bg-[#FBF9F6] text-[#1A1412] shadow-brutal-sm hover:bg-[#D97706] hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-0 bottom-[4.5rem] flex justify-center gap-1.5">
            {slides.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={lang === "en" ? `Go to photo ${i + 1}` : `Ke foto ${i + 1}`}
                aria-current={i === idx}
                className={`h-2 rounded-full border border-[#1A1412] transition-all ${
                  i === idx ? "w-7 bg-[#D97706]" : "w-2 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const DEFAULTS = defaultContent();

export default function Hero({
  hero = DEFAULTS.hero,
  whatsapp = DEFAULTS.settings.whatsapp,
  photos = [],
}: {
  hero?: HeroContent;
  whatsapp?: string;
  photos?: string[];
}) {
  const { lang } = useLang();
  const t = hero;

  // Parallax latar (kecepatan berlawanan = efek kedalaman)
  const blobA = useParallax<HTMLDivElement>(0.12);
  const blobB = useParallax<HTMLDivElement>(-0.1);
  const mediaCard = useParallax<HTMLDivElement>(-0.05);

  return (
    <section id="top" className="bg-grid-faint relative w-full max-w-full overflow-hidden pt-24 sm:pt-28">
      <div ref={blobA} className="parallax pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#9E1B1B]/10 blur-3xl" />
      <div ref={blobB} className="parallax pointer-events-none absolute -left-24 top-64 h-72 w-72 rounded-full bg-[#D97706]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pb-14 sm:px-6 md:grid-cols-2 md:gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <Reveal>
            <p className="inline-flex -rotate-1 items-center gap-2 rounded-lg border-2 border-[#1A1412] bg-[#D97706] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-brutal-sm">
              <Flame className="h-3.5 w-3.5" /> {t.badge[lang]}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 text-balance font-serif text-4xl font-bold leading-[1.05] tracking-tight text-[#1A1412] sm:text-5xl lg:text-6xl">
              {t.titleA[lang]}
              <br />
              <span className="marker-amber px-1 italic text-[#9E1B1B]">{t.titleB[lang]}</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#4a3f3a] sm:text-lg">{t.sub[lang]}</p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <a
                href="#katalog"
                className="btn-press inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#1A1412] bg-[#9E1B1B] px-6 py-3.5 text-sm font-bold text-white shadow-brutal hover:bg-[#7f1616]"
              >
                {t.ctaBuy[lang]} <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={waLink(hero.ctaBaristaMsg[lang], whatsapp)}
                target="_blank"
                rel="noreferrer"
                className="btn-press inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#1A1412] bg-white px-6 py-3.5 text-sm font-bold text-[#1A1412] shadow-brutal hover:bg-[#D97706] hover:text-white"
              >
                <MessageCircle className="h-4 w-4" /> {t.ctaBarista[lang]}
              </a>
            </div>
          </Reveal>
          <Reveal delay={280}>
            <dl className="mt-7 grid max-w-lg grid-cols-3 gap-2 sm:gap-3">
              {[
                { icon: Flame, label: t.credSmall[lang] },
                { icon: Star, label: t.credNusantara[lang] },
                { icon: Wifi, label: t.credFresh[lang] },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="min-w-0 rounded-xl border-2 border-[#1A1412] bg-white p-2 text-center shadow-brutal-sm sm:p-3">
                  <Icon className="mx-auto h-3.5 w-3.5 text-[#9E1B1B] sm:h-4 sm:w-4" />
                  <p className="mt-1 text-[10px] font-bold leading-tight text-[#1A1412] sm:text-[11px]">{label}</p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={140} variant="scale" className="relative">
          <div ref={mediaCard} className="parallax">
            <PhotoCarousel photos={photos} />
            <div className="mt-4 flex items-center gap-2.5 rounded-2xl border-2 border-[#1A1412] bg-white p-3 shadow-brutal sm:p-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border-2 border-[#1A1412] bg-[#D97706] text-white sm:h-10 sm:w-10">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-[#1A1412]">{hero.addressShort}</p>
                <p className="truncate text-[11px] text-[#4a3f3a] sm:text-xs">{hero.addressNote[lang]}</p>
              </div>
              <a href="#lokasi" className="btn-press shrink-0 rounded-full border-2 border-[#1A1412] bg-[#1A1412] px-3 py-2 text-xs font-bold text-white shadow-brutal-sm hover:bg-[#9E1B1B] sm:px-3.5">
                {lang === "en" ? "Route" : "Rute"}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

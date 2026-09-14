"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useLang } from "./LanguageProvider";

function statusFor(pct: number, done: boolean, lang: "id" | "en"): string {
  if (done || pct >= 100) return lang === "en" ? "Ready to brew!" : "Siap diseduh!";
  if (pct >= 65) return lang === "en" ? "Resting the beans…" : "Resting beans…";
  if (pct >= 30) return lang === "en" ? "Roasting…" : "Menyangrai…";
  return lang === "en" ? "Heating the drum…" : "Memanaskan drum…";
}

export default function SiteLoader() {
  const { lang } = useLang();
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reduced) {
      const a = setTimeout(() => setFading(true), 400);
      const b = setTimeout(() => setGone(true), 800);
      return () => {
        clearTimeout(a);
        clearTimeout(b);
      };
    }
    const t1 = setTimeout(() => setDone(true), 1050);
    const t2 = setTimeout(() => setFading(true), 1280);
    const t3 = setTimeout(() => setGone(true), 1580);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [reduced]);

  // Progress 0 → 100 selama menyeduh
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const DUR = 950;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / DUR);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  if (gone) return null;

  return (
    <motion.div
      role="status"
      aria-label={lang === "en" ? "Loading Dadwish" : "Memuat Dadwish"}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-7 bg-[#1A1412]"
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      style={{ pointerEvents: fading ? "none" : "auto" }}
    >
      <div className="paper-dots absolute inset-0 opacity-20" aria-hidden />

      {/* Cangkir brutalist terisi kopi + uap */}
      <div className="relative" aria-hidden>
        {!reduced && !done && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute -top-12 h-11 w-1.5 rounded-full bg-white/70"
                style={{ left: `${36 + i * 13}%` }}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: [-4, -28], opacity: [0, 0.9, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.35, ease: "easeOut" }}
              />
            ))}
          </>
        )}

        <motion.div
          initial={{ y: -240 }}
          animate={done ? { y: 0, scale: [1, 1.12, 1] } : { y: 0, scale: 1 }}
          transition={
            done
              ? { duration: 0.3, ease: "easeOut" }
              : { type: "spring", stiffness: 380, damping: 19 }
          }
        >
          <div className="relative w-40">
            {/* Badan cangkir */}
            <div className="relative h-32 w-40 overflow-hidden rounded-b-[2rem] rounded-t-xl border-[3px] border-[#FBF9F6] bg-white">
              {/* Isi kopi naik mengikuti progress */}
              <div
                className="absolute inset-x-0 bottom-0 bg-[#B45309] transition-[height] duration-100 ease-linear"
                style={{ height: `${done ? 100 : pct}%` }}
              />
              {/* Logo di badan cangkir */}
              <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-[#1A1412] bg-white">
                <Image src="/logo.svg" alt="" width={26} height={26} className="h-6 w-6" />
              </div>
            </div>
            {/* Gagang */}
            <div className="absolute -right-7 top-4 h-14 w-9 rounded-r-full border-[3px] border-[#FBF9F6]" />
            {/* Tatakan */}
            <div className="mx-auto -mt-0 h-3.5 w-52 -translate-x-3 rounded-full border-[3px] border-[#FBF9F6] bg-[#D97706]" />
          </div>
        </motion.div>
      </div>

      {/* Progress ala brutalist */}
      <motion.div
        className="relative flex w-60 flex-col items-center gap-2.5 sm:w-72"
        initial={false}
        animate={done ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full overflow-hidden rounded-full border-2 border-[#FBF9F6] bg-white/10">
          <div
            className="h-3.5 rounded-full bg-[#D97706] transition-[width] duration-100 ease-linear"
            style={{ width: `${done ? 100 : pct}%` }}
          />
        </div>
        <div className="flex w-full items-center justify-between text-xs font-bold">
          <span className="uppercase tracking-[0.14em] text-white/80">{statusFor(pct, done, lang)}</span>
          <span className="tabular-nums text-[#e79b2d]">{done ? 100 : pct}%</span>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
          Dadwish Coffee Roastery
        </p>
      </motion.div>
    </motion.div>
  );
}

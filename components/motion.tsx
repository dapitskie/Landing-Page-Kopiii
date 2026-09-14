"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function readReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getServerReducedMotion = () => false;

export function usePrefersReducedMotion(): boolean {
  // Hydration-safe: server + render pertama selalu false.
  return useSyncExternalStore(subscribeReducedMotion, readReducedMotion, getServerReducedMotion);
}

/**
 * Parallax geser vertikal berbasis scroll.
 * speed > 0 bergerak searah scroll (lebih lambat = efek kedalaman),
 * speed < 0 bergerak berlawanan (elemen condong "melayang").
 * Nonaktif otomatis jika prefers-reduced-motion.
 */
export function useParallax<T extends HTMLElement>(speed = 0.08): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let current = 0;
    let target = 0;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      // -0.5 (atas) .. 0.5 (bawah), 0 = tengah viewport
      const progress = (rect.top + rect.height / 2 - viewportH / 2) / viewportH;
      target = progress * speed * viewportH;
    };

    const tick = () => {
      // lerp agar gerakan buttery, bukan kaku
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.1) current = target;
      el.style.transform = `translate3d(0, ${(-current).toFixed(1)}px, 0)`;
      if (current !== target) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return; // di luar layar: skip
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    measure();
    el.style.transform = `translate3d(0, ${(-target).toFixed(1)}px, 0)`;
    current = target;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return ref;
}

/** Angka count-up saat masuk viewport. value mis. "12+", "214+", "4.9". Akhiran ★ ditangani StatValue (diganti logo). */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const m = value.match(/^([\d.,]+)(.*)$/);
    if (!m) return; // state awal sudah = value
    const numeric = parseFloat(m[1].replace(",", "."));
    const suffix = m[2];
    const decimals = m[1].includes(".") || m[1].includes(",") ? 1 : 0;
    if (!Number.isFinite(numeric)) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || started.current) return;
          started.current = true;
          if (reduced) {
            setDisplay(value);
            obs.disconnect();
            return;
          }
          const t0 = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            const cur = numeric * eased;
            setDisplay(`${cur.toFixed(decimals)}${suffix}`);
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}

import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { defaultContent } from "./cms-defaults";
import type {
  FaqItem,
  Localized,
  MenuItem,
  SiteContent,
  StatItem,
} from "./cms";

const FILE = path.join(process.cwd(), "data", "cms.json");
const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function num(v: unknown, fallback = 0): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function loc(v: unknown, fallback: Localized): Localized {
  if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    return { id: str(o.id, fallback.id), en: str(o.en, fallback.en) };
  }
  return { ...fallback };
}

function locList(v: unknown, fallback: Localized[]): Localized[] {
  if (!Array.isArray(v)) return fallback.map((x) => ({ ...x }));
  return v.map((item, i) => loc(item, fallback[i % fallback.length] ?? { id: "", en: "" }));
}

function menuItem(m: unknown): MenuItem | null {
  if (!m || typeof m !== "object") return null;
  const o = m as Record<string, unknown>;
  if (!str(o.name)) return null;
  return { name: str(o.name), desc: str(o.desc), price: Math.max(0, Math.round(num(o.price))), tag: str(o.tag) };
}

function faqItem(f: unknown): FaqItem | null {
  if (!f || typeof f !== "object") return null;
  const o = f as Record<string, unknown>;
  if (!str(o.qId) || !str(o.aId)) return null;
  return { qId: str(o.qId), qEn: str(o.qEn), aId: str(o.aId), aEn: str(o.aEn) };
}

function stat(s: unknown, fb: StatItem): StatItem {
  if (!s || typeof s !== "object") return { ...fb, label: { ...fb.label } };
  const o = s as Record<string, unknown>;
  return { value: str(o.value, fb.value), label: loc(o.label, fb.label) };
}

/** Gabungkan data mentah dengan default agar field baru tetap aman. */
function sanitizeContent(raw: unknown): SiteContent {
  const d = defaultContent();
  const o = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const sec = (k: string) =>
    o[k] && typeof o[k] === "object" ? (o[k] as Record<string, unknown>) : {};

  const settings = sec("settings");
  const nav = sec("nav");
  const hero = sec("hero");
  const catalog = sec("catalog");
  const story = sec("story");
  const slowbar = sec("slowbar");
  const process = sec("process");
  const location = sec("location");
  const faq = sec("faq");

  const navKey = (k: "beans" | "story" | "slowbar" | "process" | "visit" | "buy") =>
    loc((nav as Record<string, unknown>)[k], d.nav[k]);

  return {
    version: 1,
    updatedAt: str(o.updatedAt) || new Date().toISOString(),
    settings: {
      whatsapp: str(settings.whatsapp, d.settings.whatsapp).replace(/\D/g, "") || d.settings.whatsapp,
      instagram: str(settings.instagram, d.settings.instagram),
      addressLine1: str(settings.addressLine1, d.settings.addressLine1),
      addressLine2: str(settings.addressLine2, d.settings.addressLine2),
      addressNote: loc(settings.addressNote, d.settings.addressNote),
      mapsQuery: str(settings.mapsQuery, d.settings.mapsQuery),
      mapsDestination: str(settings.mapsDestination, d.settings.mapsDestination),
      hours: Array.isArray(settings.hours)
        ? (settings.hours as unknown[]).map((h, i) => {
            const fb = d.settings.hours[i % d.settings.hours.length];
            const ho = h && typeof h === "object" ? (h as Record<string, unknown>) : {};
            return { label: loc(ho.label, fb.label), time: str(ho.time, fb.time) };
          })
        : d.settings.hours,
      hoursNote: loc(settings.hoursNote, d.settings.hoursNote),
      footerDesc: loc(settings.footerDesc, d.settings.footerDesc),
      footerHours: loc(settings.footerHours, d.settings.footerHours),
    },
    nav: {
      beans: navKey("beans"),
      story: navKey("story"),
      slowbar: navKey("slowbar"),
      process: navKey("process"),
      visit: navKey("visit"),
      buy: navKey("buy"),
    },
    hero: {
      badge: loc(hero.badge, d.hero.badge),
      titleA: loc(hero.titleA, d.hero.titleA),
      titleB: loc(hero.titleB, d.hero.titleB),
      sub: loc(hero.sub, d.hero.sub),
      ctaBuy: loc(hero.ctaBuy, d.hero.ctaBuy),
      ctaBarista: loc(hero.ctaBarista, d.hero.ctaBarista),
      ctaBaristaMsg: loc(hero.ctaBaristaMsg, d.hero.ctaBaristaMsg),
      credSmall: loc(hero.credSmall, d.hero.credSmall),
      credNusantara: loc(hero.credNusantara, d.hero.credNusantara),
      credFresh: loc(hero.credFresh, d.hero.credFresh),
      addressShort: str(hero.addressShort, d.hero.addressShort),
      addressNote: loc(hero.addressNote, d.hero.addressNote),
    },
    trust: locList(o.trust, d.trust).filter((t) => t.id || t.en).slice(0, 20),
    catalog: {
      eyebrow: loc(catalog.eyebrow, d.catalog.eyebrow),
      title: loc(catalog.title, d.catalog.title),
      sub: loc(catalog.sub, d.catalog.sub),
      ctaLabel: loc(catalog.ctaLabel, d.catalog.ctaLabel),
      ctaLink: str(catalog.ctaLink, d.catalog.ctaLink),
      note: loc(catalog.note, d.catalog.note),
    },
    story: {
      eyebrow: loc(story.eyebrow, d.story.eyebrow),
      titlePre: loc(story.titlePre, d.story.titlePre),
      titleAccent: loc(story.titleAccent, d.story.titleAccent),
      body: loc(story.body, d.story.body),
      stats: Array.isArray(story.stats)
        ? (story.stats as unknown[]).map((s, i) => stat(s, d.story.stats[i % d.story.stats.length])).slice(0, 6)
        : d.story.stats,
      footnote: loc(story.footnote, d.story.footnote),
      pillars: Array.isArray(story.pillars)
        ? (story.pillars as unknown[]).map((pl, i) => {
            const fb = d.story.pillars[i % d.story.pillars.length];
            const po = pl && typeof pl === "object" ? (pl as Record<string, unknown>) : {};
            return { title: loc(po.title, fb.title), desc: loc(po.desc, fb.desc) };
          }).slice(0, 6)
        : d.story.pillars,
    },
    slowbar: {
      title: loc(slowbar.title, d.slowbar.title),
      menuNote: loc(slowbar.menuNote, d.slowbar.menuNote),
      menu: Array.isArray(slowbar.menu)
        ? (slowbar.menu as unknown[]).map(menuItem).filter((m): m is MenuItem => m !== null).slice(0, 20)
        : d.slowbar.menu,
      amenities: locList(slowbar.amenities, d.slowbar.amenities).slice(0, 12),
      quote: loc(slowbar.quote, d.slowbar.quote),
      quoteBy: loc(slowbar.quoteBy, d.slowbar.quoteBy),
    },
    process: {
      eyebrow: loc(process.eyebrow, d.process.eyebrow),
      title: loc(process.title, d.process.title),
      sub: loc(process.sub, d.process.sub),
      steps: Array.isArray(process.steps) && process.steps.length > 0
        ? (process.steps as unknown[]).map((st, i) => {
            const fb = d.process.steps[i % d.process.steps.length];
            const so = st && typeof st === "object" ? (st as Record<string, unknown>) : {};
            return { title: loc(so.title, fb.title), desc: loc(so.desc, fb.desc) };
          }).slice(0, 8)
        : d.process.steps,
    },
    location: {
      eyebrow: loc(location.eyebrow, d.location.eyebrow),
      title: loc(location.title, d.location.title),
    },
    faq: {
      title: loc(faq.title, d.faq.title),
      desc: loc(faq.desc, d.faq.desc),
      items: Array.isArray(faq.items)
        ? (faq.items as unknown[]).map(faqItem).filter((f): f is FaqItem => f !== null).slice(0, 20)
        : d.faq.items,
    },
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return sanitizeContent(JSON.parse(raw));
  } catch {
    return defaultContent();
  }
}

/** Foto carousel hero — dibaca dari public/gallery, urut alfabetis. */
export async function getGalleryPhotos(): Promise<string[]> {
  try {
    const entries = await fs.readdir(GALLERY_DIR, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && IMAGE_EXT.has(path.extname(e.name).toLowerCase()))
      .map((e) => `/gallery/${e.name}`)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

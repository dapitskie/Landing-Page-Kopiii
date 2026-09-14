import type { FaqItem } from "@/data/products";

/** Teks dua bahasa untuk seluruh konten. */
export interface Localized {
  id: string;
  en: string;
}

export interface HourRow {
  label: Localized;
  time: string;
}

export interface StatItem {
  value: string;
  label: Localized;
}

export interface Pillar {
  title: Localized;
  desc: Localized;
}

export interface ProcessStep {
  title: Localized;
  desc: Localized;
}

export interface SiteSettings {
  whatsapp: string;
  instagram: string;
  addressLine1: string;
  addressLine2: string;
  addressNote: Localized;
  mapsQuery: string;
  mapsDestination: string;
  hours: HourRow[];
  hoursNote: Localized;
  footerDesc: Localized;
  footerHours: Localized;
}

export interface NavTexts {
  beans: Localized;
  story: Localized;
  slowbar: Localized;
  process: Localized;
  visit: Localized;
  buy: Localized;
}

export interface HeroContent {
  badge: Localized;
  titleA: Localized;
  titleB: Localized;
  sub: Localized;
  ctaBuy: Localized;
  ctaBarista: Localized;
  ctaBaristaMsg: Localized;
  credSmall: Localized;
  credNusantara: Localized;
  credFresh: Localized;
  addressShort: string;
  addressNote: Localized;
}

export interface CatalogContent {
  eyebrow: Localized;
  title: Localized;
  sub: Localized;
  ctaLabel: Localized;
  ctaLink: string;
  note: Localized;
}

export interface StoryContent {
  eyebrow: Localized;
  titlePre: Localized;
  titleAccent: Localized;
  body: Localized;
  stats: StatItem[];
  footnote: Localized;
  pillars: Pillar[];
}

export interface SlowBarContent {
  title: Localized;
  menuNote: Localized;
  amenities: Localized[];
  quote: Localized;
  quoteBy: Localized;
}

export interface ProcessContent {
  eyebrow: Localized;
  title: Localized;
  sub: Localized;
  steps: ProcessStep[];
}

export interface LocationContent {
  eyebrow: Localized;
  title: Localized;
}

export interface FaqContent {
  title: Localized;
  desc: Localized;
  items: FaqItem[];
}

export interface SiteContent {
  version: 1;
  updatedAt: string;
  settings: SiteSettings;
  nav: NavTexts;
  hero: HeroContent;
  trust: Localized[];
  catalog: CatalogContent;
  story: StoryContent;
  slowbar: SlowBarContent;
  process: ProcessContent;
  location: LocationContent;
  faq: FaqContent;
}

export type { FaqItem };

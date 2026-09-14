export type Lang = "id" | "en";

export const STRINGS = {
  nav: {
    beans: { id: "Beans", en: "Beans" },
    story: { id: "Cerita", en: "Story" },
    slowbar: { id: "Slow Bar", en: "Slow Bar" },
    b2b: { id: "Kemitraan", en: "Wholesale" },
    visit: { id: "Kunjungi", en: "Visit" },
    buy: { id: "Beli Beans", en: "Buy Beans" },
  },
  hero: {
    badge: { id: "Roastery Specialty · Siwalankerto, Surabaya", en: "Specialty Roastery · Siwalankerto, Surabaya" },
    titleA: { id: "Disingrai presisi,", en: "Precision-roasted," },
    titleB: { id: "diseduh dengan cerita.", en: "brewed with story." },
    sub: {
      id: "Dari garasi di Siwalankerto untuk Indonesia: 100% biji nusantara specialty, roast-curve berbasis data, dan slow bar ramah WFC — 5 menit dari UK Petra.",
      en: "From a Siwalankerto garage for Indonesia: 100% specialty nusantara beans, data-driven roast curves, and a WFC-friendly slow bar — 5 minutes from UK Petra.",
    },
    ctaBuy: { id: "Beli Beans (Online)", en: "Buy Beans (Online)" },
    ctaBarista: { id: "Chat Barista", en: "Chat Barista" },
    liveTitle: { id: "Batch hari ini", en: "Today's batch" },
    fresh: { id: "Fresh weekly roast", en: "Fresh weekly roast" },
    smallBatch: { id: "Small drum batch", en: "Small drum batch" },
    nusantara: { id: "100% Specialty Nusantara", en: "100% Specialty Nusantara" },
  },
  catalog: {
    eyebrow: { id: "Katalog Fresh Roast", en: "Fresh Roast Catalogue" },
    title: { id: "Pilih beans minggu ini", en: "Pick this week's beans" },
    sub: {
      id: "Semua mencantumkan roast date, profil body & acidity, dan opsi gilingan. Pesan satuan via WhatsApp — tanpa cart, tanpa ribet.",
      en: "Every lot lists roast date, body & acidity profile and grind options. Order per-item via WhatsApp — no cart, no fuss.",
    },
    all: { id: "Semua Koleksi", en: "All" },
    filter: { id: "Filter V60 / Light–Medium", en: "Filter V60 / Light–Medium" },
    espresso: { id: "Espresso & Milk-based", en: "Espresso & Milk-based" },
    buyVia: { id: "Beli via WA", en: "Buy via WA" },
  },
  b2b: {
    eyebrow: { id: "Portal Kemitraan B2B", en: "B2B Partnership" },
    title: { id: "Hitung kebutuhan beans kafemu", en: "Estimate your café's bean needs" },
  },
} as const;

export type Strings = typeof STRINGS;

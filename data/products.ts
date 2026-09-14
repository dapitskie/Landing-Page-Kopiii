export interface FaqItem {
  qId: string;
  qEn: string;
  aId: string;
  aEn: string;
}

export const FAQS: FaqItem[] = [
  {
    qId: "Berapa resting time ideal beans Dadwish?",
    qEn: "What is the ideal resting time?",
    aId: "Espresso: 7–14 hari setelah roast date. Filter/V60: 4–10 hari. Semua kemasan mencantumkan roast date, dan kami menyangrai fresh setiap minggu.",
    aEn: "Espresso: 7–14 days after roast date. Filter/V60: 4–10 days. Every bag lists its roast date, and we roast fresh weekly.",
  },
  {
    qId: "Bisa pilih gilingan? Saya tidak punya grinder.",
    qEn: "Can I choose a grind size?",
    aId: "Bisa. Pilih Whole Beans, Kasar (Cold Brew/French Press), Sedang (V60/Aeropress), atau Halus (Espresso/Mokapot) saat pesan via WhatsApp.",
    aEn: "Yes. Choose Whole Beans, Coarse, Medium or Fine when ordering via WhatsApp.",
  },
  {
    qId: "Apakah kirim ke luar kota? Bagaimana ongkirnya?",
    qEn: "Do you ship out of town?",
    aId: "Ya, ke seluruh Indonesia via ekspedisi reguler/kargo. Beans digiling H-1 pengiriman agar aroma terjaga, dan kami gratiskan konsultasi resep via chat barista.",
    aEn: "Yes, nationwide. Beans are ground H-1 before shipping, with free recipe consult via barista chat.",
  },
  {
    qId: "Dari mana beans Dadwish berasal?",
    qEn: "Where do Dadwish beans come from?",
    aId: "100% arabika nusantara dari kebun mitra di Arjuno & Ijen (Jatim), Toraja (Sulawesi), dan Gayo (Aceh) — dipetik merah selektif dan tertelusur sampai ke lot-nya.",
    aEn: "100% nusantara arabica from partner farms in Arjuno & Ijen (East Java), Toraja (Sulawesi) and Gayo (Aceh) — red-picked and traceable down to the lot.",
  },
  {
    qId: "Apakah cocok untuk WFC / nugas?",
    qEn: "Is it good for working / studying?",
    aId: "Sangat. Wi-Fi >100 Mbps, stopkontak tiap meja, AC sejuk, indoor + smoking outdoor rindang. Jam 09.00–22.00 Senin–Sabtu, Minggu tutup.",
    aEn: "Absolutely. >100 Mbps Wi-Fi, outlets at every table, AC, indoor + shaded smoking area. 09.00–22.00 Mon–Sat, closed Sundays.",
  },
  {
    qId: "Apakah ada kelas cupping / manual brew?",
    qEn: "Are there cupping / brew classes?",
    aId: "Ada cupping session rutin dan workshop manual brew di slow bar. Daftar via chat WhatsApp.",
    aEn: "Yes — regular cuppings and manual-brew workshops at the slow bar. Register via WhatsApp chat.",
  },
];

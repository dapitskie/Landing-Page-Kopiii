import { FAQS } from "@/data/products";
import type { SiteContent } from "./cms";

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

/** Konten bawaan — cerminan nilai yang selama ini hardcode di komponen. */
export function defaultContent(): SiteContent {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    settings: {
      whatsapp: "6281234567890",
      instagram: "https://instagram.com",
      addressLine1: "Jl. Siwalankerto No.9-11, Siwalankerto,",
      addressLine2: "Kec. Wonocolo, Surabaya, Jawa Timur 60234",
      addressNote: {
        id: "5 menit dari kampus UK Petra · dekat exit Tol Waru",
        en: "5 min from UK Petra · near Waru Toll exit",
      },
      mapsQuery: "Jl. Siwalankerto No.9-11, Siwalankerto, Wonocolo, Surabaya 60234",
      mapsDestination: "https://maps.app.goo.gl/TXqpB8hQnNuX8Gyy8",
      hours: [
        { label: { id: "Senin–Sabtu", en: "Mon–Sat" }, time: "09.00 – 22.00" },
        { label: { id: "Minggu", en: "Sunday" }, time: "Tutup" },
      ],
      hoursNote: {
        id: "Roasting: pagi hari · aroma terbaik sebelum 11.00.",
        en: "Roasting: mornings · best aroma before 11.00.",
      },
      footerDesc: {
        id: "Roastery specialty nusantara dari Siwalankerto, Surabaya. Roast curve berbasis data, kemitraan petani berkeadilan, dan slow bar yang terasa seperti rumah.",
        en: "Specialty nusantara roastery from Siwalankerto, Surabaya. Data-driven roast curves, fair farmer partnerships, and a slow bar that feels like home.",
      },
      footerHours: {
        id: "Buka Senin–Sabtu 09.00–22.00 WIB. Minggu tutup.",
        en: "Open Mon–Sat 09.00–22.00 WIB. Closed on Sundays.",
      },
    },
    nav: {
      beans: { id: "Beans", en: "Beans" },
      story: { id: "Cerita", en: "Story" },
      slowbar: { id: "Slow Bar", en: "Slow Bar" },
      process: { id: "Proses", en: "Process" },
      visit: { id: "Kunjungi", en: "Visit" },
      buy: { id: "Beli Beans", en: "Buy Beans" },
    },
    hero: {
      badge: {
        id: "Roastery Specialty · Siwalankerto, Surabaya",
        en: "Specialty Roastery · Siwalankerto, Surabaya",
      },
      titleA: { id: "Disingrai presisi,", en: "Precision-roasted," },
      titleB: { id: "diseduh dengan cerita.", en: "brewed with story." },
      sub: {
        id: "Dari garasi di Siwalankerto untuk Indonesia: 100% biji nusantara specialty, roast-curve berbasis data, dan slow bar ramah WFC — 5 menit dari UK Petra.",
        en: "From a Siwalankerto garage for Indonesia: 100% specialty nusantara beans, data-driven roast curves, and a WFC-friendly slow bar — 5 minutes from UK Petra.",
      },
      ctaBaristaMsg: {
        id: "Halo barista Dadwish! Saya butuh rekomendasi resep seduh V60 untuk di rumah.",
        en: "Hello Dadwish barista! I need a brew recipe recommendation for V60 at home.",
      },
      ctaBuy: { id: "Beli Beans (Online)", en: "Buy Beans (Online)" },
      ctaBarista: { id: "Chat Barista", en: "Chat Barista" },
      credSmall: { id: "Small drum batch", en: "Small drum batch" },
      credNusantara: { id: "100% Specialty Nusantara", en: "100% Specialty Nusantara" },
      credFresh: { id: "Fresh weekly roast", en: "Fresh weekly roast" },
      addressShort: "Jl. Siwalankerto No.9-11, Surabaya",
      addressNote: {
        id: "5 mnt dari UK Petra · dekat exit Tol Waru",
        en: "5 min from UK Petra · near Waru Toll exit",
      },
    },
    trust: [
      { id: "Fresh roast setiap minggu + roast date jelas", en: "Fresh weekly roast + clear roast date" },
      { id: "Direct sourcing petani Aceh · Toraja · Jatim", en: "Direct sourcing Aceh · Toraja · East Java farmers" },
      { id: "Body & acidity transparan di tiap lot", en: "Transparent body & acidity in every lot" },
      { id: "Wi-Fi >100 Mbps · colokan tiap meja", en: "Wi-Fi >100 Mbps · outlets at every table" },
      { id: "Buka Senin–Sabtu 09.00–22.00, Minggu tutup", en: "Open Mon–Sat 09.00–22.00, closed Sundays" },
      { id: "Konsultasi resep gratis via chat barista", en: "Free recipe consult via barista chat" },
    ],
    catalog: {
      eyebrow: { id: "Katalog Fresh Roast", en: "Fresh Roast Catalogue" },
      title: { id: "Lihat katalog beans lengkap", en: "Browse the full beans catalogue" },
      sub: {
        id: "Semua lot fresh roast lengkap dengan roast date, profil body & acidity, dan opsi gilingan — ada di katalog kami.",
        en: "Every fresh roast lot with roast date, body & acidity profile and grind options lives in our catalogue.",
      },
      ctaLabel: { id: "Buka Katalog", en: "Open Catalogue" },
      ctaLink: "https://wa.me/6281234567890?text=Halo%20Dadwish!%20Saya%20mau%20lihat%20katalog%20fresh%20roast%20minggu%20ini.",
      note: {
        id: "Katalog diperbarui tiap kali ada batch baru.",
        en: "Catalogue updated with every new batch.",
      },
    },
    story: {
      eyebrow: { id: "Cerita kami", en: "Our story" },
      titlePre: { id: "Dari garasi di", en: "From a garage in" },
      titleAccent: { id: "Siwalankerto.", en: "Siwalankerto." },
      body: {
        id: "Dadwish berawal dari drum roaster rumahan di garasi keluarga — menyangrai 500 gram demi 500 gram untuk tetangga dan mahasiswa Petra. Kini drum-nya lebih besar, tapi ritualnya sama: cium setiap batch, catat setiap kurva, cicipi semua sebelum keluar roastery.",
        en: "Dadwish started as a home drum roaster in a family garage — roasting 500g at a time for neighbours and Petra students. Today the drum is bigger, but the ritual is the same: smell every batch, log every curve, taste everything before it leaves the roastery.",
      },
      stats: [
        { value: "12+", label: { id: "mitra petani", en: "farmer partners" } },
        { value: "214+", label: { id: "batch tercatat", en: "batches logged" } },
        { value: "4.9★", label: { id: "rating Google*", en: "Google rating*" } },
      ],
      footnote: {
        id: "*Ilustratif — ganti dengan rating asli.",
        en: "*Illustrative — replace with real rating.",
      },
      pillars: [
        {
          title: { id: "Direct Sourcing Berkeadilan", en: "Fair Direct Sourcing" },
          desc: {
            id: "Hubungan langsung dengan petani Arjuno, Ijen, Toraja, dan Gayo. Harga adil, panen selektif, traceability jelas sampai ke cangkirmu.",
            en: "Direct ties with Arjuno, Ijen, Toraja and Gayo farmers. Fair prices, selective harvest, full traceability to your cup.",
          },
        },
        {
          title: { id: "Roast Curve Berbasis Data", en: "Data-Driven Roast Curves" },
          desc: {
            id: "Setiap batch dicatat sensor suhu Artisan & dievaluasi sensori. Profil sangrai presisi, bukan kira-kira — konsisten tiap minggu.",
            en: "Every batch logged with Artisan sensors & sensory evaluation. Precise, repeatable profiles — consistent every week.",
          },
        },
        {
          title: { id: "Ruang Diskusi & Edukasi", en: "Open Bar & Education" },
          desc: {
            id: "Slow bar tanpa sekat: tanya resep, kalibrasi grinder, atau ikut cupping. Barista kami senang mengajari, bukan menggurui.",
            en: "A no-barrier slow bar: ask for recipes, grinder calibration or join cuppings. Our baristas love to share.",
          },
        },
      ],
    },
    slowbar: {
      title: {
        id: "Nugas seharian? Bisa. Seduh pelan-pelan.",
        en: "Work here all day. Sip slowly.",
      },
      menuNote: {
        id: "Menu lengkap tersedia di kedai · semua memakai beans fresh roast.",
        en: "Full menu available in-store · beans used are all fresh roast.",
      },
      amenities: [
        { id: "Wi-Fi >100 Mbps", en: "Wi-Fi >100 Mbps" },
        { id: "Stopkontak tiap meja", en: "Outlets at every table" },
        { id: "Indoor AC sejuk", en: "Cool AC indoor" },
        { id: "Smoking outdoor rindang", en: "Shaded smoking outdoor" },
        { id: "Buka s/d 22.00 (Sen–Sab)", en: "Open till 22.00 (Mon–Sat)" },
        { id: "Es Kopi Susu 22rb", en: "Es Kopi Susu from 22k" },
      ],
      quote: {
        id: "“Perpustakaan tidak resmi anak Siwalankerto.”",
        en: "“The unofficial library of Siwalankerto.”",
      },
      quoteBy: {
        id: "— kata anak WFC, kemungkinan besar",
        en: "— WFC regulars, probably",
      },
    },
    process: {
      eyebrow: { id: "Dari cherry ke cangkir", en: "From cherry to cup" },
      title: { id: "Empat langkah sebelum sampai ke cangkirmu", en: "Four steps before it reaches your cup" },
      sub: {
        id: "Tanpa jalan pintas: dipetik merah, disangrai presisi, di-resting cukup, baru dikirim.",
        en: "No shortcuts: red-picked, precision-roasted, properly rested, then shipped.",
      },
      steps: [
        {
          title: { id: "Petik Merah Selektif", en: "Selectively Red-Picked" },
          desc: {
            id: "Hanya cherry merah matang dari kebun mitra Arjuno, Ijen, Toraja, dan Gayo. Yang masih hijau? Tunggu giliran panen berikutnya.",
            en: "Only ripe red cherries from partner farms in Arjuno, Ijen, Toraja and Gayo. Still green? Wait for the next harvest.",
          },
        },
        {
          title: { id: "Sangrai Presisi", en: "Precision Roasting" },
          desc: {
            id: "Small drum batch dengan kurva suhu tercatat — profilnya bisa diulang konsisten tiap minggu, bukan kira-kira.",
            en: "Small drum batches with logged temperature curves — repeatable every week, never guesswork.",
          },
        },
        {
          title: { id: "Resting Cukup", en: "Proper Resting" },
          desc: {
            id: "Didiamkan 4–14 hari agar gas CO2 lepas dan rasa terbuka. Roast date selalu tercantum jelas di kemasan.",
            en: "Rested 4–14 days so CO2 degasses and flavour opens up. Roast date always printed on the pack.",
          },
        },
        {
          title: { id: "Diseduh & Dikirim", en: "Brewed & Shipped" },
          desc: {
            id: "Digiling H-1 sebelum kirim agar aroma terjaga, plus konsultasi resep gratis via chat barista.",
            en: "Ground H-1 before shipping to lock in aroma, plus free recipe consult via barista chat.",
          },
        },
      ],
    },
    location: {
      eyebrow: { id: "Kunjungi kedai", en: "Visit the roastery" },
      title: { id: "Mampir ke Siwalankerto", en: "Find us in Siwalankerto" },
    },
    faq: {
      title: { id: "Masih penasaran?", en: "Still curious?" },
      desc: {
        id: "Soal resting, pengiriman, gilingan, atau asal beans — sudah dijawab. Sisanya, barista kami fast respon.",
        en: "About resting, shipping, grind or bean origins — answered. Anything else, our barista replies fast.",
      },
      items: clone(FAQS),
    },
  };
}

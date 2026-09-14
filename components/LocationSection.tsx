"use client";

import { MapPin, Clock, Navigation, Phone } from "lucide-react";
import { useLang } from "./LanguageProvider";
import type { LocationContent, SiteSettings } from "@/lib/cms";
import { defaultContent } from "@/lib/cms-defaults";
import { waLink } from "@/lib/wa";
import Reveal from "./Reveal";

const DEFAULTS = defaultContent();

export default function LocationSection({
  location = DEFAULTS.location,
  settings = DEFAULTS.settings,
  whatsapp = DEFAULTS.settings.whatsapp,
}: {
  location?: LocationContent;
  settings?: SiteSettings;
  whatsapp?: string;
}) {
  const { lang } = useLang();
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(settings.mapsQuery)}&output=embed`;
  const mapsDir = settings.mapsDestination.trim().startsWith("http")
    ? settings.mapsDestination.trim()
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(settings.mapsDestination)}`;
  return (
    <section id="lokasi" className="scroll-mt-20 w-full max-w-full overflow-hidden bg-[#F5F3F0]/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9E1B1B]">
            {location.eyebrow[lang]}
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {location.title[lang]}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal variant="left">
            <div className="overflow-hidden rounded-2xl border-[2.5px] border-[#1A1412] bg-white shadow-brutal">
              <iframe
                title="Peta Dadwish Coffee Roastery"
                src={mapsEmbed}
                className="h-72 w-full border-b-[2.5px] border-[#1A1412] sm:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex flex-wrap items-center gap-2.5 p-4">
                <a
                  href={mapsDir}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-press inline-flex items-center gap-1.5 rounded-full border-2 border-[#1A1412] bg-[#1A1412] px-4 py-2.5 text-[13px] font-bold text-white shadow-brutal-sm hover:bg-[#9E1B1B]"
                >
                  <Navigation className="h-4 w-4" /> {lang === "en" ? "Get directions" : "Panduan rute"}
                </a>
                <a
                  href={waLink(lang === "en" ? "Hello Dadwish! Is there parking for cars?" : "Halo Dadwish! Apakah ada parkir mobil?", whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-press inline-flex items-center gap-1.5 rounded-full border-2 border-[#1A1412] bg-white px-4 py-2.5 text-[13px] font-bold shadow-brutal-sm hover:bg-[#D97706] hover:text-white"
                >
                  <Phone className="h-4 w-4" /> {lang === "en" ? "Ask parking" : "Tanya parkir"}
                </a>
              </div>
            </div>
          </Reveal>
          <div className="flex flex-col gap-4">
            <Reveal delay={80} variant="right">
              <div className="rounded-2xl border-2 border-[#1A1412] bg-white p-6 shadow-brutal">
                <p className="flex items-center gap-2 font-bold">
                  <span className="grid h-7 w-7 place-items-center rounded-lg border-2 border-[#1A1412] bg-[#9E1B1B] text-white">
                    <MapPin className="h-4 w-4" />
                  </span>
                  {lang === "en" ? "Address" : "Alamat"}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#4a3f3a]">
                  {settings.addressLine1}
                  <br />
                  {settings.addressLine2}
                  <br />
                  {settings.addressNote[lang]}
                </p>
              </div>
            </Reveal>
            <Reveal delay={140} variant="right">
              <div className="rounded-2xl border-2 border-[#1A1412] bg-white p-6 shadow-brutal">
                <p className="flex items-center gap-2 font-bold">
                  <span className="grid h-7 w-7 place-items-center rounded-lg border-2 border-[#1A1412] bg-[#D97706] text-white">
                    <Clock className="h-4 w-4" />
                  </span>
                  {lang === "en" ? "Hours" : "Jam buka"}
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {settings.hours.map((h) => (
                    <li key={h.label.id + h.time} className="flex items-center justify-between rounded-lg border-2 border-[#1A1412] bg-[#FBF9F6] px-3.5 py-2.5">
                      <span className="font-bold">{h.label[lang]}</span>
                      <span className="font-semibold text-[#4a3f3a]">
                        {/tutup|closed/i.test(h.time)
                          ? lang === "en" ? "Closed" : "Tutup"
                          : `${h.time} WIB`}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs font-semibold text-[#4a3f3a]">{settings.hoursNote[lang]}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { MessageCircle, AtSign, MapPin } from "lucide-react";
import { useLang } from "./LanguageProvider";
import type { NavTexts, SiteSettings } from "@/lib/cms";
import { defaultContent } from "@/lib/cms-defaults";
import { waLink } from "@/lib/wa";

const DEFAULTS = defaultContent();

export default function Footer({
  settings = DEFAULTS.settings,
  nav = DEFAULTS.nav,
  whatsapp = DEFAULTS.settings.whatsapp,
}: {
  settings?: SiteSettings;
  nav?: NavTexts;
  whatsapp?: string;
}) {
  const { lang } = useLang();
  const links: [string, string][] = [
    ["#katalog", nav.beans[lang]],
    ["#cerita", nav.story[lang]],
    ["#slowbar", nav.slowbar[lang]],
    ["#proses", nav.process[lang]],
    ["#lokasi", nav.visit[lang]],
  ];
  return (
    <footer className="w-full max-w-full overflow-hidden border-t-[3px] border-[#1A1412] bg-[#1A1412] pb-24 pt-14 text-white md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <p className="flex items-center gap-2.5">
            <span className="grid h-14 w-14 -rotate-3 place-items-center overflow-hidden rounded-xl border-2 border-[#FBF9F6] bg-white">
              <Image
                src="/logo.jpg"
                alt=""
                width={300}
                height={300}
                className="h-14 w-14 object-cover"
              />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-xl font-semibold">Dadwish</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#e79b2d]">
                Coffee Roastery
              </span>
            </span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            {settings.footerDesc[lang]}
          </p>
          <p className="mt-4 flex items-start gap-1.5 text-[13px] text-white/60">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            {settings.addressLine1} {settings.addressLine2}
          </p>
        </div>
        <nav>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">
            {lang === "en" ? "Explore" : "Jelajahi"}
          </p>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            {links.map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-white/80 hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">
            {lang === "en" ? "Order & contact" : "Pesan & kontak"}
          </p>
          <div className="mt-3 flex flex-col gap-2.5">
            <a
              href={waLink(lang === "en" ? "Hello Dadwish! I'd like to order beans." : "Halo Dadwish! Saya mau pesan beans.", whatsapp)}
              target="_blank"
              rel="noreferrer"
              className="btn-press inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#FBF9F6] bg-[#9E1B1B] px-5 py-3 text-sm font-bold shadow-brutal-cream hover:bg-[#7f1616]"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Order
            </a>
            <a
              href={settings.instagram}
              target="_blank"
              rel="noreferrer"
              className="btn-press inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#FBF9F6]/60 px-5 py-3 text-sm font-bold text-white/85 hover:border-[#FBF9F6] hover:text-white"
            >
              <AtSign className="h-4 w-4" /> Instagram
            </a>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/50">{settings.footerHours[lang]}</p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-5 text-xs text-white/45 sm:px-6">
        <span>
          © {new Date().getFullYear()} Dadwish Coffee Roastery · Siwalankerto, Surabaya ·{" "}
          {lang === "en" ? "Fresh roasted weekly." : "Disingrai fresh setiap minggu."}
        </span>
      </div>
    </footer>
  );
}

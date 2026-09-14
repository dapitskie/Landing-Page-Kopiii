"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, MessageCircle } from "lucide-react";
import { useLang } from "./LanguageProvider";
import type { NavTexts } from "@/lib/cms";
import { defaultContent } from "@/lib/cms-defaults";
import { getOpenStatus } from "@/lib/format";
import { waLink } from "@/lib/wa";

const DEFAULTS = defaultContent();

export default function Navbar({
  nav = DEFAULTS.nav,
  whatsapp = DEFAULTS.settings.whatsapp,
  addressShort = DEFAULTS.hero.addressShort,
}: {
  nav?: NavTexts;
  whatsapp?: string;
  addressShort?: string;
}) {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(() => getOpenStatus());
  const t = nav;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus()), 60000);
    return () => clearInterval(id);
  }, []);

  const links = [
    { href: "#katalog", label: t.beans[lang] },
    { href: "#cerita", label: t.story[lang] },
    { href: "#slowbar", label: t.slowbar[lang] },
    { href: "#proses", label: t.process[lang] },
    { href: "#lokasi", label: t.visit[lang] },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b-[2.5px] border-[#1A1412] transition-all ${
        scrolled ? "bg-[#FBF9F6] shadow-[0_4px_0_#1a14121a]" : "bg-[#FBF9F6]/95 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">        <a href="#top" className="flex items-center gap-2.5" aria-label="Dadwish Coffee Roastery — ke atas">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl border-2 border-[#1A1412] bg-white shadow-brutal-sm">
            <Image
              src="/logo.jpg"
              alt=""
              width={300}
              height={300}
              priority
              className="h-11 w-11 object-cover"
            />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold tracking-tight text-[#1A1412]">
              Dadwish
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9E1B1B]">
              Coffee Roastery
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 text-sm font-bold text-[#2A2320] lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 transition-colors hover:bg-[#1A1412] hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <span
            className={`hidden items-center gap-1.5 rounded-full border-2 border-[#1A1412] px-3 py-1 text-xs font-bold xl:inline-flex ${
              status.open ? "bg-green-100 text-green-900" : "bg-white text-[#4a3f3a]"
            }`}
          >
            <span className={`live-dot h-1.5 w-1.5 rounded-full ${status.open ? "bg-green-600" : "bg-[#9E1B1B]"}`} />
            {status.label}
          </span>
          <div className="flex overflow-hidden rounded-full border-2 border-[#1A1412] bg-white text-xs font-bold">
            {(["id", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1.5 uppercase ${lang === l ? "bg-[#1A1412] text-white" : "text-[#4a3f3a]"}`}
                aria-pressed={lang === l}
              >
                {l}
              </button>
            ))}
          </div>
          <a
            href={waLink(
              lang === "en"
                ? "Hello Dadwish! I'd like to see this week's fresh roast list."
                : "Halo Dadwish! Saya mau lihat daftar fresh roast minggu ini.",
              whatsapp
            )}
            target="_blank"
            rel="noreferrer"
            className="btn-press inline-flex items-center gap-1.5 rounded-full border-2 border-[#1A1412] bg-[#9E1B1B] px-4 py-2 text-sm font-bold text-white shadow-brutal-sm hover:bg-[#7f1616]"
          >
            <MessageCircle className="h-4 w-4" />
            {t.buy[lang]}
          </a>
        </div>

        <button
          className="btn-press grid h-10 w-10 place-items-center rounded-xl border-2 border-[#1A1412] bg-white shadow-brutal-sm lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="faq-open border-t-[2.5px] border-[#1A1412] bg-[#FBF9F6] px-4 pb-5 pt-3 lg:hidden">
          <nav className="flex flex-col gap-1.5 text-[15px] font-bold">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border-2 border-[#1A1412] bg-white px-3 py-2.5 shadow-brutal-sm"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex overflow-hidden rounded-full border-2 border-[#1A1412] bg-white text-xs font-bold">
              {(["id", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-2 uppercase ${lang === l ? "bg-[#1A1412] text-white" : ""}`}
                >
                  {l === "id" ? "ID" : "EN"}
                </button>
              ))}
            </div>
            <a
              href={waLink("Halo Dadwish! Saya mau lihat daftar fresh roast minggu ini.", whatsapp)}
              target="_blank"
              rel="noreferrer"
              className="btn-press flex-1 rounded-full border-2 border-[#1A1412] bg-[#9E1B1B] px-4 py-2.5 text-center text-sm font-bold text-white shadow-brutal-sm"
            >
              {t.buy[lang]}
            </a>
          </div>
          <p className="mt-3 px-1 text-xs font-semibold text-[#4a3f3a]">{status.label} · {addressShort}</p>
        </div>
      )}
      {/* Progress baca halaman */}
      <div
        className="absolute inset-x-0 bottom-0 h-1 origin-left bg-[#D97706]"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
    </header>
  );
}

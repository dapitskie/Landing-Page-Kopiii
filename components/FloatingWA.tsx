"use client";

import { MessageCircle } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { waLink } from "@/lib/wa";
import { defaultContent } from "@/lib/cms-defaults";

export default function FloatingWA({ whatsapp = defaultContent().settings.whatsapp }: { whatsapp?: string }) {
  const { lang } = useLang();
  return (
    <a
      href={waLink(
        lang === "en" ? "Hello Dadwish! I'd like to ask about beans / visit." : "Halo Dadwish! Saya mau tanya soal beans / kunjungan.",
        whatsapp
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat WhatsApp"
      className="btn-press fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border-2 border-[#1A1412] bg-[#1A1412] p-2 text-sm font-bold text-white shadow-brutal-sm hover:bg-[#9E1B1B] sm:bottom-5 sm:right-5 sm:py-2.5 sm:pl-3 sm:pr-4"
    >
      <span className="relative grid h-8 w-8 place-items-center rounded-full border-2 border-[#FBF9F6] bg-[#25D366]">
        <MessageCircle className="h-4 w-4 text-white" />
        <span className="live-dot absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#1A1412] bg-green-400" />
      </span>
      <span className="hidden text-xs font-bold sm:inline sm:text-sm">
        {lang === "en" ? "Chat us" : "Chat kami"}
      </span>
      <span className="sr-only sm:hidden">
        {lang === "en" ? "Chat us" : "Chat kami"}
      </span>
    </a>
  );
}

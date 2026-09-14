"use client";

import { Flame, Leaf, Wifi, BadgeCheck, Timer, HandHeart, Asterisk } from "lucide-react";
import type { Localized } from "@/lib/cms";
import { defaultContent } from "@/lib/cms-defaults";
import { useLang } from "./LanguageProvider";

const ICONS = [Flame, Leaf, BadgeCheck, Wifi, Timer, HandHeart];

export default function TrustMarquee({ items = defaultContent().trust }: { items?: Localized[] }) {
  const { lang } = useLang();
  const row = [...items, ...items];
  return (
    <div className="w-full max-w-full overflow-hidden border-y-[3px] border-[#1A1412] bg-[#9E1B1B] py-3">
      <div className="animate-marquee flex w-max items-center gap-6 pr-6">
        {row.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <span
              key={i}
              className="inline-flex shrink-0 items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-white"
            >
              <span className="grid h-7 w-7 place-items-center rounded-lg border-2 border-[#1A1412] bg-[#FBF9F6]">
                <Icon className="h-4 w-4 text-[#9E1B1B]" />
              </span>
              {item[lang]}
              <Asterisk className="h-4 w-4 shrink-0 text-[#e79b2d]" aria-hidden />
            </span>
          );
        })}
      </div>
    </div>
  );
}

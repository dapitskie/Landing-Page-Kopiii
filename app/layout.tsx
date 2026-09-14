import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import SiteLoader from "@/components/SiteLoader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWA from "@/components/FloatingWA";
import { getSiteContent } from "@/lib/cms-store";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://dadwish.coffee";
const TITLE = "Dadwish Coffee Roastery — Specialty Nusantara dari Siwalankerto, Surabaya";
const DESC =
  "Roastery specialty di Siwalankerto, Surabaya: fresh roast beans mingguan (Arjuno, Gayo, Toraja, Ijen), slow bar WFC-friendly dekat UK Petra, dan proses cherry-ke-cangkir transparan. Pesan via WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Dadwish Coffee Roastery",
  },
  description: DESC,
  keywords: [
    "kopi specialty surabaya",
    "roastery siwalankerto",
    "jual biji kopi fresh roast",
    "es kopi susu surabaya",
    "wfc surabaya",
    "proses sangrai kopi",
    "dadwish coffee",
  ],
  authors: [{ name: "Dadwish Coffee Roastery" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: "Dadwish Coffee Roastery",
    title: TITLE,
    description: DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.svg" },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const content = await getSiteContent();
  const s = content.settings;

  const JSON_LD = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "Dadwish Coffee Roastery",
    description: DESC,
    servesCuisine: "Coffee",
    priceRange: "Rp18000-Rp135000",
    telephone: `+${s.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.addressLine1,
      addressLocality: "Surabaya",
      addressRegion: "Jawa Timur",
      postalCode: "60234",
      addressCountry: "ID",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        opens: "08:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "08:00",
        closes: "23:00",
      },
    ],
    url: SITE_URL,
  };

  const FAQ_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.items.slice(0, 6).map((f) => ({
      "@type": "Question",
      name: f.qId,
      acceptedAnswer: { "@type": "Answer", text: f.aId },
    })),
  };

  return (
    <html lang="id" className={`${newsreader.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FBF9F6] text-[#1A1412] w-full max-w-full overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
        />
        <LanguageProvider>
          <SiteLoader />
          <Navbar nav={content.nav} whatsapp={s.whatsapp} addressShort={content.hero.addressShort} />
          <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
          <Footer settings={s} nav={content.nav} whatsapp={s.whatsapp} />
          <FloatingWA whatsapp={s.whatsapp} />
        </LanguageProvider>
      </body>
    </html>
  );
}

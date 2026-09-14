import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dadwish.coffee";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#katalog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/#proses`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#lokasi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}

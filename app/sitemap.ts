import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://printai.cloud";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/case-studies`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/resources`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/services/chatbots`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/automation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/erpnext`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}

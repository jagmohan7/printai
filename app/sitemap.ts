import type { MetadataRoute } from "next";
import { getAllFlexPageSlugs } from "@/lib/sanity.queries";

const BASE = "https://printai.cloud";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const fixed: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,                      lastModified: now, changeFrequency: "weekly",  priority: 1.0  },
    { url: `${BASE}/products/chatbots`,     lastModified: now, changeFrequency: "monthly", priority: 0.9  },
    { url: `${BASE}/products/web-to-print`, lastModified: now, changeFrequency: "monthly", priority: 0.9  },
    { url: `${BASE}/services/automation`,   lastModified: now, changeFrequency: "monthly", priority: 0.9  },
    { url: `${BASE}/services/devops`,       lastModified: now, changeFrequency: "monthly", priority: 0.9  },
    { url: `${BASE}/services/custom-ai`,    lastModified: now, changeFrequency: "monthly", priority: 0.9  },
    { url: `${BASE}/case-studies`,          lastModified: now, changeFrequency: "weekly",  priority: 0.8  },
    { url: `${BASE}/resources`,             lastModified: now, changeFrequency: "weekly",  priority: 0.7  },
  ];

  // Auto-include every published Flexible Page (terms, pricing, etc.)
  let flex: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllFlexPageSlugs();
    flex = slugs
      .filter((s) => s.slug)
      .map((s) => ({ url: `${BASE}/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 }));
  } catch {
    // If Sanity is unreachable at build, just ship the fixed routes.
  }

  return [...fixed, ...flex];
}

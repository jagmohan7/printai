import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // NOTE: do NOT block /_next/ — that path serves optimized images
        // (next/image) and JS/CSS Google needs to render + index the page.
        // Blocking it hides the logo/images from Google and breaks rich
        // results. Only block private/non-SEO routes.
        disallow: ["/api/", "/admin/", "/studio/"],
      },
    ],
    sitemap: "https://printai.cloud/sitemap.xml",
    host: "https://printai.cloud",
  };
}

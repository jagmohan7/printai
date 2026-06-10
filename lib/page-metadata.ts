import type { Metadata } from "next";

/**
 * Build product/landing page metadata with CMS overrides + fallbacks.
 *
 * Each product page's `generateMetadata()` calls this with the CMS seo
 * slice and its hardcoded fallbacks. Keeps the per-page generateMetadata
 * function tiny (3-5 lines) instead of duplicating ~40 lines of OG/Twitter
 * boilerplate across every product.
 *
 * Cascade:
 *   1. CMS `seo.title` / `seo.description` (when filled by editor)
 *   2. Hardcoded fallback (passed in by the page)
 */

interface BuildArgs {
  /** CMS-provided title (from sanity `seo.title`) */
  cmsTitle?: string | null;
  /** CMS-provided description (from sanity `seo.description`) */
  cmsDesc?: string | null;
  /** Fallback title baked into the page code */
  fallbackTitle: string;
  /** Fallback description baked into the page code */
  fallbackDesc: string;
  /** Canonical path (e.g. "/products/chatbots") */
  path: string;
  /** OG image path relative to printai.cloud. Default = /logo.png */
  ogImagePath?: string;
}

const SITE_URL = "https://printai.cloud";

export function buildProductMetadata({
  cmsTitle,
  cmsDesc,
  fallbackTitle,
  fallbackDesc,
  path,
  ogImagePath = "/logo.png",
}: BuildArgs): Metadata {
  const title       = cmsTitle?.trim() || fallbackTitle;
  const description = cmsDesc?.trim()  || fallbackDesc;
  const url         = `${SITE_URL}${path}`;
  const ogImage     = `${SITE_URL}${ogImagePath}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type:        "website",
      url,
      title:       `${title} | PrintAI`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       `${title} | PrintAI`,
      description,
      images:      [ogImage],
    },
  };
}

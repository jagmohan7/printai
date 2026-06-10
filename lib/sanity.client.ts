import { createClient } from "next-sanity";

/**
 * Studio URL used by stega to know where click-to-edit overlays should jump.
 * Falls back to the same origin in dev (admin at /admin on the same host).
 */
const STUDIO_URL =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
  (typeof window !== "undefined" ? `${window.location.origin}/admin` : "/admin");

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-10-01",
  useCdn: false, // false = always fresh data (good for live preview)
  token: process.env.SANITY_API_TOKEN,
  perspective: "published",

  // ── Stega: click-to-edit encoding ────────────────────────────────────────
  // Wraps every string value in invisible markers that the Visual Editing
  // overlay reads to map a clicked piece of content back to the Sanity doc
  // field. Turned ON in draft mode by the sanityFetch helper; OFF in
  // production-rendered pages to keep payloads clean.
  stega: {
    studioUrl: STUDIO_URL,
  },
});


import { defineLive } from "next-sanity/live";
import { client } from "./sanity.client";

/**
 * Live-query helpers for visual editing & Presentation Tool live updates.
 *
 * - `sanityFetch` — drop-in replacement for `client.fetch()` that supports
 *   draft mode and stega-encoded content (click-to-edit overlays).
 * - `SanityLive`  — React component that subscribes to Sanity's live API
 *   and re-renders pages when content changes. Must be rendered once in
 *   the root layout.
 *
 * Stega encoding wraps every string value with invisible markers that the
 * Visual Editing overlay reads to know which field to open when a piece of
 * content is clicked. Encoding is OFF in production by default; the route
 * handlers below flip it ON when draft mode is enabled.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // Token gives the server-side fetch read access for unpublished drafts.
    // Reuses the same env var the studio uses for writes.
    token: process.env.SANITY_API_TOKEN,
  }),
});

import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/lib/sanity.client";

/**
 * Enables Next.js draft mode for the Sanity Presentation Tool.
 *
 * Sanity Studio calls this endpoint with a signed URL when an editor opens
 * the Presentation tool. We validate the URL against the project's preview
 * secret (using the same Sanity client + token), then call draftMode().enable()
 * and redirect to the requested path.
 *
 * Once draft mode is on, server components read content via the live
 * sanity client (with stega encoding) so the editor sees:
 *   - Unsaved drafts in the iframe
 *   - Live updates as they type
 *   - Click-to-edit overlays via <VisualEditing />
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_TOKEN }),
});

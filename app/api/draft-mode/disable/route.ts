import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Disables Next.js draft mode.
 *
 * Called when the editor closes the Presentation tool or navigates outside
 * the preview iframe. Strips the draft cookie so subsequent page loads
 * serve the published content with no stega encoding.
 */
export async function GET(request: Request) {
  (await draftMode()).disable();

  const url     = new URL(request.url);
  const redirect = url.searchParams.get("redirect") || "/";

  return NextResponse.redirect(new URL(redirect, url.origin));
}

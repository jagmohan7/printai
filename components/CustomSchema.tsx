/**
 * Renders an editor-supplied JSON-LD schema block into the page <head>/HTML.
 *
 * Server component (no "use client") so the schema lands in the initial
 * server-rendered HTML — which is what Google reads.
 *
 * The SEO team pastes raw JSON-LD into the CMS "Custom Schema" field. We
 * tolerate either form:
 *   - just the JSON object/array   → rendered as-is
 *   - wrapped in <script ...>…</script> → wrappers stripped, inner JSON used
 *
 * When this renders, the page should SUPPRESS its built-in JSON-LD blocks
 * (handled per-page) so Google never sees duplicate schema.
 */
export default function CustomSchema({ raw }: { raw?: string | null }) {
  if (!raw || !raw.trim()) return null;

  // Strip a leading <script ...> and trailing </script> if the editor pasted them.
  const json = raw
    .trim()
    .replace(/^<script[^>]*>/i, "")
    .replace(/<\/script>\s*$/i, "")
    .trim();

  if (!json) return null;

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

/**
 * Convenience boolean: does this page have an editor-supplied schema?
 * Use it to decide whether to render the built-in schema blocks.
 */
export function hasCustomSchema(raw?: string | null): boolean {
  return Boolean(raw && raw.trim());
}

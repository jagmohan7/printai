/**
 * Shared helpers used by every CMS-driven section component.
 *
 * Keeps the per-component code small and consistent.
 */

/**
 * Split a heading at the first occurrence of `highlight` so it can be rendered
 * with the highlight word styled differently (gradient text).
 *
 * @example
 *   splitHeading("How PrintAI Chatbots Work", "Chatbots Work")
 *   // → ["How PrintAI ", "Chatbots Work", ""]
 *
 *   splitHeading("Hello world", "missing")
 *   // → ["Hello world", "", ""]
 */
export function splitHeading(heading: string, highlight?: string): [string, string, string] {
  if (!highlight) return [heading, "", ""];
  const idx = heading.indexOf(highlight);
  if (idx === -1) return [heading, "", ""];
  return [heading.slice(0, idx), highlight, heading.slice(idx + highlight.length)];
}

/**
 * Returns `provided` if it's a non-empty array, otherwise the fallback.
 * Saves the repetitive `(data?.foo && data.foo.length > 0) ? data.foo : FALLBACK.foo` pattern.
 */
export function pickArray<T>(provided: T[] | undefined | null, fallback: T[]): T[] {
  return provided && provided.length > 0 ? provided : fallback;
}

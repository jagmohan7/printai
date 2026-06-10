import * as LucideIcons from "lucide-react";
import { HelpCircle, type LucideIcon } from "lucide-react";

/**
 * Look up a Lucide icon component by string name (from CMS).
 *
 * The Sanity schema stores icons as plain strings ("Clock", "Database", etc.)
 * because storing React components in a CMS isn't possible. Section components
 * call this helper to resolve a string into the actual icon component for
 * rendering.
 *
 * Falls back to HelpCircle if the name doesn't match a Lucide icon — useful
 * for catching typos without breaking the page.
 */
export function getIcon(name?: string | null): LucideIcon {
  if (!name) return HelpCircle;
  const candidate = (LucideIcons as unknown as Record<string, LucideIcon>)[name];
  return candidate || HelpCircle;
}

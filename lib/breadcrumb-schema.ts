/**
 * Shared JSON-LD BreadcrumbList builder.
 *
 * Replaces the per-page hardcoded breadcrumbSchema objects across the 6
 * product pages with a single helper. Returns the schema.org-compliant
 * object ready to be stringified into a <Script type="application/ld+json">.
 *
 * Usage:
 *   const breadcrumbSchema = buildBreadcrumbSchema([
 *     { name: "Home",       path: "/" },
 *     { name: "Products",   path: "/#services" },
 *     { name: "AI Chatbot", path: "/products/chatbots" },
 *   ]);
 */

const SITE_URL = "https://printai.cloud";

export interface Crumb {
  /** Display name (e.g. "AI Chatbot") */
  name: string;
  /** Path relative to printai.cloud (e.g. "/products/chatbots") */
  path: string;
}

export function buildBreadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

/**
 * Convenience: typical product-page breadcrumb (Home → Products → <Product>).
 */
export function buildProductBreadcrumb(productName: string, productPath: string) {
  return buildBreadcrumbSchema([
    { name: "Home",     path: "/" },
    { name: "Products", path: "/#services" },
    { name: productName, path: productPath },
  ]);
}

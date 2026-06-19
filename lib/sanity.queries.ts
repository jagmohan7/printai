import { defineQuery } from "next-sanity";
import { sanityFetch } from "./sanity.live";

/**
 * All page data fetches go through `sanityFetch` so they:
 *   - Read drafts when Next.js draft mode is enabled (Presentation Tool)
 *   - Render stega-encoded strings for click-to-edit overlays
 *   - Auto-revalidate via Sanity's live API when content changes
 *
 * Queries are wrapped in `defineQuery()` so TypeScript types are inferred
 * from the GROQ string at build time.
 */

// ─── Site Settings (Navbar + Footer) ─────────────────────────────────────────
const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    brand {
      primaryColor,
      primaryDark,
      navyColor
    },
    navbar {
      productLinks[] { label, href },
      serviceLinks[] { label, href },
      ctaText,
      ctaHref
    },
    footer {
      tagline,
      socials[]      { label, href },
      quickLinks[]   { label, href },
      productLinks[] { label, href },
      serviceLinks[] { label, href },
      copyright
    }
  }
`);

export async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data as any;
}

// ─── Homepage ────────────────────────────────────────────────────────────────
const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage" && _id == "homepage"][0]{
    hero {
      badge,
      heading,
      headingHighlight,
      subtext,
      primaryButtonText,
      primaryButtonHref,
      secondaryButtonText,
      secondaryButtonHref,
      socials[] { label, href },
      review { score, label }
    },
    stats {
      items[] { value, label }
    },
    about {
      badge,
      heading,
      headingHighlight,
      subtext,
      whoWeAreP1,
      whoWeAreP2,
      highlights[],
      statBadge { value, label },
      primaryButtonText,
      primaryButtonHref,
      secondaryButtonText,
      secondaryButtonHref
    },
    services {
      badge,
      heading,
      headingHighlight,
      subtext,
      cards[] {
        title,
        iconName,
        description,
        href,
        badge,
        features[]
      }
    },
    how {
      eyebrow,
      heading,
      steps[] { title, description }
    },
    blogs {
      eyebrow,
      heading,
      viewAllText,
      viewAllHref
    },
    testimonials {
      eyebrow,
      heading,
      rating { score, count },
      reviews[] { quote, authorName, authorRole }
    },
    contactCta {
      eyebrow,
      heading,
      subtext,
      primaryButtonText,
      primaryButtonHref,
      secondaryButtonText,
      secondaryButtonHref,
      trustLabel
    },
    why {
      badge,
      heading,
      headingHighlight,
      subtext,
      features[] { title, desc }
    },
    contact {
      badge,
      heading,
      headingHighlight,
      subtext,
      email,
      socials[] { label, href },
      form {
        nameLabel, emailLabel, companyLabel, showCompany,
        serviceLabel, showService, messageLabel, buttonText, successMessage
      }
    },
    seo {
      title,
      description,
      customSchema
    }
  }
`);

export async function getHomepage() {
  const { data } = await sanityFetch({ query: HOMEPAGE_QUERY });
  return data as any;
}

// ─── Latest blog posts (auto-pulled from the Resources page insights) ───────
// The homepage Blogs band shows heading + view-all only; the cards come from
// here so editors never enter posts twice. No date field on insights yet, so
// "latest" = document order (first N).
const LATEST_RESOURCES_QUERY = defineQuery(`
  *[_id == "resources-page"][0].insights.items[]{
    title,
    "excerpt": description,
    "href": ctaHref,
    "category": "Insight"
  }
`);
export async function getLatestResources(limit = 3) {
  const { data } = await sanityFetch({ query: LATEST_RESOURCES_QUERY });
  const items = (data as Array<{ title: string; excerpt?: string; href?: string; category?: string }> | null) ?? [];
  return items.slice(0, limit).map((it) => ({
    title:    it.title,
    excerpt:  it.excerpt ?? "",
    href:     it.href || "/resources",
    category: it.category ?? "Insight",
    meta:     "",
  }));
}

// ─── Product pages — each fetches its own dedicated schema by doc ID ────────
//
// Shape used across all product pages: a single object with one nested object
// per section. Section objects are returned verbatim from the schema so the
// rendering components can read them as-is.

const CHATBOTS_QUERY = defineQuery(`*[_id == "chatbots-page"][0]{
  hero, problem, howItWorks, included, results, demo, faq, finalCta, seo,
  sharedCta { badge, heading, highlightWord, description, primaryText, primaryHref, secondaryText, secondaryHref, trustPoints[] }
}`);
export async function getChatbotsPage() {
  const { data } = await sanityFetch({ query: CHATBOTS_QUERY });
  return data as any;
}

const WEB_TO_PRINT_QUERY = defineQuery(`*[_id == "web-to-print-page"][0]{
  hero, problem, features, capabilities, beforeAfter, results, integrations, storeAudit, finalCta, seo,
  faq { heading, highlightWord, faqs[]{ question, answer } },
  sharedCta { badge, heading, highlightWord, description, primaryText, primaryHref, secondaryText, secondaryHref, trustPoints[] }
}`);
export async function getWebToPrintPage() {
  const { data } = await sanityFetch({ query: WEB_TO_PRINT_QUERY });
  return data as any;
}


const AUTOMATION_QUERY = defineQuery(`*[_id == "automation-page"][0]{
  hero, painPoints, whatWeAutomate, beforeAfter, results, integrations, implementation, cta, seo,
  faq { heading, highlightWord, faqs[]{ question, answer } },
  sharedCta { badge, heading, highlightWord, description, primaryText, primaryHref, secondaryText, secondaryHref, trustPoints[] }
}`);
export async function getAutomationPage() {
  const { data } = await sanityFetch({ query: AUTOMATION_QUERY });
  return data as any;
}

const DEVOPS_QUERY = defineQuery(`*[_id == "devops-page"][0]{
  hero, problems, costs, stats, process, benefits, builtFor, difference, impact, services, cta, seo,
  faq { heading, highlightWord, faqs[]{ question, answer } },
  sharedCta { badge, heading, highlightWord, description, primaryText, primaryHref, secondaryText, secondaryHref, trustPoints[] }
}`);
export async function getDevopsPage() {
  const { data } = await sanityFetch({ query: DEVOPS_QUERY });
  return data as any;
}

const CUSTOM_AI_QUERY = defineQuery(`*[_id == "custom-ai-page"][0]{
  hero, problems, systems, process, comparison, stats, included, faq, cta, seo,
  sharedCta { badge, heading, highlightWord, description, primaryText, primaryHref, secondaryText, secondaryHref, trustPoints[] }
}`);
export async function getCustomAiPage() {
  const { data } = await sanityFetch({ query: CUSTOM_AI_QUERY });
  return data as any;
}

// ─── About Us Page ────────────────────────────────────────────────────────────
const ABOUT_PAGE_QUERY = defineQuery(`*[_type == "aboutPage"][0]{
  hero {
    chip, heading, headingHighlight, subtext,
    primaryButtonText, primaryButtonHref,
    secondaryButtonText, secondaryButtonHref,
    trustItems[] { val, label },
    solutions[]
  },
  about {
    eyebrow, heading, headingHighlight, pullQuote,
    paragraph1, paragraph2, paragraph3,
    capabilities[] { icon, metric, title, desc }
  },
  story {
    heading, headingHighlight, intro, pullQuote,
    col1Para1, col1Para2, col2Para1, col2Callout
  },
  mvv {
    missionTitle, missionBody,
    visionTitle, visionBody,
    valuesTitle, values[]
  },
  future {
    eyebrow, heading, headingHighlight, subtext,
    primaryButtonText, primaryButtonHref,
    stats[] { val, label },
    features[] { icon, title, desc }
  },
  brands { eyebrow, heading, headingHighlight, logos[] },
  reviews { heading, subtext, googleScore, googleCount },
  cta {
    chip, heading, subtext,
    primaryButtonText, primaryButtonHref,
    secondaryButtonText, secondaryButtonHref,
    trustLine
  },
  seo { title, description }
}`);
export async function getAboutPage() {
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY });
  return data as any;
}

// ─── Other content pages ───────────────────────────────────────────────────

const CASE_STUDIES_QUERY = defineQuery(`*[_id == "case-studies-page"][0]{
  hero, cases, cta, seo
}`);
export async function getCaseStudiesPage() {
  const { data } = await sanityFetch({ query: CASE_STUDIES_QUERY });
  return data as any;
}

const RESOURCES_QUERY = defineQuery(`*[_id == "resources-page"][0]{
  hero, guides, insights, docs, cta, seo
}`);
export async function getResourcesPage() {
  const { data } = await sanityFetch({ query: RESOURCES_QUERY });
  return data as any;
}

// ─── Flexible Pages (page builder — terms, pricing, etc.) ───────────────────

const FLEX_PAGE_QUERY = defineQuery(`*[_type == "flexPage" && slug.current == $slug][0]{
  title, "slug": slug.current, sections, seo
}`);
export async function getFlexPage(slug: string) {
  const { data } = await sanityFetch({ query: FLEX_PAGE_QUERY, params: { slug } });
  return data as any;
}

const FLEX_PAGE_SLUGS_QUERY = defineQuery(`*[_type == "flexPage" && defined(slug.current)]{
  "slug": slug.current
}`);
export async function getAllFlexPageSlugs() {
  const { data } = await sanityFetch({ query: FLEX_PAGE_SLUGS_QUERY });
  return (data as Array<{ slug: string }> | null) ?? [];
}

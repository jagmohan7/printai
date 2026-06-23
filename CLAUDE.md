# PrintAI — Claude Code Guide

## Project Overview
PrintAI is a Next.js 16 marketing website for an AI automation company serving the printing industry. It has live pages (homepage + product/service pages + case studies + blog), built with TypeScript, Tailwind CSS v4, and Framer Motion. Sanity CMS is **fully integrated** — all pages fetch content from Sanity with ISR.

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 (`MotionInView` wrapper component) |
| Icons | Lucide React |
| CMS | Sanity CMS — fully wired (`sanityFetch` + `SanityLive` in layout) |
| Email | Resend + Nodemailer |
| Deployment | printai.cloud |

## Commands
```bash
npm run dev      # dev server (localhost:3000)
npm run build    # production build
npm run start    # start production server
npm run lint     # ESLint
```

To run on local network IP: `next dev --hostname 0.0.0.0`

## Project Structure
```
printai/
├── app/
│   ├── page.tsx                          # Homepage
│   ├── layout.tsx                        # Root layout (Navbar + Footer) — revalidate=60, try-catch on getSiteSettings
│   ├── blog/                             # Blog page (was /resources — 301 redirect in next.config.ts)
│   │   ├── page.tsx
│   │   └── BlogContent.tsx
│   ├── case-studies/page.tsx
│   ├── resources/page.tsx                # Old route — kept for legacy, /resources redirects → /blog
│   └── products/
│       ├── chatbots/page.tsx
│       ├── web-to-print/page.tsx
│       └── devops-infrastructure/page.tsx # Redirects → /products/devops
├── app/services/
│   ├── automation/page.tsx
│   ├── devops/page.tsx
│   └── custom-ai/page.tsx
├── components/
│   ├── Navbar.tsx                        # "Blog" nav item (href /blog), dropdown key "resources"
│   ├── Footer.tsx                        # "Blog" link (href /blog)
│   ├── SiteShell.tsx                     # Wraps layout — provides LeadModalProvider
│   ├── MotionInView.tsx                  # Framer Motion scroll animation wrapper
│   ├── modals/
│   │   ├── LeadModalContext.tsx          # useLeadModal() → openProductDemo(), openServiceConsultation()
│   │   ├── ProductDemoModal.tsx          # Theme-aware (CSS var tokens), removed order-volume/process fields
│   │   └── ServiceConsultationModal.tsx  # Theme-aware (CSS var tokens)
│   └── sections/
│       ├── chatbots/                     # 8 section files
│       │   ├── HeroChatbots.tsx          # Primary btn → openProductDemo(), secondary btn CMS-optional, right col = real image
│       │   └── DemoSection.tsx           # Right col = real image (CMS-replaceable)
│       ├── automation/                   # 8 section files
│       ├── web-to-print/                 # 9 section files
│       ├── devops/                       # 11 section files
│       └── custom-ai/                    # 9 section files
├── lib/
│   ├── sanity.live.ts                    # defineLive → sanityFetch + SanityLive
│   ├── sanity.queries.ts                 # All GROQ queries (getChatbotsPage, getResourcesPage, etc.)
│   ├── sanity.image.ts                   # urlFor() helper for Sanity image CDN URLs
│   ├── page-metadata.ts                  # buildProductMetadata() — accepts canonicalUrl override
│   └── section-utils.ts
├── public/
│   ├── logo.png
│   ├── images/
│   │   ├── chatbot-hero.jpg             # Default fallback for HeroChatbots right column
│   │   └── chatbot-demo.jpg             # Default fallback for DemoSection right column
│   └── logos/
├── sanity/
│   ├── schemas/
│   │   ├── homepage.ts
│   │   ├── resourcesPage.ts             # Sanity doc for /blog page (doc type stays "resourcesPage")
│   │   ├── caseStudiesPage.ts
│   │   ├── aboutPage.ts
│   │   ├── siteSettings.ts
│   │   └── products/
│   │       ├── chatbotsPage.ts          # Native image type for hero + demo illustrations
│   │       ├── automationPage.ts
│   │       ├── devopsPage.ts
│   │       ├── customAiPage.ts
│   │       └── webToPrintPage.ts
│   └── lib/
│       └── docRoutes.ts                 # resources-page → /blog URL + "Blog" label
└── next.config.ts                       # Redirects: /resources→/blog, /products/*→/services/*, etc.
```

## Design System

### CSS Token System (light/dark theme)
All theme-aware components use CSS variables set on `:root[data-theme]`:
```css
--pa-teal:      #673DE6   /* PRIMARY accent — purple (NOT blue despite the name) */
--pa-teal-deep: #4f2cb8   /* darker shade for gradients */
--pa-card:      flips light/dark
--pa-surface:   flips light/dark
--pa-ink:       flips light/dark (primary text)
--pa-ink-2:     flips light/dark (secondary text)
--pa-line:      flips light/dark (borders)
--pa-page:      flips light/dark (page background)
```
Theme stored in `localStorage` key `printai-theme`. Toggle reads/sets `data-theme` on `<html>`.

### Primary CTA Buttons
```css
background: linear-gradient(135deg, var(--pa-teal), var(--pa-teal-deep))
/* class: pa-btn-pri */
/* NEVER hardcode from-[#7c3aed] on primary buttons */
```

### Section Padding Classes (defined in globals.css)
```
section-hero     — hero sections (large top padding for navbar)
section-pad      — standard section padding
section-pad-sm   — smaller section padding
```

## Navigation Structure

### Navbar
**Products dropdown:** AI Chatbot (`/products/chatbots`), Web-to-Print (`/products/web-to-print`)
**Services dropdown:** Print Workflow Automation (`/services/automation`), DevOps (`/services/devops`), Custom AI Development (`/services/custom-ai`)
**Blog dropdown:** Blog (`/blog`), Case Studies (`/case-studies`), FAQs (`/faqs`)

### Footer — Four columns
1. Brand (logo + tagline + socials)
2. Company (Home, About Us, Contact)
3. Solutions (all products + services)
4. Resources (Blog → `/blog`, Case Studies, FAQs)

## Page → Route Map
| Page | Route | Sanity Doc ID |
|---|---|---|
| Homepage | `/` | `homepage` |
| AI Chatbot | `/products/chatbots` | `chatbots-page` |
| Web-to-Print | `/products/web-to-print` | `web-to-print-page` |
| Automation | `/services/automation` | `automation-page` |
| DevOps | `/services/devops` | `devops-page` |
| Custom AI | `/services/custom-ai` | `custom-ai-page` |
| Case Studies | `/case-studies` | `case-studies-page` |
| Blog | `/blog` | `resources-page` |

## Sanity CMS — Key Patterns

### Data fetching
```tsx
// In page.tsx (Server Component)
export const revalidate = 60;  // ISR — re-fetch every 60s
const cms = await getPageData();  // from lib/sanity.queries.ts
```

### Live updates
`SanityLive` is in `app/layout.tsx` (wrapped in `<Suspense fallback={null}>`).
Any page using `sanityFetch` auto-revalidates on Studio publish.

### CMS-replaceable images (chatbots page)
```tsx
// HeroChatbots + DemoSection — right column
<Image
  src={data?.image?.asset?._ref
    ? urlFor(data.image).width(900).auto("format").url()
    : "/images/chatbot-hero.jpg"}  // static fallback
  alt={data?.image?.alt ?? "fallback alt text"}
/>
```
Schema uses native Sanity `image` type with `alt` subfield — gives upload button in Studio.

### Canonical URL override (all page schemas)
Every page schema has a `canonicalUrl` field in its SEO tab. When set, it overrides the default canonical in `buildProductMetadata()`.

### Modal system
`LeadModalProvider` in `SiteShell.tsx`:
- `openProductDemo(productName)` — opens `ProductDemoModal`
- `openServiceConsultation(serviceName)` — opens `ServiceConsultationModal`
Both modals are fully theme-aware (CSS tokens, no hardcoded dark colors).

## Known Redirects (next.config.ts)
```
/resources                   →  /blog               (permanent — URL rename)
/products/automation         →  /services/automation (permanent)
/products/devops             →  /services/devops     (permanent)
/products/custom-ai          →  /services/custom-ai  (permanent)
/services/chatbots           →  /products/chatbots   (permanent)
/products/devops-infrastructure → /services/devops   (permanent)
```

## Key Config Notes
- `allowedDevOrigins: ["192.168.1.13", "*.ngrok-free.app"]` in `next.config.ts`
- `data-scroll-behavior="smooth"` on `<html>` — suppresses Next.js scroll warning
- Logo size: 36×36px in both Navbar and Footer
- `reactCompiler: true` in next.config.ts
- `revalidate = 60` on layout (was 5 — caused stream conflicts during navigation)
- `getSiteSettings()` in layout is wrapped in try-catch — Sanity failure falls back to hardcoded nav

## Recent Work Summary (last session)
1. **Theme-aware modals** — ProductDemoModal + ServiceConsultationModal use `var(--pa-*)` tokens
2. **Chatbot page** — Hero "Book a Free Demo" opens modal; secondary CTA optional via CMS; both right columns now use real images (CMS-replaceable via native Sanity image type)
3. **Schema cleanup** — removed dead `chatMessages`, `demoMessages`, `finalCta`, `sharedCta` fields from chatbotsPage; removed unused `socials`, `headingHighlight`, `contactCta`, `why` from homepage
4. **Blog rename** — `/resources` → `/blog` with 301 redirect; new `app/blog/` route; nav/footer/sitemap updated
5. **Canonical URL** — `canonicalUrl` field in SEO tab of ALL page schemas; wired into `buildProductMetadata()`
6. **Resilience** — layout revalidate 60s + try-catch on Sanity fetch

# PrintAI Homepage Redesign — Implementation Plan

> Converting the current dark/violet homepage → the new light-first **navy + teal** design
> from `PrintAI Wireframes (bundled).html` (the "Recommended Homepage" composition).
> **Constraint: keep all CMS functionality — replace UI/UX only.**

---

## 0 · What the new design actually is (decoded)

The wireframe bundle decodes to a React/Babel exploration with a **"Recommended Homepage"**
composition = the target. Key facts:

| Aspect | Current site | New design |
|---|---|---|
| Mode | Dark only (`#0a0b14`) | **Light-first**, with dark toggle (`[data-theme]`) |
| Brand | Violet `#7c3aed` → Cyan `#06b6d4` | Navy `#0B1628` + Teal `#13C07A` / `#0F6E56` |
| Fonts | Inter | Inter + **IBM Plex Mono** (eyebrows/labels) |
| Rhythm | Flat dark | white → navy → white → grey → white → navy (light/dark banding) |
| Sections | 5 (Hero, About, Services, Why, Contact) | **10** (see below) |

---

## 1 · Component Hierarchy

```
RootLayout (app/layout.tsx)          ← keep; swap theme tokens + fonts
└─ ThemeProvider (NEW, [data-theme])
   └─ SiteShell                      ← REUSE (adds theme toggle slot)
      ├─ Navbar                      ← REBUILD UI (keep CMS data wiring)
      ├─ <main>  →  HomePage (app/page.tsx)  ← recompose section order
      │   ├─ Hero               (home/Hero.tsx)
      │   ├─ Stats              (home/Stats.tsx)         ← NEW
      │   ├─ About              (home/About.tsx)
      │   ├─ Solutions          (home/Solutions.tsx)     ← was ServicesSection
      │   ├─ WhyPrintAI         (home/WhyPrintAI.tsx)    ← was WhySection (kept)
      │   ├─ HowItWorks         (home/HowItWorks.tsx)    ← NEW
      │   ├─ Blogs              (home/Blogs.tsx)          ← NEW (pulls from Resources)
      │   ├─ Testimonials       (home/Testimonials.tsx)  ← NEW (manual CMS)
      │   └─ ContactCTA         (home/ContactCTA.tsx)    ← was ContactSection
      └─ Footer                      ← REBUILD UI (keep CMS data wiring)

UI primitives (components/ui/, shared by all sections):
  Container · SectionHeading (Eyebrow+H) · Button · Chip · Card ·
  Check · StatNumber · GoogleRating · Logo · Social · ThemeToggle
```

---

## 2 · Section Hierarchy (the 10 bands, in order)

| # | Section | Background | Core content | Sub-components |
|---|---|---|---|---|
| — | **Navbar** | glass over hero → solid on scroll | Logo · nav (Home/About/Products▾/Services▾/Resources▾) · theme toggle · Contact(ghost) · Book Demo(primary) | Logo, NavLinks, Dropdown, ThemeToggle, Button |
| 1 | **Hero** | white | Eyebrow → H "Your Print Business. *Powered by AI.*" → sub → 2 CTAs → **Google trust card** + product image w/ 2 floating cards | TrustCard/GoogleRating, MiniCard, Button |
| 2 | **Stats** | navy band | 4 teal numerals (85% · 300% · 120K+ · 24/7) w/ dividers | StatNumber |
| 3 | **About** | white | image-left + floating "250+" stat card · story · **2×2 checklist** · 2 CTAs | Check, SectionHeading, Button |
| 4 | **Solutions** | grey | centered heading · **3 cards** (AI Chatbot / Web-to-Print / Workflow) icon→title→desc→3 bullets→Learn More | SolutionCard, SectionHeading |
| 5 | **Why PrintAI** *(KEPT)* | white | **4-feature grid** of differentiators (Reduce Time Wastage / Optimize Decisions / Unified Platform / 24/7 Support) | Card, SectionHeading |
| 6 | **How It Works** | grey | centered heading · **4-step timeline** (Connect→Configure→Automate→Scale) w/ connector line | StepNode, SectionHeading |
| 7 | **Blogs** | white | heading + "View all →" · **3 cards auto-pulled from Resources** (thumb + category chip + title + meta) | BlogCard, SectionHeading |
| 8 | **Testimonials** | grey | heading + Google aggregate (4.8 · 320+) · **3 review cards (manual CMS entries)** | ReviewCard, GoogleRating |
| 9 | **Contact CTA** | navy→teal gradient | centered Eyebrow → H "Ready to Automate…" → sub → 2 CTAs (Book Demo / Contact Sales) | Button, SectionHeading |
| 10 | **Footer** | navy | Logo + tagline + Social · 3 link columns (Company/Products/Resources) · Contact block · legal bar | Logo, FooterColumn, Social, ContactBlock |

> **Note:** banding re-alternates with the kept Why band → white·navy·white·grey·white·grey·white·grey·gradient·navy.

---

## 3 · Reusable Components (`components/ui/`)

These map 1:1 to the design's primitives (`Btn`, `Chip`, `H`, `Eyebrow`, etc.):

| Component | Purpose | Variants/props |
|---|---|---|
| `Container` | max-width + responsive padding wrapper | — |
| `SectionHeading` | Eyebrow (mono) + H + optional center | `center`, `size` |
| `Button` | all CTAs | `variant: primary \| deep \| ghost`, `size: sm \| md \| lg` |
| `Chip` | pills / feature tags | `teal` |
| `Card` | white surface + border + shadow | `hover` |
| `Check` | teal ✓ + label (about checklist, card bullets) | — |
| `StatNumber` | big teal numeral + label | `size`, `center` |
| `GoogleRating` | G-mark + 4.8 + stars + count (hero TrustCard & testimonials) | `compact` |
| `Logo` | PrintAI mark + wordmark | `variant: row \| stack \| word` |
| `Social` | social icon row (reuse current SVGs) | — |
| `ThemeToggle` | light/dark switch ([data-theme]) | — |

**Section-local components** (live beside their section, not in `ui/`):
`MiniCard`, `SolutionCard`, `StepNode`, `BlogCard`, `ReviewCard`, `Dropdown`, `FooterColumn`, `ContactBlock`.

---

## 4 · Sanity Schemas Required

**Principle:** the schema is the data contract. Keep existing field names so current CMS content
keeps flowing; **extend** for new sections. All new sections follow the existing
`data?.field ?? FALLBACK` + array-of-objects pattern (editors can add/remove items).

### Extend `homepage` schema groups

| Group | Action | Fields |
|---|---|---|
| `hero` | **extend** | add `rating` object: `score` (4.8), `reviewCount`, `trustLabel` ("Trusted by 250+…"); add `imageAlt` (product image is decorative for now) |
| `about` | **extend** | add `statBadge` ({ value:"250+", label }), keep `highlights` → render as 2×2 checklist; map `whoWeAreP1/P2` → story |
| `services` → relabel **"Solutions"** | **reuse as-is** | existing `cards[]` (title/icon/desc/href/features) already matches SolutionCard exactly ✅ |
| `stats` | **NEW group** | `heading?`, `items[]` of `{ value, label }` (4 default) |
| `how` | **NEW group** | `heading`, `eyebrow`, `steps[]` of `{ title, description }` |
| `testimonials` | **NEW group** | `heading`, `rating` ({score,count}), `reviews[]` of `{ quote, authorName, authorRole }` — **manual CMS entries** ✅ |
| `blogs` | **NEW group (light)** | only `heading` + `viewAllHref`. **Posts auto-pulled from the Resources page** — no posts[] array, no double entry ✅ |
| `contact` | **reuse** | drives Contact CTA + keeps `ContactForm` (lead capture intact) |
| `why` | **KEEP — promoted to a real band** ✅ | existing `features[]` (4 cards) render as the new "Why PrintAI" 4-feature grid |

### `siteSettings` — for theme + nav/footer
- `navbar` / `footer` — **already exist**, reuse.
- **NEW (optional, ties to your earlier CMS-color question):** `theme` object →
  `primaryColor`, `secondaryColor` (color-input) → injected as CSS vars in layout.
  This is the moment to bake in CMS-controlled brand colors, since we're rebuilding on CSS variables anyway.

### Decisions — RESOLVED ✅
1. **Blogs source** → **auto-pull latest 3 from the Resources page** (requires a `getLatestResources(3)` GROQ query; homepage only stores heading + view-all link).
2. **Testimonials** → **manual entries in CMS** (`reviews[]` of quote/author/role). Google API deferred.
3. **"Why PrintAI"** → **KEPT as its own band** (4-feature grid) → homepage is now **9 content sections** (10 incl. footer).

---

## 5 · Existing Components / Code That Can Be REUSED

| Reuse | Why |
|---|---|
| **All CMS plumbing** — `lib/sanity.queries.ts`, `sanity.live.ts`, `sanity.client.ts`, draft-mode routes, `sanity.types.ts` | Untouched. New fields just extend the GROQ query + types. |
| **`getHomepage()` query** | Extend projection for new groups — same fetch path. |
| **`SiteShell.tsx`** | Layout shell stays; add theme-toggle slot only. |
| **Navbar/Footer DATA wiring** (`siteSettings.navbar/footer`, `DEFAULT_*` fallbacks) | Keep the data + dropdown logic; only swap the JSX/classes. |
| **`ContactForm.tsx`** (submit logic, lead capture) | Reuse functionally; restyle inputs (`.input-dark` → light tokens). |
| **Social icon SVGs** (LinkedIn/Twitter/Facebook/Instagram) | Lift into `ui/Social.tsx` verbatim. |
| **`splitHeading()` highlight pattern** | New `SectionHeading` keeps the highlight-word mechanic. |
| **All 6 product/service pages + their sections** | **Out of scope** for Phase 1 — untouched. Restyle in a later pass. |
| **SEO group + `CustomSchema` + metadata** | Fully reused — no change. |

---

## 6 · Components That Must Be REBUILT

| Rebuild | From → To |
|---|---|
| **Theme** (`globals.css`) | dark `#0a0b14` + violet/cyan utilities → light navy/teal CSS-variable token set + `[data-theme="dark"]` overrides. Add IBM Plex Mono. |
| `HeroSection` → `home/Hero.tsx` | dark centered hero → light split hero + Google trust card + product image |
| `AboutSection` → `home/About.tsx` | → image-left + stat badge + 2×2 checklist |
| `ServicesSection` → `home/Solutions.tsx` | → 3-card grid, new card style (icon/title/desc/bullets/Learn More) |
| `ContactSection` → `home/ContactCTA.tsx` | → centered navy→teal gradient CTA (form stays via ContactForm) |
| `Navbar.tsx` | dark transparent → glass-over-hero, navy ink, teal CTA, + theme toggle |
| `Footer.tsx` | dark → navy 4-column + contact block + legal bar |
| **NEW**: `Stats`, `HowItWorks`, `Blogs`, `Testimonials` | built from scratch (no current equivalent) |
| **NEW**: `ThemeToggle`, all `ui/` primitives | new shared layer |

---

## 7 · Recommended Folder Structure

```
components/
├── ui/                      ← NEW shared primitives
│   ├── Container.tsx
│   ├── SectionHeading.tsx
│   ├── Button.tsx
│   ├── Chip.tsx
│   ├── Card.tsx
│   ├── Check.tsx
│   ├── StatNumber.tsx
│   ├── GoogleRating.tsx
│   ├── Logo.tsx
│   ├── Social.tsx
│   └── ThemeToggle.tsx
├── home/                    ← NEW homepage sections (new design)
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── About.tsx
│   ├── Solutions.tsx
│   ├── WhyPrintAI.tsx
│   ├── HowItWorks.tsx
│   ├── Blogs.tsx              (pulls latest 3 from Resources)
│   ├── Testimonials.tsx
│   └── ContactCTA.tsx
├── Navbar.tsx               ← rebuilt (data wiring kept)
├── Footer.tsx               ← rebuilt (data wiring kept)
├── SiteShell.tsx            ← reuse + theme slot
├── ContactForm.tsx          ← reuse + restyle
├── sections/                ← LEGACY product/service sections (untouched in P1)
└── …

app/
├── layout.tsx               ← fonts + theme vars + ThemeProvider
├── globals.css              ← new token system ([data-theme])
└── page.tsx                 ← recompose 9-section stack

sanity/schemas/
├── homepage.ts              ← extend: stats, how, testimonials, blogs groups
└── siteSettings.ts          ← optional theme colors
```

---

## Migration risks & findings (from full-project analysis)

**Safety anchor:** every section's prop interface (`data?: SanityHero`, etc.) is the contract.
Swap a component's *body* (markup/classes) without touching CMS, queries, or types → the
migration is **reversible per-component**. P1 leaves the old `components/sections/*` in place,
so a regressed section reverts by re-pointing `page.tsx` at the old component.

**A. Theme must be ADDITIVE, not a replacement.** ⚠️
The 6 product pages depend on the current dark theme (`bg-[#0a0b14]`, `.card-dark`, `.btn-gradient`,
violet `.badge`, `.ai-section`). Flipping the global `body`/`globals.css` to white would break them.
→ Add the new light navy/teal tokens **alongside** the old dark utilities; scope the new theme to the
homepage (and future redesigned pages). Retire the dark utilities only once all pages migrate.

**B. Resources isn't blog-shaped.** ⚠️
"Blogs pulls from Resources" hits a data gap: `resourcesPage` items (`guides`/`insights`/`docs`) have
`title + description + ctaText/Href` but **no image, category, or date** — BlogCard wants thumbnail +
category chip + read-time. → **P1:** render BlogCard with the new design's static look. **P2:** map
`insights[]` (title→title, description→excerpt, category="Insight", no thumb) *or* add 3 fields
(`image`, `category`, `date`) to the insights item (recommended for a real blog look).

**C. Footer dead code.** `Footer.tsx` has unused module-scope consts (`socials`, `quickLinks`,
`productLinks`, `serviceLinks`) — drop them during the rebuild.

**D. Navbar labels are hardcoded.** Only dropdown links + CTA come from CMS; the top-level nav labels
(Home/About/Products▾/…) live in the component. Keep that split unless top-level nav should become CMS-driven.

---

## Phased build order (suggested)

- **P1a — Theme foundation:** new `globals.css` tokens + Tailwind theme + fonts + `ThemeToggle`. *(unblocks everything)*
- **P1b — Primitives:** `components/ui/*`.
- **P1c — Shell:** Navbar + Footer rebuild.
- **P1d — Sections top→bottom:** Hero → Stats → About → Solutions → WhyPrintAI → HowItWorks → Blogs → Testimonials → ContactCTA (9 content bands).
- **P1 ships hardcoded-friendly** (every section has fallbacks → works with zero CMS).
- **P2 — CMS:** extend `homepage` schema + GROQ + types for the new groups (`stats`, `how`, `testimonials`, `blogs`); add `getLatestResources(3)` for Blogs; wire data props; (optional) CMS theme colors.

**Phase 1 = visual rebuild on current codebase, no CMS dependency** (matches your CEO message).
**Phase 2 = wire the new sections to Sanity** (extend, don't rebuild — the contract is preserved).

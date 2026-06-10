# PrintAI CMS — Task Board

> Sanity Studio polish for the PrintAI CMS at `localhost:3002/admin`.
> Goal: make the editor area look like a real, professional CMS (not the default Sanity "Untitled · Homepage" header).

---

## 🩹 The 3 problems we're solving

1. **"Untitled"** big text on every page → schema has no top-level title field, and `preview.prepare` returns a static string instead of reading actual content.
2. **"Homepage"** label on product pages → all 6 product pages share the `homepage` schema, so they all wear the "Homepage" badge.
3. **Tabs wrap to 2 rows** → 6 tabs (Hero / About / Services / Why PrintAI / Contact / SEO + All fields) don't fit on one line at default editor width.

---

## Phase 1 — Schema-level quick wins ⚡ ✅ DONE

**Biggest visual impact for least work. All changes in `sanity/schemas/homepage.ts`.**

- [x] Rename schema display title `Homepage` → `Landing Page` (kept internal `name` as `homepage` so no docs break)
- [x] Replace static `preview.prepare` with dynamic `select` → uses `pageLabel` → `seo.title` → `hero.heading` cascade
- [x] Add optional `pageLabel` field at top of schema → editors can set a CMS-only display name per page
- [x] Add a new `meta` group `⚙️ Page Info` for the `pageLabel` field
- [x] Add `media: DocumentTextIcon` to preview return → icon now appears in editor header
- [ ] Add `description` text to each group (deferred — Sanity 3 only supports per-field descriptions, not per-group; will revisit in Phase 5)

**Result:** header now reads `<page headline> · Landing Page` instead of `Untitled · Homepage`. Each of the 6 product pages shows its own hero heading. Editors can override with a custom `pageLabel` from the new "Page Info" tab.

---

## Phase 2 — Custom document header banner ✅ DONE

**Premium CMS header — pinned above the form on every tab.**

```
┌──────────────────────────────────────────────────────────┐
│  🤖  AI Chatbot Landing Page         [● Draft]           │
│      printai.com/products/chatbots · Edited 2h ago       │
│                                          [ Open Live ↗ ] │
└──────────────────────────────────────────────────────────┘
```

- [x] Create `sanity/components/PageHeaderField.tsx`
- [x] Read current doc via `useFormValue([])` hook
- [x] Show page emoji + name + URL slug + draft/published pill + last-edited time
- [x] Add "Open Live ↗" deep link button with gradient + hover lift
- [x] Wire into homepage schema as top-level field with `components.field` override
- [x] Map doc IDs → live URLs (`page-chatbots` → `/products/chatbots` etc.)
- [x] Show banner in **every tab** by listing all groups in the field's `group` array

**Result:** every landing page now has a branded header banner above the form fields, showing live URL, status pill, and a one-click "Open Live" link. Banner is read-only and visually distinct from form fields (gradient slate background, blue accent border).

### Phase 2b — Full header replacement ✅ DONE

**Banner now sits ABOVE the tabs and absorbs all of Sanity's default chrome.**

- [x] Move banner from field-level to form-level via `form.components.input` (new `FormInputWrapper.tsx`)
- [x] Hide Sanity's default doc-pane header entirely (no duplicate, no empty space)
- [x] Add **Share** button — copies live URL to clipboard with toast confirmation
- [x] Add **Maximize** button — toggles `data-phf-fullscreen` attribute that hides navbar + sidebar
- [x] Add **Actions menu** (⋯) with Duplicate / Copy Doc ID / Delete (uses `useClient` + `client.create/delete`)
- [x] Add **subtitle** ("Landing Page") next to URL
- [x] Add **toast notification** for share/duplicate/delete confirmations
- [x] Remove redundant `pageHeader` field from schema (banner is no longer a field)
- [x] Add **outside-click handler** to close the actions menu

**Final layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ 🏠 PrintAI…       [● Pub]     [↗] [⛶] [⋯]    [Open Live ↗]         │
│    Landing Page · printai.com/ · Edited 3d ago                      │
├─────────────────────────────────────────────────────────────────────┤
│ [Page Info] [Hero] [About] [Services] [Why] [Contact] [SEO]         │
├─────────────────────────────────────────────────────────────────────┤
│  Form fields for the active tab                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Phase 3 — Tab/group polish ✅ DONE

**6 tabs fit on a single row, with clear active-state hierarchy.**

- [x] Shorten tab titles: `💡 Why PrintAI` → `💡 Why Us`, `⚙️ Page Info` → `⚙️ Info`
- [x] Hide "All fields" tab (already hidden via CSS, confirmed working)
- [x] Add field-count badge per tab: `Hero (9)`, `About (7)`, `Services (5)`, `Why Us (5)`, `Contact (7)`, `SEO (2)` — counts baked into group titles
- [x] Active tab — 2px tech-blue underline gradient + subtle blue tint background + white text
- [x] Tighter padding (6px 10px) + 12.5px font + nowrap to keep all 7 tabs on one line
- [x] Horizontal-scroll fallback (thin blue scrollbar) for very narrow widths
- [x] Hover state: lighter slate background + brighter text
- [x] Confirmed group ordering: Info → Hero → About → Services → Why → Contact → SEO

---

## Phase 4 — Sanity Presentation Tool ✅ DONE (basic)

**Side-by-side editor + live preview iframe is live.**

```
┌──────────────┬───────────────────────────┐
│  Editor      │  🌐 Live Page Preview     │
│  Hero tab    │  (iframe of printai.com)  │
│  - headline  │                           │
│  - subhead   │  Click any field on left  │
│  - CTA       │  → opens the doc editor   │
└──────────────┴───────────────────────────┘
```

- [x] Created `sanity/lib/docRoutes.ts` — shared doc-ID ↔ URL / label / emoji maps (single source of truth, used by both banner + presentation tool)
- [x] Refactored `PageHeaderField.tsx` to import from shared `docRoutes.ts` (no more duplicate maps)
- [x] `presentationTool` import + plugin registered in `sanity.config.ts`
- [x] Tool appears in studio top-nav as "Live Preview" (with eye icon)
- [x] Configured `previewUrl.origin` from `NEXT_PUBLIC_SITE_URL` env var (falls back to `window.location.origin` or `localhost:3002`)
- [x] `resolve.locations` for all 7 landing-page docs — uses `pageLabel || seo.title || DOC_ID_TO_LABEL[id]` as the human label
- [x] `resolve.locations` for `siteSettings` (navbar/footer) — shown as global setting
- [x] `resolve.mainDocuments` — reverse map so clicking inside the iframe finds the right doc to open (covers all 7 routes)

### Phase 4b — Visual Editing ✅ DONE

Live updates + click-to-edit overlays + draft-mode preview are all wired.

- [x] Created `app/api/draft-mode/enable/route.ts` using `defineEnableDraftMode` from `next-sanity/draft-mode` (validates Sanity's signed preview URL automatically, no secret juggling)
- [x] Created `app/api/draft-mode/disable/route.ts` (calls `draftMode().disable()`, redirects)
- [x] Added `<VisualEditing />` to root layout, gated on `draftMode().isEnabled`
- [x] Added `<SanityLive />` to root layout — always-on subscription to Sanity's live API
- [x] Configured Sanity client with `stega: { studioUrl }` for click-to-edit encoding
- [x] Created `lib/sanity.live.ts` with `defineLive` setup (server-side token + live re-fetch)
- [x] Migrated `lib/sanity.queries.ts` from `client.fetch` to `sanityFetch` for both `getSiteSettings` and `getHomepage`
- [x] Wrapped queries in `defineQuery` for TypeScript inference
- [x] Wired `previewMode.enable: "/api/draft-mode/enable"` in `presentationTool` config
- [x] Bumped Sanity client `apiVersion` to `2024-10-01` (required for live queries)

---

## Phase 5 — Editorial polish ✅ DONE

**SEO + validation + help notes wired across the schema.**

- [x] **SEO Google snippet preview** — new `SeoPreviewField.tsx`. Live mockup of the search result, updates as editors type. Shows favicon + sitename + URL + title + description + a meta row with `Title: 42/60` and `Description: 138/160` character counts color-coded (green = good, amber = under-target, red = over limit).
- [x] **Character counters via validation rules** — Sanity auto-renders counters when `Rule.min/max` is set on text fields:
  - `seo.title` — required, 10-60 chars (error), warns at 50+
  - `seo.description` — required, 70-160 chars (error), warns at 155+
  - All section headings — required + 90-char warning cap
  - All badges — 60-char warning cap
  - All subtexts — 220-char warning cap
  - `contact.email` — required + regex email format
- [x] **Per-tab help notes** — added `description` to every top-level group object (`hero`, `about`, `services`, `why`, `contact`, `seo`). Sanity renders them as help text at the top of each tab.
- [x] **Validation badges (auto)** — because we added `Rule.required()` to key fields, Sanity automatically shows red dots on tabs with missing required content. No extra code needed.
- [ ] **Image hotspot/crop** — N/A in this schema, no `image` type fields exist yet (icons use `iconName` string + Lucide). Will revisit when image fields are added.

---

## 🎯 Recommended execution order

1. **Phase 1** (today) — fixes the ugly "Untitled · Homepage" header immediately
2. **Phase 3** (today) — tabs on 1 row, cleaner labels
3. **Phase 4** (before CEO demo) — Presentation Tool is what makes it feel like a $$$$ CMS
4. **Phase 2** (later) — custom header banner, after CEO buy-in
5. **Phase 5** (later) — editorial polish, optional

---

## Option A — 6 dedicated product page schemas ✅ DONE (schema/queries/structure)

**Foundation layer for full CMS coverage of all 6 product pages.**

- [x] **6 new schemas** under `sanity/schemas/products/` — chatbots, web-to-print, erpnext, automation, devops, custom-ai
  - Each schema mirrors its product page's actual sections (e.g. chatbots has Hero/Problem/HowItWorks/Included/Results/Demo/FAQ/FinalCTA — exact 1:1 match)
  - Each schema has `pageLabel`, `seo` group with live SERP preview, validation rules
  - Each is registered in `sanity/schemas/index.ts`
- [x] **Studio structure updated** — each product entry now uses its dedicated `schemaType` and a clean doc ID (`chatbots-page`, `web-to-print-page`, etc)
- [x] **`docRoutes.ts` expanded** — new `DOC_ID_TO_TYPE` map added, all doc-ID-keyed maps updated to use new IDs
- [x] **Presentation Tool locations** — now resolved for all 7 schema types (homepage + 6 products) via a single shared resolver
- [x] **6 GROQ queries** in `lib/sanity.queries.ts` — `getChatbotsPage`, `getWebToPrintPage`, `getErpnextPage`, `getAutomationPage`, `getDevopsPage`, `getCustomAiPage`
- [x] **Reference refactor** — `HeroChatbots.tsx` fully refactored with optional `data` prop + hardcoded fallbacks via `splitHeading()` helper
- [x] **Chatbots page.tsx** — converted to async server component, fetches CMS data, passes to Hero
- [ ] **Component refactoring** — 7 remaining chatbots sections + ~40 other-product sections still use hardcoded content. Tracked as task #11.

### Pattern for refactoring remaining components

Every section component should follow `HeroChatbots`'s shape:

```tsx
export interface FooSectionData {
  heading?: string;
  highlightWord?: string;
  items?: Array<{ icon?: string; title?: string }>;
  // ... mirror the schema's fields
}

interface Props { data?: FooSectionData | null }

const FALLBACK = {
  heading: "Existing hardcoded heading",
  // ... existing hardcoded values
};

export default function FooSection({ data }: Props) {
  const heading = data?.heading ?? FALLBACK.heading;
  // ... etc
  return <section>{heading}</section>;
}
```

Then in the product `page.tsx`:
```tsx
const cms = await getChatbotsPage();
<FooSection data={cms?.foo} />
```

### Remaining product pages (page.tsx files)

Same as chatbots: convert to `async`, fetch data, pass to sections. None are wired yet:
- `app/products/web-to-print/page.tsx`
- `app/products/erpnext/page.tsx`
- `app/products/automation/page.tsx`
- `app/products/devops/page.tsx`
- `app/products/custom-ai/page.tsx`

---


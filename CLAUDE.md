# PrintAI — Claude Code Guide

## Project Overview
PrintAI is a Next.js 16 marketing website for an AI automation company serving the printing industry. It has 8 live pages (homepage + 6 product/service pages + case studies + resources), built with TypeScript, Tailwind CSS v4, and Framer Motion. Sanity CMS integration is the next planned phase.

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 (`MotionInView` wrapper component) |
| Icons | Lucide React |
| CMS (planned) | Sanity CMS (`@sanity/client`, `next-sanity` already installed) |
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
│   ├── layout.tsx                        # Root layout (Navbar + Footer)
│   ├── case-studies/page.tsx
│   ├── resources/page.tsx
│   └── products/
│       ├── chatbots/page.tsx
│       ├── automation/page.tsx
│       ├── erpnext/page.tsx
│       ├── web-to-print/page.tsx
│       ├── devops/page.tsx               # NEW (was devops-infrastructure)
│       ├── devops-infrastructure/page.tsx # Redirects → /products/devops
│       └── custom-ai/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── MotionInView.tsx                  # Framer Motion scroll animation wrapper
│   └── sections/
│       ├── HeroSection.tsx               # Homepage hero
│       ├── AboutSection.tsx
│       ├── WhySection.tsx
│       ├── ContactSection.tsx
│       ├── ServicesSection.tsx           # Homepage services grid (6 cards)
│       ├── chatbots/                     # 8 section files
│       ├── automation/                   # 8 section files
│       ├── erpnext/                      # 9 section files
│       ├── web-to-print/                 # 9 section files
│       ├── devops/                       # 11 section files
│       └── custom-ai/                    # 9 section files
├── lib/
├── public/
│   └── logo.png
└── next.config.ts
```

## Design System

### Colors
```
Background base:     #070B14
Background alt:      #0B1220  (alternating sections)
Card background:     #0F172A
Border:              #1E293B
```

### Text Hierarchy
```
Primary:   #FFFFFF
Secondary: #94A3B8
Muted:     #64748B
```

### Gradient — Primary CTA Buttons (ALL pages, Figma spec)
```
from-[#3B82F6] to-[#06B6D4]   (blue → cyan)
hover: from-[#2563EB] to-[#0891b2]
shadow: rgba(59,130,246,0.4)
```
> ⚠️ Never use `from-[#7c3aed]` (purple) on primary CTA buttons — that was the old spec.

### Hover Glows
```
Blue:   rgba(59,130,246,0.2)
Cyan:   rgba(6,182,212,0.2)
Purple: rgba(139,92,246,0.2)  — decorative elements only
```

### Section Padding Classes (defined in globals.css)
```
section-hero     — hero sections (large top padding for navbar)
section-pad      — standard section padding
section-pad-sm   — smaller section padding
```

### Badge / Pill Pattern (hero sections)
```tsx
<span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[COLOR]/30 bg-[COLOR]/10 text-[COLOR] text-[12px] font-semibold tracking-widest uppercase mb-6">
  Badge Text
</span>
```

## Navigation Structure

### Navbar — Two dropdowns
**Products:** AI Chatbot, Web-to-Print Platform, ERPNext
**Services:** Print Workflow Automation, DevOps, Custom AI Development

### Footer — Four columns
1. Brand (logo + tagline + socials)
2. Quick Links (Home, About Us, Case Studies, Resources, Contact)
3. Products (AI Chatbot, Web-to-Print Stores, ERPNext Integration)
4. Services (Print Workflow Automation, DevOps, Custom AI Systems)

## Page → Route → Badge Text Map
| Page | Route | Hero Badge |
|---|---|---|
| AI Chatbot | `/products/chatbots` | AI Chatbot for Print Shops |
| Automation | `/products/automation` | Print Workflow Automation |
| ERPNext | `/products/erpnext` | ERPNext for Printers |
| Web-to-Print | `/products/web-to-print` | Web-to-Print Platform |
| DevOps | `/products/devops` | DevOps |
| Custom AI | `/products/custom-ai` | Custom AI Systems |

## Section Architecture
Each product page = `page.tsx` that imports multiple section components:
```
page.tsx (fetches data) → passes props → SectionComponent (renders)
```
- `page.tsx` handles metadata, JSON-LD schema, data fetching (future Sanity)
- Section components are presentational — layout + styles only
- **Never merge sections into a single file** — keep one file per section

## Alternating Section Backgrounds
Odd sections → `bg-[#070B14]`, Even sections → `bg-[#0B1220]`

## SEO Pattern (each product page)
```tsx
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website", url: URL, title: `${TITLE} | PrintAI`,
    images: [{ url: "https://printai.cloud/logo.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["https://printai.cloud/logo.png"] },
};
```
Each page also has: BreadcrumbList, Product, and FAQPage JSON-LD schemas.

## Known Redirects
```
/products/devops-infrastructure  →  /products/devops  (permanent)
/services/chatbots               →  /products/chatbots
/services/automation             →  /products/automation
```

## Planned: Sanity CMS Integration
- Packages already installed: `@sanity/client`, `next-sanity`, `@sanity/image-url`
- Strategy: One Sanity document per page (Option A)
- Start with homepage → then product pages one by one
- All text, links, alt tags, routes to be editable from Studio
- Live preview required

## Key Config Notes
- `allowedDevOrigins: ["192.168.1.13"]` in `next.config.ts` — allows HMR on LAN IP
- `data-scroll-behavior="smooth"` on `<html>` — suppresses Next.js scroll warning
- Logo size: 36×36px in both Navbar and Footer
- `reactCompiler: true` in next.config.ts

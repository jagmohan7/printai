# PrintAI — AI Automation for the Printing Industry

Marketing website for **PrintAI** — AI-powered automation solutions built specifically for print shops, commercial printers, and web-to-print businesses.

🌐 **Live:** [printai.cloud](https://printai.cloud)

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **CMS:** Sanity *(integration in progress)*
- **Email:** Nodemailer (SMTP via Hostinger)
- **Deployment:** printai.cloud

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run on local network (accessible via IP)
npx next dev --hostname 0.0.0.0

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Pages

| Page | Route |
|---|---|
| Homepage | `/` |
| AI Chatbot | `/products/chatbots` |
| Print Workflow Automation | `/products/automation` |
| ERPNext | `/products/erpnext` |
| Web-to-Print Platform | `/products/web-to-print` |
| DevOps | `/products/devops` |
| Custom AI Development | `/products/custom-ai` |
| Case Studies | `/case-studies` |
| Resources | `/resources` |

---

## Project Structure

```
printai/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout
│   └── products/           # Product & service pages
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── MotionInView.tsx    # Scroll animation wrapper
│   └── sections/           # Page sections (one file per section)
│       ├── chatbots/
│       ├── automation/
│       ├── erpnext/
│       ├── web-to-print/
│       ├── devops/
│       └── custom-ai/
├── lib/                    # Utilities
├── public/                 # Static assets
└── next.config.ts
```

---

## Environment Variables

Create a `.env.local` file in the root:

```env
# Email — Nodemailer via SMTP (Hostinger)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=hello@printai.cloud
SMTP_PASS=

# Sanity CMS (create project at sanity.io)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Google Analytics
NEXT_PUBLIC_GA_ID=
```

---

## Design System

**Background colors:**
- Base: `#070B14`
- Alternate sections: `#0B1220`
- Cards: `#0F172A`
- Borders: `#1E293B`

**Primary CTA gradient:** `from-[#3B82F6] to-[#06B6D4]` (blue → cyan)

---

## Redirects

| From | To |
|---|---|
| `/products/devops-infrastructure` | `/products/devops` |
| `/services/chatbots` | `/products/chatbots` |
| `/services/automation` | `/products/automation` |

---

## Roadmap

- [x] 6 product/service pages
- [x] Homepage with services section
- [x] Case Studies page
- [x] Resources page
- [x] SEO metadata + JSON-LD schemas
- [x] Navbar split into Products + Services dropdowns
- [ ] Sanity CMS — homepage content
- [ ] Sanity CMS — all product pages
- [ ] Sanity CMS — live preview
- [ ] Case study detail pages
- [ ] Resource guide pages

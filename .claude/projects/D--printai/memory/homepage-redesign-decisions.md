---
name: homepage-redesign-decisions
description: Non-obvious decisions made during the navy+teal homepage redesign
metadata:
  type: project
---

The homepage was rebuilt from the dark/violet theme to the light-first navy + teal design (per REDESIGN-PLAN.md). Two intentional deviations a future reader might mistake for bugs:

1. **No "Why PrintAI" band on the homepage.** Both the target screenshot and the user's step list (4→9: About, Solutions, How It Works, Blogs, Testimonials, Contact CTA) omit it, despite the plan saying "keep Why". `WhySection.tsx` still exists and the `why` group is still in the GROQ query/schema — just not rendered in `app/page.tsx`. Re-add `<WhySection data={data?.why} />` if it should come back.

2. **Contact form fields were kept (Name/Email/Company/Service/Message), not swapped to the mockup's First/Last-name layout.** This preserves the working `/api/contact` contract — only the styling was migrated to the light theme. Changing fields would require API + email-template changes.

Other notes: Solutions filters out any ERPNext card and shows the first 3 (`SolutionsSection.tsx`). Blogs cards are auto-pulled from Resources → Industry Insights via `getLatestResources(3)` (homepage only stores heading/view-all). The 404 page (`app/not-found.tsx`) still uses the old violet theme — out of scope for P1.

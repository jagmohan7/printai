/**
 * Seed script — pushes Navbar & Footer content to Sanity
 * Run: node scripts/seed-site-settings.mjs
 */
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token:     process.env.SANITY_API_TOKEN,
  useCdn:    false,
});

const siteSettings = {
  _type: "siteSettings",
  _id:   "siteSettings",

  navbar: {
    productLinks: [
      { _key: "chatbots",    label: "AI Chatbot",            href: "/products/chatbots" },
      { _key: "web",         label: "Web-to-Print Platform", href: "/products/web-to-print" },
      { _key: "erpnext",     label: "ERPNext",               href: "/products/erpnext" },
    ],
    serviceLinks: [
      { _key: "automation",  label: "Print Workflow Automation", href: "/services/automation" },
      { _key: "devops",      label: "DevOps",                    href: "/services/devops" },
      { _key: "custom-ai",   label: "Custom AI Development",     href: "/services/custom-ai" },
    ],
    ctaText: "Get Started",
    ctaHref: "/#contact",
  },

  footer: {
    tagline: "Leading AI Automation Solutions for the Printing Industry. Transform your operations with intelligent chatbots, ERPNext integration, and cutting-edge automation.",
    copyright: "PrintAI. All rights reserved.",
    socials: [
      { _key: "linkedin",  label: "LinkedIn",  href: "https://www.linkedin.com/company/printai" },
      { _key: "twitter",   label: "Twitter",   href: "https://twitter.com/printai" },
      { _key: "facebook",  label: "Facebook",  href: "https://www.facebook.com/printai" },
      { _key: "instagram", label: "Instagram", href: "https://www.instagram.com/printai" },
    ],
    quickLinks: [
      { _key: "home",    label: "Home",         href: "/#home" },
      { _key: "about",   label: "About Us",     href: "/#about" },
      { _key: "cases",   label: "Case Studies", href: "/case-studies" },
      { _key: "res",     label: "Resources",    href: "/resources" },
      { _key: "contact", label: "Contact",      href: "/#contact" },
    ],
    productLinks: [
      { _key: "chatbots", label: "AI Chatbot",          href: "/products/chatbots" },
      { _key: "web",      label: "Web-to-Print Stores",  href: "/products/web-to-print" },
      { _key: "erp",      label: "ERPNext Integration",  href: "/products/erpnext" },
    ],
    serviceLinks: [
      { _key: "auto",   label: "Print Workflow Automation", href: "/services/automation" },
      { _key: "devops", label: "DevOps",                    href: "/services/devops" },
      { _key: "ai",     label: "Custom AI Systems",         href: "/services/custom-ai" },
    ],
  },
};

async function seed() {
  console.log("⏳  Seeding site settings (Navbar & Footer)...");
  const result = await client.createOrReplace(siteSettings);
  console.log("✅  Site settings seeded successfully! Document ID:", result._id);
  console.log("\n    Go to /admin → Site Settings to see all fields filled in.\n");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  process.exit(1);
});

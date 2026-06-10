/**
 * Seed script — creates a CMS document for EVERY page so they all become
 * editable in the Studio + Live Preview.
 *
 * Run:  node scripts/seed-all-pages.mjs
 *
 * SAFE: uses `createIfNotExists` — it ONLY creates documents that don't
 * exist yet. It will NEVER overwrite a document you've already edited.
 *
 * Each doc is seeded with just `pageLabel` + `seo` (title/description).
 * All section fields are left empty on purpose, so every page keeps showing
 * its rich built-in fallback content on the live site. Editors then fill /
 * tweak sections via Live Preview as needed.
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const client = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token:      process.env.SANITY_API_TOKEN,
  useCdn:     false,
});

// ── One entry per page. SEO values fit Google limits (title ≤60, desc 70–160). ──
const PAGES = [
  {
    _id: "homepage", _type: "homepage", pageLabel: "PrintAI Homepage",
    seo: {
      title: "PrintAI — AI Automation for Print Shops",
      description: "AI chatbots, ERPNext, and print workflow automation that capture more leads, cut touch-time, and scale your printing business.",
    },
  },
  {
    _id: "chatbots-page", _type: "chatbotsPage", pageLabel: "AI Chatbot Page",
    seo: {
      title: "AI Chatbot for Print Shops",
      description: "AI chatbots trained on your pricing, turnaround, and file specs — answer customer questions instantly 24/7 and route complex jobs to your team.",
    },
  },
  {
    _id: "web-to-print-page", _type: "webToPrintPage", pageLabel: "Web-to-Print Page",
    seo: {
      title: "Web-to-Print Stores Built for Scale",
      description: "Web-to-print storefronts that handle real pricing, file uploads, finishing, and shipping logic without breaking under real order volume.",
    },
  },
  {
    _id: "erpnext-page", _type: "erpnextPage", pageLabel: "ERPNext Page",
    seo: {
      title: "ERPNext for Printers — One System",
      description: "Replace QuickBooks and spreadsheets with one ERPNext platform for jobs, inventory, billing, and CRM, purpose-built for print shops.",
    },
  },
  {
    _id: "automation-page", _type: "automationPage", pageLabel: "Print Workflow Automation Page",
    seo: {
      title: "Print Workflow Automation",
      description: "Automate order intake, prepress, scheduling, and fulfillment with systems built for real print operations — not generic workflows.",
    },
  },
  {
    _id: "devops-page", _type: "devopsPage", pageLabel: "DevOps Page",
    seo: {
      title: "DevOps Support for Print Businesses",
      description: "Keep your print systems fast, stable, and secure under heavy file uploads, traffic spikes, and complex production workflows.",
    },
  },
  {
    _id: "custom-ai-page", _type: "customAiPage", pageLabel: "Custom AI Development Page",
    seo: {
      title: "Custom AI Development for Print",
      description: "Custom AI systems trained on your workflows, pricing logic, and production rules — built for print, not borrowed from generic SaaS tools.",
    },
  },
  {
    _id: "case-studies-page", _type: "caseStudiesPage", pageLabel: "Case Studies Page",
    seo: {
      title: "Print AI Case Studies & Results",
      description: "Real results from printing businesses using AI automation, chatbots, ERPNext, and custom systems to grow revenue and cut costs.",
    },
  },
  {
    _id: "resources-page", _type: "resourcesPage", pageLabel: "Resources Page",
    seo: {
      title: "Print Automation Guides & Resources",
      description: "Guides, insights, and documentation to help you navigate AI automation and digital transformation for your printing business.",
    },
  },
];

async function run() {
  console.log(`\nSeeding ${PAGES.length} page documents (create-if-not-exists)…\n`);
  let created = 0;
  let skipped = 0;

  for (const page of PAGES) {
    try {
      const res = await client.createIfNotExists(page);
      // createIfNotExists returns the doc; detect if it was newly created by
      // checking _createdAt vs _updatedAt is unreliable, so we re-fetch count.
      // Simpler: assume success and log. (It never overwrites existing docs.)
      console.log(`✓  ${page._id.padEnd(20)} (${page._type})`);
      created++;
    } catch (err) {
      console.error(`✗  ${page._id} — ${err.message}`);
      skipped++;
    }
  }

  console.log(`\nDone. ${created} ensured, ${skipped} errored.`);
  console.log("Existing documents were left untouched (createIfNotExists).");
  console.log("All pages are now editable in the Studio + Live Preview.\n");
}

run().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});

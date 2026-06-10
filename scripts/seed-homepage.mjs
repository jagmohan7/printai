/**
 * Seed script — pushes correct homepage content to Sanity
 * Run: node scripts/seed-homepage.mjs
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

const homepage = {
  _type: "homepage",
  _id:   "homepage",

  // ── Hero ───────────────────────────────────────────────────────────────────
  hero: {
    badge:               "Leading AI Automation in Printing Industry",
    heading:             "Transform Your Printing Business with AI-Powered Automation",
    headingHighlight:    "Printing",
    subtext:             "Revolutionize your operations with intelligent chatbots, seamless ERPNext integration, and cutting-edge automation solutions that reduce time wastage and optimize decision making.",
    primaryButtonText:   "Get Started",
    primaryButtonHref:   "/#contact",
    secondaryButtonText: "Explore Solutions",
    secondaryButtonHref: "/#services",
    socials: [
      { _key: "linkedin",  label: "LinkedIn",  href: "https://www.linkedin.com/company/printai" },
      { _key: "twitter",   label: "Twitter",   href: "https://twitter.com/printai" },
      { _key: "facebook",  label: "Facebook",  href: "https://www.facebook.com/printai" },
      { _key: "instagram", label: "Instagram", href: "https://www.instagram.com/printai" },
    ],
  },

  // ── About ──────────────────────────────────────────────────────────────────
  about: {
    badge:            "About PrintAI",
    heading:          "Your Partner in Digital Transformation",
    headingHighlight: "Digital Transformation",
    subtext:          "We are a tech-enabled AI solutions provider creating custom strategies for printing businesses",
    whoWeAreP1:       "PrintAI is at the forefront of AI automation in the printing industry. We combine cutting-edge artificial intelligence with deep industry expertise to deliver solutions that transform how printing businesses operate.",
    whoWeAreP2:       "Our mission is to create a <strong>Single Source of Truth</strong> for your business operations using Frappe/ERPNext/CRM integration, custom chatbots, and intelligent automation that reduces time wastage and optimizes every decision you make.",
    highlights: [
      "One Stop Print Operation Partner",
      "Expert Team of 20+ Professionals",
      "Web-to-Print Specialists",
      "End-to-End Automation",
    ],
  },

  // ── Services ───────────────────────────────────────────────────────────────
  services: {
    badge:            "Our Services",
    heading:          "AI-Powered Solutions",
    headingHighlight: "Solutions",
    subtext:          "Comprehensive automation solutions tailored for the printing industry",
    cards: [
      { _key: "chatbot",    iconName: "MessagesSquare", title: "AI Chatbot",               href: "/products/chatbots",    description: "AI-powered chatbots trained on your print shop's pricing, turnaround times, and file specs — handle enquiries instantly, 24/7.",        features: ["Instant Quote Responses", "24/7 Customer Support", "Seamless Team Handoff"] },
      { _key: "web-to-print", iconName: "Globe",         title: "Web-to-Print Platform",    href: "/products/web-to-print", badge: "Most Popular", description: "Seamless online ordering systems with B2B ecommerce, product configurators, and marketplace integrations.", features: ["B2B Store Setup", "Product Configurator", "Marketplace Integrations"] },
      { _key: "erpnext",    iconName: "Database",        title: "ERPNext",                  href: "/products/erpnext",     description: "Replace disconnected tools with a single ERPNext platform — jobs, inventory, billing, and CRM in one place.",          features: ["Jobs & Inventory", "Billing & CRM", "Real-time Reporting"] },
      { _key: "automation", iconName: "Settings",        title: "Print Workflow Automation", href: "/services/automation",  description: "Automate order intake, prepress, scheduling, and fulfillment with systems built for real print operations.",            features: ["Order Intake Automation", "Job Scheduling", "Fulfillment Tracking"] },
      { _key: "devops",     iconName: "Server",          title: "DevOps",                   href: "/services/devops",      description: "Keep your print systems fast, stable, and secure under heavy file uploads, traffic spikes, and complex workflows.",    features: ["Scalable Infrastructure", "24/7 Monitoring", "Security Hardening"] },
      { _key: "custom-ai",  iconName: "Brain",           title: "Custom AI Development",    href: "/services/custom-ai",   description: "Bespoke AI systems designed around your specific print workflows — from predictive analytics to intelligent automation.", features: ["Tailored AI Models", "Predictive Analytics", "Full Integration Support"] },
    ],
  },

  // ── Why PrintAI ────────────────────────────────────────────────────────────
  why: {
    badge:            "Why PrintAI",
    heading:          "Single Source of Truth",
    headingHighlight: "Truth",
    subtext:          "Unify your printing operations with our integrated AI platform",
    features: [
      { _key: "w1", title: "Reduce Time Wastage",      desc: "Automate repetitive tasks and streamline workflows to save significant operational time." },
      { _key: "w2", title: "Optimize Decision Making", desc: "AI-powered insights help you make data-driven decisions faster and more accurately." },
      { _key: "w3", title: "Unified Platform",         desc: "Frappe/ERPNext integration creates one central hub for all your business data." },
      { _key: "w4", title: "24/7 AI Support",          desc: "Custom chatbots handle customer queries round the clock, never missing an opportunity." },
    ],
  },

  // ── Contact ─────────────────────────────────────────────────────────────────
  contact: {
    badge:            "Get In Touch",
    heading:          "Ready to Transform Your Business?",
    headingHighlight: "Transform",
    subtext:          "Let's discuss how PrintAI can automate your printing operations and drive growth.",
    email: "hello@printai.cloud",
    socials: [
      { _key: "linkedin",  label: "LinkedIn",  href: "https://www.linkedin.com/company/printai" },
      { _key: "twitter",   label: "Twitter",   href: "https://twitter.com/printai" },
      { _key: "facebook",  label: "Facebook",  href: "https://www.facebook.com/printai" },
      { _key: "instagram", label: "Instagram", href: "https://www.instagram.com/printai" },
    ],
    form: {
      nameLabel:      "Your Name",
      emailLabel:     "Email Address",
      companyLabel:   "Company Name",
      showCompany:    true,
      serviceLabel:   "Service Interest",
      showService:    true,
      messageLabel:   "Your Message",
      buttonText:     "Send Message",
      successMessage: "Message sent! We'll get back to you soon.",
    },
  },

  // ── SEO ────────────────────────────────────────────────────────────────────
  seo: {
    title:       "PrintAI – AI-Powered Automation for Printing Businesses",
    description: "AI chatbots, ERPNext integration, and end-to-end print workflow automation built for print shops.",
  },
};

async function seed() {
  console.log("⏳  Connecting to Sanity project:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

  const result = await client.createOrReplace(homepage);

  console.log("✅  Homepage document seeded successfully!");
  console.log("    Document ID:", result._id);
  console.log("\n    Go to your Studio and you will see all content filled in correctly.");
  console.log("    Refresh localhost:3000 to see it live on the frontend.\n");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  process.exit(1);
});

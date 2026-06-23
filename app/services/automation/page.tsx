import type { Metadata } from "next";
import Script from "next/script";
import HeroAutomation from "@/components/sections/automation/HeroAutomation";
import PainPointsSection from "@/components/sections/automation/PainPointsSection";
import WhatWeAutomateSection from "@/components/sections/automation/WhatWeAutomateSection";
import BeforeAfterSection from "@/components/sections/automation/BeforeAfterSection";
import AutomationResultsSection from "@/components/sections/automation/AutomationResultsSection";
import IntegrationsSection from "@/components/sections/automation/IntegrationsSection";
import HowWeImplementSection from "@/components/sections/automation/HowWeImplementSection";
import SolutionFaqSection from "@/components/shared/SolutionFaqSection";
import type { FaqItem }             from "@/components/shared/SolutionFaqSection";

const AUTOMATION_FAQ: { heading: string; highlightWord: string; faqs: FaqItem[] } = {
  heading:       "Frequently Asked Questions",
  highlightWord: "Questions",
  faqs: [
    {
      question: "What is print workflow automation?",
      answer:   "Print workflow automation is the use of software to replace manual handoffs between stages of print production — from order intake through prepress, press scheduling, production tracking, and fulfilment. In a manual print workflow, every stage requires a person to move information from one system to another: copying order data from email into MIS, sending proof approval emails, manually assigning jobs to presses, and creating shipping labels when jobs complete. PrintOpsAI's workflow automation covers all 5 stages: order intake, prepress, scheduling, production tracking, and fulfilment — connected in one system.",
    },
    {
      question: "What are the stages of print workflow automation?",
      answer:   "A fully automated print workflow covers 5 core production stages: 1. Order Intake & Routing — Customer submits order online, by email, or via B2B portal. The system validates the order, creates a job ticket, and routes it to the correct production queue. 2. Prepress & Preflight — Uploaded files are automatically checked for print readiness (DPI, bleed, colour mode, font embedding). Failed files trigger automated correction requests to the customer. 3. Production Scheduling — Jobs are dynamically assigned to the right press based on capacity, run length, and priority. Gang run opportunities are identified and changeovers minimised automatically. 4. Production Tracking — Barcode scanning at each workstation updates job status in real time. 5. Fulfillment & Shipping — When a job completes, shipping labels are generated, carriers are booked, and tracking numbers are sent to customers — all without manual intervention.",
    },
    {
      question: "What does prepress automation do in a print shop?",
      answer:   "Prepress automation replaces manual file checking with software that validates every uploaded file before it reaches your prepress team. A prepress automation system checks for: correct document dimensions with sufficient bleed (minimum 3mm), image resolution at or above 300 DPI, CMYK colour mode (flags RGB files that will shift colour on press), embedded fonts, and correct file format for your press. When a file fails any check, the system sends the customer a plain-English correction request automatically — without your prepress team getting involved. When a file passes, it is flagged as press-ready and moves to scheduling. Your prepress team only handles genuine exceptions — complex jobs, colour-critical work, and special substrates that require human judgment.",
    },
    {
      question: "How does automated print job scheduling work?",
      answer:   "Automated print job scheduling uses the job's specifications and your press capacity data to assign every incoming job to the optimal press automatically. The scheduling system considers: which presses are available and when, which press handles the job's substrate and print method, current queue depth on each press, job deadline and SLA priority, and opportunities to gang jobs with the same substrate and run length. Unlike manual scheduling on a whiteboard, automated scheduling optimises the entire queue — grouping jobs to minimise press changeovers, identifying gang run opportunities, and automatically adjusting when a rush job arrives without manually reshuffling the schedule.",
    },
    {
      question: "How much manual work can print workflow automation actually eliminate?",
      answer:   "PrintOpsAI clients typically reduce manual touch points per job by 40–55% after full workflow automation deployment. The specific tasks that automation eliminates include: order data entry from email or web form into MIS (20–30 min/order → 0), preflight file checking by prepress team (10–20 min/job → automated), manual press scheduling updates (1–2 hrs/day → automated), sending proof approval emails and chasing responses (ongoing → automated), creating shipping labels and booking carriers (5–10 min/job → 0), and answering 'where's my order?' calls (2–3 hrs/day CSR time → automated). A typical mid-size commercial print shop with 10–15 staff saves 20–30 hours of manual work per week after full deployment.",
    },
    {
      question: "How long does it take to automate a print shop workflow?",
      answer:   "A full print workflow automation deployment with PrintOpsAI typically takes 6–12 weeks from first audit to full rollout — depending on shop size and the number of integrations required. Week 1–2: Workflow Audit — we map your current process and produce a written automation plan. Week 3–6: Pilot Build — we automate the highest-impact stage first (usually order intake + prepress), test in your live environment with real jobs. Week 7–12: Full Rollout — remaining stages are automated one by one, staff are trained, and integrations with your MIS, ERP, and shipping tools are connected. We never automate everything at once — a staged rollout means zero disruption to your production. Most clients see measurable ROI within the first 90 days of full deployment.",
    },
  ],
};

import { getAutomationPage } from "@/lib/sanity.queries";
import CustomSchema, { hasCustomSchema } from "@/components/CustomSchema";

// Re-fetch CMS content every 5 seconds (auto-revalidation for live updates)
export const revalidate = 5;

import { buildProductMetadata } from "@/lib/page-metadata";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb-schema";

const TITLE = "Print Workflow Automation Software for Print Shops";
const DESCRIPTION =
  "Automate order intake, prepress, scheduling, and fulfillment with systems built for real print operations — not generic workflows.";
const PATH = "/services/automation";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getAutomationPage();
  return buildProductMetadata({
    cmsTitle:      cms?.seo?.title,
    cmsDesc:       cms?.seo?.description,
    fallbackTitle: TITLE,
    fallbackDesc:  DESCRIPTION,
    path:          PATH,
    canonicalUrl:  cms?.seo?.canonicalUrl,
  });
}

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",     path: "/" },
  { name: "Services", path: "/#services" },
  { name: "Workflow Automation", path: PATH },
]);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PrintOpsAI Workflow Automation",
  description: DESCRIPTION,
  brand: { "@type": "Brand", name: "PrintOpsAI" },
  url: `https://printai.cloud${PATH}`,
  image: "https://printai.cloud/logo.png",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is print workflow automation?",
      acceptedAnswer: { "@type": "Answer", text: "Print workflow automation replaces manual handoffs between print production stages — order intake, prepress, press scheduling, production tracking, and fulfilment — with software. PrintOpsAI connects all 5 stages in one continuous pipeline, eliminating manual re-entry and reducing order touch points by 40–55%." },
    },
    {
      "@type": "Question",
      name: "What are the stages of print workflow automation?",
      acceptedAnswer: { "@type": "Answer", text: "A fully automated print workflow covers 5 stages: 1. Order Intake & Routing, 2. Prepress & Preflight, 3. Production Scheduling, 4. Production Tracking, 5. Fulfillment & Shipping. PrintOpsAI automates all 5 and connects them into one continuous pipeline." },
    },
    {
      "@type": "Question",
      name: "What does prepress automation do in a print shop?",
      acceptedAnswer: { "@type": "Answer", text: "Prepress automation validates every uploaded file automatically — checking dimensions with bleed (min 3mm), resolution (min 300 DPI), CMYK colour mode, font embedding, and file format. Failed files trigger automated correction requests to the customer. Your prepress team only handles genuine exceptions." },
    },
    {
      "@type": "Question",
      name: "How does automated print job scheduling work?",
      acceptedAnswer: { "@type": "Answer", text: "Automated print job scheduling assigns every incoming job to the optimal press based on availability, substrate, queue depth, SLA priority, and gang run opportunities — optimising the entire queue, not just the next job. The schedule adjusts in real time when rush jobs arrive or jobs run long." },
    },
    {
      "@type": "Question",
      name: "How much manual work can print workflow automation actually eliminate?",
      acceptedAnswer: { "@type": "Answer", text: "PrintOpsAI clients reduce manual touch points per job by 40–55% after full deployment. A typical mid-size commercial print shop with 10–15 staff saves 20–30 hours of manual work per week — across order entry, preflight, scheduling, proof approval, shipping, and status calls." },
    },
    {
      "@type": "Question",
      name: "How long does it take to automate a print shop workflow?",
      acceptedAnswer: { "@type": "Answer", text: "Full print workflow automation with PrintOpsAI takes 6–12 weeks: Week 1–2 workflow audit, Week 3–6 pilot build (one high-impact stage), Week 7–12 full rollout. Staged deployment means zero disruption to live production. Most clients see measurable ROI within the first 90 days." },
    },
  ],
};

export default async function AutomationProductPage() {
  const cms = await getAutomationPage();
  return (
    <>
      {hasCustomSchema(cms?.seo?.customSchema) ? (
        <CustomSchema raw={cms?.seo?.customSchema} />
      ) : (
        <>
          <Script id="ld-breadcrumb-automation" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <Script id="ld-product-automation"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
          <Script id="ld-faq-automation"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </>
      )}

      <HeroAutomation           data={cms?.hero} />
      <PainPointsSection        data={cms?.painPoints} />
      <WhatWeAutomateSection    data={cms?.whatWeAutomate} />
      <BeforeAfterSection       data={cms?.beforeAfter} />
      <AutomationResultsSection data={cms?.results} />
      <IntegrationsSection      data={cms?.integrations} />
      <HowWeImplementSection    data={cms?.implementation} />
      <SolutionFaqSection       data={cms?.faq} defaults={AUTOMATION_FAQ} />
    </>
  );
}

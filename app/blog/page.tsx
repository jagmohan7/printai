import type { Metadata } from "next";
import { getResourcesPage } from "@/lib/sanity.queries";
import { pickArray } from "@/lib/section-utils";
import { buildProductMetadata } from "@/lib/page-metadata";
import CustomSchema from "@/components/CustomSchema";
import BlogContent from "./BlogContent";

const TITLE       = "Blog — PrintOpsAI";
const DESCRIPTION = "Guides, insights, and documentation to help you navigate AI automation for your printing business.";
const PATH        = "/blog";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getResourcesPage();
  return buildProductMetadata({ cmsTitle: cms?.seo?.title, cmsDesc: cms?.seo?.description, fallbackTitle: TITLE, fallbackDesc: DESCRIPTION, path: PATH, canonicalUrl: cms?.seo?.canonicalUrl });
}

export const revalidate = 60;

const FALLBACK_GUIDES = [
  { icon: "Play",       title: "Getting Started with Print Automation",  description: "A step-by-step guide to identifying automation opportunities in your print shop and building your first automated workflow.", ctaText: "Request Guide", ctaHref: "/#contact" },
  { icon: "FileText",   title: "Web-to-Print Implementation Checklist",  description: "Everything you need to prepare before, during, and after your web-to-print rollout — from catalogue setup to fulfilment.", ctaText: "Request Guide", ctaHref: "/#contact" },
  { icon: "BookMarked", title: "Chatbot ROI Calculator Guide",           description: "How to calculate the return on investment for deploying an AI chatbot in your printing business, with real benchmarks.",          ctaText: "Request Guide", ctaHref: "/#contact" },
];

const FALLBACK_INSIGHTS = [
  { title: "The Future of Print Operations: AI from Prepress to Delivery",    description: "A deep dive into how leading print businesses are transforming end-to-end operations — from automated prepress to intelligent customer service.", ctaText: "Request Report", ctaHref: "/#contact" },
  { title: "Digital Transformation Roadmap for Mid-Size Printers",            description: "A practical framework for print businesses starting their digital journey — how to sequence investments for quick wins while building toward full digital operations.", ctaText: "Request Report", ctaHref: "/#contact" },
  { title: "AI in Print: Benchmarks & ROI Data from 50+ Print Businesses",    description: "Aggregated data from PrintOpsAI clients showing average payback periods, accuracy improvements, and efficiency gains across different business sizes.", ctaText: "Request Report", ctaHref: "/#contact" },
];

const FALLBACK_DOCS = [
  { icon: "Code2",    title: "PrintOpsAI API Reference",      description: "Developer documentation for integrating PrintOpsAI automation APIs with your existing MIS, e-commerce, or ERP systems.",              ctaText: "View Docs", ctaHref: "/#contact", external: false },
  { icon: "BookOpen", title: "Chatbot Training Guide",        description: "Step-by-step instructions for training your AI chatbot on your pricing sheets, turnaround times, product catalogue, and FAQs.", ctaText: "View Docs", ctaHref: "/#contact", external: false },
];

export default async function BlogPage() {
  const cms = await getResourcesPage();

  const hero     = cms?.hero ?? { heading: "Blog", description: DESCRIPTION };
  const guides   = { heading: cms?.guides?.heading   ?? "Guides",             items: pickArray(cms?.guides?.items,   FALLBACK_GUIDES) };
  const insights = { heading: cms?.insights?.heading ?? "Industry Insights",  items: pickArray(cms?.insights?.items, FALLBACK_INSIGHTS) };
  const docs     = { heading: cms?.docs?.heading     ?? "Documentation",      items: pickArray(cms?.docs?.items,     FALLBACK_DOCS) };

  return (
    <>
      <CustomSchema raw={cms?.seo?.customSchema} />
      <BlogContent
        heroHeading={hero.heading}
        heroDescription={hero.description || DESCRIPTION}
        guidesLabel={guides.heading}
        insightsLabel={insights.heading}
        docsLabel={docs.heading}
        guides={guides.items}
        insights={insights.items}
        docs={docs.items}
      />
    </>
  );
}

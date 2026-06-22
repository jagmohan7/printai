import type { Metadata } from "next";
import Script from "next/script";
import CustomAIHeroSection      from "@/components/sections/custom-ai/CustomAIHeroSection";
import CustomAIProblemsSection   from "@/components/sections/custom-ai/CustomAIProblemsSection";
import CustomAISystemsSection    from "@/components/sections/custom-ai/CustomAISystemsSection";
import CustomAIProcessSection    from "@/components/sections/custom-ai/CustomAIProcessSection";
import CustomAIStatsSection      from "@/components/sections/custom-ai/CustomAIStatsSection";
import CustomAIIncludedSection   from "@/components/sections/custom-ai/CustomAIIncludedSection";
import CustomAIComparisonSection from "@/components/sections/custom-ai/CustomAIComparisonSection";
import SolutionFaqSection from "@/components/shared/SolutionFaqSection";
import SolutionCtaSection  from "@/components/shared/SolutionCtaSection";
import type { SolutionCtaDefaults } from "@/components/shared/SolutionCtaSection";
import type { FaqItem }             from "@/components/shared/SolutionFaqSection";

const CUSTOM_AI_FAQ: { heading: string; highlightWord: string; faqs: FaqItem[] } = {
  heading:       "Frequently Asked Questions",
  highlightWord: "Questions",
  faqs: [
    {
      question: "Why not just use ChatGPT or off-the-shelf AI tools for my print shop?",
      answer:   "ChatGPT and off-the-shelf AI tools are useful for generic tasks — writing product descriptions, answering standard FAQs, or generating marketing copy. They are not useful for print-specific operational intelligence. Pricing accuracy: ChatGPT cannot give an accurate quote for 500 business cards with soft-touch laminate, 4/4 printing, and a 3-day turnaround — because it doesn't have access to your price book, your machine rates, or your current material costs. It will give you a plausible-sounding number that will be wrong. Defect detection: ChatGPT cannot analyse a sheet coming off your press at production speed and identify a colour registration error. Computer vision for print defect detection requires a model trained on your specific press output — not a general-purpose language model. Workflow automation: ChatGPT cannot route a job to your optimal press, update your MIS, and trigger a shipping label when the job completes. That requires custom integration with your actual systems. Generic AI tools handle generic tasks well. PrintOpsAI custom AI handles the operational tasks that are specific to your print business and your workflow.",
    },
    {
      question: "What does a custom AI project cost for a print shop?",
      answer:   "PrintOpsAI builds custom AI systems for print shops at a fixed price between $15,000 and $75,000 — depending on system complexity, the number of integrations required, and the volume of training data. Typical project investment by type: AI Pricing Engine (single product line) $15,000–$25,000; AI Pricing Engine (full product catalogue) $25,000–$45,000; Intelligent Order Routing system $20,000–$40,000; AI Defect Detection (single press type) $25,000–$50,000; Custom Integration Layer (3–5 systems) $15,000–$30,000; Full AI Operations Platform $50,000–$75,000. This is a one-time investment — no ongoing licensing fees, no per-user charges, and no subscription costs after delivery. For context: a comparable project with a generic AI development company in the USA typically costs $150,000–$400,000 and takes 9–18 months — because they spend the first 3–6 months learning the print industry. PrintOpsAI starts from full print domain knowledge, which reduces both cost and timeline dramatically. All projects start with a free scoping call and a written fixed-price proposal.",
    },
    {
      question: "Do we own the source code when the project is complete?",
      answer:   "Yes — complete source code ownership is included with every PrintOpsAI custom AI project, at no additional cost. On project completion you receive: complete source code in your preferred repository (GitHub, GitLab, Bitbucket); full technical documentation and architecture diagrams; API documentation for every integration point; environment configuration files and deployment guides; and training documentation for your team. No licensing fees: the system runs without paying anyone — including PrintOpsAI — after delivery. No vendor dependency: if PrintOpsAI ceases to exist, your system keeps running. You can maintain, modify, and extend it with any development team. No subscription risk: your system cannot be turned off by a vendor decision, a pricing change, or a platform discontinuation. Most SaaS AI tools retain ownership of their models and code — meaning you are renting capability, not building an asset. PrintOpsAI custom AI is a permanent business asset that belongs entirely to you.",
    },
    {
      question: "How long does a custom AI project take from start to deployment?",
      answer:   "Most PrintOpsAI custom AI projects are fully deployed in 6–10 weeks from the scoping call — significantly faster than comparable projects with generic AI development companies. Week 1: Scoping call + written proposal. Week 1–2: Project kick-off, data collection, workflow mapping. Week 2–4: Proof of concept build + accuracy testing. Week 4: Client review and proof of concept sign-off. Week 5–8: Full production build + integration testing. Week 8–9: Staging environment testing + client review. Week 9–10: Production deployment + staff training. Week 10+: 30-day post-launch monitoring and support. Factors that extend the timeline: complex integration with legacy or proprietary systems; limited historical training data requiring a data collection phase; large product catalogues requiring extended proof of concept. Why we are faster: we don't spend the first 8–12 weeks learning the print industry — that knowledge is built into our team before your project starts.",
    },
    {
      question: "When should a print shop use custom AI instead of a SaaS tool?",
      answer:   "A print shop should consider custom AI when a specific operational problem is too complex, too specific, or too critical to be solved adequately by any available off-the-shelf product. Custom AI is the right choice when: your pricing has too many variables for standard tools (20+ pricing variables, custom substrates, or complex die-cut pricing); your workflow is too specific to fit a generic template; you need AI that integrates with your existing stack (legacy MIS, proprietary prepress systems, or a combination of tools that no pre-built integration covers); or you want to own the asset, not rent it. SaaS tools are right for standard workflows, common integrations, and problems that are well-solved by existing products. Custom AI is right for the problems that SaaS tools have tried and failed to solve for you.",
    },
    {
      question: "Can you build AI defect detection for a digital print operation?",
      answer:   "Yes — AI defect detection for digital printing is one of our most requested custom AI builds, particularly for high-volume digital print and packaging operations. Training phase: we collect samples of acceptable output and defective output from your specific press — colour shift, registration error, hickeys, streaking, banding, and substrate defects specific to your materials and print method. Model training: a computer vision model is trained on these images to recognise the visual signature of each defect type at your production resolution. Deployment: the model is integrated with your production workflow — either via camera-based inline inspection or via image capture at press delivery. Defects above your threshold trigger automatic alerts and optional production pause. Our print defect detection models achieve 94–98% accuracy on the defect types they are trained for — meaning almost no false positives and almost no missed defects reaching customers. For packaging printers, we also build AI inventory management systems that predict substrate consumption, auto-raise purchase orders before stockouts, and track waste by job type — typically achieving 95%+ stock accuracy and 50–60% reduction in emergency stock purchases.",
    },
  ],
};

const CUSTOM_AI_CTA: SolutionCtaDefaults = {
  badge:         "GET STARTED",
  heading:       "Tell Us the Workflow That's Breaking",
  highlightWord: "That's Breaking",
  description:   "We'll scope your custom AI solution in 48 hours — with clear problem, solution, timeline, and cost. Tell us the specific workflow, pricing calculation, or quality control problem that is costing your print shop the most time or money. We will respond within 48 hours with a written scoping proposal — including our recommended approach, estimated timeline, and fixed price.",
  primaryText:   "Book a Scoping Call",
  primaryHref:   "/#contact",
  secondaryText: "Talk to Sales",
  secondaryHref: "/#contact",
  trustPoints:   ["Free scoping call", "Written proposal within 48 hours", "Fixed price, no hourly billing"],
};
import { getCustomAiPage } from "@/lib/sanity.queries";
import CustomSchema, { hasCustomSchema } from "@/components/CustomSchema";

// Re-fetch CMS content every 5 seconds (auto-revalidation for live updates)
export const revalidate = 5;

import { buildProductMetadata } from "@/lib/page-metadata";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb-schema";

const TITLE       = "Custom AI Development for Print Shops | PrintOpsAI";
const DESCRIPTION = "PrintOpsAI builds custom AI systems for print shops — pricing engines, order routing, defect detection, and prepress intelligence. Fixed price. You own the source code. Live in 6–10 weeks.";
const PATH        = "/services/custom-ai";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCustomAiPage();
  return buildProductMetadata({
    cmsTitle:      cms?.seo?.title,
    cmsDesc:       cms?.seo?.description,
    fallbackTitle: TITLE,
    fallbackDesc:  DESCRIPTION,
    path:          PATH,
  });
}

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",     path: "/" },
  { name: "Services", path: "/#services" },
  { name: "Custom AI Systems", path: PATH },
]);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PrintOpsAI Custom AI Systems",
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
      name: "Why not just use ChatGPT or off-the-shelf AI tools for my print shop?",
      acceptedAnswer: { "@type": "Answer", text: "ChatGPT and off-the-shelf AI tools handle generic tasks well — they cannot handle print-specific operational intelligence. ChatGPT cannot generate an accurate quote using your price book and machine rates, analyse press output for colour registration errors, or route a job to your optimal press and update your MIS. Those tasks require custom integration with your actual systems and models trained on your specific data. PrintOpsAI custom AI handles the operational tasks specific to your print business and workflow." },
    },
    {
      "@type": "Question",
      name: "What does a custom AI project cost for a print shop?",
      acceptedAnswer: { "@type": "Answer", text: "PrintOpsAI builds custom AI systems for print shops at a fixed price between $15,000 and $75,000 — depending on complexity and integrations. Typical investment: AI Pricing Engine (single line) $15K–$25K; full catalogue pricing engine $25K–$45K; Intelligent Order Routing $20K–$40K; AI Defect Detection $25K–$50K; Full AI Operations Platform $50K–$75K. One-time fixed price — no ongoing licensing fees. A comparable generic AI development company project typically costs $150K–$400K and takes 9–18 months. All projects start with a free scoping call." },
    },
    {
      "@type": "Question",
      name: "Do we own the source code when the project is complete?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — complete source code ownership is included with every PrintOpsAI custom AI project at no additional cost. You receive: complete source code in your preferred repository, full technical documentation, API documentation for every integration point, and training documentation for your team. No licensing fees. No vendor dependency. If PrintOpsAI ceases to exist, your system keeps running. Most SaaS AI tools retain ownership of their models — meaning you rent capability rather than build a permanent asset." },
    },
    {
      "@type": "Question",
      name: "How long does a custom AI project take from start to deployment?",
      acceptedAnswer: { "@type": "Answer", text: "Most PrintOpsAI custom AI projects deploy in 6–10 weeks from the scoping call. Week 1: scoping call + written proposal. Weeks 2–4: proof of concept build + accuracy testing. Week 4: client sign-off. Weeks 5–8: full production build + integration testing. Weeks 9–10: staging review + production deployment + staff training. Week 10+: 30-day post-launch monitoring. We are faster than generic AI development companies because we start with full print domain knowledge, not a learning curve." },
    },
    {
      "@type": "Question",
      name: "When should a print shop use custom AI instead of a SaaS tool?",
      acceptedAnswer: { "@type": "Answer", text: "Custom AI is the right choice when: your pricing has 20+ variables that standard estimating software cannot handle accurately; your workflow is too specific for a generic template; you need AI that integrates with a legacy MIS, proprietary prepress system, or tool combination no pre-built connector covers; or you want to own the asset permanently rather than rent a subscription. SaaS tools are right for standard workflows and well-solved problems. Custom AI is right for the problems SaaS tools have tried and failed to solve for you." },
    },
    {
      "@type": "Question",
      name: "Can you build AI defect detection for a digital print operation?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — AI defect detection for digital printing is one of our most requested custom AI builds. We collect acceptable and defective press output samples (colour shift, registration error, hickeys, streaking, banding), train a computer vision model on your specific press output, and deploy it into your production workflow via inline inspection or image capture at press delivery. Our models achieve 94–98% accuracy on the defect types they are trained for. For packaging printers, we also build AI inventory management systems that predict substrate consumption and auto-raise purchase orders — typically achieving 95%+ stock accuracy and 50–60% reduction in emergency purchases." },
    },
  ],
};

export default async function CustomAIPage() {
  const cms = await getCustomAiPage();
  return (
    <>
      {hasCustomSchema(cms?.seo?.customSchema) ? (
        <CustomSchema raw={cms?.seo?.customSchema} />
      ) : (
        <>
          <Script id="ld-breadcrumb-custom-ai" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <Script id="ld-product-custom-ai"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
          <Script id="ld-faq-custom-ai"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </>
      )}
      <>
        <CustomAIHeroSection       data={cms?.hero} />
        <CustomAIProblemsSection   data={cms?.problems} />
        <CustomAISystemsSection    data={cms?.systems} />
        <CustomAIProcessSection    data={cms?.process} />
        <CustomAIStatsSection      data={cms?.stats} />
        <CustomAIIncludedSection   data={cms?.included} />
        <CustomAIComparisonSection data={cms?.comparison} />
        <SolutionCtaSection defaults={CUSTOM_AI_CTA} data={cms?.sharedCta} modalType="service" entityName="Custom AI Development" />
        <SolutionFaqSection data={cms?.faq} defaults={CUSTOM_AI_FAQ} />
      </>
    </>
  );
}

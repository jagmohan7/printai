import type { Metadata } from "next";
import Script from "next/script";
import DevOpsHeroSection       from "@/components/sections/devops/DevOpsHeroSection";
import DevOpsBuiltForSection    from "@/components/sections/devops/DevOpsBuiltForSection";
import DevOpsDifferenceSection  from "@/components/sections/devops/DevOpsDifferenceSection";
import DevOpsProblemsSection    from "@/components/sections/devops/DevOpsProblemsSection";
import DevOpsCostSection        from "@/components/sections/devops/DevOpsCostSection";
import DevOpsServicesSection    from "@/components/sections/devops/DevOpsServicesSection";
import DevOpsStatsSection       from "@/components/sections/devops/DevOpsStatsSection";
import DevOpsBenefitsSection    from "@/components/sections/devops/DevOpsBenefitsSection";
import DevOpsImpactSection      from "@/components/sections/devops/DevOpsImpactSection";
import DevOpsProcessSection     from "@/components/sections/devops/DevOpsProcessSection";
import SolutionFaqSection from "@/components/shared/SolutionFaqSection";
import type { FaqItem }             from "@/components/shared/SolutionFaqSection";

const DEVOPS_FAQ: { heading: string; highlightWord: string; faqs: FaqItem[] } = {
  heading:       "Frequently Asked Questions",
  highlightWord: "Questions",
  faqs: [
    {
      question: "What is DevOps for a print business?",
      answer:   "DevOps for a print business means managing the technology infrastructure that keeps your web store, AI chatbot, workflow automation, and print management systems running reliably — 24 hours a day, 7 days a week. For a print shop, DevOps covers: server management and hosting, automated deployment pipelines (so updates don't break your live store), 24/7 monitoring and alerting, large file handling configuration for 2GB+ print files, backup and disaster recovery, security management, and integration reliability between your connected systems. Most print shop owners don't think about DevOps until something breaks. A store crashes during a campaign. Files stop uploading. The MIS goes down mid-shift. These are all DevOps failures — and they are all preventable. PrintOpsAI's DevOps service is built specifically for print businesses, not adapted from a generic IT managed services template.",
    },
    {
      question: "What infrastructure does a web-to-print store need?",
      answer:   "A web-to-print store needs infrastructure significantly more robust than a standard ecommerce website — because print adds file-heavy complexity that generic hosting cannot handle. The specific infrastructure requirements for a web-to-print store include: File Handling: Server configured for 2GB+ uploads with chunked transfer and extended timeout windows (standard hosting times out at 30 seconds). Auto-Scaling: Capacity that expands automatically during campaign traffic spikes and returns to baseline afterward — print shops experience 5–10x normal traffic during promotional periods. CDN (Content Delivery Network): Product catalogue images and configurator assets served from the server geographically closest to the visitor — cutting load times by 40–60%. Database Performance: Web-to-print product configurators run complex pricing queries on every spec change — unoptimised databases make configurators slow and unusable. Integration Reliability: The web store must stay connected to your MIS, ERP, shipping, and payment systems reliably — each integration is a potential failure point that requires active monitoring.",
    },
    {
      question: "What does 99.9% uptime mean for a print shop website?",
      answer:   "99.9% uptime means your print shop website is unavailable for less than 9 hours per year — an average of less than 45 seconds per day. For a print shop doing $1M+ in annual online revenue, the business impact of uptime levels is significant: 99.9% uptime (enterprise grade) means under 9 hours downtime per year. 99.5% uptime (average managed hosting) means 43.8 hours per year. 99.0% uptime (basic hosting) means 87.6 hours per year. For a shop doing $1M annually, 87.6 hours of downtime represents $10,000–$25,000 in lost orders per year. Most basic hosting plans offer 99.0–99.5% — not the 99.9% they claim. PrintOpsAI's infrastructure is built on AWS with load balancing and auto-failover configured to maintain 99.9% uptime — the same standard as enterprise cloud providers, applied specifically to print environments.",
    },
    {
      question: "Why do large print files fail to upload on our website?",
      answer:   "Large print files fail to upload most commonly because of server timeout configuration — the server stops waiting for the file to arrive before the upload is complete. Standard web hosting has a timeout of 30–60 seconds. A 500MB PDF on a customer's 20Mbps internet connection takes approximately 200 seconds to upload. The server closes the connection before the file arrives. Additional causes include: PHP max upload size (default is 2MB on most hosting — completely inadequate for print files, must be configured to 2GB+); server memory limit (insufficient memory causes uploads to fail mid-transfer for large files even when timeout is extended); and missing chunked upload protocol (without it, a dropped connection restarts from the beginning rather than from the last successful chunk). PrintOpsAI configures all three for every client: extended timeouts, 2GB+ upload limits, and chunked upload with retry logic — so customers can upload print files up to 2GB reliably, every time.",
    },
    {
      question: "How should a print shop back up its website and production data?",
      answer:   "A print shop should back up four distinct data categories — and test the restoration of each one at least quarterly. 1. Database backup: All order data, customer records, product configurations, and pricing — backed up daily with 30-day retention, stored in a geographically separate location from the primary server. 2. Customer file storage: All uploaded artwork, approved proofs, and production files — AWS S3 with versioning enabled provides cost-effective, redundant storage with point-in-time recovery. 3. Application code: All web store themes, custom plugins, automation scripts, and configuration — stored in version control (Git) with documented deployment procedures. 4. Environment configuration: Server settings, environment variables, integration credentials, and DNS configuration — encrypted backup updated after every infrastructure change. The most important thing most print shops don't do: test the restoration. A backup that has never been restored is an assumption, not a guarantee. PrintOpsAI tests restoration procedures for every client environment quarterly and documents the recovery time achieved.",
    },
    {
      question: "Does my print shop actually need managed DevOps, or can I manage it myself?",
      answer:   "It depends on your technical team, your risk tolerance, and how much of your revenue depends on your digital systems being available. You probably don't need managed DevOps if: your website is a brochure site with a basic contact form, you take orders by phone or email rather than through an online store, or you have an in-house developer who actively manages infrastructure. You probably do need managed DevOps if: more than 20% of your revenue comes from online orders, you run a web-to-print store, AI chatbot, or workflow automation, you have B2B clients who depend on always-on portal access, your team cannot fix a server issue at 11pm on a Saturday, or your last major system problem took more than 4 hours to resolve. Most print shops that have automated their operations have significant revenue exposure to infrastructure failure — and no in-house team to respond when something breaks outside business hours. PrintOpsAI's free infrastructure audit will tell you honestly whether you need managed support, partial support, or just some configuration improvements you can make yourself.",
    },
  ],
};

import { getDevopsPage } from "@/lib/sanity.queries";
import CustomSchema, { hasCustomSchema } from "@/components/CustomSchema";

// Re-fetch CMS content every 5 seconds (auto-revalidation for live updates)
export const revalidate = 5;

import { buildProductMetadata } from "@/lib/page-metadata";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb-schema";

const TITLE       = "Print Shop DevOps & Infrastructure Support | PrintOpsAI";
const DESCRIPTION = "Ensure your print systems stay fast, stable, and secure — even under heavy file uploads, traffic spikes, and complex workflows.";
const PATH        = "/services/devops";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getDevopsPage();
  return buildProductMetadata({
    cmsTitle:      cms?.seo?.title,
    cmsDesc:       cms?.seo?.description,
    fallbackTitle: TITLE,
    fallbackDesc:  DESCRIPTION,
    path:          PATH,
    canonicalUrl:  cms?.seo?.canonicalUrl,
  });
}

// DevOps lives under "Services" instead of "Products"
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",     path: "/" },
  { name: "Services", path: "/#services" },
  { name: "DevOps",   path: PATH },
]);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PrintOpsAI DevOps Support",
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
      name: "What is DevOps for a print business?",
      acceptedAnswer: { "@type": "Answer", text: "DevOps for a print business means managing the technology infrastructure that keeps your web store, AI chatbot, workflow automation, and print management systems running reliably — 24 hours a day, 7 days a week. It covers server management, automated deployment pipelines, 24/7 monitoring, large file handling for 2GB+ print files, backup and disaster recovery, security management, and integration reliability. PrintOpsAI's DevOps service is built specifically for print businesses, not adapted from a generic IT managed services template." },
    },
    {
      "@type": "Question",
      name: "What infrastructure does a web-to-print store need?",
      acceptedAnswer: { "@type": "Answer", text: "A web-to-print store needs: file handling configured for 2GB+ uploads with chunked transfer and extended timeout windows; auto-scaling capacity that expands during campaign traffic spikes (print shops experience 5–10x normal traffic during promotions); a CDN cutting load times by 40–60%; optimised database performance for complex pricing queries; and active integration monitoring across MIS, ERP, shipping, and payment systems." },
    },
    {
      "@type": "Question",
      name: "What does 99.9% uptime mean for a print shop website?",
      acceptedAnswer: { "@type": "Answer", text: "99.9% uptime means less than 9 hours of downtime per year. For a print shop doing $1M+ in annual online revenue, the difference between 99.9% and 99.0% uptime (basic hosting) represents $10,000–$25,000 in lost orders per year. PrintOpsAI's infrastructure is built on AWS with load balancing and auto-failover to maintain the 99.9% SLA." },
    },
    {
      "@type": "Question",
      name: "Why do large print files fail to upload on our website?",
      acceptedAnswer: { "@type": "Answer", text: "Large print file upload failures are most commonly caused by: server timeout configuration (standard hosting times out at 30–60 seconds; a 500MB PDF can take 200 seconds to upload); PHP max upload size set to 2MB by default; insufficient server memory; and missing chunked upload protocol. PrintOpsAI configures extended timeouts, 2GB+ upload limits, and chunked upload with retry logic for every client." },
    },
    {
      "@type": "Question",
      name: "How should a print shop back up its website and production data?",
      acceptedAnswer: { "@type": "Answer", text: "A print shop should back up four categories: database (daily, 30-day retention, geographically separate location); customer file storage (AWS S3 with versioning); application code (Git version control with documented deployment procedures); and environment configuration (encrypted backup updated after every infrastructure change). Critically, backups must be tested quarterly — a backup that has never been restored is an assumption, not a guarantee." },
    },
    {
      "@type": "Question",
      name: "Does my print shop actually need managed DevOps, or can I manage it myself?",
      acceptedAnswer: { "@type": "Answer", text: "You probably need managed DevOps if: more than 20% of your revenue comes from online orders, you run a web-to-print store or workflow automation, you have B2B clients who need always-on portal access, your team cannot respond to server issues at 11pm, or your last major system problem took more than 4 hours to resolve. PrintOpsAI's free infrastructure audit will tell you honestly whether you need managed support, partial support, or just some configuration improvements you can make yourself." },
    },
  ],
};

export default async function DevOpsPage() {
  const cms = await getDevopsPage();
  return (
    <>
      {hasCustomSchema(cms?.seo?.customSchema) ? (
        <CustomSchema raw={cms?.seo?.customSchema} />
      ) : (
        <>
          <Script id="ld-breadcrumb-devops" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <Script id="ld-product-devops"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
          <Script id="ld-faq-devops"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </>
      )}
      <>
        <DevOpsHeroSection       data={cms?.hero} />
        <DevOpsBuiltForSection   data={cms?.builtFor} />
        <DevOpsDifferenceSection data={cms?.difference} />
        <DevOpsProblemsSection   data={cms?.problems} />
        <DevOpsCostSection       data={cms?.costs} />
        <DevOpsServicesSection   data={cms?.services} />
        <DevOpsStatsSection      data={cms?.stats} />
        <DevOpsBenefitsSection   data={cms?.benefits} />
        <DevOpsImpactSection     data={cms?.impact} />
        <DevOpsProcessSection    data={cms?.process} />
        <SolutionFaqSection      data={cms?.faq} defaults={DEVOPS_FAQ} />
      </>
    </>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import W2PHeroSection        from "@/components/sections/web-to-print/W2PHeroSection";
import W2PProblemSection      from "@/components/sections/web-to-print/W2PProblemSection";
import W2PFeaturesSection     from "@/components/sections/web-to-print/W2PFeaturesSection";
import W2PCapabilitiesSection from "@/components/sections/web-to-print/W2PCapabilitiesSection";
import W2PBeforeAfterSection  from "@/components/sections/web-to-print/W2PBeforeAfterSection";
import W2PResultsSection      from "@/components/sections/web-to-print/W2PResultsSection";
import W2PIntegrationsSection from "@/components/sections/web-to-print/W2PIntegrationsSection";
import W2PStoreAuditSection   from "@/components/sections/web-to-print/W2PStoreAuditSection";
import SolutionFaqSection from "@/components/shared/SolutionFaqSection";
import SolutionCtaSection  from "@/components/shared/SolutionCtaSection";
import type { SolutionCtaDefaults } from "@/components/shared/SolutionCtaSection";
import type { FaqItem }             from "@/components/shared/SolutionFaqSection";

const W2P_FAQ: { heading: string; highlightWord: string; faqs: FaqItem[] } = {
  heading:       "Frequently Asked Questions",
  highlightWord: "Questions",
  faqs: [
    { question: "Can I use my own domain and branding?",           answer: "Yes — every store is fully white-labelled with your domain, colours, logo, and fonts. Customers never see PrintAI branding." },
    { question: "How long does the storefront setup take?",        answer: "A standard store with your product catalogue, pricing engine, and payment gateway goes live in 5 business days. Complex multi-product configurators take 2–3 weeks." },
    { question: "Does it integrate with our existing MIS or ERP?", answer: "Yes — we connect to ERPNext, Printsmith, Tharstern, and other major print MIS via REST API or direct database sync. Orders flow automatically without re-keying." },
    { question: "What file types and products are supported?",     answer: "PDF, AI, EPS, PSD, PNG, and JPEG uploads with automatic preflighting. Supports business cards, flyers, banners, packaging, books, and custom products." },
    { question: "Can customers save artwork for future orders?",   answer: "Yes — registered customers have a personal asset library. Reorder in two clicks with updated quantities or specs." },
  ],
};

const W2P_CTA: SolutionCtaDefaults = {
  badge:         "GET STARTED",
  heading:       "Ready to open your print shop online?",
  highlightWord: "print shop online?",
  description:   "Get a storefront that handles real-world print complexity — pricing, file uploads, finishing — without breaking at scale.",
  primaryText:   "Book Free Storefront Audit",
  primaryHref:   "/#contact",
  secondaryText: "Talk to Sales",
  secondaryHref: "/#contact",
  trustPoints:   ["Free 30-min audit", "Live in 5 days", "Your branding"],
};
import { getWebToPrintPage } from "@/lib/sanity.queries";
import CustomSchema, { hasCustomSchema } from "@/components/CustomSchema";

// Re-fetch CMS content every 5 seconds (auto-revalidation for live updates)
export const revalidate = 5;

import { buildProductMetadata } from "@/lib/page-metadata";
import { buildProductBreadcrumb } from "@/lib/breadcrumb-schema";

const TITLE       = "Web-to-Print Stores That Don't Break at Scale";
const DESCRIPTION = "Build storefronts that handle real-world print complexity — pricing, file uploads, finishing options, and shipping logic — without breaking at scale.";
const PATH        = "/products/web-to-print";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getWebToPrintPage();
  return buildProductMetadata({
    cmsTitle:      cms?.seo?.title,
    cmsDesc:       cms?.seo?.description,
    fallbackTitle: TITLE,
    fallbackDesc:  DESCRIPTION,
    path:          PATH,
  });
}

const breadcrumbSchema = buildProductBreadcrumb("Web-to-Print Stores", PATH);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PrintAI Web-to-Print Platform",
  description: DESCRIPTION,
  brand: { "@type": "Brand", name: "PrintAI" },
  url: `https://printai.cloud${PATH}`,
  image: "https://printai.cloud/logo.png",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes a Web-to-Print store fail at scale?",
      acceptedAnswer: { "@type": "Answer", text: "Most stores break due to pricing logic failures when combining quantity, rush options, and finishing — plus mobile file upload issues and shipping calculation errors under load." },
    },
    {
      "@type": "Question",
      name: "What platforms do you build Web-to-Print stores on?",
      acceptedAnswer: { "@type": "Answer", text: "We build on Shopify, WooCommerce, or fully custom frameworks with scalable architecture designed specifically for print complexity." },
    },
    {
      "@type": "Question",
      name: "Does it support real-time pricing?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — our configurator updates pricing instantly as customers change quantity, paper stock, or finishing options with no surprises at checkout." },
    },
  ],
};

export default async function WebToPrintPage() {
  const cms = await getWebToPrintPage();
  return (
    <>
      {hasCustomSchema(cms?.seo?.customSchema) ? (
        <CustomSchema raw={cms?.seo?.customSchema} />
      ) : (
        <>
          <Script id="ld-breadcrumb-w2p" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <Script id="ld-product-w2p"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
          <Script id="ld-faq-w2p"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </>
      )}

      <W2PHeroSection         data={cms?.hero} />
      <W2PProblemSection      data={cms?.problem} />
      <W2PFeaturesSection     data={cms?.features} />
      <W2PCapabilitiesSection data={cms?.capabilities} />
      <W2PBeforeAfterSection  data={cms?.beforeAfter} />
      <W2PResultsSection      data={cms?.results} />
      <W2PIntegrationsSection data={cms?.integrations} />
      <W2PStoreAuditSection   data={cms?.storeAudit} />
      <SolutionCtaSection     defaults={W2P_CTA} data={cms?.sharedCta} />
      <SolutionFaqSection     data={cms?.faq} defaults={W2P_FAQ} />
    </>
  );
}

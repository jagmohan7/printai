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
    {
      question: "What is web-to-print software and does my print shop need it?",
      answer:   "Web-to-print software is a platform that lets customers configure, price, and order printed products online — without calling your team for a quote or a file spec check. If your current website says 'contact us for a quote' for any standard product, you need web-to-print software. Every time a customer has to call or email before placing an order, a percentage of them don't — they go to a competitor who lets them order online. PrintOpsAI's web-to-print platform is built on Shopify or WooCommerce and configured specifically for print complexity: variable pricing by spec, file preflight at upload, production-aware shipping, and B2B account portals. Most print shops recover the cost of the platform within 60–90 days from orders that previously bounced because ordering was too difficult.",
    },
    {
      question: "How does a web-to-print storefront actually work for a print shop?",
      answer:   "A web-to-print storefront works by replacing your 'request a quote' form with a real product catalogue where customers configure, price, and pay — without involving your team for standard orders. Here is the flow on a PrintOpsAI web-to-print store: 1. Customer selects a product (e.g. business cards). 2. They choose specs: size, paper, finish, quantity. 3. Price updates live as they configure. 4. They upload their artwork — auto-preflight checks the file instantly. 5. They choose delivery: standard, express, or rush. 6. They pay and receive a confirmed order with production timeline. Your team receives a clean, pre-validated job — no back-and-forth, no file errors, no missing information. The order routes directly into your production workflow.",
    },
    {
      question: "Should I build my web-to-print store on Shopify or WooCommerce?",
      answer:   "Both Shopify and WooCommerce are excellent platforms for web-to-print stores — the right choice depends on your business model and technical preference. Shopify is better if you want a fully managed platform with no hosting to maintain, and you are primarily selling direct to consumers or small B2B accounts. It is faster to launch, easier to maintain, and has strong mobile performance. WooCommerce is better if you need deeper customisation, more complex B2B pricing logic, or you already have a WordPress website. It gives you more control over the underlying code and is often preferred by larger commercial print operations with complex product catalogues. PrintOpsAI builds on both. We recommend the right platform after reviewing your product range, order volume, and B2B requirements in your free audit.",
    },
    {
      question: "Can the web-to-print store handle B2B accounts and franchise networks?",
      answer:   "Yes — B2B account management is one of the core capabilities of PrintOpsAI's web-to-print platform, and it is particularly well-suited for franchise networks and corporate print portals. Each B2B account gets a login-protected portal where they see their contracted pricing, approved brand templates they can customise within set parameters, their order history with one-click reorder functionality, and their own shipping addresses and billing details. For franchise networks, head office controls the brand templates and product catalogue. Individual franchisees order through their own portal but cannot change brand assets or pricing. Everything routes through one central dashboard.",
    },
    {
      question: "What happens if a customer uploads the wrong file?",
      answer:   "PrintOpsAI's web-to-print store runs automated preflight checks on every file upload — before the order is confirmed and before it reaches your prepress team. The preflight engine checks for: correct document dimensions with bleed (minimum 3mm), image resolution (minimum 300 DPI for commercial quality), colour mode (CMYK required for offset/digital, RGB flagged), font embedding (outlined or embedded, not linked), and file format compatibility (PDF/X-1a preferred, AI and PSD supported). If the file fails any check, the customer sees a clear, plain-English error message explaining exactly what is wrong and how to fix it. They cannot proceed to checkout until the file passes — which protects your prepress team from wasting time on uncheckable files.",
    },
    {
      question: "Is PrintOpsAI's web-to-print platform right for a commercial print shop?",
      answer:   "PrintOpsAI's web-to-print platform is designed specifically for commercial print shops — not for print-on-demand businesses or consumer photo product companies. Commercial print has product complexity (40+ spec combinations per product), B2B account management requirements, production-aware fulfilment, and prepress validation needs that generic ecommerce platforms and print-on-demand tools are not built for. Our platform serves commercial printers across the USA and Canada — from single-location shops with 5 staff to multi-location chains with 100+ employees. If you run a commercial print shop and want a web-to-print store that actually handles your products correctly, book a free audit. We will tell you in 30 minutes whether our platform is right for you.",
    },
  ],
};

const W2P_CTA: SolutionCtaDefaults = {
  badge:         "GET STARTED",
  heading:       "Your Store Should Work As Hard As Your Press",
  highlightWord: "As Hard As Your Press",
  description:   "Book your free store audit. We will review your current setup, identify exactly where you are losing orders, and show you what a PrintOpsAI web-to-print store looks like for your specific products. Most clients see measurable improvement within the first 30 days.",
  primaryText:   "Get Your Free Audit",
  primaryHref:   "/#contact",
  secondaryText: "Talk to Sales",
  secondaryHref: "/#contact",
  trustPoints:   ["No credit card required", "30-minute session", "Built on Shopify or WooCommerce"],
};
import { getWebToPrintPage } from "@/lib/sanity.queries";
import CustomSchema, { hasCustomSchema } from "@/components/CustomSchema";

// Re-fetch CMS content every 5 seconds (auto-revalidation for live updates)
export const revalidate = 5;

import { buildProductMetadata } from "@/lib/page-metadata";
import { buildProductBreadcrumb } from "@/lib/breadcrumb-schema";

const TITLE       = "Web-to-Print Software for Print Shops — Shopify & WooCommerce";
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
  name: "PrintOpsAI Web-to-Print Platform",
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
      name: "What is web-to-print software and does my print shop need it?",
      acceptedAnswer: { "@type": "Answer", text: "Web-to-print software lets customers configure, price, and order printed products online without calling your team. PrintOpsAI's platform is built on Shopify or WooCommerce with print-specific complexity: variable pricing, file preflight, production-aware shipping, and B2B portals. Most print shops recover the platform cost within 60–90 days." },
    },
    {
      "@type": "Question",
      name: "How does a web-to-print storefront actually work for a print shop?",
      acceptedAnswer: { "@type": "Answer", text: "A web-to-print storefront replaces your 'request a quote' form with a live product catalogue. Customers configure specs, get a live price, upload artwork (auto-preflighted), choose delivery, and pay. Your team receives a clean, pre-validated job that routes directly into your production workflow." },
    },
    {
      "@type": "Question",
      name: "Should I build my web-to-print store on Shopify or WooCommerce?",
      acceptedAnswer: { "@type": "Answer", text: "Shopify is better for managed hosting, consumer or small B2B sales, and fast launch. WooCommerce suits deeper customisation, complex B2B pricing, and existing WordPress sites. PrintOpsAI builds on both and recommends the right platform after reviewing your product range and order volume." },
    },
    {
      "@type": "Question",
      name: "Can the web-to-print store handle B2B accounts and franchise networks?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — each B2B account gets a login-protected portal with contracted pricing, approved brand templates, order history, and one-click reorder. For franchise networks, head office controls brand assets while individual franchisees order through their own portal. Everything routes through one central dashboard." },
    },
    {
      "@type": "Question",
      name: "What happens if a customer uploads the wrong file?",
      acceptedAnswer: { "@type": "Answer", text: "PrintOpsAI runs automated preflight on every upload — checking dimensions with bleed (min 3mm), resolution (min 300 DPI), colour mode (CMYK), font embedding, and file format. If a file fails, the customer sees a plain-English error message and cannot proceed to checkout until it passes — protecting your prepress team from uncheckable files." },
    },
    {
      "@type": "Question",
      name: "Is PrintOpsAI's web-to-print platform right for a commercial print shop?",
      acceptedAnswer: { "@type": "Answer", text: "PrintOpsAI is built for commercial print shops, not print-on-demand or consumer photo companies. It handles 40+ spec combinations per product, B2B portals, production-aware fulfilment, and prepress validation. We serve commercial printers across the USA and Canada — book a free audit to find out if it fits your operation." },
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
      <SolutionCtaSection defaults={W2P_CTA} data={cms?.sharedCta} modalType="product" entityName="Web-to-Print Platform" />
      <SolutionFaqSection     data={cms?.faq} defaults={W2P_FAQ} />
    </>
  );
}

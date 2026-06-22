"use client";
import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import MotionInView from "@/components/MotionInView";

/* ── Types ──────────────────────────────────────────────────── */
interface Faq { question: string; answer: string; }
interface FaqCategory { id: string; label: string; accentColor: "cyan" | "violet" | "teal"; faqs: Faq[]; }

/* ── Category registry ───────────────────────────────────────── */
const CHIPS = [
  { id: "all",             label: "All" },
  { id: "about",           label: "About Us" },
  { id: "chatbot",         label: "AI Chatbot" },
  { id: "w2p",             label: "Web-to-Print" },
  { id: "automation",      label: "Automation" },
  { id: "devops",          label: "DevOps" },
  { id: "custom-ai",       label: "Custom AI" },
  { id: "pricing",         label: "Pricing" },
  { id: "getting-started", label: "Getting Started" },
] as const;

/* ── All 50 FAQs ─────────────────────────────────────────────── */
const FAQ_DATA: FaqCategory[] = [
  {
    id: "about", label: "About PrintOpsAI", accentColor: "violet",
    faqs: [
      {
        question: "What is PrintOpsAI?",
        answer: "PrintOpsAI is an AI automation platform built exclusively for print businesses. We build and operate AI-powered tools that help print shops automate the work that slows them down — from 24/7 customer quoting and online ordering, to workflow automation from order intake to shipping, custom AI development for specific operational problems, and managed DevOps infrastructure.\n\nUnlike generic software companies that serve print as one of many industries, PrintOpsAI was built specifically for the printing industry. Every product, every feature, and every line of code reflects how print businesses actually operate — prepress, press scheduling, file handling, B2B account management, and production tracking.\n\nWe serve commercial printers, web-to-print businesses, multi-location print chains, packaging printers, and in-plant operations across the United States and Canada.",
      },
      {
        question: "Who is PrintOpsAI built for?",
        answer: "PrintOpsAI is built for print businesses in the USA and Canada that want to grow without adding headcount. Specifically, we serve five types of print operations:\n\n1. Commercial print shops (10–200 staff) that still handle quoting, scheduling, and order management manually\n2. Web-to-print businesses that need a storefront that handles print complexity — pricing, file specs, B2B portals\n3. Multi-location print chains that need centralised management, job routing, and consistent automation across sites\n4. Packaging and large-format printers with complex pricing logic and substrate management challenges\n5. In-plant print operations inside corporations, universities, and hospitals needing cost tracking and automation\n\nIf your print business is running on spreadsheets, disconnected tools, and manual quoting — PrintOpsAI was built for you.",
      },
      {
        question: "Is PrintOpsAI based in the USA?",
        answer: "PrintOpsAI is a USA and Canada-focused company with team members and operations across North America. All client accounts are managed by US-based account leads. Our support team operates in US and Canadian timezones.\n\nWe build solutions specifically for the North American print market — pricing in USD, compliance with US and Canadian business requirements, and integrations with the platforms most commonly used by US print shops.\n\nWe serve print businesses across all major US markets: the Midwest, Northeast, Southeast, West Coast, and Texas — as well as commercial printers and web-to-print businesses throughout Canada.",
      },
      {
        question: "How is PrintOpsAI different from OnPrintShop, Printavo, or other print software?",
        answer: "PrintOpsAI is a complete AI automation platform — not a single-function tool. The key differences versus the most common alternatives:\n\nvs OnPrintShop: OnPrintShop is a web-to-print storefront tool. PrintOpsAI includes a web-to-print platform AND an AI chatbot, workflow automation, DevOps infrastructure, and custom AI development. PrintOpsAI is the complete platform. OnPrintShop is one part of it.\n\nvs Printavo (Inktavo): Printavo is a shop management tool focused on screen printing and apparel. PrintOpsAI serves commercial print, digital print, web-to-print, packaging, and large-format. Completely different market.\n\nvs generic AI tools (Tidio, Intercom, HubSpot AI): These tools serve 40+ industries and have no print-specific knowledge. PrintOpsAI's AI is trained on print operations — pricing, file specs, turnaround schedules, and production workflows that generic tools cannot replicate.\n\nThe core difference: every other tool does one thing for print. PrintOpsAI connects the full stack.",
      },
      {
        question: "Does PrintOpsAI replace my existing software or work alongside it?",
        answer: "PrintOpsAI is designed to work alongside your existing tools — not replace them all at once. If you run a print MIS, a Shopify store, QuickBooks for billing, and a CRM, PrintOpsAI can connect to all of them and add AI automation on top — without requiring you to switch platforms.\n\nOver time, many clients find that PrintOpsAI's integrated platform makes several standalone tools redundant. But that is a choice you make when you see the value — not a forced migration on day one.\n\nThe only exception: if you want to use PrintOpsAI's web-to-print platform, it replaces your existing web store with a Shopify or WooCommerce store configured for print. Your existing products, customer data, and order history can be migrated.",
      },
      {
        question: "What types of print businesses does PrintOpsAI NOT serve?",
        answer: "PrintOpsAI does not serve print-on-demand (POD) businesses like Printful or Printify resellers, consumer photo print companies, or apparel screen printing shops whose primary focus is garment decoration.\n\nOur platform is built for commercial print operations — businesses that print on paper, board, substrate, or packaging material for business clients. If your core business is printing custom t-shirts for consumers, Printavo or a POD management platform would serve you better.\n\nWe also don't currently serve newspaper or magazine publishers, book printing operations, or 3D printing businesses — our expertise is specifically in commercial and digital print production.",
      },
      {
        question: "How long has PrintOpsAI been operating?",
        answer: "PrintOpsAI was built by a team with over 20 years of combined experience in print technology, AI development, and print operations consulting across the USA and Canada. Our team includes former print shop owners, print MIS developers, production floor managers, and AI engineers who have worked specifically in the printing industry.\n\nWe have onboarded 250+ print businesses across North America and have case studies showing measurable outcomes: $120K+ average annual savings, 300% revenue growth from web-to-print deployment, 80%+ auto-resolution of customer enquiries via AI chatbot.\n\nTo see current client results and case studies, visit our Results page or book a demo where we'll walk you through outcomes from a shop similar to yours.",
      },
    ],
  },
  {
    id: "chatbot", label: "AI Chatbot", accentColor: "cyan",
    faqs: [
      {
        question: "What is an AI chatbot for a print shop?",
        answer: "An AI chatbot for a print shop is a software system trained on your shop's specific pricing, products, turnaround times, and file specifications — that answers customer enquiries automatically, 24 hours a day.\n\nUnlike generic chatbots that say 'contact us for a quote,' a print-specific AI chatbot can answer:\n· 'How much for 500 business cards, gloss laminate, 3-day turnaround?' → gives an accurate price\n· 'What file format do you need?' → explains your exact spec requirements\n· 'Do you do same-day?' → checks your current capacity rules and answers correctly\n· 'Can I change my order?' → routes to your team with the full order context attached\n\nPrintOpsAI's AI chatbot is trained specifically on your shop's data — not a generic print industry template. It quotes your prices, reflects your turnaround times, and follows your escalation rules.",
      },
      {
        question: "How accurate is the AI chatbot at quoting print jobs?",
        answer: "PrintOpsAI's AI chatbot quotes from your exact price book — not a generic estimate. If your pricing says 500 business cards (4/4, gloss laminate, 3-day turnaround) is $89, the chatbot quotes $89. It doesn't estimate or approximate — it reads your configured pricing matrix.\n\nOur clients consistently report that chatbot-generated quotes match human-generated quotes at 97%+ accuracy. The 3% variance comes from complex or out-of-catalogue jobs that the chatbot correctly flags for human review rather than attempting to quote.\n\nPrice changes are reflected in the chatbot within 24 hours of you updating your price book.",
      },
      {
        question: "How long does it take to set up a print shop AI chatbot?",
        answer: "Most PrintOpsAI clients have a live, trained AI chatbot on their website within 48–72 hours.\n\nWhat you provide: your current price book (any format), your product catalogue, standard turnaround times, rush pricing, and any FAQs your team currently answers manually.\n\nWhat we handle: all AI training, testing, deployment, and QA. You review the chatbot before it goes live and approve it. If anything needs adjusting, we make the changes before launch.\n\nThere is no code required on your side and no disruption to your existing website. The chatbot is deployed as a widget that sits on top of your current site.",
      },
      {
        question: "Can the chatbot handle after-hours enquiries and leads?",
        answer: "Yes — capturing after-hours leads is the primary reason most print shops deploy an AI chatbot. Over 60% of print shop enquiries arrive outside business hours. Without a chatbot, these leads wait until the next morning — and most have already contacted a competitor who responded instantly.\n\nPrintOpsAI's AI chatbot responds within seconds, 24/7 — giving accurate quotes, answering file spec questions, capturing contact details, and routing complex jobs to your team with full context.\n\nOur clients typically see a 38% increase in after-hours leads captured within the first 30 days.",
      },
      {
        question: "Which channels can the print chatbot be deployed on?",
        answer: "PrintOpsAI's AI chatbot can be deployed simultaneously on your website, WhatsApp Business, and email.\n\nWebsite deployment: a chat widget that appears on your homepage, product pages, and contact page.\n\nWhatsApp Business: customers can message your business WhatsApp and receive instant AI responses.\n\nEmail: automated responses to quote request emails with structured information capture.\n\nAll channels are managed from one dashboard. Training your chatbot once covers all channels — you don't need to create separate versions for each platform. Multi-channel deployment is included in all PrintOpsAI AI Chatbot plans at no extra cost.",
      },
      {
        question: "Will the AI chatbot replace my customer service team?",
        answer: "No — PrintOpsAI's AI chatbot is designed to handle the repetitive 80%, so your team focuses on the valuable 20%.\n\nThe average print shop CSR spends 2–3 hours a day answering the same 30 questions: pricing for standard products, turnaround times, file spec requirements, and order status. The chatbot handles all of these automatically.\n\nYour team is freed to focus on: large custom jobs that need human judgment, enterprise account relationships, complex technical conversations, and the work that actually builds long-term client loyalty.\n\nClients consistently report their teams are less stressed and more productive within 30 days — not because they have fewer staff, but because their staff are doing better work.",
      },
    ],
  },
  {
    id: "w2p", label: "Web-to-Print Platform", accentColor: "violet",
    faqs: [
      {
        question: "What is web-to-print software?",
        answer: "Web-to-print software is a platform that lets customers configure, price, and order printed products online — without calling your team for a quote or file guidance.\n\nA web-to-print store lets customers: select a product, choose specifications (size, paper, finish, quantity), see the price update live, upload their artwork, pass automated file preflight, and pay — all without any manual involvement from your team for standard products.\n\nPrintOpsAI builds web-to-print stores on Shopify or WooCommerce — the two most widely used ecommerce platforms in the world. You own your store, your data, and your customer list permanently.",
      },
      {
        question: "What platforms does PrintOpsAI build web-to-print stores on?",
        answer: "PrintOpsAI builds web-to-print stores on Shopify or WooCommerce — your choice based on your business model.\n\nShopify: better for shops wanting a fully managed, fast-to-launch platform with strong mobile performance and minimal maintenance. Recommended for B2C and simple B2B operations.\n\nWooCommerce: better for shops needing deeper customisation, complex B2B pricing logic, or who already run a WordPress website. More flexible, more control over the underlying code.\n\nBoth platforms are widely trusted, widely supported, and give you complete ownership of your store. You are never locked into a proprietary system that only PrintOpsAI can maintain.",
      },
      {
        question: "How long does it take to launch a web-to-print store?",
        answer: "Most PrintOpsAI web-to-print stores are live within 2–3 weeks of project kick-off.\n\nThe timeline: Week 1 — platform setup, product catalogue configuration, pricing matrix build. Week 2 — B2B portal setup, preflight rules, payment and shipping integration, internal testing. Week 3 — client review, adjustments, staff training, go-live.\n\nFor simpler stores (5–10 standard products, no complex B2B portals), launch can happen in 7–10 days. For complex stores (50+ products, multiple B2B account tiers, custom pricing logic), 3–4 weeks.\n\nNo developer knowledge is required on your side. PrintOpsAI handles all technical setup.",
      },
      {
        question: "Can the web-to-print store handle B2B accounts and corporate portals?",
        answer: "Yes — B2B account management is one of the core capabilities of PrintOpsAI's web-to-print platform.\n\nEach B2B account gets a login-protected portal showing: their contracted pricing (not retail rates), approved brand templates with locked parameters, their order history with one-click reorder, and their own shipping and billing details.\n\nFor franchise and corporate networks, head office controls brand templates and products. Individual locations or departments order through their own portal but cannot change brand assets. All orders route to one central dashboard.\n\nThis setup is widely used by print shops serving marketing agencies, property companies, healthcare networks, and franchise operators across the USA and Canada.",
      },
      {
        question: "Does the web-to-print store include automated file preflight?",
        answer: "Yes — every PrintOpsAI web-to-print store includes automated file preflight at the point of upload.\n\nThe preflight engine checks every uploaded file for: correct dimensions with bleed (minimum 3mm), image resolution (minimum 300 DPI), CMYK colour mode, embedded fonts, and correct file format.\n\nIf a file fails any check, the customer sees a plain-English error message explaining exactly what is wrong and how to fix it — before they can proceed to checkout.\n\nYour prepress team only receives files that have already passed automated checks. This reduces prepress correction cycles by an average of 50% for our clients.",
      },
      {
        question: "What integrations does the web-to-print store include?",
        answer: "PrintOpsAI web-to-print stores integrate with the tools most commonly used by print shops in the USA and Canada.\n\nPayment: Stripe, PayPal, Klarna, Authorize.net — including net-30 trade invoicing.\nShipping: FedEx, UPS, USPS, Shippo — live rate calculation at checkout.\nEmail: Klaviyo, Mailchimp — abandoned cart, reorder campaigns, completion notifications.\nCRM: HubSpot, Zoho, Salesforce — every order and customer action synced automatically.\nProduction: PrintOpsAI workflow automation — orders route directly into your production queue.\n\nIf you use a tool not listed above, we connect most platforms via API. Ask during your demo session and we will confirm compatibility before you commit.",
      },
    ],
  },
  {
    id: "automation", label: "Print Workflow Automation", accentColor: "cyan",
    faqs: [
      {
        question: "What is print workflow automation?",
        answer: "Print workflow automation is the use of software to replace manual handoffs between stages of print production — from order intake through prepress, scheduling, production tracking, and fulfilment.\n\nIn a manual print workflow, every stage requires a person to move data: copying order data from email into MIS, emailing proof approvals, manually assigning jobs to presses, creating shipping labels.\n\nPrint workflow automation replaces every one of these handoffs. When an order arrives, a job ticket is created automatically. When a file passes preflight, it moves to scheduling automatically. When a job ships, the customer receives tracking information automatically.\n\nPrintOpsAI's workflow automation covers all 5 stages: order intake, prepress, scheduling, production tracking, and fulfilment — connected in one continuous pipeline.",
      },
      {
        question: "What are the stages of print workflow automation?",
        answer: "A fully automated print workflow covers 5 core production stages:\n\n1. Order Intake & Routing — Every order from web store, email, or B2B portal is captured, validated, and routed to the correct production queue automatically. No manual job ticket creation.\n\n2. Prepress & Preflight — Files are automatically checked for print readiness (DPI, bleed, colour mode, fonts). Failed files trigger automated correction requests sent directly to the customer.\n\n3. Production Scheduling — Jobs are dynamically assigned to the optimal press based on capacity, run length, substrate, and deadline. Gang run opportunities are identified automatically.\n\n4. Production Tracking — Barcode scanning at each workstation updates job status in real time. All stakeholders see live progress. 'Where's my order?' calls are eliminated.\n\n5. Fulfillment & Shipping — Shipping labels generated, carriers booked, and tracking numbers sent to customers automatically when a job completes. Zero manual intervention.",
      },
      {
        question: "How much manual work does print workflow automation eliminate?",
        answer: "PrintOpsAI clients typically reduce manual touch points per job by 40–55% after full workflow automation.\n\nThe specific tasks automation eliminates:\n· Order data entry from email to MIS: 20–30 minutes per order → 0\n· Preflight file checking by prepress team: 10–20 minutes per job → automated\n· Manual press scheduling updates: 1–2 hours per day → automated\n· Proof approval email cycles: ongoing → automated with SMS + email\n· Shipping label creation: 5–10 minutes per job → 0\n· Customer status call handling: 2–3 hours per day CSR time → automated\n\nA typical mid-size commercial print shop (10–15 staff) saves 20–30 hours of manual work per week after PrintOpsAI workflow automation is fully deployed.",
      },
      {
        question: "How long does print workflow automation take to implement?",
        answer: "A full PrintOpsAI workflow automation deployment takes 6–12 weeks from audit to full rollout.\n\nWeek 1–2: Workflow audit — we map your current process and identify automation opportunities.\nWeek 3–6: Pilot build — we automate the highest-impact stage first (usually order intake + prepress).\nWeek 7–12: Full rollout — remaining stages automated one by one, staff trained, integrations connected.\n\nWe never automate everything at once. A staged approach means zero disruption to your live production during the transition. Your team absorbs each automation stage before the next one begins.\n\nMost clients see measurable ROI (reduced labour cost, fewer reprints, faster turnaround) within 90 days of full deployment.",
      },
      {
        question: "What systems does PrintOpsAI workflow automation connect to?",
        answer: "PrintOpsAI workflow automation integrates with the most widely used print shop tools in North America.\n\nEcommerce: Shopify, WooCommerce — orders flow directly into the production pipeline.\nAccounting: QuickBooks — billing triggered automatically when jobs complete.\nEmail/CRM: Klaviyo, HubSpot, Zoho — customer communications automated at every production milestone.\nProduction RIP: EFI Fiery, Onyx, Caldera — job completion signals trigger fulfilment automatically.\nShipping: UPS, FedEx, USPS — labels generated and carriers booked on job completion.\n\nFor shops running less common or legacy MIS systems, we connect via API. We've integrated with over 30 different print-related platforms — if you're unsure about compatibility, ask during your free workflow audit and we'll check before you commit.",
      },
      {
        question: "What is the ROI of print workflow automation?",
        answer: "Most PrintOpsAI clients achieve full return on their workflow automation investment within 6–12 months.\n\nThe measurable gains that drive ROI:\n· 40–55% reduction in manual labour per job → staff hours saved × hourly rate\n· 20–35% reduction in reprint rate → direct material and press time savings\n· 96%+ on-time delivery rate → reduced rush costs and customer retention improvement\n· 50% fewer customer status calls → CSR time redirected to value-generating work\n\nFor a print shop doing $2M annually with 12 staff, the total annual value of these gains typically ranges from $80,000–$150,000 — against a one-time or annual automation investment that is significantly lower.\n\nWe provide a written ROI estimate specific to your shop in your free workflow audit session.",
      },
    ],
  },
  {
    id: "devops", label: "DevOps & Infrastructure", accentColor: "violet",
    faqs: [
      {
        question: "What is DevOps for a print business?",
        answer: "DevOps for a print business means managing the technology infrastructure that keeps your web store, AI chatbot, workflow automation, and print management systems running reliably — 24/7.\n\nFor a print shop, DevOps covers: server management and hosting configured for print file-heavy environments, automated deployment pipelines so updates don't break your live store, 24/7 monitoring and alerting, large file handling for 2GB+ print files, backup and disaster recovery, security management, and integration reliability between all your connected systems.\n\nMost print shop owners don't think about DevOps until something breaks — a store crash during a campaign, file uploads failing, or the MIS going down mid-shift. These are DevOps failures. All preventable.\n\nPrintOpsAI's DevOps service is built specifically for print environments — not adapted from generic IT support.",
      },
      {
        question: "Why does a web-to-print store need specialised hosting?",
        answer: "A web-to-print store needs infrastructure significantly more robust than a standard website because print adds file-heavy complexity that generic hosting cannot handle.\n\nPrint-specific hosting requirements:\n· File uploads up to 2GB+ — standard hosting times out at 30–60 seconds; a 500MB PDF takes longer\n· Auto-scaling — 5–10x traffic spikes during campaign launches must not slow or crash the store\n· CDN — product images and configurator assets served from geographically close servers for fast load\n· Database performance — product configurators run complex pricing queries on every spec change\n· Integration reliability — web store, MIS, ERP, and shipping must stay connected reliably\n\nPrintOpsAI uses AWS infrastructure configured specifically for these print requirements.",
      },
      {
        question: "What does 99.9% uptime mean for a print shop website?",
        answer: "99.9% uptime means your print shop website is unavailable for less than 9 hours per year.\n\nTo put that in business context for a print shop doing $1M in annual online revenue:\n· 99.9% uptime: ~8.7 hours downtime/year (~$1,000–$2,500 in lost orders)\n· 99.5% uptime: ~43.8 hours downtime/year (~$5,000–$12,500 in lost orders)\n· 99.0% uptime: ~87.6 hours downtime/year (~$10,000–$25,000 in lost orders)\n\nMost basic hosting plans offer 99.0–99.5% uptime in practice — not the 99.9% they claim.\n\nPrintOpsAI's infrastructure is built on AWS with load balancing and auto-failover to maintain genuine 99.9% uptime for all client web stores and automation platforms.",
      },
      {
        question: "Why do large print files fail to upload on our website?",
        answer: "Large print files fail to upload most commonly because of server timeout configuration — the server stops waiting for the file before the upload completes.\n\nStandard web hosting has a 30–60 second timeout. A 500MB PDF on a 20Mbps connection takes ~200 seconds to upload. The server closes the connection before the file arrives.\n\nAdditional causes of large file upload failures in print environments:\n· PHP max upload size set to 2MB (default) — must be configured to 2GB+\n· Server memory limit — insufficient memory causes mid-transfer failures for large files\n· Missing chunked upload protocol — without chunking, a dropped connection restarts from zero\n\nPrintOpsAI configures all three for every client: extended timeouts, 2GB+ upload limits, and chunked upload with retry logic — so customers can upload print files reliably, every time.",
      },
      {
        question: "How should a print shop back up its website and data?",
        answer: "A print shop should back up four data categories and test restoration of each quarterly.\n\n1. Database backup: all orders, customers, products, and pricing. Daily backup with 30-day retention stored in a geographically separate location.\n\n2. Customer file storage: all uploaded artwork and production files (can be terabytes). AWS S3 with versioning enabled — cost-effective, redundant, point-in-time recovery.\n\n3. Application code: web store themes, plugins, automation scripts. Version control (Git) with documented deployment procedures.\n\n4. Environment configuration: server settings, integration credentials, DNS. Encrypted backup updated after every infrastructure change.\n\nMost important: test the restoration. A backup that has never been restored is an assumption. PrintOpsAI tests restoration for every client environment quarterly.",
      },
      {
        question: "Does my print shop need managed DevOps?",
        answer: "You probably need managed DevOps if more than 20% of your revenue comes from online orders, you run automated workflows, or your team cannot fix a server issue at 11pm on a Saturday.\n\nSigns you need managed DevOps:\n· Your last major system problem took more than 4 hours to resolve\n· You have B2B clients who depend on always-on portal access\n· You've had a store crash or slow down during a campaign\n· File uploads fail intermittently and no one knows why\n· You have no tested backup and recovery procedure\n\nSigns you probably don't need it yet:\n· Your website is a brochure with a contact form — no online ordering\n· Technology failures have minimal direct revenue impact\n· You have an active in-house developer managing infrastructure\n\nPrintOpsAI's free infrastructure audit will tell you honestly which situation you're in.",
      },
    ],
  },
  {
    id: "custom-ai", label: "Custom AI Development", accentColor: "cyan",
    faqs: [
      {
        question: "What is custom AI development for a print shop?",
        answer: "Custom AI development for a print shop means building a bespoke AI system trained on your specific shop's data, workflow, and operational requirements — not a generic SaaS tool adapted for print.\n\nExamples of custom AI systems PrintOpsAI builds for print shops:\n· AI pricing engines that calculate accurate quotes for any job combination in under 2 seconds\n· Intelligent order routing that assigns jobs to optimal presses based on capacity and economics\n· Computer vision defect detection trained on your specific press output and defect library\n· Predictive inventory systems that auto-raise POs before stock runs out\n· Custom integration layers that connect your specific combination of MIS, ERP, and web tools\n\nThe key difference from SaaS tools: you own the source code permanently. No licensing fees. No vendor dependency. The system belongs to you after delivery.",
      },
      {
        question: "How much does custom AI development cost for a print shop?",
        answer: "PrintOpsAI builds custom AI systems for print shops at a fixed price between $15,000 and $75,000.\n\nTypical investment by project type:\n· AI Pricing Engine (single product line): $15,000–$25,000\n· AI Pricing Engine (full catalogue): $25,000–$45,000\n· Intelligent Order Routing: $20,000–$40,000\n· AI Defect Detection (single press type): $25,000–$50,000\n· Custom Integration Layer (3–5 systems): $15,000–$30,000\n· Full AI Operations Platform: $50,000–$75,000\n\nThis is a one-time investment — no ongoing licensing fees, no subscriptions. For comparison, a similar project with a generic US AI development company typically costs $150,000–$400,000 and takes 9–18 months. PrintOpsAI costs less and deploys faster because we start from print industry knowledge, not from scratch.\n\nEvery project starts with a free scoping call and a written fixed-price proposal.",
      },
      {
        question: "Who owns the code after a custom AI project is complete?",
        answer: "You own 100% of the source code on completion — this is included with every PrintOpsAI project.\n\nOn delivery you receive: complete source code in your preferred repository (GitHub, GitLab, Bitbucket), full technical documentation, API documentation, environment configuration files, deployment guides, and staff training documentation.\n\nSource code ownership means: no ongoing licensing fees, no dependency on PrintOpsAI to keep the system running, no subscription that can be cancelled or repriced, and the ability to modify or extend the system with any development team you choose.\n\nMost SaaS AI tools retain model and code ownership — you are renting capability. PrintOpsAI custom AI is a permanent business asset that belongs entirely to your print shop.",
      },
      {
        question: "How long does a custom AI project take?",
        answer: "Most PrintOpsAI custom AI projects are fully deployed in 6–10 weeks from scoping call to launch.\n\nWeek 1: Scoping call + written proposal delivered\nWeek 1–2: Project kick-off, data collection, workflow mapping\nWeek 2–4: Proof of concept build + accuracy validation\nWeek 4: Client sign-off on proof of concept\nWeek 5–8: Full production build + integration testing\nWeek 8–9: Staging environment testing + client review\nWeek 9–10: Production deployment + staff training\nWeek 10+: 30-day post-launch monitoring and support\n\nWhy PrintOpsAI deploys faster than generic AI development companies: our team starts from full print industry knowledge. We don't spend 8–12 weeks learning your industry.",
      },
      {
        question: "What is the difference between custom AI and using ChatGPT for my print shop?",
        answer: "ChatGPT and off-the-shelf AI are useful for generic tasks. Custom AI handles print-specific operations.\n\nChatGPT cannot give an accurate quote for 500 business cards with soft-touch laminate because it doesn't have your price book, your machine rates, or your current material costs.\n\nChatGPT cannot detect a colour registration error on a sheet coming off your press because it is a language model — not a computer vision system trained on your press output.\n\nChatGPT cannot route a job to your optimal press and update your MIS because it has no integration with your actual production systems.\n\nCustom AI from PrintOpsAI handles these operational tasks because it is trained on your specific data, integrated with your specific systems, and built around your specific workflow. ChatGPT is a general-purpose tool. PrintOpsAI custom AI is an operational system.",
      },
      {
        question: "Can PrintOpsAI build AI defect detection for a commercial print operation?",
        answer: "Yes — AI defect detection for commercial print is one of our most-requested custom builds.\n\nHow it works: we collect samples of acceptable and defective output from your specific press. A computer vision model is trained to recognise defect types: colour shift, registration error, hickeys, streaking, banding, and substrate defects specific to your materials and print method.\n\nDeployment: the model integrates with your production workflow — camera-based inline inspection or image capture at press delivery. Defects above your threshold trigger alerts and optional production pause.\n\nAccuracy: 94–98% on trained defect types. For packaging printers, we also build AI inventory management: predicts substrate consumption, auto-raises POs before stockouts, tracks waste by job type. Typically achieves 95%+ stock accuracy and 50–60% reduction in emergency purchases.",
      },
    ],
  },
  {
    id: "pricing", label: "Pricing & ROI", accentColor: "violet",
    faqs: [
      {
        question: "How does PrintOpsAI pricing work?",
        answer: "PrintOpsAI pricing varies by product — some are monthly subscriptions, others are fixed-price projects.\n\nAI Chatbot: monthly subscription based on conversation volume and channels deployed. Starts from a plan suitable for mid-size print shops (up to 500 conversations/month).\n\nWeb-to-Print Platform: one-time build fee for store setup and configuration. Ongoing Shopify or WooCommerce platform costs are separate (paid directly to the platform).\n\nWorkflow Automation: implementation fee + optional monthly monitoring and support.\n\nDevOps Infrastructure: monthly managed service based on infrastructure complexity.\n\nCustom AI Development: fixed price per project, $15,000–$75,000. One-time. You own the code.\n\nFor a specific quote, book a free discovery call. We'll assess your requirements and give you a clear written proposal before you commit to anything.",
      },
      {
        question: "What is the ROI of using PrintOpsAI?",
        answer: "PrintOpsAI clients typically achieve full ROI within 6–12 months, depending on which products are deployed.\n\nSpecific ROI by product:\n\nAI Chatbot: 38% more leads captured from after-hours enquiries. Most clients recover the subscription cost within the first week from a single after-hours order that would otherwise be lost.\n\nWeb-to-Print: 35–80% more online revenue captured after replacing broken storefronts. Clients with no previous web store typically see the investment pay back within 2–3 months.\n\nWorkflow Automation: 40–55% reduction in manual touch-time per job. For a 10-person shop at $20/hour average, this represents $80,000–$120,000 in annual labour savings.\n\nCustom AI (Pricing Engine): eliminates underquoting. A shop underquoting 5% on $2M revenue recovers $100,000 annually — against a one-time $25,000–$45,000 investment.\n\nWe provide a written ROI estimate specific to your shop in your free discovery session.",
      },
      {
        question: "Is there a free trial available?",
        answer: "PrintOpsAI does not offer a self-serve free trial, but every engagement starts with a free session that is more valuable than a trial: a live demonstration specific to your print operation.\n\nIn a free 30-minute demo session, we will:\n· Show you a live AI chatbot answering quotes for your specific products\n· Demonstrate web-to-print file preflight catching a real file error\n· Walk through workflow automation for your production stage (not a generic demo)\n· Show you real results from a print shop similar to yours\n\nWe find that a specific demo is far more useful than a generic free trial because it shows you what PrintOpsAI actually does for your type of print shop — not what it can theoretically do. Book a free demo session with no credit card and no commitment required.",
      },
      {
        question: "How does PrintOpsAI compare in cost to running multiple separate tools?",
        answer: "Most print shops running disconnected tools spend $18,000–$60,000 per year on software that doesn't work together — and then spend additional staff time manually bridging the gaps.\n\nA typical disconnected print shop stack:\n· Web store platform (Shopify alone): $2,000–$5,000/year\n· Print MIS (Printavo, DocketManager): $3,000–$12,000/year\n· CRM (HubSpot, Zoho): $2,400–$7,200/year\n· Email platform (Klaviyo): $1,200–$3,600/year\n· Generic chatbot (Tidio, Intercom): $600–$3,000/year\n· Accounting (QuickBooks): $1,200–$2,400/year\n\nTotal: $10,400–$33,200/year in software fees alone\nPlus 20–30 hours/week in manual data entry between tools: $20,000–$40,000/year in labour\n\nPrintOpsAI connects and replaces most of this stack — at a total cost that is often lower than what clients were already spending on tools that didn't work together.",
      },
      {
        question: "Are there setup fees or long-term contracts?",
        answer: "PrintOpsAI's pricing structure is straightforward and designed to be low-risk to start.\n\nAI Chatbot: no long-term contract. Month-to-month after initial setup. Setup: a one-time setup fee covers AI training and deployment — not a recurring charge.\n\nWeb-to-Print Platform: one-time build fee. No ongoing contract with PrintOpsAI (Shopify/WooCommerce platform fees are paid directly to those platforms).\n\nWorkflow Automation: implementation fee + optional monthly support. No mandatory lock-in after implementation.\n\nDevOps Infrastructure: monthly managed service. 30-day notice to cancel.\n\nCustom AI Development: fixed price. One-time. No ongoing fees from PrintOpsAI after delivery.\n\nWe do not believe in long-term contracts that make it harder for you to leave if we underdeliver. We retain clients by producing results, not by locking them in.",
      },
      {
        question: "What results can I realistically expect from PrintOpsAI?",
        answer: "Results vary by product and shop size, but here are the averages we see across our client base:\n\nAI Chatbot: 38% more after-hours leads captured. 8–14 hours/week CSR time saved.\n\nWeb-to-Print: 35–80% more online revenue. 20–30% fewer abandoned carts.\n\nWorkflow Automation: 40–55% reduction in manual touch time. 20–35% fewer reprints. 96%+ on-time delivery.\n\nDevOps: 99.9% uptime. 40–60% faster page load times. 95% of issues resolved before users notice.\n\nCustom AI: 90-second quote generation. 30–45% fewer reprints. 50–70% fewer manual reviews.\n\nThese are averages across real print shop clients in the USA and Canada. Results in your specific shop depend on your current baseline, your volume, and which products you deploy. In your free demo session, we'll give you a realistic expectation for your specific operation — not best-case projections.",
      },
      {
        question: "Can a small print shop afford PrintOpsAI?",
        answer: "Yes — PrintOpsAI has products that work for print shops of all sizes, including smaller operations.\n\nThe AI Chatbot is the most accessible starting point — the monthly cost is recovered from a single after-hours lead that would otherwise have gone to a competitor.\n\nFor smaller shops (5–15 staff, $500K–$2M annual revenue), we typically recommend starting with one product, proving ROI, and then adding others as growth funds the investment.\n\nFor larger operations (15–100+ staff, $2M–$20M revenue), the full platform delivers proportionally larger returns — and the ROI typically justifies the investment more quickly.\n\nIn your free discovery session we'll tell you honestly whether your current revenue level makes the investment viable — and which product to start with if it does.",
      },
    ],
  },
  {
    id: "getting-started", label: "Getting Started", accentColor: "teal",
    faqs: [
      {
        question: "How do I get started with PrintOpsAI?",
        answer: "The fastest way to get started is to book a free 30-minute demo session.\n\nIn that session, we will: understand your specific print operation and current tools, identify your highest-impact automation opportunity, show you a live demonstration relevant to your type of shop, and give you a clear written proposal within 48 hours of the call.\n\nThere is no commitment required to have this conversation. You receive a clear picture of what PrintOpsAI can do for your specific print shop — whether or not you decide to proceed.\n\nIf you prefer to explore first, our case studies page shows real results from print shops similar to yours before you commit to a conversation.",
      },
      {
        question: "What information do I need to provide to get started?",
        answer: "Very little is required to start — most of what we need comes from a conversation, not documents.\n\nFor the initial demo session: nothing in advance. Just show up with a sense of your biggest operational pain point and we handle the rest.\n\nFor the AI Chatbot setup (post-commitment): your price book in any format, your product catalogue, standard turnaround times, rush premiums, and any FAQ your team answers daily.\n\nFor Web-to-Print build: your product list with specifications, pricing, and any existing brand assets.\n\nFor Workflow Automation: access to your current workflow for the audit — we observe and document, you don't need to prepare anything.\n\nFor Custom AI: a description of the problem you want solved and access to whatever historical data exists. We'll tell you in the scoping call if the data is sufficient.",
      },
      {
        question: "How quickly can PrintOpsAI be up and running for my print shop?",
        answer: "Timeline depends on which product you start with:\n\nAI Chatbot: 48–72 hours from providing your pricing info → live chatbot on your website\nWeb-to-Print Store: 2–3 weeks for most shops → fully configured store on Shopify or WooCommerce\nWorkflow Automation: 6–12 weeks for full deployment → staged rollout starting with highest impact first\nDevOps: 1–2 weeks for optimisation → monitoring and improvements deployed\nCustom AI: 6–10 weeks → scoping through proof of concept to full deployment\n\nThe AI Chatbot is the fastest-deploying product and the most common starting point for new clients. Most print shops see their first measurable results (more after-hours leads captured) within the first week of deployment.",
      },
      {
        question: "Will implementing PrintOpsAI disrupt my current print production?",
        answer: "No — PrintOpsAI is designed to be implemented without disrupting your live production.\n\nAI Chatbot: deployed as a widget on top of your existing website. Zero disruption.\n\nWeb-to-Print: built in a staging environment and tested before going live. Your existing website or store keeps running until you choose to switch.\n\nWorkflow Automation: staged rollout — we automate one process at a time, starting with the one that has the least disruption risk. Your team tests each stage before we move to the next.\n\nDevOps: infrastructure improvements deployed in maintenance windows. No unplanned downtime.\n\nCustom AI: built and tested in a staging environment. Deployed to production only after your sign-off.\n\nThe only time disruption is possible is if you choose to migrate your existing web store to a new Shopify or WooCommerce build — and we manage that transition carefully.",
      },
      {
        question: "Do I need any technical knowledge to use PrintOpsAI?",
        answer: "No technical knowledge is required to use any PrintOpsAI product.\n\nAI Chatbot: you review the chatbot's responses in a simple dashboard. No coding.\n\nWeb-to-Print Store: you manage products, pricing, and orders through a standard Shopify or WooCommerce admin interface — the same platform millions of businesses use daily.\n\nWorkflow Automation: your team interacts with the workflow through a production dashboard. Barcode scanning updates job status — no technical configuration required from your team.\n\nDevOps: completely managed by PrintOpsAI. You receive monthly reports.\n\nCustom AI: you use the system through whatever interface we build — your team is trained during deployment. No technical knowledge needed to operate it.\n\nPrintOpsAI handles all setup, configuration, integration, and maintenance. Your job is to run your print shop — not to manage technology.",
      },
      {
        question: "What support do PrintOpsAI clients receive?",
        answer: "PrintOpsAI clients receive support through their dedicated US-based account lead and a team that understands print operations — not a generic tech support helpdesk.\n\nSupport included with all products:\n· Dedicated account lead who manages your relationship and reviews your results monthly\n· Technical support via email and live chat during US and Canadian business hours\n· Emergency infrastructure support available 24/7 for DevOps clients\n· Monthly performance reports showing usage, results, and optimisation opportunities\n\nProduct-specific support:\nAI Chatbot: monthly accuracy review — conversations analysed, gaps addressed, model updated.\nWorkflow Automation: monthly performance review of automation efficiency and throughput.\nCustom AI: 60-day post-launch monitoring and support included in every project.\nDevOps: 24/7 monitoring with proactive resolution — most issues resolved before you notice.\n\nYou will never talk to someone who doesn't understand print when you contact PrintOpsAI support.",
      },
    ],
  },
];

/* ── Accent helpers ──────────────────────────────────────────── */
const ACCENT = {
  cyan:   { chip: "border-cyan-500/25 bg-cyan-500/8 text-[#22d3ee]",   active: "border-cyan-400/60 bg-cyan-500/18 text-[#22d3ee]",   h2: "text-[#22d3ee]",   open: "border-[#06b6d4]/40 shadow-[0_0_28px_rgba(6,182,212,0.1)]" },
  violet: { chip: "border-violet-500/25 bg-violet-500/8 text-[#c4b5fd]", active: "border-violet-400/60 bg-violet-500/18 text-[#c4b5fd]", h2: "text-[#a78bfa]", open: "border-[#a78bfa]/40 shadow-[0_0_28px_rgba(139,92,246,0.1)]" },
  teal:   { chip: "border-teal-500/25 bg-teal-500/8 text-[#2dd4bf]",   active: "border-teal-400/60 bg-teal-500/18 text-[#2dd4bf]",   h2: "text-[#13C07A]",  open: "border-[#13C07A]/40 shadow-[0_0_28px_rgba(19,192,122,0.1)]" },
};

/* ── Component ───────────────────────────────────────────────── */
export default function FaqsPageClient() {
  const [active, setActive]   = useState<string>("all");
  const [open,   setOpen]     = useState<string | null>(null);

  const visible = active === "all" ? FAQ_DATA : FAQ_DATA.filter(c => c.id === active);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden ai-section section-pad px-4">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[700px] h-[400px] rounded-full bg-violet-600/10 blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-cyan-500/8 blur-[140px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <MotionInView>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/8 text-[#22d3ee] text-[12px] font-semibold tracking-widest uppercase mb-6">
              50 Questions · 8 Categories
            </span>
            <h1 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-[#94A3B8] text-[16px] sm:text-[17px] leading-[1.8] max-w-2xl mx-auto">
              Everything you need to know about PrintOpsAI — the only AI automation platform built exclusively for print businesses. Find answers about our AI chatbot, web-to-print platform, workflow automation, DevOps infrastructure, custom AI development, pricing, and getting started. Serving commercial print shops, web-to-print businesses, and print chains across the USA and Canada.
            </p>
          </MotionInView>
        </div>
      </section>

      {/* ── Category filter ──────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-[#0B1628]/95 backdrop-blur-md border-b border-white/[0.08] px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
          {CHIPS.map(chip => {
            const isAll      = chip.id === "all";
            const catData    = FAQ_DATA.find(c => c.id === chip.id);
            const color      = catData?.accentColor ?? "cyan";
            const isSelected = active === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => { setActive(chip.id); setOpen(null); }}
                className={`px-4 py-1.5 rounded-full border text-[12px] font-semibold tracking-wider uppercase transition-all duration-200 ${isSelected ? (isAll ? "border-white/40 bg-white/12 text-white" : ACCENT[color].active) : (isAll ? "border-white/15 text-[#94A3B8] hover:border-white/30 hover:text-white" : ACCENT[color].chip)}`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── FAQ sections ─────────────────────────────────────── */}
      {visible.map((cat, catIdx) => {
        const color = cat.accentColor;
        const isSurface = catIdx % 2 === 1;
        return (
          <section key={cat.id} id={`faq-${cat.id}`} className={`relative overflow-hidden ${isSurface ? "pa-band-surface" : "pa-band-page"} section-pad-sm px-4 border-t border-[var(--pa-line)]`}>
            <div className="pointer-events-none absolute inset-0">
              <div className={`absolute top-1/2 ${catIdx % 2 === 0 ? "left-0" : "right-0"} -translate-y-1/2 w-[500px] h-[300px] rounded-full ${color === "violet" ? "bg-violet-600/5" : color === "teal" ? "bg-teal-500/5" : "bg-cyan-500/5"} blur-[120px]`} />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <MotionInView className="mb-10">
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-semibold tracking-widest uppercase mb-4 ${ACCENT[color].chip}`}>
                  {cat.faqs.length} questions
                </span>
                <h2 className={`text-[1.6rem] sm:text-[2rem] font-extrabold tracking-tight ${ACCENT[color].h2}`}>
                  {cat.label}
                </h2>
              </MotionInView>

              <div className="space-y-2.5">
                {cat.faqs.map((faq, idx) => {
                  const key    = `${cat.id}-${idx}`;
                  const isOpen = open === key;
                  return (
                    <MotionInView key={key} delay={0.06 * idx}>
                      <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? `bg-[var(--pa-card)] ${ACCENT[color].open}` : "border-[var(--pa-line)] bg-[var(--pa-card)] hover:border-[var(--pa-line)]"}`}>
                        <button
                          onClick={() => setOpen(isOpen ? null : key)}
                          className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                          aria-expanded={isOpen}
                        >
                          <span className="pa-ink-text font-semibold text-[15px] leading-snug">{faq.question}</span>
                          <ChevronDown
                            size={18}
                            className={`shrink-0 transition-transform duration-300 ${isOpen ? `rotate-180 ${ACCENT[color].h2}` : "text-[var(--pa-ink-2)]"}`}
                          />
                        </button>
                        <div
                          className="overflow-hidden transition-all duration-300"
                          style={{ maxHeight: isOpen ? "800px" : "0" }}
                        >
                          <p className="pa-soft text-[14px] leading-[1.9] whitespace-pre-line px-6 pb-6">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </MotionInView>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA band ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pa-band-navy section-pad px-4 border-t border-white/[0.08]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-teal-500/10 blur-[160px]" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <MotionInView>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/25 bg-teal-500/8 text-[#13C07A] text-[12px] font-semibold tracking-widest uppercase mb-6">
              Get Started
            </span>
            <h2 className="text-[2rem] sm:text-[2.6rem] font-extrabold tracking-tight text-white mb-4">
              Still have questions?{" "}
              <span className="bg-gradient-to-r from-[#13C07A] to-[#22d3ee] bg-clip-text text-transparent">
                Let&apos;s talk.
              </span>
            </h2>
            <p className="text-[#94A3B8] text-[16px] leading-[1.8] mb-8">
              Book a free 30-minute demo session. We'll show you exactly what PrintOpsAI does for a print shop like yours — live, specific, and no obligation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#13C07A] text-[#062A1E] font-bold text-[15px] hover:bg-[#0F9A63] transition-colors duration-200"
              >
                Book a Free Demo
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white font-semibold text-[15px] hover:bg-white/8 transition-colors duration-200"
              >
                Talk to Sales
              </Link>
            </div>
            <p className="mt-5 text-[#64748B] text-[13px]">
              Free session · Written proposal within 48 hours · No commitment required
            </p>
          </MotionInView>
        </div>
      </section>
    </>
  );
}

"use client";
import Link from "next/link";
import {
  MessagesSquare, Settings, Database, Server, Brain, Globe,
  Rocket, Shield, Zap, BarChart2, Code2, Package, Printer,
  Users, Lightbulb, Target, Cloud, Link2, Smartphone, Lock,
  Check, ArrowRight,
} from "lucide-react";
import MotionInView from "@/components/MotionInView";
import type { SanityServices } from "@/lib/sanity.types";

// ── Icon map — iconName from Sanity → Lucide icon ─────────────────────────────
const ICON_BY_NAME: Record<string, React.ElementType> = {
  MessagesSquare, Globe, Database, Settings, Server, Brain,
  Rocket, Shield, Zap, BarChart2, Code2, Package, Printer,
  Users, Lightbulb, Target, Cloud, Link2, Smartphone, Lock,
};

// ── Legacy fallback — map by card title (for cards without iconName set) ──────
const ICON_BY_TITLE: Record<string, React.ElementType> = {
  "AI Chatbot":                MessagesSquare,
  "Web-to-Print Platform":     Globe,
  "ERPNext":                   Database,
  "Print Workflow Automation": Settings,
  "DevOps":                    Server,
  "Custom AI Development":     Brain,
};

const FALLBACK_ICON = Brain;

// ── Fallback hardcoded content (used when Sanity data is missing) ─────────────
const DEFAULTS = {
  badge:            "Our Services",
  heading:          "AI-Powered Solutions",
  headingHighlight: "Solutions",
  subtext:          "Comprehensive automation solutions tailored for the printing industry",
  cards: [
    { iconName: "MessagesSquare", title: "AI Chatbot",               href: "/products/chatbots",    description: "AI-powered chatbots trained on your print shop's pricing, turnaround times, and file specs — handle enquiries instantly, 24/7.",        features: ["Instant Quote Responses", "24/7 Customer Support", "Seamless Team Handoff"] },
    { iconName: "Globe",          title: "Web-to-Print Platform",    href: "/products/web-to-print", badge: "Most Popular", description: "Seamless online ordering systems with B2B ecommerce, product configurators, and marketplace integrations.", features: ["B2B Store Setup", "Product Configurator", "Marketplace Integrations"] },
    { iconName: "Database",       title: "ERPNext",                  href: "/products/erpnext",     description: "Replace disconnected tools with a single ERPNext platform — jobs, inventory, billing, and CRM in one place.",          features: ["Jobs & Inventory", "Billing & CRM", "Real-time Reporting"] },
    { iconName: "Settings",       title: "Print Workflow Automation", href: "/services/automation",  description: "Automate order intake, prepress, scheduling, and fulfillment with systems built for real print operations.",            features: ["Order Intake Automation", "Job Scheduling", "Fulfillment Tracking"] },
    { iconName: "Server",         title: "DevOps",                   href: "/services/devops",      description: "Keep your print systems fast, stable, and secure under heavy file uploads, traffic spikes, and complex workflows.",    features: ["Scalable Infrastructure", "24/7 Monitoring", "Security Hardening"] },
    { iconName: "Brain",          title: "Custom AI Development",    href: "/services/custom-ai",   description: "Bespoke AI systems designed around your specific print workflows — from predictive analytics to intelligent automation.", features: ["Tailored AI Models", "Predictive Analytics", "Full Integration Support"] },
  ] as import("@/lib/sanity.types").SanityServiceCard[],
};

export default function ServicesSection({ data }: { data?: SanityServices }) {
  const badge            = data?.badge            || DEFAULTS.badge;
  const heading          = data?.heading          || DEFAULTS.heading;
  const headingHighlight = data?.headingHighlight || DEFAULTS.headingHighlight;
  const subtext          = data?.subtext          || DEFAULTS.subtext;
  const cards            = (data?.cards?.length ? data.cards : null) ?? DEFAULTS.cards;

  // Split heading around the highlight word for gradient styling
  const highlightIndex  = heading.indexOf(headingHighlight);
  const beforeHighlight = highlightIndex > -1 ? heading.slice(0, highlightIndex) : heading;
  const afterHighlight  = highlightIndex > -1 ? heading.slice(highlightIndex + headingHighlight.length) : "";

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#0a0b14] section-pad px-4 border-t border-white/[0.04]"
    >
      <div className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[800px] h-[400px] section-glow" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-16">
          <span className="badge">{badge}</span>
          <h2 className="mt-5 text-[2.1rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {beforeHighlight}
            <span className="gradient-text">{headingHighlight}</span>
            {afterHighlight}
          </h2>
          <p className="mt-4 text-gray-400 text-[16px] sm:text-[17px] leading-[1.7] max-w-2xl mx-auto">
            {subtext}
          </p>
        </MotionInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon =
              (card.iconName ? ICON_BY_NAME[card.iconName] : null) ??
              ICON_BY_TITLE[card.title] ??
              FALLBACK_ICON;
            return (
              <MotionInView key={card.title} delay={i * 0.15}>
                <Link
                  href={card.href}
                  className="group relative card-dark p-7 flex flex-col h-full"
                >
                  {card.badge && (
                    <span className="absolute top-5 right-5 px-3 py-1 rounded-full text-[11px] font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 shadow-[0_0_18px_rgba(124,58,237,0.4)]">
                      {card.badge}
                    </span>
                  )}

                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 bg-violet-600/15 border border-violet-500/25">
                    <Icon className="w-6 h-6 text-violet-300" />
                  </div>

                  <h3 className="text-[1.15rem] font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-gray-400 text-[14px] leading-[1.7] mb-6">{card.description}</p>

                  <ul className="space-y-2.5 mb-6">
                    {(card.features ?? []).map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-[13.5px] text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto inline-flex items-center gap-1.5 gradient-link text-[14px] group-hover:gap-2.5 transition-all duration-300">
                    Learn More <ArrowRight className="w-4 h-4 text-cyan-400" />
                  </span>
                </Link>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

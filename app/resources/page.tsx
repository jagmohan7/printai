import Link from "next/link";
import { BookOpen, ArrowRight, ExternalLink, Lightbulb, BookMarked } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import type { Metadata } from "next";
import { getResourcesPage } from "@/lib/sanity.queries";
import { getIcon } from "@/lib/lucide-icon";
import { pickArray, splitHeading } from "@/lib/section-utils";
import { buildProductMetadata } from "@/lib/page-metadata";
import CustomSchema from "@/components/CustomSchema";

const TITLE = "Resources";
const DESCRIPTION =
  "Guides, insights, and documentation to help you navigate AI automation for your printing business.";
const PATH = "/resources";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getResourcesPage();
  return buildProductMetadata({
    cmsTitle:      cms?.seo?.title,
    cmsDesc:       cms?.seo?.description,
    fallbackTitle: TITLE,
    fallbackDesc:  DESCRIPTION,
    path:          PATH,
  });
}

export const revalidate = 5;

// ── Fallback content ──────────────────────────────────────────────────────
const FALLBACK = {
  hero: {
    heading:     "Resources",
    description: "Guides, insights, and documentation to help you navigate AI automation for your printing business.",
  },
  guides: {
    heading: "Guides",
    items: [
      { icon: "Play",       title: "Getting Started with Print Automation", description: "A step-by-step guide to identifying automation opportunities in your print shop and building your first automated workflow.", ctaText: "Request Guide", ctaHref: "/#contact" },
      { icon: "FileText",   title: "ERPNext Implementation Checklist",      description: "Everything you need to prepare before, during, and after your ERPNext rollout — from data migration to team training.", ctaText: "Request Guide", ctaHref: "/#contact" },
      { icon: "BookMarked", title: "Chatbot ROI Calculator Guide",          description: "How to calculate the return on investment for deploying an AI chatbot in your printing business, with real benchmarks.", ctaText: "Request Guide", ctaHref: "/#contact" },
    ],
  },
  insights: {
    heading: "Industry Insights",
    items: [
      { title: "The Future of Print Operations: AI from Prepress to Delivery", description: "A deep dive into how leading print businesses are transforming end-to-end operations — from automated prepress to intelligent customer service.", ctaText: "Request Report", ctaHref: "/#contact" },
      { title: "Digital Transformation Roadmap for Mid-Size Printers",        description: "A practical framework for print businesses starting their digital journey — how to sequence investments for quick wins while building toward full digital operations.", ctaText: "Request Report", ctaHref: "/#contact" },
    ],
  },
  docs: {
    heading: "Documentation",
    items: [
      { icon: "BookOpen", title: "ERPNext Official Documentation", description: "Complete reference for ERPNext modules, configuration, and customization used in PrintAI implementations.", ctaText: "View Docs", ctaHref: "https://docs.erpnext.com", external: true },
      { icon: "Code2",    title: "Frappe Framework Reference",     description: "Developer documentation for the Frappe framework that powers our custom ERPNext modules and integrations.", ctaText: "View Docs", ctaHref: "https://frappeframework.com/docs", external: true },
    ],
  },
  cta: {
    heading:       "Need Personalized Guidance?",
    highlightWord: "Personalized",
    description:   "Our team can help you find the right solution for your specific needs.",
    ctaText:       "Talk to Us",
    ctaHref:       "/#contact",
  },
};

// Cycling icon themes for card icons
const ICON_THEMES = [
  { iconBg: "bg-violet-500/20 border-violet-500/25", iconColor: "text-violet-400" },
  { iconBg: "bg-cyan-500/20 border-cyan-500/25",     iconColor: "text-cyan-400" },
];

function SectionHeading({ icon: Icon, iconColor, label }: { icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>; iconColor: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-6">
      <Icon size={20} className={iconColor} strokeWidth={1.8} />
      <h2 className="text-white font-extrabold text-[1.4rem]">{label}</h2>
    </div>
  );
}

export default async function ResourcesPage() {
  const cms = await getResourcesPage();

  const hero     = cms?.hero ?? FALLBACK.hero;
  const guides   = { heading: cms?.guides?.heading   ?? FALLBACK.guides.heading,   items: pickArray(cms?.guides?.items,   FALLBACK.guides.items) };
  const insights = { heading: cms?.insights?.heading ?? FALLBACK.insights.heading, items: pickArray(cms?.insights?.items, FALLBACK.insights.items) };
  const docs     = { heading: cms?.docs?.heading     ?? FALLBACK.docs.heading,     items: pickArray(cms?.docs?.items,     FALLBACK.docs.items) };
  const cta      = cms?.cta ?? FALLBACK.cta;

  const [cb, ch, ca] = splitHeading(cta.heading || FALLBACK.cta.heading, cta.highlightWord);

  return (
    <main className="min-h-screen bg-[#0a0b14]">
      <CustomSchema raw={cms?.seo?.customSchema} />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-cyan-600/6 blur-[150px]" />
      </div>

      {/* ── HERO ── */}
      <section className="relative section-hero px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-[13px] text-[#9ca3af] mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Resources</span>
          </div>

          <MotionInView>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center mb-6 shadow-[0_0_32px_rgba(124,58,237,0.4)]">
              <BookOpen size={24} className="text-white" strokeWidth={1.8} />
            </div>
          </MotionInView>

          <MotionInView delay={0.1}>
            <h1 className="text-[3rem] sm:text-[3.8rem] font-extrabold tracking-tight leading-[1.05] bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">
              {hero.heading}
            </h1>
          </MotionInView>

          <MotionInView delay={0.2}>
            <p className="mt-4 text-[#9ca3af] text-[16px] leading-[1.8] max-w-lg">{hero.description}</p>
          </MotionInView>
        </div>
      </section>

      {/* ── GUIDES ── */}
      <section className="relative section-pad px-4">
        <div className="max-w-6xl mx-auto">
          <MotionInView><SectionHeading icon={BookMarked} iconColor="text-violet-400" label={guides.heading} /></MotionInView>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guides.items.map((g, i) => {
              const Icon = getIcon(g.icon);
              const t = ICON_THEMES[i % ICON_THEMES.length];
              return (
                <MotionInView key={i} delay={0.08 * i}>
                  <div className="group h-full flex gap-4 p-6 rounded-2xl border border-white/[0.07] bg-[#12131f] hover:border-[#a78bfa]/30 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(124,58,237,0.1)] transition-all duration-300">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${t.iconBg}`}>
                      <Icon size={16} className={t.iconColor} strokeWidth={1.8} />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-white font-bold text-[15px] mb-2">{g.title}</h3>
                      <p className="text-[#9ca3af] text-[13px] leading-[1.7] flex-1">{g.description}</p>
                      <Link href={g.ctaHref || "/#contact"} className="mt-3 inline-flex items-center gap-1 text-[#a78bfa] text-[13px] font-semibold hover:text-[#22d3ee] transition-colors duration-200 group/link">
                        {g.ctaText || "Request Guide"}
                        <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </MotionInView>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY INSIGHTS ── */}
      <section className="relative section-pad px-4">
        <div className="max-w-6xl mx-auto">
          <MotionInView><SectionHeading icon={Lightbulb} iconColor="text-amber-400" label={insights.heading} /></MotionInView>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {insights.items.map((ins, i) => (
              <MotionInView key={i} delay={0.1 * i}>
                <div className="group h-full flex flex-col p-6 rounded-2xl border border-white/[0.07] bg-[#12131f] hover:border-[#06b6d4]/30 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(6,182,212,0.08)] transition-all duration-300">
                  <h3 className="text-white font-bold text-[15px] mb-2">{ins.title}</h3>
                  <p className="text-[#9ca3af] text-[13px] leading-[1.7] flex-1">{ins.description}</p>
                  <Link href={ins.ctaHref || "/#contact"} className="mt-4 inline-flex items-center gap-1 text-[#a78bfa] text-[13px] font-semibold hover:text-[#22d3ee] transition-colors duration-200 group/link">
                    {ins.ctaText || "Request Report"}
                    <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </MotionInView>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTATION ── */}
      <section className="relative section-pad px-4">
        <div className="max-w-6xl mx-auto">
          <MotionInView><SectionHeading icon={BookOpen} iconColor="text-cyan-400" label={docs.heading} /></MotionInView>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {docs.items.map((d, i) => {
              const Icon = getIcon(d.icon);
              const t = ICON_THEMES[i % ICON_THEMES.length];
              const external = d.external !== false;
              return (
                <MotionInView key={i} delay={0.1 * i}>
                  <div className="group h-full flex gap-4 p-6 rounded-2xl border border-white/[0.07] bg-[#12131f] hover:border-[#06b6d4]/30 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(6,182,212,0.08)] transition-all duration-300">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${t.iconBg}`}>
                      <Icon size={16} className={t.iconColor} strokeWidth={1.8} />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-white font-bold text-[15px] mb-2">{d.title}</h3>
                      <p className="text-[#9ca3af] text-[13px] leading-[1.7] flex-1">{d.description}</p>
                      <a
                        href={d.ctaHref || "#"}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="mt-3 inline-flex items-center gap-1.5 text-[#a78bfa] text-[13px] font-semibold hover:text-[#22d3ee] transition-colors duration-200"
                      >
                        {d.ctaText || "View Docs"}
                        {external
                          ? <ExternalLink size={12} />
                          : <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />}
                      </a>
                    </div>
                  </div>
                </MotionInView>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative section-pad-sm px-4 border-t border-white/[0.04]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-violet-600/10 blur-[130px]" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto text-center">
          <MotionInView>
            <h2 className="text-[2rem] sm:text-[2.6rem] font-extrabold tracking-tight text-white leading-[1.15]">
              {cb}{ch && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{ch}</span>}{ca}
            </h2>
          </MotionInView>

          <MotionInView delay={0.15}>
            <p className="mt-4 text-[#9ca3af] text-[15px] leading-[1.8]">{cta.description}</p>
          </MotionInView>

          <MotionInView delay={0.3}>
            <Link href={cta.ctaHref || "/#contact"} className="mt-8 inline-flex items-center gap-2.5 px-9 py-[15px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:from-violet-500 hover:to-cyan-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_40px_rgba(124,58,237,0.4)]">
              {cta.ctaText || "Talk to Us"}
            </Link>
          </MotionInView>
        </div>
      </section>
    </main>
  );
}

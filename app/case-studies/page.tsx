import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import type { Metadata } from "next";
import { getCaseStudiesPage } from "@/lib/sanity.queries";
import { getIcon } from "@/lib/lucide-icon";
import { splitHeading, pickArray } from "@/lib/section-utils";
import { buildProductMetadata } from "@/lib/page-metadata";
import CustomSchema from "@/components/CustomSchema";

const TITLE = "Case Studies";
const DESCRIPTION =
  "Real results from real printing businesses. See how our AI solutions drive measurable impact across the industry.";
const PATH = "/case-studies";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCaseStudiesPage();
  return buildProductMetadata({
    cmsTitle:      cms?.seo?.title,
    cmsDesc:       cms?.seo?.description,
    fallbackTitle: TITLE,
    fallbackDesc:  DESCRIPTION,
    path:          PATH,
  });
}

export const revalidate = 5;

// ── Fallback content (used when CMS is empty) ─────────────────────────────────
const FALLBACK = {
  hero: {
    heading:       "Case Studies",
    highlightWord: "Studies",
    description:   "Real results from real printing businesses. See how our AI solutions drive measurable impact across the industry.",
  },
  cases: [
    { category: "Commercial Printing", icon: "Printer", title: "Regional Print Shop Automates Order Processing",       description: "A mid-size commercial printer eliminated manual order entry and reduced processing time from hours to minutes.", ctaText: "Get Similar Results", ctaHref: "/#contact", stats: [{ value: "85%", label: "FASTER\nPROCESSING" }, { value: "3x", label: "ORDER\nVOLUME" }, { value: "$120K", label: "ANNUAL\nSAVINGS" }] },
    { category: "Large Format",        icon: "Bot",     title: "Enterprise Printer Deploys AI Customer Support",        description: "A large format printing company deployed an AI chatbot that handles 80% of customer inquiries without human intervention.", ctaText: "Get Similar Results", ctaHref: "/#contact", stats: [{ value: "80%", label: "AUTO-RESOLVED" }, { value: "24/7", label: "AVAILABILITY" }, { value: "4.8/5", label: "SATISFACTION" }] },
    { category: "Multi-Location",      icon: "Database",title: "Print Chain Unifies Operations with ERPNext",          description: "A 5-location print chain consolidated disparate systems into a single ERPNext platform with custom print modules.", ctaText: "Get Similar Results", ctaHref: "/#contact", stats: [{ value: "5", label: "SITES UNIFIED" }, { value: "40%", label: "COST REDUCTION" }, { value: "1", label: "PLATFORM" }] },
    { category: "Packaging",           icon: "Package", title: "Packaging Company Optimizes Inventory with AI",         description: "A packaging printer reduced material waste and stockouts by implementing AI-driven inventory management.", ctaText: "Get Similar Results", ctaHref: "/#contact", stats: [{ value: "60%", label: "LESS\nWASTE" }, { value: "95%", label: "STOCK\nACCURACY" }, { value: "$85K", label: "SAVED\nYEARLY" }] },
    { category: "Web-to-Print",        icon: "Globe",   title: "Online Print Store Scales with Automation",             description: "A web-to-print business automated their entire fulfillment pipeline, enabling rapid growth without proportional staff increases.", ctaText: "Get Similar Results", ctaHref: "/#contact", stats: [{ value: "300%", label: "REVENUE\nGROWTH" }, { value: "2hr", label: "AVG\nTURNAROUND" }, { value: "99.2%", label: "ACCURACY" }] },
    { category: "Digital Printing",    icon: "Settings",title: "Digital Printer Transforms QC with Machine Learning",   description: "A digital printing operation implemented ML-based quality control that catches defects in real-time during production runs.", ctaText: "Get Similar Results", ctaHref: "/#contact", stats: [{ value: "98%", label: "DEFECT\nDETECTION" }, { value: "50%", label: "LESS\nREPRINTS" }, { value: "ROI\n6 MONTHS", label: "" }] },
  ],
  cta: {
    heading:       "Want Results Like These?",
    highlightWord: "These",
    description:   "Let's discuss how PrintAI can transform your printing operations.",
    ctaText:       "🚀 Get Started",
    ctaHref:       "/#contact",
  },
};

// Cycling colour themes — editors just supply text + icon; colours rotate.
const CARD_THEMES = [
  { categoryColor: "text-violet-400 bg-violet-400/10 border-violet-400/20",  iconBg: "from-violet-700/60 to-indigo-800/60" },
  { categoryColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", iconBg: "from-teal-700/60 to-cyan-800/60" },
  { categoryColor: "text-pink-400 bg-pink-400/10 border-pink-400/20",        iconBg: "from-purple-800/60 to-pink-800/60" },
  { categoryColor: "text-orange-400 bg-orange-400/10 border-orange-400/20",  iconBg: "from-orange-800/60 to-amber-900/60" },
  { categoryColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",        iconBg: "from-cyan-800/60 to-teal-800/60" },
  { categoryColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",  iconBg: "from-violet-900/60 to-purple-800/60" },
];

export default async function CaseStudiesPage() {
  const cms = await getCaseStudiesPage();

  const hero  = cms?.hero ?? FALLBACK.hero;
  const cases = pickArray(cms?.cases?.items, FALLBACK.cases);
  const cta   = cms?.cta ?? FALLBACK.cta;

  const [hb, hh, ha]  = splitHeading(hero.heading || FALLBACK.hero.heading, hero.highlightWord);
  const [cb, ch, ca]  = splitHeading(cta.heading || FALLBACK.cta.heading, cta.highlightWord);

  return (
    <main className="min-h-screen bg-[#0a0b14]">
      <CustomSchema raw={cms?.seo?.customSchema} />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-violet-600/8 blur-[150px]" />
      </div>

      {/* ── HERO ── */}
      <section className="relative section-hero px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-[13px] text-[#9ca3af] mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Case Studies</span>
          </div>

          <MotionInView>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center mb-6 shadow-[0_0_32px_rgba(124,58,237,0.4)]">
              <TrendingUp size={24} className="text-white" strokeWidth={1.8} />
            </div>
          </MotionInView>

          <MotionInView delay={0.1}>
            <h1 className="text-[3rem] sm:text-[3.8rem] font-extrabold tracking-tight leading-[1.05]">
              <span className="text-white">{hb}</span>
              {hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}
              <span className="text-white">{ha}</span>
            </h1>
          </MotionInView>

          <MotionInView delay={0.2}>
            <p className="mt-4 text-[#9ca3af] text-[16px] leading-[1.8] max-w-lg">{hero.description}</p>
          </MotionInView>
        </div>
      </section>

      {/* ── CASE STUDY GRID ── */}
      <section className="relative section-pad px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => {
            const Icon  = getIcon(c.icon);
            const theme = CARD_THEMES[i % CARD_THEMES.length];
            const stats = pickArray(c.stats, []);
            return (
              <MotionInView key={i} delay={0.08 * i}>
                <div className="group h-full flex flex-col rounded-2xl border border-white/[0.07] bg-[#12131f] overflow-hidden hover:border-white/[0.13] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300">
                  <div className={`relative h-[130px] bg-gradient-to-br ${theme.iconBg} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
                    <Icon size={44} className="text-white/40" strokeWidth={1.2} />
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    {c.category && (
                      <span className={`self-start text-[11px] font-semibold px-3 py-1 rounded-full border ${theme.categoryColor} mb-4`}>
                        {c.category}
                      </span>
                    )}
                    <h2 className="text-white font-bold text-[16px] leading-snug mb-3">{c.title}</h2>
                    <p className="text-[#9ca3af] text-[13px] leading-[1.7] flex-1">{c.description}</p>

                    {stats.length > 0 && (
                      <div className="flex gap-4 mt-5 pt-5 border-t border-white/[0.06]">
                        {stats.map((s, j) => (
                          <div key={j} className="flex flex-col">
                            <span className="text-[#22d3ee] font-extrabold text-[16px] leading-tight whitespace-pre-line">{s.value}</span>
                            <span className="text-[#9ca3af] text-[10px] font-medium mt-0.5 whitespace-pre-line leading-tight">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <Link href={c.ctaHref || "/#contact"} className="mt-5 inline-flex items-center gap-1.5 text-[#a78bfa] text-[13px] font-semibold hover:text-[#22d3ee] transition-colors duration-200 group/link">
                      {c.ctaText || "Get Similar Results"}
                      <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </MotionInView>
            );
          })}
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
              {cta.ctaText || "Get Started"}
            </Link>
          </MotionInView>
        </div>
      </section>
    </main>
  );
}

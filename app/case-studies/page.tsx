import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import type { Metadata } from "next";
import { getCaseStudiesPage } from "@/lib/sanity.queries";
import { pickArray, splitHeading } from "@/lib/section-utils";
import { buildProductMetadata } from "@/lib/page-metadata";
import CustomSchema from "@/components/CustomSchema";
import CaseStudiesContent from "./CaseStudiesContent";

const TITLE       = "Case Studies — PrintOpsAI";
const DESCRIPTION = "Real results from real printing businesses. See how our AI solutions drive measurable impact.";
const PATH        = "/case-studies";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCaseStudiesPage();
  return buildProductMetadata({ cmsTitle: cms?.seo?.title, cmsDesc: cms?.seo?.description, fallbackTitle: TITLE, fallbackDesc: DESCRIPTION, path: PATH, canonicalUrl: cms?.seo?.canonicalUrl });
}

export const revalidate = 5;

const FALLBACK_CASES = [
  { category: "Commercial Printing", icon: "Printer",  title: "Regional Print Shop Automates Order Processing",      description: "A mid-size commercial printer eliminated manual order entry and reduced processing time from hours to minutes.",             ctaText: "Get Similar Results", ctaHref: "/#contact", stats: [{ value: "85%", label: "FASTER\nPROCESSING" }, { value: "3x", label: "ORDER\nVOLUME" }, { value: "$120K", label: "ANNUAL\nSAVINGS" }] },
  { category: "Large Format",        icon: "Bot",      title: "Enterprise Printer Deploys AI Customer Support",       description: "A large format printing company deployed an AI chatbot handling 80% of customer inquiries without human intervention.",    ctaText: "Get Similar Results", ctaHref: "/#contact", stats: [{ value: "80%", label: "AUTO-RESOLVED" }, { value: "24/7", label: "AVAILABILITY" }, { value: "4.8/5", label: "SATISFACTION" }] },
  { category: "Packaging",           icon: "Package",  title: "Packaging Company Optimises Inventory with AI",        description: "A packaging printer reduced material waste and stockouts by implementing AI-driven inventory management.",                 ctaText: "Get Similar Results", ctaHref: "/#contact", stats: [{ value: "60%", label: "LESS\nWASTE" }, { value: "95%", label: "STOCK\nACCURACY" }, { value: "$85K", label: "SAVED\nYEARLY" }] },
  { category: "Web-to-Print",        icon: "Globe",    title: "Online Print Store Scales with Automation",             description: "A web-to-print business automated their entire fulfillment pipeline, enabling rapid growth without proportional headcount.", ctaText: "Get Similar Results", ctaHref: "/#contact", stats: [{ value: "300%", label: "REVENUE\nGROWTH" }, { value: "2hr", label: "AVG\nTURNAROUND" }, { value: "99.2%", label: "ACCURACY" }] },
  { category: "Digital Printing",    icon: "Settings", title: "Digital Printer Transforms QC with Machine Learning",  description: "A digital printing operation implemented ML-based quality control catching defects in real-time during production runs.",   ctaText: "Get Similar Results", ctaHref: "/#contact", stats: [{ value: "98%", label: "DEFECT\nDETECTION" }, { value: "50%", label: "LESS\nREPRINTS" }, { value: "6mo", label: "ROI\nPAYBACK" }] },
  { category: "Multi-Location",      icon: "Database", title: "Print Chain Unifies 5 Sites on One Platform",          description: "A 5-location print chain consolidated disparate systems into a single platform with custom print modules and reporting.",   ctaText: "Get Similar Results", ctaHref: "/#contact", stats: [{ value: "5", label: "SITES UNIFIED" }, { value: "40%", label: "COST REDUCTION" }, { value: "1", label: "PLATFORM" }] },
];

const FALLBACK_CTA = {
  heading: "Want Results Like These?", highlightWord: "These",
  description: "Let's discuss how PrintOpsAI can transform your printing operations.",
  ctaText: "🚀 Get Started", ctaHref: "/#contact",
};

export default async function CaseStudiesPage() {
  const cms = await getCaseStudiesPage();

  const hero  = cms?.hero  ?? { heading: "Case Studies", highlightWord: "Studies", description: DESCRIPTION };
  const cases = pickArray(cms?.cases?.items, FALLBACK_CASES);
  const cta   = cms?.cta   ?? FALLBACK_CTA;

  const [hb, hh, ha] = splitHeading(hero.heading || "Case Studies", hero.highlightWord);
  const [cb, ch, ca] = splitHeading(cta.heading || FALLBACK_CTA.heading, cta.highlightWord);

  return (
    <main className="min-h-screen bg-[#0a0b14]">
      <CustomSchema raw={cms?.seo?.customSchema} />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-violet-600/8 blur-[150px]" />
      </div>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <MotionInView>
            <div className="flex items-center gap-2 text-[13px] text-[#9ca3af] mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <span className="text-white">Case Studies</span>
            </div>
          </MotionInView>

          <MotionInView delay={0.05}>
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

      {/* ── FILTER + GRID (client component) ── */}
      <CaseStudiesContent cases={cases} />

      {/* ── BOTTOM CTA ── */}
      <section className="relative py-20 px-4 border-t border-white/[0.04]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-violet-600/10 blur-[130px]" />
        </div>
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <MotionInView>
            <h2 className="text-[2rem] sm:text-[2.6rem] font-extrabold tracking-tight text-white leading-[1.15]">
              {cb}
              {ch && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{ch}</span>}
              {ca}
            </h2>
          </MotionInView>
          <MotionInView delay={0.15}>
            <p className="mt-4 text-[#9ca3af] text-[15px] leading-[1.8]">{cta.description}</p>
          </MotionInView>
          <MotionInView delay={0.3}>
            <Link
              href={cta.ctaHref || "/#contact"}
              className="mt-8 inline-flex items-center gap-2.5 px-9 py-[15px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:from-violet-500 hover:to-cyan-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_40px_rgba(124,58,237,0.4)]"
            >
              {cta.ctaText || "Get Started"}
              <ArrowRight size={16} />
            </Link>
          </MotionInView>
        </div>
      </section>
    </main>
  );
}

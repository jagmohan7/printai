"use client";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { pickArray } from "@/lib/section-utils";

export interface CustomAICtaData {
  badge?: string;
  headingLines?: string[]; // ** for gradient
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

interface Props { data?: CustomAICtaData | null }

const FALLBACK = {
  badge: "Get Started in 48 Hours",
  headingLines: ["Tell Us the Workflow", "**That's Breaking**"],
  description: "We'll scope your custom AI solution in 48 hours — with clear problem, solution, timeline, and cost.",
  ctaText: "Book AI Scoping Call",
  ctaHref: "/#contact",
};

function renderLine(line: string, key: number, total: number) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span key={key}>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <span key={i} className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{p.slice(2, -2)}</span>
        ) : (
          <span key={i} className="text-white">{p}</span>
        )
      )}
      {key < total - 1 && <br />}
    </span>
  );
}

export default function CustomAICtaSection({ data }: Props) {
  const badge        = data?.badge        ?? FALLBACK.badge;
  const headingLines = pickArray(data?.headingLines, FALLBACK.headingLines);
  const description  = data?.description  ?? FALLBACK.description;
  const ctaText      = data?.ctaText      ?? FALLBACK.ctaText;
  const ctaHref      = data?.ctaHref      ?? FALLBACK.ctaHref;

  return (
    <section className="relative overflow-hidden section-pad-sm px-4 border-t border-white/[0.04]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-900/35 via-[#070810] to-cyan-900/25" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-violet-700/14 blur-[180px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-cyan-500/12 blur-[130px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[200px] rounded-full bg-violet-500/8 blur-[100px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "70px 70px" }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <MotionInView>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-[#c4b5fd] text-[12px] font-semibold tracking-widest uppercase mb-8">
            <Zap size={12} />
            {badge}
          </div>
        </MotionInView>

        <MotionInView delay={0.1}>
          <h2 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-extrabold tracking-tight leading-[1.1]">
            {headingLines.map((line, i) => renderLine(line, i, headingLines.length))}
          </h2>
        </MotionInView>

        <MotionInView delay={0.2}>
          <p className="mt-6 text-[#9ca3af] text-[16px] sm:text-[18px] leading-[1.85] max-w-2xl mx-auto">{description}</p>
        </MotionInView>

        <MotionInView delay={0.35}>
          <Link href={ctaHref} className="mt-10 inline-flex items-center gap-2.5 px-12 py-[18px] rounded-xl font-semibold text-[16px] text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891b2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_40px_rgba(59,130,246,0.5)]">
            {ctaText} <ArrowRight className="w-5 h-5" />
          </Link>
        </MotionInView>
      </div>
    </section>
  );
}

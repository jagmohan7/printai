"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { splitHeading } from "@/lib/section-utils";

export interface ERPCtaData {
  sectionTag?: string;
  heading1?: string;
  heading2?: string;
  highlightWord?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

interface Props { data?: ERPCtaData | null }

const FALLBACK = {
  sectionTag:    "Get Started",
  heading1:      "Stop Managing Systems.",
  heading2:      "Start Running Your Business.",
  highlightWord: "Start Running Your Business.",
  description:   "Get a print-specific ERP demo and see how your operations can run from one platform.",
  ctaText:       "Book ERP Demo",
  ctaHref:       "/#contact",
};

export default function ERPCtaSection({ data }: Props) {
  const sectionTag    = data?.sectionTag    ?? FALLBACK.sectionTag;
  const heading1      = data?.heading1      ?? FALLBACK.heading1;
  const heading2      = data?.heading2      ?? FALLBACK.heading2;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const description   = data?.description   ?? FALLBACK.description;
  const ctaText       = data?.ctaText       ?? FALLBACK.ctaText;
  const ctaHref       = data?.ctaHref       ?? FALLBACK.ctaHref;

  // Render heading2 with optional highlight word
  const [hb2, hh2, ha2] = splitHeading(heading2, highlightWord);

  return (
    <section className="relative overflow-hidden bg-[#070B14] section-pad-sm px-4 border-t border-[#1E293B]/50">
      <style>{`
        @keyframes cta-glow-pulse { 0%,100% { opacity:.6; transform:scale(1); } 50% { opacity:1; transform:scale(1.08); } }
        .cta-glow { animation: cta-glow-pulse 4s ease-in-out infinite; }
      `}</style>

      <div className="cta-glow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-[#7c3aed]/14 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-[#06b6d4]/10 blur-[80px]" />

      <div className="relative z-10 max-w-[700px] mx-auto text-center">
        <MotionInView>
          <p className="text-[#a78bfa] text-[13px] font-semibold uppercase tracking-widest mb-5">{sectionTag}</p>
          <h2 className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.1] text-white mb-5">
            {heading1}{" "}
            {hb2}{hh2 && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh2}</span>}{ha2}
          </h2>
          <p className="text-[#94A3B8] text-[16px] sm:text-[17px] leading-[1.8] mb-10 max-w-[540px] mx-auto">{description}</p>
          <Link href={ctaHref} className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891b2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            {ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
        </MotionInView>
      </div>
    </section>
  );
}

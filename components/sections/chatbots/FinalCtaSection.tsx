"use client";

import MotionInView from "@/components/MotionInView";
import Link from "next/link";

export interface FinalCtaSectionData {
  badge?: string;
  heading?: string;
  highlightWord?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  supportPoints?: string[];
}

interface Props { data?: FinalCtaSectionData | null }

const FALLBACK = {
  badge:         "Limited Onboarding Spots Available",
  heading:       "Stop Losing Leads to Inbox Lag",
  highlightWord: "Inbox Lag",
  description:   "Let AI handle the repetitive work so your team can focus on real jobs.",
  ctaText:       "Book Free Audit",
  ctaHref:       "/#contact",
  supportPoints: ["✓ Free 30-min audit", "✓ No commitment", "✓ Results in 30 days"],
};

function splitHeading(heading: string, highlight?: string): [string, string, string] {
  if (!highlight) return [heading, "", ""];
  const idx = heading.indexOf(highlight);
  if (idx === -1) return [heading, "", ""];
  return [heading.slice(0, idx), highlight, heading.slice(idx + highlight.length)];
}

export default function FinalCtaSection({ data }: Props) {
  const badge         = data?.badge         ?? FALLBACK.badge;
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const description   = data?.description   ?? FALLBACK.description;
  const ctaText       = data?.ctaText       ?? FALLBACK.ctaText;
  const ctaHref       = data?.ctaHref       ?? FALLBACK.ctaHref;
  const points        = (data?.supportPoints && data.supportPoints.length > 0) ? data.supportPoints : FALLBACK.supportPoints;

  const [headBefore, headHighlight, headAfter] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden bg-[#0B1220] section-pad-sm px-4 border-t border-[#1E293B]/50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-blue-500/8 blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-violet-500/6 blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {badge && (
          <MotionInView delay={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6] text-[12px] font-semibold tracking-widest uppercase mb-6">
              {badge}
            </span>
          </MotionInView>
        )}

        <MotionInView delay={0.1}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
            {headBefore}
            {headHighlight && (
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                {headHighlight}
              </span>
            )}
            {headAfter}
          </h2>
        </MotionInView>

        <MotionInView delay={0.2}>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10">{description}</p>
        </MotionInView>

        <MotionInView delay={0.3}>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 px-9 py-4 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-bold text-base shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_rgba(59,130,246,0.7)] hover:-translate-y-0.5 transition-all duration-300 mb-6"
          >
            {ctaText}
          </Link>
        </MotionInView>

        <MotionInView delay={0.4}>
          <p className="text-[#64748B] text-sm flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {points.map((p, i) => (
              <span key={i} className="flex items-center gap-x-3">
                <span>{p}</span>
                {i < points.length - 1 && <span className="text-[#1E293B]">·</span>}
              </span>
            ))}
          </p>
        </MotionInView>
      </div>
    </section>
  );
}

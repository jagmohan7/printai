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
    <section className="relative overflow-hidden pa-band-surface section-pad-sm px-4 border-t border-[color:var(--pa-line)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[160px]" style={{ background: "rgba(103,61,230,0.05)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[120px]" style={{ background: "rgba(103,61,230,0.05)" }} />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {badge && (
          <MotionInView delay={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-widest uppercase mb-6" style={{ borderColor: "rgba(103,61,230,0.3)", background: "rgba(103,61,230,0.1)", color: "var(--pa-teal)", border: "1px solid rgba(103,61,230,0.3)" }}>
              {badge}
            </span>
          </MotionInView>
        )}

        <MotionInView delay={0.1}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black pa-ink-text tracking-tight leading-tight mb-6">
            {headBefore}
            {headHighlight && (
              <span style={{ color: "var(--pa-teal)" }}>
                {headHighlight}
              </span>
            )}
            {headAfter}
          </h2>
        </MotionInView>

        <MotionInView delay={0.2}>
          <p className="pa-soft text-lg leading-relaxed mb-10">{description}</p>
        </MotionInView>

        <MotionInView delay={0.3}>
          <Link
            href={ctaHref}
            className="pa-btn-pri inline-flex items-center gap-2 px-9 py-4 rounded-xl font-bold text-base mb-6"
          >
            {ctaText}
          </Link>
        </MotionInView>

        <MotionInView delay={0.4}>
          <p className="pa-soft text-sm flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {points.map((p, i) => (
              <span key={i} className="flex items-center gap-x-3">
                <span>{p}</span>
                {i < points.length - 1 && <span style={{ color: "var(--pa-line)" }}>·</span>}
              </span>
            ))}
          </p>
        </MotionInView>
      </div>
    </section>
  );
}

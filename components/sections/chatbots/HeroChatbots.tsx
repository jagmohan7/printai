"use client";

import Image from "next/image";
import MotionInView from "@/components/MotionInView";
import Link from "next/link";
import { useLeadModal } from "@/components/modals/LeadModalContext";
import { urlFor } from "@/lib/sanity.image";

// ── Shape of Sanity data driving this section ─────────────────────────────
export interface HeroChatbotsData {
  badge?: string;
  heading?: string;
  highlightWord?: string;
  subtext?: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  supportText?: string;
  // CMS-replaceable illustration — upload in Sanity Studio (Hero Illustration field)
  image?: { asset?: { _ref: string }; alt?: string };
}

interface Props {
  data?: HeroChatbotsData | null;
}

// ── Hardcoded fallbacks (used when CMS field is empty) ────────────────────
const FALLBACK = {
  badge:          "AI Chatbot for Print Shops",
  heading:        "AI Chatbot Trained on How Your Print Shop Actually Quotes",
  highlightWord:  "Actually Quotes",
  subtext:        "Answer the repetitive 80% instantly — pricing, turnaround, file specs — and route complex jobs directly to your team.",
  ctaPrimaryText: "Book a Free Demo",
  ctaPrimaryHref: "/#contact",
  supportText:    "No credit card · Setup in 48 hrs · Print-specific AI",
};

// ── Splits heading into [before, highlight, after] for gradient styling ──
function splitHeading(heading: string, highlight?: string): [string, string, string] {
  if (!highlight) return [heading, "", ""];
  const idx = heading.indexOf(highlight);
  if (idx === -1) return [heading, "", ""];
  return [heading.slice(0, idx), highlight, heading.slice(idx + highlight.length)];
}

export default function HeroChatbots({ data }: Props) {
  const { openProductDemo } = useLeadModal();

  const badge            = data?.badge         ?? FALLBACK.badge;
  const heading          = data?.heading        ?? FALLBACK.heading;
  const highlightWord    = data?.highlightWord  ?? FALLBACK.highlightWord;
  const subtext          = data?.subtext        ?? FALLBACK.subtext;
  const ctaPrimaryText   = data?.ctaPrimaryText   ?? FALLBACK.ctaPrimaryText;
  // Secondary button only renders when Sanity CMS explicitly provides it
  const ctaSecondaryText = data?.ctaSecondaryText ?? null;
  const ctaSecondaryHref = data?.ctaSecondaryHref ?? "#";
  const supportText      = data?.supportText    ?? FALLBACK.supportText;

  const [headBefore, headHighlight, headAfter] = splitHeading(heading, highlightWord);
  const supportParts = supportText.split("·").map(s => s.trim()).filter(Boolean);

  return (
    <section className="relative overflow-hidden pa-band-page section-hero px-4 flex items-center min-h-[92vh]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(103,61,230,0.05)" }} />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left col */}
        <div className="max-w-xl">
          <MotionInView delay={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-widest uppercase mb-6" style={{ borderColor: "rgba(103,61,230,0.3)", background: "rgba(103,61,230,0.1)", color: "var(--pa-teal)", border: "1px solid rgba(103,61,230,0.3)" }}>
              {badge}
            </span>
          </MotionInView>

          <MotionInView delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black pa-ink-text leading-[1.08] tracking-tight mb-6">
              {headBefore}
              {headHighlight && (
                <span style={{ color: "var(--pa-teal)" }}>
                  {headHighlight}
                </span>
              )}
              {headAfter}
            </h1>
          </MotionInView>

          <MotionInView delay={0.2}>
            <p className="pa-soft text-lg sm:text-xl leading-relaxed mb-8">{subtext}</p>
          </MotionInView>

          <MotionInView delay={0.3}>
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => openProductDemo(ctaPrimaryText)}
                className="pa-btn-pri inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base"
              >
                {ctaPrimaryText}
              </button>
              {ctaSecondaryText && (
                <Link
                  href={ctaSecondaryHref}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[color:var(--pa-line)] hover:border-[color:var(--pa-teal)] pa-ink-text font-semibold text-base transition-all duration-300"
                >
                  {ctaSecondaryText}
                </Link>
              )}
            </div>
          </MotionInView>

          <MotionInView delay={0.4}>
            <p className="pa-soft text-sm flex flex-wrap items-center gap-x-3 gap-y-1">
              {supportParts.map((part, i) => (
                <span key={i} className="flex items-center gap-x-3">
                  <span>{part}</span>
                  {i < supportParts.length - 1 && <span style={{ color: "var(--pa-line)" }}>·</span>}
                </span>
              ))}
            </p>
          </MotionInView>
        </div>

        {/* Right col — static fallback image; CMS (Hero Illustration) overrides src + alt */}
        <MotionInView delay={0.2} from="left">
          <Image
            src={data?.image?.asset?._ref
              ? urlFor(data.image).width(900).auto("format").url()
              : "/images/chatbot-hero.jpg"}
            alt={data?.image?.alt ?? "AI chatbot interface answering print shop pricing queries — PrintOpsAI"}
            width={0}
            height={0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="w-full h-auto rounded-2xl shadow-[0_0_60px_rgba(103,61,230,0.15)]"
            priority
          />
        </MotionInView>
      </div>
    </section>
  );
}

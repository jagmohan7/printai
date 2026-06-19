"use client";
import Link from "next/link";
import MotionInView from "@/components/MotionInView";
import type { SanityAbout } from "@/lib/sanity.types";

// ── Fallback content (used when Sanity data is missing) ───────────────────────
const DEFAULTS = {
  badge:            "Who We Are",
  heading:          "Print expertise, amplified by AI.",
  headingHighlight: "amplified by AI.",
  subtext:
    "PrintAI helps print businesses automate repetitive work, capture more leads and scale operations using AI-powered solutions built for the industry.",
  whoWeAreP1:
    "We combine deep printing-industry experience with modern automation — chatbots, ERPNext, and bespoke AI — so your team stops re-keying jobs and starts scaling.",
  whoWeAreP2: "",
  highlights: [
    "Industry-focused",
    "Automation-first",
    "Easy deployment",
    "Dedicated support",
  ],
  statBadge:           { value: "250+", label: "print companies onboarded" },
  primaryButtonText:   "Our Story",
  primaryButtonHref:   "/#about",
  secondaryButtonText: "Meet the Team",
  secondaryButtonHref: "/#contact",
};

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function AboutSection({ data }: { data?: SanityAbout }) {
  const badge        = data?.badge            || DEFAULTS.badge;
  const heading      = data?.heading          || DEFAULTS.heading;
  const highlight    = data?.headingHighlight || DEFAULTS.headingHighlight;
  const subtext      = data?.subtext          || DEFAULTS.subtext;
  const whoWeAreP1   = data?.whoWeAreP1       || DEFAULTS.whoWeAreP1;
  const whoWeAreP2   = data?.whoWeAreP2       || DEFAULTS.whoWeAreP2;
  const highlights   = (data?.highlights?.length ? data.highlights : null) ?? DEFAULTS.highlights;
  const statBadge    = data?.statBadge        ?? DEFAULTS.statBadge;
  const primaryText  = data?.primaryButtonText   || DEFAULTS.primaryButtonText;
  const primaryHref  = data?.primaryButtonHref   || DEFAULTS.primaryButtonHref;
  const secondText   = data?.secondaryButtonText || DEFAULTS.secondaryButtonText;
  const secondHref   = data?.secondaryButtonHref || DEFAULTS.secondaryButtonHref;

  // Split heading so the highlight phrase renders teal.
  const idx    = highlight ? heading.indexOf(highlight) : -1;
  const before = idx > -1 ? heading.slice(0, idx) : heading;
  const after  = idx > -1 ? heading.slice(idx + highlight.length) : "";

  return (
    <section id="about" className="pa-band-page relative overflow-hidden section-pad px-6">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT — illustration + floating stat card */}
        <MotionInView className="relative">
          <div
            className="pa-card relative rounded-2xl aspect-[4/3] overflow-hidden shadow-[0_30px_60px_-30px_rgba(11,22,40,0.35)]"
          >
            {/* soft teal wash */}
            <div className="absolute inset-0" style={{ background: "radial-gradient(70% 70% at 30% 25%, rgba(19,192,122,0.14), transparent 70%)" }} />
            {/* abstract "facility + AI" motif */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(150deg,#13C07A,#0F6E56)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="9" width="12" height="7" rx="1" /><path d="M6 9V4h12v5M8 16v4h8v-4" /><circle cx="16" cy="12.5" r="0.6" fill="#fff" />
                  </svg>
                </span>
                <span className="pa-mono text-[11px] tracking-widest uppercase pa-soft">Print facility · AI overlays</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-xl p-3" style={{ background: "var(--pa-surface)" }}>
                    <div className="h-2 rounded-full mb-2" style={{ background: "var(--pa-line)", width: "60%" }} />
                    <div className="h-1.5 rounded-full" style={{ background: "var(--pa-teal)", width: i === 1 ? "85%" : "55%" }} />
                  </div>
                ))}
              </div>
              <div className="flex items-end gap-2 h-20">
                {[40, 62, 48, 78, 56, 90].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === 5 ? "var(--pa-teal)" : "var(--pa-line)" }} />
                ))}
              </div>
            </div>
          </div>

          {/* floating 250+ stat card */}
          <div className="pa-card absolute -bottom-5 -right-4 rounded-xl px-4 py-3 flex items-center gap-3 shadow-[0_12px_30px_rgba(11,22,40,0.16)]">
            <span className="font-extrabold text-[22px] leading-none pa-teal-text">{statBadge.value}</span>
            <span className="pa-soft text-[12px] leading-tight">{statBadge.label}</span>
          </div>
        </MotionInView>

        {/* RIGHT — story + checklist + CTAs */}
        <MotionInView delay={0.12}>
          <span className="pa-eyebrow">{badge}</span>
          <h2 className="pa-ink-text mt-4 font-extrabold tracking-tight leading-[1.12] text-[2rem] sm:text-[2.4rem] lg:text-[2.7rem]">
            {before}
            {idx > -1 && <span style={{ color: "var(--pa-teal)" }}>{highlight}</span>}
            {after}
          </h2>

          <p className="pa-soft mt-5 text-[16px] leading-[1.7] max-w-[480px]">{subtext}</p>
          {whoWeAreP1 && (
            <p
              className="pa-soft mt-3 text-[15px] leading-[1.75] max-w-[480px] [&_strong]:font-semibold [&_strong]:text-[color:var(--pa-ink)]"
              dangerouslySetInnerHTML={{ __html: whoWeAreP1 }}
            />
          )}
          {whoWeAreP2 && (
            <p
              className="pa-soft mt-3 text-[15px] leading-[1.75] max-w-[480px] [&_strong]:font-semibold [&_strong]:text-[color:var(--pa-ink)]"
              dangerouslySetInnerHTML={{ __html: whoWeAreP2 }}
            />
          )}

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {highlights.map((label) => (
              <div key={label} className="flex items-center gap-3">
                <span className="pa-check-dot w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckIcon />
                </span>
                <span className="pa-ink-text text-[14.5px] font-medium">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link href={primaryHref} className="pa-btn-pri inline-flex items-center justify-center px-6 h-[48px] rounded-xl font-semibold text-[14.5px]">
              {primaryText}
            </Link>
            <Link href={secondHref} className="pa-btn-ghost inline-flex items-center justify-center px-6 h-[48px] rounded-xl font-semibold text-[14.5px]">
              {secondText}
            </Link>
          </div>
        </MotionInView>
      </div>
    </section>
  );
}

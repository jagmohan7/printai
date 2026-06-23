"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { pickArray } from "@/lib/section-utils";

export interface CustomAIHeroData {
  badge?: string;
  headingLines?: string[]; // Lines wrapped in ** are gradient-highlighted
  description?: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  ctaSecondaryAnchor?: string;
}

interface Props { data?: CustomAIHeroData | null }

const FALLBACK = {
  badge: "Custom AI Systems",
  // Wrap a substring in **double-asterisks** to render it as gradient text
  headingLines: ["**Custom AI** Built for", "Print — Not", "Borrowed From SaaS"],
  description: "Build AI systems trained on your workflows, your pricing logic, and your production rules — not generic tools that don't understand print.",
  ctaPrimaryText:    "Book AI Scoping Call",
  ctaPrimaryHref:    "/#contact",
  ctaSecondaryText:  "See Use Cases",
  ctaSecondaryHref:  "",
  ctaSecondaryAnchor: "#use-cases",
};

// Fixed neural-network node layout (decorative, not CMS-editable)
const NODES = [
  { cx: 62, cy: 32, r: 10, pulseDelay: "0s" },
  { cx: 78, cy: 22, r:  8, pulseDelay: "0.6s" },
  { cx: 72, cy: 50, r: 11, pulseDelay: "1.2s" },
  { cx: 86, cy: 56, r:  8, pulseDelay: "0.4s" },
  { cx: 68, cy: 70, r:  9, pulseDelay: "1s" },
];
const EDGES = [[62,32,78,22],[62,32,72,50],[72,50,86,56],[72,50,68,70]];

function renderHeadingLine(line: string, key: number, total: number) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span key={key}>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <span key={i} style={{ color: "var(--pa-teal)" }}>{p.slice(2, -2)}</span>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
      {key < total - 1 && <br />}
    </span>
  );
}

export default function CustomAIHeroSection({ data }: Props) {
  const badge              = data?.badge              ?? FALLBACK.badge;
  const headingLines       = pickArray(data?.headingLines, FALLBACK.headingLines);
  const description        = data?.description        ?? FALLBACK.description;
  const ctaPrimaryText     = data?.ctaPrimaryText     ?? FALLBACK.ctaPrimaryText;
  const ctaPrimaryHref     = data?.ctaPrimaryHref     ?? FALLBACK.ctaPrimaryHref;
  const ctaSecondaryText   = data?.ctaSecondaryText   ?? FALLBACK.ctaSecondaryText;
  const ctaSecondaryAnchor = data?.ctaSecondaryAnchor || data?.ctaSecondaryHref || FALLBACK.ctaSecondaryAnchor;

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pa-band-page px-4 section-hero">
      <style>{`
        @keyframes dashFlow { to { stroke-dashoffset: -30; } }
        .net-edge { stroke-dasharray: 5 5; animation: dashFlow 2s linear infinite; }
        @keyframes dotPulse { 0%,100% { opacity: .45; transform-box: fill-box; transform-origin: center; transform: scale(.7); } 50% { opacity: 1; transform: scale(1.15); } }
        .net-dot { animation: dotPulse 2.8s ease-in-out infinite; }
        @keyframes ripple { 0% { r: 0; opacity: .7; } 100% { r: 22; opacity: 0; } }
        .net-ripple { animation: ripple 2.5s ease-out infinite; }
        @keyframes nfloatA { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
        @keyframes nfloatB { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-9px);} }
        @keyframes nfloatC { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-5px);} }
        @keyframes nfloatD { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        @keyframes nfloatE { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-7px);} }
        .nf-a { animation: nfloatA 4s ease-in-out infinite; }
        .nf-b { animation: nfloatB 5s ease-in-out .6s infinite; }
        .nf-c { animation: nfloatC 4.5s ease-in-out 1.1s infinite; }
        .nf-d { animation: nfloatD 5.5s ease-in-out .3s infinite; }
        .nf-e { animation: nfloatE 4.2s ease-in-out .8s infinite; }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[700px] h-[500px] rounded-full bg-cyan-500/8 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full bg-violet-600/8 blur-[120px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <svg className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {EDGES.map(([x1, y1, x2, y2], i) => (
            <line key={i} className="net-edge" x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`} stroke="var(--pa-teal)" strokeWidth="1.6" strokeOpacity="0.5" style={{ animationDelay: `${i * 0.4}s` }} />
          ))}
          {NODES.map((n, i) => {
            const fc = ["nf-a","nf-b","nf-c","nf-d","nf-e"][i];
            return (
              <g key={i} className={fc}>
                <circle className="net-ripple" cx={`${n.cx}%`} cy={`${n.cy}%`} r="0" fill="none" stroke="var(--pa-teal)" strokeWidth="1.2" strokeOpacity="0.5" style={{ animationDelay: n.pulseDelay }} />
                <circle className="net-ripple" cx={`${n.cx}%`} cy={`${n.cy}%`} r="0" fill="none" stroke="var(--pa-teal)" strokeWidth="1" strokeOpacity="0.3" style={{ animationDelay: `calc(${n.pulseDelay} + 1.2s)` }} />
                <circle cx={`${n.cx}%`} cy={`${n.cy}%`} r={n.r} fill="var(--pa-page)" stroke="var(--pa-teal)" strokeWidth="2" strokeOpacity="0.7" />
                <circle className="net-dot" cx={`${n.cx}%`} cy={`${n.cy}%`} r={Math.round(n.r * 0.42)} fill="var(--pa-teal)" style={{ animationDelay: n.pulseDelay }} />
              </g>
            );
          })}
        </svg>

        <div className="max-w-xl">
          <MotionInView>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-widest uppercase mb-6" style={{ border: "1px solid rgba(103,61,230,0.3)", background: "rgba(103,61,230,0.1)", color: "var(--pa-teal)" }}>
              {badge}
            </span>
          </MotionInView>

          <MotionInView delay={0.1}>
            <h1 className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.8rem] font-extrabold tracking-tight leading-[1.08] pa-ink-text">
              {headingLines.map((line, i) => renderHeadingLine(line, i, headingLines.length))}
            </h1>
          </MotionInView>

          <MotionInView delay={0.25}>
            <p className="mt-6 pa-soft text-[16px] sm:text-[17px] leading-[1.8]">{description}</p>
          </MotionInView>

          <MotionInView delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={ctaPrimaryHref} className="pa-btn-pri inline-flex items-center gap-2.5 px-8 py-[15px] rounded-xl font-semibold text-[15px] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                {ctaPrimaryText} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={ctaSecondaryAnchor} className="inline-flex items-center gap-2.5 px-8 py-[15px] rounded-xl font-semibold text-[15px] pa-ink-text border border-[color:var(--pa-line)] hover:border-[color:var(--pa-teal)] hover:-translate-y-0.5 transition-all duration-200" style={{ background: "transparent" }}>
                {ctaSecondaryText}
              </Link>
            </div>
          </MotionInView>
        </div>
      </div>
    </section>
  );
}

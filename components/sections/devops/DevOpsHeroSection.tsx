"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { pickArray } from "@/lib/section-utils";

export interface DevOpsHeroData {
  badge?: string;
  headingLines?: string[]; // Lines wrapped in ** are gradient-highlighted
  description?: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  iconCluster?: Array<{ icon?: string; label?: string }>;
}

interface Props { data?: DevOpsHeroData | null }

const FALLBACK = {
  badge: "DevOps",
  // Wrap a substring in **double-asterisks** to mark it as gradient text
  headingLines: ["**DevOps Infrastructure**", "**Support** for Growing", "Print Businesses"],
  description: "Ensure your print systems stay fast, stable, and secure — even under heavy file uploads, traffic spikes, and complex workflows.",
  ctaPrimaryText:   "Get Free Infrastructure Audit",
  ctaPrimaryHref:   "/#contact",
  ctaSecondaryText: "Talk to DevOps Expert",
  ctaSecondaryHref: "/#contact",
  iconCluster: [
    { icon: "Server",    label: "Server" },
    { icon: "Cloud",     label: "Cloud" },
    { icon: "Zap",       label: "Zap" },
    { icon: "GitBranch", label: "GitBranch" },
    { icon: "Database",  label: "Database" },
    { icon: "Shield",    label: "Shield" },
  ],
};

// Fixed positions for the 6 floating tiles in the 460x420 canvas
const TILE_POSITIONS = [
  { width: 88,  height: 88,  top: 44,  left: 22,  anim: "ftA 5.5s ease-in-out infinite",        radius: 20, iconSize: 28, glow: "g-cyan",   color: "text-[#22d3ee]", border: "border-[var(--pa-line)]", bg: "bg-[var(--pa-card)]", zIndex: 1 },
  { width: 88,  height: 88,  top: 44,  left: 350, anim: "ftB 6s ease-in-out .5s infinite",      radius: 20, iconSize: 28, glow: "g-cyan",   color: "text-[#22d3ee]", border: "border-[var(--pa-line)]", bg: "bg-[var(--pa-card)]", zIndex: 1 },
  { width: 74,  height: 74,  top: 106, left: 193, anim: "ftZ 4.8s ease-in-out 1s infinite",     radius: 16, iconSize: 22, glow: "g-cyan",   color: "text-[#22d3ee]", border: "border-[var(--pa-line)]", bg: "bg-[var(--pa-card)]", zIndex: 15 },
  { width: 120, height: 120, top: 170, left: 170, anim: "ftC 5s ease-in-out 1.2s infinite",     radius: 24, iconSize: 38, glow: "g-cyan",   color: "text-[#22d3ee]", border: "border-2 border-[#22d3ee]/70", bg: "bg-[var(--pa-card)]", zIndex: 20, isCenter: true },
  { width: 88,  height: 88,  top: 316, left: 22,  anim: "ftD 5.8s ease-in-out .8s infinite",    radius: 20, iconSize: 28, glow: "g-purple", color: "text-[#c084fc]", border: "border-[var(--pa-line)]", bg: "bg-[var(--pa-card)]", zIndex: 1 },
  { width: 88,  height: 88,  top: 316, left: 350, anim: "ftA 6.2s ease-in-out 1.5s infinite",   radius: 20, iconSize: 28, glow: "g-cyan",   color: "text-[#22d3ee]", border: "border-[var(--pa-line)]", bg: "bg-[var(--pa-card)]", zIndex: 1 },
];

// Render a heading line with optional **gradient** markers
function renderLine(line: string, key: number, total: number) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span key={key}>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <span key={i} className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">
            {p.slice(2, -2)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
      {key < total - 1 && <br />}
    </span>
  );
}

export default function DevOpsHeroSection({ data }: Props) {
  const badge            = data?.badge            ?? FALLBACK.badge;
  const headingLines     = pickArray(data?.headingLines, FALLBACK.headingLines);
  const description      = data?.description      ?? FALLBACK.description;
  const ctaPrimaryText   = data?.ctaPrimaryText   ?? FALLBACK.ctaPrimaryText;
  const ctaPrimaryHref   = data?.ctaPrimaryHref   ?? FALLBACK.ctaPrimaryHref;
  const ctaSecondaryText = data?.ctaSecondaryText ?? FALLBACK.ctaSecondaryText;
  const ctaSecondaryHref = data?.ctaSecondaryHref ?? FALLBACK.ctaSecondaryHref;
  const iconCluster      = pickArray(data?.iconCluster, FALLBACK.iconCluster);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pa-band-page px-4 section-hero">
      <style>{`
        @keyframes ftA { 0%,100%{transform:translate(0,0);} 50%{transform:translate(-6px,-14px);} }
        @keyframes ftB { 0%,100%{transform:translate(0,0);} 50%{transform:translate(5px,-12px);} }
        @keyframes ftC { 0%,100%{transform:translate(0,0);} 50%{transform:translate(-4px,-10px);} }
        @keyframes ftD { 0%,100%{transform:translate(0,0);} 50%{transform:translate(7px,-13px);} }
        @keyframes ftZ { 0%,100%{transform:translate(0,0);} 50%{transform:translate(-3px,-9px);} }
        @keyframes cometFlow {
          0% { stroke-dashoffset: 320; opacity:0; }
          8% { opacity:1; }
          88% { opacity:1; }
          100% { stroke-dashoffset: -80; opacity:0; }
        }
        .arc-comet { stroke-dasharray: 72 320; animation: cometFlow 3.2s ease-in-out infinite; }
        .arc-comet-2 { stroke-dasharray: 72 320; animation: cometFlow 3.2s ease-in-out 1.6s infinite; }
        @keyframes borderPulse {
          0%,100% { box-shadow: 0 0 18px rgba(34,211,238,.45), 0 0 40px rgba(34,211,238,.2), inset 0 0 12px rgba(34,211,238,.08); }
          50% { box-shadow: 0 0 28px rgba(34,211,238,.7), 0 0 60px rgba(34,211,238,.35), inset 0 0 20px rgba(34,211,238,.12); }
        }
        .center-tile { animation: borderPulse 2.4s ease-in-out infinite; }
        .g-cyan { filter: drop-shadow(0 0 5px rgba(34,211,238,.9)) drop-shadow(0 0 12px rgba(6,182,212,.55)); }
        .g-purple { filter: drop-shadow(0 0 5px rgba(192,132,252,.9)) drop-shadow(0 0 12px rgba(139,92,246,.55)); }
        .dev-tile { transition: box-shadow .28s, transform .28s, border-color .28s; }
        .dev-tile:hover { transform: scale(1.07) translateY(-3px); box-shadow: 0 0 24px rgba(34,211,238,.22); border-color: rgba(34,211,238,.4) !important; }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[15%] right-[10%] w-[480px] h-[480px] rounded-full bg-cyan-400/10 blur-[130px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-violet-600/8 blur-[130px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.7) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <MotionInView>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-[#c4b5fd] text-[12px] font-semibold tracking-widest uppercase mb-6">
              {badge}
            </span>
          </MotionInView>
          <MotionInView delay={0.1}>
            <h1 className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.8rem] font-extrabold tracking-tight leading-[1.08] pa-ink-text">
              {headingLines.map((line, i) => renderLine(line, i, headingLines.length))}
            </h1>
          </MotionInView>
          <MotionInView delay={0.25}>
            <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.8] max-w-lg pa-soft">{description}</p>
          </MotionInView>
          <MotionInView delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={ctaPrimaryHref} className="inline-flex items-center gap-2.5 px-8 py-[15px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891b2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                {ctaPrimaryText} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={ctaSecondaryHref} className="inline-flex items-center gap-2.5 px-8 py-[15px] rounded-xl font-semibold text-[15px] pa-ink-text border border-violet-500/40 hover:border-violet-400/70 hover:bg-violet-500/10 hover:-translate-y-0.5 transition-all duration-200">
                {ctaSecondaryText}
              </Link>
            </div>
          </MotionInView>
        </div>

        <MotionInView delay={0.2} className="hidden lg:flex items-center justify-center">
          <div className="relative" style={{ width: 460, height: 420 }}>
            <div className="pointer-events-none absolute rounded-full bg-cyan-400/12 blur-[80px]" style={{ width: 300, height: 300, top: 60, left: 80 }} />

            <svg className="pointer-events-none absolute inset-0 w-full h-full" style={{ zIndex: 0 }} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="arcGlow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <path d="M -20,310 C 20,270 55,195 110,220 C 165,245 168,232 230,228 C 292,224 330,265 385,215 C 425,175 455,205 490,188" fill="none" stroke="#22d3ee" strokeWidth="1.3" strokeOpacity="0.14" />
              <path className="arc-comet" d="M -20,310 C 20,270 55,195 110,220 C 165,245 168,232 230,228 C 292,224 330,265 385,215 C 425,175 455,205 490,188" fill="none" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round" filter="url(#arcGlow)" />
              <path className="arc-comet-2" d="M -20,310 C 20,270 55,195 110,220 C 165,245 168,232 230,228 C 292,224 330,265 385,215 C 425,175 455,205 490,188" fill="none" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.55" filter="url(#arcGlow)" />
            </svg>

            {iconCluster.slice(0, 6).map((tile, i) => {
              const Icon = getIcon(tile.icon);
              const p = TILE_POSITIONS[i] || TILE_POSITIONS[0];
              const centerClass = p.isCenter ? "center-tile" : "";
              return (
                <div
                  key={i}
                  className={`dev-tile absolute rounded-[${p.radius}px] ${p.border} ${p.bg} flex items-center justify-center ${centerClass}`}
                  style={{ width: p.width, height: p.height, top: p.top, left: p.left, animation: p.anim, zIndex: p.zIndex, borderRadius: p.radius }}
                  title={tile.label}
                >
                  <Icon size={p.iconSize} className={`${p.glow} ${p.color}`} strokeWidth={1.4} />
                </div>
              );
            })}
          </div>
        </MotionInView>
      </div>
    </section>
  );
}

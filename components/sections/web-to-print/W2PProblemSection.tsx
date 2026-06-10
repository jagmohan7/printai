"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface W2PProblemData {
  heading?: string;
  highlightWord?: string;
  subheading?: string;
  problems?: Array<{ icon?: string; title?: string; description?: string }>;
  costBannerTitle?: string;
  costBannerDescription?: string;
  costHighlight?: string;
}

interface Props { data?: W2PProblemData | null }

const FALLBACK = {
  heading:        "Great in Demo. Broken in Production.",
  highlightWord:  "Broken in Production.",
  subheading:     "Why most print stores fail when they scale",
  problems: [
    { icon: "DollarSign", title: "Pricing Logic Fails", description: "Complex calculations break when combining quantity, rush options, and finishing" },
    { icon: "Settings",   title: "Hidden Options",      description: "Configurators hide important choices, leading to incorrect orders" },
    { icon: "FileText",   title: "Template Issues",     description: "Systems ignore bleed requirements, causing costly reprints" },
    { icon: "Truck",      title: "Shipping Breaks",     description: "Logic fails between flat-rate, dimensional weight, and freight calculations" },
    { icon: "Smartphone", title: "Mobile Abandonment",  description: "File upload experience fails on mobile, dropping orders mid-checkout" },
  ],
  costBannerTitle:        "The Real Cost",
  costBannerDescription:  "These issues don't just frustrate customers — they cost you {{highlight}} through cart abandonment, support overhead, and production errors.",
  costHighlight:          "30–50% of potential revenue",
};

export default function W2PProblemSection({ data }: Props) {
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const subheading    = data?.subheading    ?? FALLBACK.subheading;
  const problems      = pickArray(data?.problems, FALLBACK.problems);
  const costBannerTitle = data?.costBannerTitle       ?? FALLBACK.costBannerTitle;
  const costBannerDesc  = data?.costBannerDescription ?? FALLBACK.costBannerDescription;
  const costHighlight   = data?.costHighlight         ?? FALLBACK.costHighlight;

  const [hb, hh, ha] = splitHeading(heading, highlightWord);

  // Split cost banner around the {{highlight}} placeholder OR insert highlight at end
  const costParts = costBannerDesc.includes("{{highlight}}")
    ? costBannerDesc.split("{{highlight}}")
    : [costBannerDesc, ""];

  // First N-2 in 3-col, last 2 in 2-col centered (matches original 5-item layout)
  const topRow    = problems.slice(0, Math.max(0, problems.length - 2));
  const bottomRow = problems.slice(Math.max(0, problems.length - 2));

  return (
    <section className="relative overflow-hidden bg-[#0B1220] section-pad px-4 border-t border-[#1E293B]/50">
      <style>{`
        .prob-card { transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s, background 0.3s; }
        .prob-card:hover { border-color: rgba(6,182,212,0.3); box-shadow: 0 0 32px rgba(6,182,212,0.12); transform: translateY(-4px); background: #16172a; }
        .prob-icon-wrap { transition: background 0.3s, box-shadow 0.3s; }
        .prob-card:hover .prob-icon-wrap { background: rgba(6,182,212,0.15); box-shadow: 0 0 20px rgba(6,182,212,0.25); }
        .prob-card:hover .prob-icon { color: #22d3ee; }
        .cost-card { transition: border-color 0.3s, box-shadow 0.3s; }
        .cost-card:hover { border-color: rgba(124,58,237,0.4); box-shadow: 0 0 40px rgba(124,58,237,0.15); }
      `}</style>

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#7c3aed]/8 blur-[120px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <MotionInView className="text-center mb-14">
          <p className="text-[#a78bfa] text-[13px] font-semibold uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {hb}{hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}{ha}
          </h2>
          <p className="mt-4 text-[#94A3B8] text-[16px] max-w-xl mx-auto">{subheading}</p>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {topRow.map((p, i) => {
            const Icon = getIcon(p.icon);
            return (
              <MotionInView key={i} delay={i * 0.1}>
                <div className="prob-card h-full rounded-2xl border border-[#1E293B] bg-[#0F172A] p-7">
                  <div className="prob-icon-wrap w-12 h-12 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center mb-5">
                    <Icon className="prob-icon w-5 h-5 text-[#06b6d4]" />
                  </div>
                  <h3 className="text-white font-bold text-[16px] mb-2">{p.title}</h3>
                  <p className="text-[#94A3B8] text-[14px] leading-[1.75]">{p.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>

        {bottomRow.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[820px] mx-auto mb-7">
            {bottomRow.map((p, i) => {
              const Icon = getIcon(p.icon);
              return (
                <MotionInView key={i} delay={0.3 + i * 0.1}>
                  <div className="prob-card h-full rounded-2xl border border-[#1E293B] bg-[#0F172A] p-7">
                    <div className="prob-icon-wrap w-12 h-12 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center mb-5">
                      <Icon className="prob-icon w-5 h-5 text-[#06b6d4]" />
                    </div>
                    <h3 className="text-white font-bold text-[16px] mb-2">{p.title}</h3>
                    <p className="text-[#94A3B8] text-[14px] leading-[1.75]">{p.description}</p>
                  </div>
                </MotionInView>
              );
            })}
          </div>
        )}

        <MotionInView delay={0.5}>
          <div className="cost-card rounded-2xl border border-[#7c3aed]/25 bg-[#0F172A] p-6 sm:p-8 flex items-start gap-5">
            <div className="w-11 h-11 rounded-xl bg-[#7c3aed]/15 border border-[#7c3aed]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-[16px] mb-1.5">{costBannerTitle}</p>
              <p className="text-[#94A3B8] text-[14.5px] leading-[1.75]">
                {costParts[0]}
                <span className="text-[#22d3ee] font-semibold">{costHighlight}</span>
                {costParts[1]}
              </p>
            </div>
          </div>
        </MotionInView>
      </div>
    </section>
  );
}

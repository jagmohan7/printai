"use client";
import { X, Check } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface W2PBeforeAfterData {
  sectionTag?: string;
  heading?: string;
  highlightWord?: string;
  subheading?: string;
  beforeItems?: string[];
  afterItems?: string[];
}

interface Props { data?: W2PBeforeAfterData | null }

const FALLBACK = {
  sectionTag:    "Transformation",
  heading:       "From Broken UX to High-Converting Store",
  highlightWord: "High-Converting Store",
  subheading:    "The transformation your customers will notice",
  beforeItems: ["Confusing product selection", "Broken pricing calculations", "High cart abandonment", "Manual order corrections"],
  afterItems:  ["Smooth configurator flow", "Accurate real-time pricing", "Seamless checkout experience", "Automated order processing"],
};

export default function W2PBeforeAfterSection({ data }: Props) {
  const sectionTag    = data?.sectionTag    ?? FALLBACK.sectionTag;
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const subheading    = data?.subheading    ?? FALLBACK.subheading;
  const beforeItems   = pickArray(data?.beforeItems, FALLBACK.beforeItems);
  const afterItems    = pickArray(data?.afterItems,  FALLBACK.afterItems);

  const [hb, hh, ha] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden bg-[#070B14] section-pad px-4 border-t border-[#1E293B]/50">
      <style>{`
        .ba-card { transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s; }
        .ba-card:hover { transform: translateY(-3px); }
        .ba-card.before-card:hover { border-color: rgba(239,68,68,0.25); box-shadow: 0 0 32px rgba(239,68,68,0.08); }
        .ba-card.after-card:hover { border-color: rgba(6,182,212,0.4); box-shadow: 0 0 32px rgba(6,182,212,0.15); }
        .ba-row { transition: color 0.2s, transform 0.2s; }
        .ba-row:hover { transform: translateX(4px); color: #fff; }
        @keyframes shimmer { 0% { background-position: -300px 0; } 100% { background-position: 300px 0; } }
        .skeleton { height: 10px; border-radius: 6px; background: linear-gradient(90deg, #1a1b2e 25%, #2d2e47 50%, #1a1b2e 75%); background-size: 600px 100%; animation: shimmer 2s infinite linear; }
        @keyframes grow-bar { from { width: 0; } to { width: var(--bar-w); } }
        .progress-bar { height: 8px; border-radius: 4px; background: linear-gradient(90deg, #7c3aed, #06b6d4); animation: grow-bar 1.2s ease both; animation-delay: var(--bar-delay, 0.5s); }
      `}</style>

      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/3 w-[700px] h-[300px] rounded-full bg-[#06b6d4]/6 blur-[120px]" />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <MotionInView className="text-center mb-14">
          <p className="text-[#a78bfa] text-[13px] font-semibold uppercase tracking-widest mb-3">{sectionTag}</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {hb}{hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}{ha}
          </h2>
          <p className="mt-4 text-[#94A3B8] text-[16px]">{subheading}</p>
        </MotionInView>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MotionInView>
            <div className="ba-card before-card h-full rounded-2xl border border-[#1E293B] bg-[#0F172A] p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-red-500/12 border border-red-400/25 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-400" strokeWidth={2.5} />
                </div>
                <h3 className="text-white font-extrabold text-[1.5rem]">Before</h3>
              </div>
              <ul className="space-y-3.5 mb-8">
                {beforeItems.map((item, i) => (
                  <MotionInView key={i} delay={0.1 + i * 0.08}>
                    <li className="ba-row flex items-center gap-3 text-[#94A3B8] text-[14.5px]">
                      <X className="w-4 h-4 text-red-400 shrink-0" strokeWidth={2.5} />
                      {item}
                    </li>
                  </MotionInView>
                ))}
              </ul>
              <div className="space-y-2.5 opacity-50">
                <div className="skeleton w-full" />
                <div className="skeleton w-3/4" />
                <div className="skeleton w-1/2" />
              </div>
            </div>
          </MotionInView>

          <MotionInView delay={0.15}>
            <div className="ba-card after-card h-full rounded-2xl border border-[#06b6d4]/25 bg-[#0F172A] p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/12 border border-cyan-400/25 flex items-center justify-center">
                  <Check className="w-5 h-5 text-cyan-300" strokeWidth={2.5} />
                </div>
                <h3 className="text-white font-extrabold text-[1.5rem]">After</h3>
              </div>
              <ul className="space-y-3.5 mb-8">
                {afterItems.map((item, i) => (
                  <MotionInView key={i} delay={0.25 + i * 0.08}>
                    <li className="ba-row flex items-center gap-3 text-[#94A3B8] text-[14.5px]">
                      <Check className="w-4 h-4 text-cyan-300 shrink-0" strokeWidth={2.5} />
                      {item}
                    </li>
                  </MotionInView>
                ))}
              </ul>
              <div className="space-y-3 pt-2 border-t border-[#1E293B]">
                {[{ w: "100%", d: "0.6s" }, { w: "70%", d: "0.75s" }, { w: "50%", d: "0.9s" }].map(({ w, d }, i) => (
                  <div key={i} className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
                    <div className="progress-bar" style={{ "--bar-w": w, "--bar-delay": d } as React.CSSProperties} />
                  </div>
                ))}
              </div>
            </div>
          </MotionInView>
        </div>
      </div>
    </section>
  );
}

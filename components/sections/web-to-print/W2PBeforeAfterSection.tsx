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
    <section className="pa-band-page relative overflow-hidden section-pad px-4" style={{ borderTop: "1px solid var(--pa-line)" }}>
      <style>{`
        .ba-card { transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s; }
        .ba-card:hover { transform: translateY(-3px); }
        .ba-card.before-card:hover { border-color: rgba(239,68,68,0.25); box-shadow: 0 0 32px rgba(239,68,68,0.08); }
        .ba-card.after-card:hover { border-color: var(--pa-teal); box-shadow: 0 0 32px rgba(6,182,212,0.15); }
        .ba-row { transition: color 0.2s, transform 0.2s; }
        .ba-row:hover { transform: translateX(4px); color: var(--pa-ink); }
        @keyframes shimmer { 0% { background-position: -300px 0; } 100% { background-position: 300px 0; } }
        .skeleton { height: 10px; border-radius: 6px; background: linear-gradient(90deg, var(--pa-card) 25%, var(--pa-line) 50%, var(--pa-card) 75%); background-size: 600px 100%; animation: shimmer 2s infinite linear; }
        @keyframes grow-bar { from { width: 0; } to { width: var(--bar-w); } }
        .progress-bar { height: 8px; border-radius: 4px; background: var(--pa-teal); animation: grow-bar 1.2s ease both; animation-delay: var(--bar-delay, 0.5s); }
      `}</style>

      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/3 w-[700px] h-[300px] rounded-full blur-[120px]" style={{ background: "color-mix(in srgb, var(--pa-teal) 6%, transparent)" }} />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <MotionInView className="text-center mb-14">
          <p className="text-[13px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--pa-teal)" }}>{sectionTag}</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight leading-[1.15]" style={{ color: "var(--pa-ink)" }}>
            {hb}{hh && <span style={{ color: "var(--pa-teal)" }}>{hh}</span>}{ha}
          </h2>
          <p className="mt-4 text-[16px]" style={{ color: "var(--pa-ink-2)" }}>{subheading}</p>
        </MotionInView>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MotionInView>
            <div className="ba-card before-card h-full rounded-2xl p-8" style={{ border: "1px solid var(--pa-line)", background: "var(--pa-card)" }}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-red-500/12 border border-red-400/25 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-400" strokeWidth={2.5} />
                </div>
                <h3 className="font-extrabold text-[1.5rem]" style={{ color: "var(--pa-ink)" }}>Before</h3>
              </div>
              <ul className="space-y-3.5 mb-8">
                {beforeItems.map((item, i) => (
                  <MotionInView key={i} delay={0.1 + i * 0.08}>
                    <li className="ba-row flex items-center gap-3 text-[14.5px]" style={{ color: "var(--pa-ink-2)" }}>
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
            <div className="ba-card after-card h-full rounded-2xl p-8" style={{ border: "1px solid color-mix(in srgb, var(--pa-teal) 25%, transparent)", background: "var(--pa-card)" }}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--pa-teal) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--pa-teal) 25%, transparent)" }}>
                  <Check className="w-5 h-5" strokeWidth={2.5} style={{ color: "var(--pa-teal)" }} />
                </div>
                <h3 className="font-extrabold text-[1.5rem]" style={{ color: "var(--pa-ink)" }}>After</h3>
              </div>
              <ul className="space-y-3.5 mb-8">
                {afterItems.map((item, i) => (
                  <MotionInView key={i} delay={0.25 + i * 0.08}>
                    <li className="ba-row flex items-center gap-3 text-[14.5px]" style={{ color: "var(--pa-ink-2)" }}>
                      <Check className="w-4 h-4 shrink-0" strokeWidth={2.5} style={{ color: "var(--pa-teal)" }} />
                      {item}
                    </li>
                  </MotionInView>
                ))}
              </ul>
              <div className="space-y-3 pt-2" style={{ borderTop: "1px solid var(--pa-line)" }}>
                {[{ w: "100%", d: "0.6s" }, { w: "70%", d: "0.75s" }, { w: "50%", d: "0.9s" }].map(({ w, d }, i) => (
                  <div key={i} className="h-2 rounded-full overflow-hidden" style={{ background: "var(--pa-line)" }}>
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

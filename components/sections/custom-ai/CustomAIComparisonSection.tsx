"use client";
import { X, CheckCircle2 } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { pickArray } from "@/lib/section-utils";

export interface CustomAIComparisonData {
  sectionTag?: string;
  heading?: string;
  comparisonRows?: Array<{ aspect?: string; generic?: string; custom?: string }>;
}

interface Props { data?: CustomAIComparisonData | null }

const FALLBACK = {
  sectionTag: "Comparison",
  heading:    "Why Custom AI Beats Generic Tools",
  comparisonRows: [
    { aspect: "Training",    generic: "Not trained on your data", custom: "Trained on your workflows" },
    { aspect: "Logic",       generic: "Limited logic",            custom: "Fully customizable" },
    { aspect: "Integration", generic: "No deep integration",      custom: "Deep system integration" },
    { aspect: "Ownership",   generic: "Black-box dependency",     custom: "You own the system" },
  ],
};

export default function CustomAIComparisonSection({ data }: Props) {
  const sectionTag = data?.sectionTag ?? FALLBACK.sectionTag;
  const heading    = data?.heading    ?? FALLBACK.heading;
  const rows       = pickArray(data?.comparisonRows, FALLBACK.comparisonRows);

  return (
    <section className="relative overflow-hidden pa-band-surface section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-violet-600/8 blur-[140px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[350px] rounded-full bg-cyan-500/6 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <MotionInView className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/8 text-[#c4b5fd] text-[12px] font-semibold tracking-widest uppercase mb-5">{sectionTag}</span>
          <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight pa-ink-text">{heading}</h2>
        </MotionInView>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <MotionInView>
            <div className="pa-card h-full rounded-2xl border border-[var(--pa-line)] bg-[var(--pa-card)] p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-400/20 flex items-center justify-center">
                  <X size={16} className="text-red-400" strokeWidth={2.5} />
                </div>
                <h3 className="pa-ink-text font-extrabold text-[1.25rem]">Generic AI Tools</h3>
              </div>
              <div className="space-y-4">
                {rows.map((r, i) => (
                  <div key={i} className="flex items-start gap-3 pb-4 border-b border-[var(--pa-line)] last:border-0 last:pb-0">
                    <div className="w-6 h-6 rounded-full bg-red-500/15 border border-red-400/25 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={11} className="text-red-400" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="pa-soft text-[11px] font-semibold uppercase tracking-wider mb-0.5">{r.aspect}</p>
                      <p className="pa-ink-text text-[14.5px] font-medium">{r.generic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionInView>

          <MotionInView delay={0.15}>
            <div className="pa-card h-full rounded-2xl border border-[#06b6d4]/40 bg-[var(--pa-card)] shadow-[0_0_50px_rgba(6,182,212,0.14)] p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center shadow-[0_0_16px_rgba(6,182,212,0.4)]">
                  <CheckCircle2 size={16} className="text-white" strokeWidth={2.5} />
                </div>
                <h3 className="font-extrabold text-[1.25rem] bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">PrintAI Custom AI</h3>
              </div>
              <div className="space-y-4">
                {rows.map((r, i) => (
                  <div key={i} className="flex items-start gap-3 pb-4 border-b border-[var(--pa-line)] last:border-0 last:pb-0">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                      <CheckCircle2 size={11} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[#22d3ee] text-[11px] font-semibold uppercase tracking-wider mb-0.5">{r.aspect}</p>
                      <p className="pa-ink-text text-[14.5px] font-bold">{r.custom}</p>
                    </div>
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

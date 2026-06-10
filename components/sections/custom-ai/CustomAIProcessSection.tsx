"use client";
import MotionInView from "@/components/MotionInView";
import { pickArray } from "@/lib/section-utils";

export interface CustomAIProcessData {
  sectionTag?: string;
  heading?: string;
  steps?: Array<{ stepNumber?: string; week?: string; title?: string; description?: string }>;
}

interface Props { data?: CustomAIProcessData | null }

const FALLBACK = {
  sectionTag: "Process",
  heading:    "How Custom AI Is Built",
  steps: [
    { stepNumber: "1", week: "Week 1",     title: "Scoping Call",            description: "Define problem, data, and outcome" },
    { stepNumber: "2", week: "Week 2–4",   title: "Proof of Concept",         description: "Build working prototype" },
    { stepNumber: "3", week: "Week 5–10",  title: "Full Build & Deployment",  description: "Production-ready system + handoff" },
  ],
};

const THEMES = [
  { color: "from-[#7c3aed] to-[#4f46e5]", glow: "rgba(124,58,237,0.5)" },
  { color: "from-[#4f46e5] to-[#06b6d4]", glow: "rgba(79,70,229,0.5)" },
  { color: "from-[#06b6d4] to-[#0891b2]", glow: "rgba(6,182,212,0.5)" },
  { color: "from-[#a78bfa] to-[#22d3ee]", glow: "rgba(167,139,250,0.5)" },
];

export default function CustomAIProcessSection({ data }: Props) {
  const sectionTag = data?.sectionTag ?? FALLBACK.sectionTag;
  const heading    = data?.heading    ?? FALLBACK.heading;
  const steps      = pickArray(data?.steps, FALLBACK.steps);
  const cardCols   = steps.length <= 2 ? "sm:grid-cols-2" : steps.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="relative overflow-hidden ai-section section-pad px-4 border-t border-[#1E293B]/50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full bg-violet-600/8 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] rounded-full bg-cyan-500/6 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <MotionInView className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/8 text-[#c4b5fd] text-[12px] font-semibold tracking-widest uppercase mb-5">{sectionTag}</span>
          <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight text-white">{heading}</h2>
        </MotionInView>

        <div className="relative flex justify-between items-start px-8 mb-0">
          {steps.length >= 2 && (
            <div className="absolute top-7 left-[calc(16.6%+28px)] right-[calc(16.6%+28px)] h-[2px] bg-gradient-to-r from-[#7c3aed]/70 via-[#06b6d4]/70 to-[#7c3aed]/70" />
          )}
          {steps.map((s, i) => {
            const t = THEMES[i % THEMES.length];
            return (
              <MotionInView key={i} delay={0.2 * i} className="flex flex-col items-center" style={{ width: `${100 / steps.length}%` }}>
                <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center z-10`} style={{ boxShadow: `0 0 32px ${t.glow}` }}>
                  <span className="text-white font-bold text-[20px]">{s.stepNumber || String(i + 1)}</span>
                </div>
              </MotionInView>
            );
          })}
        </div>

        <div className={`grid grid-cols-1 ${cardCols} gap-5 mt-6`}>
          {steps.map((s, i) => {
            const t = THEMES[i % THEMES.length];
            return (
              <MotionInView key={i} delay={0.15 + 0.15 * i}>
                <div className="ai-card group h-full p-7 rounded-2xl border border-[#1E293B] bg-[#0F172A] hover:border-[#06b6d4]/35 hover:-translate-y-1 hover:shadow-[0_8px_36px_rgba(6,182,212,0.1)] transition-all duration-300">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${t.color} bg-opacity-15 mb-4`}>
                    <span className="text-white text-[12px] font-semibold">{s.week}</span>
                  </div>
                  <h3 className="text-white font-bold text-[18px] mb-2">{s.title}</h3>
                  <p className="text-[#94A3B8] text-[14px] leading-relaxed">{s.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

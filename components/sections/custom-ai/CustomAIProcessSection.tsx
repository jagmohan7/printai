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
  { bgStyle: { background: "linear-gradient(to bottom right, var(--pa-teal), var(--pa-teal-deep))" },      glow: "rgba(103,61,230,0.5)" },
  { bgStyle: { background: "linear-gradient(to bottom right, var(--pa-teal-deep), var(--pa-teal))" },      glow: "rgba(80,37,209,0.5)" },
  { bgStyle: { background: "linear-gradient(to bottom right, var(--pa-teal), var(--pa-teal-deep))" },      glow: "rgba(103,61,230,0.5)" },
  { bgStyle: { background: "linear-gradient(to bottom right, var(--pa-teal-deep), var(--pa-teal))" },      glow: "rgba(80,37,209,0.5)" },
];

export default function CustomAIProcessSection({ data }: Props) {
  const sectionTag = data?.sectionTag ?? FALLBACK.sectionTag;
  const heading    = data?.heading    ?? FALLBACK.heading;
  const steps      = pickArray(data?.steps, FALLBACK.steps);
  const cardCols   = steps.length <= 2 ? "sm:grid-cols-2" : steps.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="relative overflow-hidden pa-band-page section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full bg-violet-600/8 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] rounded-full bg-cyan-500/6 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <MotionInView className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-widest uppercase mb-5" style={{ border: "1px solid rgba(103,61,230,0.25)", background: "rgba(103,61,230,0.08)", color: "var(--pa-teal)" }}>{sectionTag}</span>
          <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight pa-ink-text">{heading}</h2>
        </MotionInView>

        <div className="relative flex justify-between items-start px-8 mb-0">
          {steps.length >= 2 && (
            <div className="absolute top-7 left-[calc(16.6%+28px)] right-[calc(16.6%+28px)] h-[2px]" style={{ background: "linear-gradient(to right, rgba(103,61,230,0.7), rgba(80,37,209,0.7), rgba(103,61,230,0.7))" }} />
          )}
          {steps.map((s, i) => {
            const t = THEMES[i % THEMES.length];
            return (
              <MotionInView key={i} delay={0.2 * i} className="flex flex-col items-center" style={{ width: `${100 / steps.length}%` }}>
                <div className="relative w-14 h-14 rounded-full flex items-center justify-center z-10" style={{ ...t.bgStyle, boxShadow: `0 0 32px ${t.glow}` }}>
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
                <div className="pa-card pa-card-hover group h-full p-7 rounded-2xl border border-[var(--pa-line)] bg-[var(--pa-card)] hover:border-[color:var(--pa-teal)] hover:-translate-y-1 hover:shadow-[0_8px_36px_rgba(103,61,230,0.1)] transition-all duration-300">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4" style={{ ...t.bgStyle, opacity: 0.85 }}>
                    <span className="text-white text-[12px] font-semibold">{s.week}</span>
                  </div>
                  <h3 className="pa-ink-text font-bold text-[18px] mb-2">{s.title}</h3>
                  <p className="pa-soft text-[14px] leading-relaxed">{s.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

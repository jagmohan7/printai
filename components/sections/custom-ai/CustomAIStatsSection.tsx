"use client";
import MotionInView from "@/components/MotionInView";
import { pickArray } from "@/lib/section-utils";

export interface CustomAIStatsData {
  sectionTag?: string;
  heading?: string;
  stats?: Array<{ value?: string; label?: string; sub?: string }>;
}

interface Props { data?: CustomAIStatsData | null }

const FALLBACK = {
  sectionTag: "Results",
  heading:    "What Clients See",
  stats: [
    { value: "90 seconds", label: "Quote generation",            sub: "down from 20+ minutes" },
    { value: "50–70%",     label: "Reduction in manual routing", sub: "" },
    { value: "30–45%",     label: "Fewer file errors",           sub: "" },
    { value: "6–10 weeks", label: "Delivery timeline",           sub: "vs months from vendors" },
  ],
};

export default function CustomAIStatsSection({ data }: Props) {
  const sectionTag = data?.sectionTag ?? FALLBACK.sectionTag;
  const heading    = data?.heading    ?? FALLBACK.heading;
  const stats      = pickArray(data?.stats, FALLBACK.stats);
  const colsClass  = stats.length <= 2 ? "lg:grid-cols-2" : stats.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <section className="relative overflow-hidden pa-band-surface section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[450px] rounded-full bg-cyan-500/7 blur-[160px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full bg-violet-700/8 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <MotionInView className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-widest uppercase mb-5" style={{ border: "1px solid rgba(103,61,230,0.25)", background: "rgba(103,61,230,0.08)", color: "var(--pa-teal)" }}>{sectionTag}</span>
          <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight pa-ink-text">{heading}</h2>
        </MotionInView>

        <div className={`grid grid-cols-2 ${colsClass} gap-5`}>
          {stats.map((s, i) => (
            <MotionInView key={i} delay={0.12 * i}>
              <div className="pa-card pa-card-hover group h-full flex flex-col items-center justify-center text-center py-10 px-5 rounded-2xl border border-[var(--pa-line)] bg-[var(--pa-card)] hover:border-[color:var(--pa-teal)] hover:-translate-y-1 hover:shadow-[0_8px_36px_rgba(103,61,230,0.14)] transition-all duration-300">
                <span className="text-[2rem] sm:text-[2.6rem] font-extrabold tracking-tight leading-none" style={{ color: "var(--pa-teal)" }}>{s.value}</span>
                <span className="mt-3 pa-ink-text font-semibold text-[13px] leading-snug">{s.label}</span>
                {s.sub && <span className="mt-1.5 pa-soft text-[12px]">{s.sub}</span>}
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}

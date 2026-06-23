"use client";
import MotionInView from "@/components/MotionInView";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface DevOpsProcessData {
  heading?: string;
  highlightWord?: string;
  steps?: Array<{ stepNumber?: string; title?: string; description?: string }>;
}

interface Props { data?: DevOpsProcessData | null }

const FALLBACK = {
  heading: "Our DevOps Implementation Process",
  highlightWord: "Implementation Process",
  steps: [
    { stepNumber: "01", title: "Infrastructure Assessment",  description: "Identify risks and bottlenecks" },
    { stepNumber: "02", title: "Environment Optimization",   description: "Improve performance and stability" },
    { stepNumber: "03", title: "Continuous Monitoring",      description: "Prevent issues before they happen" },
    { stepNumber: "04", title: "Ongoing Support",            description: "Scale systems as business grows" },
  ],
};

export default function DevOpsProcessSection({ data }: Props) {
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const steps         = pickArray(data?.steps, FALLBACK.steps);

  const [hb, hh, ha] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden pa-band-surface section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[500px] rounded-full bg-cyan-500/6 blur-[120px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <MotionInView className="text-center mb-16">
          <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight pa-ink-text leading-[1.15]">
            {hb}{hh && <span style={{ color: "var(--pa-teal)" }}>{hh}</span>}{ha}
          </h2>
        </MotionInView>

        <div className="relative">
          <div className="absolute left-[26px] top-8 bottom-8 w-[2px]" style={{ background: "linear-gradient(to bottom, rgba(103,61,230,0.6), rgba(80,37,209,0.4), transparent)" }} />

          <div className="space-y-10">
            {steps.map((s, i) => (
              <MotionInView key={i} delay={0.15 * i}>
                <div className="flex items-start gap-6 group">
                  <div className="relative shrink-0 w-[54px] h-[54px] rounded-full flex items-center justify-center transition-shadow duration-300 z-10" style={{ background: "linear-gradient(to bottom right, var(--pa-teal), var(--pa-teal-deep))", boxShadow: "0 0 24px rgba(103,61,230,0.4)" }}>
                    <span className="text-white font-bold text-[14px]">{s.stepNumber || String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="pa-ink-text font-bold text-[18px] mb-1">{s.title}</h3>
                    <p className="pa-soft text-[14px] leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </MotionInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

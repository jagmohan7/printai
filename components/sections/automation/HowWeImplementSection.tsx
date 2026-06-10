"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { pickArray } from "@/lib/section-utils";

export interface HowWeImplementData {
  heading?: string;
  steps?: Array<{ icon?: string; title?: string; description?: string }>;
}

interface Props { data?: HowWeImplementData | null }

const FALLBACK = {
  heading: "How We Implement",
  steps: [
    { icon: "Search", title: "Workflow Audit",          description: "We map your current intake-to-ship process and identify bottlenecks." },
    { icon: "Zap",    title: "Pilot Build (2–4 weeks)", description: "We automate one workflow first to prove ROI." },
    { icon: "Rocket", title: "Full Rollout",            description: "We extend automation across operations at your pace." },
  ],
};

const THEMES = [
  { badgeBg: "bg-gradient-to-br from-blue-500 to-blue-600",      glow: "shadow-[0_0_40px_rgba(59,130,246,0.45)]" },
  { badgeBg: "bg-gradient-to-br from-cyan-400 to-teal-500",      glow: "shadow-[0_0_40px_rgba(34,211,238,0.5)]" },
  { badgeBg: "bg-gradient-to-br from-violet-500 to-purple-600",  glow: "shadow-[0_0_40px_rgba(139,92,246,0.45)]" },
  { badgeBg: "bg-gradient-to-br from-indigo-500 to-blue-600",    glow: "shadow-[0_0_40px_rgba(99,102,241,0.45)]" },
];

export default function HowWeImplementSection({ data }: Props) {
  const heading = data?.heading ?? FALLBACK.heading;
  const steps   = pickArray(data?.steps, FALLBACK.steps);

  const colsClass = steps.length <= 2 ? "md:grid-cols-2" : steps.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4";

  return (
    <section className="relative overflow-hidden bg-[#070B14] section-pad px-4 border-t border-[#1E293B]/50">
      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-20">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">{heading}</h2>
        </MotionInView>

        <div className={`relative grid grid-cols-1 ${colsClass} gap-7 lg:gap-10 pt-12`}>
          {steps.length >= 2 && (
            <div className="pointer-events-none hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          )}

          {steps.map((s, i) => {
            const Icon  = getIcon(s.icon);
            const theme = THEMES[i % THEMES.length];
            return (
              <MotionInView key={i} delay={i * 0.18} distance={50}>
                <div className="relative h-full">
                  <div className="absolute left-1/2 -top-12 -translate-x-1/2 z-10">
                    <div className={`w-24 h-24 rounded-full ${theme.badgeBg} ${theme.glow} flex items-center justify-center transition-transform duration-300 hover:scale-105`}>
                      <Icon className="w-9 h-9 text-white" strokeWidth={1.75} />
                    </div>
                  </div>
                  <div className="group h-full rounded-2xl border border-[#1E293B] bg-[#0F172A] pt-20 pb-10 px-7 text-center transition-all duration-300 hover:border-[#06B6D4]/40 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                    <h3 className="text-white font-bold text-[1.2rem] mb-3.5">{s.title}</h3>
                    <p className="text-gray-400 text-[14px] leading-[1.7] max-w-[260px] mx-auto">{s.description}</p>
                  </div>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

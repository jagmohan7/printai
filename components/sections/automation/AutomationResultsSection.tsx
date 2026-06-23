"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { pickArray } from "@/lib/section-utils";

export interface AutomationResultsData {
  heading?: string;
  stats?: Array<{ icon?: string; value?: string; label?: string }>;
}

interface Props { data?: AutomationResultsData | null }

const FALLBACK = {
  heading: "What Changes in 90 Days",
  stats: [
    { icon: "TrendingDown",  value: "40-55%", label: "reduction in order touch-time" },
    { icon: "AlertCircle",   value: "20-35%", label: "reduction in reprints" },
    { icon: "CheckCircle2",  value: "96%+",   label: "on-time delivery rate" },
    { icon: "PhoneOff",      value: "50%",    label: "reduction in \"Where's my job?\" calls" },
  ],
};

const THEMES = [
  { gradient: "from-blue-400 to-indigo-400",   iconBg: "bg-blue-500/15",   ring: "border-blue-400/35",   color: "text-blue-300" },
  { gradient: "from-cyan-400 to-teal-400",     iconBg: "bg-cyan-500/15",   ring: "border-cyan-400/35",   color: "text-cyan-300" },
  { gradient: "from-teal-400 to-emerald-400",  iconBg: "bg-teal-500/15",   ring: "border-teal-400/35",   color: "text-teal-300" },
  { gradient: "from-violet-400 to-purple-400", iconBg: "bg-violet-500/15", ring: "border-violet-400/35", color: "text-violet-300" },
];

export default function AutomationResultsSection({ data }: Props) {
  const heading = data?.heading ?? FALLBACK.heading;
  const stats   = pickArray(data?.stats, FALLBACK.stats);

  return (
    <section className="relative overflow-hidden pa-band-page section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-[120px]" style={{ background: "rgba(103,61,230,0.05)" }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight pa-ink-text leading-[1.15]">{heading}</h2>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon  = getIcon(s.icon);
            const theme = THEMES[i % THEMES.length];
            return (
              <MotionInView key={i} delay={i * 0.1}>
                <div className="group relative h-full rounded-2xl border border-[var(--pa-line)] bg-[var(--pa-card)] p-8 text-center transition-all duration-300 hover:border-[color:var(--pa-teal)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(103,61,230,0.15)] pa-card-hover">
                  <div className={`w-14 h-14 mx-auto mb-7 rounded-2xl ${theme.iconBg} border ${theme.ring} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`w-6 h-6 ${theme.color}`} strokeWidth={1.75} />
                  </div>
                  <p className={`text-[2.4rem] sm:text-[2.8rem] font-extrabold leading-none bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>{s.value}</p>
                  <p className="mt-4 pa-soft text-[13.5px] leading-[1.55] max-w-[200px] mx-auto">{s.label}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

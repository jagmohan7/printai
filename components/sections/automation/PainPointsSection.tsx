"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { pickArray } from "@/lib/section-utils";

export interface PainPointsData {
  heading?: string;
  subheading?: string;
  painPoints?: Array<{ icon?: string; text?: string }>;
}

interface Props { data?: PainPointsData | null }

const FALLBACK = {
  heading:    "Where Print Shops Leak Time",
  subheading: "Manual Work Is Slowing Your Shop Down",
  painPoints: [
    { icon: "RefreshCw",      text: "Estimators rebuilding the same quote repeatedly" },
    { icon: "FolderOpen",     text: "Files moving between teams with no tracking" },
    { icon: "ClipboardList",  text: "Press scheduling managed on whiteboards" },
    { icon: "AlertTriangle",  text: "Version errors causing reprints" },
    { icon: "MessageSquare",  text: "Customers constantly asking for job status" },
    { icon: "Puzzle",         text: "Disconnected tools creating confusion" },
  ],
};

export default function PainPointsSection({ data }: Props) {
  const heading    = data?.heading    ?? FALLBACK.heading;
  const subheading = data?.subheading ?? FALLBACK.subheading;
  const points     = pickArray(data?.painPoints, FALLBACK.painPoints);

  return (
    <section className="relative overflow-hidden pa-band-surface section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight pa-ink-text leading-[1.15]">{heading}</h2>
          <p className="mt-4 pa-soft text-[16px] sm:text-[17px]">{subheading}</p>
        </MotionInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {points.map((p, i) => {
            const Icon = getIcon(p.icon);
            return (
              <MotionInView key={i} delay={i * 0.08}>
                <div className="group relative h-full rounded-2xl border border-[var(--pa-line)] bg-[var(--pa-card)] p-6 flex items-start gap-4 transition-all duration-300 hover:border-[#3B82F6]/40 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] pa-card-hover">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center transition-all duration-300 group-hover:bg-[#3B82F6]/20 group-hover:border-[#3B82F6]/50">
                    <Icon className="w-5 h-5 text-cyan-300" strokeWidth={1.75} />
                  </div>
                  <p className="pa-ink-text text-[15px] font-semibold leading-[1.55] pt-1.5">{p.text}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

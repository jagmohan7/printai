"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface DevOpsProblemsData {
  heading?: string;
  highlightText?: string;
  problems?: Array<{ icon?: string; title?: string; description?: string }>;
}

interface Props { data?: DevOpsProblemsData | null }

const FALLBACK = {
  heading: "Why Print Systems Break Under Real Demand",
  highlightText: "Break Under Real Demand",
  problems: [
    { icon: "Server",   title: "Underpowered Hosting",          description: "Can't handle large files and high-volume uploads" },
    { icon: "Activity", title: "No Infrastructure Monitoring",  description: "Issues discovered only after customers complain" },
    { icon: "Shield",   title: "Security Vulnerabilities",      description: "Exposed systems and weak data protection" },
    { icon: "Database", title: "Weak Backup & Recovery",        description: "Risk of data loss during system failures" },
  ],
};

export default function DevOpsProblemsSection({ data }: Props) {
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightText = data?.highlightText ?? FALLBACK.highlightText;
  const problems      = pickArray(data?.problems, FALLBACK.problems);

  const [hb, hh, ha] = splitHeading(heading, highlightText);

  return (
    <section className="relative overflow-hidden bg-[#0B1220] section-pad px-4 border-t border-white/[0.04]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-red-900/8 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {hb}{hh && <span className="text-red-400">{hh}</span>}{ha}
          </h2>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {problems.map((p, i) => {
            const Icon = getIcon(p.icon);
            return (
              <MotionInView key={i} delay={0.1 * i}>
                <div className="group h-full p-7 rounded-2xl border border-red-500/20 bg-[#12131f] hover:border-red-400/40 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(239,68,68,0.1)] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-400/25 flex items-center justify-center mb-5 group-hover:bg-red-500/15 transition-colors duration-300">
                    <Icon size={20} className="text-red-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-bold text-[16px] mb-2">{p.title}</h3>
                  <p className="text-[#9ca3af] text-[14px] leading-relaxed">{p.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

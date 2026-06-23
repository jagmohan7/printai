"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface DevOpsServicesData {
  heading?: string;
  highlightWord?: string;
  services?: Array<{ icon?: string; title?: string; description?: string }>;
}

interface Props { data?: DevOpsServicesData | null }

const FALLBACK = {
  heading: "What You Get With DevOps Support",
  highlightWord: "DevOps Support",
  services: [
    { icon: "Server",    title: "Infrastructure Optimized for Large Files", description: "Handle high-volume uploads without slowdowns" },
    { icon: "GitBranch", title: "Deployment Pipelines",                     description: "Smooth updates without downtime" },
    { icon: "Layers",    title: "Integrated DevOps Environments",            description: "Seamless development-to-production flow" },
    { icon: "Activity",  title: "Continuous Monitoring Systems",             description: "Detect and prevent issues proactively" },
    { icon: "RotateCcw", title: "Backup & Recovery Systems",                 description: "Quick restoration during failures" },
    { icon: "Zap",       title: "Ongoing Infrastructure Optimization",       description: "Continuous performance improvements" },
  ],
};

export default function DevOpsServicesSection({ data }: Props) {
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const services      = pickArray(data?.services, FALLBACK.services);

  const [hb, hh, ha] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden pa-band-surface section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-cyan-500/7 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight pa-ink-text leading-[1.15]">
            {hb}{hh && <span style={{ color: "var(--pa-teal)" }}>{hh}</span>}{ha}
          </h2>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <MotionInView key={i} delay={0.09 * i}>
                <div className="group h-full p-7 rounded-2xl border transition-all duration-300 border-[var(--pa-line)] bg-[var(--pa-card)] hover:border-[color:var(--pa-teal)] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(103,61,230,0.15)]">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[var(--pa-card)] border border-[var(--pa-line)]" style={{ transition: "background 0.3s, border-color 0.3s" }}>
                    <Icon size={20} strokeWidth={1.5} style={{ color: "var(--pa-teal)" }} />
                  </div>
                  <h3 className="pa-ink-text font-bold text-[16px] mb-2">{s.title}</h3>
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

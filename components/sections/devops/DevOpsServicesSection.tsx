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
    <section className="relative overflow-hidden bg-[#0B1220] section-pad px-4 border-t border-[#1E293B]/50">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-cyan-500/7 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {hb}{hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}{ha}
          </h2>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <MotionInView key={i} delay={0.09 * i}>
                <div className="group h-full p-7 rounded-2xl border transition-all duration-300 border-[#1E293B] bg-[#0F172A] hover:border-[#06b6d4]/35 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 bg-[#0F172A] border border-[#1E293B] group-hover:bg-cyan-500/10 group-hover:border-cyan-400/20">
                    <Icon size={20} className="text-[#06b6d4]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-bold text-[16px] mb-2">{s.title}</h3>
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

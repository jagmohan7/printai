"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface DevOpsDifferenceData {
  heading?: string;
  highlightWord?: string;
  features?: Array<{ icon?: string; title?: string; description?: string }>;
}

interface Props { data?: DevOpsDifferenceData | null }

const FALLBACK = {
  heading: "Where DevOps Makes the Difference",
  highlightWord: "Difference",
  features: [
    { icon: "ShoppingCart", title: "Web-to-Print Platforms",         description: "Stable infrastructure for order portals" },
    { icon: "TrendingUp",   title: "High-Traffic Print Websites",    description: "Reliable performance during traffic spikes" },
    { icon: "Layers",       title: "Production Workflow Systems",    description: "Smooth operations across proofing & production" },
    { icon: "Cloud",        title: "Cloud-Hosted Print Applications", description: "Reliable AWS/cloud infrastructure" },
    { icon: "Bell",         title: "Issue Detection & Resolution",    description: "Proactive monitoring and alerts" },
    { icon: "Network",      title: "Multi-System Integration",        description: "Seamless connections across platforms" },
  ],
};

export default function DevOpsDifferenceSection({ data }: Props) {
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const features      = pickArray(data?.features, FALLBACK.features);

  const [hb, hh, ha] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden bg-[#070B14] section-pad px-4 border-t border-[#1E293B]/50">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-violet-600/8 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {hb}{hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}{ha}
          </h2>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            return (
              <MotionInView key={i} delay={0.09 * i}>
                <div className="group h-full p-7 rounded-2xl border transition-all duration-300 border-[#1E293B] bg-[#0F172A] hover:border-[#a78bfa]/30 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 bg-[#0F172A] border border-[#1E293B] group-hover:bg-violet-500/10 group-hover:border-violet-500/20">
                    <Icon size={20} className="text-[#06b6d4]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-bold text-[16px] mb-2">{f.title}</h3>
                  <p className="text-[#94A3B8] text-[14px] leading-relaxed">{f.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

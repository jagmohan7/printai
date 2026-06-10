"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface DevOpsBenefitsData {
  heading?: string;
  highlightWord?: string;
  benefits?: Array<{ icon?: string; title?: string; description?: string }>;
}

interface Props { data?: DevOpsBenefitsData | null }

const FALLBACK = {
  heading: "How Print Businesses Benefit",
  highlightWord: "Benefit",
  benefits: [
    { icon: "CheckCircle", title: "Reliable Order Processing",                description: "No more failed uploads or lost transactions" },
    { icon: "Gauge",       title: "Better Performance During Traffic Spikes",  description: "Handle high demand without slowdowns" },
    { icon: "Lock",        title: "Secure Data Handling",                      description: "Protect customer and payment information" },
    { icon: "Users",       title: "Seamless B2B Operations",                   description: "Smooth integrations with enterprise clients" },
    { icon: "TrendingUp",  title: "Scalable Infrastructure",                   description: "Grow without infrastructure constraints" },
    { icon: "Zap",         title: "Faster Recovery from Issues",               description: "Minimize downtime and data loss" },
  ],
};

export default function DevOpsBenefitsSection({ data }: Props) {
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const benefits      = pickArray(data?.benefits, FALLBACK.benefits);

  const [hb, hh, ha] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden bg-[#0B1220] section-pad px-4 border-t border-[#1E293B]/50">
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-violet-600/7 blur-[130px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {hb}{hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}{ha}
          </h2>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => {
            const Icon = getIcon(b.icon);
            return (
              <MotionInView key={i} delay={0.09 * i}>
                <div className="group h-full p-7 rounded-2xl border transition-all duration-300 border-[#1E293B] bg-[#0F172A] hover:border-[#a78bfa]/30 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 bg-[#0F172A] border border-[#1E293B] group-hover:bg-violet-500/10 group-hover:border-violet-500/20">
                    <Icon size={20} className="text-[#06b6d4]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-bold text-[16px] mb-2">{b.title}</h3>
                  <p className="text-[#94A3B8] text-[14px] leading-relaxed">{b.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

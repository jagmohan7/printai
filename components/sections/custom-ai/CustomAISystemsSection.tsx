"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { pickArray } from "@/lib/section-utils";

export interface CustomAISystemsData {
  sectionTag?: string;
  heading?: string;
  systems?: Array<{ icon?: string; color?: string; title?: string; description?: string }>;
}

interface Props { data?: CustomAISystemsData | null }

const FALLBACK = {
  sectionTag: "What We Build",
  heading:    "Custom AI Systems We Build",
  systems: [
    { icon: "DollarSign", color: "cyan",   title: "AI Pricing Engines",         description: "Dynamic pricing based on quantity, materials, shipping, and cost changes" },
    { icon: "Network",    color: "violet", title: "Intelligent Order Routing",   description: "Automatically route jobs to the right press/vendor" },
    { icon: "Link2",      color: "cyan",   title: "AI Integrations",             description: "Connect AI to ERPDash, Shopify, W2P, CRM, shipping" },
    { icon: "FileText",   color: "violet", title: "Prepress Intelligence",       description: "AI-assisted file validation and error detection" },
    { icon: "BarChart2",  color: "cyan",   title: "Custom Dashboards & Tools",   description: "Margin tracking, forecasting, operational insights" },
  ],
};

export default function CustomAISystemsSection({ data }: Props) {
  const sectionTag = data?.sectionTag ?? FALLBACK.sectionTag;
  const heading    = data?.heading    ?? FALLBACK.heading;
  const systems    = pickArray(data?.systems, FALLBACK.systems);

  return (
    <section className="relative overflow-hidden pa-band-surface section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full bg-violet-600/8 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] rounded-full bg-cyan-500/6 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <MotionInView className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/8 text-[#22d3ee] text-[12px] font-semibold tracking-widest uppercase mb-5">{sectionTag}</span>
          <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight pa-ink-text">{heading}</h2>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {systems.map((s, i) => {
            const Icon  = getIcon(s.icon);
            const color = s.color || (i % 2 === 0 ? "cyan" : "violet");
            return (
              <MotionInView key={i} delay={0.09 * i}>
                <div className="pa-card pa-card-hover group h-full p-7 rounded-2xl border border-[var(--pa-line)] bg-[var(--pa-card)] hover:border-[#06b6d4]/40 hover:-translate-y-1 hover:shadow-[0_8px_36px_rgba(6,182,212,0.12)] transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${color === "violet" ? "bg-violet-500/15 border border-violet-500/25 group-hover:bg-violet-500/25" : "bg-cyan-500/15 border border-cyan-400/25 group-hover:bg-cyan-500/25"}`}>
                    <Icon size={22} className={color === "violet" ? "text-[#a78bfa]" : "text-[#22d3ee]"} strokeWidth={1.5} />
                  </div>
                  <h3 className="pa-ink-text font-bold text-[17px] mb-2.5">{s.title}</h3>
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

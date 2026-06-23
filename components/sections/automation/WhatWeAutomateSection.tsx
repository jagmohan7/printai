"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { pickArray } from "@/lib/section-utils";

export interface WhatWeAutomateData {
  heading?: string;
  subheading?: string;
  items?: Array<{ icon?: string; title?: string; description?: string }>;
}

interface Props { data?: WhatWeAutomateData | null }

const FALLBACK = {
  heading:    "From Order Intake to Fulfillment — Fully Automated",
  subheading: "What We Automate",
  items: [
    { icon: "Inbox",         title: "Order Intake & Routing",     description: "Orders from website, marketplaces, and B2B portals are automatically routed based on SLA, material, and production rules." },
    { icon: "Sparkles",      title: "Prepress Automation",        description: "Auto-preflight checks (bleed, DPI, color, fonts). Failed files trigger automated correction requests." },
    { icon: "CalendarClock", title: "Production Scheduling",      description: "Dynamic scheduling based on press capacity, run length, and job priority — replacing manual planning." },
    { icon: "Package",       title: "Fulfillment & Tracking",     description: "Automated shipping labels, tracking updates, and customer notifications without manual intervention." },
  ],
};

const THEMES = [
  { iconBg: "bg-blue-500/15",   ring: "border-blue-400/35",   color: "text-blue-300" },
  { iconBg: "bg-cyan-500/15",   ring: "border-cyan-400/35",   color: "text-cyan-300" },
  { iconBg: "bg-cyan-500/15",   ring: "border-cyan-400/35",   color: "text-cyan-300" },
  { iconBg: "bg-violet-500/15", ring: "border-violet-400/35", color: "text-violet-300" },
];

export default function WhatWeAutomateSection({ data }: Props) {
  const heading    = data?.heading    ?? FALLBACK.heading;
  const subheading = data?.subheading ?? FALLBACK.subheading;
  const items      = pickArray(data?.items, FALLBACK.items);

  return (
    <section className="relative overflow-hidden pa-band-page section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-16">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.85rem] font-extrabold tracking-tight pa-ink-text leading-[1.15] max-w-4xl mx-auto">{heading}</h2>
          <p className="mt-4 pa-soft text-[16px] sm:text-[17px]">{subheading}</p>
        </MotionInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((it, i) => {
            const Icon  = getIcon(it.icon);
            const theme = THEMES[i % THEMES.length];
            return (
              <MotionInView key={i} delay={i * 0.12}>
                <div className="group relative h-full rounded-2xl border border-[color:var(--pa-line)] bg-[var(--pa-card)] p-8 sm:p-10 transition-all duration-300 hover:border-[color:var(--pa-teal)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(103,61,230,0.15)] pa-card-hover">
                  <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} border ${theme.ring} flex items-center justify-center mb-7 transition-all duration-300 group-hover:scale-110`}>
                    <Icon className={`w-6 h-6 ${theme.color}`} strokeWidth={1.75} />
                  </div>
                  <h3 className="pa-ink-text font-bold text-[1.4rem] mb-4">{it.title}</h3>
                  <p className="pa-soft text-[14.5px] leading-[1.75]">{it.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

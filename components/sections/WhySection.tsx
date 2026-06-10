"use client";
import { Server, Printer, Users, PieChart, Bot, Boxes, FileText, Gauge, Lightbulb, Layers, Headphones } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import type { SanityWhy } from "@/lib/sanity.types";

// ── Fallback hardcoded content ────────────────────────────────────────────────
const DEFAULTS = {
  badge:            "Why PrintAI",
  heading:          "Single Source of Truth",
  headingHighlight: "Truth",
  subtext:          "Unify your printing operations with our integrated AI platform",
  features: [
    { title: "Reduce Time Wastage",     desc: "Automate repetitive tasks and streamline workflows to save significant operational time." },
    { title: "Optimize Decision Making", desc: "AI-powered insights help you make data-driven decisions faster and more accurately." },
    { title: "Unified Platform",        desc: "Frappe/ERPNext integration creates one central hub for all your business data." },
    { title: "24/7 AI Support",         desc: "Custom chatbots handle customer queries round the clock, never missing an opportunity." },
  ],
};

// Icons mapped by feature title — stays in code (can't store React components in Sanity)
const ICON_MAP: Record<string, React.ElementType> = {
  "Reduce Time Wastage":      Gauge,
  "Optimize Decision Making": Lightbulb,
  "Unified Platform":         Layers,
  "24/7 AI Support":          Headphones,
};
const FALLBACK_ICON = Lightbulb;

const orbitNodes = [
  { icon: Printer,   label: "Print Operations", pos: "top-0 left-1/2 -translate-x-1/2" },
  { icon: Users,     label: "CRM",              pos: "top-[20%] right-0" },
  { icon: PieChart,  label: "Analytics",        pos: "bottom-[20%] right-0" },
  { icon: Bot,       label: "Chatbot",          pos: "bottom-0 left-1/2 -translate-x-1/2" },
  { icon: Boxes,     label: "Inventory",        pos: "bottom-[20%] left-0" },
  { icon: FileText,  label: "Finance",          pos: "top-[20%] left-0" },
];

export default function WhySection({ data }: { data?: SanityWhy }) {
  const badge            = data?.badge            || DEFAULTS.badge;
  const heading          = data?.heading          || DEFAULTS.heading;
  const headingHighlight = data?.headingHighlight || DEFAULTS.headingHighlight;
  const subtext          = data?.subtext          || DEFAULTS.subtext;
  const features         = (data?.features?.length ? data.features : null) ?? DEFAULTS.features;

  const highlightIndex  = heading.indexOf(headingHighlight);
  const beforeHighlight = highlightIndex > -1 ? heading.slice(0, highlightIndex) : heading;
  const afterHighlight  = highlightIndex > -1 ? heading.slice(highlightIndex + headingHighlight.length) : "";

  return (
    <section
      id="why"
      className="relative overflow-hidden bg-[#0a0b14] section-pad px-4 border-t border-white/[0.04]"
    >
      <div className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[800px] h-[400px] section-glow" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-16">
          <span className="badge">{badge}</span>
          <h2 className="mt-5 text-[2.1rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {beforeHighlight}
            <span className="gradient-text">{headingHighlight}</span>
            {afterHighlight}
          </h2>
          <p className="mt-4 text-gray-400 text-[16px] sm:text-[17px] leading-[1.7] max-w-xl mx-auto">
            {subtext}
          </p>
        </MotionInView>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Orbit diagram — always decorative, no Sanity data needed */}
          <MotionInView delay={0.15} className="flex items-center justify-center">
            <div className="relative w-[440px] h-[440px] max-w-full">
              <div className="absolute inset-0 rounded-full border border-dashed border-white/[0.05]" />
              <div className="absolute inset-[14%] rounded-full border border-dashed border-white/[0.07]" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative w-[120px] h-[120px] rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center anim-pulse-glow">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 blur-xl opacity-50" />
                  <Server className="relative w-9 h-9 text-white" strokeWidth={2} />
                </div>
                <span className="mt-2 text-[12.5px] font-semibold text-white">PrintAI Platform</span>
              </div>

              {orbitNodes.map(({ icon: Icon, label, pos }, i) => (
                <MotionInView
                  key={label}
                  delay={0.3 + i * 0.1}
                  className={`absolute ${pos} flex flex-col items-center`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#12131f] border border-violet-500/25 flex items-center justify-center hover:border-violet-400/60 hover:scale-110 transition-all duration-300">
                    <Icon className="w-5 h-5 text-violet-300" />
                  </div>
                  <span className="mt-1.5 text-[11.5px] font-medium text-gray-400 whitespace-nowrap">{label}</span>
                </MotionInView>
              ))}
            </div>
          </MotionInView>

          {/* Feature cards */}
          <div className="flex flex-col gap-4">
            {features.map(({ title, desc }, i) => {
              const Icon = ICON_MAP[title] ?? FALLBACK_ICON;
              return (
                <MotionInView
                  key={title}
                  delay={i * 0.15}
                  className="card-dark p-5 sm:p-6 flex items-start gap-4"
                >
                  <div className="w-11 h-11 shrink-0 rounded-lg flex items-center justify-center bg-violet-600/15 border border-violet-500/25">
                    <Icon className="w-5 h-5 text-violet-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-[15.5px] mb-1.5">{title}</h3>
                    <p className="text-gray-400 text-[13.5px] leading-[1.65]">{desc}</p>
                  </div>
                </MotionInView>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

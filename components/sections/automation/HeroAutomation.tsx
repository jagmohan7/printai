"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface HeroAutomationData {
  badge?: string;
  heading?: string;
  highlightGradient?: string;
  description?: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  steps?: Array<{ icon?: string; label?: string }>;
}

interface Props { data?: HeroAutomationData | null }

const FALLBACK = {
  badge:             "Print Workflow Automation",
  heading:           "Print Workflow Automation That Respects How a Press Floor Works",
  highlightGradient: "Workflow Automation",
  description:       "Automate order intake, prepress, scheduling, and fulfillment with systems built for real print operations — not generic workflows.",
  ctaPrimaryText:    "Book Free Workflow Audit",
  ctaPrimaryHref:    "/#contact",
  ctaSecondaryText:  "Map My Workflow",
  ctaSecondaryHref:  "/#contact",
  steps: [
    { icon: "FileText", label: "Order" },
    { icon: "Settings", label: "Prepress" },
    { icon: "Calendar", label: "Scheduling" },
    { icon: "Printer",  label: "Printing" },
    { icon: "Truck",    label: "Shipping" },
  ],
};

// Cycling palette for step icon tiles
const STEP_THEMES = [
  { iconBg: "bg-blue-500/15",   ring: "border-blue-400/40",   color: "text-blue-300" },
  { iconBg: "bg-cyan-500/15",   ring: "border-cyan-400/40",   color: "text-cyan-300" },
  { iconBg: "bg-cyan-500/15",   ring: "border-cyan-400/40",   color: "text-cyan-300" },
  { iconBg: "bg-violet-500/15", ring: "border-violet-400/40", color: "text-violet-300" },
  { iconBg: "bg-blue-500/15",   ring: "border-blue-400/40",   color: "text-blue-300" },
];

export default function HeroAutomation({ data }: Props) {
  const badge             = data?.badge             ?? FALLBACK.badge;
  const heading           = data?.heading           ?? FALLBACK.heading;
  const highlightGradient = data?.highlightGradient ?? FALLBACK.highlightGradient;
  const description       = data?.description       ?? FALLBACK.description;
  const ctaPrimaryText    = data?.ctaPrimaryText    ?? FALLBACK.ctaPrimaryText;
  const ctaPrimaryHref    = data?.ctaPrimaryHref    ?? FALLBACK.ctaPrimaryHref;
  const ctaSecondaryText  = data?.ctaSecondaryText  ?? FALLBACK.ctaSecondaryText;
  const ctaSecondaryHref  = data?.ctaSecondaryHref  ?? FALLBACK.ctaSecondaryHref;
  const steps             = pickArray(data?.steps, FALLBACK.steps);

  const [hb, hh, ha] = splitHeading(heading, highlightGradient);

  return (
    <section className="relative overflow-hidden pa-band-page section-hero px-4">
      <div className="pointer-events-none absolute left-[-8%] top-[10%] w-[520px] h-[520px] rounded-full blur-[140px]" style={{ background: "rgba(103,61,230,0.10)" }} />
      <div className="pointer-events-none absolute right-[-6%] bottom-[-10%] w-[460px] h-[460px] rounded-full blur-[140px]" style={{ background: "rgba(103,61,230,0.08)" }} />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <MotionInView>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[12px] font-semibold tracking-widest uppercase mb-6" style={{ borderColor: "rgba(103,61,230,0.3)", background: "rgba(103,61,230,0.1)", color: "var(--pa-teal)" }}>
              {badge}
            </span>
          </MotionInView>
          <MotionInView>
            <h1 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-extrabold tracking-tight pa-ink-text leading-[1.1]">
              {hb}
              {hh && <span style={{ color: "var(--pa-teal)" }}>{hh}</span>}
              {ha}
            </h1>

            <p className="mt-7 pa-soft text-[16px] sm:text-[17px] leading-[1.75] max-w-xl">{description}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href={ctaPrimaryHref} className="pa-btn-pri inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                {ctaPrimaryText} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={ctaSecondaryHref} className="inline-flex items-center gap-2.5 px-7 py-[14px] rounded-xl font-semibold text-[14.5px] pa-ink-text border border-[color:var(--pa-line)] bg-[var(--pa-card)] hover:border-[color:var(--pa-teal)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                {ctaSecondaryText}
              </Link>
            </div>
          </MotionInView>
        </div>

        <div className="relative">
          <MotionInView from="none" delay={0.2} duration={0.9} className="pointer-events-none absolute left-[31px] top-8 bottom-8 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(103,61,230,0.4), transparent)" }}>
            <span />
          </MotionInView>

          <div className="space-y-4">
            {steps.map((s, i) => {
              const Icon  = getIcon(s.icon);
              const theme = STEP_THEMES[i % STEP_THEMES.length];
              return (
                <MotionInView key={i} from="left" distance={70} delay={0.25 + i * 0.12} className="relative flex items-center gap-4">
                  <div className={`relative z-10 w-16 h-16 shrink-0 rounded-2xl ${theme.iconBg} border ${theme.ring} flex items-center justify-center shadow-[0_0_25px_rgba(103,61,230,0.15)]`}>
                    <Icon className={`w-6 h-6 ${theme.color}`} strokeWidth={1.75} />
                  </div>
                  <div className="group flex-1 flex items-center justify-between gap-4 px-5 py-[18px] rounded-2xl border border-[color:var(--pa-line)] bg-[var(--pa-card)] hover:border-[color:var(--pa-teal)] hover:shadow-[0_0_20px_rgba(103,61,230,0.15)] transition-all duration-300 pa-card-hover">
                    <span className="pa-ink-text font-semibold text-[15.5px]">{s.label}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-300" style={{ color: "rgba(103,61,230,0.7)" }} />
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

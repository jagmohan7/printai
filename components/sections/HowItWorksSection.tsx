"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Plug, SlidersHorizontal, Bot, TrendingUp } from "lucide-react";
import type { SanityHowItWorks } from "@/lib/sanity.types";

const DEFAULTS = {
  eyebrow: "How It Works",
  heading: "From Inquiry to Production",
  subtext: "From idea to your hands in four effortless steps.",
  steps: [
    { title: "Connect",   description: "Plug PrintAI into your storefront, email and existing tools in minutes." },
    { title: "Configure", description: "Set your products, pricing rules and brand voice once." },
    { title: "Automate",  description: "AI handles quotes, orders and support around the clock." },
    { title: "Scale",     description: "Grow order volume without growing headcount." },
  ],
};

// Unique gradient per step — colorful like the reference image
const STEP_STYLES = [
  { gradient: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)", shadow: "rgba(59,130,246,0.32)"  },
  { gradient: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)", shadow: "rgba(139,92,246,0.32)" },
  { gradient: "linear-gradient(135deg, #13C07A 0%, #059669 100%)", shadow: "rgba(19,192,122,0.32)"  },
  { gradient: "linear-gradient(135deg, #F97316 0%, #EF4444 100%)", shadow: "rgba(249,115,22,0.32)"  },
];

const ICON_BY_TITLE: Record<string, React.ElementType> = {
  Connect: Plug, Configure: SlidersHorizontal, Automate: Bot, Scale: TrendingUp,
};
const ICON_BY_INDEX = [Plug, SlidersHorizontal, Bot, TrendingUp];

// Wavy dashed SVG connector drawn via pathLength animation
function Connector({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <div className="hidden sm:flex flex-shrink-0 w-20 lg:w-28 items-start justify-center pt-[38px]">
      <svg width="100%" height="24" viewBox="0 0 110 24" className="w-full overflow-visible">
        {/* Static dashed baseline (dim) */}
        <path
          d="M 0 12 Q 27 4 55 12 Q 83 20 110 12"
          fill="none" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="5 4"
        />
        {/* Animated colored fill on top */}
        <motion.path
          d="M 0 12 Q 27 4 55 12 Q 83 20 110 12"
          fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="5 4"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay, duration: 0.5, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

export default function HowItWorksSection({ data }: { data?: SanityHowItWorks }) {
  const eyebrow = data?.eyebrow || DEFAULTS.eyebrow;
  const heading = data?.heading || DEFAULTS.heading;
  const steps   = (data?.steps?.length ? data.steps : null) ?? DEFAULTS.steps;

  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section id="how-it-works" className="pa-band-page section-pad px-6">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="pa-eyebrow">{eyebrow}</span>
          <h2 className="pa-ink-text mt-4 font-extrabold tracking-tight leading-[1.12] text-[2rem] sm:text-[2.4rem] lg:text-[2.6rem]">
            {heading}
          </h2>
          <p className="pa-soft mt-3 text-[16px]">{DEFAULTS.subtext}</p>
        </motion.div>

        {/* Steps + connectors */}
        <div ref={ref} className="flex flex-col sm:flex-row sm:items-start">
          {steps.map((step, i) => {
            const style    = STEP_STYLES[i % STEP_STYLES.length];
            const Icon     = ICON_BY_TITLE[step.title] ?? ICON_BY_INDEX[i] ?? Plug;
            const stepDelay = i * 0.48;

            return (
              <React.Fragment key={step.title}>
                {/* Step */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.35, y: 28 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{
                    type: "spring", stiffness: 240, damping: 18,
                    delay: stepDelay,
                  }}
                  className="flex-1 flex flex-col items-center text-center px-3 sm:px-4"
                >
                  {/* Circle + badge */}
                  <div className="relative mb-5">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 380, damping: 14 }}
                      className="w-[76px] h-[76px] rounded-full flex items-center justify-center"
                      style={{
                        background: style.gradient,
                        boxShadow: `0 14px 36px -8px ${style.shadow}`,
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" strokeWidth={1.8} />
                    </motion.div>

                    {/* Step number badge */}
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ type: "spring", stiffness: 400, damping: 16, delay: stepDelay + 0.22 }}
                      className="absolute -top-1.5 -right-1.5 w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11px] font-bold"
                      style={{
                        background: "#FFFFFF",
                        color: "#0B1628",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.14)",
                      }}
                    >
                      {i + 1}
                    </motion.span>
                  </div>

                  <h3 className="pa-ink-text font-bold text-[17px] mb-2">{step.title}</h3>
                  <p className="pa-soft text-[13.5px] leading-[1.62] max-w-[190px]">
                    {step.description}
                  </p>
                </motion.div>

                {/* Connector between steps */}
                {i < steps.length - 1 && (
                  <Connector inView={inView} delay={stepDelay + 0.32} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

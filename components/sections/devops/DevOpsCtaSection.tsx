"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface DevOpsCtaData {
  heading?: string;
  highlightWord?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  pillars?: Array<{ icon?: string; label?: string }>;
}

interface Props { data?: DevOpsCtaData | null }

const FALLBACK = {
  heading: "Is Your Infrastructure Ready for Real Demand?",
  highlightWord: "Ready for Real Demand?",
  description: "We'll review your systems and show you how to improve performance, stability, and security.",
  ctaText: "Get Free Infrastructure Audit",
  ctaHref: "/#contact",
  pillars: [
    { icon: "Server", label: "Scalable Infrastructure" },
    { icon: "Shield", label: "Enhanced Security" },
    { icon: "Zap",    label: "Peak Performance" },
  ],
};

export default function DevOpsCtaSection({ data }: Props) {
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const description   = data?.description   ?? FALLBACK.description;
  const ctaText       = data?.ctaText       ?? FALLBACK.ctaText;
  const ctaHref       = data?.ctaHref       ?? FALLBACK.ctaHref;
  const pillars       = pickArray(data?.pillars, FALLBACK.pillars);

  const [hb, hh, ha] = splitHeading(heading, highlightWord);
  const pillarCols   = pillars.length <= 2 ? "sm:grid-cols-2" : pillars.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="relative overflow-hidden bg-[#070B14] section-pad-sm px-4 border-t border-[#1E293B]/50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-900/10 to-cyan-900/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-violet-600/12 blur-[160px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <MotionInView>
          <h2 className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.1] text-white">
            {hb}{hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}{ha}
          </h2>
        </MotionInView>

        <MotionInView delay={0.15}>
          <p className="mt-6 text-[#94A3B8] text-[16px] sm:text-[17px] leading-[1.8] max-w-2xl mx-auto">{description}</p>
        </MotionInView>

        <MotionInView delay={0.3}>
          <Link href={ctaHref} className="mt-10 inline-flex items-center gap-2.5 px-10 py-[17px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891b2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_40px_rgba(59,130,246,0.4)]">
            {ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
        </MotionInView>

        <MotionInView delay={0.45}>
          <div className={`mt-14 grid grid-cols-1 ${pillarCols} gap-4`}>
            {pillars.map((p, i) => {
              const Icon = getIcon(p.icon);
              return (
                <div key={i} className="group flex flex-col items-center gap-3 py-7 px-5 rounded-2xl border border-[#1E293B] bg-[#0F172A]/80 hover:border-[#7c3aed]/40 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#0F172A] border border-[#1E293B] flex items-center justify-center group-hover:bg-violet-500/10 group-hover:border-violet-500/20 transition-colors duration-300">
                    <Icon size={20} className="text-[#06b6d4]" strokeWidth={1.5} />
                  </div>
                  <span className="text-white font-semibold text-[14px]">{p.label}</span>
                </div>
              );
            })}
          </div>
        </MotionInView>
      </div>
    </section>
  );
}

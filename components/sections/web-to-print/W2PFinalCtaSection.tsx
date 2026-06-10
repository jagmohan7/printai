"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";

export interface W2PFinalCtaData {
  icon?: string;
  heading1?: string;
  heading2?: string;
  highlightWord?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  footerText?: string;
}

interface Props { data?: W2PFinalCtaData | null }

const FALLBACK = {
  icon:          "LayoutGrid",
  heading1:      "Your Store Should Work",
  heading2:      "As Hard As Your Press",
  highlightWord: "",
  description:   "Let's rebuild your Web-to-Print experience for real-world performance — not just demos.",
  ctaText:       "Book Free Audit",
  ctaHref:       "/#contact",
  footerText:    "Join print businesses that have already made the switch",
};

export default function W2PFinalCtaSection({ data }: Props) {
  const iconName     = data?.icon          ?? FALLBACK.icon;
  const heading1     = data?.heading1      ?? FALLBACK.heading1;
  const heading2     = data?.heading2      ?? FALLBACK.heading2;
  const description  = data?.description   ?? FALLBACK.description;
  const ctaText      = data?.ctaText       ?? FALLBACK.ctaText;
  const ctaHref      = data?.ctaHref       ?? FALLBACK.ctaHref;
  const footerText   = data?.footerText    ?? FALLBACK.footerText;

  const Icon = getIcon(iconName);

  return (
    <section className="relative overflow-hidden bg-[#070B14] section-pad-sm px-4 border-t border-[#1E293B]/50">
      <style>{`
        @keyframes icon-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(6,182,212,0); } 50% { box-shadow: 0 0 0 16px rgba(6,182,212,0.1); } }
        .cta-icon { animation: icon-pulse 3s ease-in-out infinite; }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-0 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/12 blur-[160px]" />
        <div className="absolute right-[-10%] bottom-0 w-[500px] h-[500px] rounded-full bg-[#06b6d4]/10 blur-[140px]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-[720px] mx-auto text-center">
        <MotionInView>
          <div className="cta-icon w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/20 border border-[#06b6d4]/25 flex items-center justify-center mx-auto mb-8">
            <Icon className="w-7 h-7 text-[#22d3ee]" />
          </div>
        </MotionInView>

        <MotionInView delay={0.1}>
          <h2 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-extrabold tracking-tight text-white leading-[1.1] mb-3">{heading1}</h2>
        </MotionInView>

        <MotionInView delay={0.2}>
          <h2 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-extrabold tracking-tight leading-[1.1] bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent mb-7">{heading2}</h2>
        </MotionInView>

        <MotionInView delay={0.3}>
          <p className="text-[#94A3B8] text-[16px] sm:text-[17px] leading-[1.8] max-w-[540px] mx-auto mb-10">{description}</p>
        </MotionInView>

        <MotionInView delay={0.4}>
          <Link href={ctaHref} className="inline-flex items-center gap-2.5 px-9 py-[16px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891b2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_40px_rgba(6,182,212,0.45)] mb-6">
            {ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
        </MotionInView>

        <MotionInView delay={0.5}>
          <p className="text-[#4b5563] text-[13.5px]">{footerText}</p>
        </MotionInView>
      </div>
    </section>
  );
}

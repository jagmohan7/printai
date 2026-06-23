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
    <section className="relative overflow-hidden pa-band-page section-pad-sm px-4" style={{ borderTop: "1px solid var(--pa-line)" }}>
      <style>{`
        @keyframes icon-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(103,61,230,0); } 50% { box-shadow: 0 0 0 16px rgba(103,61,230,0.1); } }
        .cta-icon { animation: icon-pulse 3s ease-in-out infinite; }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-0 w-[600px] h-[600px] rounded-full blur-[160px]" style={{ background: "rgba(103,61,230,0.12)" }} />
        <div className="absolute right-[-10%] bottom-0 w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: "rgba(103,61,230,0.08)" }} />
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
          <div className="cta-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8" style={{ background: "rgba(103,61,230,0.15)", border: "1px solid rgba(103,61,230,0.25)" }}>
            <Icon className="w-7 h-7" style={{ color: "var(--pa-teal)" }} />
          </div>
        </MotionInView>

        <MotionInView delay={0.1}>
          <h2 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-extrabold tracking-tight leading-[1.1] mb-3" style={{ color: "var(--pa-ink)" }}>{heading1}</h2>
        </MotionInView>

        <MotionInView delay={0.2}>
          <h2 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-extrabold tracking-tight leading-[1.1] mb-7" style={{ color: "var(--pa-teal)" }}>{heading2}</h2>
        </MotionInView>

        <MotionInView delay={0.3}>
          <p className="text-[16px] sm:text-[17px] leading-[1.8] max-w-[540px] mx-auto mb-10" style={{ color: "var(--pa-ink-2)" }}>{description}</p>
        </MotionInView>

        <MotionInView delay={0.4}>
          <Link href={ctaHref} className="pa-btn-pri inline-flex items-center gap-2.5 px-9 py-[16px] rounded-xl font-semibold text-[15px] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 mb-6">
            {ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
        </MotionInView>

        <MotionInView delay={0.5}>
          <p className="text-[13.5px]" style={{ color: "var(--pa-ink-2)" }}>{footerText}</p>
        </MotionInView>
      </div>
    </section>
  );
}

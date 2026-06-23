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
    <section className="relative overflow-hidden pa-band-page section-pad-sm px-4" style={{ borderTop: "1px solid var(--pa-line)" }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[160px]" style={{ background: "rgba(103,61,230,0.12)" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px]" style={{ background: "rgba(103,61,230,0.08)" }} />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <MotionInView>
          <h2 className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.1]" style={{ color: "var(--pa-ink)" }}>
            {hb}{hh && <span style={{ color: "var(--pa-teal)" }}>{hh}</span>}{ha}
          </h2>
        </MotionInView>

        <MotionInView delay={0.15}>
          <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.8] max-w-2xl mx-auto" style={{ color: "var(--pa-ink-2)" }}>{description}</p>
        </MotionInView>

        <MotionInView delay={0.3}>
          <Link href={ctaHref} className="pa-btn-pri mt-10 inline-flex items-center gap-2.5 px-10 py-[17px] rounded-xl font-semibold text-[15px] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
            {ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
        </MotionInView>

        <MotionInView delay={0.45}>
          <div className={`mt-14 grid grid-cols-1 ${pillarCols} gap-4`}>
            {pillars.map((p, i) => {
              const Icon = getIcon(p.icon);
              return (
                <div key={i} className="group flex flex-col items-center gap-3 py-7 px-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(103,61,230,0.15)]" style={{ border: "1px solid var(--pa-line)", background: "var(--pa-card)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "var(--pa-card)", border: "1px solid var(--pa-line)" }}>
                    <Icon size={20} strokeWidth={1.5} style={{ color: "var(--pa-teal)" }} />
                  </div>
                  <span className="font-semibold text-[14px]" style={{ color: "var(--pa-ink)" }}>{p.label}</span>
                </div>
              );
            })}
          </div>
        </MotionInView>
      </div>
    </section>
  );
}

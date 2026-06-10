"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { pickArray } from "@/lib/section-utils";

export interface W2PStoreAuditData {
  heading?: string;
  description?: string;
  improvementsHighlight?: string;
  perks?: Array<{ icon?: string; label?: string }>;
  ctaText?: string;
  ctaHref?: string;
  disclaimerText?: string;
}

interface Props { data?: W2PStoreAuditData | null }

const FALLBACK = {
  heading:               "See Your Store Re-Imagined",
  description:           "Send us your current store URL. We'll send back {{highlight}} within 48 hours.",
  improvementsHighlight: "5 high-impact improvements",
  perks: [
    { icon: "Zap",    label: "Quick wins identified" },
    { icon: "Clock",  label: "48-hour turnaround" },
    { icon: "Target", label: "Conversion-focused" },
  ],
  ctaText:        "Get My Store Audit",
  ctaHref:        "/#contact",
  disclaimerText: "No commitment required • Free analysis • Expert feedback",
};

export default function W2PStoreAuditSection({ data }: Props) {
  const heading     = data?.heading     ?? FALLBACK.heading;
  const description = data?.description ?? FALLBACK.description;
  const improvHi    = data?.improvementsHighlight ?? FALLBACK.improvementsHighlight;
  const perks       = pickArray(data?.perks, FALLBACK.perks);
  const ctaText     = data?.ctaText     ?? FALLBACK.ctaText;
  const ctaHref     = data?.ctaHref     ?? FALLBACK.ctaHref;
  const disclaimer  = data?.disclaimerText ?? FALLBACK.disclaimerText;

  const descParts = description.includes("{{highlight}}") ? description.split("{{highlight}}") : [description, ""];

  return (
    <section className="relative overflow-hidden bg-[#0B1220] section-pad px-4 border-t border-[#1E293B]/50">
      <style>{`
        .audit-box { transition: border-color 0.3s, box-shadow 0.3s; }
        .audit-box:hover { border-color: rgba(6,182,212,0.45); box-shadow: 0 0 60px rgba(6,182,212,0.12); }
        .audit-perk { transition: transform 0.2s, color 0.2s; }
        .audit-perk:hover { transform: translateY(-3px); color: #fff; }
        .audit-perk:hover .perk-icon-wrap { background: rgba(6,182,212,0.2); box-shadow: 0 0 16px rgba(6,182,212,0.3); }
        .perk-icon-wrap { transition: background 0.2s, box-shadow 0.2s; }
      `}</style>

      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#06b6d4]/7 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#7c3aed]/8 blur-[100px]" />

      <div className="relative z-10 max-w-[750px] mx-auto">
        <MotionInView>
          <div className="audit-box rounded-2xl border border-[#06b6d4]/25 bg-[#0F172A]/80 backdrop-blur-sm p-10 sm:p-14 text-center">
            <MotionInView delay={0.1}>
              <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.8rem] font-extrabold tracking-tight text-white leading-[1.15] mb-4">{heading}</h2>
            </MotionInView>

            <MotionInView delay={0.2}>
              <p className="text-[#94A3B8] text-[16px] leading-[1.8] mb-9 max-w-[500px] mx-auto">
                {descParts[0]}<span className="text-white font-semibold">{improvHi}</span>{descParts[1]}
              </p>
            </MotionInView>

            <MotionInView delay={0.3}>
              <div className="flex items-center justify-center gap-8 mb-10 flex-wrap">
                {perks.map((p, i) => {
                  const Icon = getIcon(p.icon);
                  return (
                    <div key={i} className="audit-perk flex flex-col items-center gap-2 text-[#94A3B8] text-[13px]">
                      <div className="perk-icon-wrap w-12 h-12 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#06b6d4]" />
                      </div>
                      {p.label}
                    </div>
                  );
                })}
              </div>
            </MotionInView>

            <MotionInView delay={0.4}>
              <Link href={ctaHref} className="inline-flex items-center gap-2.5 px-9 py-[15px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891b2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_36px_rgba(6,182,212,0.4)] mb-5">
                {ctaText} <ArrowRight className="w-4 h-4" />
              </Link>
            </MotionInView>

            <MotionInView delay={0.5}>
              <p className="text-[#4b5563] text-[13px]">{disclaimer}</p>
            </MotionInView>
          </div>
        </MotionInView>
      </div>
    </section>
  );
}

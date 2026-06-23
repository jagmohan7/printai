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
    <section className="pa-band-surface relative overflow-hidden section-pad px-4" style={{ borderTop: "1px solid var(--pa-line)" }}>
      <style>{`
        .audit-box { transition: border-color 0.3s, box-shadow 0.3s; }
        .audit-box:hover { border-color: var(--pa-teal); box-shadow: 0 0 60px rgba(103,61,230,0.12); }
        .audit-perk { transition: transform 0.2s, color 0.2s; }
        .audit-perk:hover { transform: translateY(-3px); color: var(--pa-ink); }
        .audit-perk:hover .perk-icon-wrap { background: color-mix(in srgb, var(--pa-teal) 20%, transparent); box-shadow: 0 0 16px rgba(103,61,230,0.3); }
        .perk-icon-wrap { transition: background 0.2s, box-shadow 0.2s; }
      `}</style>

      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[150px]" style={{ background: "color-mix(in srgb, var(--pa-teal) 7%, transparent)" }} />
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[100px]" style={{ background: "color-mix(in srgb, var(--pa-teal) 8%, transparent)" }} />

      <div className="relative z-10 max-w-[750px] mx-auto">
        <MotionInView>
          <div className="audit-box rounded-2xl p-10 sm:p-14 text-center backdrop-blur-sm" style={{ border: "1px solid color-mix(in srgb, var(--pa-teal) 25%, transparent)", background: "var(--pa-card)" }}>
            <MotionInView delay={0.1}>
              <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.8rem] font-extrabold tracking-tight leading-[1.15] mb-4" style={{ color: "var(--pa-ink)" }}>{heading}</h2>
            </MotionInView>

            <MotionInView delay={0.2}>
              <p className="text-[16px] leading-[1.8] mb-9 max-w-[500px] mx-auto" style={{ color: "var(--pa-ink-2)" }}>
                {descParts[0]}<span className="font-semibold" style={{ color: "var(--pa-ink)" }}>{improvHi}</span>{descParts[1]}
              </p>
            </MotionInView>

            <MotionInView delay={0.3}>
              <div className="flex items-center justify-center gap-8 mb-10 flex-wrap">
                {perks.map((p, i) => {
                  const Icon = getIcon(p.icon);
                  return (
                    <div key={i} className="audit-perk flex flex-col items-center gap-2 text-[13px]" style={{ color: "var(--pa-ink-2)" }}>
                      <div className="perk-icon-wrap w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--pa-teal) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--pa-teal) 20%, transparent)" }}>
                        <Icon className="w-5 h-5" style={{ color: "var(--pa-teal)" }} />
                      </div>
                      {p.label}
                    </div>
                  );
                })}
              </div>
            </MotionInView>

            <MotionInView delay={0.4}>
              <Link href={ctaHref} className="pa-btn-pri inline-flex items-center gap-2.5 px-9 py-[15px] rounded-xl font-semibold text-[15px] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 mb-5">
                {ctaText} <ArrowRight className="w-4 h-4" />
              </Link>
            </MotionInView>

            <MotionInView delay={0.5}>
              <p className="text-[13px]" style={{ color: "var(--pa-ink-2)" }}>{disclaimer}</p>
            </MotionInView>
          </div>
        </MotionInView>
      </div>
    </section>
  );
}

"use client";
import Link from "next/link";
import { useLeadModal } from "@/components/modals/LeadModalContext";

export interface SolutionCtaDefaults {
  badge:          string;
  heading:        string;
  highlightWord:  string;
  description:    string;
  primaryText:    string;
  primaryHref:    string;
  secondaryText:  string;
  secondaryHref:  string;
  trustPoints:    string[];
}

interface CmsCta {
  badge?:          string;
  heading?:        string;
  highlightWord?:  string;
  description?:    string;
  primaryText?:    string;
  primaryHref?:    string;
  secondaryText?:  string;
  secondaryHref?:  string;
  trustPoints?:    string[];
}

interface Props {
  defaults:    SolutionCtaDefaults;
  data?:       CmsCta | null;
  modalType?:  "product" | "service";
  entityName?: string;
}

export default function SolutionCtaSection({ defaults, data, modalType, entityName }: Props) {
  const { openProductDemo, openServiceConsultation } = useLeadModal();
  const badge         = data?.badge         || defaults.badge;
  const heading       = data?.heading       || defaults.heading;
  const highlightWord = data?.highlightWord || defaults.highlightWord;
  const description   = data?.description   || defaults.description;
  const primaryText   = data?.primaryText   || defaults.primaryText;
  const primaryHref   = data?.primaryHref   || defaults.primaryHref;
  const secondaryText = data?.secondaryText || defaults.secondaryText;
  const secondaryHref = data?.secondaryHref || defaults.secondaryHref;
  const trustPoints   = data?.trustPoints?.length ? data.trustPoints : defaults.trustPoints;

  const hiIdx     = heading.indexOf(highlightWord);
  const before    = hiIdx >= 0 ? heading.slice(0, hiIdx) : heading;
  const highlight = hiIdx >= 0 ? highlightWord : "";
  const after     = hiIdx >= 0 ? heading.slice(hiIdx + highlightWord.length) : "";

  return (
    <section
      className="relative overflow-hidden section-pad-sm px-4"
      style={{ background: "linear-gradient(135deg, var(--pa-navy) 0%, #0F3D2C 55%, var(--pa-navy) 100%)" }}
    >
      {/* Teal radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(19,192,122,0.10) 0%, transparent 70%)" }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <span
          className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
          style={{ fontFamily: "var(--font-plex-mono, ui-monospace, monospace)", color: "var(--pa-teal)" }}
        >
          {badge}
        </span>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white tracking-tight leading-tight mb-5">
          {before}
          {highlight && <span style={{ color: "var(--pa-teal)" }}>{highlight}</span>}
          {after}
        </h2>

        {/* Subtext */}
        <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "#9FB3C8" }}>
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {modalType ? (
            <button
              onClick={() =>
                modalType === "product"
                  ? openProductDemo(entityName ?? "")
                  : openServiceConsultation(entityName ?? "")
              }
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-[15px] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              style={{ background: "var(--pa-teal)", color: "#fff", boxShadow: "0 8px 24px rgba(19,192,122,0.32)" }}
            >
              {primaryText}
            </button>
          ) : (
            <Link
              href={primaryHref}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-[15px] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: "var(--pa-teal)", color: "#fff", boxShadow: "0 8px 24px rgba(19,192,122,0.32)" }}
            >
              {primaryText}
            </Link>
          )}
          <Link
            href={secondaryHref}
            className="pa-btn-onnavy-ghost inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-[15px]"
          >
            {secondaryText}
          </Link>
        </div>

        {/* Trust points */}
        {trustPoints.length > 0 && (
          <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px]" style={{ color: "#9FB3C8" }}>
            {trustPoints.map((pt, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--pa-teal)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {pt}
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}

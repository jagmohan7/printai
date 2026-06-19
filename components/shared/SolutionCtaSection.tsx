import Link from "next/link";

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
  defaults: SolutionCtaDefaults;
  data?:    CmsCta | null;
}

export default function SolutionCtaSection({ defaults, data }: Props) {
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
      style={{ background: "linear-gradient(135deg, #0B1628 0%, #0F3D2C 55%, #0B1628 100%)" }}
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
          style={{ fontFamily: "var(--font-plex-mono, ui-monospace, monospace)", color: "#13C07A" }}
        >
          {badge}
        </span>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white tracking-tight leading-tight mb-5">
          {before}
          {highlight && <span style={{ color: "#13C07A" }}>{highlight}</span>}
          {after}
        </h2>

        {/* Subtext */}
        <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "#9FB3C8" }}>
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-[15px] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{ background: "#13C07A", color: "#062A1E", boxShadow: "0 8px 24px rgba(19,192,122,0.32)" }}
          >
            {primaryText}
          </Link>
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
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#13C07A" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
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

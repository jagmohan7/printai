"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pickArray } from "@/lib/section-utils";

export interface W2PHeroData {
  badge?: string;
  headingLines?: string[];
  description?: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  configurator?: {
    productName?: string;
    productVariant?: string;
    quantities?: string[];
    paperStocks?: string[];
    finishingOptions?: string[];
    basePrice?: string;
    discountPrice?: string;
    badges?: Array<{ icon?: string; label?: string }>;
  };
}

interface Props { data?: W2PHeroData | null }

const FALLBACK: Required<Omit<W2PHeroData, "configurator">> & { configurator: NonNullable<W2PHeroData["configurator"]> } = {
  badge:            "Web-to-Print Platform",
  headingLines:     ["Web-to-Print Stores", "That Don't Break", "When Real Orders", "Come In"],
  description:      "Build storefronts that handle real-world print complexity — pricing, file uploads, finishing options, and shipping logic — without breaking at scale.",
  ctaPrimaryText:   "Get Store Audit",
  ctaPrimaryHref:   "/#contact",
  ctaSecondaryText: "See Store Examples",
  ctaSecondaryHref: "#features",
  configurator: {
    productName:      "Business Cards – Premium",
    productVariant:   "350gsm Silk Finish",
    quantities:       ["250", "500", "1000", "2500"],
    paperStocks:      ["350gsm Silk"],
    finishingOptions: ["Rounded Corners", "Spot UV", "Foiling", "Embossing"],
    basePrice:        "$156.50",
    discountPrice:    "$189.00",
    badges: [
      { icon: "⚙️", label: "Auto-config" },
      { icon: "📄", label: "Preflight" },
      { icon: "🚚", label: "Smart ship" },
    ],
  },
};

const heroCls = "text-[2.4rem] sm:text-[3rem] lg:text-[3.8rem] font-extrabold tracking-tight leading-[1.1]";

export default function W2PHeroSection({ data }: Props) {
  const badge            = data?.badge            ?? FALLBACK.badge;
  const headingLines     = pickArray(data?.headingLines, FALLBACK.headingLines);
  const description      = data?.description      ?? FALLBACK.description;
  const ctaPrimaryText   = data?.ctaPrimaryText   ?? FALLBACK.ctaPrimaryText;
  const ctaPrimaryHref   = data?.ctaPrimaryHref   ?? FALLBACK.ctaPrimaryHref;
  const ctaSecondaryText = data?.ctaSecondaryText ?? FALLBACK.ctaSecondaryText;
  const ctaSecondaryHref = data?.ctaSecondaryHref ?? FALLBACK.ctaSecondaryHref;

  const c                = data?.configurator ?? FALLBACK.configurator;
  const productName      = c.productName      ?? FALLBACK.configurator.productName!;
  const productVariant   = c.productVariant   ?? FALLBACK.configurator.productVariant!;
  const quantities       = pickArray(c.quantities,       FALLBACK.configurator.quantities!);
  const paperStocks      = pickArray(c.paperStocks,      FALLBACK.configurator.paperStocks!);
  const finishingOptions = pickArray(c.finishingOptions, FALLBACK.configurator.finishingOptions!);
  const basePrice        = c.basePrice        ?? FALLBACK.configurator.basePrice!;
  const discountPrice    = c.discountPrice    ?? FALLBACK.configurator.discountPrice!;
  const badges           = pickArray(c.badges,           FALLBACK.configurator.badges!);

  // Active selections (first item per group acts as the visually active one)
  const activeQty    = quantities[1] ?? quantities[0];
  const activeFinish = finishingOptions[0];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden" style={{ background: "var(--pa-page)" }}>
      <style>{`
        @keyframes float-blob { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-22px) scale(1.03); } }
        @keyframes fade-up { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.85); } }
        .blob-a { animation: float-blob 8s ease-in-out infinite; }
        .blob-b { animation: float-blob 11s ease-in-out infinite 2s; }
        .hero-fu-1 { animation: fade-up 0.7s ease both 0.1s; opacity:0; }
        .hero-fu-2 { animation: fade-up 0.7s ease both 0.25s; opacity:0; }
        .hero-fu-3 { animation: fade-up 0.7s ease both 0.4s; opacity:0; }
        .hero-fu-4 { animation: fade-up 0.7s ease both 0.55s; opacity:0; }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
        .config-card { transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s; }
        .config-card:hover { box-shadow: 0 0 40px rgba(103,61,230,0.18); border-color: var(--pa-teal); transform: translateY(-3px); }
        .qty-btn { transition: background 0.2s, color 0.2s, box-shadow 0.2s; }
        .qty-btn.active { background: var(--pa-teal); color: var(--pa-ink); box-shadow: 0 0 16px rgba(103,61,230,0.4); }
        .qty-btn:not(.active):hover { background: var(--pa-card); color: var(--pa-ink); }
        .finish-btn { transition: background 0.2s, border-color 0.2s, color 0.2s; cursor: pointer; }
        .finish-btn.active { border-color: var(--pa-teal); color: var(--pa-teal); background: color-mix(in srgb, var(--pa-teal) 10%, transparent); }
        .finish-btn:not(.active):hover { border-color: var(--pa-line); color: var(--pa-ink); }
      `}</style>

      <div className="blob-a pointer-events-none absolute left-[-5%] top-[20%] w-[500px] h-[500px] rounded-full blur-[130px]" style={{ background: "color-mix(in srgb, var(--pa-teal) 12%, transparent)" }} />
      <div className="blob-b pointer-events-none absolute right-[-4%] top-[35%] w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: "color-mix(in srgb, var(--pa-teal) 10%, transparent)" }} />

      <div className="relative z-10 pt-[70px] min-h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="max-w-[1200px] mx-auto w-full px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="hero-fu-1 mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ border: "1px solid var(--pa-line)", background: "var(--pa-card)" }}>
                <span className="pulse-dot w-2 h-2 rounded-full inline-block" style={{ background: "var(--pa-teal)" }} />
                <span className="text-[13px] font-medium tracking-wide" style={{ color: "var(--pa-teal)" }}>{badge}</span>
              </div>

              <h1 className={`hero-fu-2 ${heroCls} mb-6`} style={{ color: "var(--pa-ink)" }}>
                {headingLines.map((line, i) => (
                  <span key={i}>
                    {i === 0 ? (
                      <span style={{ color: "var(--pa-teal)" }}>{line}</span>
                    ) : (
                      line
                    )}
                    {i < headingLines.length - 1 && <br />}
                  </span>
                ))}
              </h1>

              <p className="hero-fu-3 text-[16px] sm:text-[17px] leading-[1.8] max-w-[480px] mb-9" style={{ color: "var(--pa-ink-2)" }}>{description}</p>

              <div className="hero-fu-4 flex items-center gap-4 flex-wrap">
                <Link href={ctaPrimaryHref} className="pa-btn-pri inline-flex items-center gap-2.5 px-7 py-[13px] rounded-xl font-semibold text-[14.5px]">
                  {ctaPrimaryText} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href={ctaSecondaryHref} className="pa-btn-ghost inline-flex items-center gap-2.5 px-7 py-[13px] rounded-xl font-semibold text-[14.5px] hover:-translate-y-0.5 transition-all duration-200">
                  {ctaSecondaryText}
                </Link>
              </div>
            </div>

            <div className="hero-fu-2">
              <div className="config-card rounded-2xl p-7" style={{ border: "1px solid var(--pa-line)", background: "var(--pa-card)", boxShadow: "0 4px 60px rgba(0,0,0,0.08)" }}>
                <div className="mb-5">
                  <p className="font-bold text-[17px]" style={{ color: "var(--pa-ink)" }}>{productName}</p>
                  <p className="text-[13px] mt-0.5" style={{ color: "var(--pa-ink-2)" }}>{productVariant}</p>
                </div>

                <div className="mb-5">
                  <p className="text-[12px] uppercase tracking-widest font-semibold mb-3" style={{ color: "var(--pa-ink-2)" }}>Quantity</p>
                  <div className="grid grid-cols-4 gap-2">
                    {quantities.map((q) => (
                      <button key={q} className={`qty-btn px-3 py-2.5 rounded-lg text-sm font-semibold ${q === activeQty ? "active" : ""}`} style={{ border: "1px solid var(--pa-line)", color: "var(--pa-ink-2)" }}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-[12px] uppercase tracking-widest font-semibold mb-3" style={{ color: "var(--pa-ink-2)" }}>Paper Stock</p>
                  <div className="flex items-center justify-between px-4 py-3 rounded-lg text-[14px] cursor-pointer transition-colors" style={{ border: "1px solid var(--pa-line)", background: "var(--pa-card)", color: "var(--pa-ink)" }}>
                    <span>{paperStocks[0]}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-[12px] uppercase tracking-widest font-semibold mb-3" style={{ color: "var(--pa-ink-2)" }}>Finishing</p>
                  <div className="grid grid-cols-2 gap-2">
                    {finishingOptions.map((f) => (
                      <button key={f} className={`finish-btn px-3 py-2.5 rounded-lg text-[13px] font-medium ${f === activeFinish ? "active" : ""}`} style={{ border: "1px solid var(--pa-line)", color: "var(--pa-ink-2)" }}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--pa-line)" }}>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest font-semibold mb-1" style={{ color: "var(--pa-ink-2)" }}>Total Price</p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-extrabold text-[22px]" style={{ color: "var(--pa-ink)" }}>{basePrice}</span>
                      <span className="text-[13px] line-through" style={{ color: "var(--pa-ink-2)" }}>{discountPrice}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[12px] font-medium" style={{ color: "var(--pa-teal)" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                    Live pricing
                  </div>
                </div>

                <div className="flex items-center gap-5 mt-5 pt-4" style={{ borderTop: "1px solid var(--pa-line)" }}>
                  {badges.map((b, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[12px]" style={{ color: "var(--pa-ink-2)" }}>
                      <span className="text-[13px]">{b.icon}</span>{b.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

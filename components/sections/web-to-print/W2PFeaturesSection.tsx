"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface W2PFeaturesData {
  sectionTag?: string;
  heading?: string;
  highlightWord?: string;
  subheading?: string;
  features?: Array<{ icon?: string; title?: string; description?: string; bullets?: string[] }>;
}

interface Props { data?: W2PFeaturesData | null }

const FALLBACK = {
  sectionTag:    "What We Build",
  heading:       "Stores Built for Real Production",
  highlightWord: "Real Production",
  subheading:    "Everything you need to handle complex print orders at scale",
  features: [
    { icon: "Store",             title: "Smart Storefront Foundation",      description: "Built on Shopify, WooCommerce, or custom frameworks with scalable architecture designed for print complexity", bullets: ["Multi-channel ready", "B2B + Retail combined", "Production-grade infrastructure"] },
    { icon: "SlidersHorizontal", title: "Real-Time Product Configurator",   description: "Dynamic pricing that updates instantly as customers change options — no surprises at checkout",            bullets: ["Live price calculations", "Visual option preview", "Dependency handling"] },
    { icon: "Upload",            title: "File Upload + Auto Preflight",     description: "Drag-and-drop with automatic checks for bleed, DPI, color space, and file size",                              bullets: ["Format validation", "Automated preflight", "Error prevention"] },
    { icon: "MapPin",            title: "Advanced Shipping Logic",          description: "Handle flat-rate, dimensional weight, freight, and location-aware pricing automatically",                     bullets: ["Multi-carrier support", "Zone-based pricing", "Real-time rates"] },
  ],
};

export default function W2PFeaturesSection({ data }: Props) {
  const sectionTag    = data?.sectionTag    ?? FALLBACK.sectionTag;
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const subheading    = data?.subheading    ?? FALLBACK.subheading;
  const features      = pickArray(data?.features, FALLBACK.features);

  const [hb, hh, ha] = splitHeading(heading, highlightWord);

  return (
    <section id="features" className="pa-band-page relative overflow-hidden section-pad px-4" style={{ borderTop: "1px solid var(--pa-line)" }}>
      <style>{`
        .feat-card { transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s; position: relative; overflow: hidden; }
        .feat-card::before { content: ''; position: absolute; inset: 0; background: color-mix(in srgb, var(--pa-teal) 4%, transparent); opacity: 0; transition: opacity 0.3s; }
        .feat-card:hover::before { opacity: 1; }
        .feat-card:hover { border-color: var(--pa-teal); box-shadow: 0 0 40px rgba(6,182,212,0.1); transform: translateY(-4px); }
        .feat-icon-wrap { transition: background 0.3s, box-shadow 0.3s; }
        .feat-card:hover .feat-icon-wrap { background: color-mix(in srgb, var(--pa-teal) 15%, transparent); box-shadow: 0 0 20px rgba(6,182,212,0.3); }
        .feat-card:hover .feat-icon { color: var(--pa-teal); }
        .bullet-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--pa-teal); flex-shrink: 0; margin-top: 7px; }
      `}</style>

      <div className="pointer-events-none absolute right-[-5%] top-[20%] w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: "color-mix(in srgb, var(--pa-teal) 8%, transparent)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <MotionInView className="text-center mb-14">
          <p className="text-[13px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--pa-teal)" }}>{sectionTag}</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight leading-[1.15]" style={{ color: "var(--pa-ink)" }}>
            {hb}{hh && <span style={{ color: "var(--pa-teal)" }}>{hh}</span>}{ha}
          </h2>
          <p className="mt-4 text-[16px] max-w-xl mx-auto" style={{ color: "var(--pa-ink-2)" }}>{subheading}</p>
        </MotionInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            const bullets = pickArray(f.bullets, []);
            return (
              <MotionInView key={i} delay={i * 0.12}>
                <div className="feat-card h-full rounded-2xl p-8" style={{ border: "1px solid var(--pa-line)", background: "var(--pa-card)" }}>
                  <div className="feat-icon-wrap w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "color-mix(in srgb, var(--pa-teal) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--pa-teal) 20%, transparent)" }}>
                    <Icon className="feat-icon w-5 h-5" style={{ color: "var(--pa-teal)" }} />
                  </div>
                  <h3 className="font-bold text-[18px] mb-2.5" style={{ color: "var(--pa-ink)" }}>{f.title}</h3>
                  <p className="text-[14px] leading-[1.75] mb-5" style={{ color: "var(--pa-ink-2)" }}>{f.description}</p>
                  <ul className="space-y-2">
                    {bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[13.5px]" style={{ color: "var(--pa-ink-2)" }}>
                        <div className="bullet-dot" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

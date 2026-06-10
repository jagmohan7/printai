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
    <section id="features" className="relative overflow-hidden bg-[#070B14] section-pad px-4 border-t border-[#1E293B]/50">
      <style>{`
        .feat-card { transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s; position: relative; overflow: hidden; }
        .feat-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(124,58,237,0.04) 0%, rgba(6,182,212,0.04) 100%); opacity: 0; transition: opacity 0.3s; }
        .feat-card:hover::before { opacity: 1; }
        .feat-card:hover { border-color: rgba(6,182,212,0.3); box-shadow: 0 0 40px rgba(6,182,212,0.1); transform: translateY(-4px); }
        .feat-icon-wrap { transition: background 0.3s, box-shadow 0.3s; }
        .feat-card:hover .feat-icon-wrap { background: rgba(6,182,212,0.15); box-shadow: 0 0 20px rgba(6,182,212,0.3); }
        .feat-card:hover .feat-icon { color: #22d3ee; }
        .bullet-dot { width: 5px; height: 5px; border-radius: 50%; background: linear-gradient(135deg, #7c3aed, #06b6d4); flex-shrink: 0; margin-top: 7px; }
      `}</style>

      <div className="pointer-events-none absolute right-[-5%] top-[20%] w-[400px] h-[400px] rounded-full bg-[#06b6d4]/8 blur-[120px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <MotionInView className="text-center mb-14">
          <p className="text-[#a78bfa] text-[13px] font-semibold uppercase tracking-widest mb-3">{sectionTag}</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {hb}{hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}{ha}
          </h2>
          <p className="mt-4 text-[#94A3B8] text-[16px] max-w-xl mx-auto">{subheading}</p>
        </MotionInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            const bullets = pickArray(f.bullets, []);
            return (
              <MotionInView key={i} delay={i * 0.12}>
                <div className="feat-card h-full rounded-2xl border border-[#1E293B] bg-[#0F172A] p-8">
                  <div className="feat-icon-wrap w-12 h-12 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center mb-5">
                    <Icon className="feat-icon w-5 h-5 text-[#06b6d4]" />
                  </div>
                  <h3 className="text-white font-bold text-[18px] mb-2.5">{f.title}</h3>
                  <p className="text-[#94A3B8] text-[14px] leading-[1.75] mb-5">{f.description}</p>
                  <ul className="space-y-2">
                    {bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[#94A3B8] text-[13.5px]">
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

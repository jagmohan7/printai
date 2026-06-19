"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { pickArray } from "@/lib/section-utils";

export interface W2PCapabilitiesData {
  heading?: string;
  tiles?: Array<{ icon?: string; title?: string; description?: string }>;
}

interface Props { data?: W2PCapabilitiesData | null }

const FALLBACK = {
  heading: "Everything Your Print Store Needs",
  tiles: [
    { icon: "SlidersHorizontal", title: "Live Product Configurator", description: "Real-time options and pricing" },
    { icon: "DollarSign",        title: "Dynamic Pricing Engine",    description: "Complex calculations handled automatically" },
    { icon: "FileText",          title: "Template-Based Ordering",   description: "Pre-approved designs with variable data" },
    { icon: "Upload",            title: "File Upload + Validation",  description: "Automatic preflight and error detection" },
    { icon: "Search",            title: "Print-Optimized Search",    description: "Filter by size, material, finish, turnaround" },
    { icon: "Smartphone",        title: "Mobile-First UX",            description: "Perfect experience on any device" },
    { icon: "Users",             title: "B2B + Retail Combined",     description: "One store, multiple customer types" },
    { icon: "ShoppingCart",      title: "Print-Smart Checkout",      description: "Optimized for print buyer behavior" },
  ],
};

export default function W2PCapabilitiesSection({ data }: Props) {
  const heading = data?.heading ?? FALLBACK.heading;
  const tiles   = pickArray(data?.tiles, FALLBACK.tiles);

  return (
    <section className="pa-band-surface relative overflow-hidden section-pad px-4" style={{ borderTop: "1px solid var(--pa-line)" }}>
      <style>{`
        .tile-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s, background 0.25s; cursor: default; }
        .tile-card:hover { border-color: var(--pa-teal); box-shadow: 0 0 28px rgba(6,182,212,0.1); transform: translateY(-3px); background: var(--pa-card); }
        .tile-icon-wrap { transition: background 0.25s, box-shadow 0.25s; }
        .tile-card:hover .tile-icon-wrap { background: color-mix(in srgb, var(--pa-teal) 15%, transparent); box-shadow: 0 0 16px rgba(6,182,212,0.25); }
        .tile-card:hover .tile-icon { color: var(--pa-teal); }
      `}</style>

      <div className="pointer-events-none absolute left-[-4%] top-[30%] w-[450px] h-[450px] rounded-full blur-[120px]" style={{ background: "color-mix(in srgb, var(--pa-teal) 8%, transparent)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.8rem] font-extrabold tracking-tight leading-[1.15]" style={{ color: "var(--pa-ink)" }}>
            {heading}
          </h2>
        </MotionInView>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tiles.map((t, i) => {
            const Icon = getIcon(t.icon);
            return (
              <MotionInView key={i} delay={i * 0.07}>
                <div className="tile-card h-full rounded-xl p-5" style={{ border: "1px solid var(--pa-line)", background: "var(--pa-card)" }}>
                  <div className="tile-icon-wrap w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "color-mix(in srgb, var(--pa-teal) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--pa-teal) 15%, transparent)" }}>
                    <Icon className="tile-icon w-4 h-4" style={{ color: "var(--pa-teal)" }} />
                  </div>
                  <p className="font-semibold text-[14px] mb-1.5 leading-tight" style={{ color: "var(--pa-ink)" }}>{t.title}</p>
                  <p className="text-[12.5px] leading-[1.6]" style={{ color: "var(--pa-ink-2)" }}>{t.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

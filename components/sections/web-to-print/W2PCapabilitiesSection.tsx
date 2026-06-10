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
    <section className="relative overflow-hidden bg-[#0B1220] section-pad px-4 border-t border-[#1E293B]/50">
      <style>{`
        .tile-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s, background 0.25s; cursor: default; }
        .tile-card:hover { border-color: rgba(6,182,212,0.3); box-shadow: 0 0 28px rgba(6,182,212,0.1); transform: translateY(-3px); background: #16172a; }
        .tile-icon-wrap { transition: background 0.25s, box-shadow 0.25s; }
        .tile-card:hover .tile-icon-wrap { background: rgba(6,182,212,0.15); box-shadow: 0 0 16px rgba(6,182,212,0.25); }
        .tile-card:hover .tile-icon { color: #22d3ee; }
      `}</style>

      <div className="pointer-events-none absolute left-[-4%] top-[30%] w-[450px] h-[450px] rounded-full bg-[#7c3aed]/8 blur-[120px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.8rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {heading}
          </h2>
        </MotionInView>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tiles.map((t, i) => {
            const Icon = getIcon(t.icon);
            return (
              <MotionInView key={i} delay={i * 0.07}>
                <div className="tile-card h-full rounded-xl border border-[#1E293B] bg-[#0F172A] p-5">
                  <div className="tile-icon-wrap w-10 h-10 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/15 flex items-center justify-center mb-4">
                    <Icon className="tile-icon w-4 h-4 text-[#06b6d4]" />
                  </div>
                  <p className="text-white font-semibold text-[14px] mb-1.5 leading-tight">{t.title}</p>
                  <p className="text-[#94A3B8] text-[12.5px] leading-[1.6]">{t.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

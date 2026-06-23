"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface DevOpsBuiltForData {
  heading?: string;
  highlightWord?: string;
  industries?: Array<{ icon?: string; label?: string }>;
}

interface Props { data?: DevOpsBuiltForData | null }

const FALLBACK = {
  heading: "Built for Print Businesses Running Complex Digital Workflows",
  highlightWord: "Complex Digital Workflows",
  industries: [
    { icon: "ShoppingCart", label: "Web-to-Print platforms" },
    { icon: "LayoutGrid",   label: "Commercial printers" },
    { icon: "Package",      label: "Print-on-demand businesses" },
    { icon: "Layers",       label: "Packaging & label printers" },
    { icon: "Server",       label: "Enterprise print operations" },
    { icon: "Network",      label: "Multi-location print companies" },
  ],
};

export default function DevOpsBuiltForSection({ data }: Props) {
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const industries    = pickArray(data?.industries, FALLBACK.industries);

  const [hb, hh, ha] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden pa-band-surface section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-cyan-500/6 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight pa-ink-text leading-[1.15]">
            {hb}{hh && <span style={{ color: "var(--pa-teal)" }}>{hh}</span>}{ha}
          </h2>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((it, i) => {
            const Icon = getIcon(it.icon);
            return (
              <MotionInView key={i} delay={0.08 * i}>
                <div className="group flex items-center gap-4 px-6 py-5 rounded-2xl border transition-all duration-300 cursor-default border-[var(--pa-line)] bg-[var(--pa-card)] hover:border-[color:var(--pa-teal)] hover:shadow-[0_0_22px_rgba(103,61,230,0.15)]">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[var(--pa-card)] border border-[var(--pa-line)]" style={{ transition: "background 0.3s, border-color 0.3s" }}>
                    <Icon size={18} strokeWidth={1.5} style={{ color: "var(--pa-teal)" }} />
                  </div>
                  <span className="pa-ink-text font-medium text-[15px]">{it.label}</span>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

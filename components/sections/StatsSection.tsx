import type { SanityStats } from "@/lib/sanity.types";

// ── Fallback content (used when Sanity has no stats) ──────────────────────────
const DEFAULT_ITEMS = [
  { value: "85%",   label: "Faster Order Processing" },
  { value: "300%",  label: "Revenue Growth" },
  { value: "120K+", label: "Annual Savings" },
  { value: "24/7",  label: "AI Support" },
];

/**
 * Thin performance-stats strip shown directly below the hero.
 * Always the dark navy band from the new design (teal numerals, slate labels)
 * — independent of the light/dark page theme. All values editable from Sanity.
 */
export default function StatsSection({ data }: { data?: SanityStats }) {
  const items = data?.items?.length ? data.items : DEFAULT_ITEMS;

  return (
    <section className="bg-[#0B1628]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {items.map((s, i) => (
            <div
              key={i}
              className="h-[80px] md:h-[100px] flex items-center justify-center md:justify-start gap-3 px-6"
            >
              <span className="font-extrabold text-[#13C07A] leading-none tracking-tight text-[20px] md:text-[22px] whitespace-nowrap">
                {s.value}
              </span>
              <span className="text-[12px] text-[#9FB3C8] leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

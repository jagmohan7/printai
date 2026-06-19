"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { pickArray } from "@/lib/section-utils";

export interface AutomationIntegrationsData {
  heading?: string;
  integrations?: Array<{ icon?: string; label?: string }>;
}

interface Props { data?: AutomationIntegrationsData | null }

const FALLBACK = {
  heading: "Works With Your Existing Stack",
  integrations: [
    { icon: "ShoppingCart", label: "Shopify" },
    { icon: "Package",      label: "WooCommerce" },
    { icon: "DollarSign",   label: "ERPNext" },
    { icon: "DollarSign",   label: "QuickBooks" },
    { icon: "Mail",         label: "Klaviyo" },
    { icon: "Printer",      label: "EFI / Onyx / Caldera" },
    { icon: "Truck",        label: "UPS" },
    { icon: "Truck",        label: "FedEx" },
    { icon: "Truck",        label: "USPS" },
  ],
};

const TILE_THEMES = [
  { color: "text-blue-300",   iconBg: "bg-blue-500/15" },
  { color: "text-blue-300",   iconBg: "bg-blue-500/15" },
  { color: "text-cyan-300",   iconBg: "bg-cyan-500/15" },
  { color: "text-cyan-300",   iconBg: "bg-cyan-500/15" },
];

export default function IntegrationsSection({ data }: Props) {
  const heading      = data?.heading ?? FALLBACK.heading;
  const integrations = pickArray(data?.integrations, FALLBACK.integrations);

  return (
    <section className="relative overflow-hidden pa-band-surface section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight pa-ink-text leading-[1.15]">{heading}</h2>
        </MotionInView>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {integrations.map((it, i) => {
            const Icon  = getIcon(it.icon);
            const theme = TILE_THEMES[i % TILE_THEMES.length];
            return (
              <MotionInView key={i} delay={i * 0.06} from={i % 2 === 0 ? "up" : "down"} distance={30}>
                <div className="group h-full rounded-2xl border border-[var(--pa-line)] bg-[var(--pa-card)] p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-[#3B82F6]/40 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] pa-card-hover">
                  <div className={`w-14 h-14 rounded-xl ${theme.iconBg} border border-[var(--pa-line)] flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:border-[#3B82F6]/40`}>
                    <Icon className={`w-6 h-6 ${theme.color}`} strokeWidth={1.75} />
                  </div>
                  <span className="pa-ink-text font-semibold text-[14px]">{it.label}</span>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

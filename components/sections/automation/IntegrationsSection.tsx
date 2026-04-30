"use client";
import { ShoppingCart, Package, DollarSign, Mail, Printer, Truck } from "lucide-react";
import MotionInView from "@/components/MotionInView";

const integrations = [
  { icon: ShoppingCart, label: "Shopify",            color: "text-blue-300",  iconBg: "bg-blue-500/15"  },
  { icon: Package,      label: "WooCommerce",        color: "text-blue-300",  iconBg: "bg-blue-500/15"  },
  { icon: DollarSign,   label: "ERPNext",            color: "text-cyan-300",  iconBg: "bg-cyan-500/15"  },
  { icon: DollarSign,   label: "QuickBooks",         color: "text-cyan-300",  iconBg: "bg-cyan-500/15"  },
  { icon: Mail,         label: "Klaviyo",            color: "text-blue-300",  iconBg: "bg-blue-500/15"  },
  { icon: Printer,      label: "EFI / Onyx / Caldera", color: "text-blue-300", iconBg: "bg-blue-500/15"  },
  { icon: Truck,        label: "UPS",                color: "text-blue-300",  iconBg: "bg-blue-500/15"  },
  { icon: Truck,        label: "FedEx",              color: "text-blue-300",  iconBg: "bg-blue-500/15"  },
  { icon: Truck,        label: "USPS",               color: "text-blue-300",  iconBg: "bg-blue-500/15"  },
];

export default function IntegrationsSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-28 px-4 border-t border-white/[0.04]">
      <div className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            Works With Your Existing Stack
          </h2>
        </MotionInView>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {integrations.map(({ icon: Icon, label, color, iconBg }, i) => (
            <MotionInView
              key={label}
              delay={i * 0.06}
              from={i % 2 === 0 ? "up" : "down"}
              distance={30}
            >
              <div className="group h-full rounded-2xl border border-white/[0.07] bg-[#0e0f1c] p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-cyan-400/55 hover:bg-[#11132a] hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]">
                <div className={`w-14 h-14 rounded-xl ${iconBg} border border-white/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400/40`}>
                  <Icon className={`w-6 h-6 ${color}`} strokeWidth={1.75} />
                </div>
                <span className="text-white font-semibold text-[14px]">{label}</span>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}

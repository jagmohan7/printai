"use client";
import Link from "next/link";
import { ArrowRight, FileText, Settings, Calendar, Printer, Truck } from "lucide-react";
import MotionInView from "@/components/MotionInView";

const steps = [
  { icon: FileText, label: "Order",      iconBg: "bg-blue-500/15",   ring: "border-blue-400/40",   color: "text-blue-300"  },
  { icon: Settings, label: "Prepress",   iconBg: "bg-cyan-500/15",   ring: "border-cyan-400/40",   color: "text-cyan-300"  },
  { icon: Calendar, label: "Scheduling", iconBg: "bg-cyan-500/15",   ring: "border-cyan-400/40",   color: "text-cyan-300"  },
  { icon: Printer,  label: "Printing",   iconBg: "bg-violet-500/15", ring: "border-violet-400/40", color: "text-violet-300"},
  { icon: Truck,    label: "Shipping",   iconBg: "bg-blue-500/15",   ring: "border-blue-400/40",   color: "text-blue-300"  },
];

export default function HeroAutomation() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b14] pt-32 pb-24 px-4">
      <div className="pointer-events-none absolute left-[-8%] top-[10%] w-[520px] h-[520px] rounded-full bg-blue-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-6%] bottom-[-10%] w-[460px] h-[460px] rounded-full bg-cyan-500/15 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: copy */}
        <MotionInView>
          <h1 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-extrabold tracking-tight text-white leading-[1.1]">
            Print{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Workflow Automation
            </span>{" "}
            That Respects How a Press Floor Works
          </h1>

          <p className="mt-7 text-gray-400 text-[16px] sm:text-[17px] leading-[1.75] max-w-xl">
            Automate order intake, prepress, scheduling, and fulfillment with
            systems built for real print operations — not generic workflows.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 px-7 py-[14px] rounded-xl font-semibold text-[14.5px] text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            >
              Book Free Workflow Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 px-7 py-[14px] rounded-xl font-semibold text-[14.5px] text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Map My Workflow
            </Link>
          </div>
        </MotionInView>

        {/* Right: 5-step vertical workflow — slides in from the right */}
        <div className="relative">
          {/* Vertical connector line */}
          <MotionInView
            from="none"
            delay={0.2}
            duration={0.9}
            className="pointer-events-none absolute left-[31px] top-8 bottom-8 w-px bg-gradient-to-b from-blue-400/0 via-cyan-400/40 to-blue-400/0"
          >
            <span />
          </MotionInView>

          <div className="space-y-4">
            {steps.map(({ icon: Icon, label, iconBg, ring, color }, i) => (
              <MotionInView
                key={label}
                from="left"
                distance={70}
                delay={0.25 + i * 0.12}
                className="relative flex items-center gap-4"
              >
                {/* Icon square */}
                <div className={`relative z-10 w-16 h-16 shrink-0 rounded-2xl ${iconBg} border ${ring} flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.15)]`}>
                  <Icon className={`w-6 h-6 ${color}`} strokeWidth={1.75} />
                </div>

                {/* Step row */}
                <div className="group flex-1 flex items-center justify-between gap-4 px-5 py-[18px] rounded-2xl border border-white/[0.07] bg-[#0e0f1c] hover:border-cyan-400/40 hover:bg-[#11132a] transition-all duration-300">
                  <span className="text-white font-semibold text-[15.5px]">{label}</span>
                  <ArrowRight className="w-5 h-5 text-cyan-400/70 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </MotionInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

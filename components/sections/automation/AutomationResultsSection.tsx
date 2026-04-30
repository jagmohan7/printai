"use client";
import { TrendingDown, AlertCircle, CheckCircle2, PhoneOff } from "lucide-react";
import MotionInView from "@/components/MotionInView";

const stats = [
  {
    icon: TrendingDown,
    value: "40-55%",
    label: "reduction in order touch-time",
    gradient: "from-blue-400 to-indigo-400",
    iconBg: "bg-blue-500/15",
    ring: "border-blue-400/35",
    color: "text-blue-300",
  },
  {
    icon: AlertCircle,
    value: "20-35%",
    label: "reduction in reprints",
    gradient: "from-cyan-400 to-teal-400",
    iconBg: "bg-cyan-500/15",
    ring: "border-cyan-400/35",
    color: "text-cyan-300",
  },
  {
    icon: CheckCircle2,
    value: "96%+",
    label: "on-time delivery rate",
    gradient: "from-teal-400 to-emerald-400",
    iconBg: "bg-teal-500/15",
    ring: "border-teal-400/35",
    color: "text-teal-300",
  },
  {
    icon: PhoneOff,
    value: "50%",
    label: "reduction in \"Where's my job?\" calls",
    gradient: "from-violet-400 to-purple-400",
    iconBg: "bg-violet-500/15",
    ring: "border-violet-400/35",
    color: "text-violet-300",
  },
];

export default function AutomationResultsSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-28 px-4 border-t border-white/[0.04]">
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            What Changes in 90 Days
          </h2>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label, gradient, iconBg, ring, color }, i) => (
            <MotionInView key={label} delay={i * 0.1}>
              <div className="group relative h-full rounded-2xl border border-white/[0.07] bg-[#0e0f1c] p-8 text-center transition-all duration-300 hover:border-cyan-400/45 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
                <div className={`w-14 h-14 mx-auto mb-7 rounded-2xl ${iconBg} border ${ring} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`w-6 h-6 ${color}`} strokeWidth={1.75} />
                </div>

                <p className={`text-[2.4rem] sm:text-[2.8rem] font-extrabold leading-none bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {value}
                </p>
                <p className="mt-4 text-gray-400 text-[13.5px] leading-[1.55] max-w-[200px] mx-auto">
                  {label}
                </p>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}

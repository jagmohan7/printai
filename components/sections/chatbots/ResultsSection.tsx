"use client";
import { Clock, TrendingUp, MessageSquare, Target } from "lucide-react";
import MotionInView from "@/components/MotionInView";

const stats = [
  {
    icon: Clock,
    value: "8-14",
    suffix: "hours/week",
    label: "Saved per CSR",
    gradient: "from-blue-400 to-cyan-400",
    iconBg: "from-blue-500/20 to-cyan-500/10",
    iconBorder: "border-blue-400/30",
    iconColor: "text-blue-300",
  },
  {
    icon: TrendingUp,
    value: "38%",
    label: "Increase in after-hours leads",
    gradient: "from-teal-400 to-cyan-400",
    iconBg: "from-teal-500/20 to-cyan-500/10",
    iconBorder: "border-teal-400/30",
    iconColor: "text-teal-300",
  },
  {
    icon: MessageSquare,
    value: "Minutes",
    label: "Quote response time",
    gradient: "from-violet-400 to-purple-400",
    iconBg: "from-violet-500/20 to-purple-500/10",
    iconBorder: "border-violet-400/30",
    iconColor: "text-violet-300",
  },
  {
    icon: Target,
    value: "20%+",
    label: "Self-service rate",
    gradient: "from-fuchsia-400 to-violet-400",
    iconBg: "from-fuchsia-500/20 to-violet-500/10",
    iconBorder: "border-fuchsia-400/30",
    iconColor: "text-fuchsia-300",
  },
];

export default function ResultsSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-28 px-4 border-t border-white/[0.04]">
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            What Print Shops See in{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              30-60 Days
            </span>
          </h2>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, suffix, label, gradient, iconBg, iconBorder, iconColor }, i) => (
            <MotionInView key={label} delay={i * 0.1}>
              <div className="group relative h-full rounded-2xl border border-white/[0.07] bg-[#0e0f1c] p-8 text-center transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]">
                <div
                  className={`w-14 h-14 mx-auto mb-6 rounded-full bg-gradient-to-br ${iconBg} border ${iconBorder} flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={1.75} />
                </div>

                <p
                  className={`text-[2.4rem] sm:text-[2.8rem] font-extrabold leading-none bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                >
                  {value}
                </p>
                {suffix && (
                  <p
                    className={`text-[1.6rem] font-extrabold leading-tight bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                  >
                    {suffix}
                  </p>
                )}
                <p className="mt-4 text-gray-400 text-[13.5px] leading-[1.5]">
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

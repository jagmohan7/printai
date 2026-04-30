"use client";
import { Clock, MessageCircle, Moon, FileQuestion, RotateCw } from "lucide-react";
import MotionInView from "@/components/MotionInView";

const problems = [
  {
    icon: Clock,
    title: "Quote Requests Sitting Overnight",
    desc: "Leads go cold while waiting for morning",
  },
  {
    icon: MessageCircle,
    title: "CSRs Repeating Same Answers",
    desc: "Wasting hours on identical pricing questions",
  },
  {
    icon: Moon,
    title: "After-Hours Leads Going Cold",
    desc: "38% of inquiries happen outside business hours",
  },
  {
    icon: FileQuestion,
    title: "File-Prep Questions Repeated",
    desc: "Same DPI, bleed, format questions daily",
  },
  {
    icon: RotateCw,
    title: "Reorder Friction for Customers",
    desc: "Customers have to re-explain previous jobs",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-28 px-4 border-t border-white/[0.04]">
      <div className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            Where Print Shops{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Lose Leads
            </span>
          </h2>
        </MotionInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map(({ icon: Icon, title, desc }, i) => (
            <MotionInView key={title} delay={i * 0.1}>
              <div className="group relative h-full rounded-2xl border border-white/[0.07] bg-[#0e0f1c] p-8 text-center transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] hover:-translate-y-1">
                {/* Top halo on hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-2xl bg-gradient-to-b from-cyan-400/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative w-14 h-14 mx-auto mb-6 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center transition-all duration-300 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                  <Icon className="w-6 h-6 text-cyan-300" strokeWidth={1.75} />
                </div>

                <h3 className="relative text-white font-bold text-[16px] mb-2.5">
                  {title}
                </h3>
                <p className="relative text-gray-400 text-[13.5px] leading-[1.6]">
                  {desc}
                </p>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}

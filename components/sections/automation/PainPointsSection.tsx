"use client";
import { RefreshCw, FolderOpen, ClipboardList, AlertTriangle, MessageSquare, Puzzle } from "lucide-react";
import MotionInView from "@/components/MotionInView";

const points = [
  {
    icon: RefreshCw,
    text: "Estimators rebuilding the same quote repeatedly",
  },
  {
    icon: FolderOpen,
    text: "Files moving between teams with no tracking",
  },
  {
    icon: ClipboardList,
    text: "Press scheduling managed on whiteboards",
  },
  {
    icon: AlertTriangle,
    text: "Version errors causing reprints",
  },
  {
    icon: MessageSquare,
    text: "Customers constantly asking for job status",
  },
  {
    icon: Puzzle,
    text: "Disconnected tools creating confusion",
  },
];

export default function PainPointsSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-28 px-4 border-t border-white/[0.04]">
      <div className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            Where Print Shops Leak Time
          </h2>
          <p className="mt-4 text-gray-400 text-[16px] sm:text-[17px]">
            Manual Work Is Slowing Your Shop Down
          </p>
        </MotionInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {points.map(({ icon: Icon, text }, i) => (
            <MotionInView key={text} delay={i * 0.08}>
              <div className="group relative h-full rounded-2xl border border-white/[0.07] bg-[#0e0f1c] p-6 flex items-start gap-4 transition-all duration-300 hover:border-cyan-400/45 hover:bg-[#11132a] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center transition-all duration-300 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50">
                  <Icon className="w-5 h-5 text-cyan-300" strokeWidth={1.75} />
                </div>
                <p className="text-white text-[15px] font-semibold leading-[1.55] pt-1.5">
                  {text}
                </p>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}

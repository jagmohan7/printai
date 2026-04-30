"use client";
import { Inbox, Sparkles, CalendarClock, Package } from "lucide-react";
import MotionInView from "@/components/MotionInView";

const items = [
  {
    icon: Inbox,
    title: "Order Intake & Routing",
    desc: "Orders from website, marketplaces, and B2B portals are automatically routed based on SLA, material, and production rules.",
    iconBg: "bg-blue-500/15",
    ring: "border-blue-400/35",
    color: "text-blue-300",
  },
  {
    icon: Sparkles,
    title: "Prepress Automation",
    desc: "Auto-preflight checks (bleed, DPI, color, fonts). Failed files trigger automated correction requests.",
    iconBg: "bg-cyan-500/15",
    ring: "border-cyan-400/35",
    color: "text-cyan-300",
  },
  {
    icon: CalendarClock,
    title: "Production Scheduling",
    desc: "Dynamic scheduling based on press capacity, run length, and job priority — replacing manual planning.",
    iconBg: "bg-cyan-500/15",
    ring: "border-cyan-400/35",
    color: "text-cyan-300",
  },
  {
    icon: Package,
    title: "Fulfillment & Tracking",
    desc: "Automated shipping labels, tracking updates, and customer notifications without manual intervention.",
    iconBg: "bg-violet-500/15",
    ring: "border-violet-400/35",
    color: "text-violet-300",
  },
];

export default function WhatWeAutomateSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-28 px-4 border-t border-white/[0.04]">
      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-16">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.85rem] font-extrabold tracking-tight text-white leading-[1.15] max-w-4xl mx-auto">
            From Order Intake to Fulfillment — Fully Automated
          </h2>
          <p className="mt-4 text-gray-400 text-[16px] sm:text-[17px]">
            What We Automate
          </p>
        </MotionInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(({ icon: Icon, title, desc, iconBg, ring, color }, i) => (
            <MotionInView key={title} delay={i * 0.12}>
              <div className="group relative h-full rounded-2xl border border-white/[0.07] bg-[#0e0f1c] p-8 sm:p-10 transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(34,211,238,0.18)]">
                <div className={`w-14 h-14 rounded-2xl ${iconBg} border ${ring} flex items-center justify-center mb-7 transition-all duration-300 group-hover:scale-110`}>
                  <Icon className={`w-6 h-6 ${color}`} strokeWidth={1.75} />
                </div>

                <h3 className="text-white font-bold text-[1.4rem] mb-4">{title}</h3>
                <p className="text-gray-400 text-[14.5px] leading-[1.75]">{desc}</p>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}

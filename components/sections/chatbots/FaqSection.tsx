"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import MotionInView from "@/components/MotionInView";

const faqs = [
  {
    q: "Will the chatbot replace my CSRs?",
    a: "No — it handles the repetitive 80% (pricing, turnaround, file specs) so your CSRs can focus on complex jobs, relationship building, and high-value customers. Most shops actually expand their CSR roles to be more strategic after deploying PrintAI.",
  },
  {
    q: "How long does setup take?",
    a: "Typical setup is under 5 business days. We collect your pricing data, train the model on your catalog, integrate with your channels, and run a 24-hour quality review before going live.",
  },
  {
    q: "Can it integrate with my existing tools?",
    a: "Yes. PrintAI connects natively to Frappe/ERPNext, common CRMs, web chat, WhatsApp, email, and SMS. If you have a custom system, we expose a simple API and webhooks for two-way sync.",
  },
  {
    q: "What if a customer asks something the AI doesn't know?",
    a: "The bot will gracefully say it isn't sure and route the conversation to your team with full context — chat transcript, customer details, and any files shared. Nothing falls through the cracks.",
  },
  {
    q: "Is there a contract or commitment?",
    a: "Month-to-month with no long-term contract. Cancel anytime. We're confident in the value, so we don't lock you in.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-28 px-4 border-t border-white/[0.04]">
      <div className="relative z-10 max-w-4xl mx-auto">
        <MotionInView className="text-center mb-12">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </MotionInView>

        <div className="space-y-4">
          {faqs.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <MotionInView key={q} delay={i * 0.08}>
                <div
                  className={`rounded-2xl border bg-[#0e0f1c] overflow-hidden transition-colors duration-300 ${
                    isOpen ? "border-cyan-400/40" : "border-white/[0.07] hover:border-white/15"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-white font-semibold text-[15.5px]">{q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-300 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={2}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-gray-400 text-[14px] leading-[1.75]">
                          {a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

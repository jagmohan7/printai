"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import {
  MessagesSquare, Globe, Settings, Server, Brain,
  ArrowRight, Check, Database,
} from "lucide-react";
import type { SanityServices, SanityServiceCard } from "@/lib/sanity.types";

const ICON_MAP: Record<string, React.ElementType> = {
  MessagesSquare, Globe, Settings, Server, Brain, Database,
};
const ICON_BY_TITLE: Record<string, React.ElementType> = {
  "AI Chatbot":               MessagesSquare,
  "Web-to-Print Platform":    Globe,
  "Web To Print":             Globe,
  "Workflow Automation":      Settings,
  "Print Workflow Automation": Settings,
  DevOps:                     Server,
  "Custom AI Development":    Brain,
};

const DEFAULTS: { badge: string; heading: string; subtext: string; cards: SanityServiceCard[] } = {
  badge:   "Our Solutions",
  heading: "AI-Powered Solutions For Print Businesses",
  subtext: "Purpose-built products that automate customer support, online ordering, quoting, and print workflows.",
  cards: [
    {
      iconName: "MessagesSquare",
      title: "AI Chatbot",
      href: "/products/chatbots",
      description: "AI-powered chatbots trained on your print shop's pricing, turnaround times, and file specs — handle enquiries instantly, 24/7.",
      features: ["Instant Quote Responses", "24/7 Customer Support", "Seamless Team Handoff"],
    },
    {
      iconName: "Globe",
      title: "Web-to-Print Platform",
      href: "/products/web-to-print",
      description: "Seamless online ordering systems with B2B ecommerce, product configurators, and marketplace integrations.",
      features: ["B2B Store Setup", "Product Configurator", "Marketplace Integrations"],
    },
    {
      iconName: "Settings",
      title: "Print Workflow Automation",
      href: "/services/automation",
      description: "Automate order intake, prepress, scheduling, and fulfillment with systems built for real print operations.",
      features: ["Order Intake Automation", "Job Scheduling", "Fulfillment Tracking"],
    },
    {
      iconName: "Server",
      title: "DevOps",
      href: "/products/devops",
      description: "Keep your print systems fast, stable, and secure under heavy file uploads, traffic spikes, and complex workflows.",
      features: ["Scalable Infrastructure", "24/7 Monitoring", "Security Hardening"],
    },
    {
      iconName: "Brain",
      title: "Custom AI Development",
      href: "/products/custom-ai",
      description: "Bespoke AI systems designed around your specific print workflows — from predictive analytics to intelligent automation.",
      features: ["Tailored AI Models", "Predictive Analytics", "Full Integration Support"],
    },
  ],
};

const SPRING = { type: "spring", stiffness: 300, damping: 28, mass: 0.9 } as const;

export default function SolutionsSection({ data }: { data?: SanityServices }) {
  const heading = data?.heading ?? DEFAULTS.heading;
  const subtext = data?.subtext ?? DEFAULTS.subtext;
  const cards   = (data?.cards?.length ? data.cards : DEFAULTS.cards)
    .filter((c) => !/erpnext/i.test(c.title));

  const [activeIdx, setActiveIdx] = useState(0);
  const [swiper, setSwiper]       = useState<SwiperType | null>(null);

  return (
    <section id="solutions" className="pa-band-surface section-pad px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="pa-eyebrow">Our Solutions</span>
          <h2 className="pa-ink-text mt-4 font-extrabold tracking-tight leading-[1.1] text-[2rem] sm:text-[2.4rem] lg:text-[2.6rem]">
            {heading}
          </h2>
          <p className="pa-soft mt-4 text-[16px] leading-[1.7]">{subtext}</p>
        </div>

        {/* Swiper */}
        <div className="solutions-swiper-wrap">
          <Swiper
            modules={[Keyboard, Autoplay]}
            onSwiper={setSwiper}
            onSlideChange={(s) => setActiveIdx(s.realIndex)}
            slidesPerView={1.12}
            centeredSlides
            spaceBetween={20}
            keyboard={{ enabled: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop
            breakpoints={{
              640:  { slidesPerView: 1.5,  spaceBetween: 24 },
              900:  { slidesPerView: 2.2,  spaceBetween: 24 },
              1100: { slidesPerView: 3,    spaceBetween: 28 },
            }}
            className="!overflow-visible"
          >
            {cards.map((card, i) => {
              const isActive = i === activeIdx;
              const Icon =
                (card.iconName ? ICON_MAP[card.iconName] : null) ??
                ICON_BY_TITLE[card.title] ??
                MessagesSquare;

              return (
                <SwiperSlide key={card.title} className="!h-auto py-3">
                  <motion.div
                    animate={{
                      scale:   isActive ? 1 : 0.92,
                      opacity: isActive ? 1 : 0.6,
                      y:       isActive ? 0 : 12,
                    }}
                    transition={SPRING}
                    onClick={() => { if (!isActive) swiper?.slideToLoop(i); }}
                    className="pa-card flex flex-col rounded-2xl h-full"
                    style={{
                      cursor: isActive ? "default" : "pointer",
                      padding: "28px",
                      minHeight: 380,
                      border: isActive
                        ? "1.5px solid var(--pa-teal)"
                        : "1px solid var(--pa-line)",
                      boxShadow: isActive
                        ? "0 0 0 4px rgba(19,192,122,0.08), 0 12px 40px -12px rgba(19,192,122,0.18), 0 4px 20px -4px rgba(0,0,0,0.06)"
                        : "0 2px 12px -4px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Icon */}
                    <span
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0"
                      style={{ background: "var(--pa-teal-soft)" }}
                    >
                      <Icon className="w-7 h-7" style={{ color: "var(--pa-teal-deep)" }} />
                    </span>

                    <h3 className="pa-ink-text font-bold text-[1.25rem] mb-3">{card.title}</h3>
                    <p className="pa-soft text-[14.5px] leading-[1.65] mb-5 flex-1">
                      {card.description}
                    </p>

                    <ul className="space-y-2.5 mb-7">
                      {(card.features ?? []).map((f) => (
                        <li key={f} className="flex items-center gap-2.5 pa-soft text-[13.5px]">
                          <span className="font-extrabold text-[13px]"
                            style={{ color: "var(--pa-teal-deep)" }}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 420 }}>
                      <Link
                        href={card.href}
                        className="inline-flex items-center gap-1.5 font-semibold text-[14px]"
                        style={{ color: "var(--pa-teal-deep)" }}
                      >
                        Learn More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <style>{`
        .solutions-swiper-wrap .swiper-slide { height: auto; }
      `}</style>
    </section>
  );
}

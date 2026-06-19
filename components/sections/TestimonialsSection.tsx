"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import MotionInView from "@/components/MotionInView";
import type { SanityTestimonials } from "@/lib/sanity.types";

const DEFAULTS = {
  eyebrow: "Testimonials",
  heading: "Loved by print businesses",
  rating:  { score: "4.8", count: "320+" },
  reviews: [
    { quote: "PrintAI's chatbot now answers most of our quote requests before we even open the inbox. Our turnaround on enquiries dropped from hours to minutes.", authorName: "Sarah Mitchell", authorRole: "Owner, Apex Press" },
    { quote: "The web-to-print store paid for itself in the first month. Reorders that used to be emails are now one-click — our regulars love it.", authorName: "David Chen", authorRole: "Director, ChenPrint" },
    { quote: "Jobs route themselves from order to production now. We scaled volume 40% without adding a single admin hire.", authorName: "Maria Lopez", authorRole: "Ops Lead, FastForm Labels" },
  ],
};

function GoogleG({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="flex-shrink-0">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

function Stars() {
  return <span className="text-[#FBBC04] text-[14px] tracking-[1.5px] leading-none">★★★★★</span>;
}

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function ReviewCard({ r }: { r: { quote: string; authorName: string; authorRole?: string } }) {
  return (
    <div className="pa-card rounded-2xl p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <GoogleG size={20} />
        <Stars />
      </div>
      <p className="pa-ink-text text-[14.5px] leading-[1.7] flex-1">"{r.quote}"</p>
      <div className="flex items-center gap-3 mt-5 pt-5 border-t" style={{ borderColor: "var(--pa-line)" }}>
        <span
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0"
          style={{ background: "var(--pa-teal-soft)", color: "var(--pa-teal-deep)" }}
        >
          {initials(r.authorName)}
        </span>
        <div>
          <div className="pa-ink-text font-semibold text-[14px] leading-tight">{r.authorName}</div>
          {r.authorRole && <div className="pa-soft text-[12.5px]">{r.authorRole}</div>}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection({ data }: { data?: SanityTestimonials }) {
  const eyebrow = data?.eyebrow || DEFAULTS.eyebrow;
  const heading = data?.heading || DEFAULTS.heading;
  const rating  = data?.rating  ?? DEFAULTS.rating;
  const reviews = (data?.reviews?.length ? data.reviews : null) ?? DEFAULTS.reviews;

  const [activeIdx, setActiveIdx] = useState(0);
  const useSlider = reviews.length > 3;

  return (
    <section id="testimonials" className="pa-band-page section-pad px-6">
      <div className="max-w-[1200px] mx-auto">

        {/* Header row */}
        <MotionInView className="flex items-center justify-between gap-6 flex-wrap mb-10 lg:mb-12">
          <div>
            <span className="pa-eyebrow">{eyebrow}</span>
            <h2 className="pa-ink-text mt-4 font-extrabold tracking-tight leading-[1.12]
                           text-[1.9rem] sm:text-[2.3rem] lg:text-[2.4rem]">
              {heading}
            </h2>
          </div>
          {/* Aggregate Google score */}
          <div className="pa-card rounded-2xl px-5 py-4 flex items-center gap-4">
            <GoogleG size={32} />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5">
                <span className="pa-ink-text font-extrabold text-[24px] leading-none">{rating.score}</span>
                <Stars />
              </div>
              <span className="pa-mono pa-soft text-[11px] uppercase tracking-wider">
                Based on {rating.count} Google reviews
              </span>
            </div>
          </div>
        </MotionInView>

        {/* ── Static 3-col grid (≤ 3 reviews) ─────────────────────────────── */}
        {!useSlider && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <MotionInView key={`${r.authorName}-${i}`} delay={i * 0.1}>
                <ReviewCard r={r} />
              </MotionInView>
            ))}
          </div>
        )}

        {/* ── Swiper slider (4+ reviews — same pattern as Solutions) ────────── */}
        {useSlider && (
          <div className="testimonials-swiper-wrap">
            <Swiper
              modules={[Autoplay, Keyboard]}
              onSlideChange={(s) => setActiveIdx(s.realIndex)}
              slidesPerView={1.12}
              centeredSlides
              spaceBetween={20}
              keyboard={{ enabled: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop
              breakpoints={{
                640:  { slidesPerView: 1.5,  spaceBetween: 24 },
                900:  { slidesPerView: 2.2,  spaceBetween: 24 },
                1100: { slidesPerView: 3,    spaceBetween: 28 },
              }}
              className="!overflow-visible"
            >
              {reviews.map((r, i) => (
                <SwiperSlide key={`${r.authorName}-${i}`} className="!h-auto py-2">
                  <ReviewCard r={r} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Pill dots */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {reviews.map((_, i) => (
                <div
                  key={i}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width:      i === activeIdx ? 28 : 8,
                    background: i === activeIdx ? "var(--pa-teal)" : "var(--pa-line)",
                  }}
                />
              ))}
            </div>

            <style>{`.testimonials-swiper-wrap .swiper-slide { height: auto; }`}</style>
          </div>
        )}
      </div>
    </section>
  );
}

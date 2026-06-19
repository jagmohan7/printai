"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import type { SanityBlogs, SanityBlogPost } from "@/lib/sanity.types";

// ── Fallback content (used when no Resources posts are available) ─────────────
const DEFAULTS = {
  eyebrow:     "From the Blog",
  heading:     "Insights for modern print businesses",
  viewAllText: "View all articles",
  viewAllHref: "/resources",
  posts: [
    { title: "How AI cuts print quote time by 85%",        category: "Automation", excerpt: "Quoting is the slowest step in most print shops. Here's how AI collapses it to seconds.", href: "/resources", meta: "" },
    { title: "How Apex Press scaled to 300% revenue",      category: "Case Study", excerpt: "A mid-size commercial printer rebuilt its order flow around automation — and tripled output.", href: "/case-studies", meta: "" },
    { title: "Launch a web-to-print storefront in a week", category: "Guide",      excerpt: "A step-by-step playbook for getting a branded ordering portal live, fast.", href: "/resources", meta: "" },
  ] as SanityBlogPost[],
};

// Deterministic accent per card so thumbnails differ without images.
const THUMB_GRADIENTS = [
  "linear-gradient(135deg, #0B1628 0%, #15324C 55%, #0F6E56 100%)",
  "linear-gradient(135deg, #0F6E56 0%, #13C07A 100%)",
  "linear-gradient(135deg, #15324C 0%, #13C07A 120%)",
];

export default function BlogsSection({ data }: { data?: SanityBlogs }) {
  const eyebrow     = data?.eyebrow     || DEFAULTS.eyebrow;
  const heading     = data?.heading     || DEFAULTS.heading;
  const viewAllText = data?.viewAllText || DEFAULTS.viewAllText;
  const viewAllHref = data?.viewAllHref || DEFAULTS.viewAllHref;
  const posts       = (data?.posts?.length ? data.posts : null) ?? DEFAULTS.posts;

  return (
    <section id="blog" className="pa-band-surface section-pad px-6">
      <div className="max-w-[1200px] mx-auto">
        <MotionInView className="flex items-end justify-between gap-6 flex-wrap mb-10 lg:mb-12">
          <div>
            <span className="pa-eyebrow">{eyebrow}</span>
            <h2 className="pa-ink-text mt-4 font-extrabold tracking-tight leading-[1.12] text-[1.9rem] sm:text-[2.3rem] lg:text-[2.4rem]">
              {heading}
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="pa-btn-ghost inline-flex items-center gap-2 px-5 h-[44px] rounded-xl font-semibold text-[14px] whitespace-nowrap"
          >
            {viewAllText} <ArrowRight className="w-4 h-4" />
          </Link>
        </MotionInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, i) => (
            <MotionInView key={`${post.title}-${i}`} delay={i * 0.12}>
              <Link href={post.href || "/resources"} className="pa-card pa-card-hover group rounded-2xl overflow-hidden flex flex-col h-full">
                {/* thumbnail */}
                <div className="relative h-[170px]" style={{ background: THUMB_GRADIENTS[i % THUMB_GRADIENTS.length] }}>
                  <span className="absolute inset-0 opacity-[0.12]" style={{ background: "radial-gradient(60% 60% at 70% 30%, #fff, transparent 70%)" }} />
                  {post.category && (
                    <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold text-white" style={{ background: "rgba(255,255,255,0.16)", backdropFilter: "blur(4px)" }}>
                      {post.category}
                    </span>
                  )}
                </div>
                {/* body */}
                <div className="p-5 flex flex-col flex-1">
                  {post.meta && <span className="pa-mono pa-soft text-[11px] mb-2">{post.meta}</span>}
                  <h3 className="pa-ink-text font-bold text-[18px] leading-[1.25] mb-2">{post.title}</h3>
                  {post.excerpt && <p className="pa-soft text-[13.5px] leading-[1.6] line-clamp-2">{post.excerpt}</p>}
                  <span className="mt-auto pt-4 inline-flex items-center gap-1.5 font-semibold text-[13.5px] group-hover:gap-2.5 transition-all" style={{ color: "var(--pa-teal-deep)" }}>
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}

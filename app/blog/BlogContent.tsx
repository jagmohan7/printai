"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight, ExternalLink, TrendingUp } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";

interface ResourceItem {
  icon?: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  external?: boolean;
  category: string;
}

const CARD_GRADIENTS = [
  "from-violet-700/70 to-indigo-950",
  "from-cyan-700/70 to-blue-950",
  "from-emerald-700/70 to-teal-950",
  "from-pink-700/70 to-purple-950",
  "from-orange-700/70 to-amber-950",
  "from-blue-700/70 to-violet-950",
];

const CATEGORY_BADGE: Record<string, string> = {
  "Guides":              "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "Industry Insights":   "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "Documentation":       "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};
const DEFAULT_BADGE = "bg-white/10 text-white/70 border-white/20";

const INITIAL_COUNT = 6;
const LOAD_MORE_STEP = 3;

export default function BlogContent({
  heroHeading,
  heroDescription,
  guidesLabel,
  insightsLabel,
  docsLabel,
  guides,
  insights,
  docs,
}: {
  heroHeading: string;
  heroDescription: string;
  guidesLabel: string;
  insightsLabel: string;
  docsLabel: string;
  guides: Omit<ResourceItem, "category">[];
  insights: Omit<ResourceItem, "category">[];
  docs: Omit<ResourceItem, "category">[];
}) {
  const allPosts: ResourceItem[] = useMemo(() => [
    ...guides.map(g => ({ ...g, category: guidesLabel })),
    ...insights.map(i => ({ ...i, category: insightsLabel })),
    ...docs.map(d => ({ ...d, category: docsLabel })),
  ], [guides, insights, docs, guidesLabel, insightsLabel, docsLabel]);

  const categories = ["All", ...Array.from(new Set(allPosts.map(p => p.category)))];
  const trending   = allPosts.slice(0, 3);

  const [search,  setSearch]  = useState("");
  const [active,  setActive]  = useState("All");
  const [visible, setVisible] = useState(INITIAL_COUNT);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allPosts.filter(p =>
      (active === "All" || p.category === active) &&
      (!q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    );
  }, [allPosts, active, search]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <main className="min-h-screen bg-[#0a0b14]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-violet-600/6 blur-[150px]" />
      </div>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <MotionInView>
            <div className="flex items-center justify-center gap-2 text-[13px] text-[#9ca3af] mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <span className="text-white">Blog</span>
            </div>
            <h1 className="text-[3rem] sm:text-[4rem] font-extrabold tracking-tight leading-[1.05] text-white mb-4">
              {heroHeading}
            </h1>
            <p className="text-[#9ca3af] text-[16px] leading-[1.8] max-w-xl mx-auto mb-8">{heroDescription}</p>
          </MotionInView>

          {/* Search bar */}
          <MotionInView delay={0.15}>
            <div className="relative max-w-lg mx-auto">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={e => { setSearch(e.target.value); setVisible(INITIAL_COUNT); }}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white placeholder-[#6b7280] text-[14px] focus:outline-none focus:border-[#7c3aed]/60 focus:ring-2 focus:ring-[#7c3aed]/20 transition-all"
              />
            </div>
          </MotionInView>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white font-extrabold text-[1.6rem] mb-5">
            Latest <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">Posts</span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActive(cat); setVisible(INITIAL_COUNT); }}
                className={`px-5 py-2 rounded-full text-[13px] font-semibold border transition-all duration-200 ${
                  active === cat
                    ? "bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white border-transparent shadow-[0_0_20px_rgba(124,58,237,0.35)]"
                    : "bg-white/[0.04] text-[#9ca3af] border-white/[0.08] hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── POSTS GRID ── */}
      <section className="px-4 pb-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((post, i) => {
            const Icon = getIcon(post.icon);
            const gradient = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
            const badgeColor = CATEGORY_BADGE[post.category] ?? DEFAULT_BADGE;

            return (
              <MotionInView key={`${active}-${search}-${i}`} delay={0.06 * (i % 3)}>
                <div className="group h-full flex flex-col rounded-2xl border border-white/[0.07] bg-[#12131f] overflow-hidden hover:border-white/[0.14] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.45)] transition-all duration-300">

                  {/* Thumbnail */}
                  <div className={`relative h-[175px] bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.06)_0%,transparent_65%)]" />
                    <Icon size={52} className="text-white/25" strokeWidth={1.1} />
                    <span className={`absolute top-3 right-3 text-[11px] font-semibold px-3 py-1 rounded-full border backdrop-blur-sm ${badgeColor}`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-white font-bold text-[15px] leading-snug mb-3">{post.title}</h3>
                    <p className="text-[#9ca3af] text-[13px] leading-[1.75] flex-1">{post.description}</p>
                    {post.external ? (
                      <a
                        href={post.ctaHref || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-1.5 text-[#a78bfa] text-[13px] font-semibold hover:text-[#22d3ee] transition-colors"
                      >
                        {post.ctaText || "View Resource"} <ExternalLink size={12} />
                      </a>
                    ) : (
                      <Link
                        href={post.ctaHref || "/#contact"}
                        className="mt-5 inline-flex items-center gap-1.5 text-[#a78bfa] text-[13px] font-semibold hover:text-[#22d3ee] transition-colors group/link"
                      >
                        {post.ctaText || "Learn More"}
                        <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </MotionInView>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[#9ca3af] text-[15px] py-20">No posts match your search.</p>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisible(v => v + LOAD_MORE_STEP)}
              className="px-8 py-3 rounded-xl border border-white/[0.12] text-[14px] font-semibold text-[#9ca3af] hover:text-white hover:border-white/25 hover:bg-white/[0.04] transition-all duration-200"
              suppressHydrationWarning
            >
              Load More
            </button>
          </div>
        )}
      </section>

      {/* ── TOP TRENDING ── */}
      {trending.length > 0 && (
        <section className="px-4 py-16 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <MotionInView>
              <div className="flex items-center gap-2.5 mb-8">
                <TrendingUp size={20} className="text-[#a78bfa]" strokeWidth={1.8} />
                <h2 className="text-white font-extrabold text-[1.5rem]">
                  Top Trending Posts :{" "}
                  <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">
                    Editor&apos;s Picks
                  </span>
                </h2>
              </div>
            </MotionInView>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {trending.map((post, i) => {
                const Icon = getIcon(post.icon);
                const gradient = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
                const badgeColor = CATEGORY_BADGE[post.category] ?? DEFAULT_BADGE;

                return (
                  <MotionInView key={i} delay={0.08 * i}>
                    <div className="group rounded-2xl border border-white/[0.07] bg-[#12131f] overflow-hidden hover:border-white/[0.14] hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,0,0,0.4)] transition-all duration-300">
                      <div className={`relative h-[140px] bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
                        <Icon size={42} className="text-white/25" strokeWidth={1.1} />
                        <span className={`absolute top-2.5 right-2.5 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border backdrop-blur-sm ${badgeColor}`}>
                          {post.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="text-white font-bold text-[14px] leading-snug line-clamp-2">{post.title}</h3>
                        <Link
                          href={post.ctaHref || "/#contact"}
                          className="mt-3 inline-flex items-center gap-1 text-[#a78bfa] text-[12px] font-semibold hover:text-[#22d3ee] transition-colors group/link"
                        >
                          {post.ctaText || "Learn More"}
                          <ArrowRight size={11} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </MotionInView>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

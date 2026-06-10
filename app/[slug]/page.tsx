import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBlocks from "@/components/PageBlocks";
import CustomSchema from "@/components/CustomSchema";
import { getFlexPage, getAllFlexPageSlugs } from "@/lib/sanity.queries";
import { buildProductMetadata } from "@/lib/page-metadata";

/**
 * Catch-all route for CMS-built Flexible Pages (terms, pricing, privacy, etc.).
 *
 * Specific routes (/products, /services, /case-studies, /resources, /admin, /api)
 * take priority — Next.js matches static segments before this dynamic one.
 * This only handles single-segment slugs that don't match a real route.
 *
 * New pages render on-demand (dynamicParams) — no redeploy needed to add one.
 */

export const revalidate = 60;

// Pre-render known pages at build; new ones render on first request.
export async function generateStaticParams() {
  const slugs = await getAllFlexPageSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getFlexPage(slug);
  if (!page) return {};
  return buildProductMetadata({
    cmsTitle:      page?.seo?.title,
    cmsDesc:       page?.seo?.description,
    fallbackTitle: page?.title || "PrintAI",
    fallbackDesc:  "PrintAI — AI automation for printing businesses.",
    path:          `/${slug}`,
  });
}

export default async function FlexPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getFlexPage(slug);

  if (!page) notFound();

  return (
    <main className="min-h-screen bg-[#0a0b14]">
      <CustomSchema raw={page?.seo?.customSchema} />
      <PageBlocks sections={page.sections} />
    </main>
  );
}

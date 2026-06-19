import type { Metadata } from "next"
import { getAboutPage } from "@/lib/sanity.queries"
import { buildProductMetadata } from "@/lib/page-metadata"
import AboutContent from "./AboutContent"

export const revalidate = 5

const TITLE       = "About PrintAI — AI & Automation for the Print Industry"
const DESCRIPTION = "Learn how PrintAI helps print businesses automate customer support, streamline operations, and grow with AI-powered systems built specifically for print."
const PATH        = "/about"

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getAboutPage()
  return buildProductMetadata({
    cmsTitle:      cms?.seo?.title,
    cmsDesc:       cms?.seo?.description,
    fallbackTitle: TITLE,
    fallbackDesc:  DESCRIPTION,
    path:          PATH,
  })
}

export default async function AboutPage() {
  const data = await getAboutPage()
  return <AboutContent data={data} />
}

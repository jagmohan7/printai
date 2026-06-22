import type { Metadata } from "next"
import { getAboutPage } from "@/lib/sanity.queries"
import { buildProductMetadata } from "@/lib/page-metadata"
import AboutContent from "./AboutContent"

export const revalidate = 5

const TITLE       = "About PrintOpsAI — AI Print Automation Company | USA & Canada"
const DESCRIPTION = "PrintOpsAI is a USA and Canada-based AI automation platform built exclusively for print businesses. Learn about our team, our story, and why 250+ print shops trust us to automate their operations."
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

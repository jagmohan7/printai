import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import { getSiteSettings } from "@/lib/sanity.queries";
import { SanityLive } from "@/lib/sanity.live";

// Re-fetch site settings (navbar/footer) every 5 seconds
export const revalidate = 5;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://printai.cloud";
const SITE_NAME = "PrintAI";
const SITE_TITLE = "PrintAI – AI-Powered Automation for Printing Businesses";
const SITE_DESCRIPTION =
  "PrintAI delivers intelligent chatbots, ERPNext integration, and end-to-end print workflow automation that captures more leads, reduces touch-time, and scales operations.";
const OG_IMAGE = "/logo.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | PrintAI",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "AI automation for print",
    "print shop chatbot",
    "ERPNext for printing",
    "print workflow automation",
    "prepress automation",
    "web-to-print",
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
    shortcut: "/favicon.png",
  },
  verification: {
    google: "gOPlEY7PKlhVylDHfTVSiMNIZbOIpiAlE_S2iNkbn5Y",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "PrintAI – AI Automation for Print Shops" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
    site: "@printai",
    creator: "@printai",
  },
  category: "technology",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: "PrintAI",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  sameAs: [
    "https://www.linkedin.com/company/printai",
    "https://twitter.com/printai",
    "https://www.facebook.com/printai",
    "https://www.instagram.com/printai",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "hello@printai.cloud",
      contactType: "sales",
      availableLanguage: ["English"],
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const { isEnabled: isDraftMode } = await draftMode();
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} data-scroll-behavior="smooth">
      <head>
        {/* Organization + WebSite JSON-LD (global) */}
        <Script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* GTM (head) */}
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}

        {/* GA4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}', { anonymize_ip: true });`}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {/* GTM noscript (body) */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}

        <SiteShell navData={settings?.navbar} footerData={settings?.footer}>
          {children}
        </SiteShell>

        {/* ── Visual Editing (Sanity Presentation Tool) ────────────────────
            Only rendered when draft mode is on (i.e. when an editor opens
            the Presentation tool). Injects the click-to-edit overlay that
            maps stega-encoded content back to Sanity document fields.       */}
        {isDraftMode && <VisualEditing />}

        {/* ── Sanity Live ─────────────────────────────────────────────────
            Always rendered. Subscribes to Sanity's live API so any page that
            uses sanityFetch() auto-revalidates the moment a document changes
            in the studio. Works in published mode too — published pages
            still revalidate, just without the editing overlay.              */}
        <SanityLive />
      </body>
    </html>
  );
}

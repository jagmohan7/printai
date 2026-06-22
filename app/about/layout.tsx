import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About PrintOpsAI — AI & Automation for Print Businesses',
  description:
    'PrintOpsAI builds AI-powered automation platforms for print businesses. Learn our story, mission, and the team behind the platform.',
  alternates: { canonical: '/about' },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Font Awesome Free 6.5.1 — icons used across About page sections */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      {children}
    </>
  )
}

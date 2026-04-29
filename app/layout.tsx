import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PrintAI – AI-Powered Automation for Printing Businesses",
  description:
    "PrintAI provides intelligent chatbots, ERPNext integration, and cutting-edge automation solutions that reduce time wastage and optimize decision making for printing businesses.",
  metadataBase: new URL("https://printai.cloud"),
  openGraph: {
    title: "PrintAI – AI-Powered Automation for Printing Businesses",
    description:
      "Revolutionize your printing operations with intelligent chatbots, seamless ERPNext integration, and cutting-edge automation.",
    url: "https://printai.cloud",
    siteName: "PrintAI",
    type: "website",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "PrintAI Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PrintAI – AI-Powered Automation for Printing Businesses",
    description:
      "Revolutionize your printing operations with intelligent chatbots, seamless ERPNext integration, and cutting-edge automation.",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

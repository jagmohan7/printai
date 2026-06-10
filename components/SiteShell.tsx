"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { SanityNavbar, SanityFooter } from "@/lib/sanity.types";

export default function SiteShell({
  children,
  navData,
  footerData,
}: {
  children: React.ReactNode;
  navData?:    SanityNavbar;
  footerData?: SanityFooter;
}) {
  const pathname = usePathname();
  const isAdmin  = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar data={navData} />}
      <main className="flex-1">{children}</main>
      {!isAdmin && <Footer data={footerData} />}
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b14] min-h-[80vh] flex items-center justify-center px-4 py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-violet-600/15 blur-[140px]" />

      <div className="relative z-10 text-center max-w-2xl">
        <p className="text-[8rem] sm:text-[10rem] font-extrabold leading-none tracking-tight bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          404
        </p>
        <h1 className="mt-2 text-[1.8rem] sm:text-[2.4rem] font-extrabold tracking-tight text-white leading-tight">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-4 text-gray-400 text-[16px] leading-[1.7] max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Try
          one of the links below to keep exploring.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-7 py-[13px] rounded-xl font-semibold text-[14.5px] text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_28px_rgba(124,58,237,0.4)]"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2.5 px-7 py-[13px] rounded-xl font-semibold text-[14.5px] text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

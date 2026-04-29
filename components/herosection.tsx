"use client";
import Link from "next/link";

export default function HeroSection() {
  const socials = [
    {
      label: "LinkedIn",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "Twitter",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0b14] px-4"
    >
      {/* Background glow blobs — matching screenshot purple-left, teal-right */}
      <div className="pointer-events-none absolute left-[-8%] top-[20%] w-[550px] h-[550px] rounded-full bg-[#5b21b6]/25 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-4%] top-[30%] w-[420px] h-[420px] rounded-full bg-[#0f766e]/20 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 bottom-[10%] -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#3b0764]/20 blur-[100px]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[800px] mx-auto">

        {/* Badge pill */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-[9px] rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm">
          <span className="text-yellow-400 text-[13px] leading-none">⚡</span>
          <span className="text-[13px] text-gray-300 font-medium tracking-wide">
            Leading AI Automation in Printing Industry
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-extrabold text-white leading-[1.12] tracking-tight mb-6 text-[2.6rem] sm:text-[3.2rem] lg:text-[3.75rem]">
          Transform Your{" "}
          <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            Printing
          </span>
          <br />
          <span className="bg-gradient-to-br from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Business
          </span>{" "}
          with AI-Powered
          <br />
          Automation
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-[16.5px] sm:text-[17.5px] leading-[1.8] max-w-[580px] mb-10">
          Revolutionize your operations with intelligent chatbots, seamless ERPNext
          integration, and cutting-edge automation solutions that reduce time
          wastage and optimize decision making.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 mb-12 flex-wrap justify-center">
          {/* Primary */}
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2.5 px-7 py-[13px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_28px_rgba(124,58,237,0.45)]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Get Started
          </Link>

          {/* Secondary */}
          <Link
            href="/#services"
            className="inline-flex items-center gap-2.5 px-7 py-[13px] rounded-xl font-semibold text-[15px] text-white border border-white/20 bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 backdrop-blur-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
            </svg>
            Explore Solutions
          </Link>
        </div>

        {/* Social row */}
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-[13.5px] mr-1">Follow us:</span>
          {socials.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-9 h-9 rounded-full border border-white/[0.14] bg-white/[0.04] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/[0.09] transition-all duration-200"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll to explore */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-600">
        <span className="text-[11px] tracking-[0.15em] uppercase font-medium">
          Scroll to explore
        </span>
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          className="animate-bounce"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
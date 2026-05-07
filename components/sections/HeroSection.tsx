"use client";
import Link from "next/link";

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const headingCls = "fu-2 font-extrabold text-white tracking-tight leading-[1.1] mb-6 text-[2.2rem] sm:text-[2.8rem] md:text-[3.4rem] lg:text-[3.75rem]";
const primaryBtnCls = "inline-flex items-center gap-2.5 px-7 py-[13px] rounded-2xl font-semibold text-[14.5px] text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_30px_rgba(124,58,237,0.5)]";
const secondaryBtnCls = "inline-flex items-center gap-2.5 px-7 py-[13px] rounded-2xl font-semibold text-[14.5px] text-white border border-white/20 bg-white/[0.05] hover:bg-white/[0.09] hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 backdrop-blur-sm";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0b14] px-4">
      <style>{`
        @keyframes float-blob {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-20px) scale(1.03); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-arrow {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(7px); }
        }
        @keyframes scroll-pulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.75; }
        }
        .blob-1 { animation: float-blob 8s ease-in-out infinite; }
        .blob-2 { animation: float-blob 10s ease-in-out infinite 1.5s; }
        .fu-1 { animation: fade-up 0.65s ease both 0.15s; opacity: 0; }
        .fu-2 { animation: fade-up 0.65s ease both 0.3s;  opacity: 0; }
        .fu-3 { animation: fade-up 0.65s ease both 0.45s; opacity: 0; }
        .fu-4 { animation: fade-up 0.65s ease both 0.6s;  opacity: 0; }
        .fu-5 { animation: fade-up 0.65s ease both 0.75s; opacity: 0; }
        .arrow-float { animation: float-arrow 2s ease-in-out infinite; }
        .scroll-label { animation: scroll-pulse 2.5s ease-in-out infinite; }
        .social-icon { transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease; }
        .social-icon:hover { background: linear-gradient(135deg, #7c3aed, #06b6d4) !important; border-color: transparent !important; color: #fff !important; }
        .social-icon:hover svg { color: #fff; stroke: #fff; }
      `}</style>

      {/* Glow blobs */}
      <div className="blob-1 pointer-events-none absolute left-[-6%] top-[15%] w-[500px] h-[500px] rounded-full bg-[#5b21b6]/20 blur-[120px]" />
      <div className="blob-2 pointer-events-none absolute right-[-4%] top-[30%] w-[380px] h-[380px] rounded-full bg-[#0f766e]/20 blur-[110px]" />
      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[180px] rounded-full bg-[#3b0764]/15 blur-[90px]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[760px] mx-auto pt-[70px] pb-[100px]">

        {/* Badge */}
        <div className="fu-1 mb-7 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[#16172a]/90 backdrop-blur-sm">
          <span className="text-yellow-400 text-sm leading-none">⚡</span>
          <span className="text-[13px] text-gray-300 font-medium tracking-wide">Leading AI Automation in Printing Industry</span>
        </div>

        {/* Heading — className extracted to const to avoid multiline template literal hydration mismatch */}
        <h1 className={headingCls}>
          Transform Your{" "}
          <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Printing</span>
          <br />
          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Business</span>{" "}
          with AI-Powered
          <br />
          Automation
        </h1>

        {/* Subtitle */}
        <p className="fu-3 text-gray-400 text-[15px] sm:text-[16.5px] leading-[1.85] max-w-[560px] mb-9">
          Revolutionize your operations with intelligent chatbots, seamless ERPNext
          integration, and cutting-edge automation solutions that reduce time
          wastage and optimize decision making.
        </p>

        {/* Buttons — className extracted to const */}
        <div className="fu-4 flex items-center gap-4 mb-12 flex-wrap justify-center">
          <Link href="/#contact" className={primaryBtnCls}>
            {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.001 1.992c-5.524 0-8.914 3.457-10.001 6l3 1 1 3 6-4 6 4 1-3 3-1c-1.087-2.543-4.477-6-10-6zm0 4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM4.5 18l1.5-1.5-1.5-.75-.75 1.5.75.75zm15 0-.75-.75-1.5.75 1.5 1.5.75-.75z" />
            </svg> */}
            Get Started
          </Link>

          <Link href="/#services" className={secondaryBtnCls}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
            </svg>
            Explore Solutions
          </Link>
        </div>

        {/* Socials */}
        <div className="fu-5 flex items-center gap-3">
          <span className="text-gray-500 text-[13px] font-medium mr-1">Follow us:</span>
          {socials.map(({ label, href, icon }) => (
            <a key={label} href={href} aria-label={label} className="social-icon w-10 h-10 rounded-full border border-white/[0.15] bg-white/[0.05] flex items-center justify-center text-gray-400">
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll to explore */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none">
        <span className="scroll-label text-[10.5px] tracking-[0.2em] uppercase font-medium text-gray-500">Scroll to explore</span>
        <svg className="arrow-float text-gray-600" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
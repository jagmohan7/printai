"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home",         href: "/#home" },
  { label: "About",        href: "/#about" },
  { label: "Services",     href: "/#services", dropdown: true },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources",    href: "/resources" },
  { label: "Contact",      href: "/#contact" },
];

const serviceLinks = [
  { label: "Custom AI Chatbots",  href: "/services/chatbots" },
  { label: "Process Automation",  href: "/services/automation" },
  { label: "ERPNext Integration", href: "/services/erpnext" },
  { label: "Web-to-Print",        href: "/#services" },
];

export default function Navbar() {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [activeHash,   setActiveHash]   = useState("home");
  const dropdownRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Scroll spy — tracks which section is in view
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["home", "about", "services", "contact"];
    const onScroll = () => {
      const y = window.scrollY + 120;
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActiveHash(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const isActive = (href: string) => {
    const [path, hash] = href.split("#");
    if (path && path !== "/" && path !== "") return pathname.startsWith(path);
    if (pathname !== "/") return false;
    return hash ? activeHash === hash : false;
  };

  return (
    <>
      <style>{`
        .nav-item {
          position: relative;
          padding-bottom: 2px;
        }
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #818cf8, #a78bfa);
          border-radius: 2px;
          transition: width 0.25s ease;
        }
        .nav-item:hover::after,
        .nav-item.active::after {
          width: 100%;
        }
        .nav-item.active {
          color: #fff !important;
        }
        .nav-btn-item {
          position: relative;
          padding-bottom: 2px;
        }
        .nav-btn-item::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #818cf8, #a78bfa);
          border-radius: 2px;
          transition: width 0.25s ease;
        }
        .nav-btn-item:hover::after,
        .nav-btn-item.active::after {
          width: 100%;
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0b14]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.4)] border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[70px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
             <Image
  src="/logo.png"
  alt="PrintAI Logo"
  width={36}
  height={36}
  className="object-contain"
  priority
  unoptimized
/>
            </div>
            <span className="font-bold text-[20px] text-white tracking-tight">
              Print
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                AI
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map(({ label, href, dropdown }) =>
              dropdown ? (
                <li
                  key={label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    onClick={() => setDropdownOpen((p) => !p)}
                    aria-expanded={dropdownOpen}
                    className={`nav-btn-item flex items-center gap-1 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer border-0 bg-transparent ${
                      pathname.startsWith("/services")
                        ? "active text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-52 bg-[#12131f] border border-white/[0.08] rounded-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
                      {serviceLinks.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-[11px] text-[13.5px] text-white/55 hover:text-white hover:bg-white/[0.06] border-b border-white/5 last:border-0 transition-colors duration-150"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ) : (
                <li key={label}>
                  <Link
                    href={href}
                    className={`nav-item block py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive(href) ? "active text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors p-1.5 rounded-md"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed top-[70px] left-0 right-0 z-40 bg-[#0a0b14] border-t border-white/[0.06] px-4 pt-3 pb-5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
          {navLinks.map(({ label, href, dropdown }) =>
            dropdown ? (
              <div key={label}>
                <p className="px-3.5 pt-4 pb-1 text-[11px] uppercase tracking-widest font-semibold text-white/30">
                  Services
                </p>
                {serviceLinks.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setMobileOpen(false)}
                    className="block pl-6 pr-3.5 py-2.5 text-[13.5px] text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3.5 py-2.5 text-sm transition-colors duration-200 ${
                  isActive(href) ? "text-white font-medium" : "text-white/65 hover:text-white"
                }`}
              >
                {label}
              </Link>
            )
          )}
          {/* Keep Get Started only in mobile menu */}
          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 text-center px-5 py-3 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 transition-opacity duration-200"
          >
            Get Started
          </Link>
        </div>
      )}
    </>
  );
}
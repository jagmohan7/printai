"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { SanityNavbar } from "@/lib/sanity.types";

type DropdownKey = "products" | "services";

const navLinks: { label: string; href: string; dropdown?: DropdownKey }[] = [
  { label: "Home",         href: "/#home" },
  { label: "About",        href: "/#about" },
  { label: "Products",     href: "/#services", dropdown: "products" },
  { label: "Services",     href: "/#services", dropdown: "services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources",    href: "/resources" },
  { label: "Contact",      href: "/#contact" },
];

const DEFAULT_PRODUCT_LINKS = [
  { label: "AI Chatbot",            href: "/products/chatbots" },
  { label: "Web-to-Print Platform", href: "/products/web-to-print" },
  { label: "ERPNext",               href: "/products/erpnext" },
];

const DEFAULT_SERVICE_LINKS = [
  { label: "Print Workflow Automation", href: "/services/automation" },
  { label: "DevOps",                    href: "/services/devops" },
  { label: "Custom AI Development",     href: "/services/custom-ai" },
];

const DEFAULT_CTA = { text: "Get Started", href: "/#contact" };

export default function Navbar({ data }: { data?: SanityNavbar }) {
  const productLinks = data?.productLinks?.length ? data.productLinks : DEFAULT_PRODUCT_LINKS;
  const serviceLinks = data?.serviceLinks?.length ? data.serviceLinks : DEFAULT_SERVICE_LINKS;
  const ctaText      = data?.ctaText || DEFAULT_CTA.text;
  const ctaHref      = data?.ctaHref || DEFAULT_CTA.href;

  const dropdownLinks: Record<DropdownKey, typeof productLinks> = {
    products: productLinks,
    services: serviceLinks,
  };
  const [mounted,       setMounted]       = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [openDropdown,  setOpenDropdown]  = useState<DropdownKey | null>(null);
  const [scrolled,      setScrolled]      = useState(false);
  const [activeHash,    setActiveHash]    = useState("home");
  const productsRef = useRef<HTMLLIElement>(null);
  const servicesRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideProducts = productsRef.current?.contains(target);
      const insideServices = servicesRef.current?.contains(target);
      if (!insideProducts && !insideServices) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mounted]);

  useEffect(() => {
    if (!mounted || pathname !== "/") return;
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
  }, [mounted, pathname]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    const [path, hash] = href.split("#");
    if (path && path !== "/" && path !== "") return pathname.startsWith(path);
    if (pathname !== "/") return false;
    return hash ? activeHash === hash : false;
  };

  const getRef = (key: DropdownKey) =>
    key === "products" ? productsRef : servicesRef;

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
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="PrintAI Logo"
              width={36}
              height={36}
              className="object-contain flex-shrink-0"
              priority
            />
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
                  ref={getRef(dropdown)}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(dropdown)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() =>
                      setOpenDropdown((p) => (p === dropdown ? null : dropdown))
                    }
                    aria-expanded={openDropdown === dropdown}
                    className={`nav-btn-item flex items-center gap-1 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer border-0 bg-transparent ${
                      isActive(href)
                        ? "active text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === dropdown ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {openDropdown === dropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50">
                      <div className="w-52 bg-[#12131f] border border-white/[0.08] rounded-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
                        {dropdownLinks[dropdown].map((s, i) => (
                          <Link
                            key={`${s.label}-${i}`}
                            href={s.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-[11px] text-[13.5px] text-white/55 hover:text-white hover:bg-white/[0.06] border-b border-white/5 last:border-0 transition-colors duration-150"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
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
                  {label}
                </p>
                {dropdownLinks[dropdown].map((s, i) => (
                  <Link
                    key={`${s.label}-${i}`}
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
          {/* CTA — mobile only */}
          <Link
            href={ctaHref}
            onClick={() => setMobileOpen(false)}
            className="block mt-3 text-center px-5 py-3 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 transition-opacity duration-200"
          >
            {ctaText}
          </Link>
        </div>
      )}
    </>
  );
}

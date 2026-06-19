"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SanityNavbar } from "@/lib/sanity.types";

type DropdownKey = "products" | "services" | "resources";

// ── Top-level nav (labels hardcoded; dropdown items below are CMS-driven) ─────
const navLinks: { label: string; href: string; dropdown?: DropdownKey }[] = [
  { label: "Home",      href: "/#home" },
  { label: "About",     href: "/about" },
  { label: "Products",  href: "/products/chatbots",   dropdown: "products" },
  { label: "Services",  href: "/services/automation", dropdown: "services" },
  { label: "Resources", href: "/resources",           dropdown: "resources" },
];

// ── Dropdown fallbacks (used when Sanity has no data) ─────────────────────────
const DEFAULT_PRODUCT_LINKS = [
  { label: "AI Chatbot",   href: "/products/chatbots" },
  { label: "Web To Print", href: "/products/web-to-print" },
];

const DEFAULT_SERVICE_LINKS = [
  { label: "Print Workflow Automation", href: "/services/automation" },
  { label: "DevOps",                    href: "/services/devops" },
  { label: "Custom AI Development",     href: "/services/custom-ai" },
];

// Resources dropdown is not yet CMS-backed — hardcoded for now.
const RESOURCE_LINKS = [
  { label: "Blogs",        href: "/resources" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "FAQs",         href: "/#faq" },
];

const DEFAULT_CTA = { text: "Book Demo", href: "/#contact" };

export default function Navbar({ data }: { data?: SanityNavbar }) {
  const productLinks = data?.productLinks?.length ? data.productLinks : DEFAULT_PRODUCT_LINKS;
  const serviceLinks = data?.serviceLinks?.length ? data.serviceLinks : DEFAULT_SERVICE_LINKS;
  const ctaText      = data?.ctaText || DEFAULT_CTA.text;
  const ctaHref      = data?.ctaHref || DEFAULT_CTA.href;

  const dropdownLinks: Record<DropdownKey, { label: string; href: string }[]> = {
    products:  productLinks,
    services:  serviceLinks,
    resources: RESOURCE_LINKS,
  };

  const [mounted,      setMounted]      = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [mobileGroup,  setMobileGroup]  = useState<DropdownKey | null>(null);
  const [scrolled,     setScrolled]     = useState(false);
  const [activeHash,   setActiveHash]   = useState("home");
  const [dark,         setDark]         = useState(false);

  const productsRef  = useRef<HTMLLIElement>(null);
  const servicesRef  = useRef<HTMLLIElement>(null);
  const resourcesRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  const getRef = (key: DropdownKey) =>
    key === "products" ? productsRef : key === "services" ? servicesRef : resourcesRef;

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  // Light/dark theme — writes data-theme on <html> + persists. The no-flash
  // script in layout.tsx applies the saved value before paint.
  const toggleTheme = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("printai-theme", next); } catch {}
    setDark(!dark);
  };

  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  // Close any open dropdown when clicking outside all dropdown items.
  useEffect(() => {
    if (!mounted) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      const inside =
        productsRef.current?.contains(t) ||
        servicesRef.current?.contains(t) ||
        resourcesRef.current?.contains(t);
      if (!inside) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mounted]);

  // Scrollspy for the homepage hash sections.
  useEffect(() => {
    if (!mounted || pathname !== "/") return;
    const ids = ["home", "about", "contact"];
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

  // A dropdown reads active if the current route matches any of its children.
  const dropdownActive: Record<DropdownKey, boolean> = {
    products:  !!pathname?.startsWith("/products"),
    services:  !!pathname?.startsWith("/services"),
    resources: !!pathname && (pathname.startsWith("/resources") || pathname.startsWith("/case-studies")),
  };

  // Theme toggle icon: half-filled circle (◐) — left half filled.
  const ThemeIcon = (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" />
    </svg>
  );

  const Logo = (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
      <span
        className="relative w-[34px] h-[34px] rounded-[9px] flex-shrink-0"
        style={{ background: "linear-gradient(150deg,#13C07A,#0F6E56)", boxShadow: "0 4px 12px rgba(15,110,86,.35)" }}
      >
        <span className="absolute rounded-[3px]" style={{ inset: "9px 10px", background: "rgba(255,255,255,.92)" }} />
        <span className="absolute rounded-full" style={{ left: 13, top: 13, width: 8, height: 8, background: "#0F6E56" }} />
      </span>
      <span className="pa-word font-extrabold text-[20px] tracking-tight">
        Print<span style={{ color: "#13C07A" }}>AI</span>
      </span>
    </Link>
  );

  return (
    <>
      <style>{`
        :root {
          --pa-ink:#0B1628; --pa-ink2:#5A6675; --pa-line:#E3E7EC; --pa-card:#ffffff;
          /* Solid bar — pages behind are still dark, so translucent glass reads
             as muddy grey. Reintroduce glass once the light homepage lands. */
          --pa-bar:#ffffff; --pa-bar-scroll:#ffffff;
        }
        :root[data-theme="dark"] {
          --pa-ink:#EAF1F8; --pa-ink2:#9FB3C8; --pa-line:rgba(255,255,255,.12); --pa-card:#13243E;
          --pa-bar:#0B1628; --pa-bar-scroll:#0B1628;
        }

        .pa-bar {
          background: var(--pa-bar);
          border-bottom: 1px solid var(--pa-line);
          /* No backdrop-filter while pages behind are dark — a blur layer samples
             the dark page and tints the solid bar grey. Add it back with the
             light homepage if a frosted-glass look is wanted. */
          transition: background .3s, box-shadow .3s, border-color .3s;
        }
        .pa-bar.is-scrolled { background: var(--pa-bar-scroll); box-shadow: 0 2px 24px rgba(11,22,40,.10); }
        :root[data-theme="dark"] .pa-bar.is-scrolled { box-shadow: 0 2px 24px rgba(0,0,0,.5); }

        .pa-word { color: var(--pa-ink); }

        .pa-link { position: relative; color: var(--pa-ink2); transition: color .2s; background: transparent; border: 0; cursor: pointer; }
        .pa-link:hover, .pa-link.is-active { color: var(--pa-ink); }
        .pa-link::after { content:''; position:absolute; left:0; bottom:-6px; width:0; height:2px; background:#13C07A; border-radius:2px; transition:width .25s ease; }
        .pa-link:hover::after, .pa-link.is-active::after { width:100%; }

        .pa-toggle { color: var(--pa-ink2); border:1px solid var(--pa-line); background:transparent; transition: color .2s, border-color .2s; }
        .pa-toggle:hover { color: var(--pa-ink); border-color:#13C07A; }

        .pa-ghost { color: var(--pa-ink); border:1px solid var(--pa-line); background:transparent; transition: border-color .2s, color .2s; }
        .pa-ghost:hover { border-color:#13C07A; color:#0F6E56; }
        :root[data-theme="dark"] .pa-ghost:hover { color:#13C07A; }

        .pa-cta { color:#062A1E; background:#13C07A; box-shadow:0 6px 18px rgba(19,192,122,.30); transition: background .2s, color .2s, transform .2s; }
        .pa-cta:hover { background:#0F6E56; color:#fff; transform:translateY(-1px); }

        .pa-drop { background: var(--pa-card); border:1px solid var(--pa-line); box-shadow:0 16px 40px rgba(11,22,40,.14); }
        :root[data-theme="dark"] .pa-drop { box-shadow:0 16px 40px rgba(0,0,0,.5); }
        .pa-drop-item { color: var(--pa-ink2); transition: color .15s, background .15s; }
        .pa-drop-item:hover { color:#0F6E56; background: rgba(19,192,122,.10); }
        :root[data-theme="dark"] .pa-drop-item:hover { color:#13C07A; }

        .pa-mobile { background: var(--pa-card); border-top:1px solid var(--pa-line); box-shadow:0 8px 24px rgba(11,22,40,.12); }
        .pa-mlink { color: var(--pa-ink2); }
        .pa-mlink:hover, .pa-mlink.is-active { color: var(--pa-ink); }
        .pa-mhead { color: var(--pa-ink); background: transparent; border: 0; cursor: pointer; }
        .pa-burger { color: var(--pa-ink); }
        .pa-switch { background: var(--pa-line); }
        .pa-switch.on { background:#13C07A; }
        .pa-switch-knob { background:#fff; box-shadow:0 1px 3px rgba(0,0,0,.3); }
      `}</style>

      <header className={`pa-bar fixed top-0 left-0 right-0 z-50 ${scrolled ? "is-scrolled" : ""}`}>
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">

          {/* Logo (left) */}
          {Logo}

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
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
                    onClick={() => setOpenDropdown((p) => (p === dropdown ? null : dropdown))}
                    aria-expanded={openDropdown === dropdown}
                    className={`pa-link flex items-center gap-1 py-2 text-[14.5px] font-medium ${dropdownActive[dropdown] ? "is-active" : ""}`}
                  >
                    {label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === dropdown ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {openDropdown === dropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                      <div className="pa-drop min-w-[224px] rounded-2xl overflow-hidden p-1.5">
                        {dropdownLinks[dropdown].map((s, i) => (
                          <Link
                            key={`${s.label}-${i}`}
                            href={s.href}
                            onClick={() => setOpenDropdown(null)}
                            className="pa-drop-item block px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium"
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
                  <Link href={href} className={`pa-link block py-2 text-[14.5px] font-medium ${isActive(href) ? "is-active" : ""}`}>
                    {label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Right cluster (desktop): theme toggle · Contact · Book Demo */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="pa-toggle w-9 h-9 rounded-full flex items-center justify-center"
            >
              {ThemeIcon}
            </button>
            <Link href="/#contact" className="pa-ghost inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-[14px] font-semibold">
              Contact
            </Link>
            <Link href={ctaHref} className="pa-cta inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-[14px] font-semibold">
              {ctaText}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="pa-burger md:hidden p-1.5 rounded-md" onClick={() => setMobileOpen((p) => !p)} aria-label="Toggle menu">
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="pa-mobile md:hidden fixed top-[72px] left-0 right-0 z-40 px-4 pt-3 pb-5">
          {navLinks.map(({ label, href, dropdown }) =>
            dropdown ? (
              <div key={label}>
                <button
                  onClick={() => setMobileGroup((p) => (p === dropdown ? null : dropdown))}
                  aria-expanded={mobileGroup === dropdown}
                  className="pa-mhead w-full flex items-center justify-between px-3.5 py-3 text-[14px] font-medium"
                >
                  {label}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${mobileGroup === dropdown ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {mobileGroup === dropdown && (
                  <div className="pb-1">
                    {dropdownLinks[dropdown].map((s, i) => (
                      <Link
                        key={`${s.label}-${i}`}
                        href={s.href}
                        onClick={() => { setMobileOpen(false); setMobileGroup(null); }}
                        className="pa-mlink block pl-6 pr-3.5 py-2.5 text-[13.5px]"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`pa-mlink block px-3.5 py-3 text-[14px] ${isActive(href) ? "is-active font-semibold" : ""}`}
              >
                {label}
              </Link>
            )
          )}

          {/* Dark mode row */}
          <button
            onClick={toggleTheme}
            className="pa-mhead w-full flex items-center justify-between px-3.5 py-3 text-[14px] font-medium mt-1"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            Dark mode
            <span className={`pa-switch relative w-[38px] h-[22px] rounded-full transition-colors ${dark ? "on" : ""}`}>
              <span
                className="pa-switch-knob absolute top-[2px] w-[18px] h-[18px] rounded-full transition-transform"
                style={{ left: 2, transform: dark ? "translateX(16px)" : "translateX(0)" }}
              />
            </span>
          </button>

          {/* CTAs — mobile */}
          <Link
            href={ctaHref}
            onClick={() => setMobileOpen(false)}
            className="pa-cta block mt-3 text-center px-5 py-3 text-[14px] font-semibold rounded-xl"
          >
            {ctaText}
          </Link>
          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="pa-ghost block mt-2 text-center px-5 py-3 text-[14px] font-semibold rounded-xl"
          >
            Contact
          </Link>
        </div>
      )}
    </>
  );
}

"use client";
import { useState, useEffect, useRef } from "react";
import { CheckCircle, AlertCircle, Loader2, CalendarCheck, Search, ChevronDown } from "lucide-react";

type FormState = { success: boolean; message: string };

const COUNTRY_CODES = [
  { code: "+1",   flag: "🇺🇸", name: "US"  },
  { code: "+1",   flag: "🇨🇦", name: "CA"  },
  { code: "+44",  flag: "🇬🇧", name: "GB"  },
  { code: "+91",  flag: "🇮🇳", name: "IN"  },
  { code: "+61",  flag: "🇦🇺", name: "AU"  },
  { code: "+64",  flag: "🇳🇿", name: "NZ"  },
  { code: "+27",  flag: "🇿🇦", name: "ZA"  },
  { code: "+971", flag: "🇦🇪", name: "AE"  },
  { code: "+966", flag: "🇸🇦", name: "SA"  },
  { code: "+65",  flag: "🇸🇬", name: "SG"  },
  { code: "+60",  flag: "🇲🇾", name: "MY"  },
  { code: "+92",  flag: "🇵🇰", name: "PK"  },
  { code: "+880", flag: "🇧🇩", name: "BD"  },
  { code: "+94",  flag: "🇱🇰", name: "LK"  },
  { code: "+49",  flag: "🇩🇪", name: "DE"  },
  { code: "+33",  flag: "🇫🇷", name: "FR"  },
  { code: "+39",  flag: "🇮🇹", name: "IT"  },
  { code: "+34",  flag: "🇪🇸", name: "ES"  },
  { code: "+31",  flag: "🇳🇱", name: "NL"  },
  { code: "+41",  flag: "🇨🇭", name: "CH"  },
  { code: "+46",  flag: "🇸🇪", name: "SE"  },
  { code: "+47",  flag: "🇳🇴", name: "NO"  },
  { code: "+45",  flag: "🇩🇰", name: "DK"  },
  { code: "+48",  flag: "🇵🇱", name: "PL"  },
  { code: "+86",  flag: "🇨🇳", name: "CN"  },
  { code: "+81",  flag: "🇯🇵", name: "JP"  },
  { code: "+82",  flag: "🇰🇷", name: "KR"  },
  { code: "+55",  flag: "🇧🇷", name: "BR"  },
  { code: "+52",  flag: "🇲🇽", name: "MX"  },
  { code: "+234", flag: "🇳🇬", name: "NG"  },
  { code: "+254", flag: "🇰🇪", name: "KE"  },
  { code: "+20",  flag: "🇪🇬", name: "EG"  },
];

const inputBase =
  "peer w-full px-4 pt-5 pb-2 bg-[color:var(--pa-card)] border border-[color:var(--pa-line)] rounded-xl " +
  "text-[color:var(--pa-ink)] text-[14.5px] outline-none transition-all duration-200 placeholder-transparent " +
  "focus:border-[color:var(--pa-teal)] focus:ring-2 focus:ring-[rgba(103,61,230,0.14)] focus:shadow-[0_0_0_3px_rgba(103,61,230,0.08)]";

const labelBase =
  "pointer-events-none absolute left-4 text-[color:var(--pa-ink-2)] text-[14px] transition-all duration-200 " +
  "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[color:var(--pa-teal-deep)] " +
  "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 " +
  "peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-[color:var(--pa-ink-2)]";

function Field({
  name, label, type = "text", required, rows,
}: {
  name: string; label: string; type?: string; required?: boolean; rows?: number;
}) {
  const labelClass = `${labelBase} ${rows ? "top-5" : "top-1/2 -translate-y-1/2"}`;
  return (
    <div className="relative">
      {rows ? (
        <textarea
          id={name} name={name} rows={rows} required={required}
          placeholder={label} className={`${inputBase} resize-none`}
        />
      ) : (
        <input
          id={name} name={name} type={type} required={required}
          placeholder={label} className={inputBase}
        />
      )}
      <label htmlFor={name} className={labelClass}>
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
    </div>
  );
}

// ── Searchable country-code dropdown ─────────────────────────────────────────
function CountryCodePicker({
  value, onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen]       = useState(false);
  const [query, setQuery]     = useState("");
  const wrapRef               = useRef<HTMLDivElement>(null);
  const searchRef             = useRef<HTMLInputElement>(null);

  const selected = COUNTRY_CODES.find((c) => c.code === value) ?? COUNTRY_CODES[3];

  const filtered = query.trim()
    ? COUNTRY_CODES.filter(
        (c) =>
          c.code.includes(query) ||
          c.name.toLowerCase().includes(query.toLowerCase())
      )
    : COUNTRY_CODES;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus search when opened
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  return (
    <div ref={wrapRef} className="relative flex-shrink-0 w-[118px]">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => { setOpen((o) => !o); setQuery(""); }}
        className="w-full h-[54px] flex items-center justify-between gap-1.5 px-3 bg-[color:var(--pa-card)] border border-[color:var(--pa-line)] rounded-xl text-[14px] text-[color:var(--pa-ink)] transition-all outline-none focus:border-[color:var(--pa-teal)] focus:ring-2 focus:ring-[rgba(103,61,230,0.14)]"
        style={{ borderColor: open ? "var(--pa-teal)" : undefined }}
      >
        <span className="flex items-center gap-1.5 truncate">
          <span className="text-[18px] leading-none">{selected.flag}</span>
          <span className="font-medium">{selected.code}</span>
        </span>
        <ChevronDown
          className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200"
          style={{ color: "var(--pa-ink-2)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute z-50 top-[58px] left-0 w-[220px] rounded-xl overflow-hidden"
          style={{
            background: "var(--pa-card)",
            border: "1px solid var(--pa-line)",
            boxShadow: "0 12px 32px -8px rgba(11,22,40,0.15)",
          }}
        >
          {/* Search input */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b" style={{ borderColor: "var(--pa-line)" }}>
            <Search className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--pa-ink-2)" }} />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search code or country…"
              className="flex-1 text-[13px] outline-none bg-transparent"
              style={{ color: "var(--pa-ink)" }}
            />
          </div>

          {/* Options list */}
          <ul className="max-h-[200px] overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-[13px]" style={{ color: "var(--pa-ink-2)" }}>No results</li>
            ) : (
              filtered.map((c, i) => (
                <li key={`${c.code}-${c.name}-${i}`}>
                  <button
                    type="button"
                    onClick={() => { onChange(c.code); setOpen(false); setQuery(""); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-[13.5px] transition-colors hover:bg-[rgba(19,192,122,0.07)]"
                    style={{
                      color: "var(--pa-ink)",
                      background: c.code === value && c.name === selected.name
                        ? "rgba(19,192,122,0.1)"
                        : undefined,
                    }}
                  >
                    <span className="text-[17px] leading-none">{c.flag}</span>
                    <span className="font-medium" style={{ color: "var(--pa-teal-deep)" }}>{c.code}</span>
                    <span style={{ color: "var(--pa-ink-2)" }}>{c.name}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [mounted, setMounted]     = useState(false);
  const [state, setState]         = useState<FormState>({ success: false, message: "" });
  const [isPending, setIsPending] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setState({ success: false, message: "" });

    const fd = new FormData(e.currentTarget);
    const payload = {
      firstName:   fd.get("firstName")  as string,
      lastName:    fd.get("lastName")   as string,
      email:       fd.get("email")      as string,
      countryCode,
      phone:       fd.get("phone")      as string,
      company:     fd.get("company")    as string,
      message:     fd.get("message")    as string,
    };

    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setState({ success: true, message: "We got your request! We'll reach out to book your demo." });
        e.currentTarget?.reset();
        setCountryCode("+91");
      } else {
        setState({ success: false, message: data.message || "Something went wrong. Please try again." });
      }
    } catch {
      setState({ success: false, message: "Something went wrong. Please try again." });
    } finally {
      setIsPending(false);
    }
  };

  if (!mounted) return <div className="space-y-4 animate-pulse">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-[54px] rounded-xl bg-[color:var(--pa-line)]" />)}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {/* Row 1 — First + Last name */}
      <div className="grid grid-cols-2 gap-3">
        <Field name="firstName" label="First Name" required />
        <Field name="lastName"  label="Last Name"  required />
      </div>

      {/* Row 2 — Email */}
      <Field name="email" label="Work Email" type="email" required />

      {/* Row 3 — Phone with country code */}
      <div className="flex gap-2">
        <CountryCodePicker value={countryCode} onChange={setCountryCode} />
        <div className="relative flex-1">
          <input
            id="phone" name="phone" type="tel"
            placeholder="Contact Number"
            className={inputBase}
          />
          <label htmlFor="phone" className={`${labelBase} top-1/2 -translate-y-1/2`}>
            Contact Number <span className="text-[color:var(--pa-ink-2)] opacity-60 text-[11px]">(optional)</span>
          </label>
        </div>
      </div>

      {/* Row 4 — Company */}
      <Field name="company" label="Company Name" />

      {/* Row 5 — Message */}
      <Field name="message" label="How can we help?" rows={3} />

      {/* Status */}
      {state.message && (
        <div className={`flex items-start gap-3 p-4 rounded-xl text-[13.5px] ${
          state.success
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-red-50 text-red-600 border border-red-200"
        }`}>
          {state.success
            ? <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
            : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
          <span>{state.message}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit" disabled={isPending}
        className="pa-btn-pri w-full flex items-center justify-center gap-2.5 py-[14px] px-6 rounded-xl font-semibold text-[15px] disabled:opacity-60 transition-all duration-200"
        style={{ boxShadow: "0 8px 24px rgba(103,61,230,0.30)" }}
      >
        {isPending
          ? <><Loader2 className="w-5 h-5 animate-spin" /> Booking your demo…</>
          : <><CalendarCheck className="w-5 h-5" /> Book My Free Demo</>}
      </button>

      <p className="text-center text-[11.5px] text-[color:var(--pa-ink-2)]">
        No credit card required · Response within 24 hours
      </p>
    </form>
  );
}

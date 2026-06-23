"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  entityName: string;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  currentChallenge: string;
  message: string;
}

const EMPTY: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  company: "", currentChallenge: "", message: "",
};

// All colors driven by pa-* tokens — flips with data-theme automatically
const inputCls =
  "w-full px-3.5 py-2.5 text-sm outline-none transition-colors rounded-xl " +
  "placeholder:text-[color:var(--pa-ink-2)]";

const inputStyle: React.CSSProperties = {
  background: "var(--pa-surface)",
  border: "1px solid var(--pa-line)",
  color: "var(--pa-ink)",
};

const FOCUS_LINE = "var(--pa-teal)";
const BLUR_LINE  = "var(--pa-line)";

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = FOCUS_LINE;
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = BLUR_LINE;
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--pa-ink-2)" }}>
        {label}{required && <span style={{ color: "var(--pa-teal)" }} className="ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({
  type = "text", value, onChange, placeholder, autoRef, required,
}: {
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  autoRef?: React.RefObject<HTMLInputElement | null>;
  required?: boolean;
}) {
  return (
    <input
      ref={autoRef}
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={inputCls}
      style={inputStyle}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

export default function ServiceConsultationModal({ isOpen, entityName, onClose }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstRef.current?.focus(), 120);
      setStatus("idle");
      setErrorMsg("");
      setForm(EMPTY);
    }
  }, [isOpen]);

  const set = (k: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          leadType: "Service",
          serviceName: entityName,
          sourceUrl: window.location.href,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setErrorMsg(data.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Book Free Consultation"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 backdrop-blur-md"
            style={{ background: "rgba(5,5,18,0.72)" }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 360 }}
            className="relative z-10 w-full max-w-xl overflow-y-auto"
            style={{
              maxHeight: "90vh",
              background: "var(--pa-card)",
              border: "1px solid var(--pa-line)",
              borderRadius: 20,
              boxShadow: "0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(103,61,230,0.08)",
            }}
          >
            {/* Accent top bar */}
            <div className="h-[3px] rounded-t-[20px]" style={{ background: "linear-gradient(90deg,var(--pa-teal),var(--pa-teal-deep))" }} />

            {/* Header */}
            <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-4">
              <div>
                <span
                  className="inline-block text-[10px] font-bold tracking-[0.20em] uppercase px-2.5 py-1 rounded-full mb-2.5"
                  style={{ background: "var(--pa-teal-soft)", color: "var(--pa-teal)" }}
                >
                  {entityName}
                </span>
                <h2 className="text-[1.15rem] font-extrabold leading-snug" style={{ color: "var(--pa-ink)" }}>
                  Book Free Consultation
                </h2>
                <p className="text-[13px] mt-1" style={{ color: "var(--pa-ink-2)" }}>
                  30 minutes with our team — focused on your specific challenge.
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                style={{ color: "var(--pa-ink-2)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(103,61,230,0.10)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {status === "success" ? (
              <div className="px-6 pb-8 flex flex-col items-center text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "var(--pa-teal-soft)", border: "1px solid rgba(103,61,230,0.30)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pa-teal)" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--pa-ink)" }}>Consultation Booked!</h3>
                <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "var(--pa-ink-2)" }}>
                  We&apos;ve received your request and will reach out within 4 business hours to confirm your consultation.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  style={{
                    background: "var(--pa-surface)",
                    border: "1px solid var(--pa-line)",
                    color: "var(--pa-ink)",
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First Name" required>
                    <Input autoRef={firstRef} value={form.firstName} onChange={set("firstName")} placeholder="Alex" required />
                  </Field>
                  <Field label="Last Name" required>
                    <Input value={form.lastName} onChange={set("lastName")} placeholder="Rivera" required />
                  </Field>
                </div>

                <Field label="Work Email" required>
                  <Input type="email" value={form.email} onChange={set("email")} placeholder="alex@printshop.com" required />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Phone Number">
                    <Input type="tel" value={form.phone} onChange={set("phone")} placeholder="+1 555 000 0000" />
                  </Field>
                  <Field label="Company Name">
                    <Input value={form.company} onChange={set("company")} placeholder="Acme Print Co." />
                  </Field>
                </div>

                <Field label="Current Challenge" required>
                  <textarea
                    rows={3}
                    required
                    value={form.currentChallenge}
                    onChange={set("currentChallenge")}
                    placeholder="Describe the main workflow or operational challenge you're trying to solve…"
                    className={`${inputCls} resize-none`}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </Field>

                <Field label="Message">
                  <textarea
                    rows={2}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Anything else you'd like us to know before the call?"
                    className={`${inputCls} resize-none`}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </Field>

                {status === "error" && (
                  <p
                    className="text-sm px-3.5 py-2.5 rounded-xl"
                    style={{ color: "#f87171", background: "rgba(248,113,113,0.10)", border: "1px solid rgba(248,113,113,0.20)" }}
                  >
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-xl font-bold text-[15px] text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  style={{
                    background: "linear-gradient(135deg,var(--pa-teal),var(--pa-teal-deep))",
                    boxShadow: "0 8px 24px rgba(103,61,230,0.28)",
                  }}
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting…
                    </span>
                  ) : "Request Consultation"}
                </button>

                <p className="text-center text-[11px]" style={{ color: "var(--pa-ink-2)", opacity: 0.6 }}>
                  Free · No commitment · Reply in 4 hours
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

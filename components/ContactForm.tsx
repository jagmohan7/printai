"use client";
import { useActionState } from "react";
import { submitContact, ContactFormState } from "@/lib/actions";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const initialState: ContactFormState = { success: false, message: "" };

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
};

function FloatingField({ name, label, type = "text", required, textarea }: FieldProps) {
  const baseClass =
    "peer w-full px-4 pt-5 pb-2 bg-transparent border border-white/[0.1] rounded-xl text-white text-[14.5px] outline-none transition-colors placeholder-transparent focus:border-violet-500/60";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          required={required}
          placeholder={label}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={label}
          className={baseClass}
        />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[14px] transition-all duration-200
          peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11.5px] peer-focus:text-violet-300 peer-focus:font-medium
          peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11.5px] peer-[:not(:placeholder-shown)]:text-violet-300"
      >
        {label}
      </label>
    </div>
  );
}

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <FloatingField name="name" label="Your Name" required />
      <FloatingField name="email" label="Email Address" type="email" required />
      <FloatingField name="company" label="Company Name" />
      <FloatingField name="service" label="Service Interest" />
      <div className="relative">
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Your Message"
          className="peer w-full px-4 pt-5 pb-2 bg-transparent border border-white/[0.1] rounded-xl text-white text-[14.5px] outline-none transition-colors placeholder-transparent focus:border-violet-500/60 resize-none"
        />
        <label
          htmlFor="message"
          className="pointer-events-none absolute left-4 top-5 text-gray-400 text-[14px] transition-all duration-200
            peer-focus:top-2 peer-focus:text-[11.5px] peer-focus:text-violet-300 peer-focus:font-medium
            peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11.5px] peer-[:not(:placeholder-shown)]:text-violet-300"
        >
          Your Message
        </label>
      </div>

      {state.message && (
        <div
          className={`flex items-start gap-3 p-4 rounded-xl text-sm ${
            state.success
              ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
              : "bg-red-500/10 text-red-300 border border-red-500/30"
          }`}
        >
          {state.success ? (
            <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-white font-semibold text-[15px] bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0 transition-all duration-200 shadow-[0_0_28px_rgba(124,58,237,0.4)]"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" /> Send Message
          </>
        )}
      </button>
    </form>
  );
}

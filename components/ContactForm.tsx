"use client";
import { useActionState } from "react";
import { submitContact, ContactFormState } from "@/lib/actions";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const initialState: ContactFormState = { success: false, message: "" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="John Smith"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="john@yourcompany.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
        <input
          name="company"
          type="text"
          placeholder="Acme Printing Co."
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Interest</label>
        <select
          name="service"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        >
          <option value="">Select a service...</option>
          <option>Custom Chatbot</option>
          <option>Process Automation</option>
          <option>ERPNext Integration</option>
          <option>Web-to-Print Solution</option>
          <option>Other Service Interest</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your printing business and what you're looking to automate..."
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
        />
      </div>

      {state.message && (
        <div
          className={`flex items-start gap-3 p-4 rounded-lg text-sm ${
            state.success
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
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
        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors"
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

"use client";
import MotionInView from "@/components/MotionInView";
import { pickArray } from "@/lib/section-utils";

export interface DevOpsImpactData {
  heading?: string;
  impacts?: Array<{ value?: string; label?: string }>;
}

interface Props { data?: DevOpsImpactData | null }

const FALLBACK = {
  heading: "Impact on **Your Business**",
  impacts: [
    { value: "99.9%",  label: "Uptime" },
    { value: "40–60%", label: "Faster Load Times" },
    { value: "95%",    label: "Fewer Deployment Errors" },
    { value: "3x",     label: "Scalability Improvement" },
  ],
};

function renderHeading(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <span key={i} style={{ color: "var(--pa-teal)" }}>{p.slice(2, -2)}</span>
    ) : (
      <span key={i} className="pa-ink-text">{p}</span>
    )
  );
}

export default function DevOpsImpactSection({ data }: Props) {
  const heading = data?.heading ?? FALLBACK.heading;
  const impacts = pickArray(data?.impacts, FALLBACK.impacts);

  const colsClass = impacts.length <= 2 ? "lg:grid-cols-2" : impacts.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <section className="relative overflow-hidden pa-band-page section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-violet-600/7 blur-[150px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[220px] rounded-full bg-cyan-500/6 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <MotionInView className="text-center mb-12">
          <h2 className="text-[1.875rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight leading-[1.15]">
            {renderHeading(heading)}
          </h2>
        </MotionInView>

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${colsClass} gap-4 sm:gap-5`}>
          {impacts.map((it, i) => (
            <MotionInView key={i} delay={0.1 * i}>
              <div className="group h-full flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-2xl border border-[var(--pa-line)] bg-[var(--pa-card)] hover:border-[color:var(--pa-teal)] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(103,61,230,0.15)] transition-all duration-300 min-h-[130px] sm:min-h-[160px]">
                <span className="text-[2.2rem] sm:text-[2.8rem] font-extrabold tracking-tight leading-none whitespace-nowrap" style={{ color: "var(--pa-teal)" }}>{it.value}</span>
                <span className="mt-2.5 pa-soft text-[13px] font-medium leading-snug">{it.label}</span>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import { site } from "@/data/site";

const ROLES = [
  "School / coach",
  "Advisor",
  "Athlete or parent",
  "Other",
];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.35"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-black/[0.08] bg-surface px-4 py-3 text-[15px] outline-none transition focus:border-accent focus:bg-white";

  return (
    <section id="contact" ref={ref} className="bg-surface px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div style={reduce ? undefined : { scale, opacity }} className="origin-left">
          <h2 className="text-[clamp(2.4rem,6vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em]">
            Master Your Money,
            <br />
            <span className="text-accent">Own Your Next Play.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-ink-soft">
            Schools, coaches, advisors, athletes, parents — if you want financial
            literacy to arrive before the first deal, we want to hear from you.
          </p>
          <a
            href={
              site.bookCallUrl ||
              `mailto:${site.email}?subject=${encodeURIComponent("Intro call — Next Play Finance")}`
            }
            {...(site.bookCallUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[16px] font-medium text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2.5" y="4" width="15" height="13.5" rx="2.5" />
              <path d="M2.5 8.5h15M6.5 2.5V5M13.5 2.5V5" />
            </svg>
            Book an intro call
          </a>
          <p className="mt-5 text-[15px] text-ink-soft">
            Prefer email?{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-4">
              {site.email}
            </a>
          </p>
        </motion.div>

        <div className="rounded-3xl border border-black/[0.05] bg-white p-6 shadow-[0_2px_16px_rgba(18,19,23,0.05)] md:p-8">
          {status === "sent" ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl">
                🎉
              </div>
              <h3 className="mt-5 text-xl font-semibold">Thanks — message received.</h3>
              <p className="mt-2 max-w-sm text-[15px] text-ink-soft">
                We&apos;ll get back to you soon at the email you gave us.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                    Name
                  </label>
                  <input id="name" name="name" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="role" className="mb-1.5 block text-sm font-medium">
                  I am a…
                </label>
                <select id="role" name="role" className={inputClass} defaultValue={ROLES[0]}>
                  {ROLES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <textarea id="message" name="message" required rows={5} className={inputClass} />
              </div>
              {/* Honeypot — hidden from real users */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              {status === "error" && (
                <p className="text-sm text-red-600">
                  {error} You can also email us directly at {site.email}.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-accent py-3.5 text-[16px] font-medium text-white transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

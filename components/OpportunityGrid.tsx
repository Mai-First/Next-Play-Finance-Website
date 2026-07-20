"use client";

import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { opportunity } from "@/data/stats";

export default function OpportunityGrid() {
  return (
    <section id="opportunity" className="bg-white px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink-faint">
            {opportunity.eyebrow}
          </p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.025em]">
            {opportunity.headlineLines[0]}
            <br />
            <span className="text-ink-faint">{opportunity.headlineLines[1]}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-ink-soft">{opportunity.kicker}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {opportunity.cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-3xl bg-surface p-7">
                <div
                  className={`text-5xl font-medium tracking-[-0.02em] md:text-6xl ${
                    c.value === 0 ? "text-accent" : "text-ink"
                  }`}
                >
                  <CountUp
                    value={c.value}
                    prefix={c.prefix}
                    suffix={c.suffix}
                    decimals={c.decimals}
                  />
                </div>
                <p className="mt-6 text-[15px] leading-snug text-ink-soft">{c.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 text-sm text-ink-faint">{opportunity.sources}</p>
        </Reveal>
      </div>
    </section>
  );
}

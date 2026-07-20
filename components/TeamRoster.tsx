"use client";

import Reveal from "@/components/Reveal";
import { team } from "@/data/team";

export default function TeamRoster() {
  return (
    <section id="team" className="bg-white px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink-faint">
            {team.eyebrow}
          </p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.025em]">
            {team.headline}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.members.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-3xl bg-card p-7 ring-1 ring-black/[0.04]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-lg font-semibold text-white">
                  {m.initials}
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em]">{m.name}</h3>
                <p className="mt-0.5 text-[15px] font-medium text-accent">{m.role}</p>
                <p className="mt-1 text-sm text-ink-soft">
                  {m.school} · {m.major}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { team, type Partner, type TeamMember } from "@/data/team";

function ArrowButton({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors hover:border-accent hover:text-accent"
    >
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className={`h-4 w-4 ${direction === "prev" ? "-scale-x-100" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8h10M9 3.5L13.5 8 9 12.5" />
      </svg>
    </button>
  );
}

function Avatar({
  image,
  initials,
  name,
  dark,
}: {
  image?: string;
  initials: string;
  name: string;
  dark: boolean;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={112}
        height={112}
        className="h-14 w-14 rounded-full object-cover"
      />
    );
  }
  return (
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-full text-base font-semibold ${
        dark ? "bg-ink text-white" : "bg-surface-2 text-ink"
      }`}
    >
      {initials}
    </div>
  );
}

function CardFrame({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileHover={reduce ? undefined : { scale: 1.05, y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-[225px] shrink-0 flex-col rounded-3xl bg-card p-6 ring-1 ring-black/[0.04] transition-shadow hover:shadow-[0_16px_32px_rgba(18,19,23,0.08)]"
    >
      {children}
    </motion.div>
  );
}

function FounderCard({ m }: { m: TeamMember }) {
  return (
    <CardFrame>
      <Avatar image={m.image} initials={m.initials} name={m.name} dark />
      <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.01em]">{m.name}</h3>
      <p className="mt-0.5 text-sm font-medium text-accent">{m.role}</p>
      <p className="mt-1 text-[13px] text-ink-soft">
        {m.school} · {m.major}
      </p>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">{m.bio}</p>
    </CardFrame>
  );
}

function PartnerCard({ p }: { p: Partner }) {
  return (
    <CardFrame>
      <span className="mb-3 inline-flex w-fit rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-soft">
        {p.tag}
      </span>
      <Avatar image={p.image} initials={p.initials} name={p.name} dark={false} />
      <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.01em]">{p.name}</h3>
      <p className="mt-0.5 text-sm font-medium text-accent">{p.title}</p>
    </CardFrame>
  );
}

function RosterStrip({
  label,
  cardCount,
  renderCards,
}: {
  label?: string;
  cardCount: number;
  renderCards: (ariaHidden: boolean) => React.ReactNode;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  // The loop only engages when one card set is wider than the strip —
  // otherwise clones would sit visibly next to their originals.
  const [loops, setLoops] = useState(false);

  useEffect(() => {
    const measure = () => {
      const el = scroller.current;
      if (!el) return;
      const first = el.children[0] as HTMLElement | undefined;
      const last = el.children[cardCount - 1] as HTMLElement | undefined;
      if (!first || !last) return;
      const setWidth = last.offsetLeft + last.offsetWidth - first.offsetLeft;
      setLoops(setWidth > el.clientWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [cardCount]);

  const period = useCallback(() => {
    const el = scroller.current;
    if (!el || el.children.length <= cardCount) return 0;
    const first = el.children[0] as HTMLElement;
    const clone = el.children[cardCount] as HTMLElement;
    return clone.offsetLeft - first.offsetLeft;
  }, [cardCount]);

  // Once clones exist, start in the middle set for loop room both ways.
  useEffect(() => {
    const el = scroller.current;
    if (el && loops) el.scrollLeft = period();
  }, [loops, period]);

  // Drifting near either outer set teleports one period back toward the
  // middle; content repeats exactly, so the jump is invisible.
  const onScroll = () => {
    const el = scroller.current;
    if (!el || !loops) return;
    const p = period();
    if (!p) return;
    if (el.scrollLeft < p * 0.25) el.scrollLeft += p;
    else if (el.scrollLeft > p * 1.75) el.scrollLeft -= p;
  };

  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    const p = period();
    if (!el || !p) return;
    el.scrollBy({ left: (dir * 2 * p) / cardCount, behavior: "smooth" });
  };

  return (
    <div>
      {(label || loops) && (
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-8">
          {label ? (
            <Reveal>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-ink-soft">
                {label}
              </h3>
            </Reveal>
          ) : (
            <span />
          )}
          {loops && (
            <Reveal delay={0.05}>
              <div className="hidden shrink-0 gap-2 sm:flex">
                <ArrowButton
                  direction="prev"
                  onClick={() => step(-1)}
                  label={`Scroll ${label ?? "roster"} left`}
                />
                <ArrowButton
                  direction="next"
                  onClick={() => step(1)}
                  label={`Scroll ${label ?? "roster"} right`}
                />
              </div>
            </Reveal>
          )}
        </div>
      )}
      {/* Cards grow on hover, so the strip carries vertical padding */}
      <Reveal delay={0.05}>
        <div
          ref={scroller}
          onScroll={onScroll}
          className="no-scrollbar mt-1 flex gap-3 overflow-x-auto px-5 py-5 md:px-8"
        >
          {renderCards(false)}
          {loops && renderCards(true)}
          {loops && renderCards(true)}
        </div>
      </Reveal>
    </div>
  );
}

export default function TeamRoster() {
  return (
    <section id="team" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink-faint">
            {team.eyebrow}
          </p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.025em]">
            {team.headline}
          </h2>
        </Reveal>
      </div>

      <div className="mt-2 flex flex-col gap-8">
        <RosterStrip
          cardCount={team.members.length}
          renderCards={(ariaHidden) =>
            team.members.map((m) => (
              <div key={m.name} aria-hidden={ariaHidden || undefined} className="flex">
                <FounderCard m={m} />
              </div>
            ))
          }
        />
        <RosterStrip
          label="Advisors & Partners"
          cardCount={team.partners.length}
          renderCards={(ariaHidden) =>
            team.partners.map((p) => (
              <div key={p.name} aria-hidden={ariaHidden || undefined} className="flex">
                <PartnerCard p={p} />
              </div>
            ))
          }
        />
      </div>
    </section>
  );
}

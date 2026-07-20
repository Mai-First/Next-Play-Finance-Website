"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import { curriculum } from "@/data/curriculum";

function PlayDiagram() {
  // Faint playbook doodle: X's, an O, and a dashed route arrow.
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 80"
      className="pointer-events-none absolute bottom-4 right-4 h-16 w-24 text-ink/[0.08]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M14 62l10 10M24 62l-10 10" />
      <path d="M44 66l10 10M54 66l-10 10" />
      <circle cx="86" cy="70" r="6" />
      <path d="M86 60C84 40 66 30 40 26" strokeDasharray="5 6" />
      <path d="M46 20l-9 5 3 10" />
    </svg>
  );
}

function ModuleCard({
  number,
  title,
  topics,
  index,
}: {
  number: string;
  title: string;
  topics: string[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <div
        ref={ref}
        className="relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-3xl bg-white p-7 shadow-[0_1px_2px_rgba(18,19,23,0.04)]"
      >
        <motion.span
          style={reduce ? undefined : { y: ghostY }}
          className="pointer-events-none absolute -right-3 -top-8 select-none text-[7.5rem] font-semibold leading-none tracking-tight text-ink/[0.05]"
          aria-hidden
        >
          {number}
        </motion.span>
        <span className="text-sm font-semibold text-accent">{number}</span>
        <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em]">{title}</h3>
        <ul className="mt-4 space-y-1.5">
          {topics.map((t) => (
            <li key={t} className="text-[15px] text-ink-soft">
              {t}
            </li>
          ))}
        </ul>
        <PlayDiagram />
      </div>
    </Reveal>
  );
}

export default function CurriculumCards() {
  return (
    <section id="curriculum" className="bg-surface px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink-faint">
            {curriculum.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.025em]">
            {curriculum.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-ink-soft">{curriculum.subline}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {curriculum.modules.map((m, i) => (
            <ModuleCard key={m.number} {...m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

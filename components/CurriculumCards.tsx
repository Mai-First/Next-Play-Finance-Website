"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { curriculum } from "@/data/curriculum";

function PlayDiagram() {
  // Faint playbook doodle: X's, an O, and a dashed route arrow.
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 80"
      className="pointer-events-none absolute bottom-4 right-4 h-14 w-20 text-ink/[0.08]"
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
  index,
  isSelected,
  onSelect,
}: {
  number: string;
  title: string;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [16, -16]);

  return (
    <Reveal delay={index * 0.06} className="h-full">
      <motion.div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-pressed={isSelected}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        className="relative flex h-full min-h-[104px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl bg-white p-5 outline-none"
        animate={{
          scale: isSelected && !reduce ? 1.02 : 1,
          boxShadow: isSelected
            ? "0 0 0 2px #FF7A59, 0 12px 24px rgba(18,19,23,0.08)"
            : "0 0 0 1px rgba(18,19,23,0.0), 0 1px 2px rgba(18,19,23,0.04)",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          style={reduce ? undefined : { y: ghostY }}
          className="pointer-events-none absolute -right-2 -top-5 select-none text-[4.5rem] font-semibold leading-none tracking-tight text-ink/[0.05]"
          aria-hidden
        >
          {number}
        </motion.span>
        <span className="text-sm font-semibold text-accent">{number}</span>
        <h3 className="mt-2 text-[17px] font-semibold leading-snug tracking-[-0.01em]">
          {title}
        </h3>
      </motion.div>
    </Reveal>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous module" : "Next module"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors hover:border-accent hover:text-accent"
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

export default function CurriculumCards() {
  const [selected, setSelected] = useState(0);
  const reduce = useReducedMotion();
  const count = curriculum.modules.length;
  const mod = curriculum.modules[selected];

  return (
    <section
      id="curriculum"
      className="flex bg-surface px-5 py-16 md:px-8 lg:min-h-screen lg:items-center lg:py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink-faint">
              {curriculum.eyebrow}
            </p>
            <h2 className="mt-3 max-w-xl text-[clamp(1.8rem,3.6vw,2.7rem)] font-medium leading-[1.1] tracking-[-0.025em]">
              {curriculum.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-relaxed text-ink-soft lg:text-right">
              {curriculum.subline}
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {curriculum.modules.map((m, i) => (
            <ModuleCard
              key={m.number}
              number={m.number}
              title={m.title}
              index={i}
              isSelected={selected === i}
              onSelect={() => setSelected(i)}
            />
          ))}
        </div>

        {/* Detail panel for the selected module — click a card or the arrows to move through */}
        <Reveal delay={0.15}>
          <div className="relative mt-4 overflow-hidden rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgba(18,19,23,0.04)] md:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-h-[11rem] flex-1 sm:min-h-[10rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-sm font-semibold text-accent">
                      Module {mod.number} of {String(count).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.01em] md:text-2xl">
                      {mod.title}
                    </h3>
                    <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                      {mod.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {mod.topics.map((topic) => (
                        <span
                          key={topic}
                          className="inline-block rounded-full bg-surface px-3.5 py-1.5 text-sm text-ink-soft"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex shrink-0 gap-2">
                <ArrowButton
                  direction="prev"
                  onClick={() => setSelected((s) => (s + count - 1) % count)}
                />
                <ArrowButton
                  direction="next"
                  onClick={() => setSelected((s) => (s + 1) % count)}
                />
              </div>
            </div>
            <PlayDiagram />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

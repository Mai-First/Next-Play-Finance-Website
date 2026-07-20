"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { mission } from "@/data/curriculum";

function Word({
  word,
  start,
  end,
  progress,
  accent,
}: {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
  accent: boolean;
}) {
  const color = useTransform(
    progress,
    [start, end],
    accent ? ["#d3d5da", "#ff7a59"] : ["#d3d5da", "#121317"],
  );
  return (
    <motion.span style={{ color }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

export default function MissionReveal() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const words = mission.text.split(" ");
  // Match the highlight as a contiguous phrase, not word-by-word (so "the"
  // elsewhere in the sentence doesn't get the accent color).
  const hl = mission.highlight.split(" ");
  const hlStart = words.findIndex((_, i) => hl.every((h, j) => words[i + j] === h));
  const isAccent = (i: number) => hlStart >= 0 && i >= hlStart && i < hlStart + hl.length;
  // Words sweep to ink across the middle of the pinned scroll range.
  const sweepStart = 0.12;
  const sweepEnd = 0.85;
  const step = (sweepEnd - sweepStart) / words.length;

  if (reduce) {
    return (
      <section className="bg-white px-5 py-28 md:px-8">
        <p className="mx-auto max-w-4xl text-[clamp(1.7rem,4.2vw,3rem)] font-medium leading-[1.3] tracking-[-0.02em]">
          {words.map((w, i) => (
            <span key={i} className={isAccent(i) ? "text-accent" : undefined}>
              {w}{" "}
            </span>
          ))}
        </p>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[220vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center px-5 md:px-8">
        <p className="mx-auto max-w-4xl text-[clamp(1.7rem,4.2vw,3rem)] font-medium leading-[1.3] tracking-[-0.02em]">
          {words.map((w, i) => (
            <Word
              key={`${w}-${i}`}
              word={w}
              start={sweepStart + i * step}
              end={sweepStart + (i + 1) * step}
              progress={scrollYProgress}
              accent={isAccent(i)}
            />
          ))}
        </p>
      </div>
    </section>
  );
}

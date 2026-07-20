"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { problem } from "@/data/stats";

function ScrubStat({
  progress,
  window: [start, end],
  value,
  suffix,
  label,
}: {
  progress: MotionValue<number>;
  window: [number, number];
  value: number;
  suffix: string;
  label: string;
}) {
  const count = useTransform(progress, [start, end], [0, value], { clamp: true });
  const rounded = useTransform(count, (v) => Math.round(v));
  const opacity = useTransform(progress, [start, start + 0.06], [0, 1]);
  const y = useTransform(progress, [start, start + 0.08], [32, 0]);
  return (
    <motion.div style={{ opacity, y }} className="flex flex-col items-center text-center md:items-start md:text-left">
      <div className="text-[clamp(3.6rem,9vw,6.5rem)] font-medium leading-none tracking-[-0.03em] text-white">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <p className="mt-3 max-w-[16rem] text-[15px] leading-snug text-white/60">{label}</p>
    </motion.div>
  );
}

export default function ProblemStats() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const headOpacity = useTransform(scrollYProgress, [0.02, 0.1], [0, 1]);
  const headY = useTransform(scrollYProgress, [0.02, 0.1], [28, 0]);
  const punchOpacity = useTransform(scrollYProgress, [0.68, 0.78], [0, 1]);
  const punchScale = useTransform(scrollYProgress, [0.68, 0.82], [0.94, 1]);
  const sourceOpacity = useTransform(scrollYProgress, [0.72, 0.8], [0, 0.4]);

  if (reduce) {
    return (
      <section id="problem" className="bg-dark px-5 py-28 text-white md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
            {problem.eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-medium tracking-[-0.02em] md:text-5xl">
            {problem.headline}
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {problem.stats.map((s) => (
              <div key={s.label}>
                <div className="text-6xl font-medium">{s.value}{s.suffix}</div>
                <p className="mt-3 text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-14 text-2xl md:text-3xl">
            {problem.punchline.lead}{" "}
            <span className="font-semibold text-accent">{problem.punchline.kicker}</span>
          </p>
          <p className="mt-10 text-sm text-white/40">{problem.sources}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="problem" ref={ref} className="relative h-[300vh] bg-dark">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-5 md:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div style={{ opacity: headOpacity, y: headY }}>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
              {problem.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-white md:text-5xl">
              {problem.headline}
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
            <ScrubStat
              progress={scrollYProgress}
              window={[0.16, 0.34]}
              value={problem.stats[0].value}
              suffix={problem.stats[0].suffix}
              label={problem.stats[0].label}
            />
            <ScrubStat
              progress={scrollYProgress}
              window={[0.34, 0.5]}
              value={problem.stats[1].value}
              suffix={problem.stats[1].suffix}
              label={problem.stats[1].label}
            />
            <ScrubStat
              progress={scrollYProgress}
              window={[0.5, 0.66]}
              value={problem.stats[2].value}
              suffix={problem.stats[2].suffix}
              label={problem.stats[2].label}
            />
          </div>

          <motion.p
            style={{ opacity: punchOpacity, scale: punchScale }}
            className="mt-12 origin-left text-2xl font-medium tracking-[-0.01em] text-white md:mt-16 md:text-4xl"
          >
            {problem.punchline.lead}{" "}
            <span className="font-semibold text-accent">{problem.punchline.kicker}</span>
          </motion.p>
        </div>

        <motion.p
          style={{ opacity: sourceOpacity }}
          className="absolute bottom-6 left-1/2 w-full -translate-x-1/2 px-5 text-center text-xs text-white md:text-sm"
        >
          {problem.sources}
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";

const WORDS = [
  "quarterbacks",
  "point guards",
  "sprinters",
  "swimmers",
  "pitchers",
  "every athlete.",
];

function WheelWord({
  word,
  index,
  wheel,
  isLast,
}: {
  word: string;
  index: number;
  wheel: MotionValue<number>;
  isLast: boolean;
}) {
  const y = useTransform(wheel, (v) => `${(index - v) * 112}%`);
  const opacity = useTransform(wheel, (v) => {
    const d = Math.abs(index - v);
    return Math.max(0, 1 - d * 0.55);
  });
  const scale = useTransform(wheel, (v) => {
    const d = Math.min(1, Math.abs(index - v));
    return 1 - d * 0.12;
  });
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      <motion.span
        style={{ y, opacity, scale }}
        className={isLast ? "text-accent" : "text-ink"}
      >
        {word}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Scroll drives the word wheel through phase [0 → 0.42], then locks on the
  // last word. Everything after ~0.52 is dwell: the finished hero (headline +
  // subline + CTA) stays pinned for roughly a full screen of scroll so the
  // button can't be flicked past.
  const wheelRaw = useTransform(scrollYProgress, [0, 0.42], [0, WORDS.length - 1], {
    clamp: true,
  });
  const wheel = useSpring(wheelRaw, { stiffness: 120, damping: 24, mass: 0.4 });

  // Supporting copy arrives while the wheel settles, well before the pin
  // releases. State-driven (not a scrubbed MotionValue binding) so the reveal
  // is a reliable one-shot regardless of how fast the user scrolls.
  const [locked, setLocked] = useState(false);
  const [started, setStarted] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setLocked(v > 0.44);
    setStarted(v > 0.02);
  });

  if (reduce) {
    return (
      <section id="top" className="flex min-h-screen flex-col items-center justify-center px-5 pt-16 text-center">
        <h1 className="max-w-4xl text-[clamp(2.6rem,7vw,4.6rem)] font-medium leading-[1.06] tracking-[-0.03em]">
          Financial foundations for <span className="text-accent">every athlete.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-soft">
          The first program built to deliver financial literacy{" "}
          <em>before</em> athletes start earning.
        </p>
        <a
          href="#contact"
          className="mt-8 rounded-full bg-accent px-7 py-3.5 text-[16px] font-medium text-white"
        >
          Get in touch
        </a>
      </section>
    );
  }

  return (
    <section id="top" ref={ref} className="relative h-[220vh] md:h-[250vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5 pt-16">
        <h1 className="w-full max-w-5xl text-center text-[clamp(2.4rem,7vw,4.6rem)] font-medium leading-[1.06] tracking-[-0.03em]">
          <span className="block">Financial foundations for</span>
          <span
            className="relative block h-[1.6em] overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
            }}
          >
            {WORDS.map((w, i) => (
              <WheelWord
                key={w}
                word={w}
                index={i}
                wheel={wheel}
                isLast={i === WORDS.length - 1}
              />
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={locked ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col items-center"
        >
          <p className="max-w-xl text-center text-lg text-ink-soft">
            The first program built to deliver financial literacy{" "}
            <em>before</em> athletes start earning.
          </p>
          <div className="relative mt-8">
            <a
              href="#contact"
              className="inline-block rounded-full bg-accent px-7 py-3.5 text-[16px] font-medium text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Get in touch
            </a>
            <span
              aria-hidden
              className="pointer-events-none absolute -right-40 -top-7 hidden -rotate-6 font-hand text-2xl text-ink-soft md:block"
            >
              before the first deal!
              <svg
                viewBox="0 0 60 24"
                className="absolute -bottom-4 -left-8 h-6 w-14 -scale-x-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M2 2c14 16 34 20 54 12" />
                <path d="M48 8l8 6-10 4" />
              </svg>
            </span>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: started ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-8 flex flex-col items-center gap-1 text-sm text-ink-faint"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            aria-hidden
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

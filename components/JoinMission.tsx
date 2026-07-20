"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, School, Users } from "lucide-react";
import { useRef } from "react";
import { ask } from "@/data/ask";

const ICONS = {
  graduation: GraduationCap,
  users: Users,
  school: School,
} as const;

export default function JoinMission() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // 0 when the section top reaches 90% of viewport, 1 when it reaches 30%.
    offset: ["start 0.9", "start 0.3"],
  });

  // The section darkens as it scrolls in; content fades in once it's dark.
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.45],
    ["#ffffff", "#0e0f11"],
  );
  const contentOpacity = useTransform(scrollYProgress, [0.35, 0.75], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.35, 0.75], [40, 0]);

  const inner = (
    <div className="mx-auto max-w-6xl">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
        {ask.eyebrow}
      </p>
      <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.025em] text-white">
        {ask.headline}
      </h2>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {ask.items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <div
              key={item.title}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.05] p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15">
                <Icon className="h-6 w-6 text-accent" strokeWidth={1.8} />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-white">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/60">
                {item.copy}
              </p>
              <a
                href="#contact"
                className="mt-6 text-[15px] font-medium text-accent transition-opacity hover:opacity-80"
              >
                Get in touch →
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (reduce) {
    return (
      <section id="join" className="bg-dark px-5 py-24 md:px-8 md:py-32">
        {inner}
      </section>
    );
  }

  return (
    <motion.section
      id="join"
      ref={ref}
      style={{ backgroundColor }}
      className="px-5 py-24 md:px-8 md:py-32"
    >
      <motion.div style={{ opacity: contentOpacity, y: contentY }}>{inner}</motion.div>
    </motion.section>
  );
}

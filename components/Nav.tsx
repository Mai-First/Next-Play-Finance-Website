"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { site } from "@/data/site";

const links = [
  { label: "Program", href: "#problem" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Team", href: "#team" },
  { label: "Join", href: "#join" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 32));

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-black/[0.06] bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="text-[17px] font-semibold tracking-tight">
          {site.name}
          <span className="text-accent">.</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="rounded-full bg-ink px-5 py-2.5 text-[15px] font-medium text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Get in touch
        </a>
      </nav>
    </motion.header>
  );
}

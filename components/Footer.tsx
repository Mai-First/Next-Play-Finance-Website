import { site } from "@/data/site";

// lucide-react no longer ships brand icons, so these stay inline.
const SOCIALS: { label: string; href: string; path: string }[] = [
  {
    label: "Instagram",
    href: site.social.instagram,
    path: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.3.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.3.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.3-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.9.4-2.3.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.3-.4 1.2-.1 1.6-.1 4.8-.1zm0 3.6a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 2.2a4 4 0 110 8 4 4 0 010-8zm6.4-2.7a1.4 1.4 0 100 2.9 1.4 1.4 0 000-2.9z",
  },
  {
    label: "X",
    href: site.social.x,
    path: "M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L2.7 2H9l4.4 5.9L18.9 2zm-1.1 18.1h1.7L7.9 3.8H6.1l11.7 16.3z",
  },
  {
    label: "LinkedIn",
    href: site.social.linkedin,
    path: "M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.2 2.4 4.2 5.4v6.3zM5.3 7.4a2 2 0 110-4.1 2 2 0 010 4.1zM7.1 20.4H3.6V9h3.5v11.4z",
  },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-white px-5 py-12 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[17px] font-semibold tracking-tight">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">{site.tagline}</p>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-ink-soft transition-colors hover:text-ink"
          >
            {site.email}
          </a>
          {SOCIALS.length > 0 && (
            <div className="flex gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="text-ink-faint transition-colors hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          )}
          <p className="text-sm text-ink-faint">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

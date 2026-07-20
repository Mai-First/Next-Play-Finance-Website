import type { Metadata } from "next";
import { Figtree, Caveat } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} · ${site.tagline}`,
  description: site.description,
  openGraph: {
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${figtree.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}

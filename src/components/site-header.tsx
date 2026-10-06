"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { site } from "@/lib/site";

const nav = [
  { label: "Water damage", href: "/water-damage-restoration" },
  { label: "What it costs", href: "/water-damage-restoration-cost-maui" },
  { label: "Service areas", href: "/service-areas/kihei" },
  { label: "Contact", href: "/contact" },
];

/**
 * Header sits in normal flow in its own band above the hero rather than
 * floating over it, so it never covers the video. It is sticky, so it is still
 * there on the way back up — but the hero is never underneath it.
 *
 * Because the bar now only ever sits on the page background, the tone is fixed
 * and the previous dark/light adaptation (and the data-hero-surface markers it
 * depended on) are gone.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const glass =
    "rounded-[16px] border border-black/10 bg-white/70 backdrop-blur-[50px] shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.45)]";

  return (
    <header className="sticky top-0 z-50 bg-sand-50 px-3 pb-2 pt-3 md:pb-3 md:pt-4">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col md:w-fit">
        <div
          className={`flex items-center justify-between gap-3 px-3 py-2.5 md:gap-8 md:py-2 md:pl-4 md:pr-2 ${glass}`}
        >
          <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
            <Logo showTagline={false} />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] font-medium text-ink-700 transition-colors hover:text-ocean-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={site.phoneHref}
              className="group hidden items-center gap-2 rounded-[12px] bg-alert-600 py-2 pl-2 pr-4 text-white shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.35)] transition-transform duration-200 hover:scale-[1.02] md:inline-flex"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-white/25">
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="nums font-display text-[13px] font-semibold">
                {site.phone}
              </span>
            </a>

            {/* Phones get the icon-only call button plus the menu toggle — the
                full number is already permanent in the bottom call bar. */}
            <a
              href={site.phoneHref}
              aria-label={`Call ${site.phone}`}
              className="inline-flex size-10 items-center justify-center rounded-[12px] bg-alert-600 text-white md:hidden"
            >
              <Phone className="size-4" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-10 items-center justify-center rounded-[12px] border border-black/10 bg-white/50 text-ink-700 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div
            id="mobile-nav"
            className={`mt-2 flex flex-col px-4 py-1 lg:hidden ${glass}`}
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-black/5 py-3.5 text-[15px] font-medium text-ink-700 last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

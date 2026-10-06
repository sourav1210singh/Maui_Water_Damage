"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLenis } from "lenis/react";
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
 * Condenses the bar once the page has moved.
 *
 * Reads Lenis rather than the window `scroll` event. Lenis drives scrolling
 * itself and emits very few native events, which left a plain listener latched
 * in whichever state it happened to read first.
 */
function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useLenis(({ scroll }) => {
    const next = scroll > threshold;
    // Returning the previous value lets React bail out, so this re-renders
    // only on the two transitions rather than every frame.
    setScrolled((prev) => (prev === next ? prev : next));
  });

  return scrolled;
}

/**
 * A full-width translucent bar, not a floating card. Edge to edge, with the
 * page background showing through a blur, and the content underneath scrolls
 * beneath it rather than past a detached pill.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const pathname = usePathname();

  const ease = "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]";

  return (
    <header className="sticky top-0 z-50">
      {/* The morph is driven by this wrapper's padding, not by the bar's own
          width. Animating width between a percentage and a pixel value is
          unreliable; padding with calc() interpolates cleanly, and pulling the
          bar inward from both sides is what turns it into a centred pill.
          max() keeps it from going negative below ~1040px. */}
      <div
        className={`${ease} ${
          scrolled
            ? "px-3 pt-3 lg:px-[max(1rem,calc(50%-520px))]"
            : "px-0 pt-0"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-5 border backdrop-blur-xl ${ease} ${
            scrolled
              ? "rounded-full border-black/10 bg-sand-50/80 px-4 py-2 shadow-[0_12px_40px_-14px_rgba(8,20,26,0.35)] md:px-5"
              : "rounded-none border-transparent border-b-sand-200/60 bg-sand-50/85 px-5 py-3 shadow-none sm:px-8 md:py-4 lg:px-12"
          }`}
        >
        <Link href="/" aria-label={`${site.name}, home`} className="shrink-0">
          <Logo showTagline={!scrolled} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative py-1 text-[14px] font-medium transition-colors duration-200 ${
                  active ? "text-ocean-900" : "text-ink-700 hover:text-ocean-900"
                }`}
              >
                {item.label}
                {/* Wipes in from the left on hover, stays on the current page.
                    scaleX rather than width so it runs on the compositor. */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full bg-surf-500 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={site.phoneHref}
            className="group hidden items-center gap-2 rounded-full bg-alert-600 py-2 pl-2 pr-5 text-white transition-transform duration-200 hover:scale-[1.02] md:inline-flex"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-white/25">
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="nums font-display text-[13px] font-semibold">
              {site.phone}
            </span>
          </a>

          {/* Phones get the icon-only call button. The full number is already
              permanent in the bottom call bar. */}
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phone}`}
            className="inline-flex size-10 items-center justify-center rounded-full bg-alert-600 text-white md:hidden"
          >
            <Phone className="size-4" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-sand-200/70 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className={`mx-3 overflow-hidden border border-black/10 bg-sand-50/95 backdrop-blur-xl lg:hidden ${ease} ${
            scrolled ? "mt-2 rounded-[22px]" : "mt-0 rounded-none border-x-0 border-t-0"
          }`}
        >
          <div className="flex flex-col px-4 py-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-sand-200/70 py-3.5 text-[15px] font-medium text-ink-700 last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

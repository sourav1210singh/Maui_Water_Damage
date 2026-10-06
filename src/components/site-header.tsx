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
 * Header sits in normal flow in its own band above the hero rather than
 * floating over it, so it never covers the video. It is sticky, so it is still
 * there on the way back up — but the hero is never underneath it.
 *
 * Because the bar now only ever sits on the page background, the tone is fixed
 * and the previous dark/light adaptation (and the data-hero-surface markers it
 * depended on) are gone.
 */
/**
 * Condenses the bar once the page has moved.
 *
 * Reads Lenis rather than the window `scroll` event. Lenis drives scrolling
 * itself and native scroll events barely fire under it — a plain listener left
 * this stuck in whichever state it happened to latch first. The native
 * listener is kept only as a fallback for the first paint and for the case
 * where Lenis has not initialised.
 */
function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  // useLenis fires on every scroll frame with the current offset, so it also
  // reports the last frame on the way back to the top. Event-driven approaches
  // (window `scroll`, or a snapshot store) latched true here and never
  // released, because Lenis emits very few native scroll events.
  useLenis(({ scroll }) => {
    const next = scroll > threshold;
    // Returning the previous value lets React bail out, so this does not
    // re-render on every frame — only on the two transitions.
    setScrolled((prev) => (prev === next ? prev : next));
  });

  return scrolled;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const pathname = usePathname();

  // 300ms cubic-bezier(0.4, 0, 0.2, 1) throughout — the easing the reference
  // header uses, and slow enough to read as a settle rather than a snap.
  const ease = "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]";
  const glass =
    "rounded-[16px] border border-black/10 bg-white/70 backdrop-blur-[50px]";

  return (
    <header
      className={`sticky top-0 z-50 bg-sand-50 px-3 ${ease} ${
        scrolled
          ? "pb-2 pt-2 md:pb-2 md:pt-2"
          : "pb-2 pt-3 md:pb-3 md:pt-4"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1100px] flex-col md:w-fit">
        <div
          className={`flex items-center justify-between gap-3 px-3 md:gap-8 md:pl-4 md:pr-2 ${glass} ${ease} ${
            scrolled
              ? "glass-edge-lifted py-1.5 md:py-1.5"
              : "glass-edge py-2.5 md:py-2"
          }`}
        >
          <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
            <Logo showTagline={false} />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
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
                  {/* Wipes in from the left on hover, and stays put on the
                      current page. scaleX rather than width so it animates on
                      the compositor instead of forcing layout every frame. */}
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
            className={`glass-edge mt-2 flex flex-col px-4 py-1 lg:hidden ${glass}`}
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

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
 * Tracks whether the floating bar is currently sitting over a dark hero.
 *
 * A translucent glass bar inherits whatever is behind it, and this site runs a
 * dark hero straight into light sections — so a single fixed text colour is
 * unreadable on one half of every page. Pages mark their dark surface with
 * data-hero-surface; the bar flips its own tone when it leaves that surface.
 */
function useOverDarkSurface() {
  const [over, setOver] = useState(true);

  useEffect(() => {
    let frame = 0;
    const BAR_BOTTOM = 92; // 30px offset + bar height + a little slack

    const measure = () => {
      frame = 0;
      const hero = document.querySelector("[data-hero-surface]");
      setOver(!!hero && hero.getBoundingClientRect().bottom > BAR_BOTTOM);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return over;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const overDark = useOverDarkSurface();

  // Glass recipe from the brief: heavy backdrop blur, a hairline outer stroke
  // and an inset top highlight that reads as a lit edge.
  const glass =
    "rounded-[16px] border backdrop-blur-[50px] shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)]";
  const tint = overDark
    ? "border-white/15 bg-white/10"
    : "border-black/10 bg-white/55";
  const linkHover = overDark ? "hover:text-white" : "hover:text-ocean-900";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[18px] z-50 flex justify-center px-3 md:top-[30px]">
      <div className="pointer-events-auto flex w-full max-w-[1100px] flex-col md:w-fit">
        <div
          className={`flex items-center justify-between gap-3 px-3 py-2.5 transition-colors duration-300 md:gap-8 md:py-2 md:pl-4 md:pr-2 ${glass} ${tint}`}
        >
          <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
            <Logo tone={overDark ? "light" : "dark"} showTagline={false} />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[14px] font-medium transition-colors ${
                  overDark ? "text-white/80" : "text-ink-700"
                } ${linkHover}`}
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

            {/* Phones get the icon-only call button plus the menu toggle —
                the number itself is already a permanent fixture in the
                bottom call bar. */}
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
              className={`inline-flex size-10 items-center justify-center rounded-[12px] border transition-colors lg:hidden ${
                overDark
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-black/10 bg-white/40 text-ink-700"
              }`}
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
            className={`mt-2 flex flex-col px-4 py-1 lg:hidden ${glass} ${tint}`}
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b py-3.5 text-[15px] font-medium last:border-0 ${
                  overDark
                    ? "border-white/10 text-white"
                    : "border-black/5 text-ink-700"
                }`}
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

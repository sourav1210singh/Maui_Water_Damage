"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, Menu, X, Clock } from "lucide-react";
import { Logo } from "./logo";
import { Container } from "./ui";
import { site } from "@/lib/site";

const nav = [
  { label: "Water damage", href: "/water-damage-restoration" },
  { label: "What it costs", href: "/water-damage-restoration-cost-maui" },
  { label: "Service areas", href: "/service-areas/kihei" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-sand-50/95 backdrop-blur supports-[backdrop-filter]:bg-sand-50/80">
      {/* Utility strip — desktop only */}
      <div className="hidden bg-ocean-900 text-sand-100 md:block">
        <Container className="flex h-9 items-center justify-between text-[13px]">
          <p className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-surf-400" aria-hidden="true" />
            Answering 24 hours a day, every day — all of Maui
          </p>
          <a
            href={site.phoneHref}
            className="nums font-medium text-white hover:text-surf-400"
          >
            {site.phone}
          </a>
        </Container>
      </div>

      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={`${site.name} — home`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-ink-700 transition-colors hover:text-ocean-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-lg bg-alert-600 px-4 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-alert-700 md:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            Call now
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-sand-300 text-ink-700 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-sand-200 bg-sand-50 lg:hidden">
          <Container className="flex flex-col py-2">
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
          </Container>
        </div>
      )}
    </header>
  );
}

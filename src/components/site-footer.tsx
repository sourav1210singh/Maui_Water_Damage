import Link from "next/link";
import { Phone, ArrowUpRight } from "lucide-react";
import { LogoStacked } from "./logo";
import { Container } from "./ui";
import { site, serviceAreas, services } from "@/lib/site";

/**
 * Three zones, in the editorial shape of the reference footer: contact and
 * address flanking a centred logo, a hairline, then a centred nav and the
 * fine print.
 *
 * The ten town names stay in here as real links rather than being dropped for
 * a tidier layout — the footer is the one place every page carries them, and
 * they are the proximity signal the whole local-SEO case rests on.
 */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[11px] font-semibold uppercase leading-none tracking-[0.18em] text-ocean-300">
      {children}
    </p>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ocean-800 bg-ocean-950 text-sand-200">
      <Container className="pb-10 pt-16 sm:pt-20">
        {/* ── top: contact · logo · address ── */}
        <div className="grid items-start gap-12 text-center md:grid-cols-3 md:text-left">
          <div>
            <Label>Water coming in?</Label>
            <a
              href={site.phoneHref}
              className="nums group mt-4 inline-flex items-center gap-2.5 rounded-full bg-alert-600 py-2.5 pl-2.5 pr-5 font-display text-[15px] font-semibold text-white transition-transform duration-200 hover:scale-[1.02]"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-white/25">
                <Phone className="size-3.5" aria-hidden="true" />
              </span>
              {site.phone}
            </a>
            <p className="mt-5 text-sm leading-relaxed text-ocean-200">
              {site.hours}
              <br />
              <span className="text-ocean-300">
                Dispatch does not stop for weekends or holidays.
              </span>
            </p>
          </div>

          <div className="flex justify-center md:pt-1">
            <LogoStacked />
          </div>

          <div className="md:text-right">
            <Label>Where we are</Label>
            <p className="mt-4 font-display text-[15px] font-semibold text-white">
              Serving Maui County
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ocean-200">
              Central Maui · South Shore · West Side
              <br />
              Upcountry · North Shore
            </p>
            <Link
              href="/contact"
              className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-surf-400 hover:text-white"
            >
              Request a callback
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* ── middle: services, then towns ── */}
        <div className="mt-14 border-t border-ocean-800 pt-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                {s.live ? (
                  <Link
                    href={`/${s.slug}`}
                    className="font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-sand-200 transition-colors hover:text-surf-400"
                  >
                    {s.title}
                  </Link>
                ) : (
                  <span className="font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-ocean-300/70">
                    {s.title}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
            {serviceAreas.map((area) => (
              <li key={area.slug}>
                {area.slug === "kihei" ? (
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="text-[13px] text-ocean-200 transition-colors hover:text-surf-400"
                  >
                    {area.name}
                  </Link>
                ) : (
                  <span className="text-[13px] text-ocean-300/70">
                    {area.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ── bottom: fine print ── */}
        <div className="mt-10 border-t border-ocean-800 pt-6">
          <div className="flex flex-col items-center gap-2 text-center text-xs text-ocean-300">
            <p>
              © {new Date().getFullYear()} {site.name} · All rights reserved
            </p>
            <p>Maui, Hawaiʻi</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

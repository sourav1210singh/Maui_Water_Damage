import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";
import { Logo } from "./logo";
import { Container } from "./ui";
import { site, serviceAreas, services } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-ocean-800 bg-ocean-950 text-sand-200">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ocean-200">
              Water damage restoration and structural drying across Maui. We
              answer the phone at any hour.
            </p>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  {s.live ? (
                    <Link
                      href={`/${s.slug}`}
                      className="text-ocean-200 transition-colors hover:text-white"
                    >
                      {s.title}
                    </Link>
                  ) : (
                    <span className="text-ocean-300/70">{s.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Service areas
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {serviceAreas.map((a) => (
                <li key={a.slug}>
                  {a.slug === "kihei" ? (
                    <Link
                      href={`/service-areas/${a.slug}`}
                      className="text-ocean-200 transition-colors hover:text-white"
                    >
                      {a.name}
                    </Link>
                  ) : (
                    <span className="text-ocean-300/70">{a.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Get help
            </h2>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-start gap-2.5 text-white transition-colors hover:text-surf-400"
                >
                  <Phone className="mt-0.5 size-4 shrink-0 text-surf-400" aria-hidden="true" />
                  <span className="nums font-semibold">{site.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-ocean-200">
                <Clock className="mt-0.5 size-4 shrink-0 text-surf-400" aria-hidden="true" />
                <span>{site.hours}</span>
              </li>
              <li className="flex items-start gap-2.5 text-ocean-200">
                <MapPin className="mt-0.5 size-4 shrink-0 text-surf-400" aria-hidden="true" />
                <span>
                  Serving Maui County
                  <br />
                  <span className="text-ocean-300/70">
                    Central · South · West · Upcountry · North Shore
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ocean-800 pt-6">
          <p className="rounded-md border border-dashed border-ocean-700 bg-ocean-900/60 px-3.5 py-2.5 text-xs leading-relaxed text-ocean-200">
            <span className="font-semibold text-white">Mockup —</span> this is a
            demonstration build for client review. Phone number, address,
            licence details and certifications are placeholders and must be
            replaced with verified information before launch.
          </p>

          <div className="mt-6 flex flex-col gap-2 text-xs text-ocean-300 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <p>Maui, Hawaiʻi</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

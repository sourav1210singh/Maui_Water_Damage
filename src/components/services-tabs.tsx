"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container, Section, Eyebrow } from "./ui";
import { Reveal, TextReveal } from "./motion";
import { Mark } from "./logo";
import { services, img, photo } from "@/lib/site";

/**
 * Presentation copy for each service, keyed by slug.
 *
 * Titles and the `live` flags are not repeated here. They come from
 * `services` in site.ts, which the footer, the schema and the nav also read.
 * Only the things that exist solely for this section live in this file.
 */
const detail: Record<
  string,
  { body: string; image: string; alt: string }
> = {
  "water-damage-restoration": {
    body: "Burst supply lines, roof leaks after a Kona storm, a washing-machine hose that let go while you were at work. Standing water comes out first, then we dry the structure itself, including the subfloor, the framing and the cavity behind the baseboard, and log readings from the same marked points every day until it reaches dry standard.",
    image: img.ceilingDamage,
    alt: "Water-stained and collapsing ceiling after a roof leak",
  },
  "mold-remediation": {
    body: "Here the clock runs closer to 48 hours than the 72 the mainland guides quote, because the humidity rarely drops far enough to stop it. Containment goes up before anything is disturbed, removal happens under negative air, and clearance is verified by an independent hygienist, so you end up holding a document rather than a reassurance.",
    image: img.mold,
    alt: "Black mold spreading across a ceiling corner",
  },
  "flood-cleanup": {
    body: "Upcountry runoff, blocked culverts, and the kind of rain that comes down a gulch faster than the ground can take it. Groundwater counts as Category 3 the moment it crosses the threshold, so it gets handled as contaminated from the start: extraction, removal of anything porous it soaked, then antimicrobial and drying.",
    image: img.stormRidge,
    alt: "Rain and mist rolling over a green ridge above a tiled roof",
  },
  "sewage-cleanup": {
    body: "Backed-up mains, failed lift stations, septic that could not take the storm. Everything porous it touched comes out: carpet, pad, and drywall cut to a line above the water. What stays is cleaned and treated under containment while the crew works in full PPE. You get the rooms back, not a deodorised version of the problem.",
    image: img.pipes,
    alt: "Plumbing manifold running across a mechanical-room wall",
  },
  reconstruction: {
    body: "Drying is half the job. Drywall, texture, paint, flooring, trim and cabinetry go back by the same company that took them out, which means no three-week gap while a mitigation invoice and a rebuild bid argue with each other inside your claim.",
    image: img.rebuild,
    alt: "Kitchen under plastic sheeting during a rebuild",
  },
};

const tabs = services.map((s) => ({ ...s, ...detail[s.slug] }));

/**
 * The service list as one dark card with a tab strip.
 *
 * It replaced a grid of five cards. The grid forced every service to be
 * summarised in a sentence, which made four of them read as filler next to
 * the one that mattered; giving each its own panel means each gets a real
 * paragraph and a photograph, and the visitor still sees all five names at
 * once in the tab strip.
 */
export function ServicesTabs() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const uid = useId();
  const current = tabs[active];
  const href = current.live ? `/${current.slug}` : "/contact";

  return (
    <Section className="border-y border-sand-200 bg-white">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-sand-200 bg-sand-100 p-6 shadow-[0_24px_60px_-40px_rgba(8,20,26,0.3)] sm:p-8 lg:p-14">
            {/* Ghosted brand mark bleeding off the corner. Hidden on phones,
                where it would sit behind the heading rather than beside it.
                Light tone, now that the card is light: that variant fills its
                badge plate with sand-50, near enough to the card to disappear,
                which leaves just the droplet ghosted. The dark tone would put
                a soft dark square in the corner instead. */}
            <Mark
              tone="light"
              className="pointer-events-none absolute -right-12 -top-12 hidden size-52 select-none opacity-[0.12] sm:block lg:size-72"
            />

            <div className="relative max-w-3xl">
              <Eyebrow>What we do</Eyebrow>
              <TextReveal
                as="h2"
                text="Everything from the first bucket to the last coat of paint"
                className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-ocean-900 sm:text-[2.4rem] lg:text-[2.9rem]"
              />
              <Reveal delay={0.1}>
                <p className="mt-4 prose-measure text-[16px] leading-relaxed text-ink-700 lg:text-[17px]">
                  Mitigation and the rebuild under one contract, so there is no
                  gap between the company that dries your house and the company
                  that puts it back.
                </p>
              </Reveal>
            </div>

            <div
              className="relative mt-8 h-px w-full bg-sand-300 lg:mt-10"
              aria-hidden="true"
            />

            {/* Bleeds to the card edge on phones so the row reads as
                scrollable rather than as a list that has been cut off. */}
            <div
              role="tablist"
              aria-label="Services"
              className="relative -mx-6 mt-8 flex gap-3 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
            >
              {tabs.map((t, i) => {
                const on = i === active;
                return (
                  <button
                    key={t.slug}
                    type="button"
                    role="tab"
                    id={`${uid}-tab-${i}`}
                    aria-selected={on}
                    aria-controls={`${uid}-panel`}
                    onClick={() => setActive(i)}
                    className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 font-display text-[14px] font-semibold transition-all duration-300 ${
                      on
                        ? "bg-surf-500 text-ocean-950 shadow-[0_10px_25px_-12px_rgba(15,148,136,0.9)]"
                        : "border border-sand-300 bg-white text-ink-700 hover:border-ocean-800 hover:text-ocean-900"
                    }`}
                  >
                    {t.title}
                  </button>
                );
              })}
            </div>

            <div
              id={`${uid}-panel`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${active}`}
              className="relative mt-10 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12"
            >
              {/* Only the copy is keyed. Keying the whole panel remounted the
                  photograph too, which meant every tab change showed an empty
                  box for as long as the next image took to arrive. */}
              <div key={active} className="fade-swap order-2 lg:order-1">
                <h3 className="font-display text-[24px] font-bold tracking-tight text-ocean-900 lg:text-[30px]">
                  {current.title}
                </h3>
                <p className="mt-5 text-[16px] leading-relaxed text-ink-700 lg:text-[17px]">
                  {current.body}
                </p>
                <Link
                  href={href}
                  className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-ocean-800 px-5 py-3 font-display text-[15px] font-semibold text-sand-50 transition-colors duration-200 hover:bg-ocean-900"
                >
                  {current.live ? "How the process works" : "Talk to us about this"}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              {/* All five stay mounted and cross-fade, same as the process
                  panel does. Switching tabs is a hover-speed interaction and
                  nobody should watch a photograph download to do it. */}
              <div className="relative order-1 h-64 overflow-hidden rounded-2xl bg-sand-200 ring-1 ring-sand-300 sm:h-72 lg:order-2 lg:h-[420px]">
                {tabs.map((t, i) => (
                  <Image
                    key={t.slug}
                    src={photo(t.image, 1100)}
                    alt={t.alt}
                    fill
                    // A fixed width, not a vw fraction. Four of these five are
                    // transparent at load time, and the browser resolved their
                    // `sizes` before the box had a layout, so it fell back to
                    // the widest srcset candidate and started pulling 3840px
                    // JPEGs. The column is never wider than ~722px (1700 cap,
                    // less the gutters, card padding and the grid gap).
                    sizes="(min-width: 1024px) 740px, 100vw"
                    aria-hidden={i !== active}
                    className="object-cover transition-all duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transform:
                        reduced || i === active ? "scale(1)" : "scale(1.04)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

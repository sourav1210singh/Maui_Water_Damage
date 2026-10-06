"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  AlertTriangle,
  ArrowUpFromLine,
  Camera,
  Droplets,
  ZapOff,
  type LucideIcon,
} from "lucide-react";
import { Container, Section, Eyebrow } from "./ui";
import { Reveal, TextReveal } from "./motion";
import { site } from "@/lib/site";

type Step = {
  n: string;
  /** Short form used for the rotated spine label on a collapsed panel. */
  spine: string;
  title: string;
  body: string;
  /** Where to look / what to grab. Deliberately concrete, not adjectives. */
  tags: string[];
  icon: LucideIcon;
  image: string;
  alt: string;
  /** object-position. A collapsed panel is roughly a third the width of an
   *  expanded one, so each of these is set from what survives the narrow
   *  crop, not from what looks best in the full frame. */
  focus: string;
};

const steps: Step[] = [
  {
    n: "01",
    spine: "Shut it off",
    title: "Shut the water off",
    body: "The main is usually at the meter by the street or on the exterior wall; a supply line under a sink or behind the toilet has its own valve. If you cannot find it or cannot reach it safely, leave it and call us.",
    tags: ["Meter at the street", "Exterior wall", "Under the sink"],
    icon: Droplets,
    image: "/media/steps/first-1.jpg",
    alt: "Lever shutoff valve on a water line against a house wall",
    focus: "55% 50%",
  },
  {
    n: "02",
    spine: "Kill the power",
    title: "Cut power to the wet rooms",
    body: "At the breaker, not at the wall switch — reaching for a switch or an outlet means putting your hand near a live contact in a room that is now conductive. If the panel itself is wet, stay out and call an electrician first.",
    tags: ["Breaker panel", "Not the wall switch", "Dry hands, dry floor"],
    icon: ZapOff,
    image: "/media/steps/first-2.jpg",
    alt: "Worker in a cap reaching into an open breaker panel",
    focus: "62% 55%",
  },
  {
    n: "03",
    spine: "Lift it up",
    title: "Lift what you can off the floor",
    body: "Rugs, electronics, anything made of cloth or paper. Put furniture legs up on blocks or squares of foil, because a wet wooden leg will bleed its stain down into damp carpet within hours and that mark does not come out.",
    tags: ["Rugs", "Electronics", "Paper and cloth", "Blocks under legs"],
    icon: ArrowUpFromLine,
    image: "/media/steps/first-3.jpg",
    alt: "Woman lifting framed pictures and boxes clear of a living-room floor",
    focus: "55% 45%",
  },
  {
    n: "04",
    spine: "Photograph it",
    title: "Photograph everything first",
    body: "A wide shot of each affected room, then close-ups of the damage, before anything gets moved or mopped. Adjusters pay for what they can see, and this is the step almost everyone skips in the first panicked ten minutes.",
    tags: ["Wide shot per room", "Close-ups of damage", "Before you move it"],
    icon: Camera,
    image: "/media/steps/first-4.jpg",
    alt: "Hand holding a phone up to photograph a room",
    focus: "56% 52%",
  },
];

/**
 * The four things worth doing before a crew can physically get there.
 *
 * Laid out as a horizontal accordion on desktop: four panels share one row,
 * and the one under the cursor takes 2.6 shares of the width while the rest
 * hold 1 each. Widths are driven by flex-grow rather than percentages so the
 * four always total exactly the row at every frame of the animation —
 * interpolating four independent percentages lets them drift apart and opens
 * a seam mid-transition.
 *
 * Below lg the whole conceit is dropped. Four 230px columns on a phone is
 * unreadable, so it becomes a plain stack of cards with everything already
 * open, and none of the accordion CSS applies.
 */
export function FirstSteps() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const uid = useId();

  return (
    <Section className="bg-sand-50">
      <Container>
        <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <div>
            <Reveal direction="none">
              <Eyebrow>Before we get there</Eyebrow>
            </Reveal>
            <TextReveal
              as="h2"
              text="Water coming in right now? Do these four things."
              className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-ocean-900 sm:text-[2.6rem] lg:text-[3.1rem]"
            />
          </div>

          <div className="lg:pb-1.5">
            <Reveal delay={0.1}>
              <p className="prose-measure text-[15px] leading-relaxed text-ink-700">
                None of it requires us, all of it reduces what the repair ends
                up costing you, and you can work through it while you wait.
              </p>
            </Reveal>
            <Reveal
              delay={0.16}
              className="mt-5 flex items-start gap-2.5 rounded-lg border border-alert-500/25 bg-alert-400/8 p-4"
            >
              <AlertTriangle
                className="mt-0.5 size-4 shrink-0 text-alert-600"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-ink-700">
                If the ceiling is sagging or bulging, stay out of that room.
                Trapped water is heavy and ceilings come down without warning.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.08} className="mt-12">
          <ol className="flex flex-col gap-2.5 lg:h-[540px] lg:flex-row xl:h-[600px]">
            {steps.map((step, i) => {
              const on = i === active;
              const Icon = step.icon;
              const bodyId = `${uid}-step-${i}`;

              return (
                <li
                  key={step.n}
                  className="fs-panel relative overflow-hidden rounded-[22px] bg-ocean-950 text-white lg:cursor-pointer"
                  // Hover drives it for mice. Focus does the same job a few
                  // lines down, so Tab walks the panels the same way.
                  onMouseEnter={() => setActive(i)}
                  style={
                    {
                      "--fs-grow": on ? "2.6" : "1",
                      "--fs-filter": on
                        ? "none"
                        : "saturate(0.5) brightness(0.82)",
                    } as React.CSSProperties
                  }
                >
                  {/* Image band on phones, full bleed behind everything on
                      desktop. Layering is plain DOM order — this block first,
                      the copy after it with `relative`. A negative z-index on
                      this wrapper looked tidier but painted it underneath the
                      panel's own background colour and the photographs simply
                      never appeared. */}
                  <div className="relative h-48 sm:h-56 lg:absolute lg:inset-0 lg:h-auto">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        objectPosition: step.focus,
                        transform: !reduced && on ? "scale(1.05)" : "scale(1)",
                      }}
                    />
                    {/* Heavier than the reference's gradient on purpose — at
                        0.85/0.1 the body copy sat on top of a sunlit frame and
                        failed contrast. These stops hold it legible on all
                        four photographs. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(4,26,35,0.94) 0%, rgba(4,26,35,0.72) 34%, rgba(4,26,35,0.28) 66%, rgba(4,26,35,0.15) 100%)",
                      }}
                    />
                  </div>

                  {/* Outlined while idle, filled once active — the number is
                      the only thing that reads from across the row when a
                      panel is down to its collapsed width. */}
                  <div
                    aria-hidden="true"
                    className="nums absolute right-5 top-4 font-display text-[2.6rem] font-extrabold leading-none tracking-[-0.04em] transition-colors duration-[600ms] lg:right-7 lg:top-6 lg:text-[3.6rem]"
                    style={
                      on
                        ? { color: "rgba(255,255,255,0.95)" }
                        : {
                            color: "transparent",
                            WebkitTextStroke: "1.5px rgba(255,255,255,0.5)",
                          }
                    }
                  >
                    {step.n}
                  </div>

                  {/* The spine label. Only exists while the panel is too
                      narrow to carry a horizontal title, and it duplicates
                      the h3 below, so it is hidden from assistive tech. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-display text-[1.35rem] font-extrabold tracking-tight transition-opacity duration-[400ms] lg:block"
                    style={{
                      writingMode: "vertical-rl",
                      rotate: "180deg",
                      opacity: on ? 0 : 1,
                    }}
                  >
                    {step.spine}
                  </span>

                  {/* The whole block fades, not just the body — a collapsed
                      panel is far too narrow to hold the horizontal title, and
                      leaving it behind ran it straight through the spine
                      label and out past the panel edge. */}
                  <div
                    className="fs-inner relative px-6 pb-7 pt-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:px-7 lg:pb-8"
                    style={{ "--fs-op": on ? 1 : 0 } as React.CSSProperties}
                  >
                    <h3 className="flex items-center gap-3.5 font-display text-[1.35rem] font-extrabold leading-tight tracking-tight lg:whitespace-nowrap lg:text-[1.75rem]">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surf-500">
                        <Icon className="size-[22px]" aria-hidden="true" />
                      </span>
                      <button
                        type="button"
                        onFocus={() => setActive(i)}
                        onClick={() => setActive(i)}
                        aria-expanded={on}
                        aria-controls={bodyId}
                        className="text-left"
                      >
                        {step.title}
                      </button>
                    </h3>

                    <div
                      id={bodyId}
                      className="fs-body grid lg:grid-rows-[0fr] lg:opacity-0"
                      style={
                        {
                          "--fs-rows": on ? "1fr" : "0fr",
                          "--fs-op": on ? 1 : 0,
                        } as React.CSSProperties
                      }
                    >
                      <div className="overflow-hidden">
                        <p className="mb-4 mt-4 max-w-[46ch] text-[15px] leading-relaxed text-white/85">
                          {step.body}
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {step.tags.map((tag, t) => (
                            <li
                              key={tag}
                              className="fs-tag rounded-full border border-white/35 px-3 py-1 text-[13px] font-semibold"
                              style={
                                {
                                  "--fs-tag-t": on
                                    ? "none"
                                    : "translateY(10px)",
                                  "--fs-tag-delay": `${0.4 + t * 0.06}s`,
                                } as React.CSSProperties
                              }
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-700">
            Cannot find the shutoff?{" "}
            <a
              href={site.phoneHref}
              className="nums font-semibold text-ocean-900 underline decoration-surf-500 decoration-2 underline-offset-4 hover:text-surf-600"
            >
              Call {site.phone}
            </a>{" "}
            and we will walk you through it on the phone while the truck is
            already moving.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

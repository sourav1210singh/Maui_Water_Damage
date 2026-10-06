"use client";

import Image from "next/image";
import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container, Section, Eyebrow } from "./ui";
import { Reveal, TextReveal } from "./motion";

type Step = {
  n: string;
  title: string;
  body: string;
  image: string;
  /** 16:9 crop for the stacked mobile layout — using the 4:5 panel image
   *  there cropped it a second time and lost most of the frame. */
  imageWide: string;
  alt: string;
};

const steps: Step[] = [
  {
    n: "01",
    title: "You call",
    body: "A person answers, day or night, and gives you a real arrival time rather than a flattering one. If a ceiling is sagging we will tell you to stay out of that room before we hang up.",
    image: "/media/steps/step-1.jpg",
    imageWide: "/media/steps/step-1-wide.jpg",
    alt: "Technician loading equipment into a service van",
  },
  {
    n: "02",
    title: "We map the moisture",
    body: "Meters and a thermal camera find the water behind walls and under flooring, not just what is visible. Water travels — a leak at a shower pan routinely shows up two rooms away.",
    image: "/media/steps/step-2.jpg",
    imageWide: "/media/steps/step-2-wide.jpg",
    alt: "Technician setting down an air mover on a driveway",
  },
  {
    n: "03",
    title: "Extraction",
    body: "Standing water comes out first. This is the highest-value hour of the whole job: every gallon removed now is a gallon that does not have to be evaporated over the next four days.",
    image: "/media/steps/step-3.jpg",
    imageWide: "/media/steps/step-3-wide.jpg",
    alt: "Wet-vacuum wand drawing standing water off a hardwood floor",
  },
  {
    n: "04",
    title: "Drying and daily readings",
    body: "Air movers and dehumidifiers sized to the room, with moisture logged from the same marked points every day until the structure hits dry standard. You get told where things stand, daily.",
    image: "/media/steps/step-4.jpg",
    imageWide: "/media/steps/step-4-wide.jpg",
    alt: "Air movers running on a drying hardwood floor",
  },
  {
    n: "05",
    title: "Putting it back",
    body: "Once the structure is genuinely dry — measured, not assumed — we patch, texture, paint and put flooring and trim back. The goal is that you cannot tell where the damage was.",
    image: "/media/steps/step-5.jpg",
    imageWide: "/media/steps/step-5-wide.jpg",
    alt: "Restored living room, dry and back in order",
  },
];

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

export function ProcessSteps() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = steps[active];

  return (
    <Section className="bg-sand-50">
      <Container>
        <div className="max-w-2xl">
          <Reveal direction="none">
            <Eyebrow>What happens next</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            text="Five steps, and you will know where you are in them"
            className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-ocean-900 sm:text-[2.6rem] lg:text-[3.1rem]"
          />
          <Reveal delay={0.1}>
            <p className="prose-measure mt-4 text-[15px] leading-relaxed text-ink-700">
              Most of the stress in a water loss comes from not knowing what is
              supposed to happen. This is the whole job.
            </p>
          </Reveal>
        </div>

        {/* ───────── lg and up: rows + sticky panel ───────── */}
        <div className="mt-14 hidden gap-20 lg:grid lg:grid-cols-[1fr_460px]">
          <ul className="border-t border-sand-300">
            {steps.map((step, i) => {
              const on = i === active;
              return (
                <li key={step.n} className="border-b border-sand-300">
                  <button
                    type="button"
                    // Hover drives it for mice; focus does the same job for
                    // keyboards, so the panel tracks Tab as well as the cursor.
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="group flex w-full items-start gap-7 py-[26px] text-left"
                  >
                    <span
                      className={`nums mt-1.5 font-mono text-xs transition-colors duration-[260ms] ${
                        on ? "text-surf-600" : "text-ink-500/60"
                      }`}
                      style={{ transitionTimingFunction: EASE }}
                    >
                      {step.n}
                    </span>

                    <span className="flex-1">
                      <span
                        className={`block font-display font-bold tracking-tight text-ocean-900 transition-all duration-[260ms] ${
                          on
                            ? "text-[1.9rem] opacity-100"
                            : "text-[1.6rem] opacity-[0.42]"
                        }`}
                        style={{ transitionTimingFunction: EASE }}
                      >
                        {step.title}
                      </span>

                      {/* grid-rows 0fr→1fr animates height without a magic
                          max-height number that would clip longer copy. */}
                      <span
                        className="grid transition-[grid-template-rows] duration-[320ms]"
                        style={{
                          gridTemplateRows: on ? "1fr" : "0fr",
                          transitionTimingFunction: EASE,
                        }}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-[460px] pt-3 text-[15px] leading-relaxed text-ink-700">
                            {step.body}
                          </span>
                        </span>
                      </span>
                    </span>

                    <ArrowRight
                      aria-hidden="true"
                      className={`mt-2 size-5 shrink-0 transition-all duration-[260ms] ${
                        on
                          ? "translate-x-1.5 text-surf-600"
                          : "translate-x-0 text-ink-500/50"
                      }`}
                      style={{ transitionTimingFunction: EASE }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative">
            <div className="sticky top-[120px] aspect-[4/5] overflow-hidden rounded-[6px] bg-ocean-950">
              {steps.map((step, i) => (
                <Image
                  key={step.n}
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="460px"
                  className="object-cover transition-all duration-[420ms]"
                  style={{
                    transitionTimingFunction: EASE,
                    opacity: i === active ? 1 : 0,
                    transform:
                      reduced || i === active ? "scale(1)" : "scale(1.05)",
                  }}
                />
              ))}

              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85), transparent 42%)",
                }}
                aria-hidden="true"
              />

              <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-4">
                <span className="nums font-mono text-xs text-white/70">
                  {current.n}
                </span>
                <span className="font-display text-[15px] font-semibold text-white">
                  {current.title}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ───────── below lg: stacked, nothing hidden ───────── */}
        <ul className="mt-10 space-y-10 lg:hidden">
          {steps.map((step) => (
            <li key={step.n}>
              <Reveal>
                <div className="relative aspect-[16/9] overflow-hidden rounded-[6px] bg-ocean-950">
                  <Image
                    src={step.imageWide}
                    alt={step.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="nums font-mono text-xs text-surf-600">
                    {step.n}
                  </span>
                  <h3 className="font-display text-[1.4rem] font-bold tracking-tight text-ocean-900">
                    {step.title}
                  </h3>
                </div>
                <p className="prose-measure mt-2 text-[15px] leading-relaxed text-ink-700">
                  {step.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

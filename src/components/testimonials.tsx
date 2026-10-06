"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Container, Section, Eyebrow } from "./ui";
import { Reveal, TextReveal } from "./motion";

/**
 * PLACEHOLDER CONTENT. Every quote and name below is written, not collected.
 *
 * They are here so the client can see the block in position and judge the
 * layout. All six must be replaced with real reviews before this site goes
 * live, and the replacements should be pulled from the Google Business
 * Profile so they can be verified.
 *
 * Deliberately not marked up as Review or AggregateRating JSON-LD. Fabricated
 * reviews in structured data are what Google issues manual actions for, and a
 * penalty picked up during a mockup would follow the real domain. Once these
 * are real, the schema can go in. See schema.tsx, where the builder was left
 * out for the same reason.
 *
 * No star ratings and no avatars, for the same reason: we have neither.
 */
type Testimonial = {
  quote: string;
  name: string;
  town: string;
  job: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Pipe let go in the upstairs bathroom at about eleven at night. They said forty-five minutes and were here in forty. What I did not expect was being told to stay out of the room below because the ceiling was holding water. I would have walked straight under it.",
    name: "Keoni L.",
    town: "Kīhei",
    job: "Burst supply line",
  },
  {
    quote:
      "Three quotes, and theirs was the only one that put the drying time in writing. Five days, and it was five days. The equipment is deafening, but they warned us about that too.",
    name: "Marissa T.",
    town: "Wailuku",
    job: "Washing machine failure",
  },
  {
    quote:
      "Our adjuster asked for daily moisture logs and I had no idea what that meant. They had already been sending them. The claim went through without a single follow-up question.",
    name: "David K.",
    town: "Makawao",
    job: "Roof leak, two rooms",
  },
  {
    quote:
      "Honestly, they talked us out of claiming. The repair came in under our deductible and they said a claim on record was not worth it for that. Did the work anyway, same week.",
    name: "Anne P.",
    town: "Pāʻia",
    job: "Dishwasher leak",
  },
  {
    quote:
      "Found mold behind the baseboard that I could not see. They sealed the room off before touching it and had an independent tester come out afterwards. That report is what sold the condo six months later.",
    name: "Reid M.",
    town: "Kāʻanapali",
    job: "Mold, under-sink leak",
  },
  {
    quote:
      "Water came down the gulch and into the garage. They were on another job and told me straight that it would be four hours, not one. That honesty was worth more to me than a fast answer that was not true.",
    name: "Lehua S.",
    town: "Haʻikū",
    job: "Storm runoff",
  },
];

/** Matches the gap-5 on the track; used to work out one card's scroll step. */
const GAP = 20;

export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  /** Thumb width as a fraction of the rail, and how far along it sits. */
  const [ratio, setRatio] = useState(1);
  const [progress, setProgress] = useState(0);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
    setRatio(el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1);
    setProgress(max > 1 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    measure();
    // Card widths are percentage-based, so the step and the rail both change
    // with the viewport.
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /**
   * Steps by exactly one card. Snap points are evenly spaced because every
   * card is the same width, so a plain scrollBy always lands on one.
   */
  function page(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + GAP : el.clientWidth;
    el.scrollBy({
      left: direction * step,
      behavior: reduced ? "auto" : "smooth",
    });
  }

  const arrow =
    "inline-flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30";

  return (
    <Section className="bg-ocean-950">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal direction="none">
              <Eyebrow onDark>In their words</Eyebrow>
            </Reveal>
            <TextReveal
              as="h2"
              text="The part of this page we cannot write ourselves"
              className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-[2.6rem] lg:text-[3.1rem]"
            />
            <Reveal delay={0.1}>
              <p className="prose-measure mt-4 text-[15px] leading-relaxed text-ocean-100 sm:text-base">
                Six jobs from the last few months, in the words of the people
                who made the call.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="flex gap-2.5">
            <button
              type="button"
              onClick={() => page(-1)}
              disabled={atStart}
              aria-label="Previous reviews"
              className={arrow}
            >
              <ArrowLeft className="size-4.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => page(1)}
              disabled={atEnd}
              aria-label="Next reviews"
              className={arrow}
            >
              <ArrowRight className="size-4.5" aria-hidden="true" />
            </button>
          </Reveal>
        </div>

        {/* One Reveal around the whole carousel rather than per card. The cards
            past the third are scrolled outside the viewport, so a per-card
            whileInView would leave them sitting at opacity 0 until they were
            paged into view, and the first thing you would see on pressing next is
            an empty card fading in. */}
        <Reveal delay={0.1} className="mt-12">
          {/* Scroll-snap rather than a transform carousel: touch swipe,
              trackpad and keyboard arrows all come free and native, it keeps
              working with JavaScript off, and the buttons below are only a
              convenience on top of it. Hence tabIndex and the region label:
              a scrollable box has to be reachable by keyboard. */}
          <ul
            ref={trackRef}
            onScroll={measure}
            tabIndex={0}
            role="region"
            aria-label="Customer reviews"
            // scroll-px has to match px. Without it a snap-start card aligns
            // to the padding edge, so the browser immediately scrolls the
            // track by the padding width and the first card can never sit at
            // the start, and the previous button stayed live on a fresh load.
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-12 lg:scroll-px-12 lg:px-12"
          >
            {testimonials.map((t) => (
              <li
                key={t.name}
                // 85% on phones leaves the next card peeking, which is the
                // clearest signal that the row scrolls.
                className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]"
              >
                <figure className="flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.04] p-7 transition-colors duration-300 hover:border-white/25">
                  <Quote
                    className="size-5 shrink-0 text-surf-400"
                    aria-hidden="true"
                  />
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-sand-200">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-white/12 pt-4">
                    <p className="font-display text-[15px] font-semibold text-white">
                      {t.name}
                    </p>
                    <p className="mt-1 text-[13px] text-ocean-300">
                      {t.town} · {t.job}
                    </p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          {/* Replaces dots. With three cards visible out of six, dots imply a
              page count that does not exist. The track scrolls by one card,
              not by a page. */}
          <div
            aria-hidden="true"
            className="mt-7 h-[3px] w-full overflow-hidden rounded-full bg-white/10"
          >
            <div
              className="h-full rounded-full bg-surf-400"
              style={{
                width: `${Math.min(ratio, 1) * 100}%`,
                transform: `translateX(${
                  progress * (100 / Math.max(Math.min(ratio, 1), 0.001) - 100)
                }%)`,
              }}
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

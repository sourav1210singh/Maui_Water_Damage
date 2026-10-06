"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Phone, ArrowUpRight, ChevronRight } from "lucide-react";
import { site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/* The card sits inset from the page edge, so its cut-out corner has to be
   filled with the page background exactly. Kept as a constant because the
   SVG masks need it as a literal fill. */
const PAGE_BG = "#fbf9f5"; // --color-sand-50

/**
 * Decides whether the background video is worth downloading at all.
 *
 * It is never mounted on small screens. 72% of this site's traffic is mobile,
 * mid-emergency, often on patchy island data, and a background video is pure
 * decoration to someone standing in water. Desktop gets the motion; phones get
 * the poster frame and a faster page. Also respects reduced-motion and the
 * browser's Save-Data hint.
 */
function useVideoAllowed() {
  const reduced = useReducedMotion();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const mq = window.matchMedia("(min-width: 768px)");
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const saveData = nav.connection?.saveData === true;

    const update = () => setAllowed(mq.matches && !saveData);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced]);

  return allowed;
}

export function HomeHero() {
  const showVideo = useVideoAllowed();
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <div className="w-full bg-sand-50 p-3 md:p-5">
      {/* From lg the box takes the footage's own 16:9 ratio, so object-cover
          has nothing left to crop and the whole frame is visible. It was
          running at 2.08:1 before, which cut 15% off the top and bottom and
          read as a zoomed-in video. max-h keeps it from overflowing a short
          laptop screen; below lg the box is content-driven and some crop is
          unavoidable, so object-position favours the lower half where the
          technician and the floor are. */}
      <section
        className="relative isolate flex min-h-[500px] w-full flex-col overflow-hidden rounded-[1.5rem] bg-ocean-950 sm:min-h-[560px] md:min-h-[620px] md:rounded-[3rem] lg:aspect-[16/9] lg:min-h-0 lg:max-h-[86vh]">
        {/* Poster is always rendered: it is the LCP element and paints
            immediately. The video, when allowed, layers over it. */}
        <Image
          src="/media/hero-crew-1600.jpg"
          alt="A restoration technician extracting standing water from a flooded living-room floor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_62%] lg:object-center"
        />

        {showVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            // preload="auto" rather than "none": laziness is already handled by
            // only mounting this element at all on desktop, and pairing "none"
            // with autoPlay is contradictory. It can leave the first frame
            // stalled instead of playing.
            preload="auto"
            poster="/media/hero-crew-1600.jpg"
            className="absolute inset-0 size-full object-cover object-[50%_62%] lg:object-center"
          >
            <source src="/media/hero-crew.mp4" type="video/mp4" />
          </video>
        )}

        {/* Scrim. The previous pass put grey text straight onto bright footage
            and the headline vanished at 375px, so this carries the contrast. */}
        {/* Two light layers instead of one heavy one. The flat 0.72/0.58/0.82
            wash was dimming the footage far more than the text needed; this
            drops it to roughly half and puts the contrast where it is actually
            required, a soft pool under the copy, so the video stays bright
            everywhere else. */}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,26,35,0.46)_0%,rgba(4,26,35,0.26)_45%,rgba(4,26,35,0.60)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_62%_54%_at_50%_40%,rgba(4,26,35,0.50)_0%,rgba(4,26,35,0.18)_55%,rgba(4,26,35,0)_78%)]"
          aria-hidden="true"
        />

        {/* pb clears the cut-out corner panel at the bottom-right. The stat
            card is not a factor on mobile because it is hidden there. See
            below. */}
        <div className="relative z-10 flex w-full flex-1 flex-col items-center px-6 pb-24 pt-10 text-center sm:pb-32 sm:pt-14 md:pt-16 lg:pt-20">
          <motion.div
            data-reveal=""
            {...rise(0)}
            className="mb-5 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
          >
            <span className="relative flex size-2">
              {!reduced && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-surf-400 opacity-70" />
              )}
              <span className="relative inline-flex size-2 rounded-full bg-surf-400" />
            </span>
            <span className="text-[14px] font-medium text-white">
              Dispatching now, 24 hours a day
            </span>
          </motion.div>

          <motion.h1
            data-reveal=""
            {...rise(0.08)}
            className="max-w-4xl font-display text-[2.1rem] font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[4rem]"
          >
            Water damage restoration on Maui, at any hour
          </motion.h1>

          <motion.p
            data-reveal=""
            {...rise(0.16)}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-ocean-100 sm:text-lg"
          >
            Burst pipe, roof leak, a hose that let go while you were out. We
            answer at 2am and start pulling water out on the same visit.
          </motion.p>

          <motion.div
            data-reveal=""
            {...rise(0.24)}
            className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          >
            <a
              href={site.phoneHref}
              className="nums inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-alert-600 px-7 py-4 font-display text-base font-semibold text-white shadow-lift transition-transform duration-200 hover:scale-[1.02] active:scale-100 sm:w-auto"
            >
              <Phone className="size-5" aria-hidden="true" />
              Call {site.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-4 font-display text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:w-auto"
            >
              Tell us what happened
            </Link>
          </motion.div>
        </div>

        {/* Floating stat card. Hidden below sm: at 375px it sat directly on
            top of the secondary CTA. A decorative stat does not get to cover a
            call-to-action on the screen size that produces most of the calls. */}
        <motion.div
          data-reveal=""
          initial={reduced ? undefined : { x: -18, opacity: 0 }}
          animate={reduced ? undefined : { x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="absolute bottom-6 left-4 z-10 hidden w-fit min-w-[150px] flex-col gap-2.5 rounded-[1.4rem] border border-white/15 bg-white/10 p-4 backdrop-blur-xl sm:flex md:left-6 md:rounded-[1.8rem] md:p-5 lg:bottom-10 lg:left-10"
        >
          <div className="flex flex-col">
            <span className="nums font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              24–48h
            </span>
            <span className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-ocean-200">
              Before mold starts
            </span>
          </div>
          <Link
            href="/water-damage-restoration"
            className="group flex items-center gap-2 self-start rounded-full bg-white py-1.5 pl-1.5 pr-4 transition-colors hover:bg-white/90"
          >
            <span className="flex items-center justify-center rounded-full bg-ocean-900/10 p-1">
              <ArrowUpRight className="size-4 text-ocean-900 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="text-[13px] font-semibold text-ocean-900">
              Why it matters
            </span>
          </Link>
        </motion.div>

        {/* Faux-cutout corner. The two SVG masks fill the outside of the curve
            where the panel meets the card edge, so the join reads as one cut
            shape rather than a rectangle pasted on. */}
        <motion.div
          data-reveal=""
          initial={reduced ? undefined : { y: 18, opacity: 0 }}
          animate={reduced ? undefined : { y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.42, ease: EASE }}
          className="absolute bottom-0 right-0 z-10 flex items-center gap-3 rounded-tl-[1.5rem] bg-sand-50 p-3 pl-8 pt-5 sm:gap-4 sm:rounded-tl-[2rem] sm:p-4 sm:pl-10 sm:pt-6 md:gap-6 md:rounded-tl-[3.5rem] md:p-6 md:pl-14 md:pt-8"
        >
          <div className="pointer-events-none absolute -top-[1.5rem] right-0 size-[1.5rem] sm:-top-[2rem] sm:size-[2rem] md:-top-[3.5rem] md:size-[3.5rem]">
            <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" fill={PAGE_BG} />
            </svg>
          </div>
          <div className="pointer-events-none absolute bottom-0 -left-[1.5rem] size-[1.5rem] sm:-left-[2rem] sm:size-[2rem] md:-left-[3.5rem] md:size-[3.5rem]">
            <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" fill={PAGE_BG} />
            </svg>
          </div>

          <Link
            href="/water-damage-restoration-cost-maui"
            className="group flex items-center gap-3 sm:gap-4 md:gap-6"
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-ocean-900/10 bg-ocean-900/5 transition-colors group-hover:bg-ocean-900/10 md:size-14">
              <ArrowUpRight className="size-5 text-ocean-800 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:size-6" />
            </span>
            <span className="flex flex-col text-left">
              <span className="font-display text-[16px] font-semibold text-ocean-900 md:text-[20px]">
                What it costs
              </span>
              <span className="flex items-center gap-1 text-ink-500 transition-colors group-hover:text-ocean-800">
                <span className="text-[12px] md:text-[15px]">
                  Full Maui breakdown
                </span>
                <ChevronRight className="size-3 md:size-4" />
              </span>
            </span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

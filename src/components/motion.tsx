"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  type Variants,
} from "motion/react";
import { createElement, useRef, type ReactNode } from "react";

/**
 * Animation primitives.
 *
 * House rules for this site:
 *  - Nothing animates for longer than ~700ms. Someone is standing in water.
 *  - Nothing moves more than 24px. Big travel reads as decoration.
 *  - Everything runs once. Re-animating on scroll-back is nauseating.
 *  - Every component honours prefers-reduced-motion by rendering statically.
 *  - Every wrapper carries data-reveal, which the <noscript> rule in the root
 *    layout forces visible, so a JS-less visitor never sees a blank section.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Motion components are resolved from this table rather than built with
 * motion.create() inside a render. Creating a component during render hands
 * React a new component type every pass, which remounts the subtree and
 * re-fires animations, and React's lint rules correctly flag it.
 */
const MOTION_TAGS = {
  div: motion.div,
  span: motion.span,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  p: motion.p,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  dl: motion.dl,
  dt: motion.dt,
  dd: motion.dd,
} as const;

type MotionTag = keyof typeof MOTION_TAGS;

/* ────────────────────────── Reveal ────────────────────────── */

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 22 },
  down: { x: 0, y: -22 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  as?: MotionTag;
}) {
  const reduced = useReducedMotion();
  const from = offsets[direction];
  const MotionTag = MOTION_TAGS[as];

  if (reduced) return createElement(as, { className }, children);

  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, x: from.x, y: from.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/* ────────────────────────── Stagger ────────────────────────── */

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** Wrap a grid or list; every <StaggerItem> inside animates in sequence. */
export function Stagger({
  children,
  className = "",
  as = "div",
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  if (reduced) return createElement(as, { className }, children);

  return (
    <MotionTag
      data-reveal=""
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
}) {
  const reduced = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  if (reduced) return createElement(as, { className }, children);

  return (
    <MotionTag data-reveal="" className={className} variants={staggerChild}>
      {children}
    </MotionTag>
  );
}

/* ───────────────────────── TextReveal ───────────────────────── */

/**
 * Headline reveal. Each word rises out from behind a mask.
 *
 * The whole string is exposed to assistive tech via aria-label on the wrapper
 * and the word spans are hidden, so a screen reader reads one clean sentence
 * rather than a stream of disconnected words.
 */
export function TextReveal({
  text,
  className = "",
  as = "h2",
  delay = 0,
  stagger = 0.045,
  trigger = "view",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  stagger?: number;
  /** "mount" for above-the-fold headlines that should not wait for scroll. */
  trigger?: "view" | "mount";
}) {
  const reduced = useReducedMotion();

  if (reduced) return createElement(as, { className }, text);

  const words = text.split(" ");
  const triggerProps =
    trigger === "mount"
      ? { animate: "show" as const }
      : {
          whileInView: "show" as const,
          viewport: { once: true, margin: "-60px" },
        };

  return createElement(
    as,
    { className, "aria-label": text },
    <motion.span
      data-reveal=""
      aria-hidden="true"
      className="inline"
      initial="hidden"
      {...triggerProps}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          // inline-flex + clip is what creates the mask the word rises from
          className="inline-flex overflow-hidden whitespace-pre align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "105%" },
              show: { y: "0%", transition: { duration: 0.62, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ────────────────────────── Parallax ────────────────────────── */

/**
 * Scroll-linked vertical drift. Used on hero imagery only.
 * `distance` is total travel in pixels across the element's scroll range,
 * keep it small, because a background that moves faster than the eye expects
 * reads as a broken sticky element rather than depth.
 */
export function Parallax({
  children,
  distance = 70,
  className = "",
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="size-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/* ──────────────────────── ImageReveal ──────────────────────── */

/**
 * Image settles in from a slight scale-up behind a wipe.
 *
 * Driven by useInView and a CSS transition rather than `whileInView`, which
 * is what everything else here uses. Motion 14 could not resolve the
 * `clipPath` keyframes on this element: it left the element parked on its
 * `initial` and stalled every other property on the same node with it, so
 * the image box rendered permanently blank. CSS interpolates clip-path
 * natively, and the reduced-motion block in globals.css already neutralises
 * the transition, so nothing is lost by moving it out of Motion.
 */
export function ImageReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });

  if (reduced) return <div className={className}>{children}</div>;

  const EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    // The observed element is this one, and it is never clipped. Putting the
    // wipe here instead deadlocks the whole thing: a clip-path of
    // inset(0 0 100%) leaves the element with zero painted area, so
    // IntersectionObserver reports ratio 0 and never reports it as in view, so
    // the clip never opens. It stays blank forever.
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        data-reveal=""
        className="size-full"
        style={{
          clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
          transform: inView ? "scale(1)" : "scale(1.06)",
          transition: `clip-path 900ms ${EASE_CSS} ${delay}s, transform 1100ms ${EASE_CSS} ${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ───────────────────────── HeroIntro ───────────────────────── */

/**
 * Entrance for above-the-fold hero content. Runs on mount rather than on
 * scroll, and is deliberately the fastest animation on the site. The call
 * button must not feel withheld.
 */
export function HeroIntro({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

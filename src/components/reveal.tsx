"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * A single, restrained entrance animation.
 *
 * Deliberately understated: someone arrives here with water coming through
 * a ceiling. Nothing on this site should delay them reading or tapping.
 * 16px of travel, 400ms, once. No parallax, no scroll-jacking, no stagger
 * long enough to notice. Respects prefers-reduced-motion via globals.css.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      // data-reveal pairs with a <noscript> rule in the root layout. Without
      // it, the server-rendered markup carries inline opacity:0 and anyone
      // without JS sees permanently blank cards.
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

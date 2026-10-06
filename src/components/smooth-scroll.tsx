"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/* matchMedia is an external store, so it is read with useSyncExternalStore
   rather than useEffect + setState. The effect version causes a cascading
   render on mount and React's lint rules flag it. */
function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

/**
 * Lenis smooth scrolling.
 *
 * Two things worth knowing:
 *
 * 1. `scroll-behavior: smooth` must NOT be set on <html> at the same time —
 *    the two fight each other and produce a stutter. It has been removed from
 *    globals.css; Lenis handles scrolling instead.
 *
 * 2. Reduced motion is respected properly. Rather than unmounting the provider
 *    (which would remount the whole tree), Lenis stays in place and wheel
 *    smoothing is switched off, falling back to native scrolling. Vestibular
 *    disorders are a real accessibility concern and smooth scroll is one of
 *    the worst offenders.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return (
    <ReactLenis
      root
      options={{
        // Slightly quicker than Lenis' default: this is an emergency services
        // site, and scrolling should feel smooth without feeling sluggish.
        duration: 1.05,
        lerp: 0.1,
        smoothWheel: !reduced,
        syncTouch: false, // native touch scrolling stays native on mobile
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}

"use client";

import { useRef, useState, type MouseEvent } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/schema";

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

/**
 * Still a native <details>, so the answer text sits in the HTML for crawlers
 * and the toggle keeps working with no JavaScript at all.
 *
 * Native <details> cannot be transitioned — it snaps. So when JS is available
 * the default toggle is intercepted and the panel height is animated with the
 * Web Animations API instead, then the open attribute is committed at the end.
 * Under prefers-reduced-motion the interception is skipped entirely and the
 * browser's instant toggle is left alone.
 */
function FaqItem({ item }: { item: Faq }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const anim = useRef<Animation | null>(null);
  // Drives the icon separately from the `open` attribute: on close, `open`
  // has to stay true until the animation ends, but the icon should turn
  // immediately or it lags behind the panel.
  const [expanded, setExpanded] = useState(false);

  function onToggle(e: MouseEvent<HTMLElement>) {
    const details = detailsRef.current;
    const panel = panelRef.current;
    if (!details || !panel) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setExpanded(!details.open);
      return; // let the browser do its instant thing
    }

    e.preventDefault();
    anim.current?.cancel();

    const opening = !details.open;
    // The panel has to be rendered before it can be measured.
    if (opening) details.open = true;
    setExpanded(opening);

    const full = panel.scrollHeight;
    anim.current = panel.animate(
      [
        { height: `${opening ? 0 : full}px`, opacity: opening ? 0 : 1 },
        { height: `${opening ? full : 0}px`, opacity: opening ? 1 : 0 },
      ],
      { duration: opening ? 320 : 240, easing: EASE }
    );

    anim.current.onfinish = () => {
      if (!opening) details.open = false;
      panel.style.height = "";
      anim.current = null;
    };
  }

  return (
    <details ref={detailsRef} className="group py-1">
      <summary
        onClick={onToggle}
        className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left [&::-webkit-details-marker]:hidden"
      >
        <h3 className="font-display text-[17px] font-semibold leading-snug text-ocean-900">
          {item.q}
        </h3>
        <Plus
          aria-hidden="true"
          className={`mt-0.5 size-5 shrink-0 text-surf-600 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            expanded ? "rotate-45" : ""
          }`}
        />
      </summary>

      {/* overflow-hidden is what makes the height animation read as a reveal
          rather than the text sliding out of its own box. */}
      <div ref={panelRef} className="overflow-hidden">
        <p className="prose-measure pb-5 pr-9 text-[15px] leading-relaxed text-ink-700">
          {item.a}
        </p>
      </div>
    </details>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-sand-300 border-y border-sand-300">
      {items.map((item) => (
        <FaqItem key={item.q} item={item} />
      ))}
    </div>
  );
}

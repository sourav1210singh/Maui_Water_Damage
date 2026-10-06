import { Plus } from "lucide-react";
import type { Faq } from "@/lib/schema";

/**
 * Built on native <details>/<summary> rather than a JS accordion.
 *
 * Two reasons, both deliberate:
 *  1. Answer text stays in the HTML whether or not it is expanded, so
 *     crawlers and LLMs can read every answer. A JS accordion that mounts
 *     content on click can hide it from exactly the engines we want citing us.
 *  2. It works with no JavaScript and is keyboard-accessible for free.
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-sand-300 border-y border-sand-300">
      {items.map((item) => (
        <details key={item.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-[17px] font-semibold leading-snug text-ocean-900">
              {item.q}
            </h3>
            <Plus
              className="mt-0.5 size-5 shrink-0 text-surf-600 transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <div className="pb-5 pr-9">
            <p className="text-[15px] leading-relaxed text-ink-700">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

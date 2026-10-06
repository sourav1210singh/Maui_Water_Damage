import { Phone } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Fixed bottom call bar — mobile only.
 *
 * 72% of restoration leads arrive on mobile during the emergency itself,
 * so the single most important control on the site sits in the thumb zone
 * at the bottom of the screen, not buried in a header menu.
 */
export function EmergencyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-alert-700/40 bg-alert-600 md:hidden">
      <a
        href={site.phoneHref}
        className="flex items-center justify-center gap-2.5 px-4 py-3.5 text-white active:bg-alert-700"
        aria-label={`Call ${site.name} now on ${site.phone}`}
      >
        <Phone className="size-5 shrink-0" aria-hidden="true" />
        <span className="font-display text-[15px] font-semibold tracking-tight">
          Call now — 24/7
        </span>
        <span className="nums text-[15px] font-medium opacity-90">
          {site.phone}
        </span>
      </a>
    </div>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceAreas } from "@/lib/site";

const pill =
  "group inline-flex shrink-0 items-center gap-2 rounded-full border border-sand-300 bg-white px-4 py-2 font-display text-[14px] font-semibold text-ocean-800 transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:border-ocean-800 hover:bg-ocean-800 hover:text-sand-50 hover:shadow-card";

/**
 * One pass of the ten towns.
 *
 * The second pass is what makes the loop seamless, and it is a duplicate of
 * real content, so it is hidden from assistive tech and taken out of the tab
 * order. Without that a screen reader announces twenty towns and the keyboard
 * stops at the same link twice.
 */
function Towns({ clone = false }: { clone?: boolean }) {
  return (
    <ul
      aria-hidden={clone || undefined}
      className="flex shrink-0 items-center gap-2.5 pr-2.5"
    >
      {serviceAreas.map((area) => (
        <li key={area.slug}>
          {area.slug === "kihei" ? (
            <Link
              href={`/service-areas/${area.slug}`}
              className={pill}
              tabIndex={clone ? -1 : undefined}
            >
              {area.name}
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 text-surf-600 transition-all duration-[250ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-surf-400"
              />
            </Link>
          ) : (
            <span className={pill}>{area.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * The ten service-area towns on one continuously moving row.
 *
 * They used to wrap onto two lines. A single row cannot hold ten towns at any
 * width this column reaches, so the row moves instead.
 *
 * The region label that used to slide out of each pill on hover is gone. It
 * changed the pill's width, which reflowed the whole track and shunted every
 * other town sideways mid-scroll.
 */
export function TownMarquee() {
  return (
    <div className="town-marquee mt-8">
      <div className="town-marquee__track">
        <Towns />
        <Towns clone />
      </div>
    </div>
  );
}

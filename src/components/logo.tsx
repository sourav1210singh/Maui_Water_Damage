/**
 * Brand lockup: mark + wordmark.
 *
 * The mark is a droplet drawn as an outline with a filled waterline inside it,
 * rather than a solid blob. That reads as water held at a controlled level,
 * which is literally the job — mitigation is about stopping water where it is
 * and drying back to a measured standard. The wave sits slightly below centre
 * so the shape still reads as a droplet at 24px rather than a filled circle.
 *
 * No clipPath or gradient is used anywhere, deliberately: this mark renders
 * twice on every page (header and footer) and duplicated SVG element ids are a
 * classic source of one instance rendering blank. Every path here is
 * self-contained geometry.
 */

type Tone = "dark" | "light";

export function Mark({ tone, className = "" }: { tone: Tone; className?: string }) {
  // The badge carries the mark's weight. An outline-only droplet thinned out
  // and nearly vanished at favicon and small-header sizes; a solid plate holds
  // its silhouette all the way down to 16px.
  const plate = tone === "light" ? "fill-sand-50" : "fill-ocean-900";
  const outline = tone === "light" ? "stroke-ocean-900" : "stroke-sand-50";
  const water = tone === "light" ? "fill-surf-500" : "fill-surf-400";

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="48" height="48" rx="12" className={plate} />
      <g transform="translate(9 8)">
        {/* Water, filled to a wave-topped line across the bulb. The arc traces
            the droplet's own lower circle so the fill sits flush inside the
            stroke at every size. */}
        <path
          d="M6.06 17.25q4.47-2.4 8.94 0t8.94 0A9 9 0 0 1 6.06 17.25Z"
          className={water}
        />
        {/* Droplet drawn last so its stroke sits cleanly over the water edge */}
        <path
          d="M15 2.25c5.18 6.15 9 10.65 9 13.95a9 9 0 1 1-18 0c0-3.3 3.83-7.8 9-13.95Z"
          fill="none"
          className={outline}
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/**
 * Centred, mark-over-wordmark lockup. Used where the logo is the anchor of a
 * composition rather than a corner mark — currently the footer.
 */
export function LogoStacked({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  const name = tone === "light" ? "text-sand-50" : "text-ocean-900";
  const accent = tone === "light" ? "text-surf-400" : "text-surf-600";
  const tagline = tone === "light" ? "text-ocean-200" : "text-ink-500";
  const rule = tone === "light" ? "bg-ocean-300/40" : "bg-sand-400";

  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <Mark tone={tone} className="size-14" />
      <span className="mt-3.5 font-display text-[22px] leading-none font-bold tracking-[-0.02em] sm:text-[26px]">
        <span className={name}>Maui Water Damage</span>{" "}
        <span className={accent}>Pros</span>
      </span>
      <span className="mt-3 flex items-center gap-2.5">
        <span className={`h-px w-8 ${rule}`} aria-hidden="true" />
        <span
          className={`font-display text-[10px] font-semibold uppercase leading-none tracking-[0.2em] ${tagline}`}
        >
          24/7 Emergency Restoration
        </span>
        <span className={`h-px w-8 ${rule}`} aria-hidden="true" />
      </span>
    </span>
  );
}

export function Logo({
  className = "",
  tone = "dark",
  showTagline = true,
}: {
  className?: string;
  tone?: Tone;
  /** Tagline is hidden in tight spaces, e.g. the mobile header. */
  showTagline?: boolean;
}) {
  const name = tone === "light" ? "text-sand-50" : "text-ocean-900";
  const accent = tone === "light" ? "text-surf-400" : "text-surf-600";
  const tagline = tone === "light" ? "text-ocean-200" : "text-ink-500";
  const rule = tone === "light" ? "bg-ocean-300/50" : "bg-sand-400";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark tone={tone} className="size-8 shrink-0 sm:size-9" />

      {/* Steps down on small screens: inside the floating header pill at 375px
          the full-size lockup ate 241px of 351px, leaving the controls cramped
          against the edge. */}
      <span className="flex flex-col justify-center leading-none">
        <span className="font-display text-[15px] font-bold leading-[1.05] tracking-[-0.02em] sm:text-[17px]">
          <span className={name}>Maui Water Damage</span>{" "}
          <span className={accent}>Pros</span>
        </span>

        {showTagline && (
          <span className="mt-[5px] hidden items-center gap-1.5 sm:flex">
            <span className={`h-px w-4 ${rule}`} aria-hidden="true" />
            <span
              className={`font-display text-[9px] font-semibold uppercase leading-none tracking-[0.17em] ${tagline}`}
            >
              24/7 Emergency Restoration
            </span>
          </span>
        )}
      </span>
    </span>
  );
}

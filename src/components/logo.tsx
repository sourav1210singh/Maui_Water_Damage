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

function Mark({ tone, className = "" }: { tone: Tone; className?: string }) {
  const outline = tone === "light" ? "stroke-sand-50" : "stroke-ocean-900";
  const water = tone === "light" ? "fill-surf-400" : "fill-surf-500";

  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Water, filled to a wave-topped line across the bulb of the droplet.
          The arc traces the droplet's own lower circle (centre 20,21.6 r12)
          so the fill sits flush inside the outline at every size. */}
      <path
        d="M8.08 23q5.96-3.2 11.92 0t11.92 0A12 12 0 0 1 8.08 23Z"
        className={water}
      />
      {/* Droplet outline drawn last so it sits cleanly over the water edge */}
      <path
        d="M20 3c6.9 8.2 12 14.2 12 18.6a12 12 0 1 1-24 0C8 17.2 13.1 11.2 20 3Z"
        fill="none"
        className={outline}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
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

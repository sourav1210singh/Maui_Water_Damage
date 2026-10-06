/**
 * Wordmark. Custom-drawn rather than a stock icon — a droplet whose lower
 * half is a wave trough, which reads as both "water" and "island".
 */
export function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const mark = tone === "light" ? "#7fd4cc" : "#0f9488";
  const line1 = tone === "light" ? "#fbf9f5" : "#072834";
  const line2 = tone === "light" ? "#aed0dd" : "#14576f";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        className="size-8 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M16 2.5c5.4 6.2 9 10.9 9 15.1a9 9 0 1 1-18 0c0-4.2 3.6-8.9 9-15.1Z"
          fill={mark}
        />
        <path
          d="M7.4 19.8c2.1 0 2.1 2.1 4.3 2.1s2.1-2.1 4.3-2.1 2.1 2.1 4.3 2.1 2.1-2.1 4.3-2.1"
          fill="none"
          stroke={tone === "light" ? "#041a23" : "#fbf9f5"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-[17px] leading-none font-bold tracking-tight">
        <span style={{ color: line1 }}>Maui Water Damage</span>{" "}
        <span style={{ color: line2 }}>Pros</span>
      </span>
    </span>
  );
}

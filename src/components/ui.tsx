import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Page gutter.
 *
 * The cap is deliberately high (1700px) so the layout keeps filling the screen
 * on large desktops instead of stranding 200px of empty sand down each side.
 * Long-form prose is constrained separately at the block level — see the
 * `prose-measure` utility — because a 1600px-wide paragraph is unreadable even
 * though the grid above it looks fine at that width.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1700px] px-5 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  ...rest
}: ComponentProps<"section">) {
  return (
    <section className={`py-14 sm:py-20 ${className}`} {...rest}>
      {children}
    </section>
  );
}

/** Small uppercase label that sits above a section heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-surf-600">
      {children}
    </p>
  );
}

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "emergency" | "primary" | "ghost";
  className?: string;
  "aria-label"?: string;
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-display text-[15px] font-semibold tracking-tight transition-colors duration-150";

  const variants = {
    // Reserved strictly for actions that get the visitor help
    emergency: "bg-alert-600 text-white hover:bg-alert-700 active:bg-alert-700",
    primary: "bg-ocean-800 text-sand-50 hover:bg-ocean-900",
    ghost:
      "border border-ocean-800/25 bg-transparent text-ocean-900 hover:border-ocean-800/50 hover:bg-ocean-50",
  } as const;

  const cls = `${base} ${variants[variant]} ${className}`;
  const external = href.startsWith("tel:") || href.startsWith("mailto:");

  if (external) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Breadcrumbs({
  trail,
  tone = "light",
}: {
  trail: { name: string; path: string }[];
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-ocean-200" : "text-ink-500";
  const current = tone === "dark" ? "text-white" : "text-ocean-900";

  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className={`flex flex-wrap items-center gap-1.5 text-[13px] ${muted}`}>
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span className={`font-medium ${current}`} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="hover:underline">
                    {item.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

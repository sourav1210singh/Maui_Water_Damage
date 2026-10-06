"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { EmergencyBar } from "./emergency-bar";

/**
 * Hides the normal site chrome on full-bleed preview routes.
 *
 * The RIVR-style hero at /hero-preview carries its own navbar and fills the
 * viewport, so the real header sitting above it would make the design
 * impossible to judge. Keeping this as a path check rather than deleting the
 * chrome means the preview is non-destructive — the live hero is untouched.
 */
const BARE_ROUTES = ["/hero-preview"];

function useBareRoute() {
  const pathname = usePathname();
  return BARE_ROUTES.some((r) => pathname?.startsWith(r));
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  if (useBareRoute()) return <>{children}</>;

  return (
    <>
      <SiteHeader />
      {/* pb-20 on mobile keeps the fixed call bar from covering the footer */}
      <main id="main" className="pb-20 md:pb-0">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

/**
 * Rendered outside the Lenis provider in the root layout. The call bar is
 * position:fixed and is kept clear of the smooth-scroll wrapper so it can
 * never inherit a transform context, which would turn `fixed` into
 * `absolute` and send it scrolling off with the page.
 */
export function EmergencyBarSlot() {
  if (useBareRoute()) return null;
  return <EmergencyBar />;
}

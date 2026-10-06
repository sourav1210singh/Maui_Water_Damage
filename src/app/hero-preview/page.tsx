import type { Metadata } from "next";
import { Hero } from "@/components/rivr/Hero";

export const metadata: Metadata = {
  title: { absolute: "Hero preview — glassmorphism direction" },
  // Not a real page. Kept out of search and out of the sitemap.
  robots: { index: false, follow: false },
};

/**
 * Standalone preview of the glassmorphism / video hero direction.
 *
 * Deliberately a separate route rather than a replacement for the homepage
 * hero, so both can be compared side by side and nothing is lost if this
 * direction is rejected. The site header, footer and call bar are suppressed
 * here by SiteChrome, because this hero carries its own navbar and fills the
 * viewport.
 */
export default function HeroPreviewPage() {
  return (
    <main className="min-h-screen bg-[#f0f0f0] font-helvetica">
      <Hero />
    </main>
  );
}

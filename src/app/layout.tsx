import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { EmergencyBar } from "@/components/emergency-bar";
import { JsonLd, localBusinessSchema, organizationSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Maui Water Damage Pros | 24/7 Water Damage Restoration on Maui",
    template: "%s | Maui Water Damage Pros",
  },
  description:
    "Emergency water damage restoration across Maui. Water extraction, structural drying and mold prevention, 24 hours a day. Kīhei, Kahului, Wailuku, Lahaina and Upcountry.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: "Maui Water Damage Pros | 24/7 Water Damage Restoration",
    description:
      "Water coming in? We answer the phone at any hour and start drying the same day. Serving all of Maui.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${archivo.variable} ${inter.variable}`}>
      <head>
        {/* Scroll-reveal elements are server-rendered with inline opacity:0 and
            are only revealed by JS. Without this, a visitor with JS disabled or
            broken gets blank sections. Content is already in the HTML for
            crawlers either way — this is purely for humans. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ocean-900 focus:px-4 focus:py-2 focus:text-sand-50"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <SiteHeader />

          {/* pb-20 on mobile keeps the fixed call bar from covering the footer */}
          <main id="main" className="pb-20 md:pb-0">
            {children}
          </main>

          <SiteFooter />
        </SmoothScroll>

        {/* Outside the Lenis wrapper: position:fixed must not inherit a
            smooth-scroll transform context. */}
        <EmergencyBar />

        <JsonLd data={[localBusinessSchema(), organizationSchema()]} />
      </body>
    </html>
  );
}

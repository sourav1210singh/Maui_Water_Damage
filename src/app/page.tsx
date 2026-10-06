import Image from "next/image";
import {
  Phone,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { Container, Section, Eyebrow, Button } from "@/components/ui";
import {
  Reveal,
  Stagger,
  StaggerItem,
  TextReveal,
  ImageReveal,
} from "@/components/motion";
import { FaqList } from "@/components/faq";
import { HomeHero } from "@/components/home-hero";
import { FirstSteps } from "@/components/first-steps";
import { ProcessSteps } from "@/components/process-steps";
import { InsurancePacket } from "@/components/insurance-packet";
import { ServicesTabs } from "@/components/services-tabs";
import { Testimonials } from "@/components/testimonials";
import { TownMarquee } from "@/components/town-marquee";
import { JsonLd, faqSchema, type Faq } from "@/lib/schema";
import { site, img, photo } from "@/lib/site";

const faqs: Faq[] = [
  {
    q: "How fast can you get to me on Maui?",
    a: "We aim to be on site within an hour of your call for most of Maui, and we dispatch 24 hours a day. Central Maui and the South Shore are usually quickest; Upcountry, Hāna and the far West Side take longer depending on the road. We will tell you a realistic arrival time on the phone rather than a flattering one.",
  },
  {
    q: "Will my homeowners insurance cover water damage in Hawaii?",
    a: "Sudden, accidental water damage is generally covered: a burst pipe, a failed water heater, a supply hose letting go. Damage from long-term seepage, poor maintenance, or flooding from outside is usually not, and most Hawaii policies exclude mold entirely or cap it very low. We document everything from the first visit so your adjuster has what they need, and we will tell you honestly if we think a claim is unlikely to succeed.",
  },
  {
    q: "How long does drying take?",
    a: "Three to five days for a typical home, measured rather than guessed. We place moisture meters and monitor daily until readings match the dry standard for your building. Maui's humidity means drying here often takes a day or two longer than the same job would on the mainland, which is worth knowing before you book a contractor who promises 48 hours.",
  },
  {
    q: "How much does water damage restoration cost on Maui?",
    a: "Most Maui homes land between $1,500 and $6,000 for mitigation, meaning extraction, drying and monitoring. Larger or contaminated losses run higher. Island freight on materials and the extra drying time our humidity demands both push costs above mainland averages. Our full breakdown by severity is on the cost page.",
  },
  {
    q: "Do I have to move out while you dry the house?",
    a: "Usually not. Most drying work is confined to the affected rooms and you can live around it, though the equipment is loud and runs continuously. You would need to move out for a Category 3 loss involving sewage, or where containment seals off a bathroom or kitchen you cannot do without.",
  },
  {
    q: "What if mold has already started?",
    a: "Mold can take hold within 24 to 48 hours in Maui's climate, so by the time water damage is discovered it is often already present. Small areas are handled as part of the drying work. Anything larger is contained and remediated separately, with air testing afterwards to confirm the area is clear before we rebuild.",
  },
];


export default function HomePage() {
  return (
    <>
      {/* Hero lives in its own component now. Video/poster, scrim and the
          two floating cards are enough logic to not belong inline here. */}
      <HomeHero />

      {/* ──────────────────── Trust strip ──────────────────── */}
      <div className="border-b border-sand-200 bg-sand-100">
        <Container>
          <Stagger as="ul" className="grid grid-cols-2 divide-sand-300 sm:grid-cols-4 sm:divide-x">
            {site.credentials.map((c, i) => (
              <StaggerItem
                as="li"
                key={c.label}
                className={`flex items-start gap-2.5 py-4 sm:justify-center sm:py-5 ${
                  i % 2 === 0 ? "pr-3" : "pl-3 sm:pl-0"
                }`}
              >
                <ShieldCheck
                  className="mt-0.5 size-4 shrink-0 text-surf-600"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-display text-[13px] font-semibold leading-tight text-ocean-900">
                    {c.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-tight text-ink-500">
                    {c.detail}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </div>

      {/* ───────────── Help before selling: first 4 steps ───────────── */}
      <FirstSteps />

      <ServicesTabs />

      {/* ──────────────── The 48-hour mold argument ──────────────── */}
      <Section className="bg-ocean-950 text-sand-100">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <ImageReveal className="relative aspect-[4/3] rounded-card">
              <div className="relative size-full">
                <Image
                  src={photo(img.wallDamp, 1000)}
                  alt="Early mold blooming through paint on a damp interior wall"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ImageReveal>

            <div>
              <Reveal direction="none">
                <Eyebrow>Why the clock matters here</Eyebrow>
              </Reveal>
              <TextReveal
                as="h2"
                text="On Maui, mold starts in about 48 hours"
                className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-[2.6rem] lg:text-[3.1rem]"
              />
              <Reveal delay={0.12}>
                <p className="prose-measure mt-4 text-[15px] leading-relaxed text-ocean-100 sm:text-base">
                  Warm air that never really dries out is what makes this island
                  beautiful and what makes a water leak expensive. Mold can take
                  hold within 24 to 48 hours of a water event in this climate,
                  considerably faster than the mainland timelines most advice is
                  written for.
                </p>
                <p className="prose-measure mt-4 text-[15px] leading-relaxed text-ocean-100 sm:text-base">
                  It matters financially as well as structurally. Most Hawaii
                  homeowners policies exclude mold damage outright or cap it very
                  low, so what insurance would have covered as water damage on
                  day one can become your own bill by day three.
                </p>
              </Reveal>

              <Stagger
                as="dl"
                className="mt-8 grid grid-cols-3 gap-4 border-t border-ocean-800 pt-6"
              >
                {[
                  { k: "Mold begins", v: "24–48h" },
                  { k: "Typical drying", v: "3–5 days" },
                  { k: "We answer", v: "24/7" },
                ].map((stat) => (
                  <StaggerItem key={stat.k}>
                    <dt className="text-xs uppercase tracking-wider text-ocean-300">
                      {stat.k}
                    </dt>
                    <dd className="nums mt-1 font-display text-2xl font-bold text-surf-400">
                      {stat.v}
                    </dd>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Container>
      </Section>

      <ProcessSteps />

      {/* ─────────────────── Service areas ─────────────────── */}
      <Section className="border-y border-sand-200 bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* min-w-0: a grid item defaults to min-width:auto, so the
                max-content width of the marquee track pushed this column out
                to 1861px and burst the layout. */}
            <div className="min-w-0">
              <Reveal direction="none">
                <Eyebrow>Where we go</Eyebrow>
              </Reveal>
              <TextReveal
                as="h2"
                text="All of Maui, and we know the drive times"
                className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-ocean-900 sm:text-[2.6rem] lg:text-[3.1rem]"
              />
              <Reveal delay={0.1}>
                <p className="prose-measure mt-4 text-[15px] leading-relaxed text-ink-700">
                  Central Maui and the South Shore are usually quickest.
                  Upcountry and the West Side take longer, and we will say so on
                  the phone rather than quote you an arrival time we cannot keep.
                </p>
                <div className="mt-6">
                  <Button href="/service-areas/kihei" variant="ghost">
                    <MapPin className="size-4" aria-hidden="true" />
                    See the Kīhei page
                  </Button>
                </div>
              </Reveal>

              {/* Towns sit here rather than under the map: they are real
                  text, and nothing inside an iframe is crawlable. They are the
                  proximity signal this whole section exists for. */}
              <Reveal delay={0.16}>
                <TownMarquee />
              </Reveal>
            </div>

            <Reveal>
              {/* Keyless Google embed. No Maps API key is configured, so the
                  pins are Google's own place labels rather than branded
                  markers. Swapping in custom markers is a key away. */}
              <div className="overflow-hidden rounded-card border border-sand-300 bg-white shadow-card">
                <iframe
                  src="https://maps.google.com/maps?q=Maui,Hawaii&z=10&output=embed"
                  title="Map of Maui showing the areas we serve"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-[320px] w-full border-0 sm:h-[420px]"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <InsurancePacket />

      <Testimonials />


      {/* ─────────────────── FAQ ─────────────────── */}
      <Section className="border-t border-sand-200 bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Reveal direction="none">
                <Eyebrow>Common questions</Eyebrow>
              </Reveal>
              <TextReveal
                as="h2"
                text="The things people ask at 2am"
                className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-ocean-900 sm:text-[2.6rem] lg:text-[3.1rem]"
              />
              <Reveal delay={0.1}>
                <p className="prose-measure mt-4 text-[15px] leading-relaxed text-ink-700">
                  Still stuck? Call. We would rather talk you through it than
                  have you guess.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.08}>
              <FaqList items={faqs} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ─────────────────── Final CTA ─────────────────── */}
      <section className="bg-alert-600">
        <Container className="py-12 sm:py-16">
          <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-[1.6rem] font-bold leading-tight text-white sm:text-[2rem]">
                Still dripping? Call us now.
              </h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-white/90">
                Someone picks up, any hour. The sooner we start drying, the less
                comes out.
              </p>
            </div>
            <a
              href={site.phoneHref}
              className="nums inline-flex items-center gap-3 rounded-lg bg-white px-7 py-4 font-display text-lg font-bold tracking-tight text-alert-700 shadow-lift transition-transform duration-200 hover:scale-[1.03] active:scale-100"
            >
              <Phone className="size-5" aria-hidden="true" />
              {site.phone}
            </a>
          </Reveal>
        </Container>
      </section>

      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ShieldCheck,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  AlertTriangle,
  FileText,
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
import { ProcessSteps } from "@/components/process-steps";
import { JsonLd, faqSchema, type Faq } from "@/lib/schema";
import { site, serviceAreas, services, img, photo } from "@/lib/site";

const faqs: Faq[] = [
  {
    q: "How fast can you get to me on Maui?",
    a: "We aim to be on site within an hour of your call for most of Maui, and we dispatch 24 hours a day. Central Maui and the South Shore are usually quickest; Upcountry, Hāna and the far West Side take longer depending on the road. We will tell you a realistic arrival time on the phone rather than a flattering one.",
  },
  {
    q: "Will my homeowners insurance cover water damage in Hawaii?",
    a: "Sudden, accidental water damage — a burst pipe, a failed water heater, a supply hose letting go — is generally covered. Damage from long-term seepage, poor maintenance, or flooding from outside is usually not, and most Hawaii policies exclude mold entirely or cap it very low. We document everything from the first visit so your adjuster has what they need, and we will tell you honestly if we think a claim is unlikely to succeed.",
  },
  {
    q: "How long does drying take?",
    a: "Three to five days for a typical home, measured rather than guessed. We place moisture meters and monitor daily until readings match the dry standard for your building. Maui's humidity means drying here often takes a day or two longer than the same job would on the mainland, which is worth knowing before you book a contractor who promises 48 hours.",
  },
  {
    q: "How much does water damage restoration cost on Maui?",
    a: "Most Maui homes land between $1,500 and $6,000 for mitigation — extraction, drying and monitoring — with larger or contaminated losses running higher. Island freight on materials and the extra drying time our humidity demands both push costs above mainland averages. Our full breakdown by severity is on the cost page.",
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

const firstSteps = [
  {
    title: "Shut the water off, if you can do it safely",
    body: "Main shutoff is usually by the meter at the street or on the exterior wall. If you cannot find it or reach it safely, leave it and call us.",
  },
  {
    title: "Cut power to the wet rooms at the breaker",
    body: "Never stand in standing water to reach a switch or outlet. If the panel itself is wet, stay out and call an electrician first.",
  },
  {
    title: "Lift what you can off the floor",
    body: "Rugs, electronics, anything with cloth or paper. Put furniture legs on blocks or foil so the stain does not transfer into damp carpet.",
  },
  {
    title: "Photograph everything before you move it",
    body: "Wide shots of each room and close-ups of the damage. Adjusters pay for what they can see, and this is the one step people skip.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero lives in its own component now — video/poster, scrim and the
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
      <Section className="bg-sand-50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Reveal direction="none">
                <Eyebrow>Before we get there</Eyebrow>
              </Reveal>
              <TextReveal
                as="h2"
                text="Water coming in right now? Do these four things."
                className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-ocean-900 sm:text-[2.6rem] lg:text-[3.1rem]"
              />
              <Reveal delay={0.1}>
                <p className="prose-measure mt-4 text-[15px] leading-relaxed text-ink-700">
                  None of this requires us, and all of it reduces what the repair
                  ends up costing you. Work through it while you wait.
                </p>
              </Reveal>
              <Reveal delay={0.16} className="mt-6 flex items-start gap-2.5 rounded-lg border border-alert-500/25 bg-alert-400/8 p-4">
                <AlertTriangle
                  className="mt-0.5 size-4 shrink-0 text-alert-600"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-ink-700">
                  If the ceiling is sagging or bulging, stay out of that room.
                  Trapped water is heavy and ceilings come down without warning.
                </p>
              </Reveal>
            </div>

            <Stagger as="ol" className="space-y-4">
              {firstSteps.map((step, i) => (
                <StaggerItem key={step.title}>
                  <li className="flex gap-4 rounded-card border border-sand-200 bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-lift">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ocean-900 font-display text-sm font-bold text-sand-50">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-[17px] font-semibold leading-snug text-ocean-900">
                        {step.title}
                      </h3>
                      <p className="prose-measure mt-1.5 text-[15px] leading-relaxed text-ink-700">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* ───────────────────── Services ───────────────────── */}
      <Section className="border-y border-sand-200 bg-white">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <Reveal direction="none">
                <Eyebrow>What we do</Eyebrow>
              </Reveal>
              <TextReveal
                as="h2"
                text="Everything from the first bucket to the last coat of paint"
                className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-ocean-900 sm:text-[2.6rem] lg:text-[3.1rem]"
              />
            </div>
            <Reveal delay={0.15}>
              <Link
                href="/water-damage-restoration"
                className="group inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-ocean-700 hover:text-ocean-900"
              >
                Water damage, in detail
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          <Stagger className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Lead card is intentionally larger — the others are secondary */}
            <StaggerItem className="sm:col-span-2 lg:col-span-2">
              <article className="group relative h-full overflow-hidden rounded-card border border-sand-200 bg-ocean-950">
                <Image
                  src={photo(img.ceilingDamage, 1200)}
                  alt="Water-stained and peeling ceiling after a roof leak"
                  width={1200}
                  height={800}
                  sizes="(max-width: 640px) 100vw, 66vw"
                  className="absolute inset-0 size-full object-cover opacity-55 transition-opacity duration-300 group-hover:opacity-65"
                />
                {/* This photo is pale, so a bottom-up scrim guarantees the white
                    heading stays legible rather than relying on the image. */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/75 to-ocean-950/25"
                  aria-hidden="true"
                />
                <div className="relative flex h-full flex-col justify-end p-6 sm:min-h-[300px] sm:p-8">
                  <span className="mb-2 inline-flex w-fit rounded bg-surf-500 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-ocean-950">
                    Most common call
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Water damage restoration
                  </h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ocean-100">
                    Extraction, structural drying and daily moisture readings
                    after a burst pipe, roof leak or appliance failure.
                  </p>
                  <Link
                    href="/water-damage-restoration"
                    className="mt-4 inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-surf-400 hover:text-white"
                  >
                    How the process works
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            </StaggerItem>

            {services
              .filter((s) => s.slug !== "water-damage-restoration")
              .map((s) => (
                <StaggerItem key={s.slug}>
                  <article className="h-full rounded-card border border-sand-200 bg-sand-50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-surf-500/40 hover:shadow-card">
                    <h3 className="font-display text-[17px] font-semibold text-ocean-900">
                      {s.title}
                    </h3>
                    <p className="prose-measure mt-2 text-[15px] leading-relaxed text-ink-700">
                      {s.short}
                    </p>
                  </article>
                </StaggerItem>
              ))}
          </Stagger>
        </Container>
      </Section>

      {/* ──────────────── The 48-hour mold argument ──────────────── */}
      <Section className="bg-ocean-950 text-sand-100">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <ImageReveal className="relative aspect-[4/3] rounded-card">
              <div className="relative size-full">
                <Image
                  src={photo(img.mold, 1000)}
                  alt="Mold growth spreading across a damp interior wall"
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
                  hold within 24 to 48 hours of a water event in this climate —
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
            <div>
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

              {/* Towns sit here rather than under the map: they are real text,
                  and nothing inside an iframe is crawlable. They are the
                  proximity signal this whole section exists for. */}
              <Stagger as="ul" className="mt-8 flex flex-wrap gap-2.5">
                {serviceAreas.map((area) => {
                  const pill =
                    "group inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-4 py-2 font-display text-[14px] font-semibold text-ocean-800 transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:border-ocean-800 hover:bg-ocean-800 hover:text-sand-50 hover:shadow-card";
                  return (
                    <StaggerItem as="li" key={area.slug}>
                      {area.slug === "kihei" ? (
                        <Link href={`/service-areas/${area.slug}`} className={pill}>
                          {area.name}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3.5 text-surf-600 transition-all duration-[250ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-surf-400"
                          />
                        </Link>
                      ) : (
                        <span className={pill}>
                          {area.name}
                          {/* The region label only appears on hover: ten pills
                              carrying it permanently would wrap into a wall. */}
                          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[12px] font-normal text-ocean-200 opacity-0 transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-w-[8rem] group-hover:opacity-100">
                            {area.region}
                          </span>
                        </span>
                      )}
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>

            <Reveal>
              {/* Keyless Google embed — no Maps API key is configured, so the
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

      {/* ─────────────────── Insurance ─────────────────── */}
      <Section className="bg-sand-100">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <Reveal direction="none">
                <Eyebrow>Insurance</Eyebrow>
              </Reveal>
              <TextReveal
                as="h2"
                text="We document the job so your adjuster can approve it"
                className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-ocean-900 sm:text-[2.6rem] lg:text-[3.1rem]"
              />
              <Reveal delay={0.1}>
                <p className="prose-measure mt-4 text-[15px] leading-relaxed text-ink-700">
                  Moisture readings, photographs and daily drying logs from the
                  first visit onward, written up the way carriers expect to
                  receive them. We bill the insurer directly where the policy
                  allows it.
                </p>
                <p className="prose-measure mt-4 text-[15px] leading-relaxed text-ink-700">
                  We will also tell you when we think a claim is not worth
                  filing. On a small loss the deductible sometimes exceeds the
                  repair, and a claim on record can affect your renewal — which,
                  given what has happened to condo premiums in Hawaii lately, is
                  worth a moment of thought before you pick up the phone to your
                  carrier.
                </p>
              </Reveal>
            </div>

            <Stagger as="ul" className="space-y-3">
              {[
                "Moisture mapping and photographs from visit one",
                "Daily drying logs in the format carriers expect",
                "Direct billing to the insurer where the policy allows",
                "A straight answer on whether a claim is worth filing",
              ].map((item) => (
                <StaggerItem
                  as="li"
                  key={item}
                  className="flex items-start gap-3 rounded-card border border-sand-300 bg-white p-4 transition-colors duration-300 hover:border-surf-500/50"
                >
                  <FileText
                    className="mt-0.5 size-4 shrink-0 text-surf-600"
                    aria-hidden="true"
                  />
                  <span className="prose-measure text-[15px] leading-relaxed text-ink-700">
                    {item}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* Social-proof slot sits here. Left out rather than filled with invented
          testimonials — see proposal 01 in ui-suggestions.html for the block
          intended to go here once the client decides. */}

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

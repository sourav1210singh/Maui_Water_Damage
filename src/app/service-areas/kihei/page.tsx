import type { Metadata } from "next";
import Image from "next/image";
import { Phone, MapPin, Clock, Building2, Waves, Home } from "lucide-react";
import {
  Container,
  Section,
  Eyebrow,
  Button,
  Breadcrumbs,
} from "@/components/ui";
import { Stagger, StaggerItem, TextReveal, Parallax } from "@/components/motion";
import { FaqList } from "@/components/faq";
import {
  JsonLd,
  faqSchema,
  serviceSchema,
  breadcrumbSchema,
  type Faq,
} from "@/lib/schema";
import { site, serviceAreas, img, photo } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Water Damage Restoration in Kīhei, HI | 24/7" },
  description:
    "Emergency water damage restoration in Kīhei and across South Maui. Condo and vacation-rental experience, 24-hour dispatch, extraction and structural drying.",
  alternates: { canonical: "/service-areas/kihei" },
};

const faqs: Faq[] = [
  {
    q: "How quickly can you get to Kīhei?",
    a: "Kīhei is one of the faster runs for us. From Central Maui it is a straight shot down the Piʻilani Highway, and we aim to be on site within the hour for most South Shore addresses. We will give you a realistic time on the phone, including whether traffic through Kahului is going to add to it.",
  },
  {
    q: "Do you work in Kīhei condos and vacation rentals?",
    a: "Regularly — it is most of what South Maui water damage looks like. We are used to coordinating with building management and resident managers, working within restricted hours, and handling the situation where a leak in one unit has gone through a ceiling into the one below. For short-term rentals we will work around a booking calendar where it is safe to do so, and tell you honestly when it is not.",
  },
  {
    q: "A unit above mine flooded my condo. Who pays?",
    a: "It depends on your building's governing documents and where the failure occurred. Broadly, the AOAO policy tends to cover common elements and the original structure, while your own HO-6 policy covers improvements, contents and often the deductible gap. Get it documented properly from day one either way — the photographs and moisture readings we take on the first visit are what the two carriers end up arguing over.",
  },
  {
    q: "Why does South Maui get so much water damage if it barely rains?",
    a: "Almost none of it is weather. Kīhei losses are overwhelmingly plumbing: aging supply lines in buildings put up during the condo boom, water heaters past their service life, braided hose failures, and air conditioning condensate lines blocking and dripping inside walls. Salt air accelerates corrosion on fittings, and a unit sitting empty between guests means a small leak can run for days before anyone notices.",
  },
];

const localIssues = [
  {
    icon: Building2,
    title: "Multi-storey condos",
    body: "A failure on an upper floor becomes three people's problem. We contain it, dry every affected unit, and document each one separately so the claims do not get tangled.",
  },
  {
    icon: Home,
    title: "Vacation rentals standing empty",
    body: "A supply line that lets go the day after checkout can run until the next guest arrives. These are the losses that turn into mold jobs, and the ones where speed saves the most money.",
  },
  {
    icon: Waves,
    title: "Salt air and corrosion",
    body: "Coastal air is hard on fittings, valves and fixings. Older South Shore buildings see supply failures that inland properties of the same age do not.",
  },
];

export default function KiheiPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Service areas", path: "/service-areas/kihei" },
    { name: "Kīhei", path: "/service-areas/kihei" },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ocean-950">
        <Parallax distance={70} className="absolute -inset-y-14 inset-x-0">
          <Image
            src={photo(img.mauiBay, 1920)}
            alt="South Maui coastline near Kīhei"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(4,26,35,0.96)_0%,rgba(4,26,35,0.88)_36%,rgba(4,26,35,0.60)_68%,rgba(4,26,35,0.32)_100%)]"
          aria-hidden="true"
        />
        <Container className="relative py-14 sm:py-20">
          <div className="max-w-2xl">
            <Breadcrumbs trail={trail} tone="dark" />
            <p className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-surf-400">
              <MapPin className="size-3.5" aria-hidden="true" />
              South Shore · Maui County
            </p>
            <TextReveal
              as="h1"
              trigger="mount"
              text="Water damage restoration in Kīhei"
              className="font-display text-[2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-[2.9rem]"
            />
            <p className="mt-5 text-[17px] leading-relaxed text-ocean-100">
              We cover Kīhei and the whole South Shore around the clock, with
                extraction gear on the truck. Most South Maui water damage is
              plumbing rather than weather — aging supply lines, water heaters
              past their service life, and condensate lines dripping quietly
              inside a wall.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={site.phoneHref} variant="emergency" className="px-6 py-4 text-base">
                <Phone className="size-5" aria-hidden="true" />
                Call {site.phone}
              </Button>
              <Button
                href="/contact"
                className="border border-white/25 bg-white/5 px-6 py-4 text-base text-white hover:bg-white/10"
              >
                Request a callback
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Local facts strip */}
      <div className="border-b border-sand-200 bg-sand-100">
        <Container>
          <dl className="grid grid-cols-2 gap-y-4 py-5 sm:grid-cols-4">
            {[
              { icon: Clock, k: "Typical response", v: "Within the hour" },
              { icon: MapPin, k: "Covering", v: "North & South Kīhei" },
              { icon: Building2, k: "Property types", v: "Condo · Home · Rental" },
              { icon: Phone, k: "Dispatch", v: "24 hours, every day" },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.k} className="flex items-start gap-2.5 pr-3">
                  <Icon className="mt-0.5 size-4 shrink-0 text-surf-600" aria-hidden="true" />
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-ink-500">{f.k}</dt>
                    <dd className="font-display text-[14px] font-semibold text-ocean-900">{f.v}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </Container>
      </div>

      {/* Local issues */}
      <Section className="bg-sand-50">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>What South Maui actually deals with</Eyebrow>
            <TextReveal
                as="h2"
                text="Kīhei water damage has its own pattern"
                className="font-display text-[1.75rem] font-bold leading-tight text-ocean-900 sm:text-[2.1rem]"
              />
            <p className="prose-measure mt-4 text-[15px] leading-relaxed text-ink-700">
              The South Shore is the driest part of the island, so people are
              surprised by how much water damage work there is here. Almost none
              of it comes from the sky.
            </p>
          </div>

          <Stagger className="mt-8 grid gap-5 sm:grid-cols-3">
            {localIssues.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <article className="group h-full rounded-card border border-sand-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <Icon
                      className="size-6 text-surf-600 transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <h3 className="mt-3.5 font-display text-[17px] font-semibold text-ocean-900">
                      {item.title}
                    </h3>
                    <p className="prose-measure mt-2 text-[15px] leading-relaxed text-ink-700">
                      {item.body}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Condo / AOAO — the segment no competitor addresses */}
      <Section className="border-y border-sand-200 bg-ocean-950 text-sand-100">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>For owners, managers and AOAOs</Eyebrow>
              <TextReveal
                as="h2"
                text="When one unit floods three"
                className="font-display text-[1.75rem] font-bold leading-tight text-white sm:text-[2.1rem]"
              />
              <p className="prose-measure mt-4 text-[15px] leading-relaxed text-ocean-100">
                Condo losses are the hardest to handle well, because the
                technical work is the easy part. The difficulty is that two or
                three insurance policies, a building manager and several owners
                all need to agree on what happened and who pays.
              </p>
              <p className="prose-measure mt-4 text-[15px] leading-relaxed text-ocean-100">
                We document each affected unit as its own file — separate
                moisture readings, separate photographs, separate drying logs —
                so the AOAO policy and the individual HO-6 policies can be
                settled without anyone having to reconstruct events from memory
                weeks later.
              </p>
            </div>

            <ul className="space-y-3">
              {[
                "Each unit documented as a separate claim file",
                "Coordination with resident and building managers",
                "Containment so drying does not disrupt neighbouring units",
                "Work scheduled inside building quiet-hours restrictions",
                "Written drying logs the AOAO can put in front of its carrier",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-card border border-ocean-800 bg-ocean-900/50 p-4"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-surf-400" aria-hidden="true" />
                  <span className="prose-measure text-[15px] leading-relaxed text-ocean-100">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-sand-50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>Kīhei questions</Eyebrow>
              <TextReveal
                as="h2"
                text="Asked by South Shore owners"
                className="font-display text-[1.75rem] font-bold leading-tight text-ocean-900 sm:text-[2.1rem]"
              />
            </div>
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>

      {/* Other areas */}
      <Section className="border-t border-sand-200 bg-white">
        <Container>
          <TextReveal
                as="h2"
                text="We also cover"
                className="font-display text-[1.5rem] font-bold text-ocean-900"
              />
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {serviceAreas
              .filter((a) => a.slug !== "kihei")
              .map((a) => (
                <li
                  key={a.slug}
                  className="inline-block rounded-full border border-sand-300 px-4 py-2 text-sm text-ink-700"
                >
                  {a.name}
                  <span className="ml-1.5 text-xs text-ink-500">{a.region}</span>
                </li>
              ))}
          </ul>
        </Container>
      </Section>

      <section className="bg-alert-600">
        <Container className="py-12 sm:py-14">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="max-w-xl font-display text-[1.5rem] font-bold leading-tight text-white sm:text-[1.9rem]">
              Water in a Kīhei property right now?
            </h2>
            <a
              href={site.phoneHref}
              className="nums inline-flex items-center gap-3 rounded-lg bg-white px-7 py-4 font-display text-lg font-bold text-alert-700 hover:scale-[1.02]"
            >
              <Phone className="size-5" aria-hidden="true" />
              {site.phone}
            </a>
          </div>
        </Container>
      </section>

      <JsonLd
        data={[
          serviceSchema({
            name: "Water damage restoration in Kīhei",
            description:
              "24/7 emergency water damage restoration, extraction and structural drying for homes, condos and vacation rentals in Kīhei and South Maui.",
            url: `${site.url}/service-areas/kihei`,
          }),
          faqSchema(faqs),
          breadcrumbSchema(trail),
        ]}
      />
    </>
  );
}

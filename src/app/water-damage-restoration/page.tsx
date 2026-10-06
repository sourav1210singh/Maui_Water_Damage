import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight, Droplets, Gauge, Wind, Hammer, Search } from "lucide-react";
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
  // Absolute titles on inner pages: the "%s | Maui Water Damage Pros" template
  // pushed these past 60 characters, which Google truncates in the SERP.
  title: { absolute: "Water Damage Restoration on Maui | 24/7 Drying" },
  description:
    "Emergency water damage restoration across Maui. Extraction, structural drying, moisture monitoring and repair after burst pipes, roof leaks and floods. We answer 24/7.",
  alternates: { canonical: "/water-damage-restoration" },
};

const faqs: Faq[] = [
  {
    q: "What are the three categories of water damage?",
    a: "Category 1 is clean water from a supply line, water heater or rainfall. Category 2 is grey water from a washing machine, dishwasher or overflowing toilet bowl without solids. Category 3 is black water containing sewage, ground flooding or anything that has been sitting long enough to grow bacteria. The category determines what can be dried and saved and what has to be removed, and it escalates over time — clean water left standing becomes Category 2 within about 48 hours.",
  },
  {
    q: "Can wet drywall and carpet be saved, or does it all come out?",
    a: "It depends on the category and how long it has been wet. Clean water caught early means most drywall, carpet and padding can be dried in place. Grey water usually means the padding goes and the carpet is cleaned and sanitised. Category 3 means carpet, padding and the lower section of drywall are removed and disposed of — there is no safe way to dry contaminated porous material.",
  },
  {
    q: "Why does drying take longer on Maui than the mainland?",
    a: "Drying works by moving moisture from wet material into the air and then pulling it out with dehumidifiers. When the outside air is already humid, that second step is slower. A job that might dry in three days in a dry mainland climate often takes four or five here, which is why we monitor with meters daily instead of working to a fixed schedule.",
  },
  {
    q: "What equipment do you actually use?",
    a: "Truck-mounted and portable extraction units for standing water, centrifugal air movers to lift moisture out of surfaces, refrigerant and desiccant dehumidifiers to remove it from the air, penetrating and non-penetrating moisture meters to measure progress, and thermal imaging cameras to find water tracking behind walls and under flooring where you cannot see it.",
  },
  {
    q: "Do you handle the repair work as well as the drying?",
    a: "Yes. Mitigation — extraction, drying and monitoring — comes first and is the urgent part. Reconstruction follows: drywall, texture, paint, flooring, trim and cabinetry. Keeping both with one contractor avoids the gap where a drying company leaves and you have to find a builder yourself.",
  },
];

const causes = [
  { title: "Burst and failed supply lines", body: "Braided hoses behind washing machines and under sinks are the single most common cause we see. They fail without warning and often while nobody is home." },
  { title: "Water heater failure", body: "Most tanks last eight to twelve years. When they go they release the full tank at once, usually into a garage or utility closet." },
  { title: "Roof and window leaks", body: "Driven rain finds gaps around flashing and older window seals. Damage shows up on a ceiling long after the water first got in." },
  { title: "Air conditioning condensate", body: "A blocked condensate line drips slowly inside a wall or ceiling cavity for weeks. These almost always involve mold by the time they are found." },
  { title: "Appliance and plumbing backups", body: "Dishwashers, refrigerator ice lines and blocked drains. Often Category 2 or 3 depending on the source." },
  { title: "Storm runoff and flooding", body: "Heavy rain coming off the slopes through Upcountry and the valleys, and storm surge on the coast." },
];

export default function WaterDamagePage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Water damage restoration", path: "/water-damage-restoration" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ocean-950">
        <Parallax distance={70} className="absolute -inset-y-14 inset-x-0">
          <Image
            src={photo(img.ceilingDamage, 1920)}
            alt="Water-stained ceiling with peeling paint after a leak"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(4,26,35,0.96)_0%,rgba(4,26,35,0.90)_38%,rgba(4,26,35,0.68)_70%,rgba(4,26,35,0.45)_100%)]"
          aria-hidden="true"
        />
        <Container className="relative py-14 sm:py-20">
          <div className="max-w-2xl">
            <Breadcrumbs trail={trail} tone="dark" />
            <TextReveal
              as="h1"
              trigger="mount"
              text="Water damage restoration on Maui"
              className="font-display text-[2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-[2.9rem]"
            />
            {/* Answer-first paragraph: self-contained and extractable */}
            <p className="mt-5 text-[17px] leading-relaxed text-ocean-100">
              Water damage restoration is the process of removing standing water,
              drying the structure back to its normal moisture level, and
              repairing what cannot be saved. On Maui the drying stage matters
              more than almost anywhere else, because the humidity that makes the
              island what it is also lets mold take hold within 24 to 48 hours.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={site.phoneHref} variant="emergency" className="px-6 py-4 text-base">
                <Phone className="size-5" aria-hidden="true" />
                Call {site.phone}
              </Button>
              <Button
                href="/water-damage-restoration-cost-maui"
                className="border border-white/25 bg-white/5 px-6 py-4 text-base text-white hover:bg-white/10"
              >
                What it costs
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories table — tabular data in a real <table>, which is the
          format Google and the LLM crawlers lift most reliably */}
      <Section className="bg-sand-50">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>How losses are classified</Eyebrow>
            <TextReveal
                as="h2"
                text="The three categories of water, and why they decide everything"
                className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-ocean-900 sm:text-[2.6rem] lg:text-[3.1rem]"
              />
            <p className="prose-measure mt-4 text-[15px] leading-relaxed text-ink-700">
              Every water loss is graded by how contaminated the water is. That
              grade determines what can be dried and kept, what has to be thrown
              away, and what your insurer will pay for. It also gets worse with
              time, which is the real reason speed matters.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
              <caption className="sr-only">
                Water damage categories, typical sources and what can be salvaged
              </caption>
              <thead>
                <tr className="border-b-2 border-ocean-800">
                  <th scope="col" className="py-3 pr-4 font-display text-sm font-semibold uppercase tracking-wider text-ocean-900">Category</th>
                  <th scope="col" className="py-3 pr-4 font-display text-sm font-semibold uppercase tracking-wider text-ocean-900">Typical source</th>
                  <th scope="col" className="py-3 pr-4 font-display text-sm font-semibold uppercase tracking-wider text-ocean-900">What it means</th>
                  <th scope="col" className="py-3 font-display text-sm font-semibold uppercase tracking-wider text-ocean-900">Usually salvageable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-300">
                <tr>
                  <th scope="row" className="py-4 pr-4 align-top font-display font-semibold text-ocean-800">Category 1<br /><span className="text-xs font-normal text-ink-500">Clean water</span></th>
                  <td className="py-4 pr-4 align-top text-ink-700">Supply line, water heater, rainfall</td>
                  <td className="py-4 pr-4 align-top text-ink-700">No immediate health risk. Becomes Category 2 after roughly 48 hours.</td>
                  <td className="py-4 align-top text-ink-700">Most drywall, carpet and padding, if we reach it early</td>
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-4 align-top font-display font-semibold text-ocean-800">Category 2<br /><span className="text-xs font-normal text-ink-500">Grey water</span></th>
                  <td className="py-4 pr-4 align-top text-ink-700">Washing machine, dishwasher, toilet bowl overflow</td>
                  <td className="py-4 pr-4 align-top text-ink-700">Contains contaminants that can cause illness. Needs sanitising.</td>
                  <td className="py-4 align-top text-ink-700">Drywall and carpet often; padding usually removed</td>
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-4 align-top font-display font-semibold text-alert-600">Category 3<br /><span className="text-xs font-normal text-ink-500">Black water</span></th>
                  <td className="py-4 pr-4 align-top text-ink-700">Sewage, ground flooding, long-standing water</td>
                  <td className="py-4 pr-4 align-top text-ink-700">Grossly contaminated. Containment and protective equipment required.</td>
                  <td className="py-4 align-top text-ink-700">Porous materials come out — carpet, padding, lower drywall</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Causes */}
      <Section className="border-y border-sand-200 bg-white">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>What we get called for</Eyebrow>
            <TextReveal
                as="h2"
                text="Six causes account for most of the work on this island"
                className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-ocean-900 sm:text-[2.6rem] lg:text-[3.1rem]"
              />
          </div>
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {causes.map((c) => (
              <StaggerItem key={c.title}>
                <article className="h-full rounded-card border border-sand-200 bg-sand-50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-surf-500/40 hover:shadow-card">
                  <h3 className="font-display text-[16px] font-semibold leading-snug text-ocean-900">
                    {c.title}
                  </h3>
                  <p className="prose-measure mt-2 text-[15px] leading-relaxed text-ink-700">
                    {c.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Process detail */}
      <Section className="bg-ocean-950 text-sand-100">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>The work itself</Eyebrow>
            <TextReveal
                as="h2"
                text="What actually happens, hour by hour"
                className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-[2.6rem] lg:text-[3.1rem]"
              />
          </div>

          <Stagger as="ol" className="mt-10 space-y-5">
            {[
              { icon: Search, h: "Inspection and moisture mapping", t: "Before anything is moved we meter the affected rooms and the rooms next to them, and run a thermal camera over walls, ceilings and floors. Water travels further than it looks — a leak at a shower pan routinely shows up two rooms away. Everything gets photographed for the claim at this point." },
              { icon: Droplets, h: "Extraction", t: "Standing water comes out first with truck-mounted or portable units. On carpet we extract through the pad where it is salvageable. This is the single highest-value hour of the whole job: every gallon removed now is a gallon that does not have to be evaporated over the next four days." },
              { icon: Wind, h: "Drying setup", t: "Air movers positioned to sweep the wet surfaces, dehumidifiers sized to the volume of the space. Where water is trapped inside a wall or under cabinets we drill discreet access holes or lift a section of baseboard rather than tearing out the whole wall." },
              { icon: Gauge, h: "Daily monitoring", t: "We come back every day, take readings from the same marked points, and log them. Equipment moves or comes out as areas reach dry standard. You get told where things stand each day rather than wondering." },
              { icon: Hammer, h: "Reconstruction", t: "Once the structure is genuinely dry — measured, not assumed — we patch, texture, paint, and put flooring and trim back. The goal is that you cannot tell where the damage was." },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.h}>
                  <li className="group flex gap-5 rounded-card border border-ocean-800 bg-ocean-900/50 p-5 transition-colors duration-300 hover:border-surf-500/40 sm:p-6">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-ocean-800 transition-colors duration-300 group-hover:bg-ocean-700">
                      <Icon className="size-5 text-surf-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-[17px] font-semibold text-white">
                        {s.h}
                      </h3>
                      <p className="prose-measure mt-2 text-[15px] leading-relaxed text-ocean-100">
                        {s.t}
                      </p>
                    </div>
                  </li>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Cost teaser */}
      <Section className="bg-sand-100">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-card border border-sand-300 bg-white p-7 sm:flex-row sm:items-center sm:p-9">
            <div className="max-w-xl">
              <TextReveal
                as="h2"
                text="What does this cost on Maui?"
                className="font-display text-[1.5rem] font-bold leading-tight text-ocean-900"
              />
              <p className="prose-measure mt-2.5 text-[15px] leading-relaxed text-ink-700">
                Most Maui homes land between $1,500 and $6,000 for mitigation.
                We have broken it down by severity, with the island-specific
                reasons it runs above mainland averages.
              </p>
            </div>
            <Link
              href="/water-damage-restoration-cost-maui"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-ocean-800 px-5 py-3.5 font-display text-[15px] font-semibold text-sand-50 hover:bg-ocean-900"
            >
              See the cost breakdown
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* Areas */}
      <Section className="border-y border-sand-200 bg-white">
        <Container>
          <TextReveal
                as="h2"
                text="Where we work"
                className="font-display text-[1.5rem] font-bold text-ocean-900"
              />
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {serviceAreas.map((a) => (
              <li key={a.slug}>
                {a.slug === "kihei" ? (
                  <Link
                    href={`/service-areas/${a.slug}`}
                    className="inline-block rounded-full border border-ocean-800/30 bg-ocean-50 px-4 py-2 text-sm font-medium text-ocean-800 hover:border-ocean-800/60"
                  >
                    {a.name}
                  </Link>
                ) : (
                  <span className="inline-block rounded-full border border-sand-300 px-4 py-2 text-sm text-ink-700">
                    {a.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-sand-50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <TextReveal
                as="h2"
                text="Water damage, answered properly"
                className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-ocean-900 sm:text-[2.6rem] lg:text-[3.1rem]"
              />
            </div>
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <section className="bg-alert-600">
        <Container className="py-12 sm:py-14">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="max-w-xl font-display text-[1.5rem] font-bold leading-tight text-white sm:text-[1.9rem]">
              The sooner we start drying, the less comes out.
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
            name: "Water damage restoration",
            description:
              "Emergency water extraction, structural drying, moisture monitoring and repair across Maui, Hawaii.",
            url: `${site.url}/water-damage-restoration`,
          }),
          faqSchema(faqs),
          breadcrumbSchema(trail),
        ]}
      />
    </>
  );
}

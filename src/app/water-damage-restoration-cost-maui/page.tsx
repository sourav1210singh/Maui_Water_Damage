import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Ship, Droplets, Building2, Wrench, ArrowRight } from "lucide-react";
import {
  Container,
  Section,
  Eyebrow,
  Breadcrumbs,
  PlaceholderNote,
} from "@/components/ui";
import { Stagger, StaggerItem, TextReveal } from "@/components/motion";
import { FaqList } from "@/components/faq";
import { JsonLd, faqSchema, breadcrumbSchema, type Faq } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Water Damage Restoration Cost on Maui (2026)" },
  description:
    "What water damage restoration actually costs on Maui in 2026, broken down by severity. Typical ranges, why island costs run above mainland averages, and what insurance covers.",
  alternates: { canonical: "/water-damage-restoration-cost-maui" },
};

const faqs: Faq[] = [
  {
    q: "How much does water damage restoration cost on Maui?",
    a: "Most Maui homes cost between $1,500 and $6,000 for mitigation — the extraction, drying and monitoring stage. A minor single-room leak caught early starts around $1,200. A major Category 3 loss involving sewage or ground flooding runs from $15,000 upward once demolition and rebuilding are included. Island freight and longer drying times put Maui roughly 15 to 25 percent above mainland averages.",
  },
  {
    q: "Is mitigation priced separately from the repair work?",
    a: "Yes, and it is worth understanding the split. Mitigation is the emergency stage — extraction, drying equipment and daily monitoring — and is usually billed against published industry rates that insurers recognise. Reconstruction is the rebuild: drywall, paint, flooring, cabinetry. A quote covering only mitigation can look much cheaper than one covering both, so check which you are being given.",
  },
  {
    q: "Does homeowners insurance cover the cost?",
    a: "Sudden and accidental water damage is generally covered after your deductible. Gradual leaks, poor maintenance and outside flooding generally are not, and most Hawaii policies exclude mold or cap it at a few thousand dollars. On a small loss the deductible can exceed the repair, in which case filing a claim may cost you more at renewal than it saves.",
  },
  {
    q: "Why is water damage restoration more expensive in Hawaii?",
    a: "Four reasons compound. Building materials arrive by sea, so drywall, flooring and cabinetry cost more and take longer to get. High humidity means drying takes a day or two longer, and drying equipment is billed per unit per day. Labour costs are higher than most of the mainland. And condo work carries extra coordination with building management and restricted working hours.",
  },
  {
    q: "Can I reduce what it costs?",
    a: "Three things make a real difference. Call quickly — a Category 1 loss becomes Category 2 after about 48 hours and the price roughly doubles when porous material has to be removed instead of dried. Photograph everything before moving it, so your adjuster can see what they are paying for. And do not run a dehumidifier for a week hoping it dries on its own; the hidden moisture keeps going and you end up paying for mold remediation as well.",
  },
];

const drivers = [
  {
    icon: Ship,
    title: "Everything arrives by barge",
    body: "Drywall, flooring, trim and cabinetry are shipped in. That raises material prices and stretches lead times, so a rebuild that takes a fortnight on the mainland can take a month here.",
  },
  {
    icon: Droplets,
    title: "Humidity means longer drying",
    body: "Dehumidifiers and air movers are billed per unit per day. When ambient humidity is high the structure takes longer to reach dry standard, so equipment stays on site one to two days longer than mainland estimates assume.",
  },
  {
    icon: Building2,
    title: "Condo and AOAO coordination",
    body: "Work in a condo means scheduling around building management, restricted hours, lift access and sometimes a separate approval before anything can be cut. All of it is billable time.",
  },
  {
    icon: Wrench,
    title: "Higher labour costs",
    body: "Skilled trades cost more in Hawaii than in most mainland markets, and a smaller pool of qualified restoration technicians means less downward pressure on rates.",
  },
];

export default function CostPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Water damage restoration", path: "/water-damage-restoration" },
    { name: "What it costs on Maui", path: "/water-damage-restoration-cost-maui" },
  ];

  return (
    <>
      <section className="border-b border-sand-200 bg-ocean-950">
        <Container className="py-14 sm:py-20">
          <div className="max-w-3xl">
            <Breadcrumbs trail={trail} tone="dark" />
            <h1 className="font-display text-[2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-[2.9rem]">
              What water damage restoration costs on Maui
            </h1>

            {/* The extractable answer. Self-contained, specific, first thing
                after the H1 — this is the paragraph we want lifted. */}
            <p className="mt-6 border-l-[3px] border-surf-500 pl-5 text-[17px] leading-relaxed text-ocean-100 sm:text-lg">
              Water damage restoration on Maui typically costs{" "}
              <strong className="font-semibold text-white">
                $1,500 to $6,000
              </strong>{" "}
              for a standard residential job covering extraction, drying and
              monitoring. Minor single-room losses start near $1,200. Major
              Category 3 losses involving sewage or flooding run $15,000 and
              upward once demolition and rebuilding are included. Island freight
              and longer drying times put Maui roughly 15 to 25 percent above
              mainland averages.
            </p>

            <p className="mt-5 text-[15px] text-ocean-200">
              Updated October 2026 · Figures below cover Maui County
            </p>
          </div>
        </Container>
      </section>

      {/* THE table — this format is what Google lifted into the AI Overview
          when we tested the equivalent Hawaii cost query */}
      <Section className="bg-sand-50">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>By severity</Eyebrow>
            <TextReveal
                as="h2"
                text="Typical cost by how bad it is"
                className="font-display text-[1.75rem] font-bold leading-tight text-ocean-900 sm:text-[2.1rem]"
              />
            <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
              Severity is the main driver, and it is mostly decided by how long
              the water sat before anyone started drying.
            </p>
          </div>

          {/* Column order is deliberate: price sits second so it is visible at
              375px without scrolling sideways. The long description column goes
              last, since that is the one it is acceptable to scroll for. */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-[15px]">
              <caption className="sr-only">
                Typical water damage restoration cost on Maui by severity level
              </caption>
              <thead>
                <tr className="border-b-2 border-ocean-800">
                  <th scope="col" className="py-3 pr-4 font-display text-sm font-semibold uppercase tracking-wider text-ocean-900">Severity</th>
                  <th scope="col" className="py-3 pr-4 font-display text-sm font-semibold uppercase tracking-wider text-ocean-900">Typical Maui range</th>
                  <th scope="col" className="py-3 pr-4 font-display text-sm font-semibold uppercase tracking-wider text-ocean-900">Time on site</th>
                  <th scope="col" className="py-3 font-display text-sm font-semibold uppercase tracking-wider text-ocean-900">What it looks like</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-300">
                {[
                  { s: "Minor", d: "One room, clean water, found quickly. Under about 100 sq ft, no saturated structure.", c: "$1,200 – $2,500", t: "2–3 days" },
                  { s: "Moderate", d: "Water heater or supply line failure. Carpet, padding and lower drywall across one or two rooms.", c: "$2,500 – $6,000", t: "3–5 days" },
                  { s: "Major", d: "Undetected for days, several rooms, cabinetry and subfloor involved. Often some mold.", c: "$6,000 – $15,000", t: "5–10 days" },
                  { s: "Severe", d: "Category 3 — sewage backup or ground flooding. Full demolition and rebuild.", c: "$15,000 – $40,000+", t: "2–6 weeks" },
                ].map((row) => (
                  <tr key={row.s}>
                    <th scope="row" className="whitespace-nowrap py-4 pr-4 align-top font-display font-semibold text-ocean-800">{row.s}</th>
                    <td className="nums whitespace-nowrap py-4 pr-5 align-top font-display font-semibold text-ocean-900">{row.c}</td>
                    <td className="nums whitespace-nowrap py-4 pr-5 align-top text-ink-700">{row.t}</td>
                    <td className="min-w-[280px] py-4 align-top text-ink-700">{row.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2.5 text-[13px] text-ink-500 sm:hidden" aria-hidden="true">
            Swipe the table sideways for the full description.
          </p>

          <PlaceholderNote>
            These ranges are built from published national restoration pricing
            adjusted for Hawaii cost-of-living and freight. They are realistic
            but illustrative — the client should replace them with their own
            rates before this page goes live, since publishing prices they will
            not honour creates a problem on the first phone call.
          </PlaceholderNote>
        </Container>
      </Section>

      {/* Line items */}
      <Section className="border-y border-sand-200 bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <Eyebrow>Line by line</Eyebrow>
              <TextReveal
                as="h2"
                text="What makes up the bill"
                className="font-display text-[1.75rem] font-bold leading-tight text-ocean-900 sm:text-[2.1rem]"
              />
              <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
                Restoration is priced from itemised rates rather than a single
                lump sum, which is why two quotes for the same job can look so
                different. Ask for the breakdown.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-left text-[15px]">
                <caption className="sr-only">Typical line items and rates</caption>
                <thead>
                  <tr className="border-b-2 border-sand-300">
                    <th scope="col" className="py-3 pr-4 font-display text-sm font-semibold uppercase tracking-wider text-ocean-900">Item</th>
                    <th scope="col" className="py-3 font-display text-sm font-semibold uppercase tracking-wider text-ocean-900">Typical rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200">
                  {[
                    ["Emergency call-out and assessment", "$150 – $350"],
                    ["Water extraction", "$3 – $7 per sq ft"],
                    ["Air mover (per unit, per day)", "$30 – $55"],
                    ["Dehumidifier (per unit, per day)", "$70 – $130"],
                    ["Antimicrobial treatment", "$0.25 – $0.90 per sq ft"],
                    ["Mold remediation (if present)", "$1,200 – $7,500"],
                    ["Drywall removal and replacement", "$2.50 – $6 per sq ft"],
                    ["Flooring replacement", "$4 – $18 per sq ft"],
                  ].map(([item, rate]) => (
                    <tr key={item}>
                      <td className="py-3.5 pr-4 text-ink-700">{item}</td>
                      <td className="nums py-3.5 font-medium text-ocean-900">{rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why Maui costs more */}
      <Section className="bg-ocean-950 text-sand-100">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Island economics</Eyebrow>
            <TextReveal
                as="h2"
                text="Why the mainland numbers do not apply here"
                className="font-display text-[1.75rem] font-bold leading-tight text-white sm:text-[2.1rem]"
              />
            <p className="mt-4 text-[15px] leading-relaxed text-ocean-100">
              Almost every cost guide online is written for the mainland. Four
              things make Maui genuinely different, and they compound.
            </p>
          </div>

          <Stagger className="mt-9 grid gap-5 sm:grid-cols-2">
            {drivers.map((d) => {
              const Icon = d.icon;
              return (
                <StaggerItem key={d.title}>
                  <article className="group h-full rounded-card border border-ocean-800 bg-ocean-900/50 p-6 transition-colors duration-300 hover:border-surf-500/40">
                    <Icon
                      className="size-6 text-surf-400 transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <h3 className="mt-3.5 font-display text-[17px] font-semibold text-white">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ocean-100">
                      {d.body}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Insurance */}
      <Section className="bg-sand-100">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Insurance</Eyebrow>
            <TextReveal
                as="h2"
                text="What your policy will and will not pay for"
                className="font-display text-[1.75rem] font-bold leading-tight text-ocean-900 sm:text-[2.1rem]"
              />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-700">
              <p>
                <strong className="font-semibold text-ocean-900">Generally covered:</strong>{" "}
                sudden and accidental discharge. A supply line that bursts, a
                water heater that fails, a pipe that breaks inside a wall. You
                pay the deductible and the carrier covers the rest of the
                mitigation and repair.
              </p>
              <p>
                <strong className="font-semibold text-ocean-900">Generally not covered:</strong>{" "}
                gradual seepage, a leak that was visible and left alone,
                maintenance failures, and flooding that enters from outside —
                that last one needs separate flood insurance.
              </p>
              <p>
                <strong className="font-semibold text-ocean-900">The mold problem:</strong>{" "}
                most Hawaii homeowners policies exclude mold damage or cap it at
                a few thousand dollars. That cap is the reason the 48-hour window
                matters financially as well as structurally: the same damage is a
                covered water claim on day one and an uncovered mold claim on day
                three.
              </p>
            </div>

            <div className="mt-8 rounded-card border-l-[3px] border-surf-500 bg-white p-5">
              <p className="text-[15px] leading-relaxed text-ink-700">
                <strong className="font-semibold text-ocean-900">
                  Worth thinking about before you file:
                </strong>{" "}
                on a small loss the deductible can exceed the repair cost, and a
                claim on record can affect renewal. Given what has happened to
                condo premiums across Hawaii, that is not a small consideration.
                We will give you a straight view on whether a claim is worth
                making.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="border-y border-sand-200 bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>Cost questions</Eyebrow>
              <TextReveal
                as="h2"
                text="The ones that come up on every estimate"
                className="font-display text-[1.75rem] font-bold leading-tight text-ocean-900 sm:text-[2.1rem]"
              />
              <div className="mt-6">
                <Link
                  href="/water-damage-restoration"
                  className="inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-ocean-700 hover:text-ocean-900"
                >
                  How the restoration process works
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>

      <section className="bg-alert-600">
        <Container className="py-12 sm:py-14">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <TextReveal
                as="h2"
                text="Want a real number for your place?"
                className="font-display text-[1.5rem] font-bold leading-tight text-white sm:text-[1.9rem]"
              />
              <p className="mt-2 text-[15px] text-white/90">
                We will look at it and tell you what it will actually take.
              </p>
            </div>
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

      <JsonLd data={[faqSchema(faqs), breadcrumbSchema(trail)]} />
    </>
  );
}

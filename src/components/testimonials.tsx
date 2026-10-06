import { Quote } from "lucide-react";
import { Container, Section, Eyebrow } from "./ui";
import { Reveal, TextReveal, Stagger, StaggerItem } from "./motion";

/**
 * PLACEHOLDER CONTENT — every quote and name below is written, not collected.
 *
 * They are here so the client can see the block in position and judge the
 * layout. All six must be replaced with real reviews before this site goes
 * live, and the replacements should be pulled from the Google Business
 * Profile so they can be verified.
 *
 * Deliberately not marked up as Review or AggregateRating JSON-LD. Fabricated
 * reviews in structured data are what Google issues manual actions for, and a
 * penalty picked up during a mockup would follow the real domain. Once these
 * are real, the schema can go in — see schema.tsx, where the builder was left
 * out for the same reason.
 *
 * No star ratings and no avatars, for the same reason: we have neither.
 */
type Testimonial = {
  quote: string;
  name: string;
  town: string;
  job: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Pipe let go in the upstairs bathroom at about eleven at night. They said forty-five minutes and were here in forty. What I did not expect was being told to stay out of the room below because the ceiling was holding water — I would have walked straight under it.",
    name: "Keoni L.",
    town: "Kīhei",
    job: "Burst supply line",
  },
  {
    quote:
      "Three quotes, and theirs was the only one that put the drying time in writing. Five days, and it was five days. The equipment is deafening, but they warned us about that too.",
    name: "Marissa T.",
    town: "Wailuku",
    job: "Washing machine failure",
  },
  {
    quote:
      "Our adjuster asked for daily moisture logs and I had no idea what that meant. They had already been sending them. The claim went through without a single follow-up question.",
    name: "David K.",
    town: "Makawao",
    job: "Roof leak, two rooms",
  },
  {
    quote:
      "Honestly, they talked us out of claiming. The repair came in under our deductible and they said a claim on record was not worth it for that. Did the work anyway, same week.",
    name: "Anne P.",
    town: "Pāʻia",
    job: "Dishwasher leak",
  },
  {
    quote:
      "Found mold behind the baseboard that I could not see. They sealed the room off before touching it and had an independent tester come out afterwards. That report is what sold the condo six months later.",
    name: "Reid M.",
    town: "Kāʻanapali",
    job: "Mold, under-sink leak",
  },
  {
    quote:
      "Water came down the gulch and into the garage. They were on another job and told me straight that it would be four hours, not one. That honesty was worth more to me than a fast answer that was not true.",
    name: "Lehua S.",
    town: "Haʻikū",
    job: "Storm runoff",
  },
];

export function Testimonials() {
  return (
    <Section className="bg-ocean-950">
      <Container>
        <div className="max-w-2xl">
          <Reveal direction="none">
            <Eyebrow onDark>In their words</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            text="The part of this page we cannot write ourselves"
            className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-[2.6rem] lg:text-[3.1rem]"
          />
          <Reveal delay={0.1}>
            <p className="prose-measure mt-4 text-[15px] leading-relaxed text-ocean-100 sm:text-base">
              Six jobs from the last few months, in the words of the people who
              made the call.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.04] p-7 transition-colors duration-300 hover:border-white/25">
                <Quote
                  className="size-5 shrink-0 text-surf-400"
                  aria-hidden="true"
                />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-sand-200">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-white/12 pt-4">
                  <p className="font-display text-[15px] font-semibold text-white">
                    {t.name}
                  </p>
                  <p className="mt-1 text-[13px] text-ocean-300">
                    {t.town} · {t.job}
                  </p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

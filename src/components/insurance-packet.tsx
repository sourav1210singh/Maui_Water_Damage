import { Camera, ClipboardList, Droplets, Receipt, type LucideIcon } from "lucide-react";
import { Container, Section, Eyebrow } from "./ui";
import { Reveal, TextReveal } from "./motion";

type Doc = {
  icon: LucideIcon;
  title: string;
  body: string;
  /** Resting offset and tilt in the stack. Only applies from lg up, where
   *  the cards are absolutely positioned on top of each other. */
  stack: string;
};

const docs: Doc[] = [
  {
    icon: Droplets,
    title: "Moisture map, visit one",
    body: "Every wet reading plotted against a floor plan, before anything is moved.",
    stack: "lg:top-0 lg:-rotate-[2.2deg]",
  },
  {
    icon: ClipboardList,
    title: "Daily drying log",
    body: "Same marked points, same time each day, until the structure meets dry standard.",
    stack: "lg:top-24 lg:rotate-[1.4deg]",
  },
  {
    icon: Camera,
    title: "Photograph set",
    body: "Wide shots per room and close-ups of the damage, timestamped.",
    stack: "lg:top-48 lg:-rotate-[1deg]",
  },
  {
    icon: Receipt,
    title: "Carrier-format invoice",
    body: "Line items in the structure your insurer's software expects. Billed direct where the policy allows.",
    stack: "lg:top-72 lg:rotate-[2deg]",
  },
];

/**
 * The insurance argument, with the right-hand column showing the actual
 * packet the adjuster receives rather than a list describing it.
 *
 * On lg the four cards sit on top of one another with a slight tilt, like a
 * stack of paper, and square up when the cursor enters the stack. Below lg
 * the stack is dropped entirely. Overlapping absolutely-positioned cards on
 * a phone would just be four cards covering each other, so they fall back
 * to a plain gap-separated column with no tilt.
 */
export function InsurancePacket() {
  return (
    <Section className="bg-sand-100">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-[72px]">
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
                We will also tell you when we think a claim is not worth filing.
                On a small loss the deductible sometimes exceeds the repair, and
                a claim on record can affect your renewal, which, given what
                has happened to condo premiums in Hawaii lately, is worth a
                moment of thought before you pick up the phone to your carrier.
              </p>
            </Reveal>
          </div>

          {/* One Reveal around the whole stack rather than a stagger per card.
              The cards overlap, so staggering their entrance reads as four
              pieces of paper jittering against each other rather than as a
              stack arriving. They are one object; they animate as one. */}
          <Reveal delay={0.1}>
            {/* `group` is what squares the whole stack up together; each card
                still lifts on its own hover. */}
            <div className="group relative flex flex-col gap-3 lg:block lg:h-[440px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-4 right-0 z-10 rotate-6 rounded-md border-2 border-surf-500 bg-sand-50 px-2.5 py-1.5 lg:-right-2 lg:-top-5"
              >
                <span className="font-display text-[11px] font-bold uppercase tracking-[0.12em] text-surf-600">
                  Adjuster-ready
                </span>
              </div>

              {docs.map((doc) => {
                const Icon = doc.icon;
                return (
                  <div
                    key={doc.title}
                    className={`rounded-xl border border-sand-300 bg-white px-[22px] py-5 shadow-card transition-all duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-lift lg:absolute lg:inset-x-0 lg:origin-bottom lg:hover:z-[5] lg:group-hover:rotate-0 ${doc.stack}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-[30px] shrink-0 place-items-center rounded-lg bg-ocean-50 text-ocean-700">
                        <Icon className="size-[15px]" aria-hidden="true" />
                      </span>
                      <h3 className="font-display text-[15px] font-bold text-ocean-900">
                        {doc.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">
                      {doc.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

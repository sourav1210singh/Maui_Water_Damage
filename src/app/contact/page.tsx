import type { Metadata } from "next";
import { Phone, Clock, MapPin, ShieldAlert } from "lucide-react";
import {
  Container,
  Section,
  Eyebrow,
  Breadcrumbs,
} from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { site, serviceAreas } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Contact Maui Water Damage Pros | 24/7 Dispatch" },
  description:
    "Reach Maui Water Damage Pros any hour. Call for an active emergency, or request a callback for an assessment. Serving all of Maui County.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <section className="border-b border-sand-200 bg-ocean-950">
        <Container className="py-12 sm:py-16">
          <div className="max-w-2xl">
            <Breadcrumbs trail={trail} tone="dark" />
            <h1 className="font-display text-[2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-[2.7rem]">
              Get hold of us
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-ocean-100">
              A person answers this phone at any hour. If water is coming in
              right now, call — do not fill in a form and wait.
            </p>
          </div>
        </Container>
      </section>

      <Section className="bg-sand-50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* Contact details */}
            <div>
              <a
                href={site.phoneHref}
                className="flex items-center gap-4 rounded-card border border-alert-500/30 bg-alert-600 p-6 text-white transition-transform hover:scale-[1.01]"
              >
                <Phone className="size-8 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-medium opacity-90">
                    Emergency line — 24 hours
                  </span>
                  <span className="nums block font-display text-2xl font-bold tracking-tight">
                    {site.phone}
                  </span>
                </span>
              </a>

              <dl className="mt-7 space-y-5">
                <div className="flex items-start gap-3.5">
                  <Clock className="mt-0.5 size-5 shrink-0 text-surf-600" aria-hidden="true" />
                  <div>
                    <dt className="font-display text-[15px] font-semibold text-ocean-900">
                      Hours
                    </dt>
                    <dd className="mt-0.5 text-[15px] text-ink-700">
                      {site.hours}. Emergency dispatch does not stop for
                      weekends or holidays.
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-surf-600" aria-hidden="true" />
                  <div>
                    <dt className="font-display text-[15px] font-semibold text-ocean-900">
                      Where we go
                    </dt>
                    <dd className="mt-0.5 text-[15px] text-ink-700">
                      All of Maui County —{" "}
                      {serviceAreas.map((a) => a.name).join(", ")}, and
                      everywhere between.
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <ShieldAlert className="mt-0.5 size-5 shrink-0 text-surf-600" aria-hidden="true" />
                  <div>
                    <dt className="font-display text-[15px] font-semibold text-ocean-900">
                      Before you call
                    </dt>
                    <dd className="mt-0.5 text-[15px] text-ink-700">
                      If you can safely reach the main shutoff, turn the water
                      off. If a ceiling is sagging, stay out of that room.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* Form */}
            <div>
              <Eyebrow>Not an emergency</Eyebrow>
              <h2 className="font-display text-[1.6rem] font-bold leading-tight text-ocean-900">
                Request a callback
              </h2>
              <p className="prose-measure mt-3 text-[15px] leading-relaxed text-ink-700">
                For an assessment, a second opinion on a quote, or damage you
                have found but that is no longer actively leaking.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}

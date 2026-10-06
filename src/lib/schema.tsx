import { site, serviceAreas } from "./site";

/**
 * JSON-LD builders.
 *
 * Deliberately absent: AggregateRating and Review. Google penalises
 * self-serving review markup, and the client has no verified reviews yet.
 * These get added once real reviews exist — not before.
 */

const ORG_ID = `${site.url}/#organization`;
const BUSINESS_ID = `${site.url}/#localbusiness`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": BUSINESS_ID,
    name: site.name,
    url: site.url,
    telephone: site.phone,
    description:
      "Emergency water damage restoration, structural drying and mold remediation across Maui. Available 24 hours a day.",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    // 24/7 — matches the "Open 24 hours" signal Google shows in the local pack
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: serviceAreas.map((a) => ({
      "@type": "City",
      name: a.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Maui County, Hawaii",
      },
    })),
    knowsAbout: [
      "Water damage restoration",
      "Structural drying",
      "Mold remediation",
      "Flood cleanup",
      "Storm damage repair",
    ],
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    telephone: site.phone,
    // sameAs links go here once the client's GBP, Yelp and Facebook exist.
    // Entity consolidation across platforms is how LLMs build confidence
    // that this business is real.
    sameAs: [],
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.name,
    provider: { "@id": BUSINESS_ID },
    areaServed: serviceAreas.map((a) => ({ "@type": "City", name: a.name })),
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: site.phone,
        contactType: "emergency",
        availableLanguage: ["en"],
      },
    },
  };
}

export type Faq = { q: string; a: string };

/**
 * FAQPage schema.
 *
 * Note for the client: Google stopped showing FAQ *rich results* on
 * 7 May 2026. This markup is not for a visual snippet — it is here because
 * pages carrying FAQPage schema are substantially more likely to be pulled
 * into AI Overviews, and because other engines still parse it.
 */
export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}

/** Renders one or more schema objects into a single script tag. */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

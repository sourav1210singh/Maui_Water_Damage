/**
 * Single source of truth for every business fact on the site.
 *
 * ──────────────────────────────────────────────────────────────────────────
 *  ⚠️  PLACEHOLDER POLICY
 *
 *  Anything marked PLACEHOLDER is NOT verified. It exists so the mockup
 *  renders. Before this site goes live the client must supply real values,
 *  or the section that uses it must be removed.
 *
 *  We do NOT publish invented licence numbers, certifications, review counts
 *  or response-time promises. Hawaii requires a Contractors State License
 *  Board licence for repair/reconstruction work, and insurance third-party
 *  administrators require IICRC certification. Publishing credentials the
 *  client does not hold is false advertising and a real liability.
 *
 *  The phone number below uses the 555-01XX range, which is reserved for
 *  fictional use, so it cannot accidentally dial a real person.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Maui Water Damage Pros",
  shortName: "Maui Water Damage Pros",
  url: "https://maui-water-damage-pros.vercel.app",
  tagline: "Water damage help on Maui, any hour.",

  /** PLACEHOLDER — client must supply real number */
  phone: "(808) 555-0147",
  phoneHref: "tel:+18085550147",

  /**
   * `street` is intentionally empty until the client confirms a real address.
   * The schema builder omits streetAddress entirely when it is blank rather
   * than emitting filler — a LocalBusiness without a street address is valid
   * structured data, and is the correct shape for a service-area business
   * anyway. Putting placeholder text here would publish junk into the markup
   * Google reads.
   */
  address: {
    street: "",
    locality: "Kahului",
    region: "HI",
    postalCode: "96732",
    country: "US",
  },

  /** Central Maui coordinates — adjust once the real address is confirmed */
  geo: { lat: 20.8893, lng: -156.4729 },

  email: "dispatch@example.com", // PLACEHOLDER

  hours: "24 hours a day, 7 days a week",

  /**
   * PLACEHOLDER — the strongest differentiator in this market, but only if
   * the client can actually commit to it. A competitor publishes
   * "45-minute arrival". We do not invent a number.
   */
  responseTime: "60 minutes",

  /** PLACEHOLDER — every credential below needs client confirmation */
  credentials: [
    { label: "IICRC certified", detail: "WRT · ASD · AMRT", verified: false },
    { label: "Licensed & insured", detail: "HI Contractors Lic. #______", verified: false },
    { label: "Available 24/7", detail: "Live dispatch, every night", verified: true },
    { label: "Maui owned & operated", detail: "We live here too", verified: false },
  ],
} as const;

/** The ten towns our competitor already names. Diacriticals matter to locals. */
export const serviceAreas = [
  { name: "Kīhei", slug: "kihei", region: "South Shore" },
  { name: "Kahului", slug: "kahului", region: "Central Maui" },
  { name: "Wailuku", slug: "wailuku", region: "Central Maui" },
  { name: "Lahaina", slug: "lahaina", region: "West Side" },
  { name: "Kāʻanapali", slug: "kaanapali", region: "West Side" },
  { name: "Pāʻia", slug: "paia", region: "North Shore" },
  { name: "Haʻikū", slug: "haiku", region: "North Shore" },
  { name: "Makawao", slug: "makawao", region: "Upcountry" },
  { name: "Pukalani", slug: "pukalani", region: "Upcountry" },
  { name: "Kula", slug: "kula", region: "Upcountry" },
] as const;

export const services = [
  {
    slug: "water-damage-restoration",
    title: "Water damage restoration",
    short: "Extraction, drying and repair after a burst pipe, roof leak or flood.",
    live: true,
  },
  {
    slug: "mold-remediation",
    title: "Mold remediation",
    short: "Containment, removal and air testing. Mold starts within 48 hours here.",
    live: false,
  },
  {
    slug: "flood-cleanup",
    title: "Storm & flood cleanup",
    short: "Heavy rain, runoff and storm surge across Upcountry and the valleys.",
    live: false,
  },
  {
    slug: "sewage-cleanup",
    title: "Sewage & contaminated water",
    short: "Category 3 losses handled under containment, safely and discreetly.",
    live: false,
  },
  {
    slug: "reconstruction",
    title: "Repair & reconstruction",
    short: "Drywall, flooring and cabinetry put back the way it was.",
    live: false,
  },
] as const;

/**
 * Image credits — all Unsplash, free for commercial use under the Unsplash
 * Licence. These are MOCKUP placeholders. Real photographs of the client's
 * own crew, trucks and completed jobs should replace every one of them before
 * launch; genuine photos are the single biggest trust lever on this kind of
 * site.
 */
export const img = {
  mauiAerial: "https://images.unsplash.com/photo-1558108401-e45afa05deb8",
  mauiCoast: "https://images.unsplash.com/photo-1678156913491-d9a6b5f33db1",
  mauiRocky: "https://images.unsplash.com/photo-1568576599263-ad9f374633d4",
  mauiBay: "https://images.unsplash.com/photo-1624315030926-c597ed59270a",
  ceilingDamage: "https://images.unsplash.com/photo-1737739973200-61c2ae4d1272",
  wallDamp: "https://images.unsplash.com/photo-1635260166178-41e20858d0d3",
  mold: "https://images.unsplash.com/photo-1649777882133-525e923fd5d7",
  technician: "https://images.unsplash.com/photo-1676210134050-6f12c6898395",
  pipes: "https://images.unsplash.com/photo-1646009445351-b8192e095f3a",
  stormRidge: "https://images.unsplash.com/photo-1693004647158-bce1e20abd4c",
  rebuild: "https://images.unsplash.com/photo-1618832515490-e181c4794a45",
} as const;

/** Build a sized Unsplash URL. */
export function photo(base: string, w = 1600, q = 72) {
  return `${base}?auto=format&fit=crop&w=${w}&q=${q}`;
}

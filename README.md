# Maui Water Damage Pros — website mockup

A demonstration build for client review. Five pages, statically generated.

**This is a mockup.** Phone number, address, licence details, certifications and
reviews are placeholders. See [Before launch](#before-launch).

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Motion |
| Icons | Lucide |
| Hosting | Vercel |

No UI template or theme. The design system lives in `src/app/globals.css`;
layout and components are custom. Everything used is MIT licensed.

## Run it

```bash
npm install
npm run dev
```

## Pages

| Route | Purpose |
|---|---|
| `/` | Emergency conversion, trust, services |
| `/water-damage-restoration` | Service pillar — process, water categories |
| `/water-damage-restoration-cost-maui` | Cost guide — the AI-search play |
| `/service-areas/kihei` | Location template, repeatable to 10 towns |
| `/contact` | Dispatch details and callback form |

## How it is organised

- `src/lib/site.ts` — **every business fact lives here.** Phone, address,
  service areas, credentials, image URLs. Change it in one place and it updates
  site-wide. Placeholders are commented as such.
- `src/lib/schema.tsx` — JSON-LD builders (`LocalBusiness`, `Service`,
  `FAQPage`, `BreadcrumbList`, `Organization`).
- `src/components/` — layout shell, FAQ, form, reveal animation.

## Search and AI notes

The client's brief asked for Google AI Overview and ChatGPT visibility. Worth
knowing what was measured rather than assumed:

- **`water damage restoration maui` returns no AI Overview.** That SERP opens
  with the local map pack. Emergency calls are won on Google Business Profile
  and review volume, not on this website.
- **Informational queries do fire AI Overviews** — the Hawaii cost query returns
  one with a cost table, citing mainland blogs because no Maui-specific cost
  content exists. That gap is what
  `/water-damage-restoration-cost-maui` is built to fill.
- `FAQPage` schema is implemented throughout. Note that Google retired FAQ
  *rich results* on 7 May 2026 — this markup is for AI Overview eligibility and
  LLM parsing, not for a visual snippet.
- `robots.ts` explicitly allows `GPTBot`, `OAI-SearchBot`, `PerplexityBot`,
  `ClaudeBot` and `Google-Extended`. An engine cannot cite what it cannot read.
- FAQ answers use native `<details>` so the text sits in the HTML whether or
  not it is expanded, and is readable by crawlers.

## Before launch

> ⚠️ **Read this list.** The on-page "mockup" notices were removed at the
> client's request so the demo reads as a finished site. The placeholder
> *data* is still placeholder — it is simply no longer labelled anywhere a
> visitor can see. This checklist is now the only record of what is fake.

Blocking items — the site should not go live until these are resolved:

1. **Credentials.** Confirm IICRC certification (WRT/ASD/AMRT), Hawaii
   Contractors State License Board number and classification, and insurance.
   Hawaii does not licence water *mitigation*, but repair and reconstruction
   require a licence and insurers require IICRC. Publishing credentials the
   business does not hold is false advertising — remove the trust strip rather
   than guess.
2. **Phone and address.** The number is in the 555-01XX fiction-reserved range.
   Decide whether this is a storefront or a service-area business; that choice
   drives the Google Business Profile setup.
3. **Response time.** `site.responseTime` is a placeholder. A competitor
   publishes "45-minute arrival". Only commit to a number the business can keep.
4. **Cost figures.** The ranges on the cost page are built from national
   restoration pricing adjusted for Hawaii. Replace with real rates.
5. **Contact form.** Validates but does not submit anywhere. Needs a route
   handler and spam protection.
6. **Photography.** All images are Unsplash placeholders. Real photos of the
   crew, trucks and finished jobs are the single biggest trust lever here.
7. **Reviews.** The reviews section is intentionally empty. Add
   `AggregateRating` schema only once genuine reviews exist — marking up
   invented ratings risks a manual penalty.

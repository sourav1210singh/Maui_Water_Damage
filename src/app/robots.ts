import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * AI crawlers are explicitly allowed.
 *
 * This is a deliberate decision, not an oversight. The client's stated goal is
 * to be surfaced by ChatGPT, Google AI Overviews and similar engines, and an
 * engine cannot cite a page it is not permitted to read. Blocking these agents
 * (which a lot of boilerplate robots.txt files now do by default) would quietly
 * defeat the entire reason for the project.
 *
 * The trade-off is real and worth stating to the client: allowing these
 * crawlers means our content can be summarised in an answer the user reads
 * without visiting the site. For a local emergency service that is an
 * acceptable trade, because the goal is to be the business named in that
 * answer, with the phone number attached.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" }, // Gemini / AI Overviews grounding
      { userAgent: "GPTBot", allow: "/" }, // OpenAI training
      { userAgent: "OAI-SearchBot", allow: "/" }, // ChatGPT search
      { userAgent: "ChatGPT-User", allow: "/" }, // ChatGPT browsing on request
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" }, // Common Crawl, feeds many models
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${site.url}/water-damage-restoration`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/water-damage-restoration-cost-maui`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/service-areas/kihei`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}

import type { MetadataRoute } from "next";
import { getAllRecipes } from "@/lib/recipes";
import { site } from "@/lib/site";
import { getAllTips } from "@/lib/tips";

export default function sitemap(): MetadataRoute.Sitemap {
  const recipes = getAllRecipes().map((r) => ({
    url: `${site.url}/recipes/${r.slug}`,
    lastModified: r.updated || r.date,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const cats = site.categories.map((c) => ({
    url: `${site.url}/category/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
  const tips = getAllTips().map((t) => ({
    url: `${site.url}/tips/${t.slug}`,
    lastModified: t.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [
    { url: site.url, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/tips`, changeFrequency: "weekly" as const, priority: 0.6 },
    ...cats,
    ...recipes,
    ...tips,
  ];
}

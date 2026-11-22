import type { MetadataRoute } from "next";
import { getAllRecipes } from "@/lib/recipes";
import { site } from "@/lib/site";

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
  return [{ url: site.url, changeFrequency: "daily", priority: 1 }, ...cats, ...recipes];
}

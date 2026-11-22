import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "content", "recipes");

export type Recipe = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  image: string;
  imageAlt?: string;
  category: string;
  tags: string[];
  cuisine?: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  calories?: number;
  ingredients: string[];
  steps: string[];
  tips?: string[];
  faq?: { q: string; a: string }[];
  html: string; // intro article (markdown body)
};

function read(file: string): Recipe {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    description: data.description,
    date: new Date(data.date).toISOString(),
    updated: data.updated ? new Date(data.updated).toISOString() : undefined,
    image: data.image,
    imageAlt: data.imageAlt,
    category: data.category,
    tags: data.tags ?? [],
    cuisine: data.cuisine,
    prepTime: data.prepTime ?? 0,
    cookTime: data.cookTime ?? 0,
    servings: data.servings ?? 1,
    calories: data.calories,
    ingredients: data.ingredients ?? [],
    steps: data.steps ?? [],
    tips: data.tips ?? [],
    faq: data.faq ?? [],
    html: marked.parse(content, { async: false }) as string,
  };
}

export function getAllRecipes(): Recipe[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(read)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRecipe(slug: string): Recipe | undefined {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(DIR, file))) return undefined;
  return read(file);
}

export function getByCategory(cat: string) {
  return getAllRecipes().filter((r) => r.category === cat);
}

export function getRelated(r: Recipe, n = 3) {
  return getAllRecipes()
    .filter((x) => x.slug !== r.slug)
    .map((x) => ({
      x,
      score: (x.category === r.category ? 2 : 0) + x.tags.filter((t) => r.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((s) => s.x);
}

export const iso = (min: number) => `PT${min}M`;
export const fmt = (min: number) =>
  min >= 60 ? `${Math.floor(min / 60)} hr${min % 60 ? ` ${min % 60} min` : ""}` : `${min} min`;

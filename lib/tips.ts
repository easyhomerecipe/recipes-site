import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "content", "tips");

export type Tip = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  imageAlt?: string;
  section: string;
  tags: string[];
  readTime: number; // minutes
  faq: { q: string; a: string }[];
  html: string;
};

function safeIso(v: unknown) {
  const d = v ? new Date(v as string) : null;
  return d && !isNaN(d.getTime()) ? d.toISOString() : "2026-01-01T00:00:00.000Z";
}

function read(file: string): Tip {
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  if (!data.title) throw new Error("missing title");
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: data.title,
    description: data.description ?? "",
    date: safeIso(data.date),
    image: data.image ?? "",
    imageAlt: data.imageAlt,
    section: data.section || "Tips & Tricks",
    tags: data.tags ?? [],
    readTime: Math.max(2, Math.round(words / 220)),
    faq: data.faq ?? [],
    html: marked.parse(content, { async: false }) as string,
  };
}

export function getAllTips(): Tip[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .flatMap((f) => {
      try {
        return [read(f)];
      } catch (e) {
        console.warn(`[tips] skipped ${f}: ${(e as Error).message}`);
        return [];
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getTip(slug: string): Tip | undefined {
  return getAllTips().find((t) => t.slug === slug);
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RecipeCard from "@/components/RecipeCard";
import AdSlot from "@/components/AdSlot";
import { getByCategory } from "@/lib/recipes";
import { site } from "@/lib/site";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return site.categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = site.categories.find((x) => x.slug === category);
  if (!c) return {};
  return {
    title: `${c.name} Recipes`,
    description: `Easy ${c.name.toLowerCase()} recipes with step-by-step instructions.`,
    alternates: { canonical: `/category/${c.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const slug = (await params).category;
  const c = site.categories.find((x) => x.slug === slug);
  if (!c) notFound();
  const recipes = getByCategory(slug);
  return (
    <>
      <h1>{c.name} Recipes</h1>
      <p className="lead">Easy {c.name.toLowerCase()} recipes with step-by-step instructions.</p>
      <AdSlot />
      {recipes.length ? (
        <div className="grid">{recipes.map((r) => <RecipeCard key={r.slug} r={r} />)}</div>
      ) : (
        <p>New recipes coming soon.</p>
      )}
    </>
  );
}

import type { Metadata } from "next";
import RecipeCard from "@/components/RecipeCard";
import { getAllRecipes } from "@/lib/recipes";

export const metadata: Metadata = { title: "Search recipes", robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const q = ((await searchParams).q || "").trim().toLowerCase();
  const results = q
    ? getAllRecipes().filter((r) =>
        [r.title, r.description, r.tags.join(" "), r.ingredients.join(" ")].join(" ").toLowerCase().includes(q)
      )
    : [];
  return (
    <>
      <h1>Search recipes</h1>
      <form className="search">
        <input name="q" defaultValue={q} placeholder="chicken, cake, tagine..." />
        <button className="btn">Search</button>
      </form>
      {q && <p>{results.length} result(s) for “{q}”</p>}
      <div className="grid">{results.map((r) => <RecipeCard key={r.slug} r={r} />)}</div>
    </>
  );
}

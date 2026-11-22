import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import AdSlot from "@/components/AdSlot";
import { getAllRecipes } from "@/lib/recipes";
import { site } from "@/lib/site";

export default function Home() {
  const recipes = getAllRecipes();
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      <section className="hero">
        <h1>{site.tagline}</h1>
        <p>{site.description}</p>
        <div className="chips">
          {site.categories.map((c) => (
            <Link key={c.slug} className="chip" href={`/category/${c.slug}`}>{c.name}</Link>
          ))}
        </div>
      </section>
      <AdSlot />
      <h2>Latest recipes</h2>
      <div className="grid">
        {recipes.map((r) => <RecipeCard key={r.slug} r={r} />)}
      </div>
    </>
  );
}

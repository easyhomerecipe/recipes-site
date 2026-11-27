import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import AdSlot from "@/components/AdSlot";
import { getAllRecipes, fmt, type Recipe } from "@/lib/recipes";
import { site, categoryName } from "@/lib/site";

const HOLIDAY_TAGS = ["christmas", "holiday", "thanksgiving", "new year", "new year's eve", "festive", "winter"];
const isHoliday = (r: Recipe) =>
  r.category === "holiday" || r.tags.some((t) => HOLIDAY_TAGS.includes(String(t).toLowerCase()));

// Christmas season: 15 Nov – 6 Jan (the page is rebuilt every day by new recipes)
function holidaySeason(d = new Date()) {
  const m = d.getUTCMonth(), day = d.getUTCDate();
  return (m === 10 && day >= 15) || m === 11 || (m === 0 && day <= 6);
}

const dateLabel = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function Home() {
  const recipes = getAllRecipes();
  const [featured, ...rest] = recipes;
  const latest = rest.slice(0, 5);
  const holiday = recipes.filter(isHoliday).slice(0, 6);
  const showHoliday = holidaySeason() && holiday.length > 0;

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

      <section className="hero hero-compact">
        <h1>{site.tagline}</h1>
        <p>{site.description}</p>
        <form action="/search" className="hero-search">
          <input name="q" placeholder="Find a recipe or ingredient…" aria-label="Search recipes" />
          <button className="btn" aria-label="Search">Search</button>
        </form>
        <p className="stats">
          <span><b>{recipes.length}</b> recipes</span>
          <span><b>{site.categories.length}</b> categories</span>
          <span>New recipes <b>every day</b></span>
        </p>
      </section>

      {featured && (
        <section className="top">
          <Link href={`/recipes/${featured.slug}`} className="featured">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.image} alt={featured.imageAlt || featured.title} width={900} height={600} />
            <div className="featured-body">
              <span className="pill">{categoryName(featured.category)} · New</span>
              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
              <p className="meta">⏱ {fmt(featured.prepTime + featured.cookTime)} · 🍽 {featured.servings} servings</p>
            </div>
          </Link>

          <aside className="latest">
            <h2 className="section-title">The Latest</h2>
            {latest.map((r) => (
              <Link key={r.slug} href={`/recipes/${r.slug}`} className="latest-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image} alt={r.imageAlt || r.title} width={120} height={90} loading="lazy" />
                <div>
                  <span className="pill">{categoryName(r.category)}</span>
                  <span className="when">{dateLabel(r.date)}</span>
                  <h3>{r.title}</h3>
                </div>
              </Link>
            ))}
          </aside>
        </section>
      )}

      <AdSlot />

      {showHoliday && (
        <section className="holiday">
          <div className="row-head">
            <h2 className="section-title">🎄 Christmas &amp; Holiday Recipes</h2>
            <Link href="/category/holiday" className="see-all">See all →</Link>
          </div>
          <div className="grid">{holiday.map((r) => <RecipeCard key={r.slug} r={r} />)}</div>
        </section>
      )}

      {site.categories
        .filter((c) => c.slug !== "holiday")
        .map((c) => {
          const items = recipes.filter((r) => r.category === c.slug).slice(0, 3);
          if (!items.length) return null;
          return (
            <section key={c.slug} className="cat-row">
              <div className="row-head">
                <h2 className="section-title">{c.name} Recipes</h2>
                <Link href={`/category/${c.slug}`} className="see-all">See all →</Link>
              </div>
              <div className="grid">{items.map((r) => <RecipeCard key={r.slug} r={r} />)}</div>
            </section>
          );
        })}
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import PrintButton from "@/components/PrintButton";
import RecipeCard from "@/components/RecipeCard";
import { getAllRecipes, getRecipe, getRelated, iso, fmt } from "@/lib/recipes";
import { site, categoryName } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllRecipes().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = getRecipe((await params).slug);
  if (!r) return {};
  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: `/recipes/${r.slug}` },
    openGraph: {
      type: "article",
      title: r.title,
      description: r.description,
      images: [{ url: r.image }],
      publishedTime: r.date,
      modifiedTime: r.updated || r.date,
    },
    twitter: { card: "summary_large_image", title: r.title, description: r.description, images: [r.image] },
    other: { "pinterest-rich-pin": "true" },
  };
}

export default async function RecipePage({ params }: Props) {
  const r = getRecipe((await params).slug);
  if (!r) notFound();
  const url = `${site.url}/recipes/${r.slug}`;

  const recipeLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: r.title,
    description: r.description,
    image: [r.image.startsWith("/") ? `${site.url}${r.image}` : r.image],
    author: { "@type": "Person", name: site.author },
    datePublished: r.date,
    dateModified: r.updated || r.date,
    prepTime: iso(r.prepTime),
    cookTime: iso(r.cookTime),
    totalTime: iso(r.prepTime + r.cookTime),
    recipeYield: `${r.servings} servings`,
    recipeCategory: categoryName(r.category),
    recipeCuisine: r.cuisine,
    keywords: r.tags.join(", "),
    recipeIngredient: r.ingredients,
    recipeInstructions: r.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: s,
      url: `${url}#step-${i + 1}`,
    })),
    ...(r.calories ? { nutrition: { "@type": "NutritionInformation", calories: `${r.calories} calories` } } : {}),
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: categoryName(r.category), item: `${site.url}/category/${r.category}` },
      { "@type": "ListItem", position: 3, name: r.title, item: url },
    ],
  };
  const faqLd = r.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: r.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <article className="recipe">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <nav className="crumbs">
        <Link href="/">Home</Link> › <Link href={`/category/${r.category}`}>{categoryName(r.category)}</Link> › {r.title}
      </nav>
      <h1>{r.title}</h1>
      <p className="lead">{r.description}</p>
      <p className="meta">
        By {site.author} · Updated {new Date(r.updated || r.date).toLocaleDateString("en-US", { dateStyle: "long" })}
      </p>
      <a href="#recipe-card" className="btn jump">↓ Jump to Recipe</a>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero-img" src={r.image} alt={r.imageAlt || r.title} width={1200} height={800} />

      <div className="prose" dangerouslySetInnerHTML={{ __html: r.html }} />
      <AdSlot />

      <section id="recipe-card" className="recipe-card">
        <h2>{r.title}</h2>
        <div className="times">
          <div><b>Prep</b>{fmt(r.prepTime)}</div>
          <div><b>Cook</b>{fmt(r.cookTime)}</div>
          <div><b>Total</b>{fmt(r.prepTime + r.cookTime)}</div>
          <div><b>Servings</b>{r.servings}</div>
          {r.calories && <div><b>Calories</b>{r.calories}</div>}
        </div>
        <h3>Ingredients</h3>
        <ul className="ingredients">
          {r.ingredients.map((i) => <li key={i}>{i}</li>)}
        </ul>
        <h3>Instructions</h3>
        <ol className="steps">
          {r.steps.map((s, i) => <li key={i} id={`step-${i + 1}`}>{s}</li>)}
        </ol>
        {r.tips && r.tips.length > 0 && (
          <>
            <h3>Tips</h3>
            <ul>{r.tips.map((t) => <li key={t}>{t}</li>)}</ul>
          </>
        )}
        <PrintButton />
      </section>

      {r.faq && r.faq.length > 0 && (
        <section className="faq">
          <h2>Frequently asked questions</h2>
          {r.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>
      )}

      <AdSlot />
      <h2>You may also like</h2>
      <div className="grid">
        {getRelated(r).map((x) => <RecipeCard key={x.slug} r={x} />)}
      </div>
    </article>
  );
}

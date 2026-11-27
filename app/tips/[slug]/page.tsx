import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import TipCard from "@/components/TipCard";
import RecipeCard from "@/components/RecipeCard";
import { getAllTips, getTip } from "@/lib/tips";
import { getAllRecipes } from "@/lib/recipes";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllTips().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getTip((await params).slug);
  if (!t) return {};
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: `/tips/${t.slug}` },
    openGraph: { type: "article", title: t.title, description: t.description, images: t.image ? [{ url: t.image }] : [], publishedTime: t.date },
    twitter: { card: "summary_large_image", title: t.title, description: t.description, images: t.image ? [t.image] : [] },
  };
}

export default async function TipPage({ params }: Props) {
  const t = getTip((await params).slug);
  if (!t) notFound();
  const url = `${site.url}/tips/${t.slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: t.description,
    image: t.image ? [t.image.startsWith("/") ? `${site.url}${t.image}` : t.image] : undefined,
    datePublished: t.date,
    dateModified: t.date,
    author: { "@type": "Person", name: site.author },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: url,
  };
  const faqLd = t.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: t.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }
    : null;
  const tagSet = new Set(t.tags.map((x) => String(x).toLowerCase()));
  const recipes = getAllRecipes()
    .map((r) => ({ r, s: r.tags.filter((x) => tagSet.has(String(x).toLowerCase())).length }))
    .sort((a, b) => b.s - a.s)
    .slice(0, 3)
    .map((x) => x.r);
  const more = getAllTips().filter((x) => x.slug !== t.slug).sort((a, b) => Number(b.section === t.section) - Number(a.section === t.section)).slice(0, 4);

  return (
    <article className="recipe">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <nav className="crumbs">
        <Link href="/">Home</Link> › <Link href="/tips">Kitchen Tips</Link> › {t.section}
      </nav>
      <h1>{t.title}</h1>
      <p className="lead">{t.description}</p>
      <p className="meta">
        By {site.author} · {new Date(t.date).toLocaleDateString("en-US", { dateStyle: "long", timeZone: "UTC" })} · {t.readTime} min read
      </p>
      {t.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="hero-img" src={t.image} alt={t.imageAlt || t.title} width={1200} height={800} />
      )}
      <div className="prose" dangerouslySetInnerHTML={{ __html: t.html }} />
      <AdSlot />
      {t.faq.length > 0 && (
        <section className="faq">
          <h2>Frequently asked questions</h2>
          {t.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>
      )}
      {recipes.length > 0 && (
        <>
          <h2>Recipes to try</h2>
          <div className="grid">{recipes.map((r) => <RecipeCard key={r.slug} r={r} />)}</div>
        </>
      )}
      {more.length > 0 && (
        <>
          <h2>More kitchen tips</h2>
          <div className="grid grid-4">{more.map((x) => <TipCard key={x.slug} t={x} />)}</div>
        </>
      )}
    </article>
  );
}

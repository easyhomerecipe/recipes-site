import Link from "next/link";
import type { Recipe } from "@/lib/recipes";
import { fmt } from "@/lib/recipes";
import { categoryName } from "@/lib/site";

export default function RecipeCard({ r }: { r: Recipe }) {
  return (
    <article className="card">
      <Link href={`/recipes/${r.slug}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={r.image} alt={r.imageAlt || r.title} loading="lazy" width={600} height={400} />
        <div className="card-body">
          <span className="pill">{categoryName(r.category)}</span>
          <h3>{r.title}</h3>
          <p className="meta">⏱ {fmt(r.prepTime + r.cookTime)} · 🍽 {r.servings} servings</p>
        </div>
      </Link>
    </article>
  );
}

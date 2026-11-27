import Link from "next/link";
import type { Tip } from "@/lib/tips";

export default function TipCard({ t }: { t: Tip }) {
  return (
    <article className="card">
      <Link href={`/tips/${t.slug}`}>
        {t.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.image} alt={t.imageAlt || t.title} loading="lazy" width={600} height={400} />
        )}
        <div className="card-body">
          <span className="pill">{t.section}</span>
          <h3>{t.title}</h3>
          <p className="meta">📖 {t.readTime} min read</p>
        </div>
      </Link>
    </article>
  );
}

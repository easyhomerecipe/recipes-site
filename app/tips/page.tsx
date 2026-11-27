import type { Metadata } from "next";
import TipCard from "@/components/TipCard";
import AdSlot from "@/components/AdSlot";
import { getAllTips } from "@/lib/tips";

export const metadata: Metadata = {
  title: "Kitchen Tips",
  description: "Practical kitchen tips and cooking basics: how to store food, cook staples, substitute ingredients and save time in the kitchen.",
  alternates: { canonical: "/tips" },
};

export default function TipsPage() {
  const tips = getAllTips();
  const sections = [...new Set(tips.map((t) => t.section))];
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <>
      <h1>Kitchen Tips</h1>
      <p className="lead">Practical cooking basics: how to store food, cook staples, substitute ingredients and save time in the kitchen.</p>
      <AdSlot />
      {sections.length > 1 && (
        <div className="chips tip-chips">
          {sections.map((s) => <a key={s} className="chip" href={`#${slug(s)}`}>{s}</a>)}
        </div>
      )}
      {tips.length ? (
        sections.map((s) => (
          <section key={s} id={slug(s)}>
            <h2 className="section-title">{s}</h2>
            <div className="grid grid-4">{tips.filter((t) => t.section === s).map((t) => <TipCard key={t.slug} t={t} />)}</div>
          </section>
        ))
      ) : (
        <p>New kitchen tips coming soon.</p>
      )}
    </>
  );
}

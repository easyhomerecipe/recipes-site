import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Easy Home Recipes",
  description: "Contact Easy Home Recipes for recipe questions, feedback, corrections or partnership inquiries.",
  alternates: { canonical: "https://easyhomerecipe.com/contact" },
};

export default function ContactPage() {
  return (
    <article className="recipe prose">
      <h1>Contact Us</h1>
      <p className="lead">
        We love hearing from our readers. Questions about a recipe, suggestions,
        corrections or business inquiries — just send us an email.
      </p>

      <div className="recipe-card">
        <h2>Email</h2>
        <p>
          <a href="mailto:contact@easyhomerecipe.com">contact@easyhomerecipe.com</a>
        </p>
        <p className="meta">We usually reply within 2–3 business days.</p>
      </div>

      <h2>Before you write</h2>
      <ul>
        <li>For recipe questions, include the recipe name so we can help faster.</li>
        <li>For partnership or advertising inquiries, briefly describe your brand and proposal.</li>
        <li>For copyright or content concerns, include the page URL and details of the issue.</li>
      </ul>
    </article>
  );
}

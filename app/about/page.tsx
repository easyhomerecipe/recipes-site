import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About", alternates: { canonical: "/about" } };

export default function About() {
  return (
    <div className="prose">
      <h1>About {site.name}</h1>
      <p>
        {site.name} shares simple, tested recipes that anyone can cook at home. Every recipe includes clear
        ingredient lists, step-by-step instructions, cooking times and practical tips.
      </p>
      <p>
        Behind the blog is {site.author}, a home cook who loves Moroccan flavors and quick everyday meals.
      </p>
      <p>Questions or suggestions? Contact us at: contact@easyhomerecipe.com</p>
    </div>
  );
}

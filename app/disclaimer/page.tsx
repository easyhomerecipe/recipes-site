import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Easy Home Recipes",
  description: "Important information about our recipes: allergies, nutrition estimates, food safety, advertising and affiliate links.",
  alternates: { canonical: "https://easyhomerecipe.com/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <article className="recipe prose">
      <h1>Disclaimer</h1>
      <p className="meta">Last updated: November 23, 2026</p>

      <p>
        The information on <strong>easyhomerecipe.com</strong> is provided for general
        informational and educational purposes only. By using the Site, you acknowledge and
        agree to the points below.
      </p>

      <h2>Not professional advice</h2>
      <p>
        We are home cooks, not doctors, dietitians or nutritionists. Nothing on this Site is
        medical, nutritional or health advice. If you have a medical condition or specific
        dietary needs, please consult a qualified professional.
      </p>

      <h2>Allergies and dietary restrictions</h2>
      <p>
        Recipes may contain common allergens such as nuts, peanuts, dairy, eggs, gluten,
        soy, fish or shellfish. Always read ingredient labels carefully and adapt recipes to
        your own needs. We are not responsible for allergic reactions or adverse effects
        resulting from the use of our recipes.
      </p>

      <h2>Nutrition information</h2>
      <p>
        Any nutrition information is an estimate calculated with online tools and may vary
        depending on the brands, quantities and substitutions you use.
      </p>

      <h2>Food safety</h2>
      <p>
        Please follow safe food handling practices: wash hands and surfaces, avoid
        cross-contamination, cook meat, poultry, seafood and eggs to safe internal
        temperatures, and store leftovers properly. Cooking times are guidelines only, as
        ovens and equipment vary.
      </p>

      <h2>Results may vary</h2>
      <p>
        We do our best to make our recipes accurate and easy to follow, but we cannot
        guarantee specific results.
      </p>

      <h2>Advertising and affiliate links</h2>
      <p>
        This Site displays advertising (including Google AdSense) and may contain affiliate
        links. If you click an affiliate link and make a purchase, we may earn a small
        commission at no extra cost to you. This helps support the Site.
      </p>

      <h2>Contact</h2>
      <p>
        Spotted an error or have a question? Email us at{" "}
        <a href="mailto:contact@easyhomerecipe.com">contact@easyhomerecipe.com</a> or visit
        our <a href="/contact">contact page</a>.
      </p>
    </article>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Easy Home Recipes",
  description: "Terms and conditions for using easyhomerecipe.com, including use of our recipes, text and photos.",
  alternates: { canonical: "https://easyhomerecipe.com/terms-of-service" },
};

export default function TermsPage() {
  return (
    <article className="recipe prose">
      <h1>Terms of Service</h1>
      <p className="meta">Last updated: November 23, 2026</p>

      <p>
        Welcome to <strong>easyhomerecipe.com</strong> (the “Site”), operated by Easy Home
        Recipes (“we”, “us”, “our”). By accessing or using the Site, you agree to these
        Terms of Service. If you do not agree, please do not use the Site.
      </p>

      <h2>1. Use of the Site</h2>
      <p>
        You may use the Site for personal, non-commercial purposes. You agree not to misuse
        the Site, including by attempting unauthorized access, disrupting its operation,
        scraping content in bulk, or using it for any unlawful purpose.
      </p>

      <h2>2. Intellectual property</h2>
      <p>
        All content on the Site — recipe text, instructions, photos, images, logos and
        design — is owned by Easy Home Recipes or used with permission, and is protected by
        copyright law.
      </p>
      <ul>
        <li>You may print or save recipes for your own personal use.</li>
        <li>
          You may share a link to our recipes, or use one photo with clear credit and a link
          back to the original recipe page.
        </li>
        <li>
          You may not republish full recipes, copy our text or photos, or use our content
          commercially without our written permission.
        </li>
      </ul>

      <h2>3. Recipes and results</h2>
      <p>
        Recipes are provided for general information. Results can vary depending on
        ingredients, equipment, altitude and technique. Please read our{" "}
        <a href="/disclaimer">Disclaimer</a> for important information about allergies,
        nutrition and food safety.
      </p>

      <h2>4. Third-party links and advertising</h2>
      <p>
        The Site may display advertisements and contain links to third-party websites. We
        do not control and are not responsible for their content, products or practices.
      </p>

      <h2>5. Disclaimer of warranties</h2>
      <p>
        The Site and its content are provided “as is” and “as available” without warranties
        of any kind. We do not guarantee that the Site will be uninterrupted or error-free.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Easy Home Recipes shall not be liable for any
        direct, indirect, incidental or consequential damages arising from your use of the
        Site or reliance on its content.
      </p>

      <h2>7. Changes to these terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the Site after changes
        are posted means you accept the updated Terms.
      </p>

      <h2>8. Governing law</h2>
      <p>These Terms are governed by the laws of the Kingdom of Morocco.</p>

      <h2>9. Contact</h2>
      <p>
        Questions about these Terms? Email us at{" "}
        <a href="mailto:contact@easyhomerecipe.com">contact@easyhomerecipe.com</a>.
      </p>
    </article>
  );
}

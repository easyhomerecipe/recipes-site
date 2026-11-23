// ===== Edit these values for your blog =====
export const site = {
  name: "Easy Home Recipes",
  tagline: "Simple, tested recipes for every day",
  description:
    "Easy, tested home recipes with step-by-step instructions, ingredient lists, cooking times and nutrition info.",
  // Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://easyhomerecipe.com)
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  author: "Kabir",
  // Google AdSense publisher ID, e.g. "ca-pub-1234567890123456" (leave empty until approved)
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
  // Google Analytics 4 ID, e.g. "G-XXXXXXX"
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  categories: [
    { slug: "breakfast", name: "Breakfast" },
    { slug: "dinner", name: "Dinner" },
    { slug: "desserts", name: "Desserts" },
    { slug: "healthy", name: "Healthy" },
    { slug: "moroccan", name: "Moroccan" },
  ],
};

export function categoryName(slug: string) {
  return site.categories.find((c) => c.slug === slug)?.name ?? slug;
}

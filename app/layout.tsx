import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: "website" },
  alternates: { canonical: "/" },
  other: {
    "p:domain_verify": "34523a2f7ecfed15342b042cab4fb9f5",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {site.adsenseClient && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {site.gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.gaId}');`}
            </Script>
          </>
        )}
        <header className="header">
          <div className="wrap nav">
            <Link href="/" className="logo">🍲 {site.name}</Link>
            <nav>
              {site.categories.map((c) => (
                <Link key={c.slug} href={`/category/${c.slug}`}>{c.name}</Link>
              ))}
              <Link href="/search" className="nav-search-link">Search</Link>
              <form action="/search" className="nav-search">
                <input name="q" placeholder="Search recipes" aria-label="Search recipes" />
              </form>
            </nav>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="footer">
          <div className="wrap">
            <p>© {new Date().getFullYear()} {site.name}</p>
            <p>
              <Link href="/about">About</Link> · <Link href="/privacy">Privacy Policy</Link> · <Link href="/terms-of-service">Terms</Link> · <Link href="/disclaimer">Disclaimer</Link> · <Link href="/contact">Contact</Link>
            </p>
            <p className="follow">
              <a href="https://www.pinterest.com/easyhomerecipe_/" target="_blank" rel="me noopener noreferrer" className="follow-pin">
                📌 Follow us on Pinterest
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <div className="prose">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().getFullYear()}</p>
      <p>This policy explains how {site.name} ({site.url}) collects and uses information.</p>
      <h2>Cookies and advertising</h2>
      <p>
        We use Google AdSense to show ads. Third-party vendors, including Google, use cookies to serve ads based on
        your prior visits to this and other websites. Google&apos;s use of advertising cookies enables it and its
        partners to serve ads based on your visits. You can opt out of personalized advertising at{" "}
        <a href="https://www.google.com/settings/ads">Google Ads Settings</a>.
      </p>
      <h2>Analytics</h2>
      <p>We use Google Analytics to understand how visitors use the site. This data is aggregated and anonymous.</p>
      <h2>Contact</h2>
      <p>For any privacy question, contact: contact@yourdomain.com</p>
    </div>
  );
}

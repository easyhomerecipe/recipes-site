"use client";
import { useEffect } from "react";
import { site } from "@/lib/site";

// Place <AdSlot slot="1234567890" /> where you want ads.
// Shows nothing until NEXT_PUBLIC_ADSENSE_CLIENT is set.
export default function AdSlot({ slot = "" }: { slot?: string }) {
  useEffect(() => {
    if (!site.adsenseClient) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {}
  }, []);

  if (!site.adsenseClient) return null;
  return (
    <div className="ad">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={site.adsenseClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

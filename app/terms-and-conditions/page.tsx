import type { Metadata } from "next";
import StaticPageShell from "@/components/pages/static-page-shell";

export const metadata: Metadata = {
  title: "Terms and Conditions | Saffron Blessings",
  description: "Terms and conditions for using Saffron Blessings.",
};

export default function TermsAndConditionsPage() {
  return (
    <StaticPageShell
      eyebrow="Terms and Conditions"
      title="Clear terms for devotional shopping and support"
      intro="These terms outline the basic expectations for browsing Saffron Blessings, placing orders, using devotional content, and requesting customer support."
      highlights={[
        {
          title: "Orders",
          body: "Product details, prices, availability, and offers may change. Orders are confirmed only after successful checkout and acceptance.",
        },
        {
          title: "Delivery and Returns",
          body: "Delivery timelines depend on location and courier availability. Return eligibility depends on product condition, packaging, and the reason for return.",
        },
        {
          title: "Website Use",
          body: "Content, images, and branding on this site belong to Saffron Blessings and should not be copied or misused without permission.",
        },
      ]}
    >
      <section className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-[900px] rounded-[8px] border border-orange-200 bg-white p-5 text-[14px] leading-7 text-orange-950/70 shadow-sm shadow-orange-900/5 sm:p-7">
          <p>
            Spiritual guidance and devotional descriptions on this website are informational and cultural in nature. They are not a substitute for professional legal, medical, financial, or personal advice.
          </p>
          <p className="mt-4">
            Before launching commercially, replace this draft with terms that match your registered business, payment provider, shipping policy, refund policy, and local legal requirements.
          </p>
        </div>
      </section>
    </StaticPageShell>
  );
}

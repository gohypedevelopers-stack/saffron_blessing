import type { Metadata } from "next";
import StaticPageShell from "@/components/pages/static-page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | Saffron Blessings",
  description: "Privacy policy for Saffron Blessings.",
};

export default function PrivacyPolicyPage() {
  return (
    <StaticPageShell
      eyebrow="Privacy Policy"
      title="Your information is handled with clarity and care"
      intro="This page explains how Saffron Blessings may collect, use, and protect information when you browse the website, place an order, or contact us for devotional support."
      highlights={[
        {
          title: "Information We Use",
          body: "We may use contact details, delivery information, order preferences, and messages you send us to process orders and respond to support requests.",
        },
        {
          title: "How We Use It",
          body: "Information is used for order handling, delivery coordination, customer care, payment support, and improving the website experience.",
        },
        {
          title: "Your Choices",
          body: "You can contact us to correct details, ask privacy questions, or request help with account and order information.",
        },
      ]}
    >
      <section className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-[900px] rounded-[8px] border border-orange-200 bg-white p-5 text-[14px] leading-7 text-orange-950/70 shadow-sm shadow-orange-900/5 sm:p-7">
          <p>
            We do not sell personal information. If third-party services are used for payment, analytics, delivery, or hosting, those services may process information according to their own policies.
          </p>
          <p className="mt-4">
            This is a general website policy page. Update it with your registered business details, legal jurisdiction, and exact service providers before publishing for commercial use.
          </p>
        </div>
      </section>
    </StaticPageShell>
  );
}

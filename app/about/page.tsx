import type { Metadata } from "next";
import StaticPageShell from "@/components/pages/static-page-shell";

export const metadata: Metadata = {
  title: "About Us | Saffron Blessings",
  description: "Learn about Saffron Blessings, a spiritual and religious store for puja essentials, meditation, and sacred gifting.",
};

export default function AboutPage() {
  return (
    <StaticPageShell
      eyebrow="About Us"
      title="A devotional store for peaceful homes and sacred rituals"
      intro="Saffron Blessings curates puja essentials, aarti sets, meditation malas, temple decor, and spiritual gifts with a warm saffron identity rooted in reverence, simplicity, and care."
      highlights={[
        {
          title: "Our Purpose",
          body: "We help families create a calm daily worship rhythm with accessible devotional products for home mandirs, meditation, and festival rituals.",
        },
        {
          title: "Our Collection",
          body: "Every offering is chosen for prayer, reflection, gifting, or decor, with saffron, brass, marigold, and warm temple-inspired details.",
        },
        {
          title: "Our Care",
          body: "Sacred items are packed respectfully, described clearly, and supported with simple guidance so each order feels considered.",
        },
      ]}
    />
  );
}

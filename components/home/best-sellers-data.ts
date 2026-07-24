export type BestSellerItem = {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  description: string;
  image: string;
  imageAlt: string;
  specs: {
    label: string;
    value: string;
  }[];
};

export const bestSellers: BestSellerItem[] = [
  {
    id: "wireless-headphones",
    name: "Rudraksha Mala",
    price: "Rs. 990",
    oldPrice: "Rs. 1,999",
    discount: "50% off",
    description:
      "A 108-bead meditation mala for mantra japa, breathwork, and quiet daily devotion, finished with a saffron cotton tassel.",
    image: "/spiritual-products.png",
    imageAlt: "Rudraksha mala for meditation and prayer",
    specs: [
      { label: "Practice", value: "Japa meditation" },
      { label: "Beads", value: "108 + guru bead" },
      { label: "Finish", value: "Saffron tassel" },
    ],
  },
  {
    id: "compact-camera",
    name: "Brass Aarti Set",
    price: "Rs. 1,990",
    oldPrice: "Rs. 3,999",
    discount: "50% off",
    description:
      "Hand-polished brass diya and aarti essentials made for evening prayer, festive puja, and sacred home mandir spaces.",
    image: "/spiritual-products.png",
    imageAlt: "Brass diya and aarti set",
    specs: [
      { label: "Material", value: "Brass" },
      { label: "Ritual", value: "Aarti and puja" },
      { label: "Care", value: "Reusable set" },
    ],
  },
  {
    id: "smartphone",
    name: "Festival Puja Kit",
    price: "Rs. 2,999",
    oldPrice: "Rs. 4,999",
    discount: "40% off",
    description:
      "A complete devotional kit with kumkum, haldi, incense, diya, marigold accents, and prayer cloth for auspicious occasions.",
    image: "/spiritual-products.png",
    imageAlt: "Festival puja kit with diya and flowers",
    specs: [
      { label: "Includes", value: "Puja samagri" },
      { label: "Occasion", value: "Festivals" },
      { label: "Theme", value: "Saffron and gold" },
    ],
  },
];

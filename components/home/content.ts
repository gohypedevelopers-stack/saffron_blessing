export type NavDropdownItem = {
  label: string;
  items: string[];
};

export type CategoryItem = {
  title: string;
  src: string;
  alt: string;
};

export type ProductItem = {
  id: string;
  title: string;
  category?: string;
  subtitle: string;
  image: string;
  alt: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating: number;
  reviews: string;
  variantId?: string;
  availableForSale?: boolean;
  href?: string;
};

export type BestSellerItem = {
  title: string;
  price: string;
  compareAt: string;
  discount: string;
  description: string;
  specs: Array<{ label: string; value: string }>;
  image: string;
  alt: string;
  accent: string;
};

export const dropdownItems: NavDropdownItem[] = [
  {
    label: "OFFERINGS",
    items: ["Puja Essentials", "Meditation Tools", "Sacred Gifts"],
  },
  {
    label: "RITUALS",
    items: ["Daily Puja", "Festival Kits", "Temple Decor"],
  },
  {
    label: "GUIDANCE",
    items: ["Spiritual Consultation", "Prayer Requests", "Sacred Learning"],
  },
];

export const flatItems = ["Home", "About Us", "Contact Us"];

export const banners = [
  {
    src: "/spiritual-hero.png",
    alt: "Saffron devotional altar with diya, incense, bells, and marigolds",
  },
  {
    src: "/spiritual-hero.png",
    alt: "Warm mandir atmosphere for prayer and devotion",
  },
  {
    src: "/spiritual-hero.png",
    alt: "Sacred puja setting with saffron and gold tones",
  },
];

export const categories: CategoryItem[] = [
  {
    title: "Puja Kits",
    src: "/spiritual-products.png",
    alt: "Puja kit with diya, incense, kumkum, haldi, and flowers",
  },
  {
    title: "Meditation",
    src: "/spiritual-products.png",
    alt: "Meditation mala and devotional cloth",
  },
  {
    title: "Temple Decor",
    src: "/spiritual-products.png",
    alt: "Brass diya and marigold temple decor",
  },
  {
    title: "Sacred Gifts",
    src: "/spiritual-products.png",
    alt: "Spiritual gift items for devotion",
  },
  {
    title: "Festival Essentials",
    src: "/spiritual-products.png",
    alt: "Festival puja essentials with saffron flowers",
  },
];

export const products: ProductItem[] = [
  {
    id: "55-smart-tv",
    title: "Divine Puja Samagri Kit",
    subtitle: "Complete daily worship essentials.",
    image: "/spiritual-products.png",
    alt: "Divine puja samagri kit",
    price: "Rs. 2,999.00",
    oldPrice: "Rs. 4,999.00",
    rating: 4.8,
    reviews: "128",
  },
  {
    id: "c9-projector",
    title: "Brass Diya & Aarti Set",
    subtitle: "Warm light for sacred rituals.",
    image: "/spiritual-products.png",
    alt: "Brass diya and aarti set",
    price: "Rs. 1,990.00",
    oldPrice: "Rs. 3,499.00",
    rating: 4.7,
    reviews: "96",
  },
  {
    id: "techno-projector",
    title: "Rudraksha Meditation Mala",
    subtitle: "For mantra japa and stillness.",
    image: "/spiritual-products.png",
    alt: "Rudraksha meditation mala",
    price: "Rs. 990.00",
    oldPrice: "Rs. 1,999.00",
    rating: 4.6,
    reviews: "74",
  },
  {
    id: "iprojector-2-plus",
    title: "Festival Mandir Decor Set",
    subtitle: "Marigold, incense, and brass accents.",
    image: "/spiritual-products.png",
    alt: "Festival mandir decor set",
    price: "Rs. 3,490.00",
    oldPrice: "Rs. 5,999.00",
    rating: 4.9,
    reviews: "142",
  },
];

export const bestSellers: BestSellerItem[] = [
  {
    title: "Sacred Puja Kit",
    price: "Rs. 2,999",
    compareAt: "Rs. 4,999",
    discount: "60% off",
    description:
      "Bring a complete devotional setup home with brass diya, incense, roli, haldi, flowers, and a refined prayer cloth for peaceful daily worship.",
    specs: [
      { label: "Includes", value: "Diya, incense, roli" },
      { label: "Use", value: "Daily puja" },
      { label: "Finish", value: "Brass and cotton" },
    ],
    image: "/spiritual-products.png",
    alt: "Sacred puja kit",
    accent: "rgba(249, 115, 22, 0.24)",
  },
  {
    title: "Temple Aarti Set",
    price: "Rs. 1,990",
    compareAt: "Rs. 3,999",
    discount: "67% off",
    description:
      "A warm brass aarti set for evening prayer, temple corners, festival rituals, and mindful family gatherings.",
    specs: [
      { label: "Material", value: "Hand-polished brass" },
      { label: "Ritual", value: "Aarti and diya lighting" },
      { label: "Occasion", value: "Daily and festive" },
    ],
    image: "/spiritual-products.png",
    alt: "Temple aarti set",
    accent: "rgba(234, 88, 12, 0.24)",
  },
  {
    title: "Rudraksha Mala",
    price: "Rs. 990",
    compareAt: "Rs. 1,999",
    discount: "74% off",
    description:
      "A prayer mala selected for mantra repetition, meditation, and grounding devotional practice through the day.",
    specs: [
      { label: "Beads", value: "108 + guru bead" },
      { label: "Practice", value: "Japa meditation" },
      { label: "Thread", value: "Saffron cotton tassel" },
    ],
    image: "/spiritual-products.png",
    alt: "Rudraksha mala",
    accent: "rgba(194, 65, 12, 0.24)",
  },
];

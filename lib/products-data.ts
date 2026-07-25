export type ProductColor = {
  name: string;
  bg: string;
  border?: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductDetailItem = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating: number;
  reviewsCount: string;
  description: string;
  colors: ProductColor[];
  features: string[];
  specs: ProductSpec[];
  shippingNotice: string;
  mainImage: string;
  variantId?: string;
};

const spiritualImage = "/spiritual-products.png";

const sharedColors: ProductColor[] = [
  { name: "Saffron Orange", bg: "#f97316" },
  { name: "Temple Gold", bg: "#d97706" },
  { name: "Deep Maroon", bg: "#7f1d1d" },
];

export const productsCatalog: Record<string, ProductDetailItem> = {
  "yuqos-neosound-flex": {
    id: "yuqos-neosound-flex",
    slug: "yuqos-neosound-flex",
    name: "Home Mandir Blessing Set",
    category: "Temple Decor",
    categorySlug: "temple-decor",
    price: "Rs. 4,200",
    oldPrice: "Rs. 6,999",
    discount: "40% off",
    rating: 4.9,
    reviewsCount: "9.2K Reviews",
    description:
      "A complete sacred corner setup with warm brass accents, marigold styling, incense, and devotional cloth for a peaceful home mandir.",
    colors: sharedColors,
    features: [
      "Curated for daily worship and festivals",
      "Warm brass, saffron, and marigold styling",
      "Gift-ready devotional presentation",
    ],
    specs: [
      { label: "Use", value: "Home mandir" },
      { label: "Theme", value: "Saffron and gold" },
      { label: "Includes", value: "Decor and puja accents" },
      { label: "Care", value: "Reusable devotional set" },
    ],
    shippingNotice: "Free delivery with careful sacred-item packaging",
    mainImage: spiritualImage,
  },
  "wireless-headphones": {
    id: "wireless-headphones",
    slug: "wireless-headphones",
    name: "Rudraksha Meditation Mala",
    category: "Meditation",
    categorySlug: "meditation",
    price: "Rs. 990",
    oldPrice: "Rs. 1,999",
    discount: "50% off",
    rating: 4.8,
    reviewsCount: "4.5K Reviews",
    description:
      "A devotional mala for mantra japa, meditation, breath practice, and grounding spiritual discipline throughout the day.",
    colors: sharedColors,
    features: [
      "108 beads with guru bead",
      "Saffron cotton tassel finish",
      "Suitable for daily japa and meditation",
    ],
    specs: [
      { label: "Practice", value: "Japa meditation" },
      { label: "Beads", value: "108 + guru bead" },
      { label: "Finish", value: "Saffron tassel" },
    ],
    shippingNotice: "Packed respectfully with free delivery across India",
    mainImage: spiritualImage,
  },
  "compact-camera": {
    id: "compact-camera",
    slug: "compact-camera",
    name: "Brass Diya Pair",
    category: "Aarti Essentials",
    categorySlug: "aarti-essentials",
    price: "Rs. 1,299",
    oldPrice: "Rs. 2,499",
    discount: "48% off",
    rating: 4.7,
    reviewsCount: "3.1K Reviews",
    description:
      "A polished brass diya pair for morning and evening worship, temple decoration, festive lighting, and sacred ambience.",
    colors: sharedColors,
    features: [
      "Hand-polished brass look",
      "Ideal for aarti and festive decor",
      "Reusable and easy to maintain",
    ],
    specs: [
      { label: "Material", value: "Brass finish" },
      { label: "Set", value: "Pair of diyas" },
      { label: "Occasion", value: "Daily and festive" },
    ],
    shippingNotice: "Securely packed to protect brass surfaces",
    mainImage: spiritualImage,
  },
  smartphone: {
    id: "smartphone",
    slug: "smartphone",
    name: "Festival Puja Thali",
    category: "Puja Kits",
    categorySlug: "puja-kits",
    price: "Rs. 1,799",
    oldPrice: "Rs. 2,999",
    discount: "40% off",
    rating: 4.6,
    reviewsCount: "6.8K Reviews",
    description:
      "A festive puja thali arrangement with diya, incense, kumkum, haldi, flower accents, and devotional cloth for auspicious rituals.",
    colors: sharedColors,
    features: [
      "Ready for festival rituals",
      "Includes traditional puja essentials",
      "Warm saffron and gold presentation",
    ],
    specs: [
      { label: "Includes", value: "Thali essentials" },
      { label: "Ritual", value: "Festival puja" },
      { label: "Theme", value: "Saffron devotional" },
    ],
    shippingNotice: "Free delivery with careful puja packaging",
    mainImage: spiritualImage,
  },
  "55-smart-tv": {
    id: "55-smart-tv",
    slug: "55-smart-tv",
    name: "Divine Puja Samagri Kit",
    category: "Puja Kits",
    categorySlug: "puja-kits",
    price: "Rs. 2,999",
    oldPrice: "Rs. 4,999",
    discount: "40% off",
    rating: 4.8,
    reviewsCount: "1.2K Reviews",
    description:
      "A complete daily worship kit with diya, incense, roli, haldi, flowers, and devotional cloth for peaceful prayer at home.",
    colors: sharedColors,
    features: [
      "Daily worship essentials in one kit",
      "Saffron, brass, and marigold styling",
      "Suitable for gifting and home puja",
    ],
    specs: [
      { label: "Includes", value: "Diya, incense, roli" },
      { label: "Use", value: "Daily puja" },
      { label: "Packaging", value: "Gift ready" },
    ],
    shippingNotice: "Free home delivery and careful sacred-item handling",
    mainImage: spiritualImage,
  },
  "c9-projector": {
    id: "c9-projector",
    slug: "c9-projector",
    name: "Brass Diya & Aarti Set",
    category: "Aarti Essentials",
    categorySlug: "aarti-essentials",
    price: "Rs. 1,990",
    oldPrice: "Rs. 3,499",
    discount: "43% off",
    rating: 4.7,
    reviewsCount: "960 Reviews",
    description:
      "A warm brass aarti set designed for evening prayer, temple corners, festive rituals, and mindful family worship.",
    colors: sharedColors,
    features: [
      "Designed for aarti and diya lighting",
      "Reusable brass devotional finish",
      "Works for daily and festive worship",
    ],
    specs: [
      { label: "Material", value: "Brass finish" },
      { label: "Ritual", value: "Aarti" },
      { label: "Occasion", value: "Daily and festival" },
    ],
    shippingNotice: "Free delivery with secure protective packaging",
    mainImage: spiritualImage,
  },
  "techno-projector": {
    id: "techno-projector",
    slug: "techno-projector",
    name: "Rudraksha Meditation Mala",
    category: "Meditation",
    categorySlug: "meditation",
    price: "Rs. 990",
    oldPrice: "Rs. 1,999",
    discount: "50% off",
    rating: 4.6,
    reviewsCount: "740 Reviews",
    description:
      "A grounding mala for mantra repetition, quiet meditation, and spiritual discipline, finished in a devotional saffron style.",
    colors: sharedColors,
    features: [
      "108 beads for mantra practice",
      "Comfortable for daily meditation",
      "Traditional saffron tassel",
    ],
    specs: [
      { label: "Practice", value: "Japa" },
      { label: "Beads", value: "108" },
      { label: "Finish", value: "Saffron tassel" },
    ],
    shippingNotice: "Free delivery with respectful sacred-item packing",
    mainImage: spiritualImage,
  },
  "iprojector-2-plus": {
    id: "iprojector-2-plus",
    slug: "iprojector-2-plus",
    name: "Festival Mandir Decor Set",
    category: "Temple Decor",
    categorySlug: "temple-decor",
    price: "Rs. 3,490",
    oldPrice: "Rs. 5,999",
    discount: "42% off",
    rating: 4.9,
    reviewsCount: "1.4K Reviews",
    description:
      "A mandir decor set with marigold accents, brass-inspired pieces, incense mood, and saffron styling for festive devotion.",
    colors: sharedColors,
    features: [
      "Creates a warm temple atmosphere",
      "Festival-ready decor palette",
      "Pairs with puja kits and diyas",
    ],
    specs: [
      { label: "Theme", value: "Saffron mandir" },
      { label: "Use", value: "Festivals" },
      { label: "Includes", value: "Decor accents" },
    ],
    shippingNotice: "Free express delivery and protective packaging",
    mainImage: spiritualImage,
  },
  "24stv": {
    id: "24stv",
    slug: "24stv",
    name: "Daily Prayer Incense Set",
    category: "Incense",
    categorySlug: "incense",
    price: "Rs. 649",
    oldPrice: "Rs. 1,299",
    discount: "50% off",
    rating: 4.2,
    reviewsCount: "94 Reviews",
    description:
      "A calming incense set for morning prayers, meditation, and evening reflection with a warm devotional aroma.",
    colors: sharedColors,
    features: [
      "Ideal for prayer and meditation",
      "Warm temple-inspired fragrance",
      "Pairs well with diya lighting",
    ],
    specs: [
      { label: "Use", value: "Prayer" },
      { label: "Mood", value: "Calm and sacred" },
      { label: "Pairing", value: "Diya and mala" },
    ],
    shippingNotice: "Free delivery with fragrance-safe packaging",
    mainImage: spiritualImage,
  },
  "15-dpf": {
    id: "15-dpf",
    slug: "15-dpf",
    name: "Copper Kalash Puja Set",
    category: "Puja Kits",
    categorySlug: "puja-kits",
    price: "Rs. 2,499",
    oldPrice: "Rs. 4,199",
    discount: "40% off",
    rating: 4.4,
    reviewsCount: "76 Reviews",
    description:
      "A copper kalash-inspired puja set for auspicious rituals, home mandir decoration, and festive worship ceremonies.",
    colors: sharedColors,
    features: [
      "Traditional kalash presentation",
      "Made for auspicious occasions",
      "Complements saffron devotional decor",
    ],
    specs: [
      { label: "Use", value: "Auspicious puja" },
      { label: "Finish", value: "Copper tone" },
      { label: "Occasion", value: "Festival and griha puja" },
    ],
    shippingNotice: "Free shipping with protective packaging",
    mainImage: spiritualImage,
  },
  "32-tv": {
    id: "32-tv",
    slug: "32-tv",
    name: "Marigold Mandir Decor Pack",
    category: "Temple Decor",
    categorySlug: "temple-decor",
    price: "Rs. 899",
    oldPrice: "Rs. 1,899",
    discount: "53% off",
    rating: 4.3,
    reviewsCount: "157 Reviews",
    description:
      "A saffron marigold-inspired decor pack for brightening your prayer space during festivals and daily worship.",
    colors: sharedColors,
    features: [
      "Festival-ready saffron accents",
      "Designed for mandir corners",
      "Reusable home decor styling",
    ],
    specs: [
      { label: "Theme", value: "Marigold" },
      { label: "Use", value: "Mandir decor" },
      { label: "Mood", value: "Auspicious and warm" },
    ],
    shippingNotice: "Free home delivery and simple decor guidance",
    mainImage: spiritualImage,
  },
  "8-dpf": {
    id: "8-dpf",
    slug: "8-dpf",
    name: "Kumkum Haldi Bowl Set",
    category: "Puja Essentials",
    categorySlug: "puja-essentials",
    price: "Rs. 499",
    oldPrice: "Rs. 999",
    discount: "50% off",
    rating: 4.0,
    reviewsCount: "203 Reviews",
    description:
      "A compact kumkum and haldi bowl set for tilak, daily worship, festival puja, and traditional home rituals.",
    colors: sharedColors,
    features: [
      "Compact puja essential",
      "Bright haldi and kumkum presentation",
      "Useful for daily and festive rituals",
    ],
    specs: [
      { label: "Includes", value: "Two puja bowls" },
      { label: "Use", value: "Tilak and puja" },
      { label: "Occasion", value: "Daily and festive" },
    ],
    shippingNotice: "Free delivery with spill-safe packaging",
    mainImage: spiritualImage,
  },
};

export type SimilarProductCard = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: string;
  image: string;
  alt: string;
  swatches: string[];
};

export function getSimilarProductsFromList(
  products: ProductDetailItem[],
  currentId?: string,
  limit = 4
): SimilarProductCard[] {
  return products
    .filter((product) => product.id !== currentId)
    .slice(0, limit)
    .map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.mainImage,
      alt: product.name,
      swatches: product.colors.map((color) => color.bg).slice(0, 3),
    }));
}

const DEFAULT_SIMILAR_ORDER = [
  "55-smart-tv",
  "c9-projector",
  "techno-projector",
  "iprojector-2-plus",
  "wireless-headphones",
  "compact-camera",
  "smartphone",
  "yuqos-neosound-flex",
];

export function getSimilarProducts(currentId?: string, limit = 4): SimilarProductCard[] {
  const values = Object.values(productsCatalog);
  const current = currentId ? productsCatalog[currentId] : undefined;

  const ordered = [
    ...values.filter((product) => product.id !== current?.id && product.categorySlug === current?.categorySlug),
    ...DEFAULT_SIMILAR_ORDER.map((id) => productsCatalog[id]).filter(Boolean),
    ...values,
  ];

  const seen = new Set<string>();
  return ordered
    .filter((product): product is ProductDetailItem => Boolean(product))
    .filter((product) => {
      if (product.id === current?.id) return false;
      if (seen.has(product.id)) return false;
      seen.add(product.id);
      return true;
    })
    .slice(0, limit)
    .map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.mainImage,
      alt: product.name,
      swatches: product.colors.map((color) => color.bg).slice(0, 3),
    }));
}

export const defaultProduct = productsCatalog["yuqos-neosound-flex"];

export function getProductById(idOrSlug?: string | null): ProductDetailItem {
  if (!idOrSlug) return defaultProduct;

  const key = idOrSlug.toLowerCase().trim();
  if (productsCatalog[key]) {
    return productsCatalog[key];
  }

  const found = Object.values(productsCatalog).find(
    (p) => p.id.includes(key) || p.slug.includes(key) || p.categorySlug.includes(key)
  );

  return found || defaultProduct;
}

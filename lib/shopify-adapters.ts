import type { ProductItem } from "@/components/home/content";
import type { ProductDetailItem } from "@/lib/products-data";
import { formatShopifyPrice, ShopifyProductCard } from "@/lib/shopify";

const spiritualColors = [
  { name: "Saffron Orange", bg: "#f97316" },
  { name: "Temple Gold", bg: "#d97706" },
  { name: "Deep Maroon", bg: "#7f1d1d" },
];

function getCompareAtPrice(product: ShopifyProductCard) {
  const compareAt = product.compareAtPriceRange.minVariantPrice;
  const price = product.priceRange.minVariantPrice;

  if (!compareAt?.amount || Number(compareAt.amount) <= Number(price.amount)) {
    return undefined;
  }

  return formatShopifyPrice(compareAt);
}

export function shopifyProductToHomeProduct(product: ShopifyProductCard): ProductItem {
  return {
    id: product.handle,
    title: product.title,
    category: "Shopify Offering",
    subtitle: product.description || "Sacred offering from our Shopify store.",
    image: product.featuredImage?.url || "/spiritual-products.png",
    alt: product.featuredImage?.altText || product.title,
    price: formatShopifyPrice(product.priceRange.minVariantPrice),
    oldPrice: getCompareAtPrice(product),
    discount: product.availableForSale ? undefined : "Sold out",
    rating: 4.8,
    reviews: "Shopify",
    variantId: product.selectedOrFirstAvailableVariant?.id,
    availableForSale: product.availableForSale && product.selectedOrFirstAvailableVariant?.availableForSale !== false,
    href: `/product/${product.handle}`,
  };
}

export function shopifyProductToDetail(product: ShopifyProductCard): ProductDetailItem {
  const images =
    product.images?.nodes?.map((img) => img.url).filter(Boolean) || [];
  if (images.length === 0) {
    images.push(product.featuredImage?.url || "/spiritual-products.png");
    images.push("/spiritual-hero.png");
  }

  const variants =
    product.variants?.nodes?.map((v) => {
      const compareAt = v.compareAtPrice;
      const price = v.price;
      const oldPrice =
        compareAt?.amount && Number(compareAt.amount) > Number(price.amount)
          ? formatShopifyPrice(compareAt)
          : undefined;

      return {
        id: v.id,
        title: v.title,
        price: formatShopifyPrice(v.price),
        oldPrice,
        availableForSale: v.availableForSale,
        image: v.image?.url,
        selectedOptions: v.selectedOptions,
      };
    }) || [];

  const options =
    product.options?.map((opt) => ({
      name: opt.name,
      values: opt.values,
    })) || [];

  const category =
    product.productType ||
    (product.tags && product.tags.length > 0 ? product.tags[0] : "Sacred Offering");
  const categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const features = [
    product.vendor ? `Consciously crafted by ${product.vendor}` : "Hand-selected by temple artisans",
    product.tags && product.tags.length > 0
      ? `Sacred attributes: ${product.tags.slice(0, 3).join(", ")}`
      : "Consecrated with Vedic mantras for daily worship & peace",
    product.availableForSale
      ? "In Stock • Ready for immediate auspicious dispatch across India"
      : "Currently being replenished by our artisans",
    "Pure materials with natural fragrance and spiritual resonance",
    "Secure checkout & buyer protection via Shopify",
  ];

  const specs = [
    { label: "Offering Type", value: product.productType || "Devotional Samagri" },
    { label: "Artisan / Sanctuary", value: product.vendor || "Saffron Blessings" },
    { label: "Availability", value: product.availableForSale ? "In Stock • Live Catalog" : "Sold Out" },
    { label: "Sacred Origin", value: "Varanasi & Haridwar" },
  ];

  if (options.length > 0 && !(options.length === 1 && options[0].name === "Title")) {
    specs.push({
      label: "Available Options",
      value: options.map((o) => `${o.name}: ${o.values.join(", ")}`).join(" | "),
    });
  }

  return {
    id: product.handle,
    slug: product.handle,
    name: product.title,
    category,
    categorySlug,
    price: formatShopifyPrice(product.priceRange.minVariantPrice),
    oldPrice: getCompareAtPrice(product),
    discount: product.availableForSale ? "Available" : "Sold out",
    rating: 4.9,
    reviewsCount: "Verified Live Offering",
    description:
      product.description ||
      "A devotional offering from the Saffron Blessings collection, selected for prayer, reflection, and sacred mandir decor.",
    descriptionHtml: product.descriptionHtml,
    vendor: product.vendor,
    tags: product.tags,
    colors: spiritualColors,
    features,
    specs,
    shippingNotice: "Free express delivery across India with respectful, protective sacred-item packaging.",
    mainImage: product.featuredImage?.url || "/spiritual-products.png",
    images,
    variantId: product.selectedOrFirstAvailableVariant?.id,
    availableForSale:
      product.availableForSale && product.selectedOrFirstAvailableVariant?.availableForSale !== false,
    variants,
    options,
  };
}

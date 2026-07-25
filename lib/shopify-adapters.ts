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
    subtitle: product.description || "Sacred offering from our Shopify store.",
    image: product.featuredImage?.url || "/spiritual-products.png",
    alt: product.featuredImage?.altText || product.title,
    price: formatShopifyPrice(product.priceRange.minVariantPrice),
    oldPrice: getCompareAtPrice(product),
    rating: 4.8,
    reviews: "Shopify",
  };
}

export function shopifyProductToDetail(product: ShopifyProductCard): ProductDetailItem {
  return {
    id: product.handle,
    slug: product.handle,
    name: product.title,
    category: "Shopify Offering",
    categorySlug: "shopify",
    price: formatShopifyPrice(product.priceRange.minVariantPrice),
    oldPrice: getCompareAtPrice(product),
    discount: product.availableForSale ? "Available" : "Sold out",
    rating: 4.8,
    reviewsCount: "Verified Shopify product",
    description: product.description || "A devotional product from the Saffron Blessings Shopify catalog.",
    colors: spiritualColors,
    features: [
      product.availableForSale ? "Available for Shopify checkout" : "Currently sold out",
      "Pulled live from Shopify Storefront API",
      "Secure checkout through Shopify",
    ],
    specs: [
      { label: "Store", value: "Shopify" },
      { label: "Variant", value: product.selectedOrFirstAvailableVariant?.title || "Default" },
      { label: "Status", value: product.availableForSale ? "Available" : "Sold out" },
    ],
    shippingNotice: "Checkout, payment, tax, and shipping are completed securely through Shopify.",
    mainImage: product.featuredImage?.url || "/spiritual-products.png",
    variantId: product.selectedOrFirstAvailableVariant?.id,
  };
}

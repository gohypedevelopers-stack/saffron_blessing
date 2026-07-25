const SHOPIFY_API_VERSION = "2026-07";

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
};

export type ShopifyProductCard = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoney;
  };
  selectedOrFirstAvailableVariant: {
    id: string;
    title: string;
    availableForSale: boolean;
    price: ShopifyMoney;
  } | null;
};

type ShopifyResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

function getShopifyConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    return null;
  }

  return {
    domain: domain.replace(/^https?:\/\//, "").replace(/\/$/, ""),
    token,
  };
}

export function isShopifyConfigured() {
  return Boolean(getShopifyConfig());
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}): Promise<T | null> {
  const config = getShopifyConfig();

  if (!config) {
    return null;
  }

  const response = await fetch(`https://${config.domain}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": config.token,
    },
    body: JSON.stringify({ query, variables }),
    cache,
  });

  if (!response.ok) {
    throw new Error(`Shopify request failed: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as ShopifyResponse<T>;

  if (json.errors?.length) {
    throw new Error(json.errors.map((error) => error.message).join("; "));
  }

  return json.data ?? null;
}

export function formatShopifyPrice(money?: ShopifyMoney | null) {
  if (!money) return "";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: money.currencyCode,
    maximumFractionDigits: Number(money.amount) % 1 === 0 ? 0 : 2,
  }).format(Number(money.amount));
}

export async function getShopifyProducts(first = 20) {
  try {
    const data = await shopifyFetch<{
      products: {
        nodes: ShopifyProductCard[];
      };
    }>({
      query: `
        query Products($first: Int!) {
          products(first: $first, sortKey: TITLE) {
            nodes {
              id
              handle
              title
              description
              availableForSale
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              compareAtPriceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              selectedOrFirstAvailableVariant {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `,
      variables: { first },
    });

    return data?.products.nodes ?? [];
  } catch (error) {
    console.warn(error instanceof Error ? error.message : "Unable to load Shopify products.");
    return [];
  }
}

export async function getShopifyProductByHandle(handle: string) {
  try {
    const data = await shopifyFetch<{
      product: ShopifyProductCard | null;
    }>({
      query: `
        query ProductByHandle($handle: String!) {
          product(handle: $handle) {
            id
            handle
            title
            description
            availableForSale
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            selectedOrFirstAvailableVariant {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      `,
      variables: { handle },
    });

    return data?.product ?? null;
  } catch (error) {
    console.warn(error instanceof Error ? error.message : "Unable to load Shopify product.");
    return null;
  }
}

export async function createShopifyCart(variantId: string, quantity = 1) {
  const data = await shopifyFetch<{
    cartCreate: {
      cart: {
        id: string;
        checkoutUrl: string;
      } | null;
      userErrors: Array<{ field: string[] | null; message: string }>;
    };
  }>({
    query: `
      mutation CreateCart($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      input: {
        lines: [
          {
            merchandiseId: variantId,
            quantity,
          },
        ],
      },
    },
    cache: "no-store",
  });

  const errors = data?.cartCreate.userErrors ?? [];
  if (errors.length) {
    throw new Error(errors.map((error) => error.message).join("; "));
  }

  return data?.cartCreate.cart ?? null;
}

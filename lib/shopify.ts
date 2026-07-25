const SHOPIFY_API_VERSION = "2026-07";

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
};

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  image?: ShopifyImage | null;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
};

export type ShopifyProductCard = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  productType?: string;
  vendor?: string;
  tags?: string[];
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images?: {
    nodes: ShopifyImage[];
  };
  options?: Array<{
    name: string;
    values: string[];
  }>;
  variants?: {
    nodes: ShopifyVariant[];
  };
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoney;
  };
  selectedOrFirstAvailableVariant: ShopifyVariant | null;
};

export type ShopifyCartLineInput = {
  variantId: string;
  quantity?: number;
};

type ShopifyResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export function getShopifyConfig() {
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

export function getShopifyStorefrontUrl(path = "/") {
  const config = getShopifyConfig();

  if (!config) {
    return null;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `https://${config.domain}${normalizedPath}`;
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
              descriptionHtml
              productType
              vendor
              tags
              availableForSale
              featuredImage {
                url
                altText
              }
              images(first: 10) {
                nodes {
                  url
                  altText
                }
              }
              options {
                name
                values
              }
              variants(first: 20) {
                nodes {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
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
            descriptionHtml
            productType
            vendor
            tags
            availableForSale
            featuredImage {
              url
              altText
            }
            images(first: 10) {
              nodes {
                url
                altText
              }
            }
            options {
              name
              values
            }
            variants(first: 20) {
              nodes {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                }
                selectedOptions {
                  name
                  value
                }
              }
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

export async function createShopifyCart(lines: ShopifyCartLineInput[] | string, quantity = 1) {
  const cartLines = (Array.isArray(lines) ? lines : [{ variantId: lines, quantity }]).map((line) => ({
    merchandiseId: line.variantId,
    quantity: Math.max(1, Math.floor(line.quantity ?? 1)),
  }));

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
        lines: cartLines,
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

export type ShopifyCustomer = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  orders?: {
    nodes: Array<{
      id: string;
      orderNumber: number;
      processedAt: string;
      totalPrice: ShopifyMoney;
      fulfillmentStatus: string;
    }>;
  };
};

export async function shopifyCustomerCreate(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}) {
  if (!isShopifyConfigured()) {
    throw new Error("Shopify is not configured. Please check your SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variables.");
  }

  const data = await shopifyFetch<{
    customerCreate: {
      customer: ShopifyCustomer | null;
      customerUserErrors: Array<{ field: string[] | null; message: string; code: string }>;
    };
  }>({
    query: `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
            firstName
            lastName
          }
          customerUserErrors {
            field
            message
            code
          }
        }
      }
    `,
    variables: { input },
    cache: "no-store",
  });

  const errors = data?.customerCreate.customerUserErrors ?? [];
  if (errors.length) {
    throw new Error(errors.map((error) => error.message).join("; "));
  }

  return data?.customerCreate.customer ?? null;
}

export async function shopifyCustomerLogin(input: {
  email: string;
  password: string;
}) {
  if (!isShopifyConfigured()) {
    throw new Error("Shopify is not configured. Please check your SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variables.");
  }

  const data = await shopifyFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: {
        accessToken: string;
        expiresAt: string;
      } | null;
      customerUserErrors: Array<{ field: string[] | null; message: string; code: string }>;
    };
  }>({
    query: `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            field
            message
            code
          }
        }
      }
    `,
    variables: { input },
    cache: "no-store",
  });

  const errors = data?.customerAccessTokenCreate.customerUserErrors ?? [];
  if (errors.length) {
    throw new Error(errors.map((error) => error.message).join("; "));
  }

  return data?.customerAccessTokenCreate.customerAccessToken ?? null;
}

export async function shopifyGetCustomer(customerAccessToken: string): Promise<ShopifyCustomer | null> {
  if (!isShopifyConfigured() || !customerAccessToken) {
    return null;
  }

  try {
    const data = await shopifyFetch<{
      customer: ShopifyCustomer | null;
    }>({
      query: `
        query getCustomer($customerAccessToken: String!) {
          customer(customerAccessToken: $customerAccessToken) {
            id
            email
            firstName
            lastName
            phone
            orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
              nodes {
                id
                orderNumber
                processedAt
                totalPrice {
                  amount
                  currencyCode
                }
                fulfillmentStatus
              }
            }
          }
        }
      `,
      variables: { customerAccessToken },
      cache: "no-store",
    });

    return data?.customer ?? null;
  } catch (error) {
    console.warn("Error fetching Shopify customer:", error);
    return null;
  }
}

export async function shopifyCustomerLogout(customerAccessToken: string) {
  if (!isShopifyConfigured() || !customerAccessToken) return;

  try {
    await shopifyFetch({
      query: `
        mutation customerAccessTokenDelete($customerAccessToken: String!) {
          customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
            deletedAccessToken
          }
        }
      `,
      variables: { customerAccessToken },
      cache: "no-store",
    });
  } catch (error) {
    console.warn("Error deleting customer access token:", error);
  }
}

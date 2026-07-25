export type CheckoutLine = {
  variantId: string;
  quantity?: number;
};

export async function createShopifyCheckoutUrl(lines: CheckoutLine[] | string, quantity = 1) {
  const body = Array.isArray(lines)
    ? { lines }
    : {
        variantId: lines,
        quantity,
      };

  const response = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as {
    checkoutUrl?: string;
    error?: string;
  };

  if (!response.ok || !data.checkoutUrl) {
    throw new Error(data.error || "Unable to create Shopify checkout.");
  }

  return data.checkoutUrl;
}

export async function redirectToShopifyCheckout(lines: CheckoutLine[] | string, quantity = 1) {
  window.location.href = await createShopifyCheckoutUrl(lines, quantity);
}

export async function redirectToShopifyCheckout(variantId: string, quantity = 1) {
  const response = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ variantId, quantity }),
  });

  const data = (await response.json()) as {
    checkoutUrl?: string;
    error?: string;
  };

  if (!response.ok || !data.checkoutUrl) {
    throw new Error(data.error || "Unable to create Shopify checkout.");
  }

  window.location.href = data.checkoutUrl;
}

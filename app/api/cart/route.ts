import { NextResponse } from "next/server";
import { createShopifyCart, isShopifyConfigured } from "@/lib/shopify";

export async function POST(request: Request) {
  if (!isShopifyConfigured()) {
    return NextResponse.json(
      { error: "Shopify is not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN." },
      { status: 503 }
    );
  }

  const body = (await request.json()) as {
    variantId?: string;
    quantity?: number;
  };

  if (!body.variantId) {
    return NextResponse.json({ error: "variantId is required." }, { status: 400 });
  }

  const cart = await createShopifyCart(body.variantId, body.quantity ?? 1);

  if (!cart?.checkoutUrl) {
    return NextResponse.json({ error: "Shopify did not return a checkout URL." }, { status: 502 });
  }

  return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
}

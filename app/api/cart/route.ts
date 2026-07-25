import { NextResponse } from "next/server";
import { createShopifyCart, isShopifyConfigured, type ShopifyCartLineInput } from "@/lib/shopify";

function normalizeQuantity(quantity: unknown) {
  if (typeof quantity !== "number" || !Number.isFinite(quantity)) {
    return 1;
  }

  return Math.max(1, Math.floor(quantity));
}

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
    lines?: Array<{
      variantId?: string;
      quantity?: number;
    }>;
  };

  const lines: ShopifyCartLineInput[] = Array.isArray(body.lines)
    ? body.lines
        .filter((line): line is ShopifyCartLineInput => typeof line.variantId === "string" && line.variantId.length > 0)
        .map((line) => ({
          variantId: line.variantId,
          quantity: normalizeQuantity(line.quantity),
        }))
    : body.variantId
      ? [{ variantId: body.variantId, quantity: normalizeQuantity(body.quantity) }]
      : [];

  if (lines.length === 0) {
    return NextResponse.json({ error: "At least one Shopify variant is required." }, { status: 400 });
  }

  let cart;
  try {
    cart = await createShopifyCart(lines);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create Shopify checkout." },
      { status: 502 }
    );
  }

  if (!cart?.checkoutUrl) {
    return NextResponse.json({ error: "Shopify did not return a checkout URL." }, { status: 502 });
  }

  return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
}

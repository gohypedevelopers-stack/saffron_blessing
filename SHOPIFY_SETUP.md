# Shopify Setup

This project is prepared for Shopify Storefront API integration.

## 1. Rotate the private token

If a private Storefront API token was pasted into chat or shared anywhere, rotate/delete it in Shopify:

Shopify admin -> Sales channels -> Headless -> Storefront -> Rotate private access token.

Use the public Storefront API token for this website unless a server-only feature specifically requires private access. Never expose a private token in browser code.

## 2. Add environment variables

Create `.env.local` in the project root:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_public_storefront_access_token
```

Replace `your-store.myshopify.com` with the actual Shopify store domain.

## 3. Publish products to the Headless channel

In Shopify admin, make sure products are:

- Active
- Have prices and variants
- Published to the Headless sales channel/storefront
- Have product images

## 4. Available integration code

The Shopify client lives in:

- `lib/shopify.ts`

It includes:

- `getShopifyProducts()`
- `getShopifyProductByHandle(handle)`
- `createShopifyCart(variantId, quantity)`

The cart API route is:

- `POST /api/cart`

Request body:

```json
{
  "variantId": "gid://shopify/ProductVariant/123456789",
  "quantity": 1
}
```

Response:

```json
{
  "checkoutUrl": "https://..."
}
```

Redirect the buyer to `checkoutUrl` to complete payment in Shopify checkout.

## 5. Next implementation step

After `SHOPIFY_STORE_DOMAIN` is known, wire `getShopifyProducts()` into the home product grids and map Shopify handles to `/product/[id]` pages.

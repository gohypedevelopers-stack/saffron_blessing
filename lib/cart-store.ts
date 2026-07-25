export const SHOPIFY_CART_EVENT = "saffron-shopify-cart-updated";

const STORAGE_KEY = "saffron-shopify-cart";

export type LocalCartItem = {
  variantId: string;
  quantity: number;
  title: string;
  price: string;
  image: string;
  alt: string;
  href: string;
};

function isCartItem(value: unknown): value is LocalCartItem {
  if (!value || typeof value !== "object") return false;

  const item = value as Partial<LocalCartItem>;
  return (
    typeof item.variantId === "string" &&
    typeof item.quantity === "number" &&
    typeof item.title === "string" &&
    typeof item.price === "string" &&
    typeof item.image === "string" &&
    typeof item.alt === "string" &&
    typeof item.href === "string"
  );
}

export function readLocalCart(): LocalCartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

export function writeLocalCart(items: LocalCartItem[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(SHOPIFY_CART_EVENT));
}

export function addLocalCartItem(item: Omit<LocalCartItem, "quantity">, quantity = 1) {
  const items = readLocalCart();
  const existing = items.find((cartItem) => cartItem.variantId === item.variantId);

  if (existing) {
    existing.quantity += quantity;
    writeLocalCart(items);
    return existing.quantity;
  }

  writeLocalCart([...items, { ...item, quantity }]);
  return quantity;
}

export function removeLocalCartItem(variantId: string) {
  writeLocalCart(readLocalCart().filter((item) => item.variantId !== variantId));
}

export function updateLocalCartItemQuantity(variantId: string, quantity: number) {
  if (quantity < 1) {
    removeLocalCartItem(variantId);
    return;
  }

  writeLocalCart(
    readLocalCart().map((item) =>
      item.variantId === variantId ? { ...item, quantity: Math.floor(quantity) } : item
    )
  );
}

export function clearLocalCart() {
  writeLocalCart([]);
}

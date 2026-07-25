export const SAFFRON_AUTH_EVENT = "saffron-auth-updated";
const STORAGE_KEY = "saffron-auth-user";

export type LocalUserAddress = {
  id: string;
  label: string;
  details: string;
  isDefault?: boolean;
};

export type LocalUserOrder = {
  id: string;
  date: string;
  total: string;
  status: "In Transit to Sanctuary" | "Blessed & Delivered" | "Processing Offering";
  items: string[];
};

export type LocalUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  tier: "Sacred Patron" | "Divine Benefactor" | "Temple Guardian";
  blessingsCount: number;
  devotionalFocus: string;
  joinedDate: string;
  addresses: LocalUserAddress[];
  orders: LocalUserOrder[];
};

export const DEMO_DEVOTEE: LocalUser = {
  id: "devotee-108",
  name: "Aarav Sharma",
  email: "aarav.sharma@example.com",
  phone: "+91 98765 43210",
  tier: "Sacred Patron",
  blessingsCount: 1250,
  devotionalFocus: "Daily Puja & Aarti",
  joinedDate: "Shravan Purnima 2025",
  addresses: [
    {
      id: "addr-1",
      label: "Home Mandir",
      details: "B-402, Lotus Towers, Andheri West, Mumbai, Maharashtra 400053",
      isDefault: true,
    },
    {
      id: "addr-2",
      label: "Ancestral Sanctuary",
      details: "12/48 Dashashwamedh Ghat Road, Varanasi, Uttar Pradesh 221001",
    },
  ],
  orders: [
    {
      id: "SB-8921",
      date: "July 20, 2026",
      total: "Rs. 2,999.00",
      status: "In Transit to Sanctuary",
      items: ["Divine Puja Samagri Kit", "Brass Diya & Aarti Set"],
    },
    {
      id: "SB-7410",
      date: "June 15, 2026",
      total: "Rs. 1,990.00",
      status: "Blessed & Delivered",
      items: ["Brass Diya & Aarti Set"],
    },
  ],
};

function isLocalUser(value: unknown): value is LocalUser {
  if (!value || typeof value !== "object") return false;
  const user = value as Partial<LocalUser>;
  return (
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    typeof user.tier === "string" &&
    typeof user.blessingsCount === "number" &&
    Array.isArray(user.addresses) &&
    Array.isArray(user.orders)
  );
}

export function readLocalAuth(): LocalUser | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return isLocalUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeLocalAuth(user: LocalUser | null) {
  if (typeof window === "undefined") return;

  if (user === null) {
    window.localStorage.removeItem(STORAGE_KEY);
  } else {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
  window.dispatchEvent(new Event(SAFFRON_AUTH_EVENT));
}

export function loginLocalAuth(customData?: Partial<LocalUser>): LocalUser {
  const newUser: LocalUser = {
    ...DEMO_DEVOTEE,
    ...customData,
    id: customData?.id || `devotee-${Date.now()}`,
    name: customData?.name || DEMO_DEVOTEE.name,
    email: customData?.email || DEMO_DEVOTEE.email,
  };
  writeLocalAuth(newUser);
  return newUser;
}

export const SHOPIFY_TOKEN_KEY = "saffron-shopify-token";

export function readShopifyToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SHOPIFY_TOKEN_KEY);
}

export function writeShopifyToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token === null) {
    window.localStorage.removeItem(SHOPIFY_TOKEN_KEY);
  } else {
    window.localStorage.setItem(SHOPIFY_TOKEN_KEY, token);
  }
}

export function logoutLocalAuth() {
  writeLocalAuth(null);
  writeShopifyToken(null);
}

export function updateLocalAuth(updates: Partial<LocalUser>): LocalUser | null {
  const current = readLocalAuth();
  if (!current) return null;

  const updated: LocalUser = { ...current, ...updates };
  writeLocalAuth(updated);
  return updated;
}

export function addLocalAddress(address: Omit<LocalUserAddress, "id">): LocalUser | null {
  const current = readLocalAuth();
  if (!current) return null;

  const newAddress: LocalUserAddress = {
    ...address,
    id: `addr-${Date.now()}`,
  };

  const addresses = address.isDefault
    ? current.addresses.map((a) => ({ ...a, isDefault: false }))
    : current.addresses;

  return updateLocalAuth({ addresses: [...addresses, newAddress] });
}

export function removeLocalAddress(id: string): LocalUser | null {
  const current = readLocalAuth();
  if (!current) return null;

  return updateLocalAuth({
    addresses: current.addresses.filter((a) => a.id !== id),
  });
}

import type { Item, InventoryItem } from "../types/item";

export type ApiInventoryItem = {
  id: number;
  userId: number;
  name: string;
  category: string;
  price: number;
  image: string | null;
  quantity: number;
};

const FALLBACK_IMAGE = "/items/placeholder.svg";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { credentials: "same-origin", ...init });

  if (!response.ok) {
    const body = await response.json().catch(() => null);

    const message =
      body && typeof body.error === "string"
        ? body.error
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return (await response.json()) as T;
}

export function toInventoryItem(apiItem: ApiInventoryItem): InventoryItem {
  return {
    id: apiItem.id,
    name: apiItem.name,
    category: apiItem.category,
    price: apiItem.price,
    listings: apiItem.quantity,
    image: apiItem.image ?? FALLBACK_IMAGE,
    quantity: apiItem.quantity,
  };
}

export async function fetchInventory(
  signal?: AbortSignal
): Promise<InventoryItem[]> {
  const items = await request<ApiInventoryItem[]>("/api/inventory", { signal });

  return items.map(toInventoryItem);
}

export async function buyItem(
  item: Item,
  quantity: number
): Promise<{ item: ApiInventoryItem; balance: number }> {
  return request<{ item: ApiInventoryItem; balance: number }>(
    "/api/inventory",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image,
        quantity,
      }),
    }
  );
}

export async function sellInventoryItem(
  id: number,
  quantity: number,
  earned: number
): Promise<{ id: number; quantity: number; balance: number }> {
  return request<{ id: number; quantity: number; balance: number }>(
    `/api/inventory/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity, earned }),
    }
  );
}

export async function addFunds(amount: number): Promise<{ balance: number }> {
  return request<{ balance: number }>("/api/users/me/funds", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
}

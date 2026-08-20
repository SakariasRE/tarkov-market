import type { Item } from "../types/item";

export type ApiCategory = {
  id: number;
  name: string;
};

export type ApiItem = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  condition: string;
  image: string | null;
  categoryId: number;
  createdById: number;
  createdAt: string;
  updatedAt: string;
  category: ApiCategory;
  creator: {
    id: number;
    username: string;
  };
};

export type NewItemInput = {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  condition: string;
  image?: string | null;
  categoryId: number;
};

const FALLBACK_IMAGE = "/items/placeholder.svg";

/**
 * The API returns a joined Prisma row, the UI works with the flat Item shape.
 */
export function toItem(apiItem: ApiItem): Item {
  return {
    id: apiItem.id,
    name: apiItem.name,
    category: apiItem.category.name,
    price: apiItem.price,
    listings: apiItem.quantity,
    image: apiItem.image ?? FALLBACK_IMAGE,
  };
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

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

export async function fetchItems(signal?: AbortSignal): Promise<ApiItem[]> {
  return request<ApiItem[]>("/api/items", { signal });
}

export async function fetchCategories(
  signal?: AbortSignal
): Promise<ApiCategory[]> {
  return request<ApiCategory[]>("/api/categories", { signal });
}

export async function createItem(input: NewItemInput): Promise<ApiItem> {
  return request<ApiItem>("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export async function updateItem(
  id: number,
  input: Partial<NewItemInput>
): Promise<ApiItem> {
  return request<ApiItem>(`/api/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export async function deleteItem(id: number): Promise<void> {
  await request<{ message: string }>(`/api/items/${id}`, {
    method: "DELETE",
  });
}

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Item, InventoryItem } from "../types/item";
import { items as marketItems } from "../data/items";

const STORAGE_KEY = "inventory";

function readInventory(): InventoryItem[] {
  const savedItems = localStorage.getItem(STORAGE_KEY);

  if (savedItems) {
    try {
      return JSON.parse(savedItems) as InventoryItem[];
    } catch {
      return [];
    }
  }

  return [
    { ...marketItems[0], quantity: 2 },
    { ...marketItems[1], quantity: 5 },
    { ...marketItems[2], quantity: 100 },
  ];
}

function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>(readInventory);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  /** Adds a bought item, stacking it if it is already owned. */
  const addItem = useCallback((item: Item, quantity: number) => {
    setItems((current) => {
      const owned = current.find((entry) => entry.name === item.name);

      if (owned) {
        return current.map((entry) =>
          entry.name === item.name
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry
        );
      }

      return [...current, { ...item, quantity }];
    });
  }, []);


  const removeItem = useCallback((itemId: number, quantity: number) => {
    setItems((current) =>
      current
        .map((entry) =>
          entry.id === itemId
            ? { ...entry, quantity: entry.quantity - quantity }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return items;
    }

    return items.filter((item) =>
      item.name.toLowerCase().includes(normalizedSearch)
    );
  }, [items, searchTerm]);

  const totalInventoryValue = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [items]);

  const uniqueItems = useMemo(() => {
    return items.length;
  }, [items]);

  const totalQuantity = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [items]);

  return {
    items,
    setItems,
    addItem,
    removeItem,
    searchTerm,
    setSearchTerm,
    filteredItems,
    totalInventoryValue,
    uniqueItems,
    totalQuantity,
  };
}

export default useInventory;

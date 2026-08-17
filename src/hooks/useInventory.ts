import { useMemo, useState } from "react";
import type { InventoryItem } from "../types/item";
import { items as marketItems } from "../data/items";

function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>(() => {
    const savedItems = localStorage.getItem("inventory");

    return savedItems
      ? JSON.parse(savedItems)
      : [
          { ...marketItems[0], quantity: 2 },
          { ...marketItems[1], quantity: 5 },
          { ...marketItems[2], quantity: 100 },
        ];
  });

  const [searchTerm, setSearchTerm] = useState("");

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
    searchTerm,
    setSearchTerm,
    filteredItems,
    totalInventoryValue,
    uniqueItems,
    totalQuantity,
  };
}

export default useInventory;

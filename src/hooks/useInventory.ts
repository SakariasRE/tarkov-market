import { useCallback, useEffect, useMemo, useState } from "react";
import type { Item, InventoryItem } from "../types/item";
import { buyItem, fetchInventory, sellInventoryItem } from "../api/inventory";

function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setItems(await fetchInventory());
      setError(null);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Kunde inte hämta inventory."
      );
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    fetchInventory()
      .then((inventory) => {
        if (!ignore) setItems(inventory);
      })
      .catch((loadError: Error) => {
        if (!ignore) setError(loadError.message);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const addItem = useCallback(
    async (item: Item, quantity: number): Promise<number> => {
      const result = await buyItem(item, quantity);

      await reload();

      return result.balance;
    },
    [reload]
  );

  const removeItem = useCallback(
    async (
      itemId: number,
      quantity: number,
      earned: number
    ): Promise<number> => {
      const result = await sellInventoryItem(itemId, quantity, earned);

      await reload();

      return result.balance;
    },
    [reload]
  );

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
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const uniqueItems = useMemo(() => items.length, [items]);

  const totalQuantity = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  return {
    items,
    isLoading,
    error,
    addItem,
    removeItem,
    reload,
    searchTerm,
    setSearchTerm,
    filteredItems,
    totalInventoryValue,
    uniqueItems,
    totalQuantity,
  };
}

export default useInventory;

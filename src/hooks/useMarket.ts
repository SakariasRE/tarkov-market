import { useCallback, useEffect, useMemo, useState } from "react";
import type { Item } from "../types/item";
import { fetchItems, toItem } from "../api/items";

function useMarket() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [showFilters, setShowFilters] = useState(false);

  const refetch = useCallback(() => {
    setReloadToken((current) => current + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    fetchItems(controller.signal)
      .then((apiItems) => {
        setItems(apiItems.map(toItem));
        setIsLoading(false);
      })
      .catch((fetchError: Error) => {
        if (controller.signal.aborted) {
          return;
        }

        setError(fetchError.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [reloadToken]);

  const categories = useMemo(() => {
    return Array.from(new Set(items.map((item) => item.category)));
  }, [items]);

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (searchTerm.trim()) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== "all") {
      result = result.filter((item) => item.category === category);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "name-az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "name-za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [items, searchTerm, category, sortBy]);

  return {
    isLoading,
    error,
    refetch,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    sortBy,
    setSortBy,
    showFilters,
    setShowFilters,
    categories,
    filteredItems,
  };
}

export default useMarket;

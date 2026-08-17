import { useMemo, useState } from "react";
import { items } from "../data/items";

function useMarket() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    return Array.from(new Set(items.map((item) => item.category)));
  }, []);

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
  }, [searchTerm, category, sortBy]);

  return {
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

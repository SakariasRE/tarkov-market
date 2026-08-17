type MarketFiltersProps = {
  category: string;
  setCategory: (value: string) => void;
  categories: string[];
};

function MarketFilters({
  category,
  setCategory,
  categories,
}: MarketFiltersProps) {
  return (
    <div
      id="market-filters"
      className="mb-6 rounded-lg border border-neutral-800 bg-neutral-900 p-4"
    >
      <label
        htmlFor="category-filter"
        className="mb-2 block text-sm font-medium text-neutral-300"
      >
        Category
      </label>

      <select
        id="category-filter"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="w-full border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-300 outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:max-w-xs"
      >
        <option value="all">All categories</option>

        {categories.map((itemCategory) => (
          <option
            key={itemCategory}
            value={itemCategory}
          >
            {itemCategory}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MarketFilters;

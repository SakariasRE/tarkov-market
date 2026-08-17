type MarketSortProps = {
  sortBy: string;
  setSortBy: (value: string) => void;
};

function MarketSort({
  sortBy,
  setSortBy,
}: MarketSortProps) {
  return (
    <div>
      <label htmlFor="market-sort" className="sr-only">
        Sort marketplace items
      </label>

      <select
        id="market-sort"
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        className="border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-300 outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
      >
        <option value="price-low">
          Price: Lowest
        </option>

        <option value="price-high">
          Price: Highest
        </option>

        <option value="name-az">
          Name: A–Z
        </option>

        <option value="name-za">
          Name: Z–A
        </option>
      </select>
    </div>
  );
}

export default MarketSort;

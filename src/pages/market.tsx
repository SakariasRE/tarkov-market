import { SlidersHorizontal } from "lucide-react";
import ItemCard from "../components/itemCard";
import MarketSearch from "../components/market/marketSearch";
import MarketFilters from "../components/market/marketFilters";
import MarketSort from "../components/market/marketSort";
import useMarket from "../hooks/useMarket";

function Market() {
  const {
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
  } = useMarket();

  return (
    <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center">
          <MarketSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <button
            type="button"
            onClick={() => setShowFilters((current) => !current)}
            aria-expanded={showFilters}
            aria-controls="market-filters"
            className="flex items-center justify-center gap-2 border border-neutral-700 bg-neutral-900 px-5 py-3 text-sm text-neutral-300 transition hover:border-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <SlidersHorizontal
              size={17}
              aria-hidden="true"
            />
            Filters
          </button>
        </div>

        {showFilters && (
          <MarketFilters
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-white">
              Market Listings
            </h1>

            <p
              className="mt-1 text-sm text-neutral-500"
              aria-live="polite"
            >
              {filteredItems.length} items found
            </p>
          </div>

          <MarketSort
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {filteredItems.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-lg border border-neutral-800 bg-neutral-900 p-8 text-center">
            <p className="text-neutral-300">
              No items match your search or filters.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Market;

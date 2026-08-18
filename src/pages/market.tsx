import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { Item } from "../types/item";
import { deleteItem, updateItem } from "../api/items";
import ItemCard from "../components/itemCard";
import MarketSearch from "../components/market/marketSearch";
import MarketFilters from "../components/market/marketFilters";
import MarketSort from "../components/market/marketSort";
import useMarket from "../hooks/useMarket";
import useInventory from "../hooks/useInventory";

type MarketProps = {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
};

function Market({ balance, setBalance }: MarketProps) {
  const {
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
  } = useMarket();

  const { addItem } = useInventory();

  const [buyingId, setBuyingId] = useState<number | null>(null);
  const [buyError, setBuyError] = useState<string | null>(null);
  const [buyMessage, setBuyMessage] = useState<string | null>(null);

  async function handleBuy(item: Item) {
    if (item.price > balance) {
      setBuyError("You do not have enough roubles for that.");

      return;
    }

    setBuyingId(item.id);
    setBuyError(null);
    setBuyMessage(null);

    try {
      // One unit leaves the listing; the listing disappears when it runs out.
      if (item.listings > 1) {
        await updateItem(item.id, { quantity: item.listings - 1 });
      } else {
        await deleteItem(item.id);
      }

      addItem(item, 1);
      setBalance((current) => current - item.price);
      setBuyMessage(`Bought 1 × ${item.name} for ₽ ${item.price.toLocaleString()}.`);

      refetch();
    } catch (error) {
      setBuyError(
        error instanceof Error ? error.message : "Failed to buy this item."
      );
    } finally {
      setBuyingId(null);
    }
  }

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

        {buyError && (
          <p
            role="alert"
            className="mt-6 rounded-lg border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-300"
          >
            {buyError}
          </p>
        )}

        {buyMessage && (
          <p
            aria-live="polite"
            className="mt-6 rounded-lg border border-emerald-900 bg-emerald-950 px-4 py-3 text-sm text-emerald-300"
          >
            {buyMessage}
          </p>
        )}

        {isLoading && (
          <div className="mt-10 rounded-lg border border-neutral-800 bg-neutral-900 p-8 text-center">
            <p className="text-neutral-300" aria-live="polite">
              Loading market listings...
            </p>
          </div>
        )}

        {!isLoading && error && (
          <div className="mt-10 rounded-lg border border-red-900 bg-red-950 p-8 text-center">
            <p className="text-red-300" role="alert">
              Could not load listings: {error}
            </p>
          </div>
        )}

        {!isLoading && !error && (
          filteredItems.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onBuy={handleBuy}
                  isBuying={buyingId === item.id}
                  canAfford={item.price <= balance}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-lg border border-neutral-800 bg-neutral-900 p-8 text-center">
              <p className="text-neutral-300">
                No items match your search or filters.
              </p>
            </div>
          )
        )}
      </div>
    </main>
  );
}

export default Market;

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { Item } from "../types/item";
import { deleteItem, updateItem } from "../api/items";
import MarketGrid from "../components/market/marketGrid";
import SectionHeading from "../components/ui/sectionHeading";
import ErrorMessage from "../components/ui/errorMessage";
import SuccessMessage from "../components/ui/successMessage";
import StatusPanel from "../components/ui/statusPanel";
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

      setBalance(await addItem(item, 1));
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
          <SectionHeading
            id="market-listings-heading"
            title="Market Listings"
            meta={`${filteredItems.length} items found`}
          />

          <MarketSort
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        <ErrorMessage message={buyError} />
        <SuccessMessage message={buyMessage} />

        {isLoading && (
          <div className="mt-10">
            <StatusPanel message="Loading market listings..." isBusy />
          </div>
        )}

        {!isLoading && error && (
          <div className="mt-10">
            <ErrorMessage message={`Could not load listings: ${error}`} />
          </div>
        )}

        {!isLoading && !error &&
          (filteredItems.length > 0 ? (
            <MarketGrid
              items={filteredItems}
              buyingId={buyingId}
              balance={balance}
              onBuy={handleBuy}
            />
          ) : (
            <div className="mt-10">
              <StatusPanel message="No items match your search or filters." />
            </div>
          ))}

      </div>
    </main>
  );
}

export default Market;

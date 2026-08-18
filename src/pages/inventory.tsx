import InventoryItemCard from "../components/inventoryItemCard";
import useInventory from "../hooks/useInventory";

function Inventory() {
  const {
    searchTerm,
    setSearchTerm,
    filteredItems,
    totalInventoryValue,
    uniqueItems,
    totalQuantity,
  } = useInventory();

  return (
    <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <p className="text-sm text-neutral-400">
              Inventory Value
            </p>

            <p className="mt-1 text-xl font-semibold text-white">
              ₽ {totalInventoryValue.toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <p className="text-sm text-neutral-400">
              Unique Items
            </p>

            <p className="mt-1 text-xl font-semibold text-white">
              {uniqueItems}
            </p>
          </div>

          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <p className="text-sm text-neutral-400">
              Total Quantity
            </p>

            <p className="mt-1 text-xl font-semibold text-white">
              {totalQuantity}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <label
            htmlFor="inventory-search"
            className="sr-only"
          >
            Search inventory items
          </label>

          <input
            id="inventory-search"
            type="search"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search for items"
            className="w-full border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-600 focus-visible:ring-2 focus-visible:ring-amber-300"
          />
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <InventoryItemCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-8 text-center">
            <p
              className="text-neutral-400"
              aria-live="polite"
            >
              No items match your search.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Inventory;

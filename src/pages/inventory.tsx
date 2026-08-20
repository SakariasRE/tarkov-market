import useInventory from "../hooks/useInventory";
import PageHeading from "../components/ui/pageHeading";
import StatusPanel from "../components/ui/statusPanel";
import InventoryStat from "../components/inventory/inventoryStat";
import InventorySearch from "../components/inventory/inventorySearch";
import InventoryGrid from "../components/inventory/inventoryGrid";

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
        <PageHeading
          title="Inventory"
          description="Items you currently own"
        />

        <div className="mb-6 mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InventoryStat
            label="Inventory Value"
            value={`₽ ${totalInventoryValue.toLocaleString()}`}
          />

          <InventoryStat label="Unique Items" value={String(uniqueItems)} />

          <InventoryStat label="Total Quantity" value={String(totalQuantity)} />
        </div>

        <InventorySearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {filteredItems.length > 0 ? (
          <InventoryGrid items={filteredItems} />
        ) : (
          <StatusPanel message="No items match your search." />
        )}
      </div>
    </main>
  );
}

export default Inventory;

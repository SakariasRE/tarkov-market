import { useState } from "react";
import type { InventoryItem } from "../types/item";
import { items as marketItems } from "../data/items";
import InventoryItemCard from "../components/inventoryItemCard";


function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>(() => {
    const savedItems = localStorage.getItem("inventory");

    return savedItems
      ? JSON.parse(savedItems)
      : [
          { ...marketItems[0], quantity: 2 },
          { ...marketItems[1], quantity: 5 },
          { ...marketItems[2], quantity: 100 },
        ];
  });

  const totalInventoryValue = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const uniqueItems = items.length;

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <main className="flex-1 p-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <p className="text-sm text-neutral-400">Inventory Value</p>
            <p className="mt-1 text-xl font-semibold text-white">
              ₽ {totalInventoryValue.toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <p className="text-sm text-neutral-400">Unique Items</p>
            <p className="mt-1 text-xl font-semibold text-white">
              {uniqueItems}
            </p>
          </div>

          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <p className="text-sm text-neutral-400">Total Quantity</p>
            <p className="mt-1 text-xl font-semibold text-white">
              {totalQuantity}
            </p>
          </div>
        </div>

        <div className="mb-8 flex items-center gap-3">
          <div className="flex flex-1 items-center border border-neutral-800 bg-neutral-900 px-4">
            <input
              type="text"
              placeholder="Search for items"
              aria-label="Search inventory items"
              className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-neutral-600 focus-visible:ring-2 focus-visible:ring-yellow-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <InventoryItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
export default Inventory;

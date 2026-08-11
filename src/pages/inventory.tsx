import { useState } from "react";
import type { InventoryItem } from "../types/item";

function Inventory() {
    const [items, setItems] = useState<InventoryItem[]>(() => {
        const savedItems = localStorage.getItem('inventory');
        return savedItems ? JSON.parse(savedItems) : [];
    });
    return (
        <main className="flex-1 p-8">
            <div className="mx-auto w-full max-w-[1600px]">
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex flex-1 items-center border border-neutral-800 bg-neutral-900 px-4">
                        <input
                            type="text"
                            placeholder="Search for items"
                            className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-neutral-600"
                        />
                    </div>
                </div>
                {items.map((item) => (
                    <p key={item.id}>
                        {item.name} (Quantity: {item.quantity})
                    </p>
                ))}
            </div>
        </main>
    );
}
export default Inventory;

import type { InventoryItem } from "../types/item";

type InventoryItemProps = {
    item: InventoryItem;
};

function InventoryItemCard({ item }: InventoryItemProps) {
const totalValue = item.price * item.quantity;

    return (
        <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <img
            src={item.image}
            alt={item.name}
            className="h-24 w-24 object-contain"
            />
            <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold text-neutral-100">{item.name}</p>
                <p className="text-sm text-neutral-500">Category: {item.category}</p>
                <p className="mt-2 text-sm text-neutral-300">Quantity: {item.quantity}</p>
                <p className="text-sm text-neutral-300">Price per item: ₽ {item.price.toLocaleString()}</p>
                <p className="mt-1 font-semibold text-emerald-400">Total value: ₽ {totalValue.toLocaleString()}</p>
            </div>
        </div>
    );
}

export default InventoryItemCard;

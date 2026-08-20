import type { InventoryItem } from "../../types/item";
import InventoryItemCard from "../inventoryItemCard";

type InventoryGridProps = {
  items: InventoryItem[];
};

function InventoryGrid({ items }: InventoryGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <InventoryItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default InventoryGrid;

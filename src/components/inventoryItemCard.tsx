import type { InventoryItem } from "../types/item";
import { useAccessibility } from "../context/accessibilityContext";

type InventoryItemProps = {
  item: InventoryItem;
};

function InventoryItemCard({ item }: InventoryItemProps) {
  const totalValue = item.price * item.quantity;
  const { theme } = useAccessibility();

  return (
    <div
      className={`flex items-center gap-4 rounded-lg border p-4 transition ${
        theme === "light"
          ? "border-neutral-300 bg-white hover:border-neutral-500 hover:bg-neutral-50 hover:shadow-sm"
          : "border-neutral-800 bg-neutral-900 hover:border-neutral-500 hover:bg-neutral-800"
      }`}
    >
      <img
        src={item.image}
        alt={item.name}
        className="h-[96px] w-[96px] shrink-0 object-contain"
      />

      <div className="flex flex-col gap-1">
        <p
          className={`text-lg font-semibold ${
            theme === "light" ? "text-neutral-950" : "text-neutral-100"
          }`}
        >
          {item.name}
        </p>

        <p
          className={`text-sm ${
            theme === "light" ? "text-neutral-600" : "text-neutral-500"
          }`}
        >
          Category: {item.category}
        </p>

        <p
          className={`mt-2 text-sm ${
            theme === "light" ? "text-neutral-800" : "text-neutral-300"
          }`}
        >
          Quantity: {item.quantity}
        </p>

        <p
          className={`text-sm ${
            theme === "light" ? "text-neutral-800" : "text-neutral-300"
          }`}
        >
          Price per item: ₽ {item.price.toLocaleString()}
        </p>

        <p className="mt-1 font-semibold text-emerald-500">
          Total value: ₽ {totalValue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default InventoryItemCard;

import type { InventoryItem } from "../../types/item";

type InventoryRowProps = {
  item: InventoryItem;
};

function InventoryRow({ item }: InventoryRowProps) {
  return (
    <article className="flex items-center gap-4 border-b border-neutral-800 p-4 last:border-b-0">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-neutral-950 p-2">
        <img src={item.image} alt="" className="h-full w-full object-contain" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-medium text-white">{item.name}</h3>

        <p className="mt-1 text-sm text-neutral-500">
          Quantity: {item.quantity}
        </p>
      </div>

      <div className="text-right">
        <p className="font-medium text-white">
          ₽ {(item.price * item.quantity).toLocaleString()}
        </p>

        <p className="mt-1 text-sm text-neutral-500">
          ₽ {item.price.toLocaleString()} each
        </p>
      </div>
    </article>
  );
}

export default InventoryRow;

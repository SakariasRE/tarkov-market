import type { InventoryItem } from "../../types/item";

type ListingPreviewProps = {
  item: InventoryItem | undefined;
  quantity: number;
  price: number;
  totalPrice: number;
};

function ListingPreview({
  item,
  quantity,
  price,
  totalPrice,
}: ListingPreviewProps) {
  return (
    <>
      <div className="border-t border-neutral-800 pt-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-400">Total listing value</span>

          <span className="text-xl font-semibold text-amber-200">
            ₽ {totalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {item && (
        <div className="flex items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-950 p-4">
          <img
            src={item.image}
            alt=""
            className="h-16 w-16 object-contain"
          />

          <div>
            <p className="font-medium text-white">{item.name}</p>

            <p className="mt-1 text-sm text-neutral-500">
              {quantity} × ₽ {price.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ListingPreview;

const INPUT_CLASS =
  "mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300";

type ListingEditFieldsProps = {
  listingId: number;
  price: number;
  quantity: number;
  onPriceChange: (price: number) => void;
  onQuantityChange: (quantity: number) => void;
};

function ListingEditFields({
  listingId,
  price,
  quantity,
  onPriceChange,
  onQuantityChange,
}: ListingEditFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:min-w-80">
      <div>
        <label
          htmlFor={`price-${listingId}`}
          className="text-xs uppercase tracking-wide text-neutral-500"
        >
          Price each
        </label>

        <input
          id={`price-${listingId}`}
          type="number"
          min={1}
          value={price}
          onChange={(event) =>
            onPriceChange(Math.max(1, Number(event.target.value)))
          }
          className={INPUT_CLASS}
        />
      </div>

      <div>
        <label
          htmlFor={`quantity-${listingId}`}
          className="text-xs uppercase tracking-wide text-neutral-500"
        >
          Quantity
        </label>

        <input
          id={`quantity-${listingId}`}
          type="number"
          min={1}
          value={quantity}
          onChange={(event) =>
            onQuantityChange(Math.max(1, Number(event.target.value)))
          }
          className={INPUT_CLASS}
        />
      </div>
    </div>
  );
}

export default ListingEditFields;

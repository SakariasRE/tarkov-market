type PriceFieldProps = {
  value: number;
  averagePrice: number;
  showComparison: boolean;
  onChange: (value: number) => void;
};

function PriceField({
  value,
  averagePrice,
  showComparison,
  onChange,
}: PriceFieldProps) {
  const priceDifference =
    averagePrice > 0 ? ((value - averagePrice) / averagePrice) * 100 : 0;

  return (
    <div>
      <label
        htmlFor="price"
        className="mb-2 block text-sm font-medium text-neutral-300"
      >
        Price per item
      </label>

      <div className="flex rounded-lg border border-neutral-700 bg-neutral-950 focus-within:ring-2 focus-within:ring-amber-300">
        <span
          className="flex items-center border-r border-neutral-700 px-4 text-neutral-400"
          aria-hidden="true"
        >
          ₽
        </span>

        <input
          id="price"
          type="number"
          min={1}
          value={value}
          onChange={(event) => onChange(Math.max(0, Number(event.target.value)))}
          className="w-full bg-transparent px-4 py-3 text-white outline-none"
        />
      </div>

      {showComparison && (
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-neutral-500">
            Average market price: ₽ {averagePrice.toLocaleString()}
          </span>

          {value > 0 && (
            <span className="text-neutral-400">
              {priceDifference >= 0 ? "+" : ""}
              {priceDifference.toFixed(1)}%
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default PriceField;

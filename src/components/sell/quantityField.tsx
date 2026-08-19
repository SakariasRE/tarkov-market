type QuantityFieldProps = {
  value: number;
  available: number | null;
  onChange: (value: number) => void;
};

function QuantityField({ value, available, onChange }: QuantityFieldProps) {
  return (
    <div>
      <label
        htmlFor="quantity"
        className="mb-2 block text-sm font-medium text-neutral-300"
      >
        Quantity
      </label>

      <input
        id="quantity"
        type="number"
        min={1}
        max={available ?? 1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        disabled={available === null}
        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
      />

      {available !== null && (
        <p className="mt-2 text-sm text-neutral-500">
          You have {available} available
        </p>
      )}
    </div>
  );
}

export default QuantityField;

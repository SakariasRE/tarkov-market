type ListingSummaryProps = {
  price: number;
  totalValue: number;
};

function ListingSummary({ price, totalValue }: ListingSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-6 md:min-w-80">
      <div>
        <p className="text-xs uppercase tracking-wide text-neutral-500">
          Price each
        </p>

        <p className="mt-1 font-medium text-white">
          ₽ {price.toLocaleString()}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-neutral-500">
          Total value
        </p>

        <p className="mt-1 font-medium text-amber-200">
          ₽ {totalValue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default ListingSummary;

type InventoryStatProps = {
  label: string;
  value: string;
};

function InventoryStat({ label, value }: InventoryStatProps) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <p className="text-sm text-neutral-400">{label}</p>

      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

export default InventoryStat;

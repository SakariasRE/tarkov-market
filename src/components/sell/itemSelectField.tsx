import type { InventoryItem } from "../../types/item";

const SELECT_CLASS =
  "w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300";

type ItemSelectFieldProps = {
  items: InventoryItem[];
  value: string;
  onChange: (value: string) => void;
};

function ItemSelectField({ items, value, onChange }: ItemSelectFieldProps) {
  return (
    <div>
      <label
        htmlFor="item"
        className="mb-2 block text-sm font-medium text-neutral-300"
      >
        Select Item
      </label>

      <select
        id="item"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={SELECT_CLASS}
      >
        <option value="">Choose an item</option>

        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} — {item.quantity} available
          </option>
        ))}
      </select>
    </div>
  );
}

export default ItemSelectField;

import { useEffect, useState } from "react";
import type { ApiCategory } from "../api/items";
import { createItem, fetchCategories } from "../api/items";
import useInventory from "../hooks/useInventory";

const CONDITIONS = ["New", "Used", "Damaged"];

type SellItemProps = {
  setBalance: React.Dispatch<React.SetStateAction<number>>;
};

function SellItem({ setBalance }: SellItemProps) {
  const { items: inventoryItems, removeItem } = useInventory();

  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState(CONDITIONS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchCategories(controller.signal)
      .then(setCategories)
      .catch(() => {
        if (!controller.signal.aborted) {
          setCategories([]);
        }
      });

    return () => controller.abort();
  }, []);

  const selectedItem = inventoryItems.find(
    (item) => String(item.id) === selectedItemId
  );

  const totalPrice = quantity * price;

  const averagePrice = selectedItem?.price ?? 0;

  const priceDifference =
    averagePrice > 0
      ? ((price - averagePrice) / averagePrice) * 100
      : 0;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedItem) {
      return;
    }

    const category = categories.find(
      (entry) => entry.name === selectedItem.category
    );

    if (!category) {
      setSubmitError(
        `No category named "${selectedItem.category}" exists on the server.`
      );

      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      await createItem({
        name: selectedItem.name,
        price,
        quantity,
        condition,
        image: selectedItem.image,
        categoryId: category.id,
      });

      removeItem(selectedItem.id, quantity);
      setBalance((current) => current + totalPrice);

      setSubmitSuccess(
        `Listed ${quantity} × ${selectedItem.name} and earned ₽ ${totalPrice.toLocaleString()}.`
      );

      setSelectedItemId("");
      setQuantity(1);
      setPrice(0);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to create listing."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <h1 className="text-2xl font-semibold text-white">
          Sell Item
        </h1>

        <p className="mt-1 text-sm text-neutral-400">
          Create a new listing on the marketplace
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 max-w-2xl space-y-6 rounded-lg border border-neutral-800 bg-neutral-900 p-6"
        >
          <div>
            <label
              htmlFor="item"
              className="mb-2 block text-sm font-medium text-neutral-300"
            >
              Select Item
            </label>

            <select
              id="item"
              value={selectedItemId}
              onChange={(event) => {
                setSelectedItemId(event.target.value);
                setQuantity(1);
                setPrice(0);
              }}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <option value="">Choose an item</option>

              {inventoryItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} — {item.quantity} available
                </option>
              ))}
            </select>
          </div>

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
              max={selectedItem?.quantity ?? 1}
              value={quantity}
              onChange={(event) => {
                const newQuantity = Number(event.target.value);

                if (!selectedItem) {
                  return;
                }

                setQuantity(
                  Math.max(
                    1,
                    Math.min(newQuantity, selectedItem.quantity)
                  )
                );
              }}
              disabled={!selectedItem}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            />

            {selectedItem && (
              <p className="mt-2 text-sm text-neutral-500">
                You have {selectedItem.quantity} available
              </p>
            )}
          </div>

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
                value={price}
                onChange={(event) =>
                  setPrice(Math.max(0, Number(event.target.value)))
                }
                className="w-full bg-transparent px-4 py-3 text-white outline-none"
              />
            </div>

            {selectedItem && (
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-neutral-500">
                  Average market price: ₽{" "}
                  {averagePrice.toLocaleString()}
                </span>

                {price > 0 && (
                  <span className="text-neutral-400">
                    {priceDifference >= 0 ? "+" : ""}
                    {priceDifference.toFixed(1)}%
                  </span>
                )}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="condition"
              className="mb-2 block text-sm font-medium text-neutral-300"
            >
              Condition
            </label>

            <select
              id="condition"
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              {CONDITIONS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="border-t border-neutral-800 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">
                Total listing value
              </span>

              <span className="text-xl font-semibold text-amber-200">
                ₽ {totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {selectedItem && (
            <div className="flex items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-950 p-4">
              <img
                src={selectedItem.image}
                alt=""
                className="h-16 w-16 object-contain"
              />

              <div>
                <p className="font-medium text-white">
                  {selectedItem.name}
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  {quantity} × ₽ {price.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {submitError && (
            <p
              role="alert"
              className="rounded-lg border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-300"
            >
              {submitError}
            </p>
          )}

          {submitSuccess && (
            <p
              aria-live="polite"
              className="rounded-lg border border-emerald-900 bg-emerald-950 px-4 py-3 text-sm text-emerald-300"
            >
              {submitSuccess}
            </p>
          )}

          <button
            type="submit"
            disabled={
              !selectedItem || quantity < 1 || price < 1 || isSubmitting
            }
            className="w-full rounded-lg bg-amber-300 px-4 py-3 font-semibold text-neutral-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
          >
            {isSubmitting ? "Listing..." : "List Item"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default SellItem;

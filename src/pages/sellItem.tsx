import { useEffect, useState } from "react";
import type { ApiCategory } from "../api/items";
import { createItem, fetchCategories } from "../api/items";
import useInventory from "../hooks/useInventory";
import PageHeading from "../components/ui/pageHeading";
import ErrorMessage from "../components/ui/errorMessage";
import SuccessMessage from "../components/ui/successMessage";
import ItemSelectField from "../components/sell/itemSelectField";
import QuantityField from "../components/sell/quantityField";
import PriceField from "../components/sell/priceField";
import ConditionField from "../components/sell/conditionField";
import ListingPreview from "../components/sell/listingPreview";

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

  function handleItemChange(value: string) {
    setSelectedItemId(value);
    setQuantity(1);
    setPrice(0);
  }

  function handleQuantityChange(value: number) {
    if (!selectedItem) return;

    setQuantity(Math.max(1, Math.min(value, selectedItem.quantity)));
  }

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

      setBalance(await removeItem(selectedItem.id, quantity, totalPrice));

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
        <PageHeading
          title="Sell Item"
          description="Create a new listing on the marketplace"
        />

        <form
          onSubmit={handleSubmit}
          className="mt-8 max-w-2xl space-y-6 rounded-lg border border-neutral-800 bg-neutral-900 p-6"
        >
          <ItemSelectField
            items={inventoryItems}
            value={selectedItemId}
            onChange={handleItemChange}
          />

          <QuantityField
            value={quantity}
            available={selectedItem?.quantity ?? null}
            onChange={handleQuantityChange}
          />

          <PriceField
            value={price}
            averagePrice={selectedItem?.price ?? 0}
            showComparison={Boolean(selectedItem)}
            onChange={setPrice}
          />

          <ConditionField
            conditions={CONDITIONS}
            value={condition}
            onChange={setCondition}
          />

          <ListingPreview
            item={selectedItem}
            quantity={quantity}
            price={price}
            totalPrice={totalPrice}
          />

          <ErrorMessage message={submitError} />
          <SuccessMessage message={submitSuccess} />

          <button
            type="submit"
            disabled={!selectedItem || quantity < 1 || price < 1 || isSubmitting}
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

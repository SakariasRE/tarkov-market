import { useEffect, useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";
import type { ApiItem } from "../api/items";
import { deleteItem, fetchItems, updateItem } from "../api/items";

function MyListings() {
  const [listings, setListings] = useState<ApiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedPrice, setEditedPrice] = useState(0);
  const [editedQuantity, setEditedQuantity] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    fetchItems(controller.signal)
      .then((apiItems) => {
        setListings(apiItems);
        setIsLoading(false);
      })
      .catch((fetchError: Error) => {
        if (controller.signal.aborted) {
          return;
        }

        setError(fetchError.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  function startEditing(listing: ApiItem) {
    setEditingId(listing.id);
    setEditedPrice(listing.price);
    setEditedQuantity(listing.quantity);
    setError(null);
  }

  async function handleSave(listing: ApiItem) {
    setBusyId(listing.id);
    setError(null);

    try {
      const updated = await updateItem(listing.id, {
        price: editedPrice,
        quantity: editedQuantity,
      });

      setListings((current) =>
        current.map((item) => (item.id === updated.id ? updated : item))
      );

      setEditingId(null);
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Failed to update listing."
      );
    } finally {
      setBusyId(null);
    }
  }

  async function handleRemove(listing: ApiItem) {
    setBusyId(listing.id);
    setError(null);

    try {
      await deleteItem(listing.id);

      setListings((current) =>
        current.filter((item) => item.id !== listing.id)
      );
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to remove listing."
      );
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            My Listings
          </h1>

          <p className="mt-1 text-sm text-neutral-400">
            Manage the items you currently have listed for sale
          </p>
        </div>

        <section
          className="mt-8"
          aria-labelledby="active-listings-heading"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2
              id="active-listings-heading"
              className="text-lg font-semibold text-white"
            >
              Active Listings
            </h2>

            <p className="text-sm text-neutral-400">
              {listings.length} listings
            </p>
          </div>

          {error && (
            <p
              role="alert"
              className="mb-4 rounded-lg border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          {isLoading && (
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-8 text-center">
              <p className="text-neutral-300" aria-live="polite">
                Loading your listings...
              </p>
            </div>
          )}

          {!isLoading && listings.length === 0 && (
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-8 text-center">
              <p className="text-neutral-400">
                You have no active listings.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {listings.map((listing) => {
              const isEditing = editingId === listing.id;
              const totalValue = listing.price * listing.quantity;

              return (
                <article
                  key={listing.id}
                  className="flex flex-col gap-5 rounded-lg border border-neutral-800 bg-neutral-900 p-5 md:flex-row md:items-center"
                >
                  <div className="flex flex-1 items-center gap-5">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-neutral-950 p-2">
                      <img
                        src={listing.image ?? "/items/placeholder.svg"}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        {listing.name}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-400">
                        {listing.category.name} · {listing.condition}
                      </p>
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-4 md:min-w-80">
                      <div>
                        <label
                          htmlFor={`price-${listing.id}`}
                          className="text-xs uppercase tracking-wide text-neutral-500"
                        >
                          Price each
                        </label>

                        <input
                          id={`price-${listing.id}`}
                          type="number"
                          min={1}
                          value={editedPrice}
                          onChange={(event) =>
                            setEditedPrice(
                              Math.max(1, Number(event.target.value))
                            )
                          }
                          className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`quantity-${listing.id}`}
                          className="text-xs uppercase tracking-wide text-neutral-500"
                        >
                          Quantity
                        </label>

                        <input
                          id={`quantity-${listing.id}`}
                          type="number"
                          min={1}
                          value={editedQuantity}
                          onChange={(event) =>
                            setEditedQuantity(
                              Math.max(1, Number(event.target.value))
                            )
                          }
                          className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-6 md:min-w-80">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-neutral-500">
                          Price each
                        </p>

                        <p className="mt-1 font-medium text-white">
                          ₽ {listing.price.toLocaleString()}
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
                  )}

                  <div className="flex flex-wrap gap-3">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSave(listing)}
                          disabled={busyId === listing.id}
                          className="flex items-center justify-center gap-2 rounded-lg bg-amber-300 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        >
                          <Check size={17} aria-hidden="true" />
                          {busyId === listing.id ? "Saving..." : "Save"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="flex items-center justify-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        >
                          <X size={17} aria-hidden="true" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => startEditing(listing)}
                          aria-label={`Edit ${listing.name} listing`}
                          className="flex items-center justify-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:border-amber-200 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        >
                          <Pencil size={17} aria-hidden="true" />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemove(listing)}
                          disabled={busyId === listing.id}
                          aria-label={`Remove ${listing.name} listing`}
                          className="flex items-center justify-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:border-red-900 hover:bg-red-950 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        >
                          <Trash2 size={17} aria-hidden="true" />
                          {busyId === listing.id ? "Removing..." : "Remove"}
                        </button>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default MyListings;

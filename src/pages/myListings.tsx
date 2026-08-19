import { useEffect, useState } from "react";
import type { ApiItem } from "../api/items";
import { deleteItem, fetchItems, updateItem } from "../api/items";
import PageHeading from "../components/ui/pageHeading";
import SectionHeading from "../components/ui/sectionHeading";
import ErrorMessage from "../components/ui/errorMessage";
import StatusPanel from "../components/ui/statusPanel";
import ListingCard from "../components/listings/listingCard";

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
        <PageHeading
          title="My Listings"
          description="Manage the items you currently have listed for sale"
        />

        <section className="mt-8" aria-labelledby="active-listings-heading">
          <SectionHeading
            id="active-listings-heading"
            title="Active Listings"
            meta={`${listings.length} listings`}
          />

          <ErrorMessage message={error} />

          {isLoading && (
            <StatusPanel message="Loading your listings..." isBusy />
          )}

          {!isLoading && listings.length === 0 && (
            <StatusPanel message="You have no active listings." />
          )}

          <div className="space-y-4">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                isEditing={editingId === listing.id}
                isBusy={busyId === listing.id}
                editedPrice={editedPrice}
                editedQuantity={editedQuantity}
                onPriceChange={setEditedPrice}
                onQuantityChange={setEditedQuantity}
                onEdit={() => startEditing(listing)}
                onSave={() => handleSave(listing)}
                onCancel={() => setEditingId(null)}
                onRemove={() => handleRemove(listing)}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default MyListings;

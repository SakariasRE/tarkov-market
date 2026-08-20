import type { ApiItem } from "../../api/items";
import ListingSummary from "./listingSummary";
import ListingEditFields from "./listingEditFields";
import ListingActions from "./listingActions";

type ListingCardProps = {
  listing: ApiItem;
  isEditing: boolean;
  isBusy: boolean;
  editedPrice: number;
  editedQuantity: number;
  onPriceChange: (price: number) => void;
  onQuantityChange: (quantity: number) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onRemove: () => void;
};

function ListingCard({
  listing,
  isEditing,
  isBusy,
  editedPrice,
  editedQuantity,
  onPriceChange,
  onQuantityChange,
  onEdit,
  onSave,
  onCancel,
  onRemove,
}: ListingCardProps) {
  return (
    <article className="flex flex-col gap-5 rounded-lg border border-neutral-800 bg-neutral-900 p-5 md:flex-row md:items-center">
      <div className="flex flex-1 items-center gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-neutral-950 p-2">
          <img
            src={listing.image ?? "/items/placeholder.svg"}
            alt=""
            className="h-full w-full object-contain"
          />
        </div>

        <div>
          <h3 className="font-semibold text-white">{listing.name}</h3>

          <p className="mt-1 text-sm text-neutral-400">
            {listing.category.name} · {listing.condition}
          </p>
        </div>
      </div>

      {isEditing ? (
        <ListingEditFields
          listingId={listing.id}
          price={editedPrice}
          quantity={editedQuantity}
          onPriceChange={onPriceChange}
          onQuantityChange={onQuantityChange}
        />
      ) : (
        <ListingSummary
          price={listing.price}
          totalValue={listing.price * listing.quantity}
        />
      )}

      <ListingActions
        name={listing.name}
        isEditing={isEditing}
        isBusy={isBusy}
        onEdit={onEdit}
        onSave={onSave}
        onCancel={onCancel}
        onRemove={onRemove}
      />
    </article>
  );
}

export default ListingCard;

import { Check, Pencil, Trash2, X } from "lucide-react";

const BASE_CLASS =
  "flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300";

type ListingActionsProps = {
  name: string;
  isEditing: boolean;
  isBusy: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onRemove: () => void;
};

function ListingActions({
  name,
  isEditing,
  isBusy,
  onEdit,
  onSave,
  onCancel,
  onRemove,
}: ListingActionsProps) {
  if (isEditing) {
    return (
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={isBusy}
          className={`${BASE_CLASS} bg-amber-300 font-semibold text-neutral-950 hover:bg-amber-200`}
        >
          <Check size={17} aria-hidden="true" />
          {isBusy ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className={`${BASE_CLASS} border border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white`}
        >
          <X size={17} aria-hidden="true" />
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={onEdit}
        aria-label={`Edit ${name} listing`}
        className={`${BASE_CLASS} border border-neutral-700 text-neutral-300 hover:border-amber-200 hover:text-amber-200`}
      >
        <Pencil size={17} aria-hidden="true" />
        Edit
      </button>

      <button
        type="button"
        onClick={onRemove}
        disabled={isBusy}
        aria-label={`Remove ${name} listing`}
        className={`${BASE_CLASS} border border-neutral-700 text-neutral-300 hover:border-red-900 hover:bg-red-950 hover:text-red-300`}
      >
        <Trash2 size={17} aria-hidden="true" />
        {isBusy ? "Removing..." : "Remove"}
      </button>
    </div>
  );
}

export default ListingActions;

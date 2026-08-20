type InventorySearchProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

function InventorySearch({ searchTerm, setSearchTerm }: InventorySearchProps) {
  return (
    <div className="mb-8">
      <label htmlFor="inventory-search" className="sr-only">
        Search inventory items
      </label>

      <input
        id="inventory-search"
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search for items"
        className="w-full border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-600 focus-visible:ring-2 focus-visible:ring-amber-300"
      />
    </div>
  );
}

export default InventorySearch;

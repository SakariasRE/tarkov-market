import { Search } from "lucide-react";

type MarketSearchProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

function MarketSearch({
  searchTerm,
  setSearchTerm,
}: MarketSearchProps) {
  return (
    <div className="flex flex-1 items-center border border-neutral-800 bg-neutral-900 px-4">
      <Search
        size={16}
        className="text-neutral-500"
        aria-hidden="true"
      />

      <label htmlFor="market-search" className="sr-only">
        Search marketplace items
      </label>

      <input
        id="market-search"
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search for items"
        className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-neutral-600 focus-visible:ring-2 focus-visible:ring-amber-300"
      />
    </div>
  );
}

export default MarketSearch;

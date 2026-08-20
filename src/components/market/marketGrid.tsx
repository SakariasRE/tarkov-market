import type { Item } from "../../types/item";
import ItemCard from "../itemCard";

type MarketGridProps = {
  items: Item[];
  buyingId: number | null;
  balance: number;
  onBuy: (item: Item) => void;
};

function MarketGrid({ items, buyingId, balance, onBuy }: MarketGridProps) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onBuy={onBuy}
          isBuying={buyingId === item.id}
          canAfford={item.price <= balance}
        />
      ))}
    </div>
  );
}

export default MarketGrid;

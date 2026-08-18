import type { Item } from '../types/item'

type ItemCardProps = {
    item: Item
    onBuy: (item: Item) => void
    isBuying: boolean
    canAfford: boolean
}

function ItemCard({ item, onBuy, isBuying, canAfford }: ItemCardProps) {

    return (
        <article className="group flex flex-col border border-neutral-800 bg-[#151613] p-4 transition hover:border-[#8b805e] hover:bg-[#191a16]">
            <div className="mb-5 flex h-44 items-center justify-center border border-neutral-800 bg-[#0a0b09] p-5">
            <img
             src={item.image}
             alt={item.name}
             className="h-full w-full object-contain"
             />
             </div>

            <div className="mb-4">
                <p className="mb-1 text-xs uppercase tracking-widest text-neutral-500">
                    {item.category}
                </p>

                <h4 className="text-lg font-semibold text-neutral-100">
                    {item.name}
                </h4>
            </div>

           <div className="flex items-end justify-between">
  <div>
    <p className="text-xs text-neutral-500">
      Lowest price
    </p>

    <p className="mt-1 text-lg font-semibold text-[#d4c18a]">
      ₽ {item.price.toLocaleString()}
    </p>
  </div>

  <p className="text-xs text-neutral-500">
    {item.listings} in stock
  </p>
</div>

            <button
                type="button"
                onClick={() => onBuy(item)}
                disabled={isBuying || !canAfford}
                aria-label={`Buy one ${item.name} for ${item.price} roubles`}
                className="mt-4 w-full bg-amber-300 px-4 py-2 font-semibold text-neutral-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#151613]"
            >
                {isBuying ? "Buying..." : canAfford ? "Buy" : "Not enough funds"}
            </button>
        </article>
    )
}

export default ItemCard

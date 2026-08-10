import type { Item } from '../types/item'

type ItemCardProps = {
    item: Item
}

function ItemCard({ item }: ItemCardProps) {
    const isPositive = item.change >= 0

    return (
        <article className="group border border-neutral-800 bg-[#151613] p-4 transition hover:border-[#8b805e] hover:bg-[#191a16]">
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
    {item.listings} offers
  </p>
</div>
        </article>
    )
}

export default ItemCard

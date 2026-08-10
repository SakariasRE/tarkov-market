import { Search, SlidersHorizontal } from 'lucide-react'
import ItemCard from "../components/itemCard"
import { items } from "../data/items"

function Market() {
    return (
        <main className="flex-1 p-8">
            <div className="mx-auto w-full max-w-[1600px]">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex flex-1 items-center border border-neutral-800 bg-neutral-900 px-4">
                    <Search size={16} className="text-neutral-500" />

                    <input
                        type="text"
                        placeholder="Search for items"
                        className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-neutral-600"
                    />
                </div>

                <button className="flex items-center gap-2 border border-neutral-700 bg-neutral-900 px-5 py-3 text-sm text-neutral-300 hover:border-amber-200">
                    <SlidersHorizontal size={17} />
                    Filters
                </button>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        Market Listings
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                        1,284 active offers
                    </p>
                </div>

                <select className="border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-300 outline-none">
                    <option>Price: Lowest</option>
                    <option>Price: Highest</option>
                    <option>Newest</option>
                </select>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
            </div>
        </main>
    )
}
export default Market

import { Trash2 } from "lucide-react";

const mockListings = [
  {
    id: 1,
    name: "Graphics Card",
    quantity: 2,
    price: 950000,
    image: "/items/graphics-card.png",
  },
  {
    id: 2,
    name: "LEDX Skin Transilluminator",
    quantity: 1,
    price: 1500000,
    image: "/items/ledx.png",
  },
];

function MyListings() {
  return (
    <main className="flex-1 p-8">
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
              {mockListings.length} listings
            </p>
          </div>

          <div className="space-y-4">
            {mockListings.map((listing) => {
              const totalValue = listing.price * listing.quantity;

              return (
                <article
                  key={listing.id}
                  className="flex flex-col gap-5 rounded-lg border border-neutral-800 bg-neutral-900 p-5 md:flex-row md:items-center"
                >
                  <div className="flex flex-1 items-center gap-5">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-neutral-950 p-2">
                      <img
                        src={listing.image}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        {listing.name}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-400">
                        Quantity: {listing.quantity}
                      </p>
                    </div>
                  </div>

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

                  <button
                    type="button"
                    aria-label={`Remove ${listing.name} listing`}
                    className="flex items-center justify-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:border-red-900 hover:bg-red-950 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  >
                    <Trash2 size={17} aria-hidden="true" />
                    Remove
                  </button>
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

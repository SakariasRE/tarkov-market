import { TrendingUp, Package, Wallet, CircleDollarSign } from "lucide-react";
import { useState } from "react";
import type { InventoryItem } from "../types/item";
import { items as marketItems } from "../data/items";

function Statistics() {
  const [inventoryItems] = useState<InventoryItem[]>(() => {
    const savedItems = localStorage.getItem("inventory");

    return savedItems
      ? JSON.parse(savedItems)
      : [
          { ...marketItems[0], quantity: 2 },
          { ...marketItems[1], quantity: 5 },
          { ...marketItems[2], quantity: 100 },
        ];
  });

  const inventoryValue = inventoryItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const itemsOwned = inventoryItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Mock-data tills backend finns
  const marketVolume = 128450000;
  const activeListings = 347;
  const averageItemPrice = 184500;
  const totalSpent = 6200000;
  const totalEarned = 7850000;

  const topGainer = {
    name: "LEDX",
    change: 18.4,
  };

  return (
    <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <h1 className="text-2xl font-semibold text-white">
          Statistics
        </h1>

        <p className="mt-1 text-sm text-neutral-400">
          View marketplace activity and your personal trading statistics
        </p>

        <section className="mt-8" aria-labelledby="market-statistics-heading">
          <h2
            id="market-statistics-heading"
            className="mb-4 text-lg font-semibold text-white"
          >
            Market Statistics
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Market Volume"
              value={`₽ ${marketVolume.toLocaleString()}`}
              description="Total value traded"
              icon={<CircleDollarSign size={20} aria-hidden="true" />}
            />

            <StatCard
              title="Active Listings"
              value={activeListings.toLocaleString()}
              description="Items currently for sale"
              icon={<Package size={20} aria-hidden="true" />}
            />

            <StatCard
              title="Average Item Price"
              value={`₽ ${averageItemPrice.toLocaleString()}`}
              description="Average marketplace price"
              icon={<Wallet size={20} aria-hidden="true" />}
            />

            <StatCard
              title="Top Gainer"
              value={topGainer.name}
              description={`+${topGainer.change}% price change`}
              icon={<TrendingUp size={20} aria-hidden="true" />}
            />
          </div>
        </section>

        <section className="mt-10" aria-labelledby="personal-statistics-heading">
          <h2
            id="personal-statistics-heading"
            className="mb-4 text-lg font-semibold text-white"
          >
            Your Statistics
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Inventory Value"
              value={`₽ ${inventoryValue.toLocaleString()}`}
              description="Current value of your items"
              icon={<Package size={20} aria-hidden="true" />}
            />

            <StatCard
              title="Items Owned"
              value={itemsOwned.toLocaleString()}
              description="Total quantity in inventory"
              icon={<Package size={20} aria-hidden="true" />}
            />

            <StatCard
              title="Total Spent"
              value={`₽ ${totalSpent.toLocaleString()}`}
              description="Amount spent on purchases"
              icon={<Wallet size={20} aria-hidden="true" />}
            />

            <StatCard
              title="Total Earned"
              value={`₽ ${totalEarned.toLocaleString()}`}
              description="Amount earned from sales"
              icon={<CircleDollarSign size={20} aria-hidden="true" />}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
};

function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <article className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-neutral-400">
            {title}
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {value}
          </p>
        </div>

        <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-2 text-amber-200">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-sm text-neutral-500">
        {description}
      </p>
    </article>
  );
}

export default Statistics;

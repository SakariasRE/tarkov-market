import { Package, ShoppingBag, Wallet, TrendingUp } from "lucide-react";
import { useState } from "react";
import type { InventoryItem } from "../types/item";
import { items as marketItems } from "../data/items";

function Dashboard() {
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

  const balance = Number(localStorage.getItem("balance")) || 500000;

  const inventoryValue = inventoryItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = inventoryItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // fake data tills backend finns
  const activeListings = 2;
  const totalEarned = 7850000;

  return (
    <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <h1 className="text-2xl font-semibold text-white">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-neutral-400">
          Overview of your marketplace activity
        </p>

        <section
          className="mt-8"
          aria-labelledby="account-overview-heading"
        >
          <h2
            id="account-overview-heading"
            className="mb-4 text-lg font-semibold text-white"
          >
            Account Overview
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <DashboardCard
              title="Balance"
              value={`₽ ${balance.toLocaleString()}`}
              description="Available funds"
              icon={<Wallet size={20} aria-hidden="true" />}
            />

            <DashboardCard
              title="Inventory Value"
              value={`₽ ${inventoryValue.toLocaleString()}`}
              description={`${totalItems} items owned`}
              icon={<Package size={20} aria-hidden="true" />}
            />

            <DashboardCard
              title="Active Listings"
              value={activeListings.toString()}
              description="Items currently for sale"
              icon={<ShoppingBag size={20} aria-hidden="true" />}
            />

            <DashboardCard
              title="Total Earned"
              value={`₽ ${totalEarned.toLocaleString()}`}
              description="From marketplace sales"
              icon={<TrendingUp size={20} aria-hidden="true" />}
            />
          </div>
        </section>

        <section
          className="mt-10"
          aria-labelledby="inventory-overview-heading"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2
              id="inventory-overview-heading"
              className="text-lg font-semibold text-white"
            >
              Inventory Overview
            </h2>

            <span className="text-sm text-neutral-400">
              {inventoryItems.length} unique items
            </span>
          </div>

          <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
            {inventoryItems.slice(0, 4).map((item) => (
              <article
                key={item.id}
                className="flex items-center gap-4 border-b border-neutral-800 p-4 last:border-b-0"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-neutral-950 p-2">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-white">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium text-white">
                    ₽ {(item.price * item.quantity).toLocaleString()}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    ₽ {item.price.toLocaleString()} each
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

type DashboardCardProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
};

function DashboardCard({
  title,
  value,
  description,
  icon,
}: DashboardCardProps) {
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

export default Dashboard;

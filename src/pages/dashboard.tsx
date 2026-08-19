import { useEffect, useState } from "react";
import { Package, ShoppingBag, Wallet, TrendingUp } from "lucide-react";
import { fetchItems } from "../api/items";
import useInventory from "../hooks/useInventory";
import useBalanceContext from "../hooks/useBalanceContext";
import PageHeading from "../components/ui/pageHeading";
import SectionHeading from "../components/ui/sectionHeading";
import StatusPanel from "../components/ui/statusPanel";
import StatTile from "../components/stats/statTile";
import StatGrid from "../components/stats/statGrid";
import InventoryRow from "../components/dashboard/inventoryRow";

function Dashboard() {
  const { items: inventoryItems } = useInventory();

  const [listingCount, setListingCount] = useState<number | null>(null);
  const [marketValue, setMarketValue] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchItems(controller.signal)
      .then((apiItems) => {
        setListingCount(apiItems.length);
        setMarketValue(
          apiItems.reduce((total, item) => total + item.price * item.quantity, 0)
        );
      })
      .catch(() => {
        if (!controller.signal.aborted) setListingCount(0);
      });

    return () => controller.abort();
  }, []);

  const { balance } = useBalanceContext();

  const inventoryValue = inventoryItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = inventoryItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <PageHeading
          title="Dashboard"
          description="Overview of your marketplace activity"
        />

        <section className="mt-8" aria-labelledby="account-overview-heading">
          <SectionHeading
            id="account-overview-heading"
            title="Account Overview"
          />

          <StatGrid>
            <StatTile
              title="Balance"
              value={`₽ ${balance.toLocaleString()}`}
              description="Available funds"
              icon={<Wallet size={20} aria-hidden="true" />}
            />

            <StatTile
              title="Inventory Value"
              value={`₽ ${inventoryValue.toLocaleString()}`}
              description={`${totalItems} items owned`}
              icon={<Package size={20} aria-hidden="true" />}
            />

            <StatTile
              title="Active Listings"
              value={listingCount === null ? "…" : listingCount.toString()}
              description="Items currently for sale"
              icon={<ShoppingBag size={20} aria-hidden="true" />}
            />

            <StatTile
              title="Market Value"
              value={`₽ ${marketValue.toLocaleString()}`}
              description="Total value on the marketplace"
              icon={<TrendingUp size={20} aria-hidden="true" />}
            />
          </StatGrid>
        </section>

        <section className="mt-10" aria-labelledby="inventory-overview-heading">
          <SectionHeading
            id="inventory-overview-heading"
            title="Inventory Overview"
            meta={`${inventoryItems.length} unique items`}
          />

          {inventoryItems.length === 0 ? (
            <StatusPanel message="Your inventory is empty." />
          ) : (
            <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
              {inventoryItems.slice(0, 4).map((item) => (
                <InventoryRow key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Dashboard;

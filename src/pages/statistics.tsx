import { useEffect, useMemo, useState } from "react";
import { TrendingUp, Package, Wallet, CircleDollarSign } from "lucide-react";
import type { ApiItem } from "../api/items";
import { fetchItems } from "../api/items";
import useInventory from "../hooks/useInventory";
import PageHeading from "../components/ui/pageHeading";
import SectionHeading from "../components/ui/sectionHeading";
import ErrorMessage from "../components/ui/errorMessage";
import StatusPanel from "../components/ui/statusPanel";
import StatTile from "../components/stats/statTile";
import StatGrid from "../components/stats/statGrid";

function Statistics() {
  const { items: inventoryItems } = useInventory();

  const [listings, setListings] = useState<ApiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchItems(controller.signal)
      .then((apiItems) => {
        setListings(apiItems);
        setIsLoading(false);
      })
      .catch((fetchError: Error) => {
        if (controller.signal.aborted) return;

        setError(fetchError.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  const marketStats = useMemo(() => {
    const volume = listings.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const averagePrice =
      listings.length > 0
        ? Math.round(
            listings.reduce((total, item) => total + item.price, 0) /
              listings.length
          )
        : 0;

    const topItem = listings.reduce<ApiItem | null>(
      (best, item) => (best === null || item.price > best.price ? item : best),
      null
    );

    return { volume, averagePrice, topItem };
  }, [listings]);

  const inventoryValue = inventoryItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const itemsOwned = inventoryItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <PageHeading
          title="Statistics"
          description="View marketplace activity and your personal trading statistics"
        />

        <ErrorMessage message={error} />

        <section className="mt-8" aria-labelledby="market-statistics-heading">
          <SectionHeading
            id="market-statistics-heading"
            title="Market Statistics"
            meta={`${listings.length} listings`}
          />

          {isLoading ? (
            <StatusPanel message="Loading market statistics..." isBusy />
          ) : (
            <StatGrid>
              <StatTile
                title="Market Volume"
                value={`₽ ${marketStats.volume.toLocaleString()}`}
                description="Total value of all listings"
                icon={<CircleDollarSign size={20} aria-hidden="true" />}
              />

              <StatTile
                title="Active Listings"
                value={listings.length.toLocaleString()}
                description="Items currently for sale"
                icon={<Package size={20} aria-hidden="true" />}
              />

              <StatTile
                title="Average Item Price"
                value={`₽ ${marketStats.averagePrice.toLocaleString()}`}
                description="Average marketplace price"
                icon={<Wallet size={20} aria-hidden="true" />}
              />

              <StatTile
                title="Most Expensive"
                value={marketStats.topItem?.name ?? "—"}
                description={
                  marketStats.topItem
                    ? `₽ ${marketStats.topItem.price.toLocaleString()}`
                    : "No listings yet"
                }
                icon={<TrendingUp size={20} aria-hidden="true" />}
              />
            </StatGrid>
          )}
        </section>

        <section className="mt-10" aria-labelledby="personal-statistics-heading">
          <SectionHeading
            id="personal-statistics-heading"
            title="Your Statistics"
          />

          <StatGrid>
            <StatTile
              title="Inventory Value"
              value={`₽ ${inventoryValue.toLocaleString()}`}
              description="Current value of your items"
              icon={<Package size={20} aria-hidden="true" />}
            />

            <StatTile
              title="Items Owned"
              value={itemsOwned.toLocaleString()}
              description="Total quantity in inventory"
              icon={<Package size={20} aria-hidden="true" />}
            />

            <StatTile
              title="Unique Items"
              value={inventoryItems.length.toLocaleString()}
              description="Distinct items in inventory"
              icon={<Wallet size={20} aria-hidden="true" />}
            />

            <StatTile
              title="Average Value"
              value={`₽ ${
                itemsOwned > 0
                  ? Math.round(inventoryValue / itemsOwned).toLocaleString()
                  : 0
              }`}
              description="Average value per item"
              icon={<CircleDollarSign size={20} aria-hidden="true" />}
            />
          </StatGrid>
        </section>
      </div>
    </main>
  );
}

export default Statistics;

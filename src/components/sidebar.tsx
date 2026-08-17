import {
  LayoutDashboard,
  ShoppingBag,
  List,
  Plus,
  BarChart3,
  User,
  Package,
  X,
} from "lucide-react";

type SidebarProps = {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

function Sidebar({
  currentPage,
  setCurrentPage,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-neutral-800 bg-neutral-950 p-6 transition-transform duration-200 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-[0.35em] text-neutral-500">
              Tarkov
            </h1>

            <p className="text-xs tracking-[0.35em] text-neutral-500">
              Market
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="rounded-md p-2 text-neutral-400 transition hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 md:hidden"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav
          className="flex flex-col gap-2"
          aria-label="Main navigation"
        >
          <NavItem
            icon={<LayoutDashboard size={19} aria-hidden="true" />}
            text="Dashboard"
            active={currentPage === "dashboard"}
            onClick={() => setCurrentPage("dashboard")}
          />

          <NavItem
            icon={<ShoppingBag size={19} aria-hidden="true" />}
            text="Marketplace"
            active={currentPage === "marketplace"}
            onClick={() => setCurrentPage("marketplace")}
          />

          <NavItem
            icon={<Package size={19} aria-hidden="true" />}
            text="Inventory"
            active={currentPage === "inventory"}
            onClick={() => setCurrentPage("inventory")}
          />

          <NavItem
            icon={<List size={19} aria-hidden="true" />}
            text="My Listings"
            active={currentPage === "listings"}
            onClick={() => setCurrentPage("listings")}
          />

          <NavItem
            icon={<Plus size={19} aria-hidden="true" />}
            text="Sell Item"
            active={currentPage === "sell"}
            onClick={() => setCurrentPage("sell")}
          />

          <NavItem
            icon={<BarChart3 size={19} aria-hidden="true" />}
            text="Statistics"
            active={currentPage === "statistics"}
            onClick={() => setCurrentPage("statistics")}
          />
        </nav>

        <div className="mt-auto border-t border-neutral-800 pt-5">
          <NavItem
            icon={<User size={19} aria-hidden="true" />}
            text="Profile"
            active={currentPage === "profile"}
            onClick={() => setCurrentPage("profile")}
          />
        </div>
      </aside>
    </>
  );
}

type NavItemProps = {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
};

function NavItem({
  icon,
  text,
  active,
  onClick,
}: NavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
        active
          ? "nav-item-active border-l-2 border-amber-300 bg-neutral-800 text-amber-200"
          : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}

export default Sidebar;

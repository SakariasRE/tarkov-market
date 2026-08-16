import {
  LayoutDashboard,
  ShoppingBag,
  List,
  Plus,
  BarChart3,
  User,
  Package,
} from "lucide-react";

type SidebarProps = {
  currentPage: string;
  setCurrentPage: (page: string) => void;
};

function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-neutral-800 bg-neutral-950 p-6">
      <div className="mb-10">
        <h1 className="text-xl font-bold tracking-[0.35em] text-neutral-500">
          Tarkov
        </h1>

        <p className="text-xs tracking-[0.35em] text-neutral-500">
          Market
        </p>
      </div>

      <nav className="flex flex-col gap-2" aria-label="Main navigation">
        <NavItem
          icon={<LayoutDashboard size={19} />}
          text="Dashboard"
          active={currentPage === "dashboard"}
          onClick={() => setCurrentPage("dashboard")}
        />

        <NavItem
          icon={<ShoppingBag size={19} />}
          text="Marketplace"
          active={currentPage === "marketplace"}
          onClick={() => setCurrentPage("marketplace")}
        />
        <NavItem
          icon={<Package size={19} />}
          text="Inventory"
          active={currentPage === "inventory"}
          onClick={() => setCurrentPage("inventory")}
        />

        <NavItem
          icon={<List size={19} />}
          text="My Listings"
          active={currentPage === "listings"}
          onClick={() => setCurrentPage("listings")}
        />

        <NavItem
          icon={<Plus size={19} />}
          text="Sell Item"
          active={currentPage === "sell"}
          onClick={() => setCurrentPage("sell")}
        />

        <NavItem
          icon={<BarChart3 size={19} />}
          text="Statistics"
          active={currentPage === "statistics"}
          onClick={() => setCurrentPage("statistics")}
        />
      </nav>

      <div className="mt-auto border-t border-neutral-800 pt-5">
        <NavItem
          icon={<User size={19} />}
          text="Profile"
          active={currentPage === "profile"}
          onClick={() => setCurrentPage("profile")}
        />
      </div>
    </aside>
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
      className={`flex items-center gap-3 px-4 py-3 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
        active
          ? "bg-neutral-800 text-amber-200"
          : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}

export default Sidebar;

import {
  LayoutDashboard,
  ShoppingBag,
  List,
  Plus,
  BarChart3,
  User,
  Package,
  X,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/marketplace", label: "Marketplace", icon: ShoppingBag, end: false },
  { to: "/inventory", label: "Inventory", icon: Package, end: false },
  { to: "/listings", label: "My Listings", icon: List, end: false },
  { to: "/sell", label: "Sell Item", icon: Plus, end: false },
  { to: "/statistics", label: "Statistics", icon: BarChart3, end: false },
];

function Sidebar({ isOpen, onClose, onLogout }: SidebarProps) {
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

            <p className="text-xs tracking-[0.35em] text-neutral-500">Market</p>
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

        <nav className="flex flex-col gap-2" aria-label="Main navigation">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavItem
              key={to}
              to={to}
              end={end}
              icon={<Icon size={19} aria-hidden="true" />}
              text={label}
              onNavigate={onClose}
            />
          ))}
        </nav>

        <div className="mt-auto border-t border-neutral-800 pt-5">
          <NavItem
            to="/profile"
            icon={<User size={19} aria-hidden="true" />}
            text="Profile"
            onNavigate={onClose}
          />

          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-neutral-400 transition hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <LogOut size={19} aria-hidden="true" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  text: string;
  end?: boolean;
  onNavigate: () => void;
};

function NavItem({ to, icon, text, end, onNavigate }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
          isActive
            ? "nav-item-active border-l-2 border-amber-300 bg-neutral-800 text-amber-200"
            : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
        }`
      }
    >
      {icon}
      {text}
    </NavLink>
  );
}

export default Sidebar;

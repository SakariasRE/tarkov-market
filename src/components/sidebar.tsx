import {
    LayoutDashboard,
    ShoppingBag,
    List,
    Plus,
    BarChart3,
    User,
} from "lucide-react";

function Sidebar() {
    return (
        <aside className="flex min-h-screen w-64 flex-col border-r border-neutral-800 bg-neutral-950 p-6">
            <div className="mb-10">
                <h1 className="text-xl font-bold tracking-[0.35em] text-neutral-500">Tarkov</h1>
                <p className="textxs tracking-[0.35em] text-neutral-500">Market</p>
                </div>

                <nav className="flex flex-col gap-2">
                    <NavItem icon={<LayoutDashboard size={19} />} text="Dashboard" />
                    <NavItem icon={<ShoppingBag size={19} />} text="Marketplace" active />
                    <NavItem icon={<List size={19} />} text="My Listings" />
                    <NavItem icon={<Plus size={19} />} text="Sell Item" />
                    <NavItem icon={<BarChart3 size={19} />} text="Statistics" />
                </nav>

                <div className="mt-auto border-t border-neutral-800 pt-5">
                    <NavItem icon={<User size={19} />} text="Profile" />
                </div>
        </aside>
    );
}

type NavItemProps = {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
};

function NavItem({ icon, text, active }: NavItemProps) {
    return (
        <button
            className={`flex items-center gap-3 px-4 py-3 text-left text-sm transition ${
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

import { Bell } from "lucide-react";
import Balance from "./balance";

type HeaderProps = {
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
};

function Header({ balance, setBalance }: HeaderProps) {
    return (
        <header className="flex h-20 items-center justify-between border-b border-neutral-800 px-8">
            <div>
                <h2 className="text-xl font-semibold text-neutral-100">
                    Flea Market
                </h2>
                <p className="mt-1 text-xs text-neutral-500">
                    Browse player listings and compare prices
                </p>
            </div>

            <div className="flex items-center gap-4">
                <Balance
                    balance={balance}
                    setBalance={setBalance}
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="text-neutral-400 hover:text-amber-200">
                    <Bell size={20} />
                </button>

                <div className="h-9 w-9 bg-neutral-800" />
            </div>
        </header>
    );
}

export default Header;

import { useState } from "react";
import { Plus, X } from "lucide-react";

type BalanceProps = {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
};

function Balance({ balance, setBalance }: BalanceProps) {
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const addFunds = () => {
    const value = Number(amount);

    if (value <= 0 || isNaN(value)) {
      return;
    }

    setBalance(balance + value);
    setAmount("");
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs text-neutral-500">Balance</p>
          <p className="font-semibold text-amber-200">
            ₽ {balance.toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1 rounded border border-neutral-700 px-3 py-2 text-sm text-neutral-300 hover:border-amber-200 hover:text-amber-200"
        >
          <Plus size={16} />
          Add funds
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md rounded border border-neutral-800 bg-neutral-950 p-6 shadow-xl">

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-100">
                Add funds
              </h2>

              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-500 hover:text-neutral-200"
              >
                <X size={20} />
              </button>
            </div>

            <label className="mb-2 block text-sm text-neutral-400">
              Amount
            </label>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded border border-neutral-700 bg-neutral-900 px-4 py-3 text-neutral-100 outline-none focus:border-amber-200"
            />

            <button
              onClick={addFunds}
              className="mt-4 w-full rounded bg-amber-200 px-4 py-3 font-medium text-neutral-950 hover:bg-amber-100"
            >
              Add funds
            </button>

          </div>
        </div>
      )}
    </>
  );
}

export default Balance;

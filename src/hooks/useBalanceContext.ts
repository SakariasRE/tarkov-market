import { useOutletContext } from "react-router-dom";

export type BalanceContext = {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
};

function useBalanceContext(): BalanceContext {
  return useOutletContext<BalanceContext>();
}

export default useBalanceContext;

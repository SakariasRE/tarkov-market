import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Inventory from "./pages/inventory";
import SellItem from "./pages/sellItem";
import Market from "./pages/market";
import Statistics from "./pages/statistics";

function App() {
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("balance");
    return savedBalance ? Number(savedBalance) : 500000;
  });

  const [currentPage, setCurrentPage] = useState("inventory");

  useEffect(() => {
    localStorage.setItem("balance", balance.toString());
  }, [balance]);

  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex flex-1 flex-col">
        <Header
          balance={balance}
          setBalance={setBalance}
        />

        {currentPage === "marketplace" && <Market />}
        {currentPage === "inventory" && <Inventory />}
        {currentPage === "sell" && <SellItem />}
        {currentPage === "statistics" && <Statistics />}
      </div>
    </div>
  );
}

export default App;

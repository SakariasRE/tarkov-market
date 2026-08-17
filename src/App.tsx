import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Inventory from "./pages/inventory";
import SellItem from "./pages/sellItem";
import Market from "./pages/market";
import Statistics from "./pages/statistics";
import MyListings from "./pages/myListings";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";

function App() {
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("balance");
    return savedBalance ? Number(savedBalance) : 500000;
  });

  const [currentPage, setCurrentPage] = useState("inventory");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("balance", balance.toString());
  }, [balance]);

  function handlePageChange(page: string) {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-h-screen min-w-0 flex-col md:ml-64">
        <Header
          balance={balance}
          setBalance={setBalance}
          onProfileClick={() => handlePageChange("profile")}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="flex min-w-0 flex-1">
          {currentPage === "profile" && <Profile />}
          {currentPage === "dashboard" && <Dashboard />}
          {currentPage === "marketplace" && <Market />}
          {currentPage === "inventory" && <Inventory />}
          {currentPage === "sell" && <SellItem />}
          {currentPage === "statistics" && <Statistics />}
          {currentPage === "listings" && <MyListings />}
        </div>
      </div>
    </div>
  );
}

export default App;

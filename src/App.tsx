import { useEffect, useState } from "react";
import type { AuthUser } from "./api/auth";
import { fetchCurrentUser, logout } from "./api/auth";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Login from "./pages/login";
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

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const [currentPage, setCurrentPage] = useState("inventory");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("balance", balance.toString());
  }, [balance]);

  
  useEffect(() => {
    let ignore = false;

    fetchCurrentUser()
      .then((currentUser) => {
        if (!ignore) setUser(currentUser);
      })
      .catch(() => {
        if (!ignore) setUser(null);
      })
      .finally(() => {
        if (!ignore) setIsCheckingSession(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  function handlePageChange(page: string) {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  }

  async function handleLogout() {
    try {
      await logout();
    } catch {
      // Cookien kan redan ha gatt ut - logga ut lokalt anda.
    }

    setUser(null);
    setCurrentPage("inventory");
    setIsSidebarOpen(false);
  }

  if (isCheckingSession) {
    return (
      <main
        aria-busy="true"
        className="flex min-h-screen items-center justify-center bg-neutral-950"
      >
        <p className="text-sm text-neutral-500">Laddar…</p>
      </main>
    );
  }

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
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
          {currentPage === "marketplace" && (
            <Market balance={balance} setBalance={setBalance} />
          )}
          {currentPage === "inventory" && <Inventory />}
          {currentPage === "sell" && <SellItem setBalance={setBalance} />}
          {currentPage === "statistics" && <Statistics />}
          {currentPage === "listings" && <MyListings />}
        </div>
      </div>
    </div>
  );
}

export default App;

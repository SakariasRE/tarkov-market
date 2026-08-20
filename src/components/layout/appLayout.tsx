import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";
import Header from "../header";

type AppLayoutProps = {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  onLogout: () => void;
};

function AppLayout({ balance, setBalance, onLogout }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={onLogout}
      />

      <div className="flex min-h-screen min-w-0 flex-col md:ml-64">
        <Header
          balance={balance}
          setBalance={setBalance}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="flex min-w-0 flex-1">
          <Outlet context={{ balance, setBalance }} />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;

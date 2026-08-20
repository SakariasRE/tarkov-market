import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import type { AuthUser } from "./api/auth";
import { fetchCurrentUser, logout } from "./api/auth";
import AppLayout from "./components/layout/appLayout";
import RequireAuth from "./components/layout/requireAuth";
import LoadingScreen from "./components/layout/loadingScreen";
import Login from "./pages/login";
import Inventory from "./pages/inventory";
import SellItem from "./pages/sellItem";
import Market from "./pages/market";
import Statistics from "./pages/statistics";
import MyListings from "./pages/myListings";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";

function App() {
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    let ignore = false;

    fetchCurrentUser()
      .then((currentUser) => {
        if (ignore) return;

        setUser(currentUser);
        if (currentUser) setBalance(currentUser.balance);
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

  async function handleLogout() {
    try {
      await logout();
    } catch {
      setUser(null);
    }

    setUser(null);
  }

  if (isCheckingSession) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/" replace />
          ) : (
            <Login
              onLogin={(loggedIn) => {
                setUser(loggedIn);
                setBalance(loggedIn.balance);
              }}
            />
          )
        }
      />

      <Route element={<RequireAuth user={user} />}>
        <Route
          element={
            <AppLayout
              balance={balance}
              setBalance={setBalance}
              onLogout={handleLogout}
            />
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/marketplace"
            element={<Market balance={balance} setBalance={setBalance} />}
          />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/listings" element={<MyListings />} />
          <Route path="/sell" element={<SellItem setBalance={setBalance} />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

import {
  Bell,
  User,
  Sun,
  Moon,
  ALargeSmall,
  Menu,
} from "lucide-react";

import { useState } from "react";
import Balance from "./balance";
import { useAccessibility } from "../context/accessibilityContext";

type HeaderProps = {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  onProfileClick: () => void;
  onMenuClick: () => void;
};

function Header({
  balance,
  setBalance,
  onProfileClick,
  onMenuClick,
}: HeaderProps) {
  const [profileImage] = useState<string | null>(() => {
    return localStorage.getItem("profileImage");
  });

  const {
    theme,
    textSize,
    toggleTheme,
    toggleTextSize,
  } = useAccessibility();

  return (
    <header className="flex min-h-20 items-center justify-between gap-3 border-b border-neutral-800 px-4 py-3 md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="shrink-0 rounded-md p-2 text-neutral-400 transition hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 md:hidden"
        >
          <Menu size={22} aria-hidden="true" />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-neutral-100 md:text-xl">
            Flea Market
          </h2>

          <p className="mt-1 hidden text-xs text-neutral-500 sm:block">
            Browse player listings and compare prices
          </p>
        </div>
      </div>

      <div className="hidden items-center gap-4 lg:flex">
        <Balance
          balance={balance}
          setBalance={setBalance}
        />
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={toggleTextSize}
          aria-label={
            textSize === "normal"
              ? "Increase text size"
              : "Use normal text size"
          }
          aria-pressed={textSize === "large"}
          className="rounded-md p-2 text-neutral-400 transition hover:bg-neutral-900 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <ALargeSmall size={20} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          aria-pressed={theme === "light"}
          className="rounded-md p-2 text-neutral-400 transition hover:bg-neutral-900 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          {theme === "dark" ? (
            <Sun size={20} aria-hidden="true" />
          ) : (
            <Moon size={20} aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="hidden rounded-md p-2 text-neutral-400 transition hover:bg-neutral-900 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:block"
        >
          <Bell size={20} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onProfileClick}
          aria-label="Open profile"
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-neutral-700 bg-neutral-800 transition hover:border-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:h-10 sm:w-10"
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <User
              size={20}
              className="text-neutral-400"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;

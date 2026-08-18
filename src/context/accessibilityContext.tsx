import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";
type TextSize = "normal" | "large";

type AccessibilityContextType = {
  theme: Theme;
  textSize: TextSize;
  toggleTheme: () => void;
  toggleTextSize: () => void;
};

const AccessibilityContext =
  createContext<AccessibilityContextType | undefined>(undefined);

type AccessibilityProviderProps = {
  children: ReactNode;
};

export function AccessibilityProvider({
  children,
}: AccessibilityProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "dark";
  });

  const [textSize, setTextSize] = useState<TextSize>(() => {
    return (localStorage.getItem("textSize") as TextSize) || "normal";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);

    document.documentElement.classList.toggle(
      "light",
      theme === "light"
    );
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("textSize", textSize);

    document.documentElement.classList.toggle(
      "large-text",
      textSize === "large"
    );
  }, [textSize]);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  }

  function toggleTextSize() {
    setTextSize((currentSize) =>
      currentSize === "normal" ? "large" : "normal"
    );
  }

  return (
    <AccessibilityContext.Provider
      value={{
        theme,
        textSize,
        toggleTheme,
        toggleTextSize,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error(
      "useAccessibility must be used inside AccessibilityProvider"
    );
  }

  return context;
}

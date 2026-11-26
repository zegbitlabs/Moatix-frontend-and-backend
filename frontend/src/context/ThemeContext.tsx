"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Theme = "dark" | "slate";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Lazy state initialization to read from localStorage without setState-in-effect
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("moatix_theme") as Theme | null;
        if (saved === "dark" || saved === "slate") {
          return saved;
        }
      } catch {
        // Fallback if localStorage is inaccessible
      }
    }
    return "dark";
  });

  // Sync data-theme attribute with document root
  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("moatix_theme", theme);
    } catch {
      // Ignored
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "slate" : "dark"));
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: handleSetTheme }}>
      <div data-theme={theme} className={theme === "dark" ? "dark-theme" : "slate-theme"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

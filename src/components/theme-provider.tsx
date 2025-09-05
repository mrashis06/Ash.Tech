
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

type ThemeConfig = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeConfigContext = React.createContext<ThemeConfig | undefined>(
  undefined
);

const themes: { [key: string]: { [key: string]: string } } = {
  green: {
    "--primary": "142.1 76.2% 36.3%",
    "--primary-foreground": "142.1 76.2% 96.3%",
  },
  blue: {
    "--primary": "217.2 91.2% 59.8%",
    "--primary-foreground": "217.2 91.2% 9.8%",
  },
  violet: {
    "--primary": "262.1 83.3% 57.8%",
    "--primary-foreground": "262.1 83.3% 97.8%",
  },
  orange: {
    "--primary": "24.6 95% 53.1%",
    "--primary-foreground": "24.6 95% 3.1%",
  },
  red: {
    "--primary": "0 72.2% 50.6%",
    "--primary-foreground": "0 72.2% 90.6%",
  },
  cyan: {
    "--primary": "180 100% 40%",
    "--primary-foreground": "240 10% 3.9%",
  },
};

const THEME_STORAGE_KEY = "accent-theme";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState("cyan");

  React.useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme && themes[storedTheme]) {
      setThemeState(storedTheme);
    }
  }, []);

  const setTheme = (newTheme: string) => {
    if (themes[newTheme]) {
      setThemeState(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }
  };

  React.useEffect(() => {
    const root = window.document.documentElement;
    const selectedTheme = themes[theme];
    for (const [key, value] of Object.entries(selectedTheme)) {
      root.style.setProperty(key, value);
    }
  }, [theme]);

  const value = React.useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <NextThemesProvider {...props}>
      <ThemeConfigContext.Provider value={value}>
        {children}
      </ThemeConfigContext.Provider>
    </NextThemesProvider>
  );
}

export const useThemeConfig = () => {
  const context = React.useContext(ThemeConfigContext);
  if (context === undefined) {
    throw new Error("useThemeConfig must be used within a ThemeProvider");
  }
  return context;
};

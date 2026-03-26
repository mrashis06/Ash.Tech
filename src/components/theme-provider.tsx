
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
  emerald: {
    "--primary": "158 80% 42%",
    "--primary-foreground": "158 80% 98%",
  },
  indigo: {
    "--primary": "239 84% 67%",
    "--primary-foreground": "239 84% 98%",
  },
  rose: {
    "--primary": "346 87% 60%",
    "--primary-foreground": "346 87% 98%",
  },
  amber: {
    "--primary": "38 92% 50%",
    "--primary-foreground": "38 92% 4%",
  },
  slate: {
    "--primary": "215 16% 50%",
    "--primary-foreground": "215 16% 98%",
  },
  cyan: {
    "--primary": "188 86% 53%",
    "--primary-foreground": "188 86% 4%",
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

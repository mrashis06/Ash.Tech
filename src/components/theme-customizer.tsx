
"use client";

import { useTheme } from "next-themes";
import { Moon, Palette, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useThemeConfig } from "./theme-provider";
import { cn } from "@/lib/utils";

const themes = [
  { name: "green", color: "hsl(142.1 76.2% 36.3%)" },
  { name: "blue", color: "hsl(217.2 91.2% 59.8%)" },
  { name: "violet", color: "hsl(262.1 83.3% 57.8%)" },
  { name: "orange", color: "hsl(24.6 95% 53.1%)" },
  { name: "red", color: "hsl(0 72.2% 50.6%)" },
  { name: "cyan", color: "hsl(180 100% 40%)" },
];

export function ThemeCustomizer() {
  const { setTheme, theme } = useTheme();
  const { theme: primaryColor, setTheme: setPrimaryColor } = useThemeConfig();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Customize theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Customize</h4>
            <p className="text-xs text-muted-foreground">
              Personalize the look and feel of the website.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-2">
              <Label>Color</Label>
              <div className="col-span-2 flex items-center space-x-2">
                {themes.map((t) => (
                  <Button
                    key={t.name}
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-full",
                      primaryColor === t.name && "border-2 border-foreground"
                    )}
                    style={{ backgroundColor: t.color }}
                    onClick={() => setPrimaryColor(t.name)}
                  >
                    <span className="sr-only">{t.name}</span>
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label>Mode</Label>
              <div className="col-span-2 flex items-center space-x-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="h-4 w-4" />
                  <span className="sr-only">Light</span>
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="h-4 w-4" />
                  <span className="sr-only">Dark</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

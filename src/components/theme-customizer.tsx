
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
  { name: "cyan", color: "hsl(188 86% 53%)" },
  { name: "emerald", color: "hsl(158 80% 42%)" },
  { name: "indigo", color: "hsl(239 84% 67%)" },
  { name: "rose", color: "hsl(346 87% 60%)" },
  { name: "amber", color: "hsl(38 92% 50%)" },
  { name: "slate", color: "hsl(215 16% 50%)" },
];

export function ThemeCustomizer() {
  const { setTheme, theme } = useTheme();
  const { theme: primaryColor, setTheme: setPrimaryColor } = useThemeConfig();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-6 w-6" />
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
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" onClick={() => setTheme("light")}>
        <span className="sr-only">Toggle theme</span>
        <Sun className="h-4 w-4" />
      </Button>
      <Button variant="ghost" onClick={() => setTheme("dark")}>
        <span className="sr-only">Toggle theme</span>
        <Moon className="h-4 w-4 " />
      </Button>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !resolvedTheme) {
      setTheme("light");
    }
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="relative flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full bg-[#E7E7E7] p-1 outline-none transition-colors duration-300 dark:bg-[#292929]"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {/* Moving circle */}
      <span
        className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-xs transition-transform duration-300 z-0 ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      />

      {/* Sun Icon */}
      <Sun
        className={`absolute left-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 z-10 transition-colors duration-300 pointer-events-none ${
          isDark ? "text-zinc-400" : "text-amber-500"
        }`}
      />

      {/* Moon Icon */}
      <Moon
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 z-10 transition-colors duration-300 pointer-events-none ${
          isDark ? "text-zinc-900" : "text-zinc-400"
        }`}
      />
    </button>
  );
}

export default ThemeSwitcher;

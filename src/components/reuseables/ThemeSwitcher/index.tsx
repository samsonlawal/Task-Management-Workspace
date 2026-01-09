"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon } from "@radix-ui/react-icons";

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
  return (
    <>
      <button
        // className="cursor-not-allowed"
        className="hidden cursor-pointer lg:flex"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme === "light" ? (
          <img src="/icons/MoonIcon.svg" alt="" className="h-[16px] w-[16px]" />
        ) : null}
        {resolvedTheme === "dark" ? (
          <SunIcon className="h-[16px] w-[16px]" />
        ) : null}
      </button>

      <button
        className="relative flex h-8 w-16 items-center rounded-full border-none bg-[#E7E7E7] p-1 outline-none transition-all duration-300 dark:bg-[#292929] lg:hidden"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <div
          className={`absolute h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
            resolvedTheme === "dark" ? "translate-x-8" : "translate-x-0"
          }`}
        ></div>

        <SunIcon
          className={`absolute w-4 h-4${resolvedTheme === "dark" ? "text-[#838383]" : "text-[#111111]"}`}
          style={{
            left: "8px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />

        <img
          src={
            resolvedTheme === "dark"
              ? "/icons/MoonIcon.svg"
              : "/icons/inactiveMoon.svg"
          }
          alt="Moon"
          className={`absolute h-4 w-4 ${resolvedTheme === "dark" ? "text-[#FFFFFF]" : "text-[#838383]"}`}
          style={{
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </button>
    </>
  );
}

export default ThemeSwitcher;

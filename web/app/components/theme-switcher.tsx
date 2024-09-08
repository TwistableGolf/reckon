"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
export default function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="h-6 w-6"></div>;
  }
  if (resolvedTheme === "dark") {
    return <MdLightMode size={24} className="cursor-pointer h-auto" onClick={() => setTheme("light")}></MdLightMode>;
  }

  if (resolvedTheme === "light") {
    return <MdDarkMode size={24} className="cursor-pointer h-auto" onClick={() => setTheme("dark")}></MdDarkMode>;
  }
}

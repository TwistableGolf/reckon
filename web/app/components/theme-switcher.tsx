"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
export default function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <></>;
  }
  if (resolvedTheme === "dark") {
    console.log(resolvedTheme);
    return <FiSun size={24} className="cursor-pointer h-auto" onClick={() => setTheme("light")}></FiSun>;
  }

  if (resolvedTheme === "light") {
    return <FiMoon size={24} className="cursor-pointer h-auto" onClick={() => setTheme("dark")}></FiMoon>;
  }
}

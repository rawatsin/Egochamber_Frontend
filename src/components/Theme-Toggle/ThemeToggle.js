"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "marginalia-theme";

function getInitial() {
  if (typeof window === "undefined") return "light";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const initial = getInitial();
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";

    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className=" cursor-pointer rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
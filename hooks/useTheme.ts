"use client";

import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark"); // Default dark for luxury weed shop aesthetic

  useEffect(() => {
    // Leer el tema guardado en localStorage o usar 'dark'
    const storedTheme = localStorage.getItem("green-botanics-theme") as "dark" | "light" | null;
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Si no hay preferencia, aplicar oscuro por defecto
      const root = window.document.documentElement;
      root.classList.add("dark");
      localStorage.setItem("green-botanics-theme", "dark");
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("green-botanics-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}

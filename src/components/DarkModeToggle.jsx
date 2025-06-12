import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Detect screen width
    const isMobile = window.innerWidth < 768;

    // Auto-set dark mode on mobile without toggle
    if (isMobile) {
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsDark(true);
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setIsDark(false);
      }
      return; // skip toggle on mobile
    }

    // Desktop or tablet: use stored preference or fallback to system
    if (stored) {
      setIsDark(stored === "dark");
    } else {
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Hide toggle on mobile
  if (window.innerWidth < 768) return null;

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="rounded-full p-2 text-gray-800 hover:bg-gray-200 hover:cursor-pointer mr-10 dark:text-white dark:hover:bg-gray-700"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDarkMode = theme === "dark";

  return (
    <div className="flex items-center gap-2">
      <div>Dark mode</div>
      <Switch
        isSelected={isDarkMode}
        size="sm"
        color="success"
        checked={isDarkMode}
        onChange={toggleTheme}
      />
    </div>
  );
};

export default ThemeSwitch;

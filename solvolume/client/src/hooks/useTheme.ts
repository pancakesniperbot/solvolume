import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useTheme = () => {
  const { theme, setTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  
  // Avoid hydration mismatch by only showing the theme UI once mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDarkTheme = currentTheme === "dark";
  
  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };
  
  return {
    theme: currentTheme,
    isDarkTheme,
    toggleTheme,
    mounted
  };
};

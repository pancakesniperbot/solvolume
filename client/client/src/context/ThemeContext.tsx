import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextProps {
  children: React.ReactNode;
}

type ThemeType = "dark" | "light";

interface ThemeContextType {
  theme: ThemeType;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  mounted: boolean;
}

// Default colors for the themes
const THEME_COLORS = {
  dark: {
    background: "#080810",
    foreground: "#ffffff",
    card: "#0c0c15",
    primary: "#14F195",
    secondary: "#9945FF",
    accent: "#03E1FF",
    border: "#1e2035",
  },
  light: {
    background: "#f8f9fc",
    foreground: "#080810",
    card: "#ffffff",
    primary: "#1a8b65",
    secondary: "#7039c0",
    accent: "#0296a8",
    border: "#e0e0e5",
  }
};

// Initialize the context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  isDarkTheme: true,
  toggleTheme: () => {},
  mounted: false,
});

// Hook for using the theme context
export const useTheme = () => useContext(ThemeContext);

// Provider component that wraps your app and makes theme available
export function ThemeProvider({ children }: ThemeContextProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<ThemeType>("dark");

  // Initialize theme on mount
  useEffect(() => {
    // Check localStorage or system preference
    const storedTheme = localStorage.getItem("theme") as ThemeType;
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
    setMounted(true);
  }, []);

  // Apply theme when it changes
  useEffect(() => {
    if (!mounted) return;

    // Set theme on document and localStorage
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Apply theme colors
    const colors = theme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light;

    // Update background and text colors
    document.documentElement.style.setProperty("--background", colors.background);
    document.documentElement.style.setProperty("--foreground", colors.foreground);
    document.documentElement.style.setProperty("--card", colors.card);
    document.documentElement.style.setProperty("--primary", colors.primary);
    document.documentElement.style.setProperty("--secondary", colors.secondary);
    document.documentElement.style.setProperty("--accent", colors.accent);
    document.documentElement.style.setProperty("--border", colors.border);

    // Add class and background color for immediate visual feedback
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      document.body.style.backgroundColor = colors.background;
      document.body.style.color = colors.foreground;
    } else {
      document.body.classList.add("light"); 
      document.body.classList.remove("dark");
      document.body.style.backgroundColor = colors.background;
      document.body.style.color = colors.foreground;
    }

  }, [theme, mounted]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      console.log("Toggling theme from", prevTheme, "to", newTheme);
      return newTheme;
    });
  };

  const value = {
    theme,
    isDarkTheme: theme === "dark",
    toggleTheme,
    mounted,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

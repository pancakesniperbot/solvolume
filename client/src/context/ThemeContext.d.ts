import React from "react";
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
export declare const useTheme: () => ThemeContextType;
export declare function ThemeProvider({ children }: ThemeContextProps): import("react/jsx-runtime").JSX.Element;
export {};

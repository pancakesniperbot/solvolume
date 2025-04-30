import { ReactNode } from 'react';
interface CyberpunkThemeContextType {
    cyberpunkEnabled: boolean;
}
export declare const useCyberpunkTheme: () => CyberpunkThemeContextType;
interface CyberpunkThemeProviderProps {
    children: ReactNode;
}
export declare function CyberpunkThemeProvider({ children }: CyberpunkThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export {};

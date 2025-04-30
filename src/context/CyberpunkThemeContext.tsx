import { createContext, useContext, useEffect, ReactNode } from 'react';
import { toggleCyberpunkTheme, initCyberpunkEffects } from '@/utils/cyberpunk-effects';

// Simplified context since theme is always enabled
interface CyberpunkThemeContextType {
  cyberpunkEnabled: boolean;
}

const CyberpunkThemeContext = createContext<CyberpunkThemeContextType>({
  cyberpunkEnabled: true
});

export const useCyberpunkTheme = () => useContext(CyberpunkThemeContext);

interface CyberpunkThemeProviderProps {
  children: ReactNode;
}

export function CyberpunkThemeProvider({ children }: CyberpunkThemeProviderProps) {
  // Always enabled - no toggle functionality
  const cyberpunkEnabled = true;

  // Apply cyberpunk effects on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Initialize effects
        const cleanup = initCyberpunkEffects(true);
        
        // Add the theme class to the document
        toggleCyberpunkTheme(true);
        
        // Load cyberpunk CSS
        document.documentElement.classList.add('cyberpunk-theme');
        
        // Cleanup on unmount
        return () => {
          if (typeof cleanup === 'function') {
            cleanup();
          }
        };
      } catch (error) {
        console.error("Error initializing cyberpunk theme:", error);
      }
    }
  }, []);

  return (
    <CyberpunkThemeContext.Provider value={{ cyberpunkEnabled }}>
      {children}
    </CyberpunkThemeContext.Provider>
  );
}
import React, { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CyberpunkThemeProvider } from "@/context/CyberpunkThemeContext";
import { LicenseProvider } from "@/components/LicenseProvider";
import { CryptoProvider } from "@/state/CryptoContext";

import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect if we're on a mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CryptoProvider>
        <CyberpunkThemeProvider>
          <TooltipProvider>
            <LicenseProvider>
              {/* Use proper semantic HTML structure */}
              <div className="min-h-screen flex flex-col">
                {/* Notifications component */}
                <Toaster />
                
                {/* Main application content wrapped in semantic tags */}
                <div className="flex-grow">
                  <Switch>
                    <Route path="/" component={Home} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
                
                {/* Skip to content link for accessibility */}
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white p-2 z-50">
                  Skip to content
                </a>
              </div>
            </LicenseProvider>
          </TooltipProvider>
        </CyberpunkThemeProvider>
      </CryptoProvider>
    </QueryClientProvider>
  );
}

export default App;

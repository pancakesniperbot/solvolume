import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./components/ui-overrides.css";

// Import the Three.js patch to fix BatchedMesh error
import './lib/three-patch';

// Apply dark theme directly to the document
document.documentElement.classList.add("dark");
document.documentElement.setAttribute("data-theme", "dark");
document.body.setAttribute("data-theme", "dark");

// Force dark mode with additional overrides
document.documentElement.style.colorScheme = "dark";
document.body.style.backgroundColor = "#080810";
document.body.style.color = "#ffffff";

// Define a global type for window with our custom properties
declare global {
  interface Window {
    appErrorState?: {
      hasError: boolean;
      errorSeen: boolean;
      lastError: string;
    };
  }
}

// Global error handling
window.addEventListener('unhandledrejection', (event) => {
  console.warn('Global unhandled promise rejection:', event.reason);
  // Prevent the default browser logging
  event.preventDefault();

  // Let the user know something went wrong with a non-intrusive approach
  const appErrorState = {
    hasError: true,
    errorSeen: false,
    lastError: event.reason?.toString() || 'Unknown error'
  };
  
  // Store the error state for potential use in components
  window.appErrorState = appErrorState;
});

// Add global error boundary for uncaught exceptions
window.addEventListener('error', (event) => {
  console.warn('Global error caught:', event.error);
  
  // Don't disrupt the user if it's a non-critical error (like image loading)
  if (event.error && !event.error.toString().includes('loading')) {
    const appErrorState = {
      hasError: true,
      errorSeen: false,
      lastError: event.error?.toString() || 'Unknown error'
    };
    
    // Store the error state for potential use in components
    window.appErrorState = appErrorState;
  }
});

// Performant rendering
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

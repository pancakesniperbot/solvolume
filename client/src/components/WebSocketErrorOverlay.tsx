import React, { useState, useEffect } from 'react';
import { AlertTriangle, WifiOff, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebSocket } from '@/services/WebSocketService';

// WebSocket connection status overlay component - modified for opt-in connection approach
export const WebSocketErrorOverlay = () => {
  const [showError, setShowError] = useState(false);
  const [errorType, setErrorType] = useState<'connecting' | 'disconnected'>('disconnected');
  const [attempts, setAttempts] = useState(0);
  const webSocketStore = useWebSocket();
  
  // Listen to WebSocket connection status changes
  useEffect(() => {
    if (webSocketStore.error) {
      setErrorType('disconnected');
      setShowError(true);
      setAttempts(prev => prev + 1);
    } else if (webSocketStore.isConnected) {
      setShowError(false);
      setAttempts(0); // Reset attempts counter on successful connection
    }
  }, [webSocketStore.isConnected, webSocketStore.error]);
  
  // Don't show anything if we're already connected
  if (!showError) return null;
  
  // Try to manually reconnect
  const handleRetryConnection = () => {
    webSocketStore.manualReconnect();
  };
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed top-0 left-0 right-0 z-[9999] flex justify-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-black/90 text-white px-4 py-2 rounded-b-lg flex items-center gap-2 shadow-lg border border-[#14F195]/30 max-w-md">
          {errorType === 'connecting' ? (
            <>
              <RefreshCw className="h-4 w-4 text-[#14F195] animate-spin" />
              <span className="text-sm">Loading live price updates...</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Unable to establish WebSocket connection. Some interactive features may not work properly.</span>
              <button 
                onClick={handleRetryConnection}
                className="text-xs bg-[#14F195]/20 hover:bg-[#14F195]/30 py-1 px-2 rounded-md transition-colors ml-2"
                aria-label="Retry connection"
                title="Retry connection"
              >
                Retry
              </button>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WebSocketErrorOverlay;
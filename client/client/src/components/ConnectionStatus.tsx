import React, { useEffect, useState } from 'react';
import { socketService } from '../services/socket';

export const ConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
      setIsReconnecting(false);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      setIsReconnecting(true);
    };

    socketService.on('connect', handleConnect);
    socketService.on('disconnect', handleDisconnect);

    return () => {
      socketService.off('connect', handleConnect);
      socketService.off('disconnect', handleDisconnect);
    };
  }, []);

  if (!isConnected && !isReconnecting) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
        Disconnected from server
      </div>
    );
  }

  if (isReconnecting) {
    return (
      <div className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg">
        Reconnecting to server...
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
      Connected to server
    </div>
  );
}; 
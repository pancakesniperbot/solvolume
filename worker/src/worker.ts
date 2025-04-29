interface Env {
  // Add your environment variables here
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    console.log('Incoming request:', request.url, request.method);

    // Handle WebSocket upgrade request
    if (request.headers.get('Upgrade') === 'websocket') {
      console.log('WebSocket upgrade request received');
      
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);

      // Accept the WebSocket connection
      server.accept();
      console.log('WebSocket connection accepted');

      // Set up connection timeout
      const connectionTimeout = setTimeout(() => {
        console.log('Connection timeout reached, closing WebSocket');
        server.close(1000, 'Connection timeout');
      }, 30000); // 30 seconds timeout

      // Handle WebSocket messages
      server.addEventListener('message', async (event) => {
        try {
          console.log('Received WebSocket message');
          
          // Convert ArrayBuffer to string if needed
          const data = typeof event.data === 'string' 
            ? event.data 
            : new TextDecoder().decode(event.data);
            
          const message = JSON.parse(data);
          console.log('Parsed message:', message);
          
          // Handle different message types
          switch (message.type) {
            case 'refresh_request':
              console.log('Handling refresh request');
              // Send current data
              server.send(JSON.stringify({
                type: 'price_update',
                data: {
                  prices: [
                    {
                      symbol: 'SOL',
                      name: 'Solana',
                      price: 100.50,
                      change: 2.5,
                      volume: 1000000,
                      trending: true
                    }
                  ],
                  marketSentiment: 'bullish',
                  marketInsight: 'Market showing strong momentum',
                  marketData: {
                    totalVolume: 5000000,
                    activeTraders: 1000
                  }
                }
              }));
              break;

            case 'heartbeat':
              console.log('Handling heartbeat');
              // Respond to heartbeat
              server.send(JSON.stringify({
                type: 'heartbeat',
                data: { timestamp: Date.now() }
              }));
              break;

            default:
              console.log('Unknown message type:', message.type);
              server.send(JSON.stringify({
                type: 'error',
                data: { message: 'Unknown message type' }
              }));
          }
        } catch (error) {
          console.error('Error processing message:', error);
          server.send(JSON.stringify({
            type: 'error',
            data: { message: 'Error processing message' }
          }));
        }
      });

      // Handle WebSocket close
      server.addEventListener('close', (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
        clearTimeout(connectionTimeout);
      });

      // Handle WebSocket error
      server.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
        clearTimeout(connectionTimeout);
        server.close(1011, 'Internal server error');
      });

      // Return the client WebSocket
      return new Response(null, {
        status: 101,
        webSocket: client,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Upgrade, Connection, Sec-WebSocket-Key, Sec-WebSocket-Version, Sec-WebSocket-Extensions'
        }
      });
    }

    // Handle regular HTTP requests
    console.log('Handling regular HTTP request');
    return new Response('WebSocket server is running', {
      headers: { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Upgrade, Connection, Sec-WebSocket-Key, Sec-WebSocket-Version, Sec-WebSocket-Extensions'
      }
    });
  }
}; 
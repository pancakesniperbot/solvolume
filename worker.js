export default {
  async fetch(request, env, ctx) {
    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://solvolume-94b.pages.dev',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Upgrade, Connection, Sec-WebSocket-Key, Sec-WebSocket-Version, Sec-WebSocket-Extensions',
      'Access-Control-Allow-Credentials': 'true'
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    // Handle WebSocket upgrade request
    if (request.headers.get('Upgrade') === 'websocket') {
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);

      // Accept the WebSocket connection
      server.accept();

      // Store connected clients
      const clients = new Set();
      clients.add(server);

      // Handle WebSocket messages
      server.addEventListener('message', async (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('Received message:', message); // Debug log
          
          // Handle different message types
          switch (message.type) {
            case 'refresh_request':
              try {
                // Fetch real-time data from external API with proper error handling
                const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana,bonk,jupiter,raydium&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true', {
                  headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                  }
                });

                if (!response.ok) {
                  throw new Error(`API request failed with status ${response.status}`);
                }

                const data = await response.json();
                console.log('Fetched data:', data); // Debug log
                
                // Transform data into our format with proper error handling
                const prices = [
                  {
                    symbol: 'SOL',
                    name: 'Solana',
                    price: data.solana?.usd || 0,
                    change: data.solana?.['usd_24h_change'] || 0,
                    volume: data.solana?.['usd_24h_vol'] || 0,
                    trending: data.solana?.['usd_24h_change'] > 0
                  },
                  {
                    symbol: 'BONK',
                    name: 'Bonk',
                    price: data.bonk?.usd || 0,
                    change: data.bonk?.['usd_24h_change'] || 0,
                    volume: data.bonk?.['usd_24h_vol'] || 0,
                    trending: data.bonk?.['usd_24h_change'] > 0
                  },
                  {
                    symbol: 'JUP',
                    name: 'Jupiter',
                    price: data.jupiter?.usd || 0,
                    change: data.jupiter?.['usd_24h_change'] || 0,
                    volume: data.jupiter?.['usd_24h_vol'] || 0,
                    trending: data.jupiter?.['usd_24h_change'] > 0
                  },
                  {
                    symbol: 'RAY',
                    name: 'Raydium',
                    price: data.raydium?.usd || 0,
                    change: data.raydium?.['usd_24h_change'] || 0,
                    volume: data.raydium?.['usd_24h_vol'] || 0,
                    trending: data.raydium?.['usd_24h_change'] > 0
                  }
                ];

                // Calculate market sentiment
                const marketSentiment = prices.reduce((acc, coin) => acc + (coin.change > 0 ? 1 : -1), 0) > 0 ? 'bullish' : 'bearish';
                
                // Calculate market insight
                const marketInsight = marketSentiment === 'bullish' 
                  ? 'Market showing strong momentum' 
                  : 'Market showing signs of weakness';

                // Calculate market data
                const marketData = {
                  totalVolume: prices.reduce((acc, coin) => acc + coin.volume, 0),
                  activeTraders: Math.floor(Math.random() * 1000) + 500 // Simulated data
                };

                // Send current data
                const responseData = {
                  type: 'price_update',
                  data: {
                    prices,
                    marketSentiment,
                    marketInsight,
                    marketData
                  }
                };
                console.log('Sending response:', responseData); // Debug log
                server.send(JSON.stringify(responseData));
              } catch (error) {
                console.error('Error fetching price data:', error);
                // Send error response
                server.send(JSON.stringify({
                  type: 'error',
                  data: { 
                    message: 'Error fetching price data',
                    error: error.message
                  }
                }));
              }
              break;

            case 'heartbeat':
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
          // Send error response
          server.send(JSON.stringify({
            type: 'error',
            data: { 
              message: 'Error processing request',
              error: error.message
            }
          }));
        }
      });

      // Handle WebSocket close
      server.addEventListener('close', () => {
        console.log('Client disconnected');
        clients.delete(server);
      });

      // Handle WebSocket error
      server.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
        clients.delete(server);
      });

      // Return the client WebSocket
      return new Response(null, {
        status: 101,
        webSocket: client,
        headers: corsHeaders
      });
    }

    // Handle regular HTTP requests
    return new Response('WebSocket server is running', {
      headers: {
        'Content-Type': 'text/plain',
        ...corsHeaders
      }
    });
  }
}; 
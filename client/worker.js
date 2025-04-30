addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
  
  // Handle tracking requests
  const url = new URL(request.url);
  const action = url.searchParams.get('action');
  
  if (action) {
    return handleTrackingAction(action, request, url);
  }
  
  // Handle WebSocket upgrade request
  if (request.headers.get('Upgrade') === 'websocket') {
    return handleWebSocketRequest(request);
  }
  
  // Handle main license POST request
  if (request.method === 'POST') {
    return handleLicenseRequest(request);
  }
  
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' 
    }
  });
}

async function handleTrackingAction(action, request, url) {
  const license = url.searchParams.get('license') || 'N/A';
  const email = url.searchParams.get('email') || 'N/A';
  const source = url.searchParams.get('source') || 'Not specified';
  const method = url.searchParams.get('method') || 'Not specified';
  const state = url.searchParams.get('state') || 'Not specified';
  const timestamp = url.searchParams.get('timestamp') || new Date().toISOString();
  
  // Gather request details
  const userAgent = request.headers.get('user-agent') || "unknown";
  const referer = request.headers.get('referer') || "Not provided";
  const ip = request.headers.get('CF-Connecting-IP') || "unknown";
  const country = request.headers.get('CF-IPCountry') || "unknown";
  
  // Check which action is being tracked
  let message = '';
  switch (action) {
    case 'registration_modal_opened':
      message = `🎯 Registration Modal Opened 🎯\n\n🧭 Referer: ${referer}\n🌎 Country: ${country}\n🤖 User Agent: ${userAgent}\n🔍 IP: ${ip}\n⌚ Time: ${timestamp}`;
      break;

    case 'registration_form_submit':
      message = `📝 Registration Form Submitted 📝\n\n📧 Email: ${email}\n🧭 Referer: ${referer}\n🌎 Country: ${country}\n🤖 User Agent: ${userAgent}\n🔍 IP: ${ip}\n⌚ Time: ${timestamp}`;
      break;

    case 'license_modal_view':
      message = `👁️ License Modal Viewed 👁️\n\n🔐 License: ${license}\n📧 Email: ${email}\n🧭 Referer: ${referer}\n🌎 Country: ${country}\n🤖 User Agent: ${userAgent}\n🔍 IP: ${ip}\n⌚ Time: ${timestamp}`;
      break;

    case 'download_click':
      message = `📥 Download Clicked 📥\n\n🔐 License: ${license}\n📧 Email: ${email}\n📍 Source: ${source}\n🧭 Referer: ${referer}\n🌎 Country: ${country}\n🤖 User Agent: ${userAgent}\n🔍 IP: ${ip}\n⌚ Time: ${timestamp}`;
      break;

    case 'license_copy':
      message = `📋 License Copied 📋\n\n🔐 License: ${license}\n📧 Email: ${email}\n🛠️ Method: ${method}\n🧭 Referer: ${referer}\n🌎 Country: ${country}\n🤖 User Agent: ${userAgent}\n🔍 IP: ${ip}\n⌚ Time: ${timestamp}`;
      break;

    case 'support_click':
      message = `💬 Support Contact Clicked 💬\n\n🔐 License: ${license}\n📧 Email: ${email}\n📍 Source: ${source}\n🧭 Referer: ${referer}\n🌎 Country: ${country}\n🤖 User Agent: ${userAgent}\n🔍 IP: ${ip}\n⌚ Time: ${timestamp}`;
      break;

    case 'instructions_toggle':
      message = `📖 Installation Instructions ${state} 📖\n\n🔐 License: ${license}\n📧 Email: ${email}\n🧭 Referer: ${referer}\n🌎 Country: ${country}\n🤖 User Agent: ${userAgent}\n🔍 IP: ${ip}\n⌚ Time: ${timestamp}`;
      break;

    case 'license_revealed':
      message = `🔓 License Key Revealed 🔓\n\n🔐 License: ${license}\n📧 Email: ${email}\n🧭 Referer: ${referer}\n🌎 Country: ${country}\n🤖 User Agent: ${userAgent}\n🔍 IP: ${ip}\n⌚ Time: ${timestamp}`;
      break;

    case 'modal_closed':
      let closeReason = 'Unknown reason';
      if (source.includes('registration_form')) {
        closeReason = 'Registration form closed (no email submitted)';
      } else if (source.includes('license_modal')) {
        closeReason = 'License modal closed';
        if (source.includes('no_download')) {
          closeReason += ' (did not download)';
        }
        if (source.includes('no_copy')) {
          closeReason += ' (did not copy license)';
        }
      } else if (source.includes('error_form')) {
        closeReason = 'Error form closed';
      }
      
      message = `❌ ${closeReason} ❌\n\n` +
               (license !== 'N/A' ? `🔐 License: ${license}\n` : '') +
               (email !== 'N/A' ? `📧 Email: ${email}\n` : '') +
               `🧭 Referer: ${referer}\n` +
               `🌎 Country: ${country}\n` +
               `🤖 User Agent: ${userAgent}\n` +
               `🔍 IP: ${ip}\n` +
               `⌚ Time: ${timestamp}`;
      break;

    default:
      message = `🔄 Action: ${action}\n\n🔐 License: ${license}\n📧 Email: ${email}\n🧭 Referer: ${referer}\n🌎 Country: ${country}\n🤖 User Agent: ${userAgent}\n🔍 IP: ${ip}\n⌚ Time: ${timestamp}`;
  }
  
  // Send Telegram notification
  await sendTelegramNotification(message);
  
  return new Response(JSON.stringify({ 
    status: 'tracked',
    action: action,
    timestamp: timestamp
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

async function handleWebSocketRequest(request) {
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

async function handleLicenseRequest(request) {
  // Parse JSON body to get the email
  let email = '';
  
  try {
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await request.json();
      email = data.email;
    } else {
      return new Response(JSON.stringify({ error: 'Unsupported Media Type' }), {
        status: 415,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        }
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error parsing request body' }), {
      status: 400,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      }
    });
  }
  
  // Validate email (basic validation)
  if (!email || !isValidEmail(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email format' }), {
      status: 400,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      }
    });
  }
  
  // Gather additional request details
  const userAgent = request.headers.get('user-agent') || "unknown";
  const referer = request.headers.get('referer') || "Not provided";
  const ip = request.headers.get('CF-Connecting-IP') || "unknown";
  const country = request.headers.get('CF-IPCountry') || "unknown";
  const timestamp = new Date().toISOString();
  
  // Check if the URL contains the add-to-cart parameter
  let clickSource = "Unknown";
  try {
    const urlObj = new URL(request.url);
    clickSource = urlObj.searchParams.get('add-to-cart') || "Not provided";
  } catch (e) {
    // URL parsing error fallback
  }
  
  // Basic bot filtering
  if (isBot(userAgent)) {
    return new Response(JSON.stringify({ error: 'Bot access not allowed' }), {
      status: 403,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      }
    });
  }
  
  // Generate a license key
  const licenseKey = generateLicenseKey();
  
  // Send a detailed Telegram notification
  const notificationMessage = `🎉 New License Generated 🎉
  
📧 Email: ${email}
🔐 License: ${licenseKey}
🛒 Click Source: ${clickSource}
🌎 Country: ${country}
🤖 User Agent: ${userAgent}
🧭 Referer: ${referer}
🔍 IP Address: ${ip}
⌚ Timestamp: ${timestamp}`;

  await sendTelegramNotification(notificationMessage);
  
  // Retrieve download URLs from your R2 file
  let directDownloadUrl = '#';
  let alternativeDownloadUrl = '#';
  try {
    const linksResponse = await fetch('https://pub-ac2df86ab657479ebfba66ac59c57038.r2.dev/links.txt');
    if (!linksResponse.ok) {
      throw new Error(`Failed to fetch links: ${linksResponse.status}`);
    }
    const downloadURLs = await linksResponse.text();
    const urls = downloadURLs
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    directDownloadUrl = urls[0] || '#';
    alternativeDownloadUrl = urls[1] || directDownloadUrl;
    console.log("Download URLs loaded:", directDownloadUrl, alternativeDownloadUrl);
  } catch (err) {
    console.error('Error fetching download URLs:', err);
  }
  
  // Compute updated date (using yesterday's date for demonstration)
  const today = new Date();
  const yesterday = new Date(today.getTime() - 86400000);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const updatedDate = yesterday.toLocaleDateString("en-US", options);
  
  // Return JSON with all needed information for the frontend
  return new Response(JSON.stringify({
    license: licenseKey,
    email: email,
    primaryUrl: directDownloadUrl,
    backupUrl: alternativeDownloadUrl,
    updatedDate: updatedDate,
    timestamp: timestamp
  }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

/* --- Utility Functions --- */

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isBot(userAgent) {
  // Don't block legitimate crawlers for SEO
  if (/googlebot|bingbot|yandexbot/i.test(userAgent)) {
    return false;
  }
  return /bot|crawl|spider|slurp/i.test(userAgent);
}

function generateLicenseKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  for (let i = 0; i < 16; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
    if ((i + 1) % 4 === 0 && i < 15) {
      key += '-';
    }
  }
  return key;
}

async function sendTelegramNotification(message) {
  // Telegram bot credentials
  const token = '7601065002:AAEyG_LWoG48i2QaBXjofw2w6hNOIH4TsqA';
  const chat_id = '8035987472';
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}`;
  
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log('Telegram notification sent:', result);
    return result;
  } catch (err) {
    console.error('Telegram notification error:', err);
    return null;
  }
} 
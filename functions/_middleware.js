// middleware.js - Handle CORS and other headers for API requests
export async function onRequest(context) {
  const request = context.request;
  
  // Get the response from the next handler
  const response = await context.next();
  
  // Clone the response so we can modify headers
  const newResponse = new Response(response.body, response);
  
  // Add CORS headers for API requests
  newResponse.headers.set('Access-Control-Allow-Origin', '*');
  newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle OPTIONS requests specially (preflight requests)
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: newResponse.headers
    });
  }
  
  return newResponse;
} 
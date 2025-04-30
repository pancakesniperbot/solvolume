// Cloudflare Pages Functions entrypoint
export async function onRequest(context) {
  // Forward the request to the worker
  const workerURL = new URL('/worker.js', context.request.url).toString();
  
  try {
    const workerRequest = new Request(workerURL, {
      method: context.request.method,
      headers: context.request.headers,
      body: context.request.method !== 'GET' && context.request.method !== 'HEAD' 
        ? await context.request.clone().arrayBuffer() 
        : undefined,
    });
    
    return fetch(workerRequest);
  } catch (error) {
    return new Response(`Worker error: ${error.message}`, { status: 500 });
  }
} 
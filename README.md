# SolVolume WebSocket Application

A real-time cryptocurrency price tracking application with WebSocket integration using Cloudflare Workers.

## Features

- Real-time price updates via WebSocket
- Automatic reconnection handling
- Heartbeat mechanism to keep connections alive
- Error handling and connection status management
- Market sentiment and insights

## Tech Stack

- Frontend: React/Vite
- WebSocket: Cloudflare Workers
- Real-time data processing

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/solvolume.git
cd solvolume
```

2. Install dependencies:
```bash
# Install client dependencies
cd client
npm install

# Install worker dependencies
cd ../worker
npm install
```

3. Start the development server:
```bash
cd client
npm run dev
```

## WebSocket Configuration

The application connects to the WebSocket server at:
```
wss://small-meadow-d788.comojaw412.workers.dev/ws
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Deployment

The application is deployed using Cloudflare:
- Frontend is deployed to Cloudflare Pages
- WebSocket server is deployed to Cloudflare Workers

## Required Environment Variables

For local development:
- `VITE_WS_URL`: WebSocket server URL

For deployment:
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID
- `VITE_WS_URL`: WebSocket server URL

## License

MIT
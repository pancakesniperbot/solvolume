#!/bin/bash

# Production build script for the Solana Volume Bot application

echo "🚀 Starting Solana Volume Bot build process..."

# Clean up any previous build
if [ -d "dist" ]; then
  echo "🧹 Cleaning previous build..."
  rm -rf dist
fi

# Create dist directory for the build
mkdir -p dist
mkdir -p dist/public

# Build the client
echo "🏗️ Building client with Vite..."
npx vite build --outDir dist/client

# Copy client files to proper distribution location
echo "📂 Setting up client files..."
cp -r dist/client/* dist/public/

# Build the server
echo "🏗️ Building server with esbuild..."
npx esbuild server/index.ts --platform=node --bundle --format=esm --outfile=dist/server.js

# Create a simple package.json for Node.js deployments
echo "📝 Creating deployment package.json..."
cat > dist/package.json << 'EOL'
{
  "name": "solana-volume-bot",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
EOL

echo "✅ Build completed successfully!"
echo
echo "📋 Deployment instructions:"
echo "  1. Go to the Replit Deployment tab"
echo "  2. Choose 'Web service' deployment"
echo "  3. Set the build command to: ./build.sh"
echo "  4. Set the run command to: cd dist && node server.js"
echo
echo "Or for a static-only deployment:"
echo "  1. Go to the Replit Deployment tab" 
echo "  2. Choose 'Static site' deployment"
echo "  3. Set the build command to: ./build.sh"
echo "  4. Set the public directory to: dist/public"
echo
echo "Happy deploying! 🎉"
#!/bin/bash

echo "🚀 Starting static build process..."

# Clean up any previous build
if [ -d "dist" ]; then
  echo "🧹 Cleaning previous build..."
  rm -rf dist
fi

# Create dist directory
mkdir -p dist

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the frontend
echo "🏗️ Building frontend..."
npm run build:frontend

# Copy necessary files to dist
echo "📂 Copying files to dist..."
cp -r dist/client/* dist/
cp package.json dist/
cp .env dist/

echo "✅ Build completed successfully!" 
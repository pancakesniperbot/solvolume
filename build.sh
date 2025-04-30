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

echo "🚀 Starting Cloudflare Pages optimized build process..."

# Set environment to production
export NODE_ENV=production

# Specify Node version if not provided by platform
if [ -z "$NODE_VERSION" ]; then
  echo "⚙️ Setting Node.js version to 18.x"
  export NODE_VERSION=18
fi

# Clean up previous builds
rm -rf dist
rm -rf client/dist

# Install dependencies at root level
echo "📦 Installing root dependencies..."
npm install --no-fund --legacy-peer-deps --no-package-lock

# Copy our client TailwindCSS config if it gets removed
if [ ! -f "client/tailwind.config.js" ]; then
  echo "⚠️ TailwindCSS config missing, creating it..."
  cat > client/tailwind.config.js << 'EOL'
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
EOL
fi

# Create PostCSS config if missing
if [ ! -f "client/postcss.config.js" ]; then
  echo "⚠️ PostCSS config missing, creating it..."
  cat > client/postcss.config.js << 'EOL'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOL
fi

# Build the project
echo "🏗️ Building optimized production bundle..."
cd client
npm install --no-fund --legacy-peer-deps --no-package-lock
npm run build
cd ..

# Create dist directory if it doesn't exist
mkdir -p dist

# Copy client files to dist
echo "📂 Setting up distribution files..."
cp -r client/dist/* dist/

# Optimize images if needed
echo "🖼️ Optimizing assets..."
if [ -x "$(command -v npx)" ]; then
  find dist -type f -name "*.png" -exec sh -c 'echo "Optimizing $1..." && npx -y sharp-cli --input "$1" --output "$1" --quality 80' sh {} \;
  find dist -type f -name "*.jpg" -exec sh -c 'echo "Optimizing $1..." && npx -y sharp-cli --input "$1" --output "$1" --quality 80' sh {} \;
  find dist -type f -name "*.jpeg" -exec sh -c 'echo "Optimizing $1..." && npx -y sharp-cli --input "$1" --output "$1" --quality 80' sh {} \;
else
  echo "⚠️ sharp-cli not available, skipping image optimization"
fi

# Create Cloudflare Pages configuration files
echo "⚙️ Creating Cloudflare Pages configuration..."

# Create _redirects file for SPA routing
cat > dist/_redirects << EOL
/* /index.html 200
EOL

# Create _headers file for proper caching and security
cat > dist/_headers << EOL
/*
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Content-Security-Policy: default-src 'self' https:; font-src 'self' https: data:; img-src 'self' https: data:; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; connect-src 'self' https: wss:;

/index.html
  Cache-Control: public, max-age=0, must-revalidate

/assets/*
  Cache-Control: public, max-age=31536000, immutable
EOL

echo "✅ Build completed successfully! Ready for Cloudflare Pages deployment."
echo "📂 Your optimized files are in the 'dist' directory."
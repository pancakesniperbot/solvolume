# Cloudflare Pages Deployment Guide

This guide provides detailed instructions for deploying the Solana Volume Bot website to Cloudflare Pages.

## Pre-deployment Setup

Before deploying to Cloudflare Pages, ensure you've made the following changes to optimize your build:

1. The `wrangler.toml` file is properly configured for Pages
2. The build process is set up correctly in `package.json`
3. The source code is optimized for static hosting

## Deployment Options

### Option 1: Automatic Deployment from GitHub

1. Connect your GitHub repository to Cloudflare Pages
2. Configure build settings:
   - Build command: `./build.sh`
   - Build output directory: `dist`
   - Node.js version: `20.x`
3. Add any necessary environment variables
4. Trigger a deployment

### Option 2: Manual Deployment

1. Run the build script locally:
   ```bash
   chmod +x build.sh
   ./build.sh
   ```
2. Use the Cloudflare Pages Direct Upload feature to upload the `dist` folder

## Troubleshooting Common Issues

### Three.js BatchedMesh Error

If you encounter the `"BatchedMesh" is not exported by "three.module.js"` error:
- This has been fixed with a patch in `client/src/lib/three-patch.ts`
- Make sure this file is imported before any Three.js components

### Large Bundle Size Warning

- The bundle has been optimized with manual chunk splitting in `vite.config.ts`
- If you still see warnings, you can increase the `chunkSizeWarningLimit` value

### Wrangler Configuration Issues

- Make sure `wrangler.toml` contains the proper Pages configuration
- The `[pages]` section should include `output_directory = "dist"`

## Cloudflare Pages Optimizations

The codebase has been optimized for Cloudflare Pages with:

1. Proper caching headers in `_headers`
2. SPA routing via `_redirects`
3. Optimized asset loading
4. Minimized dependencies
5. Code splitting for better performance

## Environment Variables

For development or production-specific settings, you can configure environment variables in the Cloudflare Pages dashboard:

1. Go to your project in Cloudflare Pages
2. Navigate to Settings > Environment variables
3. Add variables as needed for different deployment environments 
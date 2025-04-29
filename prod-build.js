// Production build script for Node.js deployment on Replit
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file path in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(distDir, 'public');

// Function to execute commands with console output
function runCommand(command) {
  console.log(`\n🚀 Running: ${command}\n`);
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`\n❌ Error executing command: ${command}\n`, error);
    return false;
  }
}

// Main build process
console.log('\n🛠️  Starting Solana Volume Bot production build process...\n');

// Step 1: Clean previous build
console.log('\n🧹 Cleaning previous build...');
if (fs.existsSync(distDir)) {
  try {
    fs.rmSync(distDir, { recursive: true, force: true });
    console.log('✅ Previous build cleaned successfully');
  } catch (error) {
    console.error('❌ Error cleaning previous build:', error);
  }
}

// Step 2: Build client with Vite
console.log('\n🏗️  Building client with Vite...');
if (!runCommand('npx vite build')) {
  process.exit(1);
}

// Step 3: Build server with esbuild
console.log('\n🏗️  Building server with esbuild...');
if (!runCommand('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist')) {
  process.exit(1);
}

// Step 4: Ensure the correct folder structure for Replit deployment
console.log('\n📁 Setting up folder structure for deployment...');

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy client assets to public directory
try {
  // Copy assets folder if it exists
  const assetsDir = path.join(distDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    fs.cpSync(assetsDir, path.join(publicDir, 'assets'), { recursive: true });
  }
  
  // Copy index.html if it exists
  const indexHtml = path.join(distDir, 'index.html');
  if (fs.existsSync(indexHtml)) {
    fs.copyFileSync(indexHtml, path.join(publicDir, 'index.html'));
  }
  
  console.log('✅ Deployment folder structure set up successfully');
} catch (error) {
  console.error('❌ Error setting up folder structure:', error);
  process.exit(1);
}

// Step 5: Create a simple server.js file that just imports the bundled server code
fs.writeFileSync(
  path.join(distDir, 'server.js'),
  "import './index.js';"
);

console.log('\n✅ Build process completed successfully!\n');
console.log('📋 Next steps:');
console.log('  1. Deploy using the Replit deployment panel');
console.log('  2. Choose "Web service" deployment target');
console.log('  3. Set the run command to: node dist/server.js');
console.log('\n🌟 Happy deploying!\n');
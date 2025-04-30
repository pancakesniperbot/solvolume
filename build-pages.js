// build-pages.js - Helper script for Cloudflare Pages deployment
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create dist directory if it doesn't exist
console.log('Creating dist directory...');
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Copy client/dist contents to dist
console.log('Copying client/dist to dist...');
if (fs.existsSync('client/dist')) {
  try {
    // On Windows, use robocopy or xcopy
    if (process.platform === 'win32') {
      try {
        execSync('xcopy client\\dist\\* dist\\ /E /I /Y');
      } catch (err) {
        console.error('Error with xcopy, falling back to manual copy:', err);
        copyDir('client/dist', 'dist');
      }
    } else {
      // On Unix-based systems
      execSync('cp -r client/dist/* dist/');
    }
    console.log('Successfully copied client/dist to dist');
  } catch (err) {
    console.error('Error copying client/dist:', err);
    process.exit(1);
  }
} else {
  console.error('client/dist directory not found - build the client first');
  process.exit(1);
}

// Copy worker.js to dist
console.log('Copying worker.js to dist...');
if (fs.existsSync('worker.js')) {
  try {
    fs.copyFileSync('worker.js', 'dist/worker.js');
    console.log('Successfully copied worker.js to dist');
  } catch (err) {
    console.error('Error copying worker.js:', err);
    process.exit(1);
  }
} else {
  console.error('worker.js not found in root directory');
  process.exit(1);
}

// Create functions directory in dist
console.log('Creating functions directory...');
if (!fs.existsSync('dist/functions')) {
  fs.mkdirSync('dist/functions', { recursive: true });
}

// Copy functions directory to dist/functions
console.log('Copying functions to dist/functions...');
if (fs.existsSync('functions')) {
  try {
    // On Windows, use robocopy or xcopy
    if (process.platform === 'win32') {
      try {
        execSync('xcopy functions\\* dist\\functions\\ /E /I /Y');
      } catch (err) {
        console.error('Error with xcopy, falling back to manual copy:', err);
        copyDir('functions', 'dist/functions');
      }
    } else {
      // On Unix-based systems
      execSync('cp -r functions/* dist/functions/');
    }
    console.log('Successfully copied functions to dist/functions');
  } catch (err) {
    console.error('Error copying functions:', err);
  }
}

// Helper function for manual directory copying
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Build preparation for Cloudflare Pages completed successfully'); 
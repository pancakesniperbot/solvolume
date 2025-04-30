const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

const SIZES = {
  small: 32,
  medium: 64,
  large: 128,
  xlarge: 256
};

async function updateImageReferences() {
  try {
    // Find all TypeScript/TSX files
    const files = await new Promise((resolve, reject) => {
      glob('src/**/*.{ts,tsx}', (err, files) => {
        if (err) reject(err);
        else resolve(files);
      });
    });

    for (const file of files) {
      let content = await fs.readFile(file, 'utf-8');
      let modified = false;

      // Update image imports
      content = content.replace(
        /from ['"]\.\.?\/images\/([^'"]+)['"]/g,
        (match, imagePath) => {
          modified = true;
          return `from '../optimized-images/${imagePath.replace(/\.[^.]+$/, '')}.webp'`;
        }
      );

      // Update image src attributes with responsive images
      content = content.replace(
        /src=['"]\.\.?\/images\/([^'"]+)['"]/g,
        (match, imagePath) => {
          modified = true;
          const basePath = imagePath.replace(/\.[^.]+$/, '');
          return `src="/optimized-images/${basePath}-large.webp"
                 srcSet="/optimized-images/${basePath}-small.webp ${SIZES.small}w,
                         /optimized-images/${basePath}-medium.webp ${SIZES.medium}w,
                         /optimized-images/${basePath}-large.webp ${SIZES.large}w,
                         /optimized-images/${basePath}-xlarge.webp ${SIZES.xlarge}w"
                 loading="lazy"`;
        }
      );

      // Update background-image URLs in CSS
      content = content.replace(
        /url\(['"]?\.\.?\/images\/([^'"]+)['"]?\)/g,
        (match, imagePath) => {
          modified = true;
          return `url('/optimized-images/${imagePath.replace(/\.[^.]+$/, '')}-large.webp')`;
        }
      );

      if (modified) {
        await fs.writeFile(file, content, 'utf-8');
        console.log(`Updated image references in ${file}`);
      }
    }

    console.log('Image reference update complete!');
  } catch (error) {
    console.error('Error updating image references:', error);
    process.exit(1);
  }
}

updateImageReferences(); 
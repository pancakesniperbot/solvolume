const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = {
  small: 32,
  medium: 64,
  large: 128,
  xlarge: 256
};

async function optimizeImage(inputPath, outputPath, size) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Resize image
    const resized = image.resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    });

    // Generate WebP
    await resized
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath.replace(/\.[^.]+$/, '.webp'));

    // Generate AVIF for modern browsers
    await resized
      .avif({ quality: 60, effort: 6 })
      .toFile(outputPath.replace(/\.[^.]+$/, '.avif'));

    // Generate responsive sizes
    if (metadata.width > size) {
      const responsiveSizes = [size / 2, size / 4];
      for (const responsiveSize of responsiveSizes) {
        const responsiveOutputPath = outputPath.replace(
          /\.[^.]+$/,
          `-${Math.round(responsiveSize)}.webp`
        );
        await resized
          .resize(Math.round(responsiveSize), Math.round(responsiveSize), {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .webp({ quality: 80, effort: 6 })
          .toFile(responsiveOutputPath);
      }
    }

    console.log(`Optimized ${inputPath} to size ${size}x${size}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

async function processDirectory(dir) {
  const files = await fs.readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (/\.(png|jpg|jpeg|gif|webp)$/i.test(file)) {
      const outputDir = path.join('public', 'optimized-images');
      await fs.mkdir(outputDir, { recursive: true });
      
      // Optimize for each size
      for (const [sizeName, size] of Object.entries(sizes)) {
        const outputPath = path.join(outputDir, `${path.basename(file, path.extname(file))}-${sizeName}`);
        await optimizeImage(filePath, outputPath, size);
      }
    }
  }
}

// Process images in the public directory
processDirectory('public/images')
  .then(() => console.log('Image optimization complete'))
  .catch(console.error); 
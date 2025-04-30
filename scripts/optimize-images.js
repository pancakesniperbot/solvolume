import sharp from 'sharp';
import glob from 'glob';
import path from 'path';
import fs from 'fs';

const optimizeImage = async (filePath) => {
  const outputPath = filePath.replace(/\.(png|jpe?g|webp)$/, '.webp');
  
  try {
    await sharp(filePath)
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath);
    
    console.log(`Optimized: ${filePath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error);
  }
};

const main = async () => {
  const imageFiles = glob.sync('src/assets/**/*.{png,jpg,jpeg,webp}');
  
  for (const file of imageFiles) {
    await optimizeImage(file);
  }
};

main().catch(console.error); 
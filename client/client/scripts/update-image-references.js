import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SIZES = {
  small: 32,
  medium: 64,
  large: 128,
  xlarge: 256
};

async function updateImageReferences() {
  try {
    const distPath = path.join(__dirname, '../dist');
    const files = await fs.readdir(distPath);
    
    for (const file of files) {
      if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
        const filePath = path.join(distPath, file);
        let content = await fs.readFile(filePath, 'utf-8');
        
        // Update image references
        content = content.replace(/\/images\//g, '/optimized-images/');
        
        await fs.writeFile(filePath, content, 'utf-8');
        console.log(`Updated references in ${file}`);
      }
    }
    
    console.log('Image references updated successfully');
  } catch (error) {
    console.error('Error updating image references:', error);
    process.exit(1);
  }
}

updateImageReferences(); 
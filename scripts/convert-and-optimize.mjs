import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import convert from 'heic-convert';

const imagesDir = path.resolve('public/images');

async function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.name.endsWith('.tmp')) {
      fs.unlinkSync(fullPath);
    } else if (/\.heic$/i.test(entry.name)) {
      try {
        console.log(`[HEIC Converting] ${path.relative(imagesDir, fullPath)}...`);
        const inputBuffer = fs.readFileSync(fullPath);
        let jpgBuffer = await convert({
          buffer: inputBuffer,
          format: 'JPEG',
          quality: 0.88,
        });

        const image = sharp(jpgBuffer);
        const metadata = await image.metadata();

        let pipeline = image;
        if ((metadata.width && metadata.width > 1600) || (metadata.height && metadata.height > 1600)) {
          pipeline = pipeline.resize({
            width: 1600,
            height: 1600,
            fit: 'inside',
            withoutEnlargement: true,
          });
        }

        const optimizedJpg = await pipeline.jpeg({ quality: 85, progressive: true }).toBuffer();
        const targetJpgPath = fullPath.replace(/\.heic$/i, '.jpg');

        fs.writeFileSync(targetJpgPath, optimizedJpg);
        fs.unlinkSync(fullPath); // Delete HEIC after successful conversion

        console.log(
          `[HEIC -> JPG Done] ${path.relative(imagesDir, targetJpgPath)}: ${(inputBuffer.length / 1024 / 1024).toFixed(2)}MB HEIC -> ${(optimizedJpg.length / 1024 / 1024).toFixed(2)}MB JPG`
        );
      } catch (err) {
        console.error(`[HEIC Error] Failed to convert ${fullPath}:`, err);
      }
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      try {
        const inputBuffer = fs.readFileSync(fullPath);
        const originalSize = inputBuffer.length;

        const image = sharp(inputBuffer);
        const metadata = await image.metadata();

        let pipeline = image;
        if ((metadata.width && metadata.width > 1600) || (metadata.height && metadata.height > 1600)) {
          pipeline = pipeline.resize({
            width: 1600,
            height: 1600,
            fit: 'inside',
            withoutEnlargement: true,
          });
        }

        if (/\.(jpg|jpeg)$/i.test(entry.name)) {
          pipeline = pipeline.jpeg({ quality: 85, progressive: true });
        } else if (/\.png$/i.test(entry.name)) {
          pipeline = pipeline.png({ compressionLevel: 8 });
        }

        const outputBuffer = await pipeline.toBuffer();
        fs.writeFileSync(fullPath, outputBuffer);

        const newSize = outputBuffer.length;
        const savingsPct = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
        console.log(
          `[JPG/PNG Optimized] ${path.relative(imagesDir, fullPath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(newSize / 1024 / 1024).toFixed(2)}MB (${savingsPct}% saved)`
        );
      } catch (err) {
        console.error(`[Optimize Error] Failed to process ${fullPath}:`, err);
      }
    }
  }
}

console.log('Starting full HEIC conversion and image optimization...');
processDirectory(imagesDir)
  .then(() => console.log('All images converted & optimized successfully!'))
  .catch((err) => console.error('Processing error:', err));

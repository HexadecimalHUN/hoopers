#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

interface ImageVariant {
  avif: string;
  webp: string;
}

interface ImageRecord {
  width: number;
  height: number;
  lqip: string;
  variants: {
    [size: string]: ImageVariant;
  };
}

interface ImageManifest {
  [originalPath: string]: ImageRecord;
}

const SOURCE_FOLDERS = [
  'public/index',
  'public/room1', 
  'public/room2',
  'public/room3',
  'public/exterior',
  'public/common_area',
  'public/common_room',
  'public/extra'
];

const OUTPUT_DIR = 'public/_optimized';
const MANIFEST_PATH = 'src/data/images.manifest.json';

const SIZES = [640, 1024, 1920];
const QUALITY = {
  avif: 45,
  webp: 80
};

async function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function generateLQIP(inputPath: string): Promise<string> {
  const buffer = await sharp(inputPath)
    .resize(20)
    .jpeg({ quality: 20 })
    .toBuffer();
  
  return `data:image/jpeg;base64,${buffer.toString('base64')}`;
}

async function processImage(inputPath: string, relativePath: string): Promise<ImageRecord> {
  console.log(`Processing: ${relativePath}`);
  
  // Get original metadata
  const metadata = await sharp(inputPath).metadata();
  const { width: originalWidth, height: originalHeight } = metadata;
  
  if (!originalWidth || !originalHeight) {
    throw new Error(`Could not read dimensions for ${inputPath}`);
  }

  // Generate LQIP
  const lqip = await generateLQIP(inputPath);

  // Process each size
  const variants: { [size: string]: ImageVariant } = {};
  
  for (const size of SIZES) {
    if (originalWidth <= size) {
      // Skip if original is smaller than target size
      continue;
    }

    const outputDir = path.join(OUTPUT_DIR, path.dirname(relativePath));
    await ensureDir(outputDir);

    const baseName = path.parse(relativePath).name;
    const avifPath = path.join(outputDir, `${baseName}-${size}.avif`);
    const webpPath = path.join(outputDir, `${baseName}-${size}.webp`);

    // Generate AVIF
    await sharp(inputPath)
      .resize(size)
      .avif({ quality: QUALITY.avif })
      .toFile(avifPath);

    // Generate WebP
    await sharp(inputPath)
      .resize(size)
      .webp({ quality: QUALITY.webp })
      .toFile(webpPath);

    variants[size.toString()] = {
      avif: `/_optimized/${path.dirname(relativePath)}/${baseName}-${size}.avif`,
      webp: `/_optimized/${path.dirname(relativePath)}/${baseName}-${size}.webp`
    };
  }

  return {
    width: originalWidth,
    height: originalHeight,
    lqip,
    variants
  };
}

async function scanAndProcess() {
  const manifest: ImageManifest = {};

  for (const sourceFolder of SOURCE_FOLDERS) {
    if (!fs.existsSync(sourceFolder)) {
      console.log(`Skipping missing folder: ${sourceFolder}`);
      continue;
    }

    const files = fs.readdirSync(sourceFolder);
    
    for (const file of files) {
      const filePath = path.join(sourceFolder, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
        const relativePath = path.relative('public', filePath);
        const publicPath = `/${relativePath}`;
        
        try {
          const record = await processImage(filePath, relativePath);
          manifest[publicPath] = record;
        } catch (error) {
          console.error(`Error processing ${filePath}:`, error);
        }
      }
    }
  }

  // Ensure manifest directory exists
  await ensureDir(path.dirname(MANIFEST_PATH));
  
  // Write manifest
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`Generated manifest with ${Object.keys(manifest).length} images`);
}

// Run the script
scanAndProcess().catch(console.error);

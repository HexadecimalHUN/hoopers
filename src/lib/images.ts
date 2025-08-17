import manifestData from '@/data/images.manifest.json';

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

const manifest = manifestData as ImageManifest;

export function getImageRecord(originalPath: string): ImageRecord | null {
  return manifest[originalPath] || null;
}

export function pickBestVariant(record: ImageRecord, targetWidth: number = 1024): string {
  const sizes = Object.keys(record.variants)
    .map(s => parseInt(s))
    .sort((a, b) => a - b);

  // Find the smallest size that's >= target width
  let bestSize = sizes.find(size => size >= targetWidth);
  
  // If no size is large enough, use the largest available
  if (!bestSize) {
    bestSize = sizes[sizes.length - 1];
  }

  const variant = record.variants[bestSize.toString()];
  
  // Prefer AVIF, fallback to WebP
  return variant?.avif || variant?.webp || '';
}

export interface OptimizedImageProps {
  src: string;
  width?: number;
  height?: number;
  sizes?: string;
  blurDataURL?: string;
  priority?: boolean;
}

export function getOptimizedImageProps(
  originalPath: string, 
  targetWidth?: number,
  layout: 'fill' | 'sized' = 'sized'
): OptimizedImageProps {
  const record = getImageRecord(originalPath);
  
  if (!record) {
    // Fallback to original path if not in manifest
    return { src: originalPath };
  }

  const optimizedSrc = pickBestVariant(record, targetWidth);
  
  const baseProps = {
    src: optimizedSrc || originalPath,
    blurDataURL: record.lqip,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
  };

  // For fill layout, don't include width/height
  if (layout === 'fill') {
    return baseProps;
  }

  // For sized layout, include dimensions
  return {
    ...baseProps,
    width: record.width,
    height: record.height,
  };
}

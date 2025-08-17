import manifestData from '@/data/images.manifest.json';
import { getOptimizedImageProps, OptimizedImageProps } from '@/lib/images';

export type GalleryImage = {
  originalPath: string;
  category: string;
  thumbProps: OptimizedImageProps;
  fullProps: OptimizedImageProps;
  width?: number;
  height?: number;
  blurDataURL?: string;
};

const CATEGORY_ORDER = [
  'room1',
  'room2',
  'room3',
  'common_area',
  'common_room',
  'extra',
  'index',
  'exterior'
];

function getCategoryFromPath(path: string): string {
  const trimmed = path.startsWith('/') ? path.slice(1) : path;
  const firstSegment = trimmed.split('/')[0] || '';
  return firstSegment;
}

export function getAllGalleryImages(): GalleryImage[] {
  const manifest = manifestData as Record<string, any>;
  const originalPaths = Object.keys(manifest || {});

  const images = originalPaths
    .filter((p) => p.endsWith('.jpg') || p.endsWith('.jpeg') || p.endsWith('.png'))
    .map((originalPath) => {
      const record = manifest[originalPath] as {
        width?: number;
        height?: number;
        lqip?: string;
      } | undefined;

      const category = getCategoryFromPath(originalPath);

      const thumbProps = getOptimizedImageProps(originalPath, 640, 'fill');
      const fullProps = getOptimizedImageProps(originalPath, 1920, 'sized');

      return {
        originalPath,
        category,
        thumbProps,
        fullProps,
        width: record?.width,
        height: record?.height,
        blurDataURL: record?.lqip,
      } as GalleryImage;
    });

  const categoryIndex = (cat: string) => {
    const idx = CATEGORY_ORDER.indexOf(cat);
    return idx === -1 ? CATEGORY_ORDER.length + 1 : idx;
  };

  images.sort((a, b) => {
    const ca = categoryIndex(a.category);
    const cb = categoryIndex(b.category);
    if (ca !== cb) return ca - cb;
    const aName = a.originalPath.split('/').pop() || a.originalPath;
    const bName = b.originalPath.split('/').pop() || b.originalPath;
    return aName.localeCompare(bName);
  });

  return images;
}

export function getCategories(images: GalleryImage[]): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];

  // First, push those in CATEGORY_ORDER that actually appear
  for (const category of CATEGORY_ORDER) {
    if (!seen.has(category) && images.some((img) => img.category === category)) {
      seen.add(category);
      ordered.push(category);
    }
  }

  // Then, push any remaining categories in alphabetical order
  const remaining = Array.from(new Set(images.map((i) => i.category))).filter((c) => !seen.has(c));
  remaining.sort((a, b) => a.localeCompare(b));
  ordered.push(...remaining);

  return ordered;
}

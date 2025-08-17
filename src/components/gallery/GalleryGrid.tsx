import { Heading } from '@/components/common/Heading';
import { Text } from '@/components/common/Text';
import { getAllGalleryImages } from '@/lib/gallery';
import GalleryClient from './GalleryClient';

interface Dictionary {
  gallery?: Record<string, string>;
  common?: Record<string, string>;
}

interface GalleryGridProps {
  dictionary: Dictionary;
}

export default function GalleryGrid({ dictionary }: GalleryGridProps) {
  const images = getAllGalleryImages();

  return (
    <div>
      <div className="text-center mb-12">
        <Heading level={2} className="mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">
            {dictionary.gallery?.title || 'Gallery'}
          </span>
        </Heading>
        <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-chocolate-martini/80 mb-4" />
        <Text size="lg" variant="muted" className="max-w-2xl mx-auto text-foreground/70">
          {dictionary.gallery?.subtitle || 'Explore the beauty of our guesthouse and surroundings'}
        </Text>
      </div>

      <GalleryClient images={images} dictionary={dictionary} />
    </div>
  );
}

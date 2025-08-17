import Image from 'next/image';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { getOptimizedImageProps } from '@/lib/images';
import { Locale } from '@/i18n/config';

interface GalleryDictionary {
  gallery?: {
    title?: string;
    subtitle?: string;
    viewAll?: string;
  };
}

interface GalleryPreviewProps {
  locale: Locale;
  dictionary: GalleryDictionary;
}

const galleryImages = [
  '/exterior/ATD_6247.jpg',
  '/exterior/ATD_6249.jpg',
  '/exterior/ATD_6250.jpg',
  '/exterior/ATD_6251.jpg',
  '/extra/ATD_6310.jpg',
  '/extra/ATD_6311.jpg',
];

export function GalleryPreview({ locale, dictionary }: GalleryPreviewProps) {
  return (
    <Section padding="xl">
      <div className="text-center mb-12">
        <Heading level={2} className="mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">
            {dictionary.gallery?.title || 'Gallery'}
          </span>
        </Heading>
        <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-chocolate-martini/80 mb-4"></div>
        <Text size="lg" variant="muted" className="max-w-2xl mx-auto text-foreground/70">
          {dictionary.gallery?.subtitle || 'Explore the beauty of our guesthouse and surroundings'}
        </Text>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {galleryImages.map((image, index) => {
          const imageProps = getOptimizedImageProps(image, 640, 'fill');
          
          return (
            <div 
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
            >
              <Image
                {...imageProps}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                placeholder={imageProps.blurDataURL ? "blur" : "empty"}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <Link href={`/${locale}/gallery`}>
          <Button size="lg" className="bg-gradient-to-r from-primary to-chocolate-martini text-white hover:from-primary-hover hover:to-chocolate-martini/90 border border-white/10">
            {dictionary.gallery?.viewAll || 'View All Photos'}
          </Button>
        </Link>
      </div>
    </Section>
  );
}

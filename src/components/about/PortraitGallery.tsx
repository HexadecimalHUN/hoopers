import Image from 'next/image';
import { Heading } from '@/components/common/Heading';
import { Text } from '@/components/common/Text';
import { Section } from '@/components/common/Section';
import { getAllGalleryImages } from '@/lib/gallery';

interface Dictionary {
  about?: Record<string, any>;
}

export default function PortraitGallery({ dictionary }: { dictionary: Dictionary }) {
  const images = getAllGalleryImages().filter((img) => img.category === 'extra');

  return (
    <Section padding="xl">
      <div className="text-center mb-10">
        <Heading level={2} className="mb-3 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">
            {dictionary.about?.gallery?.title || 'Moments Around Hoopers'}
          </span>
        </Heading>
        <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-chocolate-martini/80" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {images.map((img, i) => (
          <div key={`${img.originalPath}-${i}`} className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
            <Image
              {...img.fullProps}
              alt={img.originalPath.split('/').pop() || 'Gallery image'}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-[1.02]"
              placeholder={img.fullProps.blurDataURL ? 'blur' : 'empty'}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

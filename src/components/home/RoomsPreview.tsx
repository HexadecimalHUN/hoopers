'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { getOptimizedImageProps } from '@/lib/images';
import { Locale } from '@/i18n/config';
import { useInView } from '@/lib/useInView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


type RoomKey = 'room1' | 'room2' | 'room3';

interface RoomsDictionary {
  rooms?: ({
    title?: string;
    subtitle?: string;
    viewRoom?: string;
    viewAllRooms?: string;
  } & Partial<Record<RoomKey, { name?: string; description?: string }>>);
}

interface RoomsPreviewProps {
  locale: Locale;
  dictionary: RoomsDictionary;
}

const roomsData: { slug: RoomKey; image: string; key: RoomKey }[] = [
  {
    slug: 'room1',
    image: '/room1/ATD_6261.jpg',
    key: 'room1'
  },
  {
    slug: 'room2', 
    image: '/room3/ATD_6254.jpg',
    key: 'room2'
  },
  {
    slug: 'room3',
    image: '/room2/ATD_6300.jpg', 
    key: 'room3'
  }
];

export function RoomsPreview({ locale, dictionary }: RoomsPreviewProps) {
  const { ref: headingRef, inView: headingInView } = useInView<HTMLDivElement>({ threshold: 0.15, rootMargin: '0px 0px -10% 0px', once: true });
  const { ref: gridRef, inView: gridInView } = useInView<HTMLDivElement>({ threshold: 0.1, once: true });

  return (
    <Section background="surface" padding="xl">
      <div className="relative">
        {/* subtle radial background behind grid */}
        <div className="pointer-events-none absolute left-1/2 top-12 -z-10 h-[600px] w-[1200px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.04),transparent_60%)]"></div>

        <div
          ref={headingRef}
          className={`text-center mb-12 motion-safe:transition-all motion-safe:duration-700 motion-safe:opacity-0 motion-safe:translate-y-4 ${headingInView ? 'motion-safe:opacity-100 motion-safe:translate-y-0' : ''}`}
        >
          <Heading level={2} className="mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">
              {dictionary.rooms?.title || 'Our Rooms'}
            </span>
          </Heading>
          <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-chocolate-martini/80 mb-4"></div>
          <Text size="lg" variant="muted" className="max-w-2xl mx-auto text-foreground/70">
            {dictionary.rooms?.subtitle || 'Choose from our comfortable rooms'}
          </Text>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roomsData.map((room, index) => {
            const imageProps = getOptimizedImageProps(room.image, 640, 'fill');
            const delay = `${index * 120}ms`;
            
            return (
              <div 
                key={room.slug}
                style={{ transitionDelay: delay }}
                className={`group bg-background rounded-xl overflow-hidden shadow-md ring-1 ring-black/5 transition-all duration-500 motion-safe:opacity-0 motion-safe:translate-y-6 ${gridInView ? 'motion-safe:opacity-100 motion-safe:translate-y-0' : ''} hover:shadow-xl hover:ring-primary/30 flex flex-col h-full`}
              >
                <div className="relative h-56 md:h-72 lg:h-80 overflow-hidden">
                  <Image
                    {...imageProps}
                    alt={dictionary.rooms?.[room.key]?.name || `Room ${room.slug}`}
                    fill
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105 motion-safe:lg:group-hover:-rotate-1"
                    placeholder={imageProps.blurDataURL ? "blur" : "empty"}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/15 to-transparent"></div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <Heading level={3} size="lg" className="mb-3 tracking-tight">
                    {dictionary.rooms?.[room.key]?.name || `Room ${room.slug}`}
                  </Heading>
                  
                  <Text variant="muted" className="mb-4 text-foreground/70">
                    {dictionary.rooms?.[room.key]?.description || `Comfortable accommodation in ${room.slug}`}
                  </Text>

                  <Link href={`/${locale}/rooms/${room.slug}`} className="block mt-auto">
                    <Button size="md" className="w-full bg-gradient-to-r from-primary to-chocolate-martini text-white hover:from-primary-hover hover:to-chocolate-martini/90 border border-white/10 gap-2">
                      {dictionary.rooms?.viewRoom || 'View Room'}
                      <FontAwesomeIcon icon={faChevronRight} className="text-white/90" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href={`/${locale}/rooms`}>
            <Button size="lg" className="bg-gradient-to-r from-primary to-chocolate-martini text-white hover:from-primary-hover hover:to-chocolate-martini/90 border border-white/10">
              {dictionary.rooms?.viewAllRooms || 'View All Rooms'}
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}

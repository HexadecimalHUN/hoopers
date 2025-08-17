'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { getOptimizedImageProps } from '@/lib/images';
import { Locale } from '@/i18n/config';
import { useInView } from '@/lib/useInView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface RoomsGridProps {
  locale: Locale;
  dictionary: any;
}

const roomsData = [
  { slug: 'room1', image: '/room1/ATD_6261.jpg', key: 'room1' },
  { slug: 'room2', image: '/room3/ATD_6254.jpg', key: 'room2' },
  { slug: 'room3', image: '/room2/ATD_6300.jpg', key: 'room3' },
];

export function RoomsGrid({ locale, dictionary }: RoomsGridProps) {
  const { ref: headingRef, inView: headingInView } = useInView<HTMLDivElement>({ threshold: 0.15, rootMargin: '0px 0px -10% 0px', once: true });
  const { ref: gridRef, inView: gridInView } = useInView<HTMLDivElement>({ threshold: 0.1, once: true });

  return (
    <div className="relative overflow-hidden">
      {/* soft radial backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.04),transparent_60%)]" />

      <div
        ref={headingRef}
        className={`text-center mb-12 motion-safe:transition-all motion-safe:duration-700 motion-safe:opacity-0 motion-safe:translate-y-4 ${headingInView ? 'motion-safe:opacity-100 motion-safe:translate-y-0' : ''}`}
      >
        <Heading level={1} className="mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">
            {dictionary.rooms?.title || 'Our Rooms'}
          </span>
        </Heading>
        <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-chocolate-martini/80 mb-4" />
        <Text size="lg" variant="muted" className="max-w-2xl mx-auto text-foreground/70">
          {dictionary.rooms?.subtitle || 'Choose from our comfortable rooms'}
        </Text>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {roomsData.map((room, index) => {
          const imageProps = getOptimizedImageProps(room.image, 960, 'fill');
          const delay = `${index * 140}ms`;

          return (
            <div
              key={room.slug}
              style={{ transitionDelay: delay }}
              className={`group relative overflow-hidden rounded-2xl bg-background shadow-md ring-1 ring-black/5 transition-all duration-500 motion-safe:opacity-0 motion-safe:translate-y-6 ${gridInView ? 'motion-safe:opacity-100 motion-safe:translate-y-0' : ''} hover:shadow-2xl hover:ring-primary/30`}
            >
              {/* gradient border on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500" style={{ background: 'linear-gradient(135deg, rgba(147,108,85,0.35), rgba(62,39,35,0.35))', padding: 1 }} />

              <div className="relative h-64 md:h-72 lg:h-80 xl:h-72 overflow-hidden">
                <Image
                  {...imageProps}
                  alt={dictionary.rooms?.[room.key]?.name || `Room ${room.slug}`}
                  fill
                  className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105 motion-safe:xl:group-hover:-rotate-1"
                  placeholder={imageProps.blurDataURL ? 'blur' : 'empty'}
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/25 to-transparent" />
              </div>

              <div className="p-6 relative">
                <Heading level={2} size="lg" className="mb-2 tracking-tight">
                  {dictionary.rooms?.[room.key]?.name || `Room ${room.slug}`}
                </Heading>
                <Text variant="muted" className="mb-4 text-foreground/70">
                  {dictionary.rooms?.[room.key]?.description || `Comfortable accommodation in ${room.slug}`}
                </Text>
                <Link href={`/${locale}/rooms/${room.slug}`} className="block">
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
    </div>
  );
}

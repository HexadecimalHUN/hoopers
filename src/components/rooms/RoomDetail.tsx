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
import { faChevronRight, faUsers, faBed, faRulerCombined, faBath, faWifi, faMugHot, faSnowflake, faTv, faDoorOpen, faUtensils, faShower, faFire, faShirt, faVolumeXmark, faBaby, faUmbrellaBeach, faTree } from '@fortawesome/free-solid-svg-icons';

interface RoomDetailProps {
  locale: Locale;
  dictionary: any;
  slug: 'room1' | 'room2' | 'room3';
}

const roomImages: Record<RoomDetailProps['slug'], string[]> = {
  room1: ['/room1/ATD_6261.jpg', '/room1/ATD_6264.jpg', '/room1/ATD_6289.jpg', '/room1/ATD_6290.jpg', '/room1/ATD_6291.jpg'],
  room2: ['/room3/ATD_6254.jpg', '/room3/ATD_6260.jpg'],
  room3: ['/room2/ATD_6300.jpg', '/room2/ATD_6302.jpg'],
};

// Shared spaces (order matters: common_room first, then common_area)
const commonRoomImages: string[] = [
  '/common_room/ATD_6258.jpg',
  '/common_room/ATD_6259.jpg',
  '/common_room/ATD_6267.jpg',
];

const commonAreaImages: string[] = [
  '/common_area/ATD_6269.jpg',
  '/common_area/ATD_6272.jpg',
  '/common_area/ATD_6273.jpg',
  '/common_area/ATD_6276.jpg',
  '/common_area/ATD_6278.jpg',
  '/common_area/ATD_6281.jpg',
  '/common_area/ATD_6282.jpg',
  '/common_area/ATD_6286.jpg',
];

type BedsKey = '1s_1d' | '2s_1d' | '3s_1d';
const roomMeta: Record<RoomDetailProps['slug'], { capacity: number; beds: string; bedsKey: BedsKey; size: number; }> = {
  // Triple Room with Private Bathroom: 1 single + 1 large double, 20 m²
  room1: { capacity: 3, beds: '1 single bed + 1 large double bed', bedsKey: '1s_1d', size: 20 },
  // Quadruple Room with Bathroom: 2 singles + 1 large double, 25 m²
  room2: { capacity: 4, beds: '2 single beds + 1 large double bed', bedsKey: '2s_1d', size: 25 },
  // Family Room with Bathroom: 3 singles + 1 large double, 35 m² (capacity 5)
  room3: { capacity: 5, beds: '3 single beds + 1 large double bed', bedsKey: '3s_1d', size: 35 },
};

export function RoomDetail({ locale, dictionary, slug }: RoomDetailProps) {
  const images = roomImages[slug] || [];
  const meta = roomMeta[slug];

  const { ref: heroRef, inView: heroInView } = useInView<HTMLDivElement>({ threshold: 0.1, once: true });
  const { ref: featRef, inView: featInView } = useInView<HTMLDivElement>({ threshold: 0.1, once: true });

  const imageProps = getOptimizedImageProps(images[0] || '/room1/ATD_6261.jpg', 1280, 'fill');

  const t = dictionary.rooms || {};
  const r = t[slug] || {};
  const details = t.details || {};

  // Build gallery with room images followed by shared spaces (common_room first, then common_area)
  const galleryImages: string[] = [
    ...images,
    ...commonRoomImages,
    ...commonAreaImages,
  ];

  // Unified curated amenities for all rooms
  const amenities: { icon: typeof faTv; label: string }[] = [
    { icon: faWifi, label: details.wifi || 'Free Wi‑Fi' },
    { icon: faSnowflake, label: details.airConditioning || 'Air conditioning' },
    { icon: faTv, label: details.tv || 'TV' },
    { icon: faUtensils, label: details.sharedKitchen || 'Shared kitchen' },
    { icon: faShower, label: details.shower || 'Bath or shower' },
    { icon: faMugHot, label: details.coffeeTea || 'Tea/Coffee maker' },
    { icon: faDoorOpen, label: details.privateEntrance || 'Private entrance' },
    { icon: faShirt, label: details.wardrobe || 'Wardrobe or closet' },
    { icon: faFire, label: details.heating || 'Heating' },
    { icon: faVolumeXmark, label: details.soundproofing || 'Soundproofing' },
  ];

  return (
    <div className="relative">
      {/* Hero */}
      <div ref={heroRef} className={`relative overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 h-72 md:h-96 mb-10 motion-safe:transition-all motion-safe:duration-700 motion-safe:opacity-0 motion-safe:translate-y-4 ${heroInView ? 'motion-safe:opacity-100 motion-safe:translate-y-0' : ''}`}>
        <Image
          {...imageProps}
          alt={r.name || slug}
          fill
          className="object-cover"
          placeholder={imageProps.blurDataURL ? 'blur' : 'empty'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="inline-block max-w-3xl rounded-2xl bg-cannoli-cream/70 backdrop-blur-md ring-1 ring-white/20 shadow-xl px-5 py-4">
            <Heading level={1} className="mb-1 tracking-tight text-chocolate-martini">
              {r.name || 'Room'}
            </Heading>
            <Text className="text-foreground/80">
              {r.longDescription || r.description}
            </Text>
          </div>
        </div>
      </div>

      {/* Features */}
      <div ref={featRef} className={`grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch motion-safe:transition-all motion-safe:duration-700 motion-safe:opacity-0 motion-safe:translate-y-4 ${featInView ? 'motion-safe:opacity-100 motion-safe:translate-y-0' : ''}`}>
        {/* Overview Card */}
        <div className="rounded-xl bg-background shadow-md ring-1 ring-black/5 p-6 flex flex-col">
          <Heading level={2} size="md" className="mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">{details.overviewTitle || 'Overview'}</span>
          </Heading>
          <ul className="space-y-3 text-foreground/80">
            <li className="flex items-center gap-3"><FontAwesomeIcon icon={faUsers} className="text-primary" /> {details.capacity || 'Capacity'}: {meta.capacity}</li>
            <li className="flex items-center gap-3"><FontAwesomeIcon icon={faBed} className="text-primary" /> {details.beds || 'Beds'}: {details[`beds_${meta.bedsKey}` as const] || meta.beds}</li>
            <li className="flex items-center gap-3"><FontAwesomeIcon icon={faRulerCombined} className="text-primary" /> {details.size || 'Size'}: {meta.size} {details.sizeUnitM2 || 'm²'}</li>
            <li className="flex items-center gap-3"><FontAwesomeIcon icon={faBath} className="text-primary" /> {details.bathroom || 'Bathroom'}: {details.privateBathroom || 'Private ensuite'}</li>
          </ul>
        </div>

        {/* Amenities Card */}
        <div className="rounded-xl bg-background shadow-md ring-1 ring-black/5 p-6 flex flex-col">
          <Heading level={2} size="md" className="mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">{details.amenitiesTitle || 'Amenities'}</span>
          </Heading>
          <div className="flex flex-wrap gap-3">
            {amenities.map((a, i) => (
              <div key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface ring-1 ring-black/5 shadow-sm">
                <FontAwesomeIcon icon={a.icon} className="text-primary" />
                <span className="text-sm text-foreground/80">{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking CTA Card */}
        <div className="rounded-xl bg-background shadow-md ring-1 ring-black/5 p-6 flex flex-col">
          <Heading level={2} size="md" className="mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">{details.bookNow || 'Book Now'}</span>
          </Heading>
          <Text variant="muted" className="mb-6 text-foreground/70">{r.shortCta || t.subtitle}</Text>
          <div className="mt-auto space-y-3">
            <Link href={`https://booking.com`} className="block">
              <Button size="lg" className="w-full bg-gradient-to-r from-primary to-chocolate-martini text-white hover:from-primary-hover hover:to-chocolate-martini/90 border border-white/10 gap-2">
                {t.bookingCom || 'Book on Booking.com'}
                <FontAwesomeIcon icon={faChevronRight} className="text-white/90" />
              </Button>
            </Link>
            <Link href={`https://szallas.hu`} className="block">
              <Button size="lg" className="w-full bg-gradient-to-r from-primary to-chocolate-martini text-white hover:from-primary-hover hover:to-chocolate-martini/90 border border-white/10 gap-2">
                {t.szallasHu || 'Book on Szallas.hu'}
                <FontAwesomeIcon icon={faChevronRight} className="text-white/90" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Small gallery */}
      <div className="mt-12">
        <Heading level={2} size="md" className="mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">{details.galleryTitle || 'Gallery'}</span>
        </Heading>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((src, i) => {
            const props = getOptimizedImageProps(src, 640, 'fill');
            return (
              <div key={`${src}-${i}`} className="relative aspect-square overflow-hidden rounded-lg group">
                <Image {...props} alt={`${r.name || slug} image ${i + 1}`} fill className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" placeholder={props.blurDataURL ? 'blur' : 'empty'} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

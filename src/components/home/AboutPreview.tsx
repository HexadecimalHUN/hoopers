'use client';

import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { Locale } from '@/i18n/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar, faBed } from '@fortawesome/free-solid-svg-icons';
import { useInView } from '@/lib/useInView';

interface AboutPreviewProps {
  locale: Locale;
  dictionary: any;
}

export function AboutPreview({ locale, dictionary }: AboutPreviewProps) {
  const { ref: headingRef, inView: headingInView } = useInView<HTMLDivElement>({ threshold: 0.15, once: true });
  const { ref: gridRef, inView: gridInView } = useInView<HTMLDivElement>({ threshold: 0.1, once: true });

  return (
    <Section background="surface" padding="xl">
      <div className="max-w-4xl mx-auto text-center">
        <div ref={headingRef} className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:opacity-0 motion-safe:translate-y-4 ${headingInView ? 'motion-safe:opacity-100 motion-safe:translate-y-0' : ''}`}>
          <Heading level={2} className="mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">
              {dictionary.about?.title || 'About Us'}
            </span>
          </Heading>
          <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-chocolate-martini/80 mb-6"></div>
        </div>
        
        <Text size="lg" className="mb-10 leading-relaxed text-foreground/70">
          {dictionary.about?.subtitle || 'Discover the perfect blend of comfort and charm in the heart of Eger. Our modern guesthouse offers exceptional accommodation with personalized service, creating unforgettable experiences for every guest.'}
        </Text>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {[{
            icon: faBed,
            title: dictionary.about?.features?.rooms?.title || 'Comfortable Rooms',
            desc: dictionary.about?.features?.rooms?.description || 'Thoughtfully designed spaces with modern amenities and cozy details.'
          }, {
            icon: faLocationDot,
            title: dictionary.about?.features?.location?.title || 'Prime Location',
            desc: dictionary.about?.features?.location?.description || 'Stay steps from Eger’s historic sights, cafés, and thermal baths.'
          }, {
            icon: faStar,
            title: dictionary.about?.features?.service?.title || 'Excellent Service',
            desc: dictionary.about?.features?.service?.description || 'Friendly, attentive hospitality tailored to your stay.'
          }].map((item, index) => (
            <div key={index} style={{ transitionDelay: `${index * 120}ms` }} className={`text-center motion-safe:transition-all motion-safe:duration-700 motion-safe:opacity-0 motion-safe:translate-y-4 ${gridInView ? 'motion-safe:opacity-100 motion-safe:translate-y-0' : ''}`}>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ring-1 ring-white/20">
                <FontAwesomeIcon icon={item.icon} className="text-white text-2xl" />
              </div>
              <Heading level={3} size="md" className="mb-2">
                {item.title}
              </Heading>
              <Text variant="muted">
                {item.desc}
              </Text>
            </div>
          ))}
        </div>

        <div className="relative inline-block group">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-chocolate-martini opacity-0 group-hover:opacity-30 blur-md transition duration-500"></div>
          <Link href={`/${locale}/about`} className="relative inline-block">
            <Button size="lg" className="relative bg-gradient-to-r from-primary to-chocolate-martini text-white hover:from-primary-hover hover:to-chocolate-martini/90 border border-white/10">
              {dictionary.about?.readMore || 'Read More'}
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}

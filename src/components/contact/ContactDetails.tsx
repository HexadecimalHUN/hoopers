import { Heading } from '@/components/common/Heading';
import { Text } from '@/components/common/Text';
import { Section } from '@/components/common/Section';
import { Button } from '@/components/common/Button';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface ContactDictionary {
  title?: string;
  subtitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  addressValue?: string;
  phoneValue?: string;
  emailValue?: string;
}

interface HeroDictionary {
  bookingCom?: string;
  szallasHu?: string;
}

interface Dictionary {
  contact?: ContactDictionary;
  hero?: HeroDictionary;
}

export default function ContactDetails({ dictionary }: { dictionary: Dictionary }) {
  const items = [
    { icon: faLocationDot, label: dictionary.contact?.address || 'Address', value: dictionary.contact?.addressValue || 'Eger, Hungary' },
    { icon: faPhone, label: dictionary.contact?.phone || 'Phone', value: dictionary.contact?.phoneValue || '+36 00 000 0000' },
    { icon: faEnvelope, label: dictionary.contact?.email || 'Email', value: dictionary.contact?.emailValue || 'info@hoopersvendeghaz.hu' },
  ];

  return (
    <Section background="surface" padding="xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {items.map((it, i) => (
          <div key={i} className="glass-card p-6 rounded-xl shadow-md ring-1 ring-white/20 text-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg ring-1 ring-white/20">
              <FontAwesomeIcon icon={it.icon} className="text-white text-xl" aria-hidden="true" />
            </div>
            <Heading level={3} size="md" className="mb-1">{it.label}</Heading>
            <Text variant="muted">{it.value}</Text>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <Link href="https://www.booking.com/hotel/hu/hooper-39-s-vendeghaz.hu.html" target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="bg-gradient-to-r from-primary to-chocolate-martini text-white hover:from-primary-hover hover:to-chocolate-martini/90 border border-white/10">
            {dictionary.hero?.bookingCom || 'Book on Booking.com'}
          </Button>
        </Link>
        <Link href="https://szallas.hu/hooper-s-vendeghaz-eger" target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="secondary" className="btn-glass">
            {dictionary.hero?.szallasHu || 'Book on Szallas.hu'}
          </Button>
        </Link>
      </div>
    </Section>
  );
}

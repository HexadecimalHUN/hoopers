import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Heading } from '@/components/common/Heading';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { Locale } from '@/i18n/config';

interface CtaBarDictionary {
  rooms?: { bookNow?: string };
  hero?: { bookingCom?: string; szallasHu?: string; callUs?: string; emailUs?: string };
  common?: { bookingSubtitle?: string };
}

interface CtaBarProps {
  locale: Locale;
  dictionary: CtaBarDictionary;
}

export function CtaBar({ locale, dictionary }: CtaBarProps) {
  return (
    <Section background="elevated" padding="xl">
      <div className="text-center">
        <Heading level={2} size="2xl" className="mb-6">
          {dictionary.rooms?.bookNow || 'Ready to Book Your Stay?'}
        </Heading>
        
        <Text size="xl" variant="muted" className="mb-10 max-w-2xl mx-auto">
          {dictionary.common?.bookingSubtitle || 'Choose your preferred booking platform or contact us directly for personalized assistance.'}
        </Text>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <Button
            asLink
            href="https://www.booking.com/hotel/hu/hooper-39-s-vendeghaz.hu.html"
            variant="primary"
            size="lg"
            className="bg-gradient-to-r from-primary to-chocolate-martini hover:from-primary-hover hover:to-chocolate-martini/90 text-white font-bold px-8 py-4 rounded-full min-w-[220px] shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-white/10"
          >
            {dictionary.hero?.bookingCom || 'Book on Booking.com'}
          </Button>
          
          <Button
            asLink
            href="https://szallas.hu/hooper-s-vendeghaz-eger"
            variant="primary"
            size="lg"
            className="bg-gradient-to-r from-primary to-chocolate-martini hover:from-primary-hover hover:to-chocolate-martini/90 text-white font-bold px-8 py-4 rounded-full min-w-[220px] shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-white/10"
          >
            {dictionary.hero?.szallasHu || 'Book on Szallas.hu'}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asLink
            href="tel:+36309253760"
            variant="outline"
            size="lg"
            className="font-medium px-6 py-3 rounded-full"
          >
            <FontAwesomeIcon icon={faPhone} className="w-5 h-5 mr-3" />
            {dictionary.hero?.callUs || 'Call Us'}
          </Button>
          
          <Button
            asLink
            href="mailto:hoopersguesthouse@gmail.com"
            variant="outline"
            size="lg"
            className="font-medium px-6 py-3 rounded-full"
          >
            <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 mr-3" />
            {dictionary.hero?.emailUs || 'Email Us'}
          </Button>
        </div>
      </div>
    </Section>
  );
}

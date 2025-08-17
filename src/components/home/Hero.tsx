import Image from 'next/image';
import { Heading } from '@/components/common/Heading';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { getOptimizedImageProps } from '@/lib/images';
import { Locale } from '@/i18n/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faStar } from '@fortawesome/free-solid-svg-icons';

interface HeroDictionary {
  hero?: {
    title?: string;
    title1?: string;
    title2?: string;
    title3?: string;
    badge?: string;
    availableNow?: string;
    subtitle?: string;
    bookingCom?: string;
    szallasHu?: string;
    callUs?: string;
    emailUs?: string;
    guestRating?: string;
  };
}

interface HeroProps {
  locale: Locale;
  dictionary: HeroDictionary;
}

export function Hero({ locale, dictionary }: HeroProps) {
  const imageProps = getOptimizedImageProps('/index/ATD_6316.jpg', 1920, 'fill');

  return (
    <Section className="relative overflow-hidden h-screen" padding="xl">
      {/* Background Image for Entire Page View */}
      <div className="absolute inset-0 z-0">
        <Image
          {...imageProps}
          alt={dictionary.hero?.title || 'Hoopers Guesthouse Background'}
          fill
          className="object-cover"
          priority
          placeholder={imageProps.blurDataURL ? "blur" : "empty"}
        />
        {/* Just blur effect, no brown overlay */}
        <div className="absolute inset-0 backdrop-blur-md"></div>
      </div>

      <div className="grid lg:grid-cols-5 h-full relative z-10">
                  {/* Left Side - Content Panel (takes up 3/5 of the width) */}
          <div className="lg:col-span-3 relative flex items-center justify-center p-6 lg:p-12">
                        {/* Card Background - Full Left Panel Gradient */}
            <div className="absolute inset-0 rounded-xl lg:rounded-l-xl lg:rounded-r-none shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-cannoli-cream/95 via-cream-tan/90 to-safari/90"></div>
            
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-5 rounded-xl lg:rounded-l-xl lg:rounded-r-none overflow-hidden z-10">
              <div className="absolute top-0 left-0 w-full h-full" 
                   style={{
                     backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-mocha-mousse) 2px, transparent 2px)`,
                     backgroundSize: '60px 60px'
                   }}>
              </div>
            </div>

          {/* Content */}
          <div className="relative z-20 max-w-4xl w-full animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary font-medium text-sm mb-6 animate-fade-in-up">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              {dictionary.hero?.badge}
            </div>

            {/* Main Title */}
            <div className="mb-6 animate-fade-in-up animate-delay-100">
              <h1 className="text-5xl lg:text-6xl xl:text-6xl font-heading font-extrabold text-chocolate-martini leading-tight tracking-tight text-shadow-md">
                {dictionary.hero?.title1}
              </h1>
              <h1 className="text-6xl lg:text-7xl xl:text-7xl font-heading font-black text-primary italic leading-tight tracking-tight text-shadow-md">
                {dictionary.hero?.title2}
              </h1>
              <h1 className="text-5xl lg:text-6xl xl:text-6xl font-heading font-semibold text-chocolate-martini leading-tight tracking-tight text-shadow-sm">
                {dictionary.hero?.title3}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl xl:text-2xl text-baltic-amber leading-relaxed mb-8 max-w-2xl animate-fade-in-up animate-delay-200 text-shadow-sm">
              {dictionary.hero?.subtitle || 'Experience the magical atmosphere of Eger in our modern guesthouse'}
            </p>

            {/* CTA Buttons */}
            <div className="space-y-6 animate-fade-in-up animate-delay-300">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asLink
                  href="https://www.booking.com/hotel/hu/hooper-39-s-vendeghaz.hu.html"
                  size="xl"
                  className="bg-gradient-to-r from-primary to-chocolate-martini hover:from-primary-hover hover:to-chocolate-martini/90 text-white font-bold text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-white/10"
                >
                  {dictionary.hero?.bookingCom || 'Book on Booking.com'}
                </Button>
                
                <Button
                  asLink
                  href="https://szallas.hu/hooper-s-vendeghaz-eger"
                  size="xl"
                  className="bg-gradient-to-r from-primary to-chocolate-martini hover:from-primary-hover hover:to-chocolate-martini/90 text-white font-bold text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-white/10"
                >
                  {dictionary.hero?.szallasHu || 'Book on Szallas.hu'}
                </Button>
              </div>

              {/* Contact Row */}
              <div className="flex items-center justify-start space-x-8">
                <a
                  href="tel:+36-1-234-5678"
                  className="flex items-center text-text-muted hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center mr-3 group-hover:bg-primary/30 transition-colors">
                    <FontAwesomeIcon icon={faPhone} className="text-primary" />
                  </div>
                  <span className="font-medium text-shadow-sm">{dictionary.hero?.callUs}</span>
                </a>
                
                <a
                  href="mailto:info@hoopersvendeghaz.hu"
                  className="flex items-center text-text-muted hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center mr-3 group-hover:bg-primary/30 transition-colors">
                    <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
                  </div>
                  <span className="font-medium text-shadow-sm">{dictionary.hero?.emailUs}</span>
                </a>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -left-6 lg:-left-12 top-1/2 transform -translate-y-1/2 w-1 h-24 lg:h-32 bg-gradient-to-b from-transparent via-primary to-transparent opacity-50"></div>
          </div>
        </div>

        {/* Right Side - Image Panel (takes up 2/5 of the width) */}
        <div className="lg:col-span-2 relative lg:block hidden lg:rounded-r-xl lg:overflow-hidden">
          <Image
            {...imageProps}
            alt={dictionary.hero?.title || 'Hoopers Guesthouse'}
            fill
            className="object-cover"
            priority
            placeholder={imageProps.blurDataURL ? "blur" : "empty"}
          />
          
          {/* Image Overlay Elements */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/5"></div>
          
          {/* Floating Info Cards */}
          <div className="absolute bottom-8 right-8 space-y-4">
            <div className="glass-card p-4 max-w-xs animate-fade-in-up animate-delay-300">
              <div className="flex items-center text-white">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span className="font-medium">{dictionary.hero?.availableNow}</span>
              </div>
            </div>
            
            <div className="glass-card p-4 max-w-xs animate-fade-in-up animate-delay-300">
              <div className="text-white">
                <div className="text-2xl font-bold flex items-center gap-2"><span>4.5</span><FontAwesomeIcon icon={faStar} /></div>
                <div className="text-sm opacity-90">{dictionary.hero?.guestRating || 'Guest Rating'}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
}

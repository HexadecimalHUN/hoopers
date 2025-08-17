import Image from 'next/image';
import { Heading } from '@/components/common/Heading';
import { Text } from '@/components/common/Text';
import { Section } from '@/components/common/Section';
import { getOptimizedImageProps } from '@/lib/images';

interface Dictionary {
  about?: Record<string, any>;
}

interface AboutHeroProps {
  dictionary: Dictionary;
}

export default function AboutHero({ dictionary }: AboutHeroProps) {
  const imageProps = getOptimizedImageProps('/index/ATD_6316.jpg', 1920, 'fill');

  return (
    <Section className="relative overflow-hidden" padding="xl">
      <div className="absolute inset-0 z-0">
        <Image
          {...imageProps}
          alt={dictionary.about?.title || 'About background'}
          fill
          className="object-cover"
          placeholder={imageProps.blurDataURL ? 'blur' : 'empty'}
        />
        <div className="absolute inset-0 backdrop-blur-md bg-gradient-to-b from-background/60 via-background/70 to-background/85" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
        <Heading level={1} className="mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">
            {dictionary.about?.title || 'About Us'}
          </span>
        </Heading>
        <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-chocolate-martini/80 mb-6" />
        <Text size="lg" className="text-foreground/80">
          {dictionary.about?.subtitle || 'Discover our story and our connection with Eger.'}
        </Text>
      </div>
    </Section>
  );
}

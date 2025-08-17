import { Heading } from '@/components/common/Heading';
import { Text } from '@/components/common/Text';
import { Section } from '@/components/common/Section';

interface Dictionary {
  contact?: Record<string, any>;
}

export default function ContactHero({ dictionary }: { dictionary: Dictionary }) {
  return (
    <Section padding="xl">
      <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
        <Heading level={1} className="mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">
            {dictionary.contact?.title || 'Contact'}
          </span>
        </Heading>
        <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-chocolate-martini/80 mb-6" />
        <Text size="lg" className="text-foreground/80">
          {dictionary.contact?.subtitle || 'Get in touch with us'}
        </Text>
      </div>
    </Section>
  );
}

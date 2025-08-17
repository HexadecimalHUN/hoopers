'use client';

import { Heading } from '@/components/common/Heading';
import { Text } from '@/components/common/Text';
import { Section } from '@/components/common/Section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmark, faLocationDot, faWineBottle, faMap } from '@fortawesome/free-solid-svg-icons';

interface Dictionary {
  about?: Record<string, any>;
}

interface HistorySectionProps {
  dictionary: Dictionary;
}

export default function HistorySection({ dictionary }: HistorySectionProps) {
  const cards = [
    { icon: faLandmark, title: dictionary.about?.heritage?.title || 'Heritage', desc: dictionary.about?.heritage?.description || 'Rooted in tradition, shaped by time.' },
    { icon: faLocationDot, title: dictionary.about?.connection?.title || 'Connection with Eger', desc: dictionary.about?.connection?.description || 'A deep bond with the city’s historic heart.' },
    { icon: faWineBottle, title: dictionary.about?.wine?.title || 'Wine Culture', desc: dictionary.about?.wine?.description || 'Moments inspired by the Valley of the Beautiful Woman.' },
    { icon: faMap, title: dictionary.about?.location?.title || 'Local Landmarks', desc: dictionary.about?.location?.description || 'Steps from sights, stories, and stonework.' },
  ];

  return (
    <Section background="surface" padding="xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="motion-safe:transition-all motion-safe:duration-700 motion-safe:opacity-0 motion-safe:translate-y-4 animate-fade-in-up">
          <Heading level={2} className="mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">
              {dictionary.about?.history?.title || 'History, Heritage, and Our Eger Connection'}
            </span>
          </Heading>
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-chocolate-martini/80 mb-6" />
          <Text size="lg" className="text-foreground/80 mb-4">
            {dictionary.about?.history?.paragraph1 || 'From the cobblestoned streets to the warm courtyards, Eger’s character lives in our walls. Our guesthouse blends timeless charm with modern comfort, welcoming travelers into a story that continues with every stay.'}
          </Text>
          <Text size="lg" className="text-foreground/80">
            {dictionary.about?.history?.paragraph2 || 'We cherish the heritage of this historic town—its baroque architecture, its thermal traditions, its famed wines—and we invite you to experience it authentically, at your own pace.'}
          </Text>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {cards.map((c, i) => (
            <div key={i} style={{ transitionDelay: `${i * 120}ms` }} className={`glass-card p-6 rounded-xl shadow-md ring-1 ring-white/20 motion-safe:transition-all motion-safe:duration-700 motion-safe:opacity-0 motion-safe:translate-y-4 ${'animate-fade-in-up'}`}>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg ring-1 ring-white/20">
                <FontAwesomeIcon icon={c.icon} className="text-white text-xl" aria-hidden="true" />
              </div>
              <Heading level={3} size="md" className="mb-2">{c.title}</Heading>
              <Text variant="muted">{c.desc}</Text>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

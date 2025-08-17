import { Heading } from '@/components/common/Heading';
import { Text } from '@/components/common/Text';
import { Section } from '@/components/common/Section';

interface PrivacyDictionary {
  privacy?: {
    title?: string;
    updated?: string;
    toc?: {
      intro?: string;
      whyHow?: string;
      legal?: string;
      data?: string;
      retention?: string;
      security?: string;
      access?: string;
      rights?: string;
      contacts?: string;
      moreInfo?: string;
    };
    sections?: {
      intro?: string[];
      whyHow?: string[];
      legal?: string[];
      data?: string[];
      retention?: string[];
      security?: string[];
      access?: string[];
      rights?: string[];
      contacts?: string[];
      moreInfo?: string[];
    };
  };
}

function renderParagraphs(lines?: string[], fallback?: string[]) {
  const content = (lines && lines.length > 0) ? lines : (fallback || []);
  return content.map((line, idx) => (
    <Text key={idx}>{line}</Text>
  ));
}

export default function PrivacyPolicy({ dictionary }: { dictionary?: PrivacyDictionary }) {
  const t = dictionary?.privacy;
  const s = t?.sections;
  return (
    <Section padding="xl" containerSize="lg">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <Heading level={1} className="mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-primary to-chocolate-martini bg-clip-text text-transparent">
              {t?.title || 'Privacy Policy — Protection of Your Personal Data'}
            </span>
          </Heading>
          <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-chocolate-martini/80" />
          {t?.updated && (
            <Text variant="muted" className="mt-3">{t.updated}</Text>
          )}
        </div>

        <div className="glass-card p-6 rounded-xl space-y-2">
          <Text>
            {(s?.intro && s.intro[0]) || 'This privacy statement provides information about the processing and the protection of your personal data.'}
          </Text>
          <Text>{(s?.intro && s.intro[1]) || 'Processing operation: Social Media Activities in DG Interpretation'}</Text>
          <Text>{(s?.intro && s.intro[2]) || 'Data Controller: DG Interpretation, Unit SCIC.01 “Strategy, Policy and Communication”'}</Text>
          <Text>{(s?.intro && s.intro[3]) || 'Record reference: DPR-EC-08666'}</Text>
        </div>

        <div className="space-y-3">
          <Heading level={2} size="lg">Table of Contents</Heading>
          <ol className="list-decimal ml-5 space-y-1 text-foreground/80">
            <li><a href="#intro" className="text-primary hover:underline">{t?.toc?.intro || 'Introduction'}</a></li>
            <li><a href="#why-how" className="text-primary hover:underline">{t?.toc?.whyHow || 'Why and how do we process your personal data?'}</a></li>
            <li><a href="#legal" className="text-primary hover:underline">{t?.toc?.legal || 'On what legal ground(s) do we process your personal data?'}</a></li>
            <li><a href="#data" className="text-primary hover:underline">{t?.toc?.data || 'Which personal data do we collect and further process?'}</a></li>
            <li><a href="#retention" className="text-primary hover:underline">{t?.toc?.retention || 'How long do we keep your personal data?'}</a></li>
            <li><a href="#security" className="text-primary hover:underline">{t?.toc?.security || 'How do we protect and safeguard your personal data?'}</a></li>
            <li><a href="#access" className="text-primary hover:underline">{t?.toc?.access || 'Who has access to your personal data and to whom is it disclosed?'}</a></li>
            <li><a href="#rights" className="text-primary hover:underline">{t?.toc?.rights || 'What are your rights and how can you exercise them?'}</a></li>
            <li><a href="#contacts" className="text-primary hover:underline">{t?.toc?.contacts || 'Contact information'}</a></li>
            <li><a href="#more-info" className="text-primary hover:underline">{t?.toc?.moreInfo || 'Where to find more detailed information?'}</a></li>
          </ol>
        </div>

        <div id="intro" className="space-y-3">
          <Heading level={2} size="lg">1. {t?.toc?.intro || 'Introduction'}</Heading>
          {renderParagraphs(s?.intro?.slice(4), [
            'The European Commission is committed to protecting your personal data and respecting your privacy pursuant to Regulation (EU) 2018/1725.',
            'This privacy statement explains why your data is processed, how it is collected and protected, how it is used, and what rights you have, including contacts for exercising those rights.',
            'The information presented here concerns “Social Media activities in DG Interpretation” undertaken by Unit SCIC.01.'
          ])}
        </div>

        <div id="why-how" className="space-y-3">
          <Heading level={2} size="lg">2. {t?.toc?.whyHow || 'Why and how do we process your personal data?'}</Heading>
          {renderParagraphs(s?.whyHow, [
            'Unit SCIC.01 uses personal information to run online communication on widely used corporate social media channels and to analyse how users react to published information.',
            'Processing follows users\' voluntary registration with the platforms; aggregated statistics and publicly available posts are analysed in line with the platforms\' terms. See each platform\'s own privacy policy for details.',
            'DG Interpretation\'s channels are identified by the handle @EUInterpreters.',
            'Activities support communication goals such as capacity development, multilingualism and the interpreting profession. No automated decision-making, including profiling, is carried out.'
          ])}
        </div>

        <div id="legal" className="space-y-3">
          <Heading level={2} size="lg">3. {t?.toc?.legal || 'On what legal ground(s) do we process your personal data?'}</Heading>
          {renderParagraphs(s?.legal, [
            'Processing is necessary for tasks carried out in the public interest or in the exercise of official authority vested in the EU institutions.',
            'Operating and maintaining the Commission\'s social media presence and conducting qualitative media monitoring are tasks carried out in the public interest as mandated by the Treaties and applicable financial rules.'
          ])}
        </div>

        <div id="data" className="space-y-3">
          <Heading level={2} size="lg">4. {t?.toc?.data || 'Which personal data do we collect and further process?'}</Heading>
          {renderParagraphs(s?.data, [
            'From people appearing in audio-visual content: information contained in the content (e.g., metadata such as location or creation date), voice and video recordings, and images.',
            'From people accessing the corporate channels: aggregated and anonymised profile data (e.g., geography, activity time, language) and engagement metrics (e.g., reach, comments, sentiment). Providing data is not mandatory.'
          ])}
        </div>

        <div id="retention" className="space-y-3">
          <Heading level={2} size="lg">5. {t?.toc?.retention || 'How long do we keep your personal data?'}</Heading>
          {renderParagraphs(s?.retention, [
            'Personal data are kept only as long as necessary for the purpose, generally up to five years from publication. Some audio-visual material may be selected for permanent preservation.'
          ])}
        </div>

        <div id="security" className="space-y-3">
          <Heading level={2} size="lg">6. {t?.toc?.security || 'How do we protect and safeguard your personal data?'}</Heading>
          {renderParagraphs(s?.security, [
            'All personal data in electronic format are stored on secure Commission servers. Processing follows the Commission Decision (EU, Euratom) 2017/46 on the security of communication and information systems.',
            'Commission contractors are bound by contractual clauses and confidentiality obligations derived from GDPR as transposed in Member States.'
          ])}
        </div>

        <div id="access" className="space-y-3">
          <Heading level={2} size="lg">7. {t?.toc?.access || 'Who has access to your personal data and to whom is it disclosed?'}</Heading>
          {renderParagraphs(s?.access, [
            'Access is limited to Commission staff responsible for this processing and other authorised staff on a strictly need-to-know basis, who are bound by confidentiality obligations.',
            'Published audio-visual material on corporate channels is visible to the public; related personal data are not disclosed. Information is not provided to third parties unless required by law.'
          ])}
        </div>

        <div id="rights" className="space-y-3">
          <Heading level={2} size="lg">8. {t?.toc?.rights || 'What are your rights and how can you exercise them?'}</Heading>
          {renderParagraphs(s?.rights, [
            'Under Chapter III of Regulation (EU) 2018/1725, you have the rights of access, rectification, erasure, restriction, objection and data portability (where applicable).',
            'You may object to processing carried out under Article 5(1)(a) on grounds relating to your particular situation.'
          ])}
        </div>

        <div id="contacts" className="space-y-3">
          <Heading level={2} size="lg">9. {t?.toc?.contacts || 'Contact information'}</Heading>
          {renderParagraphs(s?.contacts, [
            'Data Controller: SCIC.01 Strategy, Policy and Communication — scic-euroscic@ec.europa.eu',
            'Data Protection Officer of the Commission — DATA-PROTECTION-OFFICER@ec.europa.eu',
            'European Data Protection Supervisor — edps@edps.europa.eu'
          ])}
        </div>

        <div id="more-info" className="space-y-3">
          <Heading level={2} size="lg">10. {t?.toc?.moreInfo || 'Where to find more detailed information?'}</Heading>
          {renderParagraphs(s?.moreInfo, [
            'The Commission Data Protection Officer publishes the register of processing operations at http://ec.europa.eu/dpo-register. Record reference: DPR-EC-08666. Version: February 2024.'
          ])}
        </div>
      </div>
    </Section>
  );
}

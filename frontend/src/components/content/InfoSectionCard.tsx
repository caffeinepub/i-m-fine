import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { CommunityInfoSection } from '@/content/catalog/types';

interface InfoSectionCardProps {
  section: CommunityInfoSection;
}

export default function InfoSectionCard({ section }: InfoSectionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{section.title}</CardTitle>
        <CardDescription>{section.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {section.content.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {section.externalLinks && section.externalLinks.length > 0 && (
          <div className="pt-4 border-t space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Related Resources:</p>
            {section.externalLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

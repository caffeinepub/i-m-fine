import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { LinkItem } from '@/content/catalog/types';

interface ExternalLinkCardProps {
  item: LinkItem;
}

export default function ExternalLinkCard({ item }: ExternalLinkCardProps) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg flex items-start justify-between gap-2">
          <span>{item.title}</span>
          <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
        </CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{item.source}</span>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            Visit →
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

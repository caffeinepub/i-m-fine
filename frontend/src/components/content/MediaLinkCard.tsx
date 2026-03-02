import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Clock } from 'lucide-react';
import { MediaItem } from '@/content/catalog/types';

interface MediaLinkCardProps {
  item: MediaItem;
}

export default function MediaLinkCard({ item }: MediaLinkCardProps) {
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
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{item.source}</span>
            {item.duration && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                {item.duration}
              </span>
            )}
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-primary hover:underline"
          >
            Watch/Listen →
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

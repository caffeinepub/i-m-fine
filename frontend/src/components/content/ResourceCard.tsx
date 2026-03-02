import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, FileText } from 'lucide-react';
import { ResourceItem } from '@/content/catalog/types';

interface ResourceCardProps {
  item: ResourceItem;
  onViewInApp?: (item: ResourceItem) => void;
}

export default function ResourceCard({ item, onViewInApp }: ResourceCardProps) {
  const hasUrl = !!item.url;

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg flex items-start justify-between gap-2">
          <span>{item.title}</span>
          {hasUrl ? (
            <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
          ) : (
            <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
          )}
        </CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{item.source}</span>
          {hasUrl ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              Open →
            </a>
          ) : (
            <button
              onClick={() => onViewInApp?.(item)}
              className="text-sm font-medium text-primary hover:underline"
            >
              View In-App →
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

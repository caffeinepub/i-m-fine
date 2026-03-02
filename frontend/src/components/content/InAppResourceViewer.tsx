import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ResourceItem } from '@/content/catalog/types';
import { X } from 'lucide-react';

interface InAppResourceViewerProps {
  item: ResourceItem | null;
  open: boolean;
  onClose: () => void;
}

export default function InAppResourceViewer({ item, open, onClose }: InAppResourceViewerProps) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-xl mb-2">{item.title}</DialogTitle>
              <DialogDescription>{item.description}</DialogDescription>
              <p className="text-sm text-muted-foreground mt-2">Source: {item.source}</p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[50vh] pr-4">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {item.inAppContent}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

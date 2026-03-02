import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GreenButton from '../GreenButton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAddJournalEntry, useUpdateJournalEntry } from '../../hooks/useJournal';
import { JournalEntry } from '../../backend';
import { X } from 'lucide-react';

interface JournalEditorProps {
  entry: JournalEntry | null;
  onClose: () => void;
}

export default function JournalEditor({ entry, onClose }: JournalEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const addEntry = useAddJournalEntry();
  const updateEntry = useUpdateJournalEntry();

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
    }
  }, [entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (entry) {
      updateEntry.mutate(
        { id: entry.id, title: title.trim(), content: content.trim() },
        { onSuccess: onClose }
      );
    } else {
      addEntry.mutate(
        { title: title.trim(), content: content.trim() },
        { onSuccess: onClose }
      );
    }
  };

  const isPending = addEntry.isPending || updateEntry.isPending;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{entry ? 'Edit Entry' : 'New Journal Entry'}</CardTitle>
            <CardDescription>
              {entry ? 'Update your thoughts' : 'Write down your thoughts and feelings'}
            </CardDescription>
          </div>
          <GreenButton variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </GreenButton>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Give your entry a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              required
              className="resize-none"
            />
          </div>
          <div className="flex gap-3">
            <GreenButton type="submit" disabled={isPending || !title.trim() || !content.trim()}>
              {isPending ? 'Saving...' : entry ? 'Update Entry' : 'Save Entry'}
            </GreenButton>
            <GreenButton type="button" variant="outline" onClick={onClose}>
              Cancel
            </GreenButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

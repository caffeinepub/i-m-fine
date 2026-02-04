import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import JournalList from './JournalList';
import JournalEditor from './JournalEditor';
import { JournalEntry } from '../../backend';

export default function JournalSection() {
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingEntry(null);
    setIsCreating(true);
  };

  const handleClose = () => {
    setEditingEntry(null);
    setIsCreating(false);
  };

  if (isCreating || editingEntry) {
    return (
      <JournalEditor
        entry={editingEntry}
        onClose={handleClose}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Journal Entries</CardTitle>
            <CardDescription>Your private thoughts and reflections</CardDescription>
          </div>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            New Entry
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <JournalList onEdit={handleEdit} />
      </CardContent>
    </Card>
  );
}

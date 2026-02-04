import { useGetJournalEntries, useDeleteJournalEntry } from '../../hooks/useJournal';
import { JournalEntry } from '../../backend';
import GreenButton from '../GreenButton';
import { Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface JournalListProps {
  onEdit: (entry: JournalEntry) => void;
}

export default function JournalList({ onEdit }: JournalListProps) {
  const { data: entries = [], isLoading } = useGetJournalEntries();
  const deleteEntry = useDeleteJournalEntry();

  const handleDelete = (id: bigint) => {
    deleteEntry.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">Loading entries...</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-2">No journal entries yet.</p>
        <p className="text-sm text-muted-foreground">
          Start writing to track your thoughts and feelings.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id.toString()}
          className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow bg-card"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-card-foreground mb-1 truncate">
                {entry.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {entry.content}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(Number(entry.timestamp) / 1000000), 'MMMM d, yyyy • h:mm a')}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <GreenButton
                variant="outline"
                size="icon"
                onClick={() => onEdit(entry)}
              >
                <Edit className="h-4 w-4" />
              </GreenButton>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <GreenButton variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </GreenButton>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Entry?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your journal entry.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(entry.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

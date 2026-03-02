import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GreenButton from '../GreenButton';
import { useAddMood, useGetMoodHistory } from '../../hooks/useMood';
import { Mood } from '../../backend';
import { Smile, Meh, Frown } from 'lucide-react';
import { format } from 'date-fns';

export default function MoodCheckInCard() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const addMood = useAddMood();
  const { data: moodHistory = [], isLoading } = useGetMoodHistory();

  const handleSubmit = () => {
    if (selectedMood) {
      addMood.mutate(selectedMood, {
        onSuccess: () => {
          setSelectedMood(null);
        },
      });
    }
  };

  const moodOptions = [
    { value: Mood.happy, label: 'Happy', icon: Smile, color: 'text-green-600' },
    { value: Mood.neutral, label: 'Neutral', icon: Meh, color: 'text-amber-600' },
    { value: Mood.sad, label: 'Sad', icon: Frown, color: 'text-orange-600' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Check-In</CardTitle>
        <CardDescription>How are you feeling right now?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {moodOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedMood === option.value;
            return (
              <button
                key={option.value}
                onClick={() => setSelectedMood(option.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50 bg-card'
                }`}
              >
                <Icon className={`h-8 w-8 ${isSelected ? 'text-primary' : option.color}`} />
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>

        <GreenButton
          onClick={handleSubmit}
          disabled={!selectedMood || addMood.isPending}
          className="w-full"
        >
          {addMood.isPending ? 'Saving...' : 'Save Mood'}
        </GreenButton>

        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-semibold mb-3 text-foreground">Recent Check-Ins</h4>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : moodHistory.length === 0 ? (
            <p className="text-sm text-muted-foreground">No check-ins yet. Start tracking your mood!</p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {moodHistory.slice(0, 5).map((entry, index) => {
                const option = moodOptions.find((o) => o.value === entry.mood);
                const Icon = option?.icon || Meh;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${option?.color}`} />
                      <span className="capitalize">{entry.mood}</span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {format(new Date(Number(entry.timestamp) / 1000000), 'MMM d, h:mm a')}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

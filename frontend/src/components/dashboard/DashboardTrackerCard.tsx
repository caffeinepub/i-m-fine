import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetMoodHistory } from '../../hooks/useMood';
import { TrendingUp, Calendar, Activity } from 'lucide-react';

export default function DashboardTrackerCard() {
  const { data: moodHistory = [], isLoading } = useGetMoodHistory();

  // Calculate simple metrics
  const totalEntries = moodHistory.length;
  const recentEntries = moodHistory.slice(0, 7).length; // Last 7 entries
  
  // Calculate streak (consecutive days with entries)
  const calculateStreak = () => {
    if (moodHistory.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    const sortedHistory = [...moodHistory].sort((a, b) => 
      Number(b.timestamp) - Number(a.timestamp)
    );
    
    const uniqueDays = new Set<string>();
    sortedHistory.forEach(entry => {
      const entryDate = new Date(Number(entry.timestamp) / 1000000);
      entryDate.setHours(0, 0, 0, 0);
      uniqueDays.add(entryDate.toISOString());
    });
    
    const daysArray = Array.from(uniqueDays).sort().reverse();
    
    for (let i = 0; i < daysArray.length; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      
      if (daysArray.includes(checkDate.toISOString())) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const currentStreak = calculateStreak();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Progress Tracker
          </CardTitle>
          <CardDescription>Your healing journey metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Progress Tracker
        </CardTitle>
        <CardDescription>Your healing journey metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {totalEntries === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              Start tracking your mood to see your progress here.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Current Streak</span>
              </div>
              <span className="text-2xl font-bold text-primary">{currentStreak}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">This Week</span>
              </div>
              <span className="text-2xl font-bold text-primary">{recentEntries}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Total Check-ins</span>
              </div>
              <span className="text-2xl font-bold text-primary">{totalEntries}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

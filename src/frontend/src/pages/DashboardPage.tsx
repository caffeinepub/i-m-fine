import MoodCheckInCard from '../components/mood/MoodCheckInCard';
import JournalSection from '../components/journal/JournalSection';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. How are you feeling today?
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <MoodCheckInCard />
        </div>
        <div className="lg:col-span-2">
          <JournalSection />
        </div>
      </div>
    </div>
  );
}

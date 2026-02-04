import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useCurrentUserProfile';
import GreenButton from '../GreenButton';
import { LayoutDashboard, Wrench, LogOut, Heart, User } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import SanctuaryBackground from './SanctuaryBackground';
import { usePlan } from '../../hooks/usePlan';

type Page = 'dashboard' | 'tools' | 'account';

interface AppLayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function AppLayout({ children, currentPage, onNavigate }: AppLayoutProps) {
  const { clear } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { selectedPlan } = usePlan();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const handleToolsClick = () => {
    onNavigate('tools');
  };

  return (
    <SanctuaryBackground>
      <div className="min-h-screen">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/generated/im-fine-logo.dim_512x512.png"
                  alt="I'm Fine"
                  className="h-10 w-10 rounded-lg"
                />
                <h1 className="text-xl font-bold text-foreground">I'm Fine</h1>
              </div>

              <nav className="flex items-center gap-2">
                <GreenButton
                  variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => onNavigate('dashboard')}
                  className="gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </GreenButton>
                <GreenButton
                  variant={currentPage === 'tools' ? 'default' : 'ghost'}
                  onClick={handleToolsClick}
                  className="gap-2"
                >
                  <Wrench className="h-4 w-4" />
                  <span className="hidden sm:inline">Tools</span>
                </GreenButton>
                <GreenButton
                  variant={currentPage === 'account' ? 'default' : 'ghost'}
                  onClick={() => onNavigate('account')}
                  className="gap-2"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">My Account</span>
                </GreenButton>
              </nav>

              <div className="flex items-center gap-4">
                {userProfile && (
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {userProfile.name}
                  </span>
                )}
                <GreenButton variant="outline" onClick={handleLogout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </GreenButton>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-border bg-card/30 backdrop-blur-sm py-6 mt-20">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>
              © 2026. Built with <Heart className="inline h-4 w-4 text-destructive" /> using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>
      </div>
    </SanctuaryBackground>
  );
}

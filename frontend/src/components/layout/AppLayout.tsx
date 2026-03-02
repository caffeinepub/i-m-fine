import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useCurrentUserProfile';
import GreenButton from '../GreenButton';
import { LogOut } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import SanctuaryBackground from './SanctuaryBackground';
import BrandLogo from '../branding/BrandLogo';
import HeaderNavDropdown from '../navigation/HeaderNavDropdown';
import AppFooter from './AppFooter';

type Route =
  | 'splash'
  | 'landing'
  | 'dashboard'
  | 'tools'
  | 'account'
  | 'testimonials'
  | 'community'
  | 'resources'
  | 'videos'
  | 'links'
  | 'legal'
  | 'playbook'
  | 'goals'
  | 'trophies';

interface AppLayoutProps {
  children: React.ReactNode;
  currentRoute: Route;
}

export default function AppLayout({ children, currentRoute }: AppLayoutProps) {
  const { clear } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const handleNavigation = (route: string) => {
    window.location.hash = route;
  };

  return (
    <SanctuaryBackground>
      <div className="min-h-screen">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink-0">
                <BrandLogo size="sm" />
              </div>

              <nav className="flex items-center gap-2 flex-shrink min-w-0">
                <HeaderNavDropdown onNavigate={handleNavigation} currentRoute={currentRoute} />
              </nav>

              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                {userProfile && (
                  <span className="text-sm text-muted-foreground hidden md:inline truncate max-w-[120px]">
                    {userProfile.name}
                  </span>
                )}
                <GreenButton variant="outline" onClick={handleLogout} className="gap-2 h-9 sm:h-10 px-3 sm:px-4">
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

        <AppFooter />
      </div>
    </SanctuaryBackground>
  );
}

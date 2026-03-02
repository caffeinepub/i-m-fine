import { useEffect, useState, useRef } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useCurrentUserProfile';
import { useActor } from './hooks/useActor';
import SplashPage from './pages/SplashPage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ToolsPage from './pages/ToolsPage';
import MyAccountPage from './pages/MyAccountPage';
import TestimonialsPage from './pages/TestimonialsPage';
import CommunityResourcesPage from './pages/CommunityResourcesPage';
import ResourcesPdfsPage from './pages/ResourcesPdfsPage';
import VideosMusicPage from './pages/VideosMusicPage';
import LinksPage from './pages/LinksPage';
import LegalPage from './pages/LegalPage';
import ProgramDirectorPlaybookPage from './pages/ProgramDirectorPlaybookPage';
import GoalsProgressPage from './pages/GoalsProgressPage';
import TrophiesPage from './pages/TrophiesPage';
import ProfileSetupModal from './components/auth/ProfileSetupModal';
import AppLayout from './components/layout/AppLayout';
import SanctuaryBackground from './components/layout/SanctuaryBackground';
import AppFooter from './components/layout/AppFooter';
import TrophyEarnedToast from './components/trophies/TrophyEarnedToast';
import { usePlan } from './hooks/usePlan';
import { useGetUserTrophies } from './hooks/useTrophies';
import { Trophy } from './backend';

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

function TrophyNotificationWatcher({ onNewTrophy }: { onNewTrophy: (t: Trophy) => void }) {
  const { data: trophies } = useGetUserTrophies();
  const prevTrophyIdsRef = useRef<Set<string>>(new Set());
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!trophies) return;

    const currentIds = new Set(trophies.map((t) => String(t.id)));

    if (!initializedRef.current) {
      // First load — just record existing trophies, don't fire toasts
      prevTrophyIdsRef.current = currentIds;
      initializedRef.current = true;
      return;
    }

    // Find newly earned trophies
    for (const trophy of trophies) {
      if (!prevTrophyIdsRef.current.has(String(trophy.id))) {
        onNewTrophy(trophy);
      }
    }

    prevTrophyIdsRef.current = currentIds;
  }, [trophies, onNewTrophy]);

  return null;
}

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { selectedPlan, isLoading: planLoading } = usePlan();
  const { actor } = useActor();
  const [currentRoute, setCurrentRoute] = useState<Route>('splash');
  const hasRedirectedForNoPlan = useRef(false);
  const [newTrophy, setNewTrophy] = useState<Trophy | null>(null);

  const isAuthenticated = !!identity;

  // Check and handle expirations on app load
  useEffect(() => {
    if (isAuthenticated && actor) {
      actor.checkAndHandleCallerExpiration().catch((error) => {
        console.log('Expiration check skipped:', error);
      });
    }
  }, [isAuthenticated, actor]);

  // Navigate to My Account if no plan is selected (one-time redirect only)
  useEffect(() => {
    if (
      isAuthenticated &&
      !profileLoading &&
      isFetched &&
      !planLoading &&
      !selectedPlan &&
      !hasRedirectedForNoPlan.current &&
      currentRoute !== 'account'
    ) {
      hasRedirectedForNoPlan.current = true;
      setCurrentRoute('account');
      window.location.hash = 'account';
    }
  }, [isAuthenticated, profileLoading, isFetched, planLoading, selectedPlan, currentRoute]);

  // Reset redirect flag when plan is selected
  useEffect(() => {
    if (selectedPlan) {
      hasRedirectedForNoPlan.current = false;
    }
  }, [selectedPlan]);

  // Handle hash-based routing with query parameter support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const routeName = hash.split('?')[0];
      const validRoutes: Route[] = [
        'splash', 'landing', 'dashboard', 'tools', 'account',
        'testimonials', 'community', 'resources', 'videos', 'links',
        'legal', 'playbook', 'goals', 'trophies',
      ];

      if (validRoutes.includes(routeName as Route)) {
        setCurrentRoute(routeName as Route);
      } else if (hash.length === 0) {
        setCurrentRoute(isAuthenticated ? 'landing' : 'splash');
      } else {
        setCurrentRoute(isAuthenticated ? 'landing' : 'splash');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated]);

  // Show loading state during initialization
  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show public pages when not authenticated
  if (!isAuthenticated) {
    if (currentRoute === 'testimonials') {
      return (
        <SanctuaryBackground>
          <TestimonialsPage standalone />
        </SanctuaryBackground>
      );
    }

    if (currentRoute === 'legal') {
      return (
        <SanctuaryBackground>
          <div className="min-h-screen flex flex-col">
            <div className="flex-1">
              <LegalPage />
            </div>
            <AppFooter />
          </div>
        </SanctuaryBackground>
      );
    }

    if (currentRoute === 'landing') {
      return <LandingPage />;
    }

    return (
      <SplashPage
        onGetStarted={() => {
          window.location.hash = 'landing';
          setCurrentRoute('landing');
        }}
      />
    );
  }

  // Show profile setup modal if user is authenticated but has no profile
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  // Render authenticated pages
  const renderPage = () => {
    switch (currentRoute) {
      case 'landing':
        return <LandingPage hideHeader hideFooter />;
      case 'testimonials':
        return <TestimonialsPage standalone={false} />;
      case 'legal':
        return <LegalPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'tools':
        return <ToolsPage />;
      case 'account':
        return <MyAccountPage />;
      case 'community':
        return <CommunityResourcesPage />;
      case 'resources':
        return <ResourcesPdfsPage />;
      case 'videos':
        return <VideosMusicPage />;
      case 'links':
        return <LinksPage />;
      case 'playbook':
        return <ProgramDirectorPlaybookPage />;
      case 'goals':
        return <GoalsProgressPage />;
      case 'trophies':
        return <TrophiesPage />;
      default:
        return <LandingPage hideHeader hideFooter />;
    }
  };

  return (
    <>
      <AppLayout currentRoute={currentRoute}>
        {renderPage()}
      </AppLayout>
      {showProfileSetup && <ProfileSetupModal />}
      {/* Trophy notification watcher — only active when authenticated */}
      <TrophyNotificationWatcher onNewTrophy={(t) => setNewTrophy(t)} />
      {/* Trophy earned toast */}
      {newTrophy && (
        <TrophyEarnedToast
          trophy={newTrophy}
          onDismiss={() => setNewTrophy(null)}
        />
      )}
    </>
  );
}

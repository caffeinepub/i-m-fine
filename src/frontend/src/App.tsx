import { useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useCurrentUserProfile';
import { useActor } from './hooks/useActor';
import SplashPage from './pages/SplashPage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ToolsPage from './pages/ToolsPage';
import MyAccountPage from './pages/MyAccountPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ProfileSetupModal from './components/auth/ProfileSetupModal';
import AppLayout from './components/layout/AppLayout';
import { useState } from 'react';
import { usePlan } from './hooks/usePlan';

type Page = 'dashboard' | 'tools' | 'account';
type PublicRoute = 'splash' | 'landing' | 'testimonials';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { selectedPlan } = usePlan();
  const { actor } = useActor();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [publicRoute, setPublicRoute] = useState<PublicRoute>('splash');

  const isAuthenticated = !!identity;

  // Check and handle expirations on app load
  useEffect(() => {
    if (isAuthenticated && actor) {
      actor.checkAndHandleExpirations().catch((error) => {
        // Silently handle errors - user may not be admin
        console.log('Expiration check skipped:', error);
      });
    }
  }, [isAuthenticated, actor]);

  // Navigate to My Account if no plan is selected
  useEffect(() => {
    if (isAuthenticated && !selectedPlan && currentPage !== 'account') {
      setCurrentPage('account');
    }
  }, [isAuthenticated, selectedPlan, currentPage]);

  // Handle hash-based routing for public pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'testimonials') {
        setPublicRoute('testimonials');
      } else if (hash === 'landing') {
        setPublicRoute('landing');
      } else {
        setPublicRoute('splash');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
    if (publicRoute === 'testimonials') {
      return <TestimonialsPage onBack={() => {
        window.location.hash = '';
        setPublicRoute('splash');
      }} />;
    }
    
    if (publicRoute === 'landing') {
      return <LandingPage />;
    }
    
    return <SplashPage onGetStarted={() => {
      window.location.hash = 'landing';
      setPublicRoute('landing');
    }} />;
  }

  // Show profile setup modal if user is authenticated but has no profile
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <>
      <AppLayout currentPage={currentPage} onNavigate={setCurrentPage}>
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'tools' && <ToolsPage />}
        {currentPage === 'account' && <MyAccountPage />}
      </AppLayout>
      {showProfileSetup && <ProfileSetupModal />}
    </>
  );
}

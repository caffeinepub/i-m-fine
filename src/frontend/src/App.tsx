import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useCurrentUserProfile';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ToolsPage from './pages/ToolsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ProfileSetupModal from './components/auth/ProfileSetupModal';
import AppLayout from './components/layout/AppLayout';
import { useState, useEffect } from 'react';

type Page = 'dashboard' | 'tools';
type PublicRoute = 'landing' | 'testimonials';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [publicRoute, setPublicRoute] = useState<PublicRoute>('landing');

  const isAuthenticated = !!identity;

  // Handle hash-based routing for public pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'testimonials') {
        setPublicRoute('testimonials');
      } else {
        setPublicRoute('landing');
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

  // Show landing or testimonials page when not authenticated
  if (!isAuthenticated) {
    if (publicRoute === 'testimonials') {
      return <TestimonialsPage onBack={() => {
        window.location.hash = '';
        setPublicRoute('landing');
      }} />;
    }
    return <LandingPage />;
  }

  // Show profile setup modal if user is authenticated but has no profile
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <>
      <AppLayout currentPage={currentPage} onNavigate={setCurrentPage}>
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'tools' && <ToolsPage />}
      </AppLayout>
      {showProfileSetup && <ProfileSetupModal />}
    </>
  );
}

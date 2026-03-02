import GreenButton from '../GreenButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import BrandLogo from '../branding/BrandLogo';
import HeaderNavDropdown from '../navigation/HeaderNavDropdown';

export default function LandingHeader() {
  const { login, isLoggingIn } = useInternetIdentity();

  const handleNavigation = (route: string) => {
    window.location.hash = route;
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink-0">
            <BrandLogo size="sm" />
          </div>
          <div className="flex items-center gap-2 flex-shrink min-w-0">
            <HeaderNavDropdown onNavigate={handleNavigation} currentRoute="landing" />
            <GreenButton
              onClick={login}
              disabled={isLoggingIn}
              size="default"
              className="font-semibold h-9 sm:h-11 px-3 sm:px-6 text-sm sm:text-base flex-shrink-0 whitespace-nowrap"
              aria-label={isLoggingIn ? 'Signing up, please wait' : 'Sign up today'}
            >
              {isLoggingIn ? 'Signing up...' : 'Sign up today'}
            </GreenButton>
          </div>
        </div>
      </div>
    </header>
  );
}

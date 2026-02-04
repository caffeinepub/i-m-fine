import GreenButton from '../GreenButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export default function LandingHeader() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img
              src="/assets/Im_Fine_logo.png"
              alt="I'm Fine logo - a safe space for healing"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex-shrink-0"
            />
            <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">I'm Fine</h1>
          </div>
          <GreenButton
            onClick={login}
            disabled={isLoggingIn}
            size="default"
            className="font-semibold h-9 sm:h-11 px-4 sm:px-6 text-sm sm:text-base flex-shrink-0"
            aria-label={isLoggingIn ? 'Signing in, please wait' : 'Sign in to your account'}
          >
            {isLoggingIn ? 'Signing in...' : 'Sign In'}
          </GreenButton>
        </div>
      </div>
    </header>
  );
}

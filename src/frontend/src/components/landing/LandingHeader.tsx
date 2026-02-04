import GreenButton from '../GreenButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export default function LandingHeader() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/Im_Fine_logo.png"
              alt="I'm Fine logo - a safe space for healing"
              className="h-12 w-12 rounded-lg"
            />
            <h1 className="text-2xl font-bold text-foreground">I'm Fine</h1>
          </div>
          <GreenButton
            onClick={login}
            disabled={isLoggingIn}
            size="lg"
            className="font-semibold"
            aria-label={isLoggingIn ? 'Signing in, please wait' : 'Sign in to your account'}
          >
            {isLoggingIn ? 'Signing in...' : 'Sign In'}
          </GreenButton>
        </div>
      </div>
    </header>
  );
}

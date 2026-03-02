import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import GreenButton from '../components/GreenButton';
import BrandLogo from '../components/branding/BrandLogo';
import SplashBackground from '../components/layout/SplashBackground';
import { Fingerprint, Scan, KeyRound, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SplashPageProps {
  onGetStarted: () => void;
}

export default function SplashPage({ onGetStarted }: SplashPageProps) {
  const { login, isLoggingIn } = useInternetIdentity();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showUnsupportedMessage, setShowUnsupportedMessage] = useState(false);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  const handleBiometricOption = (type: string) => {
    setShowUnsupportedMessage(true);
    setTimeout(() => setShowUnsupportedMessage(false), 4000);
  };

  const handleForgotPassword = () => {
    setShowUnsupportedMessage(true);
    setTimeout(() => setShowUnsupportedMessage(false), 4000);
  };

  return (
    <SplashBackground>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          {/* Background logo watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <img
              src="/assets/Im_Fine_logo.png"
              alt=""
              className="w-[80%] max-w-2xl h-auto object-contain"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-md px-6 py-8">
            <div className="bg-card/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-border">
              {/* Logo and title */}
              <div className="flex flex-col items-center mb-8">
                <BrandLogo size="lg" className="mb-4" />
                <p className="text-sm text-muted-foreground mt-2">Welcome back</p>
              </div>

              {/* Login form */}
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11"
                  />
                </div>

                <Button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full h-11 bg-foreground hover:bg-foreground/90 text-background"
                >
                  {isLoggingIn ? 'Logging in...' : 'Login'}
                </Button>

                <button
                  onClick={handleForgotPassword}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Alternative login options */}
              <div className="mb-6">
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or login with</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleBiometricOption('Face ID')}
                    className="flex flex-col items-center justify-center p-3 rounded-lg border border-border hover:bg-accent/10 transition-colors"
                    aria-label="Login with Face ID"
                  >
                    <Scan className="h-6 w-6 mb-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Face ID</span>
                  </button>

                  <button
                    onClick={() => handleBiometricOption('Fingerprint')}
                    className="flex flex-col items-center justify-center p-3 rounded-lg border border-border hover:bg-accent/10 transition-colors"
                    aria-label="Login with Fingerprint"
                  >
                    <Fingerprint className="h-6 w-6 mb-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Fingerprint</span>
                  </button>

                  <button
                    onClick={() => handleBiometricOption('Passphrase')}
                    className="flex flex-col items-center justify-center p-3 rounded-lg border border-border hover:bg-accent/10 transition-colors"
                    aria-label="Login with Passphrase"
                  >
                    <KeyRound className="h-6 w-6 mb-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Passphrase</span>
                  </button>
                </div>
              </div>

              {/* Unsupported message */}
              {showUnsupportedMessage && (
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This authentication method is not available in the current build. Please use the Login button to sign in with Internet Identity.
                  </AlertDescription>
                </Alert>
              )}

              {/* Get Started button */}
              <GreenButton
                onClick={onGetStarted}
                className="w-full h-12 text-base font-semibold"
              >
                Get Started
              </GreenButton>

              {/* Affirmation quote */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-center text-muted-foreground leading-relaxed italic">
                  "I choose to focus on the positive aspects of life and maintain a mindset of gratitude and optimism. I am in control of my thoughts and emotions and I decide to see the good in every situation. I find joy in the little things and cherish the moments of happiness that each day brings. Every day is a new beginning, and I choose happiness over fear, knowing that a positive mindset leads to a fulfilling life."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SplashBackground>
  );
}

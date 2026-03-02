import GreenButton from '../GreenButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import React from 'react';

interface LandingCTAProps extends React.ComponentPropsWithoutRef<typeof GreenButton> {
  children: React.ReactNode;
}

export default function LandingCTA({ children, ...props }: LandingCTAProps) {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <GreenButton
      onClick={login}
      disabled={isLoggingIn}
      {...props}
    >
      {isLoggingIn ? 'Signing in...' : children}
    </GreenButton>
  );
}

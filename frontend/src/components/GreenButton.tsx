import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

interface GreenButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  children: React.ReactNode;
}

export default function GreenButton({ children, className, ...props }: GreenButtonProps) {
  return (
    <Button
      className={cn(
        'bg-primary hover:bg-primary/90 text-primary-foreground',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

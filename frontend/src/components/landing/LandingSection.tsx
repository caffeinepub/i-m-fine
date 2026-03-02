import React from 'react';

interface LandingSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function LandingSection({ children, className = '', id }: LandingSectionProps) {
  return (
    <section id={id} className={`px-3 sm:px-4 py-12 sm:py-16 md:py-20 ${className}`}>
      <div className="container mx-auto max-w-7xl">
        {children}
      </div>
    </section>
  );
}

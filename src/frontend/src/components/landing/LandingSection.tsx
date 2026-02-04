import { cn } from '@/lib/utils';

interface LandingSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function LandingSection({ children, className, id }: LandingSectionProps) {
  return (
    <section id={id} className={cn('container mx-auto px-4 py-16 md:py-20', className)}>
      {children}
    </section>
  );
}

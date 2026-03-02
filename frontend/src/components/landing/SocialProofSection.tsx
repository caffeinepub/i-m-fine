import LandingSection from './LandingSection';
import { Quote } from 'lucide-react';

export default function SocialProofSection() {
  return (
    <LandingSection className="bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-foreground px-2">
          You Are Not Alone Anymore
        </h2>
        <p className="text-center text-sm sm:text-base text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
          Thousands of people are choosing healing every day.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <TestimonialCard
            quote="For the first time, I don't feel crazy for feeling what I feel."
            author="Sarah M."
          />
          <TestimonialCard
            quote="This app helped me find myself again."
            author="James T."
          />
          <TestimonialCard
            quote="It feels like a safe place in my pocket."
            author="Alex R."
          />
        </div>
        
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-base sm:text-lg text-foreground font-semibold mb-2 px-2">
            I understand what it feels like to pretend you're okay.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground mb-2 px-2">
            How confusing healing can be. How lonely it gets. How hard "moving forward" really is.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground italic px-2">
            I'll sit with you. Breathe, it's okay. You're safe here.
          </p>
        </div>
      </div>
    </LandingSection>
  );
}

function TestimonialCard({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) {
  return (
    <div className="bg-card rounded-xl p-4 sm:p-6 border border-border shadow-sm">
      <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-primary/40 mb-3 sm:mb-4" />
      <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed italic break-words">"{quote}"</p>
      <div className="border-t border-border pt-3 sm:pt-4">
        <p className="text-sm sm:text-base font-semibold text-card-foreground">— {author}</p>
      </div>
    </div>
  );
}

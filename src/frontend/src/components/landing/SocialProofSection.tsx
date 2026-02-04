import LandingSection from './LandingSection';
import GreenButton from '../GreenButton';
import { Quote } from 'lucide-react';

export default function SocialProofSection() {
  const handleTestimonialClick = () => {
    window.location.hash = 'testimonials';
  };

  return (
    <LandingSection className="bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          You Are Not Alone Anymore
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Thousands of people are choosing healing every day.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
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
        
        <div className="mt-12 text-center">
          <p className="text-lg text-foreground font-semibold mb-2">
            I understand what it feels like to pretend you're okay.
          </p>
          <p className="text-muted-foreground mb-2">
            How confusing healing can be. How lonely it gets. How hard "moving forward" really is.
          </p>
          <p className="text-muted-foreground italic mb-6">
            I'll sit with you. Breathe, it's okay. You're safe here.
          </p>
          
          <div className="mt-8 bg-card/50 rounded-xl p-6 border border-border max-w-md mx-auto">
            <p className="text-foreground font-semibold mb-4">
              Want to share your feedback or experience?
            </p>
            <GreenButton onClick={handleTestimonialClick} className="w-full">
              Leave a commit now.
            </GreenButton>
          </div>
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
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <Quote className="h-8 w-8 text-primary/40 mb-4" />
      <p className="text-muted-foreground mb-4 leading-relaxed italic">"{quote}"</p>
      <div className="border-t border-border pt-4">
        <p className="font-semibold text-card-foreground">— {author}</p>
      </div>
    </div>
  );
}

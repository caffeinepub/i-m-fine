import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useGetTestimonials, useSubmitTestimonial } from '../hooks/useTestimonials';
import { Quote, ArrowLeft, Heart } from 'lucide-react';
import { format } from 'date-fns';
import GreenButton from '../components/GreenButton';

interface TestimonialsPageProps {
  onBack: () => void;
}

export default function TestimonialsPage({ onBack }: TestimonialsPageProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const { data: testimonials = [], isLoading } = useGetTestimonials();
  const submitTestimonial = useSubmitTestimonial();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      submitTestimonial.mutate(
        { name: name.trim(), message: message.trim() },
        {
          onSuccess: () => {
            setName('');
            setMessage('');
          },
        }
      );
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Full-page background image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/generated/im-fine-bg-testimonials-butterfly-sunrise.dim_1920x1080.png)',
        }}
      />
      
      {/* Translucent overlay for readability */}
      <div className="fixed inset-0 z-0 bg-background/70 backdrop-blur-sm" />

      {/* Content layer */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <img
                  src="/assets/Im_Fine_logo.png"
                  alt="I'm Fine logo"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex-shrink-0"
                />
                <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">I'm Fine</h1>
              </div>
              <Button 
                onClick={onBack} 
                variant="outline" 
                className="gap-1.5 sm:gap-2 flex-shrink-0 h-9 sm:h-10 px-3 sm:px-4 text-sm"
              >
                <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Back to Home</span>
                <span className="xs:hidden">Back</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 max-w-6xl flex-1">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground px-2">
              Share Your Experience
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Your story matters. Help others feel less alone by sharing your journey.
            </p>
          </div>

          {/* Submit Form */}
          <Card className="mb-8 sm:mb-12 max-w-2xl mx-auto bg-card/95 backdrop-blur-sm">
            <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
              <CardTitle className="text-lg sm:text-xl">Leave Your Testimonial</CardTitle>
              <CardDescription className="text-sm">
                Share your feedback or experience with I'm Fine
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-10 sm:h-11 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Share your experience..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    required
                    className="resize-none text-base min-h-[120px]"
                  />
                </div>
                <GreenButton
                  type="submit"
                  disabled={!name.trim() || !message.trim() || submitTestimonial.isPending}
                  className="w-full h-11 sm:h-12 text-base font-semibold"
                >
                  {submitTestimonial.isPending ? 'Submitting...' : 'Submit Testimonial'}
                </GreenButton>
              </form>
            </CardContent>
          </Card>

          {/* Testimonials List */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-foreground px-2">
              Community Testimonials
            </h3>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Loading testimonials...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-12 px-4">
                <p className="text-muted-foreground">No testimonials yet. Be the first to share!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="border border-border shadow-sm bg-card/95 backdrop-blur-sm">
                    <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6 pb-4 sm:pb-6">
                      <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-primary/40 mb-3 sm:mb-4" />
                      <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed italic break-words">
                        "{testimonial.message}"
                      </p>
                      <div className="border-t border-border pt-3 sm:pt-4">
                        <p className="font-semibold text-sm sm:text-base text-card-foreground mb-1 break-words">
                          — {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(
                            new Date(Number(testimonial.timestamp) / 1000000),
                            'MMMM d, yyyy'
                          )}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card/80 backdrop-blur-sm py-4 sm:py-6 mt-12 sm:mt-20">
          <div className="container mx-auto px-3 sm:px-4 text-center text-xs sm:text-sm text-muted-foreground">
            <p>
              © 2026. Built with <Heart className="inline h-3 w-3 sm:h-4 sm:w-4 text-destructive" /> using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

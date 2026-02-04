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
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/Im_Fine_logo.png"
                  alt="I'm Fine logo"
                  className="h-12 w-12 rounded-lg"
                />
                <h1 className="text-2xl font-bold text-foreground">I'm Fine</h1>
              </div>
              <Button onClick={onBack} variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 max-w-6xl flex-1">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Share Your Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your story matters. Help others feel less alone by sharing your journey.
            </p>
          </div>

          {/* Submit Form */}
          <Card className="mb-12 max-w-2xl mx-auto bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Leave Your Testimonial</CardTitle>
              <CardDescription>
                Share your feedback or experience with I'm Fine
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Share your experience..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    required
                    className="resize-none"
                  />
                </div>
                <GreenButton
                  type="submit"
                  disabled={!name.trim() || !message.trim() || submitTestimonial.isPending}
                  className="w-full"
                >
                  {submitTestimonial.isPending ? 'Submitting...' : 'Submit Testimonial'}
                </GreenButton>
              </form>
            </CardContent>
          </Card>

          {/* Testimonials List */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center text-foreground">
              Community Testimonials
            </h3>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Loading testimonials...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No testimonials yet. Be the first to share!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="border border-border shadow-sm bg-card/95 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <Quote className="h-8 w-8 text-primary/40 mb-4" />
                      <p className="text-muted-foreground mb-4 leading-relaxed italic">
                        "{testimonial.message}"
                      </p>
                      <div className="border-t border-border pt-4">
                        <p className="font-semibold text-card-foreground mb-1">
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
        <footer className="border-t border-border bg-card/80 backdrop-blur-sm py-6 mt-20">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>
              © 2026. Built with <Heart className="inline h-4 w-4 text-destructive" /> using{' '}
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

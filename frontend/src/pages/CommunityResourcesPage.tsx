import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Phone } from 'lucide-react';
import InfoSectionCard from '@/components/content/InfoSectionCard';
import { communityGuidance } from '../content/catalog';

export default function CommunityResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
          Community Resources
        </h1>
        <p className="text-lg text-muted-foreground">
          Guidance for finding safe support, connecting with others, and navigating peer communities.
        </p>
      </div>

      {/* Safety Notice */}
      <Card className="mb-8 bg-destructive/5 border-destructive/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-foreground">Crisis Support Available 24/7</p>
              <p className="text-sm text-muted-foreground">
                If you're in crisis or need immediate support, please reach out to professional crisis services. Peer support is valuable but is not a replacement for professional mental health care or emergency services.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-destructive mt-3">
                <Phone className="h-4 w-4" />
                <span>Call or text 988 for the Suicide & Crisis Lifeline</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Guidance Sections */}
      <div className="space-y-6">
        {communityGuidance.map((section, index) => (
          <InfoSectionCard key={index} section={section} />
        ))}
      </div>

      {/* Additional Note */}
      <Card className="mt-8 bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <p className="text-sm text-center text-muted-foreground">
            <strong>Remember:</strong> Healing is not a solo journey, but it's also not a race. Take your time finding communities that feel safe and supportive. You deserve spaces where you can be authentic and receive compassionate support.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent } from '@/components/ui/card';
import { Phone, Heart, BookOpen, Users, AlertCircle } from 'lucide-react';
import ExternalLinkCard from '@/components/content/ExternalLinkCard';
import {
  crisisResources,
  mentalHealthOrganizations,
  educationalResources,
  supportCommunities,
} from '@/content/catalog';

export default function LinksPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
          Helpful Links
        </h1>
        <p className="text-lg text-muted-foreground">
          Curated external resources, organizations, and support services.
        </p>
      </div>

      {/* Safety Disclaimer */}
      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-foreground">Important Safety Information</p>
              <p className="text-sm text-muted-foreground">
                These external links are provided for informational purposes. Always verify the credibility of resources before sharing personal information. If you're in crisis, please call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 (Crisis Text Line) for immediate support.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crisis Resources */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Phone className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Crisis Resources</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Immediate help and crisis support services available 24/7.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {crisisResources.map((item, index) => (
            <ExternalLinkCard key={index} item={item} />
          ))}
        </div>
      </section>

      {/* Mental Health Organizations */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Mental Health Organizations</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Trusted mental health and wellness organizations providing education and support.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mentalHealthOrganizations.map((item, index) => (
            <ExternalLinkCard key={index} item={item} />
          ))}
        </div>
      </section>

      {/* Educational Resources */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Educational Resources</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Articles, research, and educational materials about trauma and healing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {educationalResources.map((item, index) => (
            <ExternalLinkCard key={index} item={item} />
          ))}
        </div>
      </section>

      {/* Support Communities */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Support Communities</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Online communities and peer support groups for connection and shared healing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportCommunities.map((item, index) => (
            <ExternalLinkCard key={index} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

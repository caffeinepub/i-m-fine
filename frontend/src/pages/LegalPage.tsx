import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertCircle, Shield, FileText, Scale } from 'lucide-react';

export default function LegalPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Legal Information</h1>
        <p className="text-muted-foreground">
          Important legal policies and information about using I'm Fine
        </p>
      </div>

      {/* Crisis Disclaimer */}
      <Card className="mb-6 border-destructive/50 bg-destructive/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Crisis Support</p>
              <p className="text-sm text-muted-foreground">
                If you are in crisis or experiencing thoughts of self-harm, please contact the 988 Suicide & Crisis Lifeline immediately by calling or texting 988, or contact your local emergency services.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal Sections */}
      <div className="space-y-6">
        {/* Terms of Service */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>Terms of Service</CardTitle>
            </div>
            <CardDescription>Your agreement to use I'm Fine</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="acceptance">
                <AccordionTrigger>Acceptance of Terms</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>By accessing and using I'm Fine, you accept and agree to be bound by these Terms of Service.</p>
                  <p>If you do not agree to these terms, please do not use this service.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="service">
                <AccordionTrigger>Service Description</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>I'm Fine is a self-help and wellness platform designed to support personal growth and emotional well-being.</p>
                  <p>This service provides educational content, journaling tools, grounding exercises, and community resources.</p>
                  <p>I'm Fine is not a substitute for professional medical or mental health treatment.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="user-conduct">
                <AccordionTrigger>User Conduct</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>You agree to use I'm Fine only for lawful purposes and in a way that does not infringe the rights of others.</p>
                  <p>You are responsible for maintaining the confidentiality of your account credentials.</p>
                  <p>You agree not to misuse the service or attempt to gain unauthorized access to any part of the platform.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="modifications">
                <AccordionTrigger>Modifications to Service</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>We reserve the right to modify or discontinue the service at any time, with or without notice.</p>
                  <p>We will not be liable to you or any third party for any modification, suspension, or discontinuance of the service.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Privacy Policy</CardTitle>
            </div>
            <CardDescription>How we protect and use your information</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="collection">
                <AccordionTrigger>Information We Collect</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>We collect personal information you provide when creating an account, including your name and optional contact details.</p>
                  <p>We collect usage data such as journal entries, mood check-ins, and tool interactions to provide and improve our services.</p>
                  <p>All data is stored securely on the Internet Computer blockchain infrastructure.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="usage">
                <AccordionTrigger>How We Use Your Information</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>Your information is used to provide, maintain, and improve I'm Fine services.</p>
                  <p>We use your data to personalize your experience and track your progress.</p>
                  <p>We may use aggregated, anonymized data for research and service improvement.</p>
                  <p>We will never sell your personal information to third parties.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="security">
                <AccordionTrigger>Data Security</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>We implement industry-standard security measures to protect your data.</p>
                  <p>All data is encrypted in transit and at rest.</p>
                  <p>Access to personal information is restricted to authorized personnel only.</p>
                  <p>While we strive to protect your data, no method of transmission over the internet is 100% secure.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rights">
                <AccordionTrigger>Your Rights</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>You have the right to access, update, or delete your personal information at any time.</p>
                  <p>You can export your data or request account deletion by contacting support.</p>
                  <p>You can opt out of newsletter communications at any time through your account settings.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Billing & Cancellation */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              <CardTitle>Billing & Cancellation Policy</CardTitle>
            </div>
            <CardDescription>Subscription terms and cancellation procedures</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="billing">
                <AccordionTrigger>Billing Terms</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>Paid subscriptions are billed on a recurring monthly basis.</p>
                  <p>All prices are in USD and subject to change with 30 days notice.</p>
                  <p>You are responsible for all charges incurred under your account.</p>
                  <p>There are no hidden fees or surprise charges.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cancellation">
                <AccordionTrigger>Cancellation Policy</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>All paid subscriptions can be canceled with 30 days written notice.</p>
                  <p>You will retain access until the end of your current billing cycle.</p>
                  <p>Additional charges may be incurred during the notice period.</p>
                  <p>To cancel, please contact support with your cancellation request.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="refunds">
                <AccordionTrigger>Refund Policy</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>No refunds are given at all.</p>
                  <p>All sales are final once payment is processed.</p>
                  <p>You may downgrade or cancel your subscription at any time, but no partial refunds will be issued for unused time.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="upgrades">
                <AccordionTrigger>Plan Changes</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>You can upgrade or downgrade your plan at any time through your account settings.</p>
                  <p>Upgrades take effect immediately.</p>
                  <p>Downgrades take effect at the end of your current billing cycle.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Medical Disclaimer */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              <CardTitle>Medical Disclaimer</CardTitle>
            </div>
            <CardDescription>Important health and safety information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">I'm Fine is not a medical or mental health service.</strong> This platform provides educational content and self-help tools for personal growth and emotional wellness.
            </p>
            <p>
              The content, tools, and resources provided are for informational and educational purposes only. They are not intended to diagnose, treat, cure, or prevent any medical or mental health condition.
            </p>
            <p>
              I'm Fine does not provide therapy, counseling, or clinical treatment. The AI assistant and other features are not substitutes for professional medical advice, diagnosis, or treatment.
            </p>
            <p>
              <strong className="text-foreground">Always seek the advice of qualified health providers</strong> with any questions you may have regarding a medical or mental health condition. Never disregard professional medical advice or delay seeking it because of something you have read or experienced on I'm Fine.
            </p>
            <p>
              If you are experiencing a mental health crisis, thoughts of self-harm, or suicidal ideation, please contact the 988 Suicide & Crisis Lifeline immediately by calling or texting 988, or contact your local emergency services.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>Questions about our legal policies?</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              If you have questions about these legal policies or need to submit a formal request, please contact our support team through the app or visit our website for contact information.
            </p>
            <p className="mt-3 text-xs">
              Last updated: February 5, 2026
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

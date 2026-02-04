import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { usePlan } from '../hooks/usePlan';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useCurrentUserProfile';
import { useNewsletterOptIn } from '../hooks/useNewsletterOptIn';
import { CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import GreenButton from '../components/GreenButton';
import { PLAN_OPTIONS } from '../utils/plan';
import { PlanOption } from '../backend';
import { validateDateOfBirth } from '../utils/validation';
import { formatTimestamp } from '../utils/time';

export default function MyAccountPage() {
  const { selectedPlan, effectivePlanLevel, isExpired: planExpired, selectPlan } = usePlan();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const toggleNewsletter = useNewsletterOptIn();

  // Form state
  const [fullName, setFullName] = useState(userProfile?.name || '');
  const [dateOfBirth, setDateOfBirth] = useState(userProfile?.dateOfBirth || '');
  const [city, setCity] = useState(userProfile?.city || '');
  const [state, setState] = useState(userProfile?.state || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [newsletterOptIn, setNewsletterOptIn] = useState(userProfile?.newsletterOptIn ? 'yes' : 'no');
  
  const [dobError, setDobError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Update form when profile loads
  useState(() => {
    if (userProfile) {
      setFullName(userProfile.name || '');
      setDateOfBirth(userProfile.dateOfBirth || '');
      setCity(userProfile.city || '');
      setState(userProfile.state || '');
      setEmail(userProfile.email || '');
      setPhone(userProfile.phone || '');
      setNewsletterOptIn(userProfile.newsletterOptIn ? 'yes' : 'no');
    }
  });

  const handlePlanChange = async (value: string) => {
    try {
      await selectPlan(value as PlanOption);
    } catch (error) {
      console.error('Error selecting plan:', error);
    }
  };

  const handleNewsletterChange = async (value: string) => {
    setNewsletterOptIn(value);
    try {
      await toggleNewsletter.mutateAsync(value === 'yes');
    } catch (error) {
      console.error('Error updating newsletter preference:', error);
    }
  };

  const handleSaveProfile = async () => {
    // Validate date of birth
    const dobValidation = validateDateOfBirth(dateOfBirth);
    if (!dobValidation.valid) {
      setDobError(dobValidation.error || 'Invalid date');
      return;
    }
    setDobError(null);

    if (!userProfile) return;

    try {
      await saveProfile.mutateAsync({
        ...userProfile,
        name: fullName,
        dateOfBirth: dateOfBirth || undefined,
        city: city || undefined,
        state: state || undefined,
        email: email || undefined,
        phone: phone || undefined,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Account</h1>
        <p className="text-muted-foreground">
          Manage your account settings, plan, and review important policies.
        </p>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your profile and account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth (MM/DD/YYYY)</Label>
              <Input
                id="dob"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder="MM/DD/YYYY"
              />
              {dobError && (
                <p className="text-sm text-destructive">{dobError}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter your state"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="pt-4 border-t space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Plan Enrolled In</Label>
              <p className="text-foreground">
                {selectedPlan ? PLAN_OPTIONS.find(opt => opt.value === selectedPlan)?.label : 'No plan selected'}
              </p>
            </div>

            {userProfile?.planExpirationTimestamp && (
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Plan Expiration Date
                </Label>
                <p className="text-foreground">
                  {formatTimestamp(userProfile.planExpirationTimestamp)}
                </p>
                {planExpired && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your plan has expired. You currently have Free plan access. Please renew to restore your paid plan features.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>

          <div className="pt-4 border-t space-y-3">
            <Label className="text-base font-medium">Would you like to join our Weekly Newsletter?</Label>
            <RadioGroup value={newsletterOptIn} onValueChange={handleNewsletterChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="newsletter-yes" />
                <Label htmlFor="newsletter-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="newsletter-no" />
                <Label htmlFor="newsletter-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="pt-4 flex gap-3">
            <GreenButton
              onClick={handleSaveProfile}
              disabled={saveProfile.isPending || !fullName}
            >
              {saveProfile.isPending ? 'Saving...' : 'Save Changes'}
            </GreenButton>
            {saveSuccess && (
              <Alert className="flex-1 bg-primary/10 border-primary py-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <AlertDescription className="text-foreground">
                  Profile saved successfully!
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Plan Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Your Plan</CardTitle>
          <CardDescription>Select your subscription plan to access features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selectedPlan && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please select a plan to access the app features and tools.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="plan-select">Select Plan</Label>
            <Select 
              value={selectedPlan || ''} 
              onValueChange={handlePlanChange}
            >
              <SelectTrigger id="plan-select" className="w-full">
                <SelectValue placeholder="Choose your plan..." />
              </SelectTrigger>
              <SelectContent>
                {PLAN_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPlan && (
            <Alert className="bg-primary/10 border-primary">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                You are currently on the <strong>{PLAN_OPTIONS.find(opt => opt.value === selectedPlan)?.label}</strong> plan.
                {planExpired && ' (Expired - Free access active)'}
              </AlertDescription>
            </Alert>
          )}

          {/* Plan Features */}
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-foreground">Plan Features:</h3>
            
            {effectivePlanLevel === 'free' && (
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Mood check-ins</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Journal entries (2 per week, max 8 per month)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Grounding exercises</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Community resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>What is Trauma? 5-part guide and activities</span>
                </li>
              </ul>
            )}

            {effectivePlanLevel === 'basic' && (
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>All Free plan features</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Unlimited journal entries</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Advanced self-help tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Progress tracking</span>
                </li>
              </ul>
            )}

            {effectivePlanLevel === 'premier' && (
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>All Basic plan features</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Personalized insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Export your data</span>
                </li>
              </ul>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Legal & Policies */}
      <Card>
        <CardHeader>
          <CardTitle>Legal & Policies</CardTitle>
          <CardDescription>Important disclosures and legal information</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="disclosure">
              <AccordionTrigger>Disclosure Statement</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-4">
                <p>
                  <strong>Important Notice:</strong> This application ("I'm Fine") is a self-help tool designed to support your mental wellness journey. It is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
                <p>
                  <strong>Not Medical Care:</strong> The tools, exercises, and content provided in this app do not replace professional therapy, counseling, or psychiatric care. If you are experiencing a mental health crisis or emergency, please contact emergency services immediately or call 911.
                </p>
                <p>
                  <strong>Crisis Resources:</strong> If you are in immediate danger or experiencing thoughts of self-harm, please contact:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>National Suicide Prevention Lifeline: 988</li>
                  <li>Crisis Text Line: Text HOME to 741741</li>
                  <li>Emergency Services: 911</li>
                </ul>
                <p>
                  <strong>Use at Your Own Risk:</strong> By using this application, you acknowledge that you understand its limitations and agree to use it as a supplementary tool alongside, not instead of, professional care when needed.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment-terms">
              <AccordionTrigger>Payment Terms & Conditions</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-4">
                <p>
                  <strong>Plan Options:</strong> We offer three plan tiers:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Free: $0 - No payment required</li>
                  <li>Basic: $9.99/month, $59.94 for 6 months, or $109.89/year</li>
                  <li>Premier: $24.99/month, $149.94 for 6 months, or $274.89/year</li>
                </ul>
                <p>
                  <strong>No Auto-Renewals:</strong> 6-month and yearly plan options do not automatically renew. You will need to manually renew your subscription when it expires.
                </p>
                <p>
                  <strong>Plan Expiration:</strong> When your paid plan expires, your account will automatically downgrade to the Free plan. You will retain Free plan access for 7 days after expiration.
                </p>
                <p>
                  <strong>Grace Period:</strong> After your plan expires, you have a 7-day grace period with Free plan access to renew your subscription or allow your account to close.
                </p>
                <p>
                  <strong>Account Deletion:</strong> If you do not renew within 7 days after expiration, your account and all associated data will be automatically deleted from our system.
                </p>
                <p>
                  <strong>Acknowledgment:</strong> By selecting a paid plan, you acknowledge that you have read, understood, and agree to these payment terms and conditions.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="refund-policy">
              <AccordionTrigger>Refund Policy</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-4">
                <p>
                  <strong>Free Plan:</strong> The Free plan is provided at no cost and does not involve any payments or refunds.
                </p>
                <p>
                  <strong>Basic Plan:</strong> Refunds for the Basic plan may be requested within 7 days of the initial charge. After 7 days, all charges are final and non-refundable. To request a refund, please contact support.
                </p>
                <p>
                  <strong>Premier Plan:</strong> No refunds are available for the Premier plan. All charges are final and non-refundable.
                </p>
                <p>
                  <strong>Cancellation:</strong> You may cancel your subscription at any time. Upon cancellation, you will retain access to paid features until the end of your current billing period. No prorated refunds will be issued for partial months.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy-policy">
              <AccordionTrigger>Privacy Policy</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-4">
                <p>
                  <strong>Your Privacy Matters:</strong> We are committed to protecting your privacy and ensuring the security of your personal information.
                </p>
                <p>
                  <strong>Data Collection:</strong> We collect only the information necessary to provide our services, including your name, date of birth, location, email, phone (optional), mood check-ins, journal entries, and usage data. We do not sell or share your personal information with third parties for marketing purposes.
                </p>
                <p>
                  <strong>Data Security:</strong> Your data is stored securely on the Internet Computer blockchain, which provides enhanced security and privacy protections. All data is encrypted and protected against unauthorized access.
                </p>
                <p>
                  <strong>Data Ownership:</strong> You own your data. You may request to export or delete your data at any time by contacting support.
                </p>
                <p>
                  <strong>Anonymous Use:</strong> While we require a name for your profile, you may use a pseudonym if you prefer to remain anonymous.
                </p>
                <p>
                  <strong>Changes to Privacy Policy:</strong> We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="terms-of-service">
              <AccordionTrigger>Terms of Service</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-4">
                <p>
                  <strong>Acceptance of Terms:</strong> By accessing and using I'm Fine, you accept and agree to be bound by these Terms of Service.
                </p>
                <p>
                  <strong>Eligibility:</strong> You must be at least 18 years old to use this service. If you are under 18, you may only use this service with the involvement and consent of a parent or guardian.
                </p>
                <p>
                  <strong>User Responsibilities:</strong> You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to use the service only for lawful purposes and in accordance with these terms.
                </p>
                <p>
                  <strong>Prohibited Conduct:</strong> You may not use the service to harass, abuse, or harm others; to violate any laws; or to interfere with the operation of the service.
                </p>
                <p>
                  <strong>Limitation of Liability:</strong> I'm Fine is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service.
                </p>
                <p>
                  <strong>Termination:</strong> We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our discretion.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="disclaimer">
              <AccordionTrigger>Medical Disclaimer</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-4">
                <p>
                  <strong>Not a Medical Device:</strong> I'm Fine is not a medical device and is not intended to diagnose, treat, cure, or prevent any disease or medical condition.
                </p>
                <p>
                  <strong>Consult a Professional:</strong> Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition or mental health concern. Never disregard professional medical advice or delay seeking it because of something you have read or experienced in this app.
                </p>
                <p>
                  <strong>Emergency Situations:</strong> If you are experiencing a medical or mental health emergency, call 911 or go to the nearest emergency room immediately. Do not rely on this app for emergency assistance.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

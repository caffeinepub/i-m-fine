import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useCurrentUserProfile';
import { useCouponCode } from '../hooks/useCouponCode';
import { useNewsletterOptIn } from '../hooks/useNewsletterOptIn';
import { usePlan } from '../hooks/usePlan';
import { PLAN_OPTIONS, isPaidPlan } from '../utils/plan';
import { formatTimestamp, isExpired } from '../utils/time';
import { validateDateOfBirth } from '../utils/validation';
import GreenButton from '../components/GreenButton';
import PaidPlanCheckoutModal from '../components/billing/PaidPlanCheckoutModal';
import { PlanOption } from '../backend';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Lock, AlertCircle } from 'lucide-react';

export default function MyAccountPage() {
  const { data: userProfile, isLoading: profileLoading, isFetched, error } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const { data: couponCode, saveMutation: saveCouponMutation } = useCouponCode();
  const toggleNewsletterOptIn = useNewsletterOptIn();
  const { selectedPlan, effectivePlanLevel, selectPlan, recordPayment } = usePlan();

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dobError, setDobError] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedCheckoutPlan, setSelectedCheckoutPlan] = useState<PlanOption | null>(null);
  const [isSelectingPlan, setIsSelectingPlan] = useState(false);
  const [journalPin, setJournalPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);

  // Initialize form when profile loads
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setDateOfBirth(userProfile.dateOfBirth || '');
      setCity(userProfile.city || '');
      setState(userProfile.state || '');
      setEmail(userProfile.email || '');
      setPhone(userProfile.phone || '');
    }
  }, [userProfile]);

  useEffect(() => {
    if (couponCode) {
      setCouponInput(couponCode);
    }
  }, [couponCode]);

  // Auto-scroll to security or plan section if hash query parameter is present
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('section=security')) {
      setTimeout(() => {
        const securitySection = document.getElementById('security-section');
        if (securitySection) {
          securitySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (hash.includes('section=plan')) {
      setTimeout(() => {
        const planSection = document.getElementById('plan-section');
        if (planSection) {
          planSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  const handleSaveProfile = () => {
    if (!userProfile) return;

    const dobValidation = validateDateOfBirth(dateOfBirth);
    if (!dobValidation.valid) {
      setDobError(dobValidation.error || '');
      return;
    }
    setDobError('');

    saveProfile.mutate({
      ...userProfile,
      name,
      dateOfBirth: dateOfBirth || undefined,
      city: city || undefined,
      state: state || undefined,
      email: email || undefined,
      phone: phone || undefined,
    });
  };

  const handleSaveCoupon = () => {
    if (couponInput.trim()) {
      saveCouponMutation.mutate(couponInput.trim());
    }
  };

  const handlePlanChange = async (value: string) => {
    const plan = value as PlanOption;
    
    if (isPaidPlan(plan)) {
      setSelectedCheckoutPlan(plan);
      setShowCheckoutModal(true);
    } else {
      setIsSelectingPlan(true);
      try {
        await selectPlan(plan);
      } catch (error) {
        console.error('Failed to select plan:', error);
      } finally {
        setIsSelectingPlan(false);
      }
    }
  };

  const handlePaymentComplete = async (plan: PlanOption) => {
    await recordPayment(plan);
  };

  const handleCheckoutClose = () => {
    setShowCheckoutModal(false);
    setSelectedCheckoutPlan(null);
  };

  const handleSavePin = () => {
    if (journalPin.length === 4) {
      // Store PIN in localStorage for demo purposes
      localStorage.setItem('journalLockPin', journalPin);
      setPinSaved(true);
      setTimeout(() => setPinSaved(false), 3000);
    }
  };

  // Loading state - show spinner while actor is initializing or profile is being fetched
  if (profileLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your account...</p>
        </div>
      </div>
    );
  }

  // Error state - show error message with retry option
  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-destructive/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="space-y-3">
                <p className="font-medium text-foreground">Unable to load your account</p>
                <p className="text-sm text-muted-foreground">
                  There was an error loading your profile. This might be a temporary issue. Please try refreshing the page or logging out and back in.
                </p>
                <GreenButton
                  onClick={() => window.location.reload()}
                  size="sm"
                >
                  Refresh Page
                </GreenButton>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No profile state - this should trigger the ProfileSetupModal in App.tsx
  // But if we reach here, show a helpful message
  if (isFetched && !userProfile) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <p className="text-muted-foreground">
                Your profile is being set up. Please complete the profile setup to continue.
              </p>
              <p className="text-sm text-muted-foreground">
                If you don't see a setup dialog, try refreshing the page.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Type guard: at this point userProfile must be non-null
  if (!userProfile) {
    return null;
  }

  // Profile loaded successfully - render the account page
  const planExpired = userProfile.planExpirationTimestamp 
    ? isExpired(userProfile.planExpirationTimestamp) 
    : false;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Account</h1>
        <p className="text-muted-foreground">Manage your profile and subscription</p>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
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
            {dobError && <p className="text-sm text-destructive">{dobError}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Your city"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Your state"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>

          <GreenButton
            onClick={handleSaveProfile}
            disabled={saveProfile.isPending || !name.trim()}
          >
            {saveProfile.isPending ? 'Saving...' : 'Save Profile'}
          </GreenButton>
        </CardContent>
      </Card>

      {/* Journal Security Settings */}
      <Card id="security-section">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle>Journal Security</CardTitle>
          </div>
          <CardDescription>Set a 4-digit PIN to lock your journal entries</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="journal-pin">4-Digit PIN</Label>
            <div className="flex items-center gap-4">
              <InputOTP
                maxLength={4}
                value={journalPin}
                onChange={(value) => setJournalPin(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
              <GreenButton
                onClick={handleSavePin}
                disabled={journalPin.length !== 4}
                size="sm"
              >
                {pinSaved ? 'Saved!' : 'Save PIN'}
              </GreenButton>
            </div>
            <p className="text-xs text-muted-foreground">
              This PIN will be required to access your journal entries. Keep it safe and memorable.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Coupon Code */}
      <Card>
        <CardHeader>
          <CardTitle>Coupon Code</CardTitle>
          <CardDescription>Enter a promotional code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Enter coupon code"
            />
            <GreenButton
              onClick={handleSaveCoupon}
              disabled={saveCouponMutation.isPending || !couponInput.trim()}
            >
              {saveCouponMutation.isPending ? 'Saving...' : 'Apply'}
            </GreenButton>
          </div>
          {couponCode && (
            <p className="text-sm text-muted-foreground">
              Current code: <span className="font-semibold">{couponCode}</span>
            </p>
          )}
        </CardContent>
      </Card>

      {/* Subscription Plan */}
      <Card id="plan-section">
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            Current plan: <span className="font-semibold capitalize">{effectivePlanLevel}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userProfile.planExpirationTimestamp && (
            <div className="text-sm">
              <p className="text-muted-foreground">
                Expires: {formatTimestamp(userProfile.planExpirationTimestamp)}
                {planExpired && <span className="text-destructive ml-2">(Expired)</span>}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="plan">Select Plan</Label>
            <Select
              value={selectedPlan || PlanOption.free}
              onValueChange={handlePlanChange}
              disabled={isSelectingPlan}
            >
              <SelectTrigger id="plan">
                <SelectValue />
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
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card>
        <CardHeader>
          <CardTitle>Newsletter</CardTitle>
          <CardDescription>Stay updated with our latest features and content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="newsletter" className="cursor-pointer">
              Subscribe to newsletter
            </Label>
            <Switch
              id="newsletter"
              checked={userProfile.newsletterOptIn}
              onCheckedChange={(checked) => toggleNewsletterOptIn.mutate(checked)}
              disabled={toggleNewsletterOptIn.isPending}
            />
          </div>
        </CardContent>
      </Card>

      {/* Legal & Policy Information */}
      <Card>
        <CardHeader>
          <CardTitle>Legal & Policy Information</CardTitle>
          <CardDescription>Important information about your account and our policies</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="terms">
              <AccordionTrigger>Terms of Service</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p>By using I'm Fine, you agree to our terms of service.</p>
                <p>This is a wellness and self-help platform. It does not provide medical or mental health treatment.</p>
                <p>For full terms, please contact support.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy">
              <AccordionTrigger>Privacy Policy</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p>We collect personal information to provide and improve our services.</p>
                <p>Your data is encrypted and never sold to third parties.</p>
                <p>You have the right to access, update, or delete your data at any time.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cancellation">
              <AccordionTrigger>Cancellation Policy</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p>All paid subscriptions can be canceled with a 30 day written notice.</p>
                <p>You will still have access until the end of the billing cycle.</p>
                <p>Additional charges may be incurred during that time.</p>
                <p>No refunds are given at all.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="disclaimer">
              <AccordionTrigger>Medical Disclaimer</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p>I'm Fine is a self-help and wellness app. It does not provide medical or mental health treatment.</p>
                <p>Content is for educational purposes only.</p>
                <p>If you are in crisis, contact 988 or local emergency services.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Checkout Modal */}
      {showCheckoutModal && selectedCheckoutPlan && (
        <PaidPlanCheckoutModal
          isOpen={showCheckoutModal}
          onClose={handleCheckoutClose}
          selectedPlan={selectedCheckoutPlan}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}

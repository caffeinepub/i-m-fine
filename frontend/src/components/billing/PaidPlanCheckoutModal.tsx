import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import GreenButton from '../GreenButton';
import { PlanOption } from '../../backend';
import { getPlanLabel } from '../../utils/plan';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

interface PaidPlanCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PlanOption;
  onPaymentComplete: (plan: PlanOption) => Promise<void>;
}

type CheckoutStep = 'payment' | 'newsletter';

export default function PaidPlanCheckoutModal({
  isOpen,
  onClose,
  selectedPlan,
  onPaymentComplete,
}: PaidPlanCheckoutModalProps) {
  const [step, setStep] = useState<CheckoutStep>('payment');
  const [disclosuresAgreed, setDisclosuresAgreed] = useState(false);
  const [newsletterChoice, setNewsletterChoice] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();

  const planLabel = getPlanLabel(selectedPlan);

  const handlePayment = async () => {
    if (!disclosuresAgreed) return;

    setIsProcessing(true);
    setError(null);

    try {
      await onPaymentComplete(selectedPlan);
      setStep('newsletter');
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNewsletterComplete = async () => {
    setIsProcessing(true);
    
    try {
      // Clear all cached data
      queryClient.clear();
      
      // Log out the user
      await clear();
      
      // Reset to splash page
      window.location.hash = '';
      
      // Close modal
      onClose();
      
      // Reset modal state for next use
      setStep('payment');
      setDisclosuresAgreed(false);
      setNewsletterChoice('');
      setError(null);
    } catch (err: any) {
      console.error('Logout error:', err);
      setError('An error occurred. Please refresh the page.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      setStep('payment');
      setDisclosuresAgreed(false);
      setNewsletterChoice('');
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {step === 'payment' && (
          <>
            <DialogHeader>
              <DialogTitle>Complete Your Purchase</DialogTitle>
              <DialogDescription>
                Review and confirm your plan selection
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <div className="text-sm text-muted-foreground mb-1">Selected Plan</div>
                <div className="text-lg font-semibold text-foreground">{planLabel}</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="disclosures"
                    checked={disclosuresAgreed}
                    onCheckedChange={(checked) => setDisclosuresAgreed(checked === true)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="disclosures"
                      className="text-sm font-medium leading-relaxed cursor-pointer"
                    >
                      I have read and agree to the disclosure statement, payment terms, and refund policy
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      By checking this box, you acknowledge that you understand this is a self-help tool and not a substitute for professional care.
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter>
              <GreenButton
                onClick={handleClose}
                variant="outline"
                disabled={isProcessing}
              >
                Cancel
              </GreenButton>
              <GreenButton
                onClick={handlePayment}
                disabled={!disclosuresAgreed || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Confirm Payment'}
              </GreenButton>
            </DialogFooter>
          </>
        )}

        {step === 'newsletter' && (
          <>
            <DialogHeader>
              <DialogTitle>Payment Successful!</DialogTitle>
              <DialogDescription>
                Your plan has been activated
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <Alert className="bg-primary/10 border-primary">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <AlertDescription className="text-foreground">
                  Thank you for your purchase! Your {planLabel} plan is now active.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Would you like to join our weekly newsletter?
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get helpful tips, resources, and updates delivered to your inbox.
                </p>
                <RadioGroup value={newsletterChoice} onValueChange={setNewsletterChoice}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="newsletter-yes-modal" />
                    <Label htmlFor="newsletter-yes-modal" className="font-normal cursor-pointer">
                      Yes, sign me up
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="newsletter-no-modal" />
                    <Label htmlFor="newsletter-no-modal" className="font-normal cursor-pointer">
                      No, thanks
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter>
              <GreenButton
                onClick={handleNewsletterComplete}
                disabled={!newsletterChoice || isProcessing}
                className="w-full"
              >
                {isProcessing ? 'Completing...' : 'Continue'}
              </GreenButton>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

import LandingSection from './LandingSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQSection() {
  return (
    <LandingSection className="bg-muted/20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          ❓ Frequently Asked Questions
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          You're not alone. Here are answers to common questions.
        </p>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="bg-card border border-border rounded-lg px-6">
            <AccordionTrigger className="text-left hover:no-underline">
              Is this a replacement for therapy?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              No. I'm Fine supports your healing journey. It does not replace licensed professionals. If you're in crisis or need clinical support, please reach out to a licensed mental health professional.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-card border border-border rounded-lg px-6">
            <AccordionTrigger className="text-left hover:no-underline">
              Is my data safe?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes. Your information is encrypted and never sold. We use Internet Identity for authentication, which means you control your data. Your privacy is our top priority.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-card border border-border rounded-lg px-6">
            <AccordionTrigger className="text-left hover:no-underline">
              Can I use this anonymously?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes. No real name required. You can use I'm Fine with the level of privacy that feels right for you.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="bg-card border border-border rounded-lg px-6">
            <AccordionTrigger className="text-left hover:no-underline">
              What if I'm not ready?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              That's okay. This app meets you where you are. There's no pressure to do more than you're comfortable with. Start when you're ready, go at your own pace.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="bg-card border border-border rounded-lg px-6">
            <AccordionTrigger className="text-left hover:no-underline">
              Can I cancel anytime?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes. No penalties. No guilt. You can cancel your paid subscription anytime with 30-day notice. Your access continues until the end of your current billing period.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="bg-card border border-border rounded-lg px-6">
            <AccordionTrigger className="text-left hover:no-underline">
              What makes I'm Fine different from other mental health apps?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              I'm Fine is built specifically for trauma survivors and people dealing with anxiety, depression, and confidence issues. Every feature is designed with empathy and trauma-informed care. This is about gentle progress, not pressure.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="bg-card border border-border rounded-lg px-6">
            <AccordionTrigger className="text-left hover:no-underline">
              Do I need any experience with therapy or self-help?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Not at all. I'm Fine is designed for everyone, whether you're new to self-help or have been on a healing journey for years. Our guided exercises walk you through each step, and you can go at your own pace.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </LandingSection>
  );
}

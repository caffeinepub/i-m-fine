import LandingCTA from './LandingCTA';
import LandingSection from './LandingSection';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <LandingSection className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            You don't have to pretend anymore.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
            I've been in your shoes and starting is so hard and scary. 15 years of abuse and trauma left me feeling uncertain about everything in my life.
          </p>
          <p className="text-lg md:text-xl text-foreground font-semibold mb-4 max-w-2xl mx-auto">
            Just know starting is hard, staying the course and pushing through is even harder. There is a light at the end of the tunnel and no one's journey is the same.
          </p>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto italic">
            I'm Fine. 2 words that scream so much more. You are not alone. Take your life back one day at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <LandingCTA size="lg" className="text-lg px-8 py-6 h-auto font-semibold">
              Begin Free
            </LandingCTA>
            <p className="text-sm text-muted-foreground">No credit card required</p>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            I believe in you. I won't rush you. I won't lie to you. I won't abandon you.
          </p>
        </div>
      </LandingSection>
    </section>
  );
}

import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Impact } from '@/components/sections/Impact';
import { WhyUs } from '@/components/sections/WhyUs';
import { TechSpotlight } from '@/components/sections/TechSpotlight';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Industries } from '@/components/sections/Industries';
import { Clients } from '@/components/sections/Clients';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaBand } from '@/components/sections/CtaBand';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Impact />
      <WhyUs />
      <TechSpotlight />
      <HowItWorks />
      <Industries />
      <Clients />
      <Testimonials />
      <CtaBand />
      <FAQ />
      <Contact />
    </>
  );
}

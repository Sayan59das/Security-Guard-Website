import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { WhyUs } from '@/components/sections/WhyUs';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Industries } from '@/components/sections/Industries';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <HowItWorks />
      <Industries />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}

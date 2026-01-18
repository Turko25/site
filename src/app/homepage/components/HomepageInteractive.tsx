'use client';

import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProducts';
import TrustIndicators from './TrustIndicators';
import PremiumCalculator from './PremiumCalculator';
import BlogPreview from './BlogPreview';
import Testimonials from './Testimonials';
import CTASection from './CTASection';
import Footer from './Footer';

const HomepageInteractive = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <TrustIndicators />
      <PremiumCalculator />
      <BlogPreview />
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  );
};

export default HomepageInteractive;
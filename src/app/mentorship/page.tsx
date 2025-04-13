'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Star, Shield, BookOpen, UserCheck, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PricingCard from '@/components/PricingCard';
import FAQItem from '@/components/FAQItem';
import MobileCTA from '@/components/MobileCTA';
import Testimonials from '@/components/Testimonials';

const Index = () => {
  const { toast } = useToast();

  const handlePurchase = (plan: string, option?: string) => {
    toast({
      title: 'Thank You!',
      description: `You selected the ${plan} plan${option ? ` (${option})` : ''}. We'll contact you shortly!`,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMobileCTA = () => {
    toast({
      title: "Let's Get Started!",
      description: 'Scroll up to select your ideal plan.',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 mb-16 overflow-hidden bg-gradient-to-br from-violet-600 to-teal-500">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-teal-500/20 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white animate-float">
            Your Journey to Success Starts Here
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Unlock your potential with expert mentorship tailored for
            <span className="font-bold text-teal-200"> IIT JEE</span> and
            <span className="font-bold text-teal-200"> NEET</span> aspirants.
          </p>
          <Button
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 text-lg rounded-full transform hover:scale-105 transition-transform duration-300"
            onClick={() => {
              const pricingSection = document.getElementById('pricing');
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            aria-label="Scroll to pricing plans"
          >
            Explore Plans <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
          </Button>
        </div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-200 rounded-full blur-3xl opacity-30"></div>
      </section>

      {/* Pricing Cards Section */}
      <section id="pricing" className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fade-in">
          Find Your Perfect Mentorship Plan
        </h2>

        {/* Mentorship Plans */}
        <h3 className="text-2xl font-semibold text-center mb-6 text-violet-600 flex items-center justify-center">
  <BookOpen className="h-6 w-6 mr-2" /> One-Time Mentorship & Tutoring
</h3>
<div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
  <PricingCard
    title="30-Minute Mentorship Call"
    price="₹49"
    description="One-time personalized guidance session"
    features={[
      'One-on-one call with IITian mentor',
      'Personalized study tips',
      'Basic roadmap planning',
      'Email support for 3 days',
      'Access to starter resources',
    ]}
    ctaText="Book Mentorship Call"
    gradientClass="bg-gradient-to-br from-violet-100 to-teal-100"
    onClick={() => handlePurchase('30-Minute Mentorship Call')}
    showDurationLabel={false}
    icon={<BookOpen className="h-8 w-8 text-violet-600" />}
    animationClass="animate-fade-in delay-100"
    paymentLink="https://pages.razorpay.com/pl_QGWUUbAvGJsarg/view"
  />
  <PricingCard
    title="1-Hour Tutoring Class"
    price="₹199"
    description="One-time intensive tutoring session"
    features={[
      'One-on-one tutoring session',
      'Subject-specific doubt clearing',
      'Personalized practice questions',
      'Post-session summary',
      'Access to tutoring resources',
    ]}
    ctaText="Book Tutoring Class"
    popular={true}
    gradientClass="bg-gradient-to-br from-violet-100 to-teal-100"
    onClick={() => handlePurchase('1-Hour Tutoring Class')}
    showDurationLabel={false}
    icon={<UserCheck className="h-8 w-8 text-teal-600" />}
    animationClass="animate-fade-in delay-200"
    paymentLink="https://pages.razorpay.com/pl_QIeuJejtXk5Mgh/view"
  />
</div>

        {/* Personal Mentorship Plans */}
        <h3 className="text-2xl font-semibold text-center mb-6 text-violet-600 flex items-center justify-center">
          <UserCheck className="h-6 w-6 mr-2" /> Personal Mentorship Plans
        </h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <PricingCard
            title="Monthly Personal Mentorship"
            price="₹499"
            description="Personalized guidance for focused growth"
            features={[
              'one-on-one mentorship sessions',
              'Customized success roadmap',
              'goal-setting reviews',
              'Chat support on weekdays',
              'Monthly progress insights',
            ]}
            ctaText="Start Monthly Mentorship"
            gradientClass="bg-gradient-to-br from-teal-100 to-violet-100"
            onClick={() => handlePurchase('Monthly Personal Mentorship')}
            showDurationLabel={false}
            icon={<UserCheck className="h-8 w-8 text-teal-600" />}
            animationClass="animate-fade-in delay-100"
            paymentLink="https://pages.razorpay.com/pl_QIfHauzFOuVilT/view"
          />
          <PricingCard
            title="Quarterly Personal Mentorship"
            price="₹1299"
            description="Deep mentorship for consistent progress"
            features={[
              'one-on-one mentorship sessions',
              'Advanced success roadmap',
              '6 goal-setting reviews',
              '24/7 chat support',
              'Bi-weekly progress insights',
              'Save ₹1497 (15% off)',
            ]}
            ctaText="Start Quarterly Mentorship"
            popular={true}
            gradientClass="bg-gradient-to-br from-teal-100 to-violet-100"
            onClick={() => handlePurchase('Quarterly Personal Mentorship')}
            showDurationLabel={false}
            icon={<UserCheck className="h-8 w-8 text-teal-600" />}
            animationClass="animate-fade-in delay-200"
            paymentLink='https://pages.razorpay.com/pl_QIfL5evFNXWe4r/view'
          />
          <PricingCard
            title="Yearly Personal Mentorship"
            price="₹3599"
            description="Transformative mentorship for exam success"
            features={[
              'one-on-one mentorship sessions',
              'Comprehensive success roadmap',
              'goal-setting reviews',
              'Priority 24/7 support',
              'Weekly progress insights',
              'Save ₹4599 (40% off)',
            ]}
            ctaText="Start Yearly Mentorship"
            gradientClass="bg-gradient-to-br from-teal-100 to-violet-100"
            onClick={() => handlePurchase('Yearly Personal Mentorship')}
            showDurationLabel={false}
            icon={<UserCheck className="h-8 w-8 text-teal-600" />}
            animationClass="animate-fade-in delay-300"
            paymentLink='https://pages.razorpay.com/pl_QIfNJf4NHVlcE4/view'
          />
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-16 animate-fade-in">
        <div className="glassmorphism rounded-xl py-8 px-4 bg-white/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-teal-100 p-3 rounded-full mb-4">
                <Check className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold mb-1 text-gray-800">Trusted by 10,000+ Students</h3>
              <p className="text-sm text-gray-600">Join our thriving community of achievers</p>
            </div>
            <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-teal-100 p-3 rounded-full mb-4">
                <Star className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold mb-1 text-gray-800">4.9 Average Rating</h3>
              <p className="text-sm text-gray-600">Based on 2,500+ verified reviews</p>
            </div>
            <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-teal-100 p-3 rounded-full mb-4">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold mb-1 text-gray-800">Secure Payment</h3>
              <p className="text-sm text-gray-600">100% secure transactions & money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Frequently Asked Questions</h2>
        <Card className="p-6 bg-white/90 backdrop-blur-sm">
          <FAQItem
            question="How do personalized mentorship sessions work?"
            answer="Our personalized mentorship sessions are conducted online via Zoom or Google Meet. Each 60-minute session is tailored to your goals, with a mentor specializing in IIT JEE or NEET guiding you on strategy, planning, and mindset."
            isOpen={true}
          />
          <FAQItem
            question="Can I choose my mentor for the 30-minute call?"
            answer="We assign mentors based on expertise and availability, but you can share preferences during booking, and we’ll match you with the best fit."
          />
          <FAQItem
            question="What if I’m not satisfied with the mentorship?"
            answer="We offer a satisfaction guarantee. If you’re not happy, request a new mentor or a full refund within 7 days."
          />
          <FAQItem
            question="How do I schedule my personal mentorship sessions?"
            answer="After purchase, access our scheduling platform to book sessions at your convenience, ideally spread across the plan duration for steady progress."
          />
          <FAQItem
            question="Are study materials included?"
            answer="Yes, all plans include relevant materials. General Mentorship offers an eBook, while Personal Mentorship provides customized resources tailored to your goals."
          />
          <FAQItem
            question="Why choose quarterly or yearly plans?"
            answer="Longer plans save you 20% (quarterly) or 33% (yearly), plus offer consistent guidance, priority scheduling, and deeper progress tracking."
          />
          <FAQItem
            question="What’s the difference between General and Personal Mentorship?"
            answer="General Mentorship focuses on strategic guidance and roadmaps, while Personal Mentorship offers intensive one-on-one sessions for personalized growth and accountability."
          />
        </Card>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Sticky CTA for Mobile */}
      <MobileCTA onClick={handleMobileCTA} />
    </div>
  );
};

export default Index;
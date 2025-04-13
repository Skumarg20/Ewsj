import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
  gradientClass?: string;
  onClick?: (option?: string) => void;
  showDurationLabel?: boolean;
  icon?: React.ReactNode;
  animationClass?: string;
  paymentLink: string; // New prop for unique Razorpay link
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  ctaText,
  popular = false,
  gradientClass,
  onClick,
  showDurationLabel = true,
  icon,
  animationClass,
  paymentLink,
}: PricingCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(title); // Trigger handlePurchase for toast and scroll
    }
    // Redirect to plan-specific Razorpay link after delay
    setTimeout(() => {
      window.location.href = paymentLink;
    }, 1000);
  };

  return (
    <Card
      className={cn(
        'pricing-card p-6 flex flex-col h-full relative',
        gradientClass,
        popular && 'border-violet-600 border-2',
        animationClass
      )}
      role="region"
      aria-labelledby={`pricing-card-${title.replace(/\s+/g, '-')}`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-violet-600 text-white px-4 py-1 rounded-full text-sm font-medium animate-pulse">
          Popular
        </div>
      )}

      <div className="mb-6">
        {icon && <div className="mb-4">{icon}</div>}
        <h3 id={`pricing-card-${title.replace(/\s+/g, '-')}`} className="text-xl font-bold mb-2 text-gray-800">
          {title}
        </h3>
        <div className="mb-2">
          <span className="text-3xl font-bold text-gray-800">{price}</span>
          {price?.includes('/') && showDurationLabel && (
            <span className="text-gray-600 ml-1 text-sm">per session</span>
          )}
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      <div className="space-y-3 flex-grow">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check size={18} className="text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button
          className={cn(
            'w-full text-white',
            popular ? 'bg-violet-600 hover:bg-violet-700' : 'bg-teal-500 hover:bg-teal-600'
          )}
          onClick={handleClick}
          aria-label={`Book ${title} and proceed to payment`}
        >
          {ctaText}
        </Button>
      </div>
    </Card>
  );
};

export default PricingCard;
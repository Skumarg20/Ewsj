
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface MobileCTAProps {
  onClick?: () => void;
}

const MobileCTA = ({ onClick }: MobileCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm shadow-lg z-50 md:hidden">
      <Button 
        className="w-full bg-violet hover:bg-violet-dark"
        onClick={onClick}
      >
        Start Your Success Journey
      </Button>
    </div>
  );
};

export default MobileCTA;
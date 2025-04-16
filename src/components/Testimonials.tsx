'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar?: string;
}

const TestimonialCard = ({ 
  name, 
  role, 
  text, 
  rating,
  avatar 
}: Testimonial) => {
  return (
    <div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-4">
      <div className="flex items-center space-x-4">
        {avatar ? (
          <Image 
            src={avatar} 
            alt={`${name}'s avatar`} 
            width={48} // Matches w-12 (12 * 4 = 48px)
            height={48} // Matches h-12
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/fallback-avatar.jpg';
            }}
            priority={false} // Lazy load by default
          />
        ) : (
          <div className="w-12 h-12 bg-violet-200 rounded-full flex items-center justify-center text-violet-600 font-bold">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">&quot;{text}&quot;</p>
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              'w-5 h-5',
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            )}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Rahul Sharma',
      role: 'IIT JEE Aspirant',
      text: 'The mentorship book and call completely changed my study strategy. The personalized guidance was exactly what I needed to boost my confidence.',
      rating: 5,
    },
    {
      name: 'Priya Patel',
      role: 'NEET Aspirant',
      text: 'The personal mentor sessions are incredibly comprehensive. My doubts are cleared instantly, and the goal-setting reviews have been instrumental in my preparation.',
      rating: 5,
    },
    {
      name: 'Aditya Kumar',
      role: 'IIT JEE Aspirant',
      text: 'I was struggling with physics, but the 1-on-1 mentorship sessions made complex concepts so much easier to understand. Highly recommended!',
      rating: 4,
    },
    {
      name: 'Sanya Malhotra',
      role: 'NEET Aspirant',
      text: 'The comprehensive study materials and strategic guidance helped me develop a structured approach to my medical entrance exam preparation.',
      rating: 5,
    },
    {
      name: 'Vikram Singh',
      role: 'IIT JEE Aspirant',
      text: 'As someone who was always anxious about competitive exams, the mentorship program gave me the confidence and skills I needed to excel.',
      rating: 5,
    },
    {
      name: 'Neha Reddy',
      role: 'NEET Aspirant',
      text: 'The progress insights and detailed performance analysis were game-changers. I could identify and work on my weak areas effectively.',
      rating: 4,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scrolling effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsPaused(true); // Pause auto-scroll on user interaction
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPaused(true); // Pause auto-scroll on user interaction
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true); // Pause auto-scroll on user interaction
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
  };

  return (
    <section
      className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-fade-in"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Testimonials carousel"
    >
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Students Say</h2>
      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-full md:min-w-[33.333%] px-3"
                aria-hidden={index !== currentIndex}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-violet-600 text-white p-2 rounded-full hover:bg-violet-700 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-violet-600 text-white p-2 rounded-full hover:bg-violet-700 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-colors',
                index === currentIndex ? 'bg-teal-600' : 'bg-gray-300'
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
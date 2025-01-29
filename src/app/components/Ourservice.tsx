'use client'
import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface Service {
  id: number;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Personalized Learning Path",
    description:
      "Receive a customized learning path tailored to your goals and study pace. We create a roadmap to maximize your potential.",
  },
  {
    id: 2,
    title: "Doubt Resolution",
    description:
      "Get your doubts resolved by experts with quick and easy explanations, helping you to understand even the toughest concepts.",
  },
  {
    id: 3,
    title: "Smart Practice Tests & Quizzes",
    description:
      "Test your knowledge with smart quizzes and practice tests. Designed to challenge you, helping you strengthen your skills.",
  },
  {
    id: 4,
    title: "Performance Analytics & Progress Tracking",
    description:
      "Track your learning journey with detailed performance analytics, pinpointing strengths and areas for improvement.",
  },
  {
    id: 5,
    title: "Video Summarization",
    description:
      "Save time with summarized videos focusing on key concepts, allowing you to learn faster and retain more.",
  },
  {
    id: 6,
    title: "Exam Strategy Guidance",
    description:
      "Access strategies and tips from experts on how to ace your exams, including time management and exam-specific approaches.",
  },
  {
    id: 7,
    title: "Study Group Matching",
    description:
      "Connect with like-minded students, join study groups, and enhance your learning experience through collaborative discussions.",
  },
  {
    id: 8,
    title: "Smart Notes & Flash Cards",
    description:
      "Create, organize, and review digital notes while using flash cards for quick memorization of key concepts. Perfect for efficient study sessions and quick recall during exams.",
  },
  {
    id: 9,
    title: "Download Syllabus & Books (JEE/NEET)",
    description:
      "Download subject-wise syllabi and books for JEE and NEET to aid in your preparation. We offer syllabi for Physics, Chemistry, and Mathematics/Biology to help you stay on track with your studies.",
  },
];

const Services: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedServices = showAll ? services : services.slice(0, 6);

  return (
    <div className="bg-[#28282B] text-white py-16 px-6 w-full">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg max-w-4xl mx-auto">
          We offer a range of personalized services designed to help you succeed academically. Whether you&apos;re looking for a
          customized learning path, need help resolving doubts, or want to track your progress with performance analytics, we
          have the tools and expertise to guide you.
        </p>
      </div>

      {/* Services Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedServices.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-300 hover:to-slate-200 w-full max-w-[90%] mx-auto"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {!showAll && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="flex items-center justify-center bg-black text-white py-2 px-6 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-gray-700 focus:outline-none"
          >
            <span>Show More</span>
            <ChevronDownIcon className="w-5 h-5 ml-2 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;

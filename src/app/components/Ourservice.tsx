'use client';
import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
  FaBookOpen,
  FaQuestionCircle,
  FaChartLine,
  FaVideo,
  FaLightbulb,
  FaUsers,
  FaStickyNote,
  FaDownload,
  FaRocket,
  FaTasks,
  FaClock,
  FaBrain,
} from 'react-icons/fa';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode; // Icon for each service
}

const services: Service[] = [
  {
    id: 10,
    title: 'Time Management Tools',
    description:
      'Optimize your study schedule with time management tools, helping you stay organized and productive.',
    icon: <FaClock className="w-8 h-8 text-blue-500" />,
  },
  {
    id: 11,
    title: 'Focus & Productivity Boosters',
    description:
      'Improve your focus and productivity with guided techniques and tools designed to minimize distractions.',
    icon: <FaBrain className="w-8 h-8 text-green-500" />,
  },
  {
    id: 12,
    title: 'Task Management',
    description:
      'Stay on top of your tasks with a built-in task manager, ensuring you never miss a deadline.',
    icon: <FaTasks className="w-8 h-8 text-purple-500" />,
  },
  {
    id: 1,
    title: 'Personalized Learning Path',
    description:
      'Receive a customized learning path tailored to your goals and study pace. We create a roadmap to maximize your potential.',
    icon: <FaBookOpen className="w-8 h-8 text-blue-500" />,
  },
  {
    id: 2,
    title: 'Doubt Resolution',
    description:
      'Get your doubts resolved by experts with quick and easy explanations, helping you to understand even the toughest concepts.',
    icon: <FaQuestionCircle className="w-8 h-8 text-green-500" />,
  },
  {
    id: 3,
    title: 'Smart Practice Tests & Quizzes',
    description:
      'Test your knowledge with smart quizzes and practice tests. Designed to challenge you, helping you strengthen your skills.',
    icon: <FaChartLine className="w-8 h-8 text-purple-500" />,
  },
  {
    id: 4,
    title: 'Performance Analytics & Progress Tracking',
    description:
      'Track your learning journey with detailed performance analytics, pinpointing strengths and areas for improvement.',
    icon: <FaChartLine className="w-8 h-8 text-yellow-500" />,
  },
  {
    id: 5,
    title: 'Video Summarization',
    description:
      'Save time with summarized videos focusing on key concepts, allowing you to learn faster and retain more.',
    icon: <FaVideo className="w-8 h-8 text-pink-500" />,
  },
  {
    id: 6,
    title: 'Exam Strategy Guidance',
    description:
      'Access strategies and tips from experts on how to ace your exams, including time management and exam-specific approaches.',
    icon: <FaLightbulb className="w-8 h-8 text-indigo-500" />,
  },
  {
    id: 7,
    title: 'Study Group Matching',
    description:
      'Connect with like-minded students, join study groups, and enhance your learning experience through collaborative discussions.',
    icon: <FaUsers className="w-8 h-8 text-red-500" />,
  },
  {
    id: 8,
    title: 'Smart Notes & Flash Cards',
    description:
      'Create, organize, and review digital notes while using flash cards for quick memorization of key concepts. Perfect for efficient study sessions and quick recall during exams.',
    icon: <FaStickyNote className="w-8 h-8 text-teal-500" />,
  },
  {
    id: 9,
    title: 'Download Syllabus & Books ',
    description:
      'Download subject-wise syllabi and books for JEE and NEET to aid in your preparation. We offer syllabi for Physics, Chemistry, and Mathematics/Biology to help you stay on track with your studies.',
    icon: <FaDownload className="w-8 h-8 text-orange-500" />,
  },
 
];

const Services: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedServices = showAll ? services : services.slice(0, 6);

  return (
    <div className="bg-[#28282B] text-white py-16 px-6 w-full rounded-xl mt-5 relative overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-float-delay"></div>
      </div>

      {/* Header Section */}
      <div className="text-center mb-12 relative z-10">
  {/* Icon and Graphic */}
  <div className="relative flex justify-center items-center mb-6">
    {/* Floating Icons */}
    <FaRocket className="w-12 h-12 text-blue-500 absolute -top-8 -left-8 animate-float" />
    <FaLightbulb className="w-10 h-10 text-yellow-500 absolute -top-12 right-8 animate-float-delay" />
    <FaChartLine className="w-8 h-8 text-purple-500 absolute -bottom-8 -right-8 animate-float" />

    {/* Main Icon */}
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-full shadow-lg">
      <FaBookOpen className="w-16 h-16 text-white" />
    </div>
  </div>

  {/* Title */}
  <h1 className="text-4xl font-bold mb-4">Our Services</h1>

  {/* Description */}
  <p className="text-lg max-w-4xl mx-auto">
    We offer a range of personalized services designed to help you succeed academically. Whether you&apos;re looking for a
    customized learning path, need help resolving doubts, or want to track your progress with performance analytics, we
    have the tools and expertise to guide you.
  </p>
</div>

      {/* Services Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {displayedServices.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 w-full max-w-[90%] mx-auto"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 rounded-full">{service.icon}</div>
              <h2 className="text-2xl font-semibold text-gray-800">{service.title}</h2>
            </div>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {!showAll && (
        <div className="text-center mt-6 relative z-10">
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
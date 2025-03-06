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
  FaStar,
  FaFire,
  FaGem,
} from 'react-icons/fa';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string; // Optional badge for highlighting special services
}

const services: Service[] = [
  {
    id: 10,
    title: 'Time Management Tools',
    description: 'Master your schedule with smart tools to boost productivity and keep you on track!',
    icon: <FaClock className="w-10 h-10 text-blue-600" />,
    badge: 'Top Pick',
  },
  {
    id: 11,
    title: 'Focus & Productivity Boosters',
    description: 'Stay laser-focused with techniques and timers to crush distractions.',
    icon: <FaBrain className="w-10 h-10 text-green-600" />,
  },
  {
    id: 12,
    title: 'Task Management',
    description: 'Organize tasks like a pro and never miss a deadline again!',
    icon: <FaTasks className="w-10 h-10 text-purple-600" />,
  },
  {
    id: 1,
    title: 'Personalized Learning Path',
    description: 'Your custom roadmap to success, tailored just for you!',
    icon: <FaBookOpen className="w-10 h-10 text-blue-600" />,
    badge: 'Student Favorite',
  },
  {
    id: 2,
    title: 'Instant Doubt Resolution',
    description: 'Confused? Get expert help in a snap to conquer tough topics!',
    icon: <FaQuestionCircle className="w-10 h-10 text-green-600" />,
  },
  {
    id: 3,
    title: 'Smart Quizzes & Tests',
    description: 'Challenge yourself with fun, adaptive quizzes to level up your skills.',
    icon: <FaChartLine className="w-10 h-10 text-purple-600" />,
  },
  {
    id: 4,
    title: 'Progress Tracking',
    description: 'See your growth with cool analytics – know your strengths and smash your weaknesses!',
    icon: <FaChartLine className="w-10 h-10 text-yellow-600" />,
  },
  {
    id: 5,
    title: 'Video Summaries',
    description: 'Quick video recaps to learn fast and ace your revision.',
    icon: <FaVideo className="w-10 h-10 text-pink-600" />,
  },
  {
    id: 6,
    title: 'Exam Strategy Hacks',
    description: 'Pro tips to dominate exams – from time hacks to smart prep.',
    icon: <FaLightbulb className="w-10 h-10 text-indigo-600" />,
    badge: 'Game Changer',
  },
  {
    id: 7,
    title: 'Study Squads',
    description: 'Team up with study buddies for epic group learning vibes!',
    icon: <FaUsers className="w-10 h-10 text-red-600" />,
  },
  {
    id: 8,
    title: 'Smart Notes & Flashcards',
    description: 'Make notes and flashcards that stick – perfect for quick cramming!',
    icon: <FaStickyNote className="w-10 h-10 text-teal-600" />,
  },
  {
    id: 9,
    title: 'Syllabus & Book Downloads',
    description: 'Grab syllabi and books for JEE/NEET – everything you need in one click!',
    icon: <FaDownload className="w-10 h-10 text-orange-600" />,
  },
];

const Services: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedServices = showAll ? services : services.slice(0, 6);

  return (
    <div
      className="bg-gradient-to-br from-[#1E1E2F] to-[#28282B] text-white py-16 px-6 w-full rounded-xl mt-5 relative overflow-hidden shadow-2xl"
      id="services"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <FaStar className="absolute top-10 right-20 text-yellow-400 w-6 h-6 animate-twinkle" />
        <FaFire className="absolute bottom-20 left-10 text-orange-500 w-8 h-8 animate-bounce" />
      </div>

      {/* Header Section */}
      <div className="text-center mb-12 relative z-10">
        <div className="relative flex justify-center items-center mb-8">
          <FaRocket className="w-12 h-12 text-blue-500 absolute -top-10 -left-12 animate-float" />
          <FaGem className="w-10 h-10 text-indigo-500 absolute -top-14 right-10 animate-float-delay" />
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full shadow-lg animate-pulse-slow">
            <FaBookOpen className="w-16 h-16 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Level Up Your Study Game
        </h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-300">
          Unlock a world of tools and tricks to ace your studies – from personalized paths to epic exam hacks, we’ve got your back!
        </p>
      </div>

      {/* Services Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {displayedServices.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 w-full max-w-[90%] mx-auto group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full group-hover:animate-spin-slow">
                {service.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600">{service.title}</h2>
                {service.badge && (
                  <span className="text-xs font-semibold text-white bg-blue-500 px-2 py-1 rounded-full">
                    {service.badge}
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-700 group-hover:text-gray-900">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {!showAll && (
        <div className="text-center mt-10 relative z-10">
          <button
            onClick={() => setShowAll(true)}
            className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-full text-lg font-bold transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none"
          >
            <span>Unlock More Awesomeness</span>
            <ChevronDownIcon className="w-6 h-6 ml-2 animate-bounce" />
          </button>
        </div>
      )}
    </div>
  );
};



export default Services;
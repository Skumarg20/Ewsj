'use client';

import { useState } from 'react';
import { FaRocket, FaCalendar, FaBullseye, FaPen, FaRegCalendarCheck, FaTasks, FaBullhorn, FaStar, FaMagic } from 'react-icons/fa';
import { motion } from 'framer-motion';
import WeeklyForm from '@/components/studyplan/weekly';
import TargetedForm from '@/components/studyplan/targetedplan';
import CustomForm from '@/components/studyplan/customstudyplan';

const StudyPlan = () => {
  const [activePlan, setActivePlan] = useState<string | null>(null);

  const planButtons = [
    {
      id: 'weekly',
      title: 'Weekly Planner',
      subtitle: 'Organize your weekly goals',
      icon: <FaRegCalendarCheck />,
      secondaryIcon: <FaTasks />,
      color: 'from-blue-500 to-purple-500',
      emoji: '📅'
    },
    {
      id: 'targeted',
      title: 'Targeted Goals',
      subtitle: 'Focus on specific objectives',
      icon: <FaBullseye />,
      secondaryIcon: <FaBullhorn />,
      color: 'from-green-500 to-teal-500',
      emoji: '🎯'
    },
    {
      id: 'custom',
      title: 'Custom Plan',
      subtitle: 'Create your own schedule',
      icon: <FaPen />,
      secondaryIcon: <FaMagic />,
      color: 'from-purple-500 to-pink-500',
      emoji: '✨'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Motivational Card */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="bg-white p-8 rounded-2xl shadow-xl mb-12 text-center border-l-4 border-blue-500 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2 text-yellow-400 text-2xl">
            <FaStar className="animate-spin-slow" />
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <FaRocket className="text-4xl text-blue-500 transform rotate-45" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Launch Your Learning Journey!
            </h2>
          </div>
          <p className="text-gray-600 text-lg italic">
            "The future belongs to those who prepare for it today." – Malcolm X
          </p>
          <div className="mt-4 flex justify-center gap-2 text-2xl">
            {['🚀', '📚', '🎓', '💡'].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Plan Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {planButtons.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative cursor-pointer"
              onClick={() => setActivePlan(plan.id)}
            >
              <div className={`bg-gradient-to-br ${plan.color} p-1 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl`}>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center h-full">
                  <div className="flex justify-center gap-3 text-4xl mb-4 text-white">
                    {plan.icon}
                    {plan.secondaryIcon}
                  </div>
                  <div className="text-white font-bold text-xl mb-2">
                    {plan.title}
                  </div>
                  <div className="text-white/80 text-sm mb-4">
                    {plan.subtitle}
                  </div>
                  <div className="text-3xl">
                    {plan.emoji}
                  </div>
                  <div className="absolute bottom-2 right-2 text-white/20 text-2xl">
                    <FaStar />
                  </div>
                </div>
              </div>
              {activePlan === plan.id && (
                <motion.div
                  className="absolute -top-2 -right-2 text-yellow-400 text-xl"
                  animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ⭐
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Render Selected Form */}
        <motion.div
          key={activePlan || 'empty'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activePlan === 'weekly' && <WeeklyForm />}
          {activePlan === 'targeted' && <TargetedForm />}
          {activePlan === 'custom' && <CustomForm />}
        </motion.div>
      </div>
    </div>
  );
};

export default StudyPlan;
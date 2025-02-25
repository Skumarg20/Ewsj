'use client';

import { useState } from 'react';
import { FaSpinner, FaBook, FaThLarge, FaClock, FaGraduationCap, FaRegSmileBeam, FaRocket, FaTimes, FaChartLine, FaCalendarCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface formData{
  target:string[];
  exam:string;
  chapters:string[];
  dailyHours:number;
  studentType:string;
}
interface WeeklyFormProps {
  onSubmit: (formData: formData) => void;
}
const WeeklyForm = ({onSubmit}:WeeklyFormProps) => {
  const [formData, setFormData] = useState({
    target: '',
    exam: '',
    chapters: '',
    dailyHours: 3,
    studentType: 'school',
  });
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const processedData: formData = {
      target: formData.target.split('\n').filter(t => t.trim()),
      exam: formData.exam,
      chapters: formData.chapters.split('\n').filter(c => c.trim()),
      dailyHours: formData.dailyHours,
      studentType: formData.studentType
    };
    console.log(processedData,"this is data i am sending to form");
    onSubmit(processedData);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 z-10 hover:shadow-blue-500/30 transition-all"
      >
        <FaRocket className="text-lg animate-bounce" />
        <span className="font-bold">🚀 Weekly Planner</span>
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black px-2 rounded-full text-xs font-bold animate-bounce">
          NEW!
        </div>
      </motion.button>

      {/* Popup Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border-2 border-blue-100 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-blue-500 hover:text-blue-700 transition-colors"
              >
                <FaTimes className="text-2xl" />
              </motion.button>

              {/* Header */}
              <div className="text-center mb-8 relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl"
                  >
                    📅
                  </motion.div>
                </div>
                <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl mb-4 shadow-lg">
                  <FaCalendarCheck className="text-4xl text-white animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Weekly Success Planner
                </h3>
                <p className="text-gray-600 mt-2 flex items-center justify-center gap-2">
                  <FaRegSmileBeam className="text-yellow-400 animate-bounce" />
                  <span className="bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-full">
                    "Consistency is the key to mastery!"
                  </span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Target Exam Input */}
                <motion.div whileHover={{ scale: 1.01 }}>
                  <div className="relative group">
                    <FaThLarge className="absolute top-4 left-3 text-blue-500" />
                    <input
                      placeholder="🎯 Target Exam (e.g., JEE Mains 2024)"
                      value={formData.exam}
                      onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all bg-white text-gray-800 font-medium shadow-sm hover:shadow-blue-100"
                    />
                  </div>
                </motion.div>

                {/* Weekly Goals */}
                <motion.div whileHover={{ scale: 1.01 }}>
                  <div className="relative group">
                    <FaThLarge className="absolute top-4 left-3 text-blue-500" />
                    <textarea
                      placeholder="📌 Weekly Targets (one per line)\n• Complete Motion chapter\n• Solve 10 practice problems daily"
                      value={formData.target}
                      onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none min-h-[120px] bg-white text-gray-800 font-medium shadow-sm hover:shadow-blue-100"
                    />
                  </div>
                </motion.div>

                {/* Chapters Input */}
                <motion.div whileHover={{ scale: 1.01 }}>
                  <div className="relative group">
                    <FaBook className="absolute top-4 left-3 text-blue-500" />
                    <textarea
                      placeholder="📚 Chapters to Cover (one per line)\n• Motion\n• Energy\n• Thermodynamics"
                      value={formData.chapters}
                      onChange={(e) => setFormData({ ...formData, chapters: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none min-h-[100px] bg-white text-gray-800 font-medium shadow-sm hover:shadow-blue-100"
                    />
                  </div>
                </motion.div>

                {/* Bottom Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Daily Hours Input */}
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <div className="relative group">
                      <FaClock className="absolute top-3 left-3 text-blue-500" />
                      <input
                        type="number"
                        min="1"
                        max="12"
                        placeholder="⏳ Daily Study Hours"
                        value={formData.dailyHours}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          dailyHours: Math.min(12, Math.max(1, parseInt(e.target.value)) || 3)
                        })}
                        className="w-full pl-10 pr-4 py-3 border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all bg-white text-gray-800 font-medium shadow-sm hover:shadow-blue-100"
                      />
                    </div>
                  </motion.div>

                  {/* Student Type Select */}
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <div className="relative group">
                      <FaGraduationCap className="absolute top-3 left-3 text-blue-500" />
                      <select
                        value={formData.studentType}
                        onChange={(e) => setFormData({ ...formData, studentType: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all appearance-none bg-white text-gray-800 font-medium shadow-sm hover:shadow-blue-100"
                      >
                        <option value="school">🎒 School Student</option>
                        <option value="dropper">📚 Full-time Learner</option>
                        <option value="working">💼 Working Professional</option>
                      </select>
                    </div>
                  </motion.div>
                </div>
              </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin text-xl" />
                      <span>Building Perfect Plan...</span>
                    </>
                  ) : (
                    <>
                      <FaRocket className="text-xl animate-bounce" />
                      <span className="text-shadow">Launch Weekly Strategy</span>
                      <div className="absolute right-4 text-xl">🚀</div>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Generated Plan */}
              {plan && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-4 text-blue-700">
                    <FaChartLine className="text-2xl animate-pulse" />
                    <h4 className="text-xl font-bold">Success Blueprint</h4>
                  </div>
                  <div className="space-y-3">
                    {plan.split('\n').map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        className="flex items-start gap-2 p-3 bg-white rounded-lg shadow-sm border border-blue-100"
                      >
                        <div className="text-blue-500 pt-1">
                          {index % 3 === 0 ? '📅' : index % 3 === 1 ? '✅' : '📘'}
                        </div>
                        <span className="font-medium text-gray-700">{line}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-blue-600">
                    <FaRegSmileBeam className="animate-spin" />
                    <span className="font-medium">Success Probability: 95% 🎉</span>
                  </div>
                </motion.div>
              )}

              {/* Motivational Footer */}
              <div className="mt-8 text-center text-sm text-gray-600 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                  <FaRegSmileBeam className="text-yellow-500" />
                  <span>"Small steps lead to big achievements! 💪</span>
                </div>
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="text-2xl"
                >
                  🏆
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WeeklyForm;
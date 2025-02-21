'use client';

import { useState } from 'react';
import { 
  FaSpinner, FaCalendarDay, FaBullseye, FaBook, FaClock, FaCheck, 
  FaRegSmileBeam, FaRocket, FaTimes, FaChartLine, FaTrophy 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const TargetedForm = () => {
  const [formData, setFormData] = useState({
    dueDate: '',
    target: '',
    chapters: '',
    dailyHours: '',
    hasOtherTimetable: 'no',
  });
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post('http://localhost:3000/api/targeted-plan', formData);
    setPlan(response.data.plan);
    setLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-32 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 z-10 hover:shadow-green-500/30 transition-all"
      >
        <FaBullseye className="text-lg animate-pulse" />
        <span className="font-bold">🎯 Create Target Plan</span>
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
              className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border-2 border-emerald-100 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-emerald-500 hover:text-emerald-700 transition-colors"
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
                    🚩
                  </motion.div>
                </div>
                <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-2xl mb-4 shadow-lg">
                  <FaBullseye className="text-4xl text-white animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Precision Study Strategist
                </h3>
                <p className="text-gray-600 mt-2 flex items-center justify-center gap-2">
                  <FaRegSmileBeam className="text-yellow-400 animate-bounce" />
                  <span className="bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-full">
                    "Conquer your goals with military precision!"
                  </span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Date Input */}
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="relative group">
                      <FaCalendarDay className="absolute top-3 left-3 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all bg-white text-gray-800 font-medium shadow-sm hover:shadow-emerald-100"
                      />
                      <div className="absolute right-3 top-3 text-emerald-300">
                        📅
                      </div>
                    </div>
                  </motion.div>

                  {/* Target Input */}
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="relative group">
                      <FaBullseye className="absolute top-3 left-3 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                      <input
                        type="text"
                        placeholder="Primary Target/Goal"
                        value={formData.target}
                        onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all bg-white text-gray-800 font-medium shadow-sm hover:shadow-emerald-100"
                      />
                      <div className="absolute right-3 top-3 text-emerald-300">
                        🎯
                      </div>
                    </div>
                  </motion.div>

                  {/* Chapters Textarea */}
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="relative group">
                      <FaBook className="absolute top-3 left-3 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                      <textarea
                        placeholder="Key Chapters/Topics (comma separated)\nExample: Algebra, Organic Chemistry, World History"
                        value={formData.chapters}
                        onChange={(e) => setFormData({ ...formData, chapters: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all resize-none min-h-[120px] bg-white text-gray-800 font-medium shadow-sm hover:shadow-emerald-100"
                      />
                      <div className="absolute right-3 top-3 text-emerald-300">
                        📚
                      </div>
                    </div>
                  </motion.div>

                  {/* Bottom Row */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Daily Hours */}
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <div className="relative group">
                        <FaClock className="absolute top-3 left-3 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                        <input
                          type="number"
                          placeholder="🕒 Daily Hours"
                          value={formData.dailyHours}
                          onChange={(e) => setFormData({ ...formData, dailyHours: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all bg-white text-gray-800 font-medium shadow-sm hover:shadow-emerald-100"
                        />
                      </div>
                    </motion.div>

                    {/* Schedule Select */}
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <div className="relative group">
                        <FaCheck className="absolute top-3 left-3 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                        <select
                          value={formData.hasOtherTimetable}
                          onChange={(e) => setFormData({ ...formData, hasOtherTimetable: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all appearance-none bg-white text-gray-800 font-medium shadow-sm hover:shadow-emerald-100"
                        >
                          <option value="no">🚀 Fresh Start</option>
                          <option value="yes">📅 Existing Schedule</option>
                        </select>
                        <div className="absolute right-3 top-3 text-emerald-300">
                          ⚡
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(16, 185, 129, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin text-xl" />
                      <span>Calculating Best Strategy...</span>
                    </>
                  ) : (
                    <>
                      <FaRocket className="text-xl animate-bounce" />
                      <span className="text-shadow">Launch Mission Plan</span>
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
                  className="mt-8 p-6 bg-emerald-50 rounded-xl border-2 border-emerald-200 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-4 text-emerald-700">
                    <FaTrophy className="text-2xl animate-bounce" />
                    <h4 className="text-xl font-bold">Victory Blueprint</h4>
                  </div>
                  <div className="space-y-3">
                    {plan.split('\n').map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        className="flex items-start gap-2 p-3 bg-white rounded-lg shadow-sm border border-emerald-100"
                      >
                        <div className="text-emerald-500 pt-1">
                          {index % 3 === 0 ? '📌' : index % 3 === 1 ? '✅' : '📅'}
                        </div>
                        <span className="font-medium text-gray-700">{line}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-emerald-600">
                    <FaChartLine className="animate-pulse" />
                    <span className="font-medium">Projected Success Rate: 98% 🎉</span>
                  </div>
                </motion.div>
              )}

              {/* Motivational Footer */}
              <div className="mt-8 text-center text-sm text-gray-600 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full">
                  <FaRegSmileBeam className="text-yellow-500" />
                  <span>"Success is the only option! 💪</span>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
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

export default TargetedForm;
"use client";

import { useState } from "react";
import {
  FaSpinner,
  FaCalendarDay,
  FaBook,
  FaClock,
  FaCheck,
  FaRegSmileBeam,
  FaRocket,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface TargetPlanData {
  dailyPlan: string[];
  subjects: string[];
  dueDate: string;
  chapters: string[];
  dailyHours: number;
  existingCommitments: boolean;
  milestones: string[];
}

interface TargetFormProps {
  onSubmit: (formData: TargetPlanData) => void;
  isGenerating: boolean; 
}

const TargetedForm = ({ onSubmit, isGenerating }: TargetFormProps) => {
  const [formData, setFormData] = useState<TargetPlanData>({
    dailyPlan: [],
    subjects: [],
    dueDate: "",
    chapters: [],
    dailyHours: 0,
    existingCommitments: false,
    milestones: [],
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isGenerating) return;

    const submitData: TargetPlanData = {
      ...formData,
      subjects: formData.subjects[0]?.split(",").map((item) => item.trim()).filter(Boolean) || [],
      chapters: formData.chapters[0]?.split(",").map((item) => item.trim()).filter(Boolean) || [],
      milestones: formData.milestones[0]?.split(",").map((item) => item.trim()).filter(Boolean) || [],
      dueDate: new Date(formData.dueDate).toISOString(),
    };

    onSubmit(submitData);
  };

  const handleInputChange =
    (field: keyof TargetPlanData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [field]: [e.target.value] });
    };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, dailyHours: parseInt(e.target.value) || 0 });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, existingCommitments: e.target.value === "yes" });
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-32 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 z-10 hover:shadow-green-500/30 transition-all"
      >
        <FaRocket className="text-lg animate-pulse" />
        <span className="font-bold">🎯 Create Target Plan</span>
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black px-2 rounded-full text-xs font-bold animate-bounce">
          NEW!
        </div>
      </motion.button>

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
              className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full h-screen border-2 border-emerald-100 custom-scrollbar overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-emerald-500 hover:text-emerald-700 transition-colors"
              >
                <FaTimes className="text-2xl" />
              </motion.button>

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
                  <FaRocket className="text-4xl text-white animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Targeted Study Planner
                </h3>
                <p className="text-gray-600 mt-2 flex items-center justify-center gap-2">
                  <FaRegSmileBeam className="text-yellow-400 animate-bounce" />
                  <span className="bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-full">
                  &quot;Hit your goals with precision!&quot;
                  </span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="relative group">
                      <FaCalendarDay className="absolute top-3 left-3 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all bg-white text-gray-800 font-medium shadow-sm hover:shadow-emerald-100"
                        required
                      />
                      <div className="absolute right-3 top-3 text-emerald-300">📅</div>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="relative group">
                      <FaBook className="absolute top-3 left-3 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                      <input
                        type="text"
                        placeholder="Subjects (comma separated)"
                        value={formData.subjects[0] || ""}
                        onChange={handleInputChange("subjects")}
                        className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all bg-white text-gray-800 font-medium shadow-sm hover:shadow-emerald-100"
                        required
                      />
                      <div className="absolute right-3 top-3 text-emerald-300">📚</div>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="relative group">
                      <FaBook className="absolute top-3 left-3 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                      <textarea
                        placeholder="Chapters (comma separated)"
                        value={formData.chapters[0] || ""}
                        onChange={handleInputChange("chapters")}
                        className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all resize-none min-h-[100px] bg-white text-gray-800 font-medium shadow-sm hover:shadow-emerald-100"
                        required
                      />
                      <div className="absolute right-3 top-3 text-emerald-300">📖</div>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="relative group">
                      <FaRocket className="absolute top-3 left-3 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                      <textarea
                        placeholder="Milestones (comma separated)"
                        value={formData.milestones[0] || ""}
                        onChange={handleInputChange("milestones")}
                        className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all resize-none min-h-[100px] bg-white text-gray-800 font-medium shadow-sm hover:shadow-emerald-100"
                        required
                      />
                      <div className="absolute right-3 top-3 text-emerald-300">🎯</div>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <div className="relative group">
                      <FaClock className="absolute top-3 left-3 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                      <input
                        type="number"
                        placeholder="Daily Hours"
                        value={formData.dailyHours || ""}
                        onChange={handleNumberChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all bg-white text-gray-800 font-medium shadow-sm hover:shadow-emerald-100"
                        min="1"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <div className="relative group">
                      <FaCheck className="absolute top-3 left-3 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                      <select
                        value={formData.existingCommitments ? "yes" : "no"}
                        onChange={handleSelectChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all appearance-none bg-white text-gray-800 font-medium shadow-sm hover:shadow-emerald-100"
                      >
                        <option value="no">No Existing Commitments</option>
                        <option value="yes">Has Existing Commitments</option>
                      </select>
                      <div className="absolute right-3 top-3 text-emerald-300">⚡</div>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(16, 185, 129, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isGenerating}
                  className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all relative overflow-hidden ${
                    isGenerating ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                  {isGenerating ? (
                    <>
                      <FaSpinner className="animate-spin text-xl" />
                      <span>Generating Plan...</span>
                    </>
                  ) : (
                    <>
                      <FaRocket className="text-xl animate-bounce" />
                      <span className="text-shadow">Create Target Plan</span>
                      <div className="absolute right-4 text-xl">🚀</div>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TargetedForm;
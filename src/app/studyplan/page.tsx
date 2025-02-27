"use client";

import { useState } from "react";
import {
  FaRocket,
  FaBullseye,
  FaPen,
  FaRegCalendarCheck,
  FaTasks,
  FaBullhorn,
  FaStar,
  FaMagic,
  FaSpinner,
  FaBookOpen,
} from "react-icons/fa";
import { motion } from "framer-motion";
import WeeklyForm from "@/components/studyplan/weekly";
import TargetedForm from "@/components/studyplan/targetedplan";
import CustomForm from "@/components/studyplan/customstudyplan";
import { useWeeklyStudyPlanStore, useTargetStudyPlanStore } from "@/state/store/studyplanstore";
import axios from "axios";
import { WeeklyStudyPlan, targetedStudyPlan, TargetPlanData } from "@/interface/studyPlan";
import { getAuthHeader } from "@/lib/api";
import WeeklyStudyDashboard from "./weeklystudyplan";
import TargetedStudyDashboard from "@/components/studyplan/targetStudyPlanDashBoard";

interface FormData {
  target: string[];
  exam: string;
  chapters: string[];
  dailyHours: number;
  studentType: string;
}

const StudyPlan = () => {
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<string | null>(null); // "weekly" or "targeted" to track which plan to show
  const [generatedPlan, setGeneratedPlan] = useState<WeeklyStudyPlan | null>(null);
  const [generatedTargetPlan, setGeneratedTargetPlan] = useState<targetedStudyPlan | null>(null);
  // const [isGenerating, setIsGenerating] = useState(false);
  const [isFromGenerated, setIsFromGenerated] = useState(false); // Controls "Save" button visibility
  const { targetPlan, targetloading, targeterror, getTargetPlan, postTargetPlan } = useTargetStudyPlanStore();
  const { weeklyPlan, loading, error, getWeeklyPlan, postWeeklyPlan } = useWeeklyStudyPlanStore();

  const planButtons = [
    {
      id: "weekly",
      title: "Weekly Planner",
      subtitle: "Organize your weekly goals",
      icon: <FaRegCalendarCheck />,
      secondaryIcon: <FaTasks />,
      color: "from-blue-500 to-purple-500",
      emoji: "📅",
    },
    {
      id: "targeted",
      title: "Targeted Goals",
      subtitle: "Focus on specific objectives",
      icon: <FaBullseye />,
      secondaryIcon: <FaBullhorn />,
      color: "from-green-500 to-teal-500",
      emoji: "🎯",
    },
    {
      id: "custom",
      title: "Custom Plan",
      subtitle: "Create your own schedule",
      icon: <FaPen />,
      secondaryIcon: <FaMagic />,
      color: "from-purple-500 to-pink-500",
      emoji: "✨",
    },
  ];

  const handleGenerateWeeklyPlan = async (formData: FormData) => {
    // setIsGenerating(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/study-plan/generate`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
        }
      );
      console.log(response, "this is response");

      const rawData = response.data?.data || response.data;
      console.log(rawData, "this is raw data");

      let generatedData: WeeklyStudyPlan;

      if (typeof rawData === "string") {
        const cleanData = rawData.replace(/```json\n|\n```/g, "");
        console.log(cleanData, "this is cleaned data");
        generatedData = JSON.parse(cleanData);
      } else if (rawData && typeof rawData === "object") {
        generatedData = rawData as WeeklyStudyPlan;
      } else {
        throw new Error("Invalid response data format");
      }

      console.log(generatedData, "this is generated data");
      setGeneratedPlan(generatedData);
      setGeneratedTargetPlan(null); // Clear target plan to avoid overlap
      setIsFromGenerated(true);
      setShowPopup("weekly");
    } catch (err) {
      console.error("Error generating weekly plan:", err);
      alert("Failed to generate weekly plan. Please try again.");
    } finally {
      // setIsGenerating(false);
    }
  };

  const handleGenerateTargetPlan = async (formData: TargetPlanData) => {
    try {
      // setIsGenerating(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/study-plan/generate-targetplan`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
        }
      );
      console.log(response, "this is response");

      const rawData = response.data?.data || response.data;
      console.log(rawData, "this is raw data");

      let generatedData: targetedStudyPlan;

      if (typeof rawData === "string") {
        const cleanData = rawData.replace(/```json\n|\n```/g, "");
        console.log(cleanData, "this is cleaned data");
        generatedData = JSON.parse(cleanData);
      } else if (rawData && typeof rawData === "object") {
        generatedData = rawData as targetedStudyPlan;
      } else {
        throw new Error("Invalid response data format");
      }

      console.log(generatedData, "this is generated data");
      setGeneratedTargetPlan(generatedData);
      setGeneratedPlan(null); // Clear weekly plan to avoid overlap
      setIsFromGenerated(true);
      setShowPopup("targeted");
    } catch (err) {
      console.error("Error generating target plan:", err);
      alert("Failed to generate target plan. Please try again.");
    } finally {
      // setIsGenerating(false);
    }
  };

  const handleSaveTargetPlan = async () => {
    if (generatedTargetPlan) {
      console.log(generatedTargetPlan, "this is the data following");
      await postTargetPlan(generatedTargetPlan);
      if (!targeterror) {
        setShowPopup(null);
        setIsFromGenerated(false);
        alert("Target plan saved successfully!");
      } else {
        alert("Failed to save target plan: " + targeterror);
      }
    }
  };

  const handleViewTargetPlan = async () => {
    await getTargetPlan();
    console.log(targetPlan, "this is target plan I am getting");
    if (!targeterror && targetPlan) {
      setGeneratedTargetPlan(targetPlan);
      setGeneratedPlan(null); // Clear weekly plan to avoid overlap
      setIsFromGenerated(false);
      setShowPopup("targeted");
    } else {
      alert("Failed to fetch latest target plan: " + (targeterror || "No plan available"));
    }
  };

  const handleSavePlan = async () => {
    if (generatedPlan) {
      console.log(generatedPlan, "this is the data following");
      await postWeeklyPlan(generatedPlan);
      if (!error) {
        setShowPopup(null);
        setIsFromGenerated(false);
        alert("Weekly plan saved successfully!");
      } else {
        alert("Failed to save weekly plan: " + error);
      }
    }
  };

  const handleViewLatestPlan = async () => {
    await getWeeklyPlan();
    console.log(weeklyPlan, "this is weekly plan I am getting");
    if (!error && weeklyPlan) {
      setGeneratedPlan(weeklyPlan);
      setGeneratedTargetPlan(null); // Clear target plan to avoid overlap
      setIsFromGenerated(false);
      setShowPopup("weekly");
    } else {
      alert("Failed to fetch latest weekly plan: " + (error || "No plan available"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Motivational Card */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
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
            {["🚀", "📚", "🎓", "💡"].map((emoji, i) => (
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
              transition={{ type: "spring", stiffness: 300 }}
              className="relative cursor-pointer"
              onClick={() => setActivePlan(plan.id)}
            >
              <div
                className={`bg-gradient-to-br ${plan.color} p-1 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl`}
              >
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
                  <div className="text-3xl">{plan.emoji}</div>
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
          key={activePlan || "empty"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activePlan === "weekly" && (
            <WeeklyForm onSubmit={handleGenerateWeeklyPlan} />
          )}
          {activePlan === "targeted" && <TargetedForm onSubmit={handleGenerateTargetPlan} />}
          {activePlan === "custom" && <CustomForm />}
          <div className="flex gap-4 mt-4">
            <motion.button
              onClick={handleViewLatestPlan}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 255, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <FaBookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span className="text-sm sm:text-base">
                {loading ? "Fetching..." : "View Latest Weekly Plan"}
              </span>
            </motion.button>
            <motion.button
              onClick={handleViewTargetPlan}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(0, 255, 0, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              disabled={targetloading}
            >
              {targetloading ? (
                <FaSpinner className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <FaBookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span className="text-sm sm:text-base">
                {targetloading ? "Fetching..." : "View Latest Target Plan"}
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Popup for Weekly Plan */}
        {showPopup === "weekly" && generatedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center custom-scrollbar"
            onClick={() => setShowPopup(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full h-full flex flex-col bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
             
              <div className="flex-1 overflow-auto p-6">
                <WeeklyStudyDashboard data={generatedPlan} />
              </div>
              <div className="flex justify-end gap-2 p-3 border-t bg-gray-50">
                <button
                  onClick={() => setShowPopup(null)}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-800 hover:text-slate-50 hover:rounded-2xl rounded-2xl transition-colors"
                >
                  Close
                </button>
                {isFromGenerated && (
                  <button
                    onClick={handleSavePlan}
                    className="px-6 py-2 bg-green-500 text-white hover:bg-green-600 rounded-2xl transition-colors flex items-center gap-2"
                    disabled={loading}
                  >
                    {loading && <FaSpinner className="animate-spin" />}
                    {loading ? "Saving..." : "Save Plan"}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Popup for Target Plan */}
        {showPopup === "targeted" && generatedTargetPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center custom-scrollbar"
            onClick={() => setShowPopup(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full h-full flex flex-col bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 overflow-auto p-6">
                <TargetedStudyDashboard data={generatedTargetPlan} />
              </div>
              <div className="flex justify-end gap-2 p-3 border-t bg-gray-50">
                <button
                  onClick={() => setShowPopup(null)}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Close
                </button>
                {isFromGenerated && (
                  <button
                    onClick={handleSaveTargetPlan}
                    className="px-6 py-2 bg-green-500 text-white hover:bg-green-600 rounded-lg transition-colors flex items-center gap-2"
                    disabled={targetloading}
                  >
                    {targetloading && <FaSpinner className="animate-spin" />}
                    {targetloading ? "Saving..." : "Save Plan"}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudyPlan;
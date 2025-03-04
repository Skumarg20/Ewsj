'use client'
import { motion } from "framer-motion";
import { FaBook, FaRunning, FaClock, FaSchool, FaCalendarAlt } from "react-icons/fa";
import { targetedStudyPlan } from "@/interface/studyPlan";

type Props = {
  data: targetedStudyPlan;
};

const TargetedStudyDashboard = ({ data }: Props) => {
  console.log(data, "this is targeted data");
  const { dailyHours, dailyPlan, chapters, schoolSchedule, subjects, due_date } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-8 mb-8 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <FaCalendarAlt className="w-12 h-12 text-emerald-200" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Targeted Study Plan</h1>
              <p className="mt-2 opacity-90 text-emerald-100">&quot;Precision in planning leads to perfection.&quot;</p>
            </div>
          </div>
          <div className="bg-emerald-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-emerald-400/30">
            <p className="text-sm text-emerald-100">Due Date</p>
            <p className="font-semibold text-lg text-white">
              {due_date
                ? new Date(due_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Not set"}
            </p>
          </div>
        </div>
      </motion.header>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <FaClock className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Daily Hours</h3>
              <p className="text-2xl font-bold text-emerald-700">{dailyHours} hours</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-100 rounded-lg">
              <FaBook className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Subjects</h3>
              <p className="text-lg font-bold text-teal-700">{subjects?.join(", ") || "None"}</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="p-3 bg-emerald-100 rounded-lg flex-shrink-0">
              <FaRunning className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="w-full">
              <h3 className="text-gray-500 text-sm">Chapters</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {chapters.map((chapter) => (
                  <span
                    key={chapter}
                    className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm border border-emerald-200"
                  >
                    {chapter}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-100 rounded-lg">
              <FaSchool className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">School Schedule</h3>
              <p className="text-lg font-semibold text-teal-700">{schoolSchedule || "Not set"}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Daily Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {dailyPlan.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-emerald-100"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-700">{plan}</span>
              <span className="text-sm bg-emerald-200 text-emerald-800 px-2 py-1 rounded">
                Day {index + 1}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-gray-600">
        <div className="flex items-center justify-center gap-2">
          <FaRunning className="w-5 h-5 text-emerald-600" />
          <p>Stay on target! Your goals are within reach! 🎯</p>
        </div>
      </footer>
    </div>
  );
};

export default TargetedStudyDashboard;
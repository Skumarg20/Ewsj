"use client";

import { HiOutlineBookOpen } from "react-icons/hi";
import { useState } from "react";
import SessionUI from "../sessionui";
import DashBoardChat from "@/components/dashboardchat";
import ChatBuddie from "@/components/chatbuddie";
import useStudyPlanStore from "@/state/store/timetablestore";
import TodoApp from "@/components/todo";
import { motion } from "framer-motion";

const RightDashboard = () => {
  const [showChat, setShowChat] = useState(false);
  const { currentStudyPlan } = useStudyPlanStore();
  // const user=localStorage.getItem('user');
  // const fullname=JSON.parse(user)?.fullname.split(" ")[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 text-gray-900 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold mb-6 md:mb-8"
      >
        Welcome Back 🚀
      </motion.div>

      {/* Main Grid - Single Column */}
      <div className="grid grid-cols-1 gap-6">
        {/* Chat Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full flex flex-col"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {showChat ? (
             <ChatBuddie 
             onClose={() => setShowChat(false)} 
             onRateLimitExceeded={(message: string) => {
               console.error(message); 
               alert(message); 
             }} 
           />
            ) : (
              <DashBoardChat onStartChat={() => setShowChat(true)} />
            )}
          </div>
        </motion.div>

        {/* SessionUI Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex flex-col"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <SessionUI data={currentStudyPlan?.schedule} />
          </div>
          <div className="flex justify-center mt-4">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => (window.location.href = "/session")}
    className="px-6 py-3 flex items-center justify-center text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 relative overflow-hidden"
  >
    {/* Shine effect on hover */}
    <motion.div
      className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"
      style={{ borderRadius: '9999px' }}
    />

    {/* Icon and text */}
    <HiOutlineBookOpen className="w-5 h-5 mr-2" />
    <span className="font-semibold">Explore Study Sessions</span>

    {/* Animated border */}
    <motion.div
      className="absolute inset-0 border-2 border-white/20 rounded-full"
      initial={{ scale: 1 }}
      animate={{ scale: 1.1, opacity: 0 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  </motion.button>
</div>
        </motion.div>

        {/* Todo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <TodoApp />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RightDashboard;
"use client";

import { motion } from "framer-motion";
import { JSX } from "react";

interface HeaderProps {
  userPlan: string;
}

export default function Header({ userPlan }: HeaderProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-16 md:mb-24"
    >
      <div className="inline-block mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full shadow-md">
        <span className="font-semibold text-sm">Your Student Superpower</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 dark:from-indigo-300 dark:via-blue-300 dark:to-teal-200">
        Ignite Your Academic Adventure
      </h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
      >
        Pick a plan to turbocharge your studies, ace your goals, and soar to success!
      </motion.p>
      <p className="text-lg text-gray-600">Current Plan: {userPlan}</p>
    </motion.div>
  );
}
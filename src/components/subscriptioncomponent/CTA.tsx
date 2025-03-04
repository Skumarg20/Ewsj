"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { JSX } from "react";

export default function CTA(): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.8 }}
      className="mt-20 md:mt-28 text-center"
    >
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-900 dark:to-cyan-900 p-8 rounded-2xl shadow-lg border border-indigo-200 dark:border-indigo-800">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-800 dark:text-indigo-100">
          Ready to Crush Your Goals?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Join the student revolution and unlock your true potential today!</p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md"
        >
          Start Now
        </Button>
      </div>
    </motion.div>
  );
}
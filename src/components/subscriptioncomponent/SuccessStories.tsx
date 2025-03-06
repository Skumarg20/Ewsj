"use client";

import { motion } from "framer-motion";
import { SuccessStory } from "@/interface/type";
import { JSX } from "react";

interface SuccessStoriesProps {
  stories: SuccessStory[];
}

export default function SuccessStories({ stories }: SuccessStoriesProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mt-20 md:mt-28 text-center"
    >
      <div className="inline-block mb-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-1 rounded-full shadow-md">
        <span className="font-semibold text-sm">Why Students Love Us</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800 dark:text-gray-100">Real Student Wins</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {stories.map((story, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10, scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="mb-4 bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900 dark:to-teal-900 p-3 rounded-full w-fit mx-auto shadow-sm">
              {story.icon}
            </div>
            <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">{story.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{story.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
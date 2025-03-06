"use client";

import { motion } from "framer-motion";
import { JSX } from "react";

export default function Footer(): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.8 }}
      className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400"
    >
      <p>© 2025 CogeNist. Built for Student Success.</p>
    </motion.div>
  );
}
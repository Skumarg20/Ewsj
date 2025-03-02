"use client";

import { useState, useEffect, useMemo } from "react";
import { useLoading } from "./context/loadingprovider";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  const { isLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  // Memoize the loadingMessages array to avoid recreating it on every render
  const loadingMessages = useMemo(
    () => [
      "Loading resources...",
      "Optimizing performance...",
      "Fetching data...",
      "Almost there...",
      "Finalizing setup...",
    ],
    [] // Empty dependency array ensures it's only created once
  );

  useEffect(() => {
    if (isLoading) {
      setProgress(0); // Reset progress on start
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1 : 100));
        setLoadingText(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
      }, 800); // Updates every 800ms

      return () => clearInterval(interval);
    }
  }, [isLoading, loadingMessages]); // Now loadingMessages is stable

  if (!isLoading) return null;

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed items-center w-full h-3 bg-[#002D62] z-[9999]"
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.01, ease: "linear" }}
      />

      {/* Centered Spinner & Text */}
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 z-[9998]">
        <div className="w-26 h-26 border-5 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-lg mt-4">{loadingText}</p>
        <p className="text-white text-sm mt-2">{progress}%</p>
      </div>
    </>
  );
};

export default LoadingSpinner;
"use client";

import { useState, useEffect, useMemo } from "react";
import { useLoading } from "./context/loadingprovider";
import { motion } from "framer-motion";
import { FaBook, FaRocket, FaLaptopCode, FaBrain, FaStar } from "react-icons/fa";
import { IconType } from "react-icons";

const LoadingSpinner = () => {
  const { isLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Kicking things off...");
  const [currentIcon, setCurrentIcon] = useState<IconType>(FaBook);

  const loadingMessages = useMemo(
    () => [
      "Grabbing your study vibes...",
      "Powering up the brain cells...",
      "Loading epic knowledge...",
      "Getting ready to rock it...",
      "Almost time to shine...",
    ],
    []
  );

  const icons = useMemo<IconType[]>(
    () => [FaBook, FaRocket, FaLaptopCode, FaBrain, FaStar],
    []
  );

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 5 : 100));
        setLoadingText(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
        const nextIcon = icons[Math.floor(Math.random() * icons.length)];
        setCurrentIcon(() => nextIcon); // Explicitly set as a function
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isLoading, loadingMessages, icons]);

  if (!isLoading) return null;

  // Safeguard: Ensure currentIcon is a function, fallback to FaBook if not
  const IconComponent = typeof currentIcon === "function" ? currentIcon : FaBook;

  return (
    <>
      <motion.div
        className="fixed top-0 w-full h-4 z-[9999]"
        style={{
          background: "linear-gradient(90deg, #00C4FF, #FF007A, #FFD700)",
        }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.02, ease: "easeInOut" }}
      />

      <div
        className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 z-[9998]"
        role="status"
        aria-label="Loading"
      >
        <motion.div
          className="text-6xl text-white mb-6"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          <IconComponent /> {/* Render as a component */}
        </motion.div>

        <div className="w-20 h-20 border-8 border-t-transparent border-blue-400 rounded-full animate-spin relative">
          <div className="absolute inset-0 border-4 border-t-transparent border-pink-500 rounded-full animate-spin-slow"></div>
        </div>

        <motion.p
          className="text-white text-xl mt-6 font-bold drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loadingText}
        </motion.p>

        <motion.p
          className="text-yellow-300 text-lg mt-2 font-mono"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          {progress}%
        </motion.p>
      </div>
    </>
  );
};

export default LoadingSpinner;
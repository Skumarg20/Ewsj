"use client";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaQuoteLeft, FaStar, FaFireAlt } from "react-icons/fa";

const MotivationalCard = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants
  const cardFadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const bounceIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardFadeIn}
      className="w-full max-w-md mx-auto relative"
    >
      <Card className="p-8 bg-gradient-to-br from-indigo-50 via-white to-pink-50 backdrop-blur-md border border-indigo-200 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Background Flair */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 text-yellow-300 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <FaStar className="w-full h-full" />
        </motion.div>

        <div className="space-y-6 relative z-10">
          {/* Header with Icon */}
          <motion.div
            className="text-center space-y-4"
            variants={bounceIn}
            initial="hidden"
            animate="visible"
          >
            <span className="px-4 py-1 text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full inline-flex items-center gap-2">
              <FaFireAlt className="w-4 h-4 animate-pulse" />
              Daily Spark
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight flex items-center justify-center gap-2">
              <FaQuoteLeft className="w-6 h-6 text-indigo-400" />
              <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                "The Future Belongs To Dreamers"
              </span>
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed max-w-xs mx-auto">
              Success isn’t just the goal – it’s the epic journey of growth. Every step you take is a win worth celebrating!
            </p>
          </motion.div>

          {/* Founder Image and Info */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            variants={bounceIn}
            initial="hidden"
            animate="visible"
          >
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-indigo-400 shadow-lg relative">
              <Image
                src="/founderimage.png"
                alt="Founder"
                fill // Replaces width and height, fills the parent container
                className="object-cover rounded-full transition-transform duration-300 hover:rotate-6"
              />
            </div>
            <div className="text-center mt-4 space-y-1">
              <h3 className="font-semibold text-xl text-indigo-900">Sanjeev Kumar</h3>
              <p className="text-sm text-indigo-500 font-medium flex items-center justify-center gap-1">
                <FaStar className="w-4 h-4 text-yellow-400 animate-pulse" />
                Founder & Visionary
              </p>
            </div>
          </motion.div>

          {/* Footer Accent */}
          <motion.div
            className="pt-4"
            initial="hidden"
            animate="visible"
          >
            <div className="h-1 w-16 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full mx-auto" />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MotivationalCard;
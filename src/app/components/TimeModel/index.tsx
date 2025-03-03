'use client';
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Stopwatch from "../../screen/stopwatch/index";
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ClockIcon as ClockSolid } from '@heroicons/react/24/solid';
const TimerModal = () => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Reset Timer when the user leaves the dashboard
  useEffect(() => {
    const handleTabClose = () => {
      setTime(0);
      setIsRunning(false);
    };

    window.addEventListener("beforeunload", handleTabClose);
    return () => window.removeEventListener("beforeunload", handleTabClose);
  }, []);

  return (
    <>
      {/* Button to Open Modal */}
      <motion.div
  className="fixed bottom-8 right-8 z-30 group"
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: 'spring', stiffness: 200 }}
>
  <motion.button
    onClick={() => setOpen(true)}
    whileHover={{ 
      scale: 1.1,
      rotate: 15,
      background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)'
    }}
    whileTap={{ scale: 0.9 }}
    className="p-4 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full shadow-2xl 
              hover:shadow-3xl backdrop-blur-sm transition-all duration-300 relative
              overflow-hidden"
  >
    {/* Animated Background Ring */}
    <motion.div
      className="absolute inset-0 border-2 border-white/20 rounded-full"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
    
    {/* Floating Particles */}
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -40, 0],
            x: [0, Math.random() * 40 - 20, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3
          }}
        />
      ))}
    </div>

    {/* Animated Icon */}
    <motion.div
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <ClockSolid className="w-8 h-8 text-white transform group-hover:scale-110 transition-transform" />
    </motion.div>

    {/* Plus Badge */}
    <motion.div
      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-sm"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ rotate: 90 }}
    >
      <PlusIcon className="w-4 h-4" />
    </motion.div>
  </motion.button>

  {/* Hover Tooltip */}
  <motion.div
    className="absolute right-20 -top-2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm 
             opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
    initial={{ x: 20 }}
  >
    Open Timer
    <div className="absolute right-0 w-2 h-2 bg-gray-800 rotate-45 -mr-1 top-3" />
  </motion.div>
</motion.div>

      {/* Timer Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen disableScrollLock>
        {/* Close Button - Fixed on Top with High z-index */}
        <div className="absolute top-4 right-4 z-50">
          <IconButton onClick={() => setOpen(false)} className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full">
            <XMarkIcon className="w-6 h-6 text-white" />
          </IconButton>
        </div>

        {/* Stopwatch Component with Controlled State */}
        <DialogContent className="relative">
          <Stopwatch time={time} setTime={setTime} isRunning={isRunning} setIsRunning={setIsRunning} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TimerModal;

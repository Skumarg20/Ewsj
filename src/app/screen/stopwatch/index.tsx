'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaStop, FaRedoAlt, FaHourglass } from 'react-icons/fa';

type TimerProps = {
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
    isRunning: boolean;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
};

// type TimeObject = {
//     hours: number,
//     minutes: number,
//     seconds: number
// };

export default function Stopwatch({ time, setTime, isRunning, setIsRunning }: TimerProps) {
    // const [hours, setHours] = useState(0);
    const hours = 0
    // const [minutes, setMinutes] = useState(0);
    const minutes = 0
    const seconds = 0
    // const [seconds, setSeconds] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isTimerMode, setTimerMode] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning) {
            timer = setInterval(() => {
                setTime(prev => {
                    if (isTimerMode) {
                        const newTime = prev - 1000;
                        if (newTime <= 0) {
                            setIsRunning(false);
                            return 0;
                        }
                        return newTime;
                    }
                    return prev + 1000;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, setIsRunning]);

    const formatTime = (time: number) => {
        const seconds = Math.floor(time / 1000) % 60;
        const minutes = Math.floor(time / 60000) % 60;
        const hours = Math.floor(time / 3600000);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
        setTime(totalMilliseconds);
        setTimerMode(true);
        setIsRunning(true);
        setIsVisible(false);
    };

    const toggleFormAndTimer = () => {
        setIsVisible(!isVisible);
      
    };

    return (
        <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 text-gray-800 p-8 rounded-3xl shadow-2xl h-full w-full overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full blur-xl opacity-30"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-24 h-24 bg-purple-200 rounded-full blur-xl opacity-30"
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
      
        {/* Timer Display */}
        <motion.div 
          className="w-full h-[60%] flex items-center justify-center text-[22vw] font-bold leading-none bg-white/20 backdrop-blur-sm rounded-2xl mb-6"
          animate={{ scale: isRunning ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.span
            className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {formatTime(time)}
          </motion.span>
        </motion.div>
      
        {isVisible && (
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-4 w-full max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex gap-3 justify-center">
              {['hours', 'minutes', 'seconds'].map((type) => (
                <motion.div 
                  key={type}
                  className="flex items-center space-x-1"
                  whileHover={{ y: -3 }}
                >
                  <motion.input
                    type="number"
                    name={type}
                    value={eval(type)} // Note: Consider using a safer approach than eval
                    onChange={(e) => {
                      const value = Math.max(0, parseInt(e.target.value) || 0);
                      if(type === 'minutes' || type === 'seconds') {
                        eval(`set${type.charAt(0).toUpperCase() + type.slice(1)}(Math.min(59, ${value}))`);
                      } else {
                        eval(`set${type.charAt(0).toUpperCase() + type.slice(1)}(${value})`);
                      }
                    }}
                    className={`w-16 px-1 py-2 border-2 rounded-3xl text-center font-bold transition-all ${
                      eval(type) > 0 
                        ? "text-blue-600 border-blue-400 bg-blue-50" 
                        : "text-gray-700 border-blue-200 bg-white"
                    }`}
                    min="0"
                    max={type !== 'hours' ? "59" : undefined}
                    placeholder="0"
                    disabled={isRunning}
                  />
                  <span className={`text-sm font-semibold ${
                    eval(type) > 0 ? "text-blue-600" : "text-gray-600"
                  }`}>
                    {type.charAt(0)}
                  </span>
                </motion.div>
              ))}
            </div>
      
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-lg rounded-3xl shadow-lg transition-all"
            >
              Start Timer
            </motion.button>
          </motion.form>
        )}
      
        {/* Control Buttons */}
        <motion.div className="flex gap-4 mt-6 w-full max-w-md justify-center">
          {[
            {
              action: () => setIsRunning(!isRunning),
              icon: isRunning ? <FaStop /> : <FaPlay />,
              color: isRunning ? "bg-red-500" : "bg-green-500",
              label: isRunning ? "Stop" : "Start"
            },
            {
              action: () => { setTime(0); setIsRunning(false); setTimerMode(false) },
              icon: <FaRedoAlt />,
              color: "bg-blue-500",
              label: "Reset"
            },
            {
              action: toggleFormAndTimer,
              icon: <FaHourglass />,
              color: "bg-purple-500",
              label: "Mode"
            }
          ].map((btn, idx) => (
            <motion.button
              key={idx}
              onClick={btn.action}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-4 rounded-2xl text-white shadow-xl transition-colors ${btn.color} hover:${btn.color.replace('500', '600')}`}
            >
              <span className="text-2xl">{btn.icon}</span>
            </motion.button>
          ))}
        </motion.div>
      
        {/* Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            animate={{ width: isRunning ? "100%" : "0%" }}
            transition={{ duration: time }}
          />
        </div>
      </div>
    );
    
}
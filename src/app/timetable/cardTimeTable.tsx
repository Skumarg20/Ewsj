"use client";
import { Button } from "@/components/ui/button";
import Card from "@mui/material/Card";
import React from "react";
import { 
  FaBookOpen, 
  FaBrain, 
  FaCalendarCheck, 
  FaPencilAlt, 
  FaLaptopCode, 
  FaGraduationCap, 
  FaLightbulb 
} from "react-icons/fa";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function CardTimeTable({ setOpen }: Props) {
  return (
    <Card className="p-8 text-center relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 shadow-2xl max-w-4xl mx-auto">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 1.5,
            }}
            animate={{
              y: ["100%", "-50%"],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating Study Icons */}
        <motion.div
          className="absolute top-10 left-10"
          animate={{ y: [0, -20, 0], rotate: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <FaPencilAlt className="w-12 h-12 text-white/20" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20"
          animate={{ y: [0, 20, 0], rotate: [0, -360] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          <FaLightbulb className="w-14 h-14 text-yellow-300/30" />
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header Section */}
        <div className="flex justify-center items-center gap-4 mb-10">
          <motion.div
            className="p-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaGraduationCap className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Ace Your Studies!
          </motion.h1>
        </div>

        {/* Feature Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { icon: <FaCalendarCheck />, color: "bg-gradient-to-r from-pink-500 to-rose-500", text: "Organize", desc: "Schedule like a pro!" },
            { icon: <FaBrain />, color: "bg-gradient-to-r from-purple-500 to-indigo-500", text: "Learn", desc: "Boost your brainpower!" },
            { icon: <FaLaptopCode />, color: "bg-gradient-to-r from-cyan-500 to-teal-500", text: "Succeed", desc: "Code your future!" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`p-5 rounded-2xl ${item.color} text-white shadow-lg relative overflow-hidden`}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
              <div className="text-4xl mb-3">{item.icon}</div>
              <div className="font-bold text-lg">{item.text}</div>
              <div className="text-sm text-white/80">{item.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Animated Text */}
        <motion.p
          className="text-2xl text-white/90 mb-10 font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-yellow-300">Study smart</span>, 
          <span className="mx-2 text-pink-300 font-bold inline-block">
            <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              win big
            </motion.span>
          </span>
          with your personalized 
          <span className="text-cyan-300 ml-2">timetable!</span>
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.7 }}
        >
          <Button
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 text-purple-900 font-extrabold px-10 py-5 rounded-full
                      hover:scale-110 hover:shadow-2xl transition-all group relative overflow-hidden text-lg"
          >
            <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <FaBookOpen className="mr-3 text-xl animate-bounce" />
            Own Your Time in 2 Mins!
            <FiArrowRight className="ml-3 text-xl transition-transform group-hover:translate-x-2" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-white/20 animate-pulse pointer-events-none" />
    </Card>
  );
}
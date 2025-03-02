'use client'
import { Button } from '@/components/ui/button'
import Card from '@mui/material/Card'
import React from 'react'
import { FaBookOpen, FaBrain, FaCalendarCheck, FaRegClock, FaRocket } from 'react-icons/fa'

import { motion } from "framer-motion";
import { FiArrowRight } from 'react-icons/fi'
type Props = {
    open:boolean;
    setOpen: (value: boolean) => void;
};


export default function cardTimeTable({setOpen}: Props) {
  return (
    <>
    <Card className="p-8 text-center relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl">
  {/* Animated Background Elements */}
  <div className="absolute inset-0 overflow-hidden">
    {/* Floating Particles */}
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-white/10 rounded-full"
        initial={{
          x: Math.random() * 100,
          y: Math.random() * 100,
          scale: Math.random()
        }}
        animate={{
          y: ["100%", "-100%"],
          x: [0, Math.random() * 100 - 50],
          opacity: [0, 0.8, 0]
        }}
        transition={{
          duration: 4 + Math.random() * 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    ))}

    {/* Floating Study Icons */}
    <motion.div 
      className="absolute top-20 left-20"
      animate={{ y: [0, -30, 0], rotate: [0, 15, -15, 0] }}
      transition={{ duration: 8, repeat: Infinity }}
    >
      <FaBookOpen className="w-16 h-16 text-white/10" />
    </motion.div>
  </div>

  {/* Main Content */}
  <motion.div 
    className="relative z-10"
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
  >
    {/* Header Section */}
    <div className="flex justify-center items-center gap-4 mb-8">
      <motion.div 
        className="p-4 bg-white/10 rounded-full backdrop-blur-sm"
        whileHover={{ rotate: 15 }}
      >
        <FaRegClock className="w-12 h-12 text-emerald-400" />
      </motion.div>
      <motion.h1 
        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
        animate={{ y: [10, -5, 0] }}
        transition={{ duration: 1.5 }}
      >
        Master Your Time
      </motion.h1>
    </div>

    {/* Feature Boxes */}
    <div className="grid grid-cols-3 gap-6 mb-8">
      {[
        { icon: <FaCalendarCheck />, color: "bg-pink-500", text: "Planning" },
        { icon: <FaBrain />, color: "bg-amber-500", text: "Focus" },
        { icon: <FaRocket />, color: "bg-cyan-500", text: "Goals" }
      ].map((item, i) => (
        <motion.div
          key={i}
          className={`p-4 rounded-xl ${item.color} text-white shadow-lg`}
          whileHover={{ y: -5 }}
        >
          <div className="text-3xl mb-2">{item.icon}</div>
          <div className="font-semibold">{item.text}</div>
        </motion.div>
      ))}
    </div>

    {/* Animated Text */}
    <motion.p 
      className="text-xl text-white/90 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <span className="font-bold text-emerald-300">Plan</span> your success with
      <span className="mx-2 inline-block">
        <motion.span 
          className="text-amber-300 font-bold"
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          smart scheduling
        </motion.span>
      </span>
      and achieve your 
      <span className="text-cyan-300 font-bold ml-2">goals faster!</span>
    </motion.p>

    {/* Action Button */}
   
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <Button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-purple-900 font-bold px-8 py-4 rounded-xl
                    hover:scale-105 hover:shadow-xl transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <FaCalendarCheck className="mr-3 text-xl" />
          Create Your Timetable Now!
          <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    
  </motion.div>

  {/* Glowing Border Effect */}
  <div className="absolute inset-0 rounded-3xl border-2 border-white/10 pointer-events-none" />
</Card>
  </>
  )
}
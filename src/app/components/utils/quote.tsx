"use client"

import React from 'react'
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight, FaBrain } from "react-icons/fa";
type Props = {
    quote:string;
}

export function TypographyBlockquote({quote}:Props) {
    return (
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <blockquote className="relative mt-6 border-l-4 border-emerald-400 pl-8 bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800 rounded-2xl p-6 shadow-lg max-w-2xl mx-auto">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-8 -left-8 text-blue-100/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <FaBrain className="w-24 h-24" />
          </motion.div>
        </div>
    
        {/* Quote Icons */}
        <div className="flex justify-between items-start mb-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-emerald-500"
          >
            <FaQuoteLeft className="w-8 h-8" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-emerald-500"
          >
            <FaQuoteRight className="w-8 h-8" />
          </motion.div>
        </div>
    
        {/* Animated Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-medium leading-relaxed italic text-center relative z-10"
        >
          {quote}
        </motion.p>
    
        {/* Animated Border Effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-blue-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      </blockquote>
    
      {/* Floating Dots Animation */}
     
    </motion.div>
    )
  }

export default TypographyBlockquote;
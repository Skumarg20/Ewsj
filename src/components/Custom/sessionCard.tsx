'use client'
import React from "react";
import { motion } from "framer-motion";
import { 
  FaBookOpen, 
  FaChartLine,
  FaStickyNote,
  FaCalendarAlt
} from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";

// Removed unused props from type definition
type Props = {
  notesCardClass?: string;
  notesClass?: string;
  topicClass?: string;
  cardClass?: string;
};

function SessionCard({
  topicClass = "text-[2rem] font-bold text-[#7FE0ED]",
  cardClass = "border-none",
  notesCardClass = "bg-[#6fcedf] p-4 rounded-2xl mt-4",
  notesClass = "text-sky-100 text-base",
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden group"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-4 left-4 text-white/10"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <FaChartLine className="w-16 h-16" />
        </motion.div>
      </div>

      <Card className={`${cardClass} bg-gradient-to-br from-[#14284f] via-[#1a365f] to-[#203869] shadow-2xl`}>
        <CardContent className="p-0">
          <div className="flex justify-between items-start gap-6 p-8">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="p-3 bg-white/10 rounded-xl"
                >
                  <FaCalendarAlt className="w-8 h-8 text-cyan-400" />
                </motion.div>
                <h3 className={`${topicClass} text-3xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent`}>
                  Create Your Perfect Timetable
                </h3>
              </div>

              <motion.div
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className="flex items-center gap-3 text-white/80"
              >
                <FaBookOpen className="text-emerald-400 flex-shrink-0" />
                <p className="text-lg">
                  Customize your study schedule for maximum efficiency
                </p>
              </motion.div>

              <motion.div
                className={`${notesCardClass} bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-5 rounded-2xl mt-4 backdrop-blur-sm`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  <FaStickyNote className="text-cyan-300 mt-1 flex-shrink-0" />
                  <p className={`${notesClass} text-white/90 font-semibold`}>
                    Pro Tip: Use color coding for different subjects and include regular breaks!
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ y: -5 }}
              className="relative"
            >
              <Image
                src='/studyplan.png'
                alt="Timetable illustration"
                width={160}
                height={160}
                className="drop-shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-cyan-400/20 p-2 rounded-full backdrop-blur-sm">
                <FiTarget className="w-8 h-8 text-cyan-400" />
              </div>
            </motion.div>
          </div>

          <div className="flex gap-2 px-8 pb-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="h-1 bg-white/20 rounded-full flex-1"
                whileHover={{ scaleY: 1.5 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.random() * 40 + 60}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default SessionCard;
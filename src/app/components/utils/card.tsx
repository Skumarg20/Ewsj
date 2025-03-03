"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { motion } from "framer-motion";
import { FaBookOpen, FaBrain, FaGraduationCap, FaLightbulb, FaChartLine } from "react-icons/fa";
type ActionCard={
    image?:string,
    title:string,
    paragraph:string

}
export default function ActionAreaCard({ title, paragraph }: ActionCard) {
  const [mainTitle, subTitle] = title.split(" - ");
    return (
      <Card 
      className="w-full relative overflow-hidden bg-gradient-to-br from-blue-900 to-gray-900 rounded-b-3xl border-b-4 border-emerald-400 shadow-2xl"
      component={motion.div}
      whileHover={{ scale: 1.02 }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-20 text-emerald-400/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <FaBookOpen className="w-32 h-32" />
        </motion.div>
        <motion.div 
          className="absolute bottom-20 right-20 text-blue-400/20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <FaBrain className="w-24 h-24" />
        </motion.div>
      </div>
    
      <CardActionArea className="bg-gradient-to-br from-gray-900/90 to-blue-900/90 backdrop-blur-sm p-8">
        <CardContent className="relative z-10">
          {/* Animated Icons Container */}
          <motion.div 
            className="flex justify-center gap-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-4 bg-emerald-400/10 rounded-full"
            >
              <FaGraduationCap className="w-12 h-12 text-emerald-400" />
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-4 bg-blue-400/10 rounded-full"
            >
              <FaLightbulb className="w-12 h-12 text-blue-400" />
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-4 bg-purple-400/10 rounded-full"
            >
              <FaChartLine className="w-12 h-12 text-purple-400" />
            </motion.div>
          </motion.div>
    
          {/* Animated Text Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Typography 
              gutterBottom 
              variant="h5" 
              component="div" 
              className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent flex items-center justify-center gap-3"
            >
              <motion.span whileHover={{ rotate: 15 }}>
                <FaGraduationCap className="w-12 h-12" />
              </motion.span>
              {mainTitle}
            </Typography>
          </motion.div>
    
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Typography 
              gutterBottom 
              variant="h5" 
              component="div" 
              className="text-xl font-bold text-gray-200 mt-4 flex items-center justify-center gap-2"
            >
              <FaLightbulb className="text-yellow-400 animate-pulse" />
              {subTitle}
            </Typography>
          </motion.div>
    
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Typography 
              variant="body2" 
              className="font-bold text-emerald-300 mt-4 text-lg flex items-center justify-center gap-2"
            >
              <FaChartLine className="text-purple-400 animate-bounce" />
              {paragraph}
            </Typography>
          </motion.div>
        </CardContent>
      </CardActionArea>
    </Card>
    );
  }
  
"use client"; // For client-side animations in Next.js
import React from "react";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaRocket,
  FaChartLine,
  FaLightbulb,
  FaClock,
  FaUserGraduate,
  FaStar,
  FaBolt,
} from "react-icons/fa";
import Image from "next/image";

const AboutUs = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const zoomIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };

  const bounceIn = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden rounded-xl mt-5" id='about'>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15),_transparent)] animate-pulse-slow" />
      <motion.div
        className="absolute top-10 right-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <FaStar className="w-12 h-12 text-yellow-300 opacity-50" />
      </motion.div>

      {/* Header Section */}
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-xl flex items-center justify-center gap-4">
          <FaRocket className="w-12 h-12 text-yellow-400 animate-bounce" />
          About Us
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto font-semibold leading-relaxed">
          Ready to blast off? We’re here to turbocharge your study game with AI that’s <span className="text-yellow-300">smart</span>, <span className="text-pink-300">fun</span>, and totally <span className="text-green-300">unstoppable</span>!
        </p>
      </motion.div>

      {/* Founder Section */}
      <motion.div
        className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-16 flex flex-col md:flex-row items-center border border-pink-400/40"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <motion.div
          className="md:w-1/3 mb-8 md:mb-0"
          whileHover={{ scale: 1.1, rotate: 5 }}
          variants={zoomIn}
        >
          <Image
            src="/founderimage.png"
            alt="Founder"
            width={96}
            height={96}
            className="rounded-full w-56 h-56 mx-auto object-cover border-4 border-yellow-400 shadow-xl transition-transform -rotate-12"
          />
        </motion.div>
        <div className="md:w-2/3 text-center md:text-left space-y-4">
          <h2 className="text-4xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
            <FaUserGraduate className="w-10 h-10 text-indigo-300 animate-pulse" />
            Meet Our Founder
          </h2>
          <p className="text-xl text-indigo-100 font-medium">
            <span className="font-bold text-yellow-300">Sanjeev Kumar</span>  
            <br />
            A tech-savvy innovator, Sanjeev is building a platform to make studying easier, keep students laser-focused, and track every step of their progress – all powered by the magic of AI!
          </p>
          <p className="text-lg text-indigo-200 italic bg-indigo-800/30 p-4 rounded-lg">
            “Late nights? Been there. With AI, I’m flipping the script – your study grind’s about to get epic. Let’s rock it!”
          </p>
        </div>
      </motion.div>

      {/* Platform Vision */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-16"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center gap-4 mb-6">
          <FaBolt className="w-10 h-10 text-green-400 animate-spin-slow" />
          Our Epic Mission
        </h2>
        <p className="text-xl text-indigo-100 leading-relaxed max-w-3xl mx-auto">
          We’re crafting an <span className="text-yellow-300 font-semibold">AI-powered study vibe</span> that gets YOU. Say goodbye to dull prep and hello to a thrilling ride that boosts your brainpower and slays every challenge – exams, projects, or epic goals!
        </p>
      </motion.div>

      {/* AI Benefits Section */}
      <motion.div
        className="max-w-5xl mx-auto mt-12"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h3 className="text-3xl md:text-4xl font-semibold text-white text-center mb-10 flex items-center justify-center gap-4">
          <FaBrain className="w-10 h-10 text-pink-400 animate-pulse" />
          How AI Powers Your Wins
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Personalized Learning",
              desc: "AI tunes into your strengths for a custom study jam!",
              icon: <FaBrain className="w-12 h-12 text-indigo-400 animate-pulse" />,
            },
            {
              title: "Engaging Vibes",
              desc: "Quizzes and games that keep you locked in!",
              icon: <FaChartLine className="w-12 h-12 text-yellow-400 animate-bounce" />,
            },
            {
              title: "Instant Boost",
              desc: "Stuck? AI zaps answers faster than you can blink!",
              icon: <FaLightbulb className="w-12 h-12 text-green-400 animate-spin-slow" />,
            },
            {
              title: "Progress Glow-Up",
              desc: "Track your wins and level up like a champ!",
              icon: <FaChartLine className="w-12 h-12 text-purple-400 animate-pulse" />,
            },
            {
              title: "Chill Prep",
              desc: "Smart plans to make studying smooth and dope!",
              icon: <FaClock className="w-12 h-12 text-pink-400 animate-bounce" />,
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-indigo-800/50 to-pink-800/50 backdrop-blur-md rounded-xl p-6 border border-yellow-400/40 hover:bg-indigo-600/60 transition-all shadow-lg"
              whileHover={{ scale: 1.08, rotate: 3 }}
              variants={bounceIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h4 className="text-2xl font-bold text-white text-center mb-2">
                {benefit.title}
              </h4>
              <p className="text-indigo-100 text-center text-lg">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
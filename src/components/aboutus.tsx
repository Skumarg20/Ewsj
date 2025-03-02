'use client'
import { motion } from "framer-motion"; // Ensure framer-motion is installed
import {
  FaBrain,
  FaUsers,
  FaLightbulb,
  FaClipboardList,
  FaBook,
  FaQuestionCircle,
  FaTasks,
  FaChartLine,
} from "react-icons/fa"; // Ensure react-icons/fa is installed
import { ReactElement } from 'react';
// Define types for section data
interface Feature {
  icon: ReactElement;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <FaBrain className="text-4xl text-purple-500" />,
    title: "Connect with Top Mentors",
    description:
      "Gain direct access to industry-leading experts who offer personalized study plans and time management strategies.",
  },
  {
    icon: <FaClipboardList className="text-4xl text-blue-500" />,
    title: "Personalized Study Plans",
    description:
      "Craft customized study schedules based on your strengths, weaknesses, and availability.",
  },
  {
    icon: <FaLightbulb className="text-4xl text-yellow-500" />,
    title: "AI-Powered Study Buddy",
    description:
      "Get instant doubt resolution and AI-driven study support to clarify concepts effectively.",
  },
  {
    icon: <FaBook className="text-4xl text-green-500" />,
    title: "5000+ Questions & Tests",
    description:
      "Practice with a vast question bank and generate custom tests based on difficulty level, question count, and duration.",
  },
  {
    icon: <FaUsers className="text-4xl text-red-500" />,
    title: "Collaborative Study Groups",
    description:
      "Join or create study groups with friends or fellow aspirants to discuss doubts, share resources, and stay motivated.",
  },
  {
    icon: <FaQuestionCircle className="text-4xl text-pink-500" />,
    title: "Doubt Solver Buddy",
    description:
      "Get real-time doubt solutions from peers, experts, or AI-powered assistants.",
  },
  {
    icon: <FaTasks className="text-4xl text-indigo-500" />,
    title: "Task & Focus Management",
    description:
      "Utilize to-do lists and the Pomodoro technique to enhance focus, time management, and productivity.",
  },
  {
    icon: <FaChartLine className="text-4xl text-teal-500" />,
    title: "Smart Productivity Features",
    description:
      "Boost concentration with structured study plans, AI reminders, and scientifically proven techniques.",
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white py-12 px-6">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          About Coginest
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Welcome to Coginest, the ultimate learning hub where students connect with top industry
          mentors, create personalized study plans, and access a rich repository of 5000+ exam-related
          questions. Our platform is designed to provide a structured, AI-enhanced study experience
          that helps students stay motivated, focused, and ahead of the competition.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="mb-16 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-300">
          At Coginest, we believe that every student deserves the best guidance and resources to excel
          in their academic journey. Our mission is to empower learners with expert mentorship, smart
          study techniques, and collaborative learning to ensure efficient and effective exam preparation.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              {feature.icon}
              <h3 className="text-xl font-semibold ml-4">{feature.title}</h3>
            </div>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="mt-16 text-center max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-semibold mb-6">Why Choose Coginest?</h2>
        <ul className="space-y-4 text-gray-300">
          <li>✅ Expert Mentorship from Industry Leaders</li>
          <li>✅ Comprehensive Study Materials & AI Tools</li>
          <li>✅ Personalized Learning & Test Creation</li>
          <li>✅ Collaborative Learning with Peers & Mentors</li>
          <li>✅ Smart Focus & Productivity Tools</li>
        </ul>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="mt-16 text-center"
      >
        <h2 className="text-3xl font-semibold mb-4">Join Coginest Today!</h2>
        <p className="text-gray-300 mb-6">
          Experience a smarter way to learn with Coginest. Build your success story—one step at a time.
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300">
          Get Started Now
        </button>
      </motion.section>
    </div>
  );
}
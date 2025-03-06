// src/components/featureIcons.ts
import { FeatureIcons } from "@/interface/type";
import { MdOutlineGpsFixed } from "react-icons/md";
import { FaBookOpen, FaBrain, FaCalendar, FaCheckCircle, FaCompass, FaLightbulb, FaRocket, FaStar, FaUsers, FaVideo } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";

export const featureIcons: FeatureIcons = {
  "1000+ doubts answered": <FaLightbulb className="h-5 w-5 mr-2 text-yellow-400" />,
  "AI-generated 25+ Daily Time Tables": <FaCalendar className="h-5 w-5 mr-2 text-blue-400" />,
  "10+ AI-generated Target & Weekly Study Plans": <MdOutlineGpsFixed className="h-5 w-5 mr-2 text-teal-400" />,
  "1 Personal Mentorship Session": <FaUsers className="h-5 w-5 mr-2 text-green-400" />,
  "Advanced Focus & Productivity Tools": <FaBrain className="h-5 w-5 mr-2 text-purple-400" />,
  "Smart Note Organization": <FaBookOpen className="h-5 w-5 mr-2 text-indigo-400" />,
  "Email Support (24hr response)": <FaStar className="h-5 w-5 mr-2 text-gray-400" />,
  "Everything in Starter": <FaCheckCircle className="h-5 w-5 mr-2 text-green-500" />,
  "Unlimited Doubts Answered": <FaLightbulb className="h-5 w-5 mr-2 text-yellow-500" />,
  "Unlimited AI-Generated Daily Time Tables": <FaCalendar className="h-5 w-5 mr-2 text-blue-500" />,
  "20+ Targeted & Weekly Study Plans": <MdOutlineGpsFixed className="h-5 w-5 mr-2 text-teal-500" />,
  "4 Personal Mentorship Sessions": <FaUsers className="h-5 w-5 mr-2 text-green-500" />,
  "Full Access to Performance Analytics": <FaBrain className="h-5 w-5 mr-2 text-purple-500" />,
  "Complete Habit Tracker Access": <FaCheckCircle className="h-5 w-5 mr-2 text-cyan-500" />,
  "2000+ Practice Questions": <FaBookOpen className="h-5 w-5 mr-2 text-indigo-500" />,
  "Full Access to All Workshops": <FaVideo className="h-5 w-5 mr-2 text-red-500" />,
  "Everything in Pro": <FaCheckCircle className="h-5 w-5 mr-2 text-green-600" />,
  "Create Custom Test Series": <FaRocket className="h-5 w-5 mr-2 text-orange-500" />,
  "5 Personal Mentorship Sessions/Month": <FaUsers className="h-5 w-5 mr-2 text-green-600" />,
  "5000+ Practice Questions": <FaBookOpen className="h-5 w-5 mr-2 text-indigo-600" />,
  "Career Planning & Guidance": <FaCompass className="h-5 w-5 mr-2 text-amber-500" />,
  "24/7 Priority Support": <IoMdStar className="h-5 w-5 mr-2 text-yellow-600" />,
  "Personalized Learning Path": <MdOutlineGpsFixed className="h-5 w-5 mr-2 text-teal-600" />,
};
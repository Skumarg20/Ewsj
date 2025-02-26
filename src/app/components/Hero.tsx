"use client";
import {
  Rocket,
  Calendar,
  ArrowRight,
  Star,
  TrendingUp,
  Target,
  Award,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 rounded-xl mt-0">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 min-h-screen w-full flex items-center justify-center overflow-hidden rounded-b-2xl mb-5">
          {/* Background gradient animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-90 animate-gradient-move"></div>

          {/* Floating particles */}
          <div className="absolute inset-0">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Logo and Heading */}
            <div className="mb-12 animate-pulse">
              <div className="flex justify-center mb-6">
                <Rocket className="w-16 h-16 text-indigo-300" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Boost Productivity, Ace Your Exams
              </h1>
              <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
                Unlock your full potential with smarter study strategies and
                expert insights.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <button className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              onClick={() => {
                
                  window.location.href = "/bookacall";
                
              }}>
               
                <Calendar className="w-5 h-5" />
                Book A 30 Min Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
               onClick={() => {
                
                  window.location.href = "/login";
                
              }}
              className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
                <Star className="w-5 h-5" />
                Sign Up for Rank
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-indigo-300 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Growth Strategy
                </h3>
                <p className="text-indigo-200">
                  Customized plans for your success journey
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
                <Target className="w-8 h-8 text-indigo-300 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Targeted Results
                </h3>
                <p className="text-indigo-200">
                  Achieve your goals with precision
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
                <Award className="w-8 h-8 text-indigo-300 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Expert Guidance
                </h3>
                <p className="text-indigo-200">Learn from industry leaders</p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-16 flex items-center justify-center gap-4 text-white/80">
              <Users className="w-6 h-6" />
              <span className="text-sm">
              Be Part of a 23000+ Strong Student Community Achieving Exam Success!
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Hero;

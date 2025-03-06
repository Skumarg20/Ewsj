"use client";
import {
  Rocket,
  Star,
  TrendingUp,
  Target,
  Award,
  Users,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter(); 

  
  const handlePricingClick = () => {
    router.push("/subscription"); 
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 rounded-xl mt-0">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 min-h-screen w-full flex items-center justify-center overflow-hidden rounded-b-2xl mb-5">
          {/* Background gradient with a bolder animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-purple-600/40 to-pink-600/40 opacity-100 animate-gradient-move-fast"></div>

          {/* Enhanced Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="particle particle-1 animate-float-fast bg-indigo-400/50"></div>
            <div className="particle particle-2 animate-float-slow bg-purple-400/50"></div>
            <div className="particle particle-3 animate-float-medium bg-pink-400/50"></div>
            <div className="particle particle-4 animate-float-fast bg-yellow-400/50"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Logo and Heading */}
            <div className="mb-12 animate-bounce-in">
              <div className="flex justify-center mb-8">
                <Rocket className="w-20 h-20 text-indigo-300 animate-spin-slow" />
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                Launch Your Grades to the Moon! 🚀
              </h1>
              <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto font-medium">
                Crush exams, master productivity, and level up with epic study hacks.
              </p>
            </div>

            {/* CTA Buttons - Replaced Book a Call with Pricing */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <button
                onClick={handlePricingClick} // Redirect to /subscriptions
                className="group bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-10 py-5 rounded-full font-bold text-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <Star className="w-6 h-6 animate-pulse" />
                See Pricing Plans
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <button
                onClick={() => (window.location.href = "/login")}
                className="group bg-transparent border-2 border-indigo-300 text-indigo-100 px-10 py-5 rounded-full font-bold text-lg hover:bg-indigo-500/20 transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105"
              >
                <Star className="w-6 h-6 animate-twinkle" />
                Join the Elite Rank Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            {/* Features Grid - More Visual Pop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              <div className="relative bg-white/20 backdrop-blur-xl rounded-2xl p-6 hover:transform hover:scale-110 transition-all duration-300 border border-indigo-400/50 shadow-lg">
                <TrendingUp className="w-10 h-10 text-indigo-300 mb-4 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                  Skyrocketing Growth
                </h3>
                <p className="text-indigo-100 font-medium">
                  Tailored plans to dominate your study game.
                </p>
              </div>
              <div className="relative bg-white/20 backdrop-blur-xl rounded-2xl p-6 hover:transform hover:scale-110 transition-all duration-300 border border-purple-400/50 shadow-lg">
                <Target className="w-10 h-10 text-indigo-300 mb-4 mx-auto animate-pulse" />
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                  Bullseye Results
                </h3>
                <p className="text-indigo-100 font-medium">
                  Smash your goals like a pro.
                </p>
              </div>
              <div className="relative bg-white/20 backdrop-blur-xl rounded-2xl p-6 hover:transform hover:scale-110 transition-all duration-300 border border-pink-400/50 shadow-lg">
                <Award className="w-10 h-10 text-indigo-300 mb-4 mx-auto animate-spin-slow" />
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                  Pro-Level Mentors
                </h3>
                <p className="text-indigo-100 font-medium">
                  Learn from the ultimate exam champs.
                </p>
              </div>
            </div>

            {/* Social Proof - More Hype */}
            <div className="mt-16 flex items-center justify-center gap-4 text-white bg-indigo-600/20 py-3 px-6 rounded-full backdrop-blur-md">
              <Users className="w-8 h-8 animate-pulse" />
              <span className="text-lg font-semibold">
                Join 23,000+ Students Conquering Exams Like Bosses!
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Home,
  Briefcase,
  Users,
  Phone,
  LogIn,
  Menu,
  X,
  ChevronRight,
  Rocket,
  Star,
} from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize based on token


  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-xl shadow-md"
          : "bg-gradient-to-r from-gray-700/50 to-gray-800/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group relative">
            <div
              className={`relative h-10 w-10 transition-all duration-300 ${
                scrolled ? "filter brightness-110" : "filter brightness-125"
              } group-hover:animate-pulse`}
            >
              <Image
                src="https://ewsj12.s3.ap-south-1.amazonaws.com/coginest-logo+(1).png"
                alt="CogeNist Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
              <Star
                className="absolute -top-2 -right-2 w-5 h-5 text-yellow-200 animate-twinkle"
              />
            </div>
            <span
              className={`text-3xl font-extrabold tracking-tight text-white group-hover:text-yellow-200 transition-colors duration-300 bg-gradient-to-r from-yellow-200 to-gray-300 bg-clip-text hover:text-transparent`}
            >
              CogeNist
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { name: "Home", icon: Home },
              { name: "Services", icon: Briefcase },
              { name: "About", icon: Users },
              { name: "Contact", icon: Phone },
            ].map((item) => (
              <a
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                onClick={() =>
                  window.document
                    .getElementById(`${item.name.toLowerCase()}`)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={`group flex items-center space-x-2 px-4 py-2 rounded-full text-base font-semibold text-white hover:bg-gray-700/20 transition-all duration-300 hover:scale-105 hover:shadow-md hover:glow`}
              >
                <item.icon className="w-5 h-5 group-hover:animate-bounce transition-all duration-300" />
                <span>{item.name}</span>
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </a>
            ))}
            <button
              onClick={() => (window.location.href = isLoggedIn ? "/dashboard" : "/login")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full text-base font-bold ${
                scrolled
                  ? "bg-gradient-to-r from-yellow-300 to-gray-400 text-gray-900 hover:from-yellow-400 hover:to-gray-500"
                  : "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700"
              } transition-all duration-300 hover:scale-105 hover:shadow-lg hover:glow-strong`}
            >
              <LogIn className="w-5 h-5 animate-pulse" />
              <span>{isLoggedIn ? "Dashboard" : "Login"}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-3 rounded-full ${
                scrolled
                  ? "text-white bg-gray-600/50"
                  : "text-white bg-gray-500/50"
              } hover:bg-gray-700/20 transition-all duration-300 hover:scale-110`}
            >
              {isMenuOpen ? (
                <X className="w-7 h-7 animate-spin-once" />
              ) : (
                <Menu className="w-7 h-7 animate-pulse" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute left-0 right-0 transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full hidden"
          }`}
        >
          <div className="px-4 pt-4 pb-6 space-y-3 bg-gradient-to-b from-gray-800/90 to-gray-900/90 backdrop-blur-xl shadow-md">
            {[
              { name: "Home", icon: Home },
              { name: "Services", icon: Briefcase },
              { name: "About", icon: Users },
              { name: "Contact", icon: Phone },
            ].map((item) => (
              <a
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                onClick={() => {
                  window.document
                    .getElementById(`${item.name.toLowerCase()}`)
                    ?.scrollIntoView({ behavior: "smooth" });
                  setIsMenuOpen(false);
                }}
                className="group flex items-center justify-between space-x-3 px-4 py-3 rounded-full text-white hover:bg-gray-700/20 transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-6 h-6 group-hover:animate-bounce" />
                  <span className="text-lg font-semibold">{item.name}</span>
                </div>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-all duration-300" />
              </a>
            ))}
            <button
              onClick={() => (window.location.href = isLoggedIn ? "/dashboard" : "/login")}
              className="w-full flex items-center justify-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-300 to-gray-400 text-gray-900 text-lg font-bold hover:from-yellow-400 hover:to-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Rocket className="w-6 h-6 animate-pulse" />
              <span>{isLoggedIn ? "Dashboard" : "Login"}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
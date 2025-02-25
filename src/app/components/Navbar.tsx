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
  Rocket,
  ChevronRight,
} from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 group">
            <div
              className={`relative h-8 w-8 ${scrolled ? "filter brightness-0" : ""} transition-all duration-300`}
            >
              <Image
                src="https://ewsj12.s3.ap-south-1.amazonaws.com/coginest-logo+(1).png"
                alt="CogiNest Logo"
                width={32} // Add width (required)
                height={32} // Add height (required)
                className="object-contain"
                priority
              />
            </div>
            <span
              className={`text-2xl font-bold ${
                scrolled ? "text-gray-900" : "text-white"
              } group-hover:text-indigo-500 transition-colors duration-300`}
            >
              CogiNest
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: "Home", icon: Home },
              { name: "Services", icon: Briefcase },
              { name: "About", icon: Users },
              { name: "Contact", icon: Phone },
            ].map((item) => (
              <a
                key={item.name}
                href={`${item.name.toLowerCase()}`}
                className={`group flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium ${
                  scrolled
                    ? "text-gray-700 hover:text-indigo-600"
                    : "text-white hover:text-indigo-200"
                } transition-all duration-300 hover:scale-105`}
              >
                <item.icon className="w-4 h-4 group-hover:rotate-6 transition-transform duration-300" />
                <span>{item.name}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
            <button
              onClick={() => (window.location.href = "/login")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                scrolled
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-white/10 text-white hover:bg-white/20"
              } transition-all duration-300 hover:scale-105 backdrop-blur-sm`}
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${
                scrolled ? "text-gray-600" : "text-white"
              } hover:bg-white/10 transition-colors duration-300`}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 animate-spin-once" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg mb-4">
            {[
              { name: "Home", icon: Home },
              { name: "Services", icon: Briefcase },
              { name: "About", icon: Users },
              { name: "Contact", icon: Phone },
            ].map((item) => (
              <a
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                className="group flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
              >
                <item.icon className="w-5 h-5 group-hover:rotate-6 transition-transform duration-300" />
                <span>{item.name}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ml-auto" />
              </a>
            ))}
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300">
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

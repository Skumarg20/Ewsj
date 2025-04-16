"use client";
import Image from "next/image";
import Link from "next/link"; // Import Link for client-side navigation
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  // Navigation items array with Exam added
  const navItems = [
    { name: "Home", icon: Home, href: "#home" },
    { name: "Services", icon: Briefcase, href: "#services" },
    { name: "Exam", icon: Users, href: "#exam", subItem: { name: "IIT JEE", href: "/exam/iitjee" } },
    { name: "Counselling", icon: Phone, href: "/hamaracollege" },
  ];

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
            {navItems.map((item) =>
              item.subItem ? (
                <div key={item.name} className="relative group">
                  <div
                    className={`group flex items-center space-x-2 px-4 py-2 rounded-full text-base font-semibold text-white hover:bg-gray-700/20 transition-all duration-300 hover:scale-105 hover:shadow-md hover:glow cursor-pointer`}
                  >
                    <item.icon className="w-5 h-5 group-hover:animate-bounce transition-all duration-300" />
                    <span>{item.name}</span>
                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                  {/* Dropdown for Exam */}
                  <div className="absolute left-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-xl rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <Link
                      href={item.subItem.href}
                      className="block px-4 py-2 text-white hover:bg-gray-700/20 rounded-lg transition-all duration-300"
                    >
                      {item.subItem.name}
                    </Link>
                  </div>
                </div>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() =>
                    window.document
                      .getElementById(item.href.slice(1))
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-full text-base font-semibold text-white hover:bg-gray-700/20 transition-all duration-300 hover:scale-105 hover:shadow-md hover:glow`}
                >
                  <item.icon className="w-5 h-5 group-hover:animate-bounce transition-all duration-300" />
                  <span>{item.name}</span>
                  <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                </a>
              )
            )}
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
            {navItems.map((item) =>
              item.subItem ? (
                <Link
                  key={item.subItem.name}
                  href={item.subItem.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-between space-x-3 px-4 py-3 rounded-full text-white hover:bg-gray-700/20 transition-all duration-300 hover:scale-105 hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-6 h-6 group-hover:animate-bounce" />
                    <span className="text-lg font-semibold">{item.subItem.name}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-all duration-300" />
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    window.document
                      .getElementById(item.href.slice(1))
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
              )
            )}
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
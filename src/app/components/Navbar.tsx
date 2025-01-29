'use client'
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-[90%] px-7 py-3 flex justify-between items-center">
      {/* Brand Section */}
      <div>
        <h1 className="text-[30px] font-bold text-gray-900">EwSanj</h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex justify-end gap-8 items-center">
        <Link href={"#home"} className="text-gray-700 hover:text-blue-500 transition-all duration-300 font-bold">Home</Link>
        <Link href={"#services"} className="text-gray-700 hover:text-blue-500 transition-all duration-300 font-bold">Our Services</Link>
        <Link href={"#about"} className="text-gray-700 hover:text-blue-500 transition-all duration-300 font-bold">About Us</Link>
        <Link href={"#contact"} className="text-gray-700 hover:text-blue-500 transition-all duration-300 font-bold">Contact</Link>
        <Link href={"#login"} className="text-gray-700 hover:text-blue-500 transition-all duration-300 font-bold">Login</Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-black focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-7 bg-white shadow-lg rounded-lg p-5 flex flex-col items-start gap-4 z-10 md:hidden">
          <Link href={"#home"} className="text-gray-700 hover:text-blue-500 transition-all duration-300">Home</Link>
          <Link href={"#services"} className="text-gray-700 hover:text-blue-500 transition-all duration-300">Our Services</Link>
          <Link href={"#about"} className="text-gray-700 hover:text-blue-500 transition-all duration-300">About Us</Link>
          <Link href={"#contact"} className="text-gray-700 hover:text-blue-500 transition-all duration-300">Contact</Link>
          <Link href={"#login"} className="text-gray-700 hover:text-blue-500 transition-all duration-300">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;

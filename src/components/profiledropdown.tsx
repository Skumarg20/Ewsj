"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import { FiBook, FiClock, FiLogOut, FiUser, FiAward } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

// Define interface for decoded token based on JwtPayload
interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  fullname: string;
  phonenumber: string;
  studentclass: string;
  exam: string;
  plan: string;
  subscriptionStart?: string;
  subscriptionEnd?: string;
  subscriptionDuration?: number;
}

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState<JwtPayload | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  // Ensure client-side only logic runs after mount
  React.useEffect(() => {
    setIsMounted(true); // Mark as mounted
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken: JwtPayload = jwtDecode(token);
        setUserDetails(decodedToken);
      } catch {
        setUserDetails(null);
        console.warn("Failed to decode token");
      }
    } else {
      console.warn("No token found in localStorage");
      setUserDetails(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsOpen(false);
    setIsLoading(true);

    toast.success("Logout successful!", {
      duration: 2000,
      position: "top-center",
      style: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        background: "#fff",
        color: "#333",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      },
    });

    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/login";
    }, 2000);
  };

  // Avoid rendering until mounted to prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <div className="relative">
      <Toaster />

      {/* Profile Button */}
      <motion.button
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.85 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 border border-indigo-300"
        disabled={isLoading}
      >
        <span className="text-2xl font-bold">
          {userDetails?.fullname?.charAt(0)?.toUpperCase() || "U"}
        </span>
      </motion.button>

      {/* Dropdown Menu */}
      {isOpen && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl p-6 z-50 border border-indigo-100 overflow-hidden backdrop-blur-sm"
        >
          {/* Background Accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-indigo-400 to-purple-400 animate-pulse" />

          <div className="space-y-5">
            {/* Header with Avatar */}
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-3xl shadow-md border-2 border-yellow-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {userDetails?.fullname?.charAt(0)?.toUpperCase() || "U"}
              </motion.div>
              <div>
                <p className="font-bold text-xl text-gray-900 flex items-center gap-2">
                  <FiUser className="text-indigo-500" />
                  {userDetails?.fullname || "Guest"}
                </p>
                <p className="text-sm text-indigo-600 font-semibold flex items-center gap-1">
                  <FiAward className="text-yellow-400" />
                  Profile Overview
                </p>
              </div>
            </div>

            <hr className="border-indigo-200" />

            {/* Profile Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <FiBook className="w-6 h-6 text-indigo-500 animate-bounce" />
                <p>
                  <span className="font-semibold text-gray-900">Exam:</span>{" "}
                  {userDetails?.exam || "Not set"}
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <FaCrown className="w-6 h-6 text-yellow-400 animate-pulse" />
                <p>
                  <span className="font-semibold text-gray-900">Plan:</span>{" "}
                  {userDetails?.plan || "None"}
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <FiClock className="w-6 h-6 text-indigo-500 animate-spin-slow" />
                <p>
                  <span className="font-semibold text-gray-900">Subscription Ends:</span>{" "}
                  {userDetails?.subscriptionEnd
                    ? new Date(userDetails.subscriptionEnd).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>

            <hr className="border-indigo-200" />

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(255, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="w-full px-4 py-2 text-red-600 bg-red-50 rounded-lg font-semibold hover:bg-red-100 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <FiLogOut className="w-5 h-5 animate-bounce" />
              Logout
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50"
        >
          <div className="bg-white p-6 rounded-xl shadow-2xl flex items-center space-x-4 border border-indigo-200">
            <svg
              className="animate-spin h-8 w-8 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p className="text-gray-900 font-semibold text-lg">Logging out...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileDropdown;
'use client'
import { useUpgrade } from "@/context/UpgradeContext";
import { FaClock, FaStar, FaExclamationTriangle, FaArrowRight, FaBook } from "react-icons/fa";
const UpgradePopup = () => {
  const { isUpgradePopupVisible, hideUpgradePopup } = useUpgrade();

  if (!isUpgradePopupVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-2xl text-center max-w-md w-full transform transition-all duration-500 scale-105 hover:scale-110">
        {/* Icon Header */}
        <div className="mb-4">
          <FaClock className="w-16 h-16 mx-auto text-blue-500 animate-bounce" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-extrabold text-gray-800 mb-3 flex items-center justify-center">
          <span className="mr-2">Upgrade Your Plan</span>
          <FaStar className="w-6 h-6 text-yellow-400 animate-pulse" />
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6 text-lg flex items-center justify-center">
          <span>You’ve hit your limit, student!</span>
          <FaExclamationTriangle className="w-5 h-5 ml-2 text-red-500 animate-wiggle" />
        </p>
        <p className="text-gray-500 mb-6">Unlock unlimited access with a shiny new plan!</p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 flex items-center "
            onClick={() => {
              hideUpgradePopup();
              window.location.href = "/subscription";
            }}
          >
            <span>Upgrade Now</span>
            <FaArrowRight className="w-5 h-5 ml-2" />
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transform hover:-translate-y-1 transition-all duration-300 "
            onClick={hideUpgradePopup}
          >
            Cancel
          </button>
        </div>

        {/* Student-Themed Decoration */}
        <div className="mt-6 text-sm text-gray-400 flex justify-center items-center">
          <FaBook className="w-5 h-5 mr-2" />
          <span>Made for students, by CogeNist.</span>
        </div>
      </div>
    </div>
  );
};

export default UpgradePopup;

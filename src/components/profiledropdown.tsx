"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast

interface UserDetails {
  username: string;
  email: string;
}

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState<UserDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        

        setUserDetails({
          username: decodedToken.username || decodedToken.name || "User",
          email: decodedToken.email || "No email",
        });
      } catch (error) {
      
        setUserDetails({
          username: "Guest",
          email: "No email",
        });
      }
    } else {
      console.warn("No token found in localStorage");
      setUserDetails({
        username: "Guest",
        email: "Please log in",
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsOpen(false);
    setIsLoading(true);

    toast.success("Logout successful!", {
      duration: 2000, // 2 seconds
      position: "top-center", // Centered horizontally at the top
      style: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // Fully center the toast
        zIndex: 9999, // Ensure it’s on top
      },
    });

    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <div className="relative">
    
      <Toaster />

     
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        disabled={isLoading}
      >
        {userDetails?.username?.charAt(0)?.toUpperCase() || "U"}
      </motion.button>

      {isOpen && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg p-4 z-50"
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl">
                {userDetails?.username?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {userDetails?.username}
                </p>
                <p className="text-sm text-gray-600">{userDetails?.email}</p>
              </div>
            </div>
            <hr className="border-gray-200" />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </motion.button>
          </div>
        </motion.div>
      )}

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"
        >
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-indigo-600"
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
            <p className="text-gray-800">Logging out...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileDropdown;

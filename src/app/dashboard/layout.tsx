"use client";
import * as React from "react";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";
import ProfileDropdown from "@/components/profiledropdown";
import Image from "next/image";
import Navbar from "@/components/dashboard/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    setIsNavbarOpen(true);
  }, []);

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  if (!isMounted) {
    return <div className="h-screen bg-white" />;
  }

  return (
    <div className="flex bg-white">
      {/* Left Navbar */}
      {isMounted && <Navbar isOpen={isNavbarOpen} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white shadow-md p-2 flex justify-evenly items-center sticky top-0 z-30">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center space-x-4 pl-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleNavbar}
                className="text-indigo-600 text-xl hover:text-indigo-800 transition-colors p-2 rounded-full bg-indigo-50"
                aria-label={isNavbarOpen ? "Hide Navbar" : "Show Navbar"}
              >
                {isNavbarOpen ? <IoIosClose /> : <IoIosMenu />}
              </motion.button>
              <div className="flex items-center">
                <Image
                  src="https://ewsj12.s3.ap-south-1.amazonaws.com/coginest-logo+(1).png"
                  alt="CogeNist"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <h1 className="text-lg font-bold text-indigo-600">CogeNist</h1>
              </div>
            </div>
            <div>
              <ProfileDropdown />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-2 md:p-2 bg-white">{children}</div>
      </div>
    </div>
  );
}
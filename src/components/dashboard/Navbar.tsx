"use client";
import * as React from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaNotesMedical, FaUserGraduate } from "react-icons/fa6";
import { MdOutlineMoreTime } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { motion } from "framer-motion";
import NavbarItem from "./NavbarItem";

const NAVIGATION = [
  { path: "/dashboard", title: "Dashboard", icon: <RxDashboard /> },
  { path: "/dashboard/solostudy", title: "Focus", icon: <FaUserGraduate /> },
  { path: "/dashboard/studyplan", title: "Study Plan", icon: <AiOutlineSchedule /> },
  { path: "/dashboard/timetable", title: "Time Table", icon: <MdOutlineMoreTime /> },
  { path: "/dashboard/notes", title: "Notes", icon: <FaNotesMedical /> },
  // Uncomment and adjust if needed
  // {
  //   path: "/dashboard/group",
  //   title: "Clusters",
  //   icon: <MdGroups2 />,
  //   children: [
  //     { path: "hbhsales", title: "Sales", icon: <GrNodes />, groupId: "sal8777es" },
  //     { path: "traf98fic", title: "Traffic", icon: <GrNodes />, groupId: "traff38587ic" },
  //   ],
  // },
];

interface NavbarProps {
  isOpen: boolean;
}

export default function Navbar({ isOpen }: NavbarProps) {
  return (
    <motion.div
      initial={{ x: isOpen ? 0 : -250 }}
      animate={{ x: isOpen ? 0 : -250 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl rounded-r-2xl p-4 flex flex-col justify-between z-20"
    >
      <div className="space-y-2 mt-14">
        {NAVIGATION.map((item, index) =>
          item.path ? <NavbarItem key={index} item={item} /> : null
        )}
      </div>
    </motion.div>
  );
}
"use client";
import * as React from "react";
import RightDashboard from "../components/RightDashboard";
import TimeTable from "@/app/timetable/index";
import StudyPlan from "../studyplan/page";
import Clusters from "../talksphere/clusters";
import Notes from "@/app/notes/page";

import { AiOutlineSchedule } from "react-icons/ai";
import { FaNotesMedical, FaUserGraduate } from "react-icons/fa6";
import { MdOutlineMoreTime } from "react-icons/md";

import { RxDashboard } from "react-icons/rx";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";
import ProfileDropdown from "@/components/profiledropdown";
import Image from "next/image";
import SoloStudy from "../solostudy/page";

const NAVIGATION = [
  { path: "dashboard", title: "Dashboard", icon: <RxDashboard /> },
  { path: "solostudy", title: "Focus", icon: <FaUserGraduate /> },
  { path: "studyplan", title: "Study Plan", icon: <AiOutlineSchedule /> },
  { path: "timetable", title: "Time Table", icon: <MdOutlineMoreTime /> },
  { path: "notes", title: "Notes", icon: <FaNotesMedical /> },
  // {
  //   path: "group",
  //   title: "Clusters",
  //   icon: <MdGroups2 />,
  //   children: [
  //     {
  //       path: "hbhsales",
  //       title: "Sales",
  //       icon: <GrNodes />,
  //       groupId: "sal8777es",
  //     },
  //     {
  //       path: "traf98fic",
  //       title: "Traffic",
  //       icon: <GrNodes />,
  //       groupId: "traff38587ic",
  //     },
  //   ],
  // },
  // { path: "peers", title: "Peers", icon: <GrNodes /> },
 
];

function PageContent({ pathname }: { pathname: string }) {
  const isGroupPage = pathname.startsWith("/group/");
  const groupId = isGroupPage ? pathname.split("/")[2] : null;

  return (
    <div className="flex-1 p-2 md:p-2 bg-white">
      {pathname === "/dashboard" && <RightDashboard />}
      {pathname === "/solostudy" && <SoloStudy />}
      {pathname === "/studyplan" && <StudyPlan />}
      {pathname === "/timetable" && <TimeTable />}
      {pathname === "/group" && <Clusters />}
      {pathname === "/notes" && <Notes />}
      
      {isGroupPage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8 text-2xl md:text-3xl font-bold text-indigo-700"
        >
          Viewing Group: <span className="text-purple-600">{groupId}</span>
          <h1 className="text-lg md:text-xl mt-2 text-gray-600">Hello!</h1>
        </motion.div>
      )}
    </div>
  );
}

interface NavItem {
  path: string;
  title: string;
  icon: React.ReactNode;
  children?: NavChildItem[];
}

interface NavChildItem {
  path: string;
  title: string;
  icon: React.ReactNode;
  groupId: string;
}

function NavbarItem({
  item,
  pathname,
  navigate,
}: {
  item: NavItem;
  pathname: string;
  navigate: (path: string) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isActive =
    pathname === `/${item.path}` ||
    (item.children && pathname.startsWith(`/${item.path}/`));

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (item.children) setIsOpen(!isOpen);
          else navigate(`/${item.path}`);
        }}
        className={`flex items-center p-3 rounded-xl cursor-pointer transition-colors ${
          isActive
            ? "bg-indigo-600 text-white"
            : "text-gray-700 hover:bg-indigo-100"
        }`}
      >
        <span className="text-xl mr-3">{item.icon}</span>
        <span className="text-sm font-semibold">{item.title}</span>
      </motion.div>
      {item.children && isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="ml-6 mt-2 space-y-2"
        >
          {item.children.map((child) => (
            <motion.div
              key={child.path}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/group/${child.path}`)}
              className={`flex items-center p-2 rounded-lg cursor-pointer ${
                pathname === `/group/${child.path}`
                  ? "bg-purple-500 text-white"
                  : "text-gray-600 hover:bg-purple-100"
              }`}
            >
              <span className="text-lg mr-2">{child.icon}</span>
              <span className="text-sm">{child.title}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

interface DashboardProps {
  window?: () => Window | undefined;
}

export default function Dashboard({  }: DashboardProps) {
  const [pathname, setPathname] = React.useState("/dashboard"); // Custom routing state
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    setIsNavbarOpen(true);
  }, []);

  const navigate = (path: string) => {
    setPathname(path); // Custom navigation handler
  };

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  if (!isMounted) {
    return <div className="h-screen bg-white" />;
  }

  return (
    <div className="flex bg-white">
      {/* Left Navbar (Toggleable) */}
      {isMounted && (
        <motion.div
          initial={{ x: isNavbarOpen ? 0 : -250 }}
          animate={{ x: isNavbarOpen ? 0 : -250 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl rounded-r-2xl p-4 flex flex-col justify-between z-20"
        >
          <div className="space-y-2 mt-14">
            {NAVIGATION.map((item, index) =>
              item.path ? (
                <NavbarItem
                  key={index}
                  item={item}
                  pathname={pathname}
                  navigate={navigate}
                />
              ) : null
            )}
          </div>
        </motion.div>
      )}

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
                  alt="Coginest"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <h1 className="text-lg font-bold text-indigo-600">
                  Coginest
                </h1>
              </div>
            </div>

            <div>
              <ProfileDropdown />
            </div>
          </div>
         
        </div>

       
        <PageContent pathname={pathname} />
      </div>
    </div>
  );
}
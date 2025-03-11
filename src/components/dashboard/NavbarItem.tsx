"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

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

export default function NavbarItem({ item }: { item: NavItem }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const isActive =
    pathname === item.path ||
    (item.children && pathname.startsWith(`${item.path}/`));

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (item.children) setIsOpen(!isOpen);
          else router.push(item.path);
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
              onClick={() => router.push(`/dashboard/group/${child.path}`)}
              className={`flex items-center p-2 rounded-lg cursor-pointer ${
                pathname === `/dashboard/group/${child.path}`
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